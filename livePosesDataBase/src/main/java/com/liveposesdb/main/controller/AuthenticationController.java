package com.liveposesdb.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.liveposesdb.main.model.User;
import com.liveposesdb.main.services.AuthenticationServices;

@RestController
@RequestMapping("/database/api/auth")
public class AuthenticationController {
	
	private final AuthenticationServices authenticationServices;
	
	public AuthenticationController(AuthenticationServices authenticationServices) {
		this.authenticationServices = authenticationServices;
	}
	
	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody User user) {
		System.out.println("User: " + user.getEmail());
		boolean result = authenticationServices.signup(user);
		
		if(result)
			return ResponseEntity.status(HttpStatus.CREATED).body("User has been created successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create the user");
	}
	
	@GetMapping("/login")
	public ResponseEntity<User> login(@RequestParam String email) {
		User user = authenticationServices.login(email);
		
		if(user != null)
			return ResponseEntity.status(HttpStatus.OK).body(user);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

}
