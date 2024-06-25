package ru.kata.spring.rest.service;

import ru.kata.spring.rest.model.Role;

import java.util.List;

public interface RoleService {
    public List<Role> getAllRoles();

    public List<Role> getRoleById(Long[] rolesId);

    public void addRole(Role role);

    public Role getRoleByName(String name);
}
