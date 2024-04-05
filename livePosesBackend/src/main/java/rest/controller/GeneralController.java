package rest.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import rest.services.DBManager;
import model.Exercise;


@RestController
@RequestMapping("/api")
public class GeneralController {

	private final DBManager dbManager;
	
	@Autowired
	public GeneralController(DBManager dbManager) {
		this.dbManager = dbManager;
	}
	
	@GetMapping("/get/exercises")
	public Exercise getExercises() {
		Exercise exercises = this.dbManager.getExercises();
		
		return exercises;
	}
	
}
