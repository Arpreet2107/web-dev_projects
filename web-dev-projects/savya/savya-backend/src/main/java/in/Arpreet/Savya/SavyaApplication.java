package in.Arpreet.Savya;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class SavyaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SavyaApplication.class, args);
	}

}
