package com.liveposes.main.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.liveposes.main.model.CurrentRoutine;
import com.liveposes.main.model.Exercise;
import com.liveposes.main.utils.RemoteServices;

@Service
public class ExercisesServices {
	
	private final RestTemplate restTemplate;
	

	public ExercisesServices() {
		this.restTemplate = new RestTemplate();
	}
	

	public List<Exercise> getExercises() {
		try {
            ResponseEntity<Exercise[]> response = restTemplate.getForEntity(RemoteServices.GET_SERVICES, Exercise[].class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                return Arrays.asList(response.getBody());
            } else {
                return null;
            }
        } catch (HttpClientErrorException ex) {
			//HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
            return null;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    
	}


	public boolean setCurrentRoutine(CurrentRoutine currentRoutine) {
		try {
            ResponseEntity<Void> response = restTemplate.postForEntity(RemoteServices.POST_CURRENT_ROUTINE, currentRoutine, Void.class);
            
            if (response.getStatusCode() == HttpStatus.OK) {
            	return true;
            } else {
                return false;
            }
        } catch (HttpClientErrorException ex) {
			//HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
            return false;
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
	}


	public CurrentRoutine getCurrentRoutine(String userID) {
		try {
			String url = RemoteServices.GET_CURRENT_ROUTINE + "?userID={userID}";
			
            ResponseEntity<CurrentRoutine> response = restTemplate.getForEntity(url, CurrentRoutine.class, userID);
            
            if (response.getStatusCode() == HttpStatus.OK) {
                return response.getBody();
            } else {
                return null;
            }
        } catch (HttpClientErrorException ex) {
			//HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
            return null;
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
	}

}
