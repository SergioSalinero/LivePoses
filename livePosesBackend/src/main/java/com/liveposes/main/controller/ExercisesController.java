package com.liveposes.main.controller;


import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;

import com.liveposes.main.model.Exercise;
import com.liveposes.main.services.ExercisesServices;


@RestController
@RequestMapping("/api/routine")
public class ExercisesController {

	private final ExercisesServices dbManager;
	
	
	public ExercisesController() {
		this.dbManager = new ExercisesServices();
	}
	
	@GetMapping("/get/exercises")
	public ResponseEntity<List<Exercise>> getExercises() {
		//String usuarioID = jwtUtil.getKey(token);
		//if(usuarioID == null) return error;
		List<Exercise> exerciseList = this.dbManager.getExercises();
		
		if(exerciseList != null)
			return ResponseEntity.status(HttpStatus.OK).body(exerciseList);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
}
