package com.liveposesdb.main.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DBConnection {

	@Value("${spring.datasource.url}")
	private String url;

	@Value("${spring.datasource.username}")
	private String user;

	@Value("${spring.datasource.password}")
	private String password;

	public List<String[]> DBOperation(String sqlQuery, String type) {
		Connection connection = null;
		List<String[]> resultList = new ArrayList<>();

		try {
			connection = DriverManager.getConnection(url, user, password);

			Statement statement = connection.createStatement();

			if (type.equals("SELECT")) {
				ResultSet resultSet = statement.executeQuery(sqlQuery);

				while (resultSet.next()) {
					String[] row = new String[resultSet.getMetaData().getColumnCount()];

					for (int i = 0; i < row.length; i++) {
						row[i] = resultSet.getString(i + 1);
					}
					resultList.add(row);
				}
			}
			else if(type.equals("INSERT") || type.equals("DELETE")) {
				statement.executeUpdate(sqlQuery);
			}

			return resultList;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} finally {
			// Cierra la conexión
			if (connection != null) {
				try {
					connection.close();
				} catch (SQLException e) {
					e.printStackTrace();
				}
			}
		}
	}
}
