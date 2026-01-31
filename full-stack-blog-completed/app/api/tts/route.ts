import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { text, voice = "romantic-male" } = await request.json();

    const ttsProvider = process.env.NEXT_PUBLIC_TTS_PROVIDER;
    const apiKey = process.env.NEXT_PUBLIC_TTS_API_KEY;

    if (!ttsProvider || !apiKey) {
      return NextResponse.json(
        { error: "TTS provider not configured" },
        { status: 500 }
      );
    }

    let audioUrl: string;

    switch (ttsProvider.toLowerCase()) {
      case "elevenlabs":
        // ElevenLabs TTS
        const elevenLabsResponse = await fetch(
          `https://api.elevenlabs.io/v1/text-to-speech/${voice || "21m00Tcm4TlvDq8ikWAM"}`,
          {
            method: "POST",
            headers: {
              "Accept": "audio/mpeg",
              "Content-Type": "application/json",
              "xi-api-key": apiKey,
            },
            body: JSON.stringify({
              text,
              model_id: "eleven_monolingual_v1",
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            }),
          }
        );

        if (!elevenLabsResponse.ok) {
          throw new Error("ElevenLabs TTS failed");
        }

        const audioBuffer = await elevenLabsResponse.arrayBuffer();
        return new NextResponse(audioBuffer, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "attachment; filename=voice-letter.mp3",
          },
        });

      case "google":
        // Google Cloud TTS
        const googleResponse = await fetch(
          `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              input: { text },
              voice: {
                languageCode: "en-US",
                name: "en-US-Wavenet-D",
                ssmlGender: "MALE",
              },
              audioConfig: {
                audioEncoding: "MP3",
              },
            }),
          }
        );

        if (!googleResponse.ok) {
          throw new Error("Google TTS failed");
        }

        const googleData = await googleResponse.json();
        const googleAudioBuffer = Buffer.from(
          googleData.audioContent,
          "base64"
        );

        return new NextResponse(googleAudioBuffer, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "attachment; filename=voice-letter.mp3",
          },
        });

      case "azure":
        // Azure Cognitive Services TTS
        const azureResponse = await fetch(
          `https://${process.env.AZURE_REGION}.tts.speech.microsoft.com/cognitiveservices/v1`,
          {
            method: "POST",
            headers: {
              "Ocp-Apim-Subscription-Key": apiKey,
              "Content-Type": "application/ssml+xml",
              "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
            },
            body: `<speak version='1.0' xml:lang='en-US'><voice xml:lang='en-US' xml:gender='Male' name='en-US-ChristopherNeural'>${text}</voice></speak>`,
          }
        );

        if (!azureResponse.ok) {
          throw new Error("Azure TTS failed");
        }

        const azureAudioBuffer = await azureResponse.arrayBuffer();
        return new NextResponse(azureAudioBuffer, {
          headers: {
            "Content-Type": "audio/mpeg",
            "Content-Disposition": "attachment; filename=voice-letter.mp3",
          },
        });

      default:
        return NextResponse.json(
          { error: "Unsupported TTS provider" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("TTS Error:", error);
    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}

