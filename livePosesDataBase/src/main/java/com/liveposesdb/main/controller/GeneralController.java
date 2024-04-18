package com.liveposesdb.main.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.liveposesdb.main.model.Exercise;
import com.liveposesdb.main.services.ExercisesServices;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/database/api")
public class GeneralController {

	private final ExercisesServices exercisesServices;
	
	public GeneralController(ExercisesServices exercisesServices) {
		this.exercisesServices = exercisesServices;
	}
	
	@GetMapping("/get/exercises")
	public List<Exercise> getExercise() {
		return exercisesServices.getExercises();
	}
	
}
