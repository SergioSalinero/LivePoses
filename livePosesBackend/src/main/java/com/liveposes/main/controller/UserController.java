package com.liveposes.main.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.liveposes.main.model.BasicStatistics;
import com.liveposes.main.model.CurrentRoutine;
import com.liveposes.main.model.Exercise;
import com.liveposes.main.model.User;
import com.liveposes.main.services.ExercisesServices;
import com.liveposes.main.services.StatisticsServices;
import com.liveposes.main.services.UserServices;
import com.liveposes.main.utils.JWTUtil;

@RestController
@RequestMapping("/api/user")
public class UserController {
	
	private final UserServices userServices;
	private JWTUtil jwtUtil;

	public UserController() {
		this.userServices = new UserServices();
		this.jwtUtil = new JWTUtil();
	}
	
	@GetMapping("/get/user_data")
	public ResponseEntity<String[]> getBasicStatistics(@RequestHeader("Authorization") String token) {
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);
		
		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String[] user = this.userServices.getUserData(userID);

		if (user != null)
			return ResponseEntity.status(HttpStatus.OK).body(user);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@PostMapping("/post/update_weight")
	public ResponseEntity<String> setWeight(@RequestBody User user,
			@RequestHeader("Authorization") String token) {
		
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		user.setId(Long.parseLong(userID));
		
		if(userServices.setWeight(user))
			return ResponseEntity.status(HttpStatus.OK).body("Weight has been updated successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add statistics");
	}
	
	@PostMapping("/post/delete_account")
	public ResponseEntity<String> setDeleteAccount(@RequestHeader("Authorization") String token) {
		
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		if(userServices.setDeleteAccount(userID))
			return ResponseEntity.status(HttpStatus.OK).body("Weight has been updated successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add statistics");
	}

}
