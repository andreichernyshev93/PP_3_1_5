package ru.kata.spring.rest.dao;

import org.springframework.stereotype.Repository;
import ru.kata.spring.rest.model.Role;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Repository
public class RoleDaoImp implements RoleDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Role> getAllRoles() {
        return entityManager.createQuery("select r from Role r", Role.class).getResultList();
    }

    @Override
    public List<Role> getRoleById(Long[] rolesId) {
        return Arrays.stream(rolesId).map(r -> entityManager.find(Role.class, r)).collect(Collectors.toList());
    }

    @Override
    public void addRole(Role role) {
        entityManager.persist(role);
    }

    @Override
    public Role getRoleByName(String name) {
        return entityManager.createQuery("select r from Role r where r.name = :name", Role.class)
                .setParameter("name", name).getSingleResult();
    }
}
