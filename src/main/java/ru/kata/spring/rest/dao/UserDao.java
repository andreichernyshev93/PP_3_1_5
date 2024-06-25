package ru.kata.spring.rest.dao;

import ru.kata.spring.rest.model.User;

import java.util.List;

public interface UserDao {
    public List<User> getAllUsers();

    public User getUserByUsername(String username);

    public User getUser(Long id);

    public void save(User user);

    public void update(User updatedUser);

    public void delete(Long id);
}
