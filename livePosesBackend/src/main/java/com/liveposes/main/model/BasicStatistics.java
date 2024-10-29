package com.liveposes.main.model;

public class BasicStatistics {

	private int routineCounter;
	private int timeCounter;
	private double caloriesCounter;
	private int breakTimeCounter;
	private double averageAccuracy;
	private long userId;

	public BasicStatistics(int routineCounter, int timeCounter, double caloriesCounter, int restTimeCounter,
			double averageAccuracy, long userId) {
		super();
		this.routineCounter = routineCounter;
		this.timeCounter = timeCounter;
		this.caloriesCounter = caloriesCounter;
		this.breakTimeCounter = restTimeCounter;
		this.averageAccuracy = averageAccuracy;
		this.userId = userId;
	}

	public int getTimeCounter() {
		return timeCounter;
	}

	public void setTimeCounter(int timeCounter) {
		this.timeCounter = timeCounter;
	}

	public int getBreakTimeCounter() {
		return breakTimeCounter;
	}

	public void setBreakTimeCounter(int breakTimeCounter) {
		this.breakTimeCounter = breakTimeCounter;
	}

	public long getUserId() {
		return userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	public int getRoutineCounter() {
		return routineCounter;
	}

	public void setRoutineCounter(int routineCounter) {
		this.routineCounter = routineCounter;
	}

	public double getCaloriesCounter() {
		return caloriesCounter;
	}

	public void setCaloriesCounter(double caloriesCounter) {
		this.caloriesCounter = caloriesCounter;
	}

	public double getAverageAccuracy() {
		return averageAccuracy;
	}

	public void setAverageAccuracy(double averageAccuracy) {
		this.averageAccuracy = averageAccuracy;
	}

}
