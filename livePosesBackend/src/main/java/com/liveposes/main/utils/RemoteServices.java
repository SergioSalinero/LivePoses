package com.liveposes.main.utils;

public class RemoteServices {
	
	public static final String POST_SIGNUP = "http://localhost:5001/database/api/auth/signup"; 
	public static final String GET_LOGIN = "http://localhost:5001/database/api/auth/login";
	
	public static final String GET_SERVICES = "http://localhost:5001/database/api/routine/get/exercises";
	public static final String POST_CURRENT_ROUTINE = "http://localhost:5001/database/api/routine/post/current_routine";
	public static final String GET_CURRENT_ROUTINE = "http://localhost:5001/database/api/routine/get/current_routine";

}
