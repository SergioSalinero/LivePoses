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
		String query = "INSERT INTO users (email, password) VALUES ('" + user.getEmail() + "', '" + user.getPassword() + "');";

		List<String[]> results = dbConnection.DBOperation(query, "POST");
		
		if(results != null)
			return true;
	
		return false;
	}

}
