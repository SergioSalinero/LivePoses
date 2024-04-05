package com.example.demo;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
public class MyController {
	
	private final MyService myService;
	
	@Autowired
	public MyController(MyService myService) {
		this.myService = myService;
	}
	
	@GetMapping("/greet")
	public String greet() {
		return myService.greet();
	}
	
	@PostMapping("/receive")
	public String receiveData(@RequestBody UserData userData) {
		System.out.println("Datos recibidos: " + userData.getName() + ", " + userData.getAge());
		return "Datos recibidos correctamente";
	}
	
	@GetMapping("/user")
    public UserData getUser() {
        // Simulando la creación de un objeto de usuario
        UserData user = new UserData("John", 30);
        return user;
    }

}
