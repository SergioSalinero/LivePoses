package com.liveposesdb.main.services;

import java.util.List;
import java.util.ArrayList;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liveposesdb.main.model.CategoryCount;
import com.liveposesdb.main.model.CurrentRoutine;
import com.liveposesdb.main.model.CurrentRoutineExercises;
import com.liveposesdb.main.model.Exercise;
import com.liveposesdb.main.model.PublicRoutine;
import com.liveposesdb.main.model.RoutineHistory;
import com.liveposesdb.main.utils.DBConnection;

@Service
public class ExercisesServices {

	private final DBConnection dbConnection;

	public ExercisesServices(DBConnection dbConnection) {
		this.dbConnection = dbConnection;
	}

	public List<Exercise> getExercises() {
		List<Exercise> exercisesList = new ArrayList<>();

		String query = "SELECT * FROM exercises";

		List<String[]> results = dbConnection.DBOperation(query, "SELECT");

		if (results == null)
			return null;

		for (String[] result : results) {
			Exercise exercise = new Exercise();

			exercise.setId(Integer.parseInt(result[0]));
			exercise.setName(result[1]);

			if (result.length > 2 && result[2] != null)
				exercise.setRightKeyPoint1(Integer.parseInt(result[2]));
			if (result.length > 3 && result[3] != null)
				exercise.setRightKeyPoint2(Integer.parseInt(result[3]));
			if (result.length > 4 && result[4] != null)
				exercise.setRightKeyPoint3(Integer.parseInt(result[4]));
			if (result.length > 4 && result[5] != null)
				exercise.setRightKeyPointDistance1(Integer.parseInt(result[5]));
			else
				exercise.setRightKeyPointDistance1(-1);
			if (result.length > 4 && result[6] != null)
				exercise.setRightKeyPointDistance2(Integer.parseInt(result[6]));
			else
				exercise.setRightKeyPointDistance2(-1);

			if (result.length > 5 && result[7] != null)
				exercise.setLeftKeyPoint1(Integer.parseInt(result[7]));
			if (result.length > 6 && result[8] != null)
				exercise.setLeftKeyPoint2(Integer.parseInt(result[8]));
			if (result.length > 7 && result[9] != null)
				exercise.setLeftKeyPoint3(Integer.parseInt(result[9]));
			if (result.length > 4 && result[10] != null)
				exercise.setLeftKeyPointDistance1(Integer.parseInt(result[10]));
			else
				exercise.setLeftKeyPointDistance1(-1);
			if (result.length > 4 && result[11] != null)
				exercise.setLeftKeyPointDistance2(Integer.parseInt(result[11]));
			else
				exercise.setLeftKeyPointDistance2(-1);

			if (result.length > 8 && result[12] != null)
				exercise.setUpperAngleMax(Integer.parseInt(result[12]));
			if (result.length > 9 && result[13] != null)
				exercise.setUpperAngleMin(Integer.parseInt(result[13]));
			if (result.length > 10 && result[14] != null)
				exercise.setLowerAngleMax(Integer.parseInt(result[14]));
			if (result.length > 11 && result[15] != null)
				exercise.setLowerAngleMin(Integer.parseInt(result[15]));

			exercise.setRecognitionType(result[16]);
			exercise.setSrc(result[17]);

			exercisesList.add(exercise);
		}

		return exercisesList;
	}

	public boolean setCurrentRoutine(CurrentRoutine currentRoutine) {
		String query = "DELETE FROM current_routine WHERE userId = " + currentRoutine.getUserId() + ";";
		List<String[]> results = dbConnection.DBOperation(query, "DELETE");

		if (results == null)
			return false;

		ObjectMapper mapper = new ObjectMapper();
		String exercisesJson;
		try {
			exercisesJson = mapper.writeValueAsString(currentRoutine.getExercises());

			query = "INSERT INTO current_routine (userId, exercises, breakTime) VALUES ('" + currentRoutine.getUserId()
					+ "', '" + exercisesJson + "', '" + currentRoutine.getBreakTime() + "');";
			results = dbConnection.DBOperation(query, "INSERT");

			if (results == null)
				return false;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return true;
	}

	public CurrentRoutine getCurrentRoutine(long userID) {
		String query = "SELECT * FROM current_routine WHERE userId = " + userID + ";";
		List<String[]> results = dbConnection.DBOperation(query, "SELECT");

		if (results == null)
			return null;

		try {
			String[] result = results.get(0);

			long userId = Long.parseLong(result[1]);
			int breakTime = Integer.parseInt(result[3]);

			ObjectMapper mapper = new ObjectMapper();
			List<CurrentRoutineExercises> exercises = mapper.readValue(result[2],
					new TypeReference<List<CurrentRoutineExercises>>() {
					});

			return new CurrentRoutine(exercises, breakTime, userId);
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public Exercise getStartSignal() {
		String query = "SELECT * FROM start_signal;";
		List<String[]> results = dbConnection.DBOperation(query, "SELECT");

		Exercise exercise = new Exercise();
		for (String[] result : results) {

			exercise.setId(Integer.parseInt(result[0]));
			exercise.setName(result[1]);

			if (result.length > 2 && result[2] != null)
				exercise.setRightKeyPoint1(Integer.parseInt(result[2]));
			if (result.length > 3 && result[3] != null)
				exercise.setRightKeyPoint2(Integer.parseInt(result[3]));
			if (result.length > 4 && result[4] != null)
				exercise.setRightKeyPoint3(Integer.parseInt(result[4]));
			if (result.length > 4 && result[5] != null)
				exercise.setRightKeyPointDistance1(Integer.parseInt(result[5]));
			else
				exercise.setRightKeyPointDistance1(-1);
			if (result.length > 4 && result[6] != null)
				exercise.setRightKeyPointDistance2(Integer.parseInt(result[6]));
			else
				exercise.setRightKeyPointDistance2(-1);

			if (result.length > 5 && result[7] != null)
				exercise.setLeftKeyPoint1(Integer.parseInt(result[7]));
			if (result.length > 6 && result[8] != null)
				exercise.setLeftKeyPoint2(Integer.parseInt(result[8]));
			if (result.length > 7 && result[9] != null)
				exercise.setLeftKeyPoint3(Integer.parseInt(result[9]));
			if (result.length > 4 && result[10] != null)
				exercise.setLeftKeyPointDistance1(Integer.parseInt(result[10]));
			else
				exercise.setLeftKeyPointDistance1(-1);
			if (result.length > 4 && result[11] != null)
				exercise.setLeftKeyPointDistance2(Integer.parseInt(result[11]));
			else
				exercise.setLeftKeyPointDistance2(-1);

			if (result.length > 8 && result[12] != null)
				exercise.setUpperAngleMax(Integer.parseInt(result[12]));
			if (result.length > 9 && result[13] != null)
				exercise.setUpperAngleMin(Integer.parseInt(result[13]));
			if (result.length > 10 && result[14] != null)
				exercise.setLowerAngleMax(Integer.parseInt(result[14]));
			if (result.length > 11 && result[15] != null)
				exercise.setLowerAngleMin(Integer.parseInt(result[15]));

			exercise.setRecognitionType(result[16]);
		}

		return exercise;
	}

	public boolean setPublicRoutine(PublicRoutine publicRoutine) {
		ObjectMapper mapper = new ObjectMapper();
		String exercisesJson;

		try {
			exercisesJson = mapper.writeValueAsString(publicRoutine.getExercises());

			String query = "INSERT INTO public_routines (exercises, breakTime, description, category) VALUES ('"
					+ exercisesJson + "', '" + publicRoutine.getBreakTime() + "', '" + publicRoutine.getDescription()
					+ "', '" + publicRoutine.getCategory() + "');";

			List<String[]> results = dbConnection.DBOperation(query, "INSERT");

			if (results == null)
				return false;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return true;
	}

	public List<CategoryCount> getCategoryCount() {
		String query = "SELECT category, COUNT(*) AS count FROM public_routines GROUP BY category;";

		List<String[]> results = dbConnection.DBOperation(query, "SELECT");

		if (results == null)
			return null;

		List<CategoryCount> categoryCount = new ArrayList<>();

		for (String[] result : results) {
			CategoryCount cc = new CategoryCount(result[0], Integer.parseInt(result[1]));

			categoryCount.add(cc);
		}

		return categoryCount;
	}
	
	public List<PublicRoutine> getCategoryRoutines(String category) {
		String query = "SELECT * FROM public_routines WHERE category = '" + category + "';";

		List<String[]> results = dbConnection.DBOperation(query, "SELECT");

		if (results == null)
			return null;

		List<PublicRoutine> categoryRoutines = new ArrayList<>();

		ObjectMapper mapper = new ObjectMapper();

		for (String[] result : results) {
			try {
				List<CurrentRoutineExercises> exercises = mapper.readValue(result[1],
						new TypeReference<List<CurrentRoutineExercises>>() {
						});

				PublicRoutine pr = new PublicRoutine(Long.parseLong(result[0]), exercises, Integer.parseInt(result[2]), result[3], result[4]);

				categoryRoutines.add(pr);
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
		}

		return categoryRoutines;
	}
	
	public boolean setResetCategory(String category) {
		String query = "DELETE FROM public_routines WHERE category = '" + category + "';";
		List<String[]> results = dbConnection.DBOperation(query, "DELETE");
		
		if(results == null)
			return false;
		
		return true;
	}
	
	public boolean setDeleteCategoryRoutine(long id) {
		String query = "DELETE FROM public_routines WHERE id = '" + id + "';";
		List<String[]> results = dbConnection.DBOperation(query, "DELETE");
		
		if(results == null)
			return false;
		
		return true;
	}

	public boolean setRoutineHistory(RoutineHistory routineHistory) {
		ObjectMapper mapper = new ObjectMapper();
		String exercisesJson;

		try {
			exercisesJson = mapper.writeValueAsString(routineHistory.getExercises());

			String query = "INSERT INTO routine_history (userId, exercises, breakTime, accuracy) VALUES ('"
					+ routineHistory.getUserId() + "', '" + exercisesJson + "', '" + routineHistory.getBreakTime()
					+ "', '" + routineHistory.getAccuracy() + "');";

			List<String[]> results = dbConnection.DBOperation(query, "INSERT");

			if (results == null)
				return false;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return true;
	}

	public List<RoutineHistory> getRoutineHistory(long userID) {
		String query = "SELECT * FROM routine_history WHERE userId = " + userID + ";";
		List<String[]> results = dbConnection.DBOperation(query, "SELECT");

		if (results == null)
			return null;

		List<RoutineHistory> routineHistory = new ArrayList<>();

		ObjectMapper mapper = new ObjectMapper();

		for (String[] result : results) {
			try {
				List<CurrentRoutineExercises> exercises = mapper.readValue(result[2],
						new TypeReference<List<CurrentRoutineExercises>>() {
						});
				
				long userId = Integer.parseInt(result[1]);
				int breaktime = Integer.parseInt(result[3]);
				float accuracy = Float.parseFloat(result[4]);

				RoutineHistory rh = new RoutineHistory(exercises, breaktime, accuracy, userId);

				routineHistory.add(rh);
			} catch (JsonMappingException e) {
				e.printStackTrace();
			} catch (JsonProcessingException e) {
				e.printStackTrace();
			}
		}

		return routineHistory;
	}

	public boolean setResetHistory(long userID) {
		String query = "DELETE FROM routine_history WHERE userId = " + userID + ";";
		List<String[]> results = dbConnection.DBOperation(query, "DELETE");
		
		if(results == null)
			return false;
		
		return true;
	}

}
