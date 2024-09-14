package com.liveposes.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.liveposes.main.model.BasicStatistics;
import com.liveposes.main.model.CurrentRoutine;
import com.liveposes.main.services.ExercisesServices;
import com.liveposes.main.services.StatisticsServices;
import com.liveposes.main.utils.JWTUtil;

@RestController
@RequestMapping("/api/statistics")
public class StatisticsController {
	
	private final StatisticsServices statisticsServices;
	private JWTUtil jwtUtil;

	public StatisticsController() {
		this.statisticsServices = new StatisticsServices();
		this.jwtUtil = new JWTUtil();
	}
	
	
	@PostMapping("/post/basic_statistics")
	public ResponseEntity<String> setTheLastRoutine(@RequestBody BasicStatistics basicStatistics,
			@RequestHeader("Authorization") String token) {
		
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		basicStatistics.setUserId(Long.parseLong(userID));
		
		if(statisticsServices.setBasicStatistics(basicStatistics))
			return ResponseEntity.status(HttpStatus.OK).body("The statistics has been added successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add statistics");
	}

}
