package com.liveposesdb.main.services;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liveposesdb.main.model.CategoryCount;
import com.liveposesdb.main.model.CurrentRoutine;
import com.liveposesdb.main.model.CurrentRoutineExercises;
import com.liveposesdb.main.model.Exercise;
import com.liveposesdb.main.model.PublicRoutine;
import com.liveposesdb.main.model.User;
import com.liveposesdb.main.utils.DBConnection;

@Service
public class UserServices {

	private final DBConnection dbConnection;

	public UserServices(DBConnection dbConnection) {
		this.dbConnection = dbConnection;
	}

	public String[] getUserData(long userID) {
		String query = "SELECT email, weight FROM users WHERE id = " + userID + ";";

		List<String[]> results = dbConnection.DBOperation(query, "SELECT");

		if (results == null || results.isEmpty())
			return null;
		
		String [] user = new String[2];
		
		user[0] = results.get(0)[0];
		user[1] = results.get(0)[1];

		return user;
	}

	public boolean setUpdateWeight(User user) {
		String query = "UPDATE users SET weight = " + user.getWeight() + " WHERE id = " + user.getId() + ";";
		List<String[]> results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		return true;
	}

	public boolean setDeleteAccount(String userID) {
		String query = "DELETE FROM users WHERE id = " + userID + ";";
		List<String[]> results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		
		query = "DELETE FROM current_routine WHERE id = " + userID + ";";
		results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		
		query = "DELETE FROM statistics WHERE id = " + userID + ";";
		results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		return true;
	}

}
