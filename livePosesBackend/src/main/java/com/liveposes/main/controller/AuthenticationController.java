package com.liveposes.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.liveposes.main.dao.UserDAO;
import com.liveposes.main.model.User;
import com.liveposes.main.services.AuthenticationServices;
import com.liveposes.main.utils.JWTUtil;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {
	
	private AuthenticationServices authenticationServices;
	
	private UserDAO userDAO;
	
	private JWTUtil jwtUtil;
	
	
	public AuthenticationController() {
		this.authenticationServices = new AuthenticationServices();
	}
	
	
	@PostMapping("/signup")
	public ResponseEntity<String> signup(@RequestBody User user) {
		
		/*User loggedUser = userDAO.getUserByCredentials(user);
		if(loggedUser != null) {
				String tokenJWT = jwtUtil.create(String.valueOf(loggedUser.getId()), loggedUser.getEmail());
				return tokenJWT;
		}*/		
		
		if(this.authenticationServices.signup(user))
			return ResponseEntity.status(HttpStatus.CREATED).body("User has been created successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create the user");
	}

}
