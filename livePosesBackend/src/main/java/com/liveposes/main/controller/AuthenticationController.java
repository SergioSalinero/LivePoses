package com.liveposes.main.controller;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.liveposes.main.model.User;

public class AuthenticationController {
	
	@PostMapping("auth")
	public User login(@RequestParam("email") String email, @RequestParam("password") String password) {
		String token
		User user = new User();
		
		return user;
	}
	
	private String getJWTToken(String email) {
		String secretKey = "Yz$9@Qp#Lx2!sD*";
		List<GrantedAuthority> grantedAuthorities = AuthorityUtils;
		
	}

}
