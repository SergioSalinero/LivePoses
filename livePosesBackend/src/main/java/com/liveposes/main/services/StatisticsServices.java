package com.liveposes.main.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.liveposes.main.model.BasicStatistics;
import com.liveposes.main.utils.RemoteServices;

@Service
public class StatisticsServices {
	
	private final RestTemplate restTemplate;
	

	public StatisticsServices() {
		this.restTemplate = new RestTemplate();
	}

	public boolean setBasicStatistics(BasicStatistics basicStatistics) {
		try {
            ResponseEntity<Void> response = restTemplate.postForEntity(RemoteServices.POST_BASIC_STATISTICS, basicStatistics, Void.class);
            
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
