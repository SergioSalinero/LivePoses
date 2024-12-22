package com.liveposes.main.model;

import java.util.List;

public class RoutineHistory {

	private List<CurrentRoutineExercises> exercises;
	private int breakTime;
	private float accuracy;
	private long userId;

	
	public RoutineHistory(List<CurrentRoutineExercises> exercises, int breakTime, float accuracy, long userId) {
		super();
		this.exercises = exercises;
		this.breakTime = breakTime;
		this.accuracy = accuracy;
		this.userId = userId;
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

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public float getAccuracy() {
		return accuracy;
	}

	public void setAccuracy(float accuracy) {
		this.accuracy = accuracy;
	}

}
