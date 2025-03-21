package com.liveposesdb.main.model;

public class User {

	private long id;
	private String email;
	private String password;
	private float weight;

	/* CONSTRUCTORS */
	public User(long id, String email, String password, float weight) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.weight = weight;
	}

	public User() {
		id = -1;
		email = "UNKNOWN";
		password = "UNKNOWN";
		weight = 80;
	}

	/* GETTERS AND SETTERS */
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public float getWeight() {
		return weight;
	}

	public void setWeight(float weight) {
		this.weight = weight;
	}

}
