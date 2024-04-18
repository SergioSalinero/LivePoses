package com.liveposes.main.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.liveposes.main.model.Exercise;

@Service
public class DBManager {
	
	private RestTemplate restTemplate;
	
	/* CONSTRUCTOR */
	public DBManager() {
		this.restTemplate = new RestTemplate();
	}

	public List<Exercise> getExercises() {
		String url = "http://localhost:5001/database/api/get/exercises";

		ResponseEntity<Exercise[]> response = restTemplate.getForEntity(url, Exercise[].class);
		
		return Arrays.asList(response.getBody());
	}

}
