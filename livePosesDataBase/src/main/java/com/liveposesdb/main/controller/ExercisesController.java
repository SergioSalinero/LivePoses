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

import com.fasterxml.jackson.databind.ObjectMapper;
import com.liveposesdb.main.model.CategoryCount;
import com.liveposesdb.main.model.CurrentRoutine;
import com.liveposesdb.main.model.Exercise;
import com.liveposesdb.main.model.PublicRoutine;
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
	
	@GetMapping("/get/current_routine")
	public ResponseEntity<CurrentRoutine> getCurrentRoutine(@RequestParam long userID) {
		CurrentRoutine currentRoutine = exercisesServices.getCurrentRoutine(userID);
		
		if (currentRoutine == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
		
		return ResponseEntity.status(HttpStatus.OK).body(currentRoutine);
	}
	
	@GetMapping("/get/start_signal")
	public ResponseEntity<Exercise> getStartSignal() {
		Exercise startSignal = exercisesServices.getStartSignal();
		
		if(startSignal != null)
			return ResponseEntity.status(HttpStatus.OK).body(startSignal);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@PostMapping("/post/public_routine")
	public ResponseEntity<String> setPublicRoutine(@RequestBody PublicRoutine publicRoutine) {
		if(exercisesServices.setPublicRoutine(publicRoutine))
			return ResponseEntity.status(HttpStatus.OK).body("The routine has been published successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The routine could not be published");
	}
	
	@GetMapping("/get/category_count")
	public ResponseEntity<List<CategoryCount>> getCategoryCount() {
		List<CategoryCount> categoryCount = exercisesServices.getCategoryCount();
		
		if(categoryCount != null)
			return ResponseEntity.status(HttpStatus.OK).body(categoryCount);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@GetMapping("/get/category_routines")
	public ResponseEntity<List<PublicRoutine>> getCategoryRoutines(@RequestParam String category) {
		List<PublicRoutine> categoryRoutines = exercisesServices.getCategoryRoutines(category);
		
		if(categoryRoutines != null)
			return ResponseEntity.status(HttpStatus.OK).body(categoryRoutines);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
}
