package com.paychex.exercise.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.paychex.exercise.model.User;
import com.paychex.exercise.repo.UserRepo;
import com.paychex.exercise.service.UserService;

@RestController
@RequestMapping("/api")
public class UserController {

	@Autowired
	UserRepo userRepo;
	@Autowired
	UserService userService;

	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		try {
			List<User> users = new ArrayList<User>();
			userRepo.findAll().forEach(users::add);
			if (users.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(users, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/users/{username}")
	public ResponseEntity<User> getUserByUserName(@PathVariable String username) {
		try {
			User user = new User();
			user = userRepo.findByUserName(username);
			if (user.getUserName() == "") {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}
			return new ResponseEntity<>(user, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/users")
	public ResponseEntity<User> createUser(@RequestBody User user) {
		try {
			System.out.println(user);
			if (!userService.checkIfUserNameExists(user)) {
				User _user = userRepo.save(
						new User(user.getFirstName(), user.getLastName(), user.getUserName(), "none"));
				return new ResponseEntity<>(_user, HttpStatus.CREATED);
			}
			return new ResponseEntity<>(null, HttpStatus.CONFLICT);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PatchMapping("/users/{username}/{status}")
	public ResponseEntity<User> updateEmployeePartially(@PathVariable String username, @PathVariable String status) {
		try {
			User user = userRepo.findByUserName(username);
			user.setStatus(status);
			return new ResponseEntity<User>(userRepo.save(user), HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
