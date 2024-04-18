package com.liveposes.main.controller;


import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.liveposes.main.model.Exercise;
import com.liveposes.main.services.DBManager;


@RestController
@RequestMapping("/api")
public class GeneralController {

	private final DBManager dbManager;
	
	/* CONSTRUCTORS */
	public GeneralController(DBManager dbManager) {
		this.dbManager = dbManager;
	}
	
	public GeneralController() {
		this.dbManager = new DBManager();
	}
	
	@GetMapping("/get/exercises")
	public List<Exercise> getExercises() {
		return this.dbManager.getExercises();
	}
	
}
