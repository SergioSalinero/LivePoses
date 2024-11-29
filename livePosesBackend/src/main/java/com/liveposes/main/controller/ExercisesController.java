package com.liveposes.main.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.liveposes.main.model.CategoryCount;
import com.liveposes.main.model.CurrentRoutine;
import com.liveposes.main.model.CurrentRoutineExercises;
import com.liveposes.main.model.Exercise;
import com.liveposes.main.model.PublicRoutine;
import com.liveposes.main.model.RoutineHistory;
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
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add the routine");
	}
	
	@GetMapping("/get/current_routine")
	public ResponseEntity<CurrentRoutine> getCurrentRoutine(@RequestHeader("Authorization") String token) {
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		CurrentRoutine currentRoutine = exercisesServices.getCurrentRoutine(userID);
		
		if (currentRoutine == null) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	    }
		
		return ResponseEntity.status(HttpStatus.OK).body(currentRoutine);
	}
	
	@GetMapping("/get/start_signal")
	public ResponseEntity<Exercise> getStartSignal(@RequestHeader("Authorization") String token) {
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		Exercise startSignal = this.exercisesServices.getStartSignal();

		if (startSignal != null)
			return ResponseEntity.status(HttpStatus.OK).body(startSignal);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@PostMapping("/post/publish_routine")
	public ResponseEntity<String> setPublicRoutine(@RequestBody PublicRoutine publicRoutine,
			@RequestHeader("Authorization") String token) {
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		
		if(exercisesServices.setPublicRoutine(publicRoutine))
			return ResponseEntity.status(HttpStatus.OK).body("The routine has been published successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to publish the routine");
	}
	
	@GetMapping("/get/category_count")
	public ResponseEntity<List<CategoryCount>> getCategoryCount(@RequestHeader("Authorization") String token) {
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		List<CategoryCount> categoryCount = exercisesServices.getCategoryCount();
		
		if (categoryCount != null)
			return ResponseEntity.status(HttpStatus.OK).body(categoryCount);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@GetMapping("/get/category_routines")
	public ResponseEntity<List<PublicRoutine>> getCategoryRoutine(@RequestParam String category,
			@RequestHeader("Authorization") String token) {
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		List<PublicRoutine> categoryRoutine = exercisesServices.getCategoryRoutine(category);
		
		if (categoryRoutine != null)
			return ResponseEntity.status(HttpStatus.OK).body(categoryRoutine);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@PostMapping("/post/reset_category_routines")
	public ResponseEntity<String> setResetCategoryRoutine(@RequestBody String category,
			@RequestHeader("Authorization") String token) {
		
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		if(exercisesServices.setResetCategoryRoutines(category))
			return ResponseEntity.status(HttpStatus.OK).body("The category has been reset successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add the routine");
	}
	
	@PostMapping("/post/delete_category_routine")
	public ResponseEntity<String> setDeleteCategoryRoutine(@RequestBody long id,
			@RequestHeader("Authorization") String token) {
		
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		if(exercisesServices.setDeleteCategoryRoutine(id))
			return ResponseEntity.status(HttpStatus.OK).body("The routine has been removed successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add the routine");
	}
	
	@PostMapping("/post/routine_history")
	public ResponseEntity<String> setRoutineHistory(@RequestBody RoutineHistory routineHistory,
			@RequestHeader("Authorization") String token) {
		
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		routineHistory.setUserId(Long.parseLong(userID));		
		
		if(exercisesServices.setRoutineHistory(routineHistory))
			return ResponseEntity.status(HttpStatus.OK).body("The routine has been added successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add the routine");
	}
	
	@GetMapping("/get/routine_history")
	public ResponseEntity<List<RoutineHistory>> getCategoryRoutine(@RequestHeader("Authorization") String token) {
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);
		
		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		List<RoutineHistory> routineHistory = exercisesServices.getRoutineHistory(Long.parseLong(userID));
		
		if (routineHistory != null)
			return ResponseEntity.status(HttpStatus.OK).body(routineHistory);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@PostMapping("/post/reset_routine_history")
	public ResponseEntity<String> setRoutineHistory(@RequestHeader("Authorization") String token) {
		
		if (token == null || token.isBlank())
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

		String userID = jwtUtil.getKey(token);

		if (userID == null)
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
		
		if(exercisesServices.setResetHistory(Long.parseLong(userID)))
			return ResponseEntity.status(HttpStatus.OK).body("The routine has been added successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add the routine");
	}

}
