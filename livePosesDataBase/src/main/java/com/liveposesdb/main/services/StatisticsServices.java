package com.liveposesdb.main.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liveposesdb.main.model.BasicStatistics;
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
		
		
		query = "UPDATE users SET breakTimeCounter = breakTimeCounter + " + basicStatistics.getBreakTimeCounter() + " WHERE id = " + basicStatistics.getUserId() + ";";
		results = dbConnection.DBOperation(query, "UPDATE");
		
		if(results == null)
			return false;
		
		
		

		return true;
	}

}
