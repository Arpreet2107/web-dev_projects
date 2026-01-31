package in.Arpreet.Savya.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping({"/status", "/health"})
public class HomeController {
    @GetMapping
    public String healthCheck() {
        return "Application is running successfully at " + LocalDateTime.now();
    }
}
