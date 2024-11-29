package com.liveposes.main.services;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import com.liveposes.main.model.CategoryCount;
import com.liveposes.main.model.CurrentRoutine;
import com.liveposes.main.model.Exercise;
import com.liveposes.main.model.PublicRoutine;
import com.liveposes.main.model.RoutineHistory;
import com.liveposes.main.utils.RemoteServices;

@Service
public class ExercisesServices {

	private final RestTemplate restTemplate;

	public ExercisesServices() {
		this.restTemplate = new RestTemplate();
	}

	public List<Exercise> getExercises() {
		try {
			ResponseEntity<Exercise[]> response = restTemplate.getForEntity(RemoteServices.GET_SERVICES,
					Exercise[].class);

			if (response.getStatusCode() == HttpStatus.OK) {
				return Arrays.asList(response.getBody());
			} else {
				return null;
			}
		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return null;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}

	}

	public boolean setCurrentRoutine(CurrentRoutine currentRoutine) {
		try {
			ResponseEntity<Void> response = restTemplate.postForEntity(RemoteServices.POST_CURRENT_ROUTINE,
					currentRoutine, Void.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				return true;
			} else {
				return false;
			}
		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
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
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return null;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public Exercise getStartSignal() {
		try {
			ResponseEntity<Exercise> response = restTemplate.getForEntity(RemoteServices.GET_START_SIGNAL,
					Exercise.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				return response.getBody();
			} else {
				return null;
			}
		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return null;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}

	}

	public boolean setPublicRoutine(PublicRoutine publicRoutine) {
		try {
			ResponseEntity<Void> response = restTemplate.postForEntity(RemoteServices.POST_PUBLISH_ROUTINE,
					publicRoutine, Void.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				return true;
			} else {
				return false;
			}
		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return false;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public List<CategoryCount> getCategoryCount() {
		try {
			ResponseEntity<CategoryCount[]> response = restTemplate.getForEntity(RemoteServices.GET_CATEGORY_COUNT,
					CategoryCount[].class);

			if (response.getStatusCode() == HttpStatus.OK) {
				return Arrays.asList(response.getBody());
			} else {
				return null;
			}

		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return null;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public List<PublicRoutine> getCategoryRoutine(String category) {
		try {
			String url = RemoteServices.GET_CATEGORY_ROUTINES + "?category={category}";
			ResponseEntity<PublicRoutine[]> response = restTemplate.getForEntity(url, PublicRoutine[].class, category);

			if (response.getStatusCode() == HttpStatus.OK) {
				return Arrays.asList(response.getBody());
			} else {
				return null;
			}

		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return null;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}
	
	public boolean setResetCategoryRoutines(String category) {
		try {
			ResponseEntity<String> response = restTemplate.postForEntity(RemoteServices.POST_RESET_CATEGORY_ROUTINES,
					category, String.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				return true;
			} else {
				return false;
			}
		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return false;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}
	
	public boolean setDeleteCategoryRoutine(long id) {
		try {
			ResponseEntity<String> response = restTemplate.postForEntity(RemoteServices.POST_DELETE_CATEGORY_ROUTINE,
					id, String.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				return true;
			} else {
				return false;
			}
		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return false;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

	public boolean setRoutineHistory(RoutineHistory routineHistory) {
		try {
			ResponseEntity<String> response = restTemplate.postForEntity(RemoteServices.POST_ROUTINE_HISTORY,
					routineHistory, String.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				return true;
			} else {
				return false;
			}
		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return false;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}
	
	public List<RoutineHistory> getRoutineHistory(long userID) {
		try {
			String url = RemoteServices.GET_ROUTINE_HISTORY + "?userID={userID}";
			ResponseEntity<RoutineHistory[]> response = restTemplate.getForEntity(url, RoutineHistory[].class, userID);

			if (response.getStatusCode() == HttpStatus.OK) {
				return Arrays.asList(response.getBody());
			} else {
				return null;
			}

		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return null;
		} catch (Exception ex) {
			ex.printStackTrace();
			return null;
		}
	}

	public boolean setResetHistory(long userID) {
		try {
			ResponseEntity<String> response = restTemplate.postForEntity(RemoteServices.POST_RESET_ROUTINE_HISTORY,
					userID, String.class);

			if (response.getStatusCode() == HttpStatus.OK) {
				return true;
			} else {
				return false;
			}
		} catch (HttpClientErrorException ex) {
			// HttpStatus statusCode = (HttpStatus) ex.getStatusCode();
			return false;
		} catch (Exception ex) {
			ex.printStackTrace();
			return false;
		}
	}

}
