package com.liveposes.main.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.liveposes.main.model.BasicStatistics;
import com.liveposes.main.model.CategoryCount;
import com.liveposes.main.model.User;
import com.liveposes.main.utils.RemoteServices;

@Service
public class UserServices {
	
	private final RestTemplate restTemplate;
	

	public UserServices() {
		this.restTemplate = new RestTemplate();
	}
	

	public String[] getUserData(String userID) {
		try {
			String url = RemoteServices.GET_USER_DATA + "?userID={userID}";
			ResponseEntity<String[]> response = restTemplate.getForEntity(url, String[].class, userID);
			
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


	public Boolean setWeight(User user) {
		try {
            ResponseEntity<Boolean> response = restTemplate.postForEntity(RemoteServices.POST_UPDATE_WEIGHT, user, Boolean.class);
            
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


	public boolean setDeleteAccount(String userID) {
		try {
            ResponseEntity<Boolean> response = restTemplate.postForEntity(RemoteServices.POST_DELETE_ACCOUNT, userID, Boolean.class);
            
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

}
