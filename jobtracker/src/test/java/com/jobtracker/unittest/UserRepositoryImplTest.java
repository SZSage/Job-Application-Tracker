package com.jobtracker.unittest;

import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;

import com.jobtracker.dao.UserDaoImpl;
import com.jobtracker.model.User;
import com.jobtracker.repository.UserRepositoryImpl;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class UserRepositoryImplTest {
  @Mock private UserDaoImpl userDaoImpl;

  @InjectMocks private UserRepositoryImpl userRepositoryImpl;

  @Test
  void addUser_ShouldDelegateToDao() {
    // Given
    User user = new User();
    user.setEmail("test@example.com");

    // When
    userRepositoryImpl.addUser(user);

    // Then
    verify(userDaoImpl)
      .createUser(eq("test@example.com"), eq(user.getPassword()), eq(user.getUserId()));
  }
}
