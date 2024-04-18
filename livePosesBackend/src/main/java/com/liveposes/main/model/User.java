package com.liveposes.main.model;

public class User {
	
	private String email;
	private String password;
	private String token;
	
	
	/* CONSTRUCTORS */
	public User(String email, String password, String token) {
		super();
		this.email = email;
		this.password = password;
		this.token = token;
	}
	
	public User() {
		email = "UNKNOWN";
		password = "UNKNOWN";
		token = "UNKNOWN";
	}
	
	
	/* GETTERS AND SETTERS */
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
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	
	

}
