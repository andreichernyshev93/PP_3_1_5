package ru.kata.spring.rest.service;

import org.springframework.security.core.userdetails.UserDetailsService;
import ru.kata.spring.rest.model.User;

import java.util.List;

public interface UserService extends UserDetailsService {
    public List<User> getAllUsers();

    public User getUserByUsername(String username);

    public User getUser(Long id);

    public void save(User user);

    public void update(User updatedUser);

    public void delete(Long id);
}
