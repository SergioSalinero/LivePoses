package com.liveposesdb.main.services;

import java.util.List;
import java.util.ArrayList;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.liveposesdb.main.model.CurrentRoutine;
import com.liveposesdb.main.model.Exercise;
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

		List<String[]> results = dbConnection.DBOperation(query,"SELECT");

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
			if (result.length > 5 && result[5] != null) 
				exercise.setLeftKeyPoint1(Integer.parseInt(result[5]));
			if (result.length > 6 && result[6] != null) 
				exercise.setLeftKeyPoint2(Integer.parseInt(result[6]));
			if (result.length > 7 && result[7] != null) 
				exercise.setLeftKeyPoint3(Integer.parseInt(result[7]));
			if (result.length > 8 && result[8] != null) 
				exercise.setUpperAngleMax(Integer.parseInt(result[8]));
			if (result.length > 9 && result[9] != null) 
				exercise.setUpperAngleMin(Integer.parseInt(result[9]));
			if (result.length > 10 && result[10] != null) 
				exercise.setLowerAngleMax(Integer.parseInt(result[10]));
			if (result.length > 11 && result[11] != null)
				exercise.setLowerAngleMin(Integer.parseInt(result[11]));

			exercise.setRecognitionType(result[12]);

			exercisesList.add(exercise);
		}

		return exercisesList;
	}
	
	public boolean setCurrentRoutine(CurrentRoutine currentRoutine) {
		String query = "DELETE FROM current_routine WHERE userId = " + currentRoutine.getUserId() + ";";
		List<String[]> results = dbConnection.DBOperation(query, "DELETE");
		
		if(results == null)
			return false;
		
		
		ObjectMapper mapper = new ObjectMapper();
        String exercisesJson;
		try {
			exercisesJson = mapper.writeValueAsString(currentRoutine.getExercises());
			
			query = "INSERT INTO current_routine (userId, exercises, breakTime) VALUES ('" + currentRoutine.getUserId() + "', '" + exercisesJson + "', '" + currentRoutine.getBreakTime() + "');";
			results = dbConnection.DBOperation(query, "INSERT");
			
			if(results == null)
				return false;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}

		return true;
	}
}
