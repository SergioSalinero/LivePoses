package com.liveposes.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.liveposes.main.model.User;
import com.liveposes.main.services.AuthenticationServices;
//import com.liveposes.main.utils.EmailService;
import com.liveposes.main.utils.JWTUtil;
import com.liveposes.main.utils.PasswordEncryption;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
	
	private AuthenticationServices authenticationServices;
	private JWTUtil jwtUtil;
	
//	private final EmailService emailService;
	
	@Autowired
	public AuthenticationController(/*EmailService emailService*/) {
		this.authenticationServices = new AuthenticationServices();
		this.jwtUtil = new JWTUtil();
//		this.emailService = emailService;
	}
	
	
	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody User user) {		
		PasswordEncryption pwdEncrypt = new PasswordEncryption();
		
		user.setPassword(pwdEncrypt.encryptPassword(user.getPassword()));
		
		if(this.authenticationServices.signup(user)) {
			String tokenJWT = jwtUtil.create(String.valueOf(user.getId()), user.getEmail());
			return ResponseEntity.status(HttpStatus.CREATED).body(tokenJWT);
		}
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create the user");
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody User user) {
		User u = authenticationServices.login(user.getEmail(), user.getPassword());
		
		if(u != null) {
			String tokenJWT = jwtUtil.create(String.valueOf(u.getId()), u.getEmail());
			return ResponseEntity.status(HttpStatus.OK).body(tokenJWT);
		}
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to log the user");
	}
	
/*	@PostMapping("/send_email")
	public ResponseEntity<String> sendEmail(@RequestBody String email) {
		try {
            String subject = "HOLA";
            String body = "HOLA";

            emailService.sendSimpleEmail(email, subject, body);
            return ResponseEntity.status(HttpStatus.OK).body("Email has been sent");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
        }
	}*/

}
