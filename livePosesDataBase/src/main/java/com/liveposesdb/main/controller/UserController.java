package com.liveposesdb.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.liveposesdb.main.model.BasicStatistics;
import com.liveposesdb.main.model.CurrentRoutine;
import com.liveposesdb.main.model.User;
import com.liveposesdb.main.services.AuthenticationServices;
import com.liveposesdb.main.services.UserServices;

@RestController
@RequestMapping("/database/api/user")
public class UserController {
	
	private final UserServices userServices;
	
	public UserController(UserServices userServices) {
		this.userServices = userServices;
	}
	
	@GetMapping("/get/user_data")
	public ResponseEntity<String[]> getUserData(@RequestParam long userID) {
		String[] user = userServices.getUserData(userID);
		
		if (user == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
		
		return ResponseEntity.status(HttpStatus.OK).body(user);
	}
	
	@PostMapping("/post/update_weight")
	public ResponseEntity<Boolean> setWeight(@RequestBody User user) {
		
		if(userServices.setUpdateWeight(user))
			return ResponseEntity.status(HttpStatus.OK).body(true);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
	}
	
	@PostMapping("/post/delete_account")
	public ResponseEntity<Boolean> setDeleteAccount(@RequestBody String userID) {

		if(userServices.setDeleteAccount(userID))
			return ResponseEntity.status(HttpStatus.OK).body(true);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);
	}
	
}
