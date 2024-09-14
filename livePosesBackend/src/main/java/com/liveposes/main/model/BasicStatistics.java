package com.liveposes.main.model;

public class BasicStatistics {
	
	private int timeCounter;
	private int breakTimeCounter;
	private long userId;
	
	
	public BasicStatistics(int timeCounter, int restTimeCounter, long userId) {
		super();
		this.timeCounter = timeCounter;
		this.breakTimeCounter = restTimeCounter;
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
	
}
