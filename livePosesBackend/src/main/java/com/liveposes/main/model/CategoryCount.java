package com.liveposes.main.model;

public class CategoryCount {
	
	private String category;
	private int count;
	
	
	
	public CategoryCount(String category, int count) {
		super();
		this.category = category;
		this.count = count;
	}
	
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}	

}
