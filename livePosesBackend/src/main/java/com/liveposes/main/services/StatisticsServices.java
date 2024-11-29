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
public class StatisticsServices {
	
	private final RestTemplate restTemplate;
	

	public StatisticsServices() {
		this.restTemplate = new RestTemplate();
	}

	public boolean setBasicStatistics(BasicStatistics basicStatistics) {
		try {
			String url = RemoteServices.GET_BASIC_STATISTICS + "?userID={basicStatistics.getUserId()}";
			ResponseEntity<BasicStatistics> response = restTemplate.getForEntity(url, BasicStatistics.class, basicStatistics.getUserId());
			
			if (response.getStatusCode() == HttpStatus.OK) {
				BasicStatistics basicStatisticsAux = response.getBody();
				
				if(basicStatisticsAux.getAverageAccuracy() > 0) {
					double s = basicStatisticsAux.getRoutineCounter() * basicStatisticsAux.getAverageAccuracy();
					double globalAccuracy = (s + basicStatistics.getAverageAccuracy()) / (basicStatisticsAux.getRoutineCounter() + 1);
					basicStatistics.setAverageAccuracy(globalAccuracy);
				}
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
		
		try {
			String url = RemoteServices.GET_WEIGHT + "?userID={basicStatistics.getUserId()}";
			ResponseEntity<Float> response = restTemplate.getForEntity(url, Float.class, basicStatistics.getUserId());
			
			if (response.getStatusCode() == HttpStatus.OK) {
				float weight = response.getBody();
				
				basicStatistics.setCaloriesCounter(weight * (((double) basicStatistics.getTimeCounter()/60)/60) * 7.5);
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

	public BasicStatistics getBasicStatistics(String userID) {
		try {
			String url = RemoteServices.GET_BASIC_STATISTICS + "?userID={userID}";
			ResponseEntity<BasicStatistics> response = restTemplate.getForEntity(url, BasicStatistics.class, userID);
			
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

	public float getweight(String userID) {
		try {
			String url = RemoteServices.GET_WEIGHT + "?userID={userID}";
			ResponseEntity<Float> response = restTemplate.getForEntity(url, Float.class, userID);
			
			if (response.getStatusCode() == HttpStatus.OK) {
				return response.getBody();
			} else {
				return 0;
			}
			
		} catch (HttpClientErrorException ex) {
			//HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return 0;
		} catch (Exception ex) {
			ex.printStackTrace();
			return 0;
		}
	}

	public List<String[]> getStatistics(String userID) {
		try {
			String url = RemoteServices.GET_STATISTICS + "?userID={userID}";
			ResponseEntity<List<String[]>> response = restTemplate.exchange(
				    url,
				    HttpMethod.GET,
				    null,
				    new ParameterizedTypeReference<List<String[]>>() {},
				    userID
				);
			
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
	
	public Boolean setResetStatistics(long userID) {
		try {
            ResponseEntity<String> response = restTemplate.postForEntity(RemoteServices.POST_RESET_STATISTICS, userID, String.class);
            
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
