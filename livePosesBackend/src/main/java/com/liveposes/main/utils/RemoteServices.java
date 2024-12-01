package com.liveposes.main.utils;

public class RemoteServices {
	
	public static final String POST_SIGNUP = "http://localhost:5001/database/api/auth/signup"; 
	public static final String GET_LOGIN = "http://localhost:5001/database/api/auth/login";
	
	public static final String GET_EXERCISES = "http://localhost:5001/database/api/routine/get/exercises";
	public static final String GET_EXERCISE = "http://localhost:5001/database/api/routine/get/exercise";
	public static final String POST_EXERCISE = "http://localhost:5001/database/api/routine/post/exercise";
	public static final String POST_EDIT_EXERCISE = "http://localhost:5001/database/api/routine/post/edit_exercise";
	public static final String POST_DELETE_EXERCISE = "http://localhost:5001/database/api/routine/post/delete_exercise";
	public static final String POST_CURRENT_ROUTINE = "http://localhost:5001/database/api/routine/post/current_routine";
	public static final String GET_CURRENT_ROUTINE = "http://localhost:5001/database/api/routine/get/current_routine";
	public static final String GET_START_SIGNAL = "http://localhost:5001/database/api/routine/get/start_signal";
	public static final String POST_PUBLISH_ROUTINE = "http://localhost:5001/database/api/routine/post/publish_routine";
	public static final String GET_CATEGORY_COUNT = "http://localhost:5001/database/api/routine/get/category_count";
	public static final String GET_CATEGORY_ROUTINES = "http://localhost:5001/database/api/routine/get/category_routines";
	public static final String POST_RESET_CATEGORY_ROUTINES = "http://localhost:5001/database/api/routine/post/reset_category_routines";
	public static final String POST_DELETE_CATEGORY_ROUTINE = "http://localhost:5001/database/api/routine/post/delete_category_routine";
	public static final String POST_ROUTINE_HISTORY = "http://localhost:5001/database/api/routine/post/routine_history";
	public static final String GET_ROUTINE_HISTORY = "http://localhost:5001/database/api/routine/get/routine_history";
	public static final String POST_RESET_ROUTINE_HISTORY = "http://localhost:5001/database/api/routine/post/reset_routine_history";
	
	public static final String POST_BASIC_STATISTICS = "http://localhost:5001/database/api/statistics/post/basic_statistics"; 
	public static final String GET_BASIC_STATISTICS = "http://localhost:5001/database/api/statistics/get/basic_statistics";
	public static final String GET_WEIGHT = "http://localhost:5001/database/api/statistics/get/weight";
	public static final String GET_STATISTICS = "http://localhost:5001/database/api/statistics/get/statistics";
	public static final String POST_RESET_STATISTICS = "http://localhost:5001/database/api/statistics/post/reset_statistics";

	public static final String GET_USER_DATA = "http://localhost:5001/database/api/user/get/user_data";
	public static final String POST_UPDATE_WEIGHT = "http://localhost:5001/database/api/user/post/update_weight";
	public static final String POST_DELETE_ACCOUNT = "http://localhost:5001/database/api/user/post/delete_account";
}
