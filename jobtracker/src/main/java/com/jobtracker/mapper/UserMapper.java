package com.jobtracker.mapper;
import com.jobtracker.dto.UserDTO;
import com.jobtracker.model.User;

public class UserMapper {
    
    private UserMapper() {}

    public static UserDTO userToDTO(User entity) {
        if (entity == null) {
            return null;
        }

        UserDTO dto = new UserDTO();
        dto.setUserId(entity.getUserId());
        dto.setUserEmail(entity.getEmail());
        dto.setCreatedAt(entity.getCreatedAt());

        return dto;
    }
}
