package com.paychex.exercise.controller;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import com.paychex.exercise.model.User;
import com.paychex.exercise.repo.UserRepo;

@ExtendWith(MockitoExtension.class)
@RunWith(JUnitPlatform.class)
public class UserControllerTest {
	
	@InjectMocks
    UserController userController;
     
    @Mock
    UserRepo userRepo;
    
    @Test
    public void testAddUser() 
    {
        MockHttpServletRequest request = new MockHttpServletRequest();
        RequestContextHolder.setRequestAttributes(new ServletRequestAttributes(request));
        User user = new User("John", "Lincoln", "john333", "shift");
         
        when(userRepo.save(any(User.class))).thenReturn(user);
        ResponseEntity<User> responseEntity = userController.createUser(user);
         
        assertThat(responseEntity.getStatusCodeValue()).isEqualTo(201);
    }
    
    @Test
    public void testFindAll() 
    {
        // given
        User user1 = new User("John", "Lincoln", "john333", "shift");
        User user2 = new User("Leo", "Adam", "leo444", "shift");
        List<User> userList = new ArrayList<User>();
        userList.add(user1);
        userList.add(user2);
 
        when(userRepo.findAll()).thenReturn(userList);
 
        // when
        ResponseEntity<List<User>> result = userController.getAllUsers();
 
        // then
        assertThat(result.getBody().size()).isEqualTo(2);
         
        assertThat(result.getBody().get(0).getFirstName())
                        .isEqualTo(user1.getFirstName());
         
        assertThat(result.getBody().get(1).getFirstName())
                        .isEqualTo(user2.getFirstName());
    }

}
