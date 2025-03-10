package com.liveposesdb.main.model;

import java.util.List;

public class PublicRoutine {

	private long id;
	private List<CurrentRoutineExercises> exercises;
	private int breakTime;
	private String description;
	private String category;

	public PublicRoutine(long id, List<CurrentRoutineExercises> exercises, int breakTime, String description,
			String category) {
		super();
		this.id = id;
		this.exercises = exercises;
		this.breakTime = breakTime;
		this.description = description;
		this.category = category;
	}

	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public List<CurrentRoutineExercises> getExercises() {
		return exercises;
	}

	public void setExercises(List<CurrentRoutineExercises> exercises) {
		this.exercises = exercises;
	}

	public int getBreakTime() {
		return breakTime;
	}

	public void setBreakTime(int breakTime) {
		this.breakTime = breakTime;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

}
