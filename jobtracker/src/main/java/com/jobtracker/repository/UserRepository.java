package com.jobtracker.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;
import com.jobtracker.model.User;
import java.util.UUID;


// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
@Repository
public interface UserRepository extends CrudRepository<User, UUID> {

}
