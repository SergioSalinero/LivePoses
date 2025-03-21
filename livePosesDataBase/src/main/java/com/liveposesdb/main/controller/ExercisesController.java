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
import com.liveposesdb.main.model.RoutineHistory;
import com.liveposesdb.main.services.ExercisesServices;


@RestController
@RequestMapping("/database/api/routine")
public class ExercisesController {

	private final ExercisesServices exercisesServices;
	
	public ExercisesController(ExercisesServices exercisesServices) {
		this.exercisesServices = exercisesServices;
	}
	
	@GetMapping("/get/exercises")
	public ResponseEntity<List<Exercise>> getExercises() {
		List<Exercise> exerciseList = exercisesServices.getExercises();
		
		if(exerciseList != null)
			return ResponseEntity.status(HttpStatus.OK).body(exerciseList);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@GetMapping("/get/exercise")
	public ResponseEntity<Exercise> getExercise(@RequestParam int id) {
		Exercise exercise = exercisesServices.getExercise(id);
		
		if(exercise != null)
			return ResponseEntity.status(HttpStatus.OK).body(exercise);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@PostMapping("/post/exercise")
	public ResponseEntity<String> setExercise(@RequestBody Exercise exercise){
		
		if(exercisesServices.setExercise(exercise))
			return ResponseEntity.status(HttpStatus.OK).body("The exercise has been added successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The routine could not be added");
	}
	
	@PostMapping("/post/edit_exercise")
	public ResponseEntity<String> setEditExercise(@RequestBody Exercise exercise){
		
		if(exercisesServices.setEditExercise(exercise))
			return ResponseEntity.status(HttpStatus.OK).body("The exercise has been updated successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The exercise could not be updated");
	}
	
	@PostMapping("/post/delete_exercise")
	public ResponseEntity<String> setDeleteExercise(@RequestBody int id){
		
		if(exercisesServices.setDeleteExercise(id))
			return ResponseEntity.status(HttpStatus.OK).body("The exercise has been added successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The routine could not be added");
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
	
	@PostMapping("/post/publish_routine")
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
	
	@PostMapping("/post/reset_category_routines")
	public ResponseEntity<String> setResetCategory(@RequestBody String category){
		
		if(exercisesServices.setResetCategory(category))
			return ResponseEntity.status(HttpStatus.OK).body("The category has been reset successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The routine could not be added");
	}
	
	@PostMapping("/post/delete_category_routine")
	public ResponseEntity<String> setDeleteCategoryRoutine(@RequestBody long id){
		
		if(exercisesServices.setDeleteCategoryRoutine(id))
			return ResponseEntity.status(HttpStatus.OK).body("The routine has been removed successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The routine could not be added");
	}
	
	@PostMapping("/post/routine_history")
	public ResponseEntity<String> setRoutineHistory(@RequestBody RoutineHistory routineHistory){
		
		if(exercisesServices.setRoutineHistory(routineHistory))
			return ResponseEntity.status(HttpStatus.OK).body("The routine has been added successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The routine could not be added");
	}
	
	@GetMapping("/get/routine_history")
	public ResponseEntity<List<RoutineHistory>> getRoutineHistory(@RequestParam long userID) {
		List<RoutineHistory> routineHistory = exercisesServices.getRoutineHistory(userID);
		
		if(routineHistory != null)
			return ResponseEntity.status(HttpStatus.OK).body(routineHistory);
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	}
	
	@PostMapping("/post/reset_routine_history")
	public ResponseEntity<String> setResetHistory(@RequestBody long userID){
		
		if(exercisesServices.setResetHistory(userID))
			return ResponseEntity.status(HttpStatus.OK).body("The routine history has been reset successfully");
		else
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The routine could not be added");
	}
	
}
