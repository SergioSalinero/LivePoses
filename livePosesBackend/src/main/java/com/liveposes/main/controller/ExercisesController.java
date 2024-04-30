package com.liveposes.main.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.liveposes.main.model.CurrentRoutine;
import com.liveposes.main.model.CurrentRoutineExercises;
import com.liveposes.main.model.Exercise;
import com.liveposes.main.services.ExercisesServices;
import com.liveposes.main.utils.JWTUtil;

@RestController
@RequestMapping("/api/routine")
public class ExercisesController {

	private final ExercisesServices exercisesServices;
	private JWTUtil jwtUtil;

	public ExercisesController() {
		this.exercisesServices = new ExercisesServices();
		this.jwtUtil = new JWTUtil();
	}

	@GetMapping("/get/exercises")
	public ResponseEntity<List<Exercise>> getExercises(@RequestHeader("Authorization") String token) {
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		List<Exercise> exerciseList = this.exercisesServices.getExercises();

		if (exerciseList != null)
			return ResponseEntity.status(HttpStatus.OK).body(exerciseList);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

	@PostMapping("/post/current_routine")
	public ResponseEntity<String> setCurrentRoutine(@RequestBody CurrentRoutine currentRoutine,
			@RequestHeader("Authorization") String token) {
		
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		currentRoutine.setUserId(Long.parseLong(userID));
		
		if(exercisesServices.setCurrentRoutine(currentRoutine))
			return ResponseEntity.status(HttpStatus.OK).body("The routine has been added successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}

}
