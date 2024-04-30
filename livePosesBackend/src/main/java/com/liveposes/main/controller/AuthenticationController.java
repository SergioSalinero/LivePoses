package com.liveposes.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.liveposes.main.model.User;
import com.liveposes.main.services.AuthenticationServices;
import com.liveposes.main.utils.JWTUtil;
import com.liveposes.main.utils.PasswordEncryption;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
	
	private AuthenticationServices authenticationServices;
	private JWTUtil jwtUtil;
	
	
	public AuthenticationController() {
		this.authenticationServices = new AuthenticationServices();
		this.jwtUtil = new JWTUtil();
	}
	
	
	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody User user) {		
		PasswordEncryption pwdEncrypt = new PasswordEncryption();
		
		user.setPassword(pwdEncrypt.encryptPassword(user.getPassword()));
		
		if(this.authenticationServices.signup(user))
			return ResponseEntity.status(HttpStatus.CREATED).body("User has been created successfully");
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

}
