package com.liveposesdb.main.model;

public class DBConnection {

	private String url;
	private String user;
	private String password;

	/* CONSTRUCTOR */
	public DBConnection() {
		super();
		this.url = "jdbc:mysql://localhost:3306/LivePoses";
		this.user = "mainUser";
		this.password = "3Mpx5u#LJW4G!sqd";
	}

	/* GETTERS AND SETTERS */
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
