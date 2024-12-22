package com.liveposesdb.main.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.liveposesdb.main.model.User;
import com.liveposesdb.main.utils.DBConnection;

@Service
public class AuthenticationServices {

	private final DBConnection dbConnection;

	public AuthenticationServices(DBConnection dbConnection) {
		this.dbConnection = dbConnection;
	}

	public boolean signup(User user) {
		String query = "INSERT INTO users (email, password, routineCounter, timeCounter, caloriesCounter, breakTimeCounter, averageAccuracy, weight) VALUES ('" + user.getEmail() + "', '" + user.getPassword() + "', 0, 0, 0, 0, 0, '" + user.getWeight() + "');";

		List<String[]> results = dbConnection.DBOperation(query, "INSERT");
		
		if(results != null)
			return true;
	
		return false;
	}

	public User login(String email) {
		String query = "SELECT * FROM users WHERE email = '" + email + "';";
		
		List<String[]> results = dbConnection.DBOperation(query, "SELECT");
		
		if(results.size() > 0) {
			User user = new User();
			user.setId(Long.parseLong(results.get(0)[0]));
			user.setEmail(results.get(0)[1]);
			user.setPassword(results.get(0)[2]);
			
			return user;
		}
		
		return null;
	}

}
