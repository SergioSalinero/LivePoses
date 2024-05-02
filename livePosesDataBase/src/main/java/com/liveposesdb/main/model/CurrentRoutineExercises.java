package com.liveposesdb.main.model;

public class CurrentRoutineExercises {
	
	private long exerciseId;
	private int repetitions;
	
	
	public CurrentRoutineExercises(long exerciseId, int repetitions) {
		super();
		this.exerciseId = exerciseId;
		this.repetitions = repetitions;
	}
	
	public CurrentRoutineExercises() {
    }
	
	
	public long getExerciseId() {
		return exerciseId;
	}
	public void setExerciseId(long exerciseId) {
		this.exerciseId = exerciseId;
	}
	public int getRepetitions() {
		return repetitions;
	}
	public void setRepetitions(int repetitions) {
		this.repetitions = repetitions;
	}

}
