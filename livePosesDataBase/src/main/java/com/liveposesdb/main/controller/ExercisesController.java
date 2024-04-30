package com.liveposesdb.main.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.liveposesdb.main.model.CurrentRoutine;
import com.liveposesdb.main.model.Exercise;
import com.liveposesdb.main.services.ExercisesServices;


@RestController
@RequestMapping("/database/api/routine")
public class ExercisesController {

	private final ExercisesServices exercisesServices;
	
	public ExercisesController(ExercisesServices exercisesServices) {
		this.exercisesServices = exercisesServices;
	}
	
	@GetMapping("/get/exercises")
	public ResponseEntity<List<Exercise>> getExercise() {
		List<Exercise> exerciseList = exercisesServices.getExercises();
		
		if(exerciseList != null)
			return ResponseEntity.status(HttpStatus.OK).body(exerciseList);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@PostMapping("/post/current_routine")
	public ResponseEntity<String> setCurrentRoutine(@RequestBody CurrentRoutine currentRoutine){
		
		if(exercisesServices.setCurrentRoutine(currentRoutine))
			return ResponseEntity.status(HttpStatus.OK).body("The routine has been added successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The routine could not be added");
	}
	
}
