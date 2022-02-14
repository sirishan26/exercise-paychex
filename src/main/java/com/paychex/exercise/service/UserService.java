package com.paychex.exercise.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.paychex.exercise.model.User;
import com.paychex.exercise.repo.UserRepo;

@Service
public class UserService {

	@Autowired
	UserRepo userRepo;
	@Autowired
	User user;

	public boolean checkIfUserNameExists(User newUser) {
		List<User> users = userRepo.findAll();
		for (User eachUser : users) {
			System.out.println(eachUser);
			if (eachUser.getUserName().equals(newUser.getUserName())) {
				return true;
			}
		}
		return false;
	}

}
