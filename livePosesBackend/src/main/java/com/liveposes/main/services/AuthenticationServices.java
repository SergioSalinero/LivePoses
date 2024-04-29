package com.liveposes.main.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.liveposes.main.model.User;
import com.liveposes.main.utils.RemoteServices;

@Service
public class AuthenticationServices {

	private final RestTemplate restTemplate;
	

	public AuthenticationServices() {
		this.restTemplate = new RestTemplate();
	}
	

	public boolean signup(User user) {
		try {
            ResponseEntity<Void> response = restTemplate.postForEntity(RemoteServices.POST_SIGNUP, user, Void.class);
            
            if (response.getStatusCode() == HttpStatus.CREATED) {
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

}
