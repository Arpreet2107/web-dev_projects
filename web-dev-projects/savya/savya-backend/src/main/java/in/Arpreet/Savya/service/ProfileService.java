package in.Arpreet.Savya.service;

import in.Arpreet.Savya.dto.AuthDTO;
import in.Arpreet.Savya.dto.ProfileDTO;
import in.Arpreet.Savya.entity.ProfileEntity;
import in.Arpreet.Savya.repository.ProfileRepository;
import in.Arpreet.Savya.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {
    private final ProfileRepository profileRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    @Value("{app.activation.url}")
    private String activationURL;


    //add methods to handle the profile-related operations, such as creating, updating, and retrieving profiles.
    public ProfileDTO registerProfile(ProfileDTO profileDTO) {
        ProfileEntity newProfile = toEntity(profileDTO);
        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile = profileRepository.save(newProfile);
        //Sending the activation email
        String activationLink = activationURL+"/api/v1.0/activate?token=" + newProfile.getActivationToken();
        String subject = "Activate your Savya Account";
        String body = "Click on the following link to activate your account: " + activationLink;
        emailService.sendEmail(newProfile.getEmail(), subject,body);
        return toDTO(newProfile);
    }
    public ProfileEntity toEntity(ProfileDTO profileDTO) {
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                .password(passwordEncoder.encode(profileDTO.getPassword()))
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt((profileDTO.getUpdatedAt()))
                .build();
    }
    public ProfileDTO toDTO(ProfileEntity profileEntity) {
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt((profileEntity.getUpdatedAt()))
                .build();
    }
    public boolean activateProfile(String activationToken) {
        return profileRepository.findByActivationToken(activationToken)
                .map(profile -> {
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                })
                .orElse(false);
    }
    public boolean isAccountActive(String email){
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }
    public ProfileEntity getCurrentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return profileRepository.findByEmail(authentication.getName())
                .orElseThrow(()-> new UsernameNotFoundException("Profile not found with email: " + authentication.getName()));
    }
    public ProfileDTO getPublicProfile(String email) {
        ProfileEntity currentUser = null;
        if(email == null){
            currentUser = getCurrentProfile();
        }else{
            currentUser = profileRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email: " + email));
        }
        return ProfileDTO.builder()
                .id(currentUser.getId())
                .fullName(currentUser.getFullName())
                .email(currentUser.getEmail())
                .profileImageUrl(currentUser.getProfileImageUrl())
                .createdAt(currentUser.getCreatedAt())
                .updatedAt(currentUser.getUpdatedAt())
                .build();
    }
    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO){
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken((authDTO.getEmail()), authDTO.getPassword()));
            //generating JWT TOKEN
            String token = jwtUtil.generateToken(authDTO.getEmail());
            return Map.of(
                    "token",token,
                    "user",getPublicProfile(authDTO.getEmail())
            );
        } catch (Exception e) {
            throw new RuntimeException("Invalid email or password");
        }
    }
}
