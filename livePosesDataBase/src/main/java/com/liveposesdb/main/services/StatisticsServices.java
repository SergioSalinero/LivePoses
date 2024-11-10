package com.liveposesdb.main.services;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liveposesdb.main.model.BasicStatistics;
import com.liveposesdb.main.model.CurrentRoutine;
import com.liveposesdb.main.model.CurrentRoutineExercises;
import com.liveposesdb.main.utils.DBConnection;


@Service
public class StatisticsServices {
	
	private final DBConnection dbConnection;

	public StatisticsServices(DBConnection dbConnection) {
		this.dbConnection = dbConnection;
	}

	public boolean setBasicStatistics(BasicStatistics basicStatistics) {
		String query = "UPDATE users SET routineCounter = routineCounter + 1 WHERE id = " + basicStatistics.getUserId() + ";";
		List<String[]> results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		
		query = "UPDATE users SET timeCounter = timeCounter + " + basicStatistics.getTimeCounter() + " WHERE id = " + basicStatistics.getUserId() + ";";
		results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		
		query = "UPDATE users SET caloriesCounter = caloriesCounter + " + basicStatistics.getCaloriesCounter() + " WHERE id = " + basicStatistics.getUserId() + ";";
		results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		
		query = "UPDATE users SET breakTimeCounter = breakTimeCounter + " + basicStatistics.getBreakTimeCounter() + " WHERE id = " + basicStatistics.getUserId() + ";";
		results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		
		query = "UPDATE users SET averageAccuracy = " + basicStatistics.getAverageAccuracy() + " WHERE id = " + basicStatistics.getUserId() + ";";
		results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		
		LocalDateTime now = LocalDateTime.now();
		Timestamp sqlTimestamp = Timestamp.valueOf(now);
		
		query = "SELECT * FROM statistics WHERE userId = " + basicStatistics.getUserId() + " AND DATE(date) = CURDATE();";
		results = dbConnection.DBOperation(query, "SELECT");
		
		if(results == null || results.isEmpty()) {
			int routines = basicStatistics.getRoutineCounter() + 1;
			query = "INSERT INTO statistics (userId, date, trainingTime, routines, calories) VALUES ('" + basicStatistics.getUserId() + "', '" + sqlTimestamp + "', '" + basicStatistics.getTimeCounter() + "', '" + routines + "', '" + basicStatistics.getCaloriesCounter() + "');";
			results = dbConnection.DBOperation(query, "INSERT");
			if(results == null) return false;
		}
		else {
			int statisticsId = Integer.parseInt(results.get(0)[0]);
			query = "UPDATE statistics SET trainingTime = trainingTime + " + basicStatistics.getTimeCounter() + ", routines = routines + 1, calories = calories + " + basicStatistics.getCaloriesCounter() + " WHERE id = " + statisticsId + ";";
			results = dbConnection.DBOperation(query, "UPDATE");
			if(results == null) return false;
		}
		

		return true;
	}

	public BasicStatistics getBasicStatistics(long userID) {
		String query = "SELECT routineCounter, timeCounter, caloriesCounter, breakTimeCounter, averageAccuracy FROM users where id = " + userID + ";";
		List<String[]> results = dbConnection.DBOperation(query, "SELECT");
		
		System.out.println(userID);
		
		int routineCounter = Integer.parseInt(results.get(0)[0]);
		int timeCounter = Integer.parseInt(results.get(0)[1]);
		float caloriesCounter = Float.parseFloat(results.get(0)[2]);
		int breakTimeCounter = Integer.parseInt(results.get(0)[3]);
		float averageAccuracy = Float.parseFloat(results.get(0)[4]);
		
		BasicStatistics basicStatistics = new BasicStatistics(routineCounter, timeCounter, caloriesCounter, breakTimeCounter, averageAccuracy, userID);
		
		return basicStatistics;
	}

	public float getWeight(long userID) {
		String query = "SELECT weight FROM users where id = " + userID + ";";
		List<String[]> results = dbConnection.DBOperation(query, "SELECT");
		
		return Float.parseFloat(results.get(0)[0]);
	}

	public List<String[]> getListStatistics(long userID) {
		String query = "SELECT * FROM statistics where userId = " + userID + ";";
		List<String[]> results = dbConnection.DBOperation(query, "SELECT");
		
		return results;
	}

}
