package com.liveposes.main.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

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

}
