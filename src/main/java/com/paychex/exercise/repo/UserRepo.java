package com.paychex.exercise.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.paychex.exercise.model.User;

public interface UserRepo extends JpaRepository<User, Long> {

	User findByUserName(String username);

}
