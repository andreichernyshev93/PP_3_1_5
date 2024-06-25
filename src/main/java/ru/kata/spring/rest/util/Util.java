package ru.kata.spring.rest.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.kata.spring.rest.model.Role;
import ru.kata.spring.rest.model.User;
import ru.kata.spring.rest.service.RoleService;
import ru.kata.spring.rest.service.UserService;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.List;

@Component
public class Util {
    private final UserService userService;
    private final RoleService roleService;

    @Autowired
    public Util(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostConstruct
    public void init() {
        Role roleAdmin = new Role("ROLE_ADMIN");
        Role roleUser = new Role("ROLE_USER");

        roleService.addRole(roleAdmin);
        roleService.addRole(roleUser);

        User admin = new User("admin", "100", 35, "admin@mail.ru",
                Arrays.asList(roleAdmin, roleUser));
        User user = new User("user", "100", 30, "user@mail.ru", List.of(roleUser));

        userService.save(admin);
        userService.save(user);
    }
}
