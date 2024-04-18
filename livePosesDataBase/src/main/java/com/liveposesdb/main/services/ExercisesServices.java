package com.liveposesdb.main.services;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.liveposesdb.main.model.DBConnection;
import com.liveposesdb.main.model.Exercise;

@Service
public class ExercisesServices {
	
	private DBConnection dbConnection;
		
	public ExercisesServices() {
		this.dbConnection = new DBConnection();
	}
	
	public List<Exercise> getExercises() {
		List<Exercise> exercisesList = new ArrayList<>();
		
		Connection connection = null;
		
		try {
			// Establish the connection to the database
			connection = DriverManager.getConnection(this.dbConnection.getUrl(), this.dbConnection.getUser(), this.dbConnection.getPassword());
			
			// Create a SQL declaration
			Statement statement = connection.createStatement();
			
			// Execute the SQL query
			String SQLQuery = "SELECT * FROM exercises";
			ResultSet result = statement.executeQuery(SQLQuery);
			
			// Process the results of the query
			while(result.next()) {
				Exercise exercise = new Exercise();
				
				exercise.setId(result.getInt("id"));
				exercise.setName(result.getString("name"));
				exercise.setRightKeyPoint1(result.getInt("rightKeyPoint1"));
				exercise.setRightKeyPoint2(result.getInt("rightKeyPoint2"));
				exercise.setRightKeyPoint3(result.getInt("rightKeyPoint3"));
				exercise.setLeftKeyPoint1(result.getInt("leftKeyPoint1"));
				exercise.setLeftKeyPoint2(result.getInt("leftKeyPoint2"));
				exercise.setLeftKeyPoint3(result.getInt("leftKeyPoint3"));
				exercise.setUpperAngleMax(result.getInt("upperAngleMax"));
				exercise.setUpperAngleMin(result.getInt("upperAngleMin"));
				exercise.setLowerAngleMax(result.getInt("lowerAngleMax"));
				exercise.setLowerAngleMin(result.getInt("lowerAngleMin"));
				exercise.setRecognitionType(result.getString("recognitionType"));
				
				exercisesList.add(exercise);
			}
			
		} catch(SQLException e) {
			e.printStackTrace();
		} finally {
			// Close the connection
			if(connection != null) {
				try {
					connection.close();
				} catch(SQLException e) {
					e.printStackTrace();
				}
			}
		}
		
		return exercisesList;
	}

}
