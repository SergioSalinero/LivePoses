package com.liveposesdb.main.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.liveposesdb.main.model.BasicStatistics;
import com.liveposesdb.main.model.CurrentRoutine;
import com.liveposesdb.main.services.ExercisesServices;
import com.liveposesdb.main.services.StatisticsServices;


@RestController
@RequestMapping("/database/api/statistics")
public class StatisticsController {
	
	private final StatisticsServices statisticsServices;

	public StatisticsController(StatisticsServices statisticsServices) {
		this.statisticsServices = statisticsServices;
	}
	
	
	@PostMapping("/post/basic_statistics")
	public ResponseEntity<String> setBasicStatistics(@RequestBody BasicStatistics basicStatistics) {
		
		if(statisticsServices.setBasicStatistics(basicStatistics))
			return ResponseEntity.status(HttpStatus.OK).body("The statistics has been added successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add statistics");
	}

}
