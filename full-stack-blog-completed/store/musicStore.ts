import { create } from "zustand";
import { Howl } from "howler";

export type MusicTrack = {
  id: string;
  name: string;
  url: string;
  mood: "romantic" | "lo-fi" | "bollywood";
};

export interface MusicState {
  currentTrack: MusicTrack | null;
  sound: Howl | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  tracks: MusicTrack[];
  currentTrackIndex: number;
  setTracks: (tracks: MusicTrack[]) => void;
  setCurrentTrack: (track: MusicTrack | null) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  playTrack: (index: number) => void;
}

export const useMusicStore = create<MusicState>((set, get) => ({
  currentTrack: null,
  sound: null,
  isPlaying: false,
  volume: 0.5,
  isMuted: false,
  tracks: [],
  currentTrackIndex: -1,

  setTracks: (tracks) => set({ tracks }),

  setCurrentTrack: (track) => {
    const { sound } = get();
    if (sound) {
      sound.unload();
    }

    if (!track) {
      set({ currentTrack: null, sound: null, isPlaying: false });
      return;
    }

    const newSound = new Howl({
      src: [track.url],
      html5: true,
      volume: get().volume,
      loop: true,
      onplay: () => set({ isPlaying: true }),
      onpause: () => set({ isPlaying: false }),
      onstop: () => set({ isPlaying: false }),
      onend: () => {
        // Auto-play next track
        const { tracks, currentTrackIndex } = get();
        if (tracks.length > 0) {
          const nextIndex = (currentTrackIndex + 1) % tracks.length;
          get().playTrack(nextIndex);
        }
      },
    });

    set({
      currentTrack: track,
      sound: newSound,
    });
  },

  play: () => {
    const { sound, isMuted } = get();
    if (sound && !sound.playing()) {
      sound.volume(isMuted ? 0 : get().volume);
      sound.play();
      set({ isPlaying: true });
    }
  },

  pause: () => {
    const { sound } = get();
    if (sound && sound.playing()) {
      sound.pause();
      set({ isPlaying: false });
    }
  },

  stop: () => {
    const { sound } = get();
    if (sound) {
      sound.stop();
      set({ isPlaying: false });
    }
  },

  setVolume: (volume) => {
    const { sound, isMuted } = get();
    const newVolume = Math.max(0, Math.min(1, volume));
    if (sound && !isMuted) {
      sound.volume(newVolume);
    }
    set({ volume: newVolume });
  },

  toggleMute: () => {
    const { sound, isMuted, volume } = get();
    if (sound) {
      sound.volume(isMuted ? volume : 0);
    }
    set({ isMuted: !isMuted });
  },

  nextTrack: () => {
    const { tracks, currentTrackIndex } = get();
    if (tracks.length > 0) {
      const nextIndex = (currentTrackIndex + 1) % tracks.length;
      get().playTrack(nextIndex);
    }
  },

  previousTrack: () => {
    const { tracks, currentTrackIndex } = get();
    if (tracks.length > 0) {
      const prevIndex =
        currentTrackIndex <= 0 ? tracks.length - 1 : currentTrackIndex - 1;
      get().playTrack(prevIndex);
    }
  },

  playTrack: (index: number) => {
    const { tracks } = get();
    if (index >= 0 && index < tracks.length) {
      const track = tracks[index];
      get().setCurrentTrack(track);
      set({ currentTrackIndex: index });
      get().play();
    }
  },
}));

