package com.liveposesdb.main.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.liveposesdb.main.model.BasicStatistics;
import com.liveposesdb.main.model.CurrentRoutine;
import com.liveposesdb.main.model.Exercise;
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
	
	@GetMapping("/get/basic_statistics")
	public ResponseEntity<BasicStatistics> getBasicStatistics(@RequestParam long userID) {
		BasicStatistics basicStatisticsList = statisticsServices.getBasicStatistics(userID);
		
		if(basicStatisticsList != null)
			return ResponseEntity.status(HttpStatus.OK).body(basicStatisticsList);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@GetMapping("/get/weight")
	public ResponseEntity<Float> getWeight(@RequestParam long userID) {
		float weight = statisticsServices.getWeight(userID);

		if(weight > 0)
			return ResponseEntity.status(HttpStatus.OK).body(weight);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

}
