package com.liveposesdb.main.model;

import java.util.List;

public class CurrentRoutine {
	
	private List<CurrentRoutineExercises> exercises;
	private int breakTime;
	private long userId;

	
	public CurrentRoutine(List<CurrentRoutineExercises> exercises, int breakTime, long userId) {
		super();
		this.exercises = exercises;
		this.breakTime = breakTime;
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

}
