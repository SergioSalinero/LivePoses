package com.liveposes.main.dao;


import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.liveposes.main.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Transactional
public class UserDAOImp implements UserDAO {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    @Transactional
    public List<User> getUsers() {
        /*String query = "FROM Usuario";
        return entityManager.createQuery(query).getResultList();*/
    	return null;
    }

	@Override
	public void remove(Long id) {
		/*User user = entityManager.find(User.class, id);
        entityManager.remove(user);*/
		
	}

	@Override
	public void register(User user) {
		//entityManager.merge(user);
		
	}

	@Override
	public User getUserByCredentials(User user) {
		/*String query = "FROM Usuario WHERE email = :email";
        List<User> lista = entityManager.createQuery(query)
                .setParameter("email", user.getEmail())
                .getResultList();

        if (lista.isEmpty()) {
            return null;
        }

        String passwordHashed = lista.get(0).getPassword();

        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        if (argon2.verify(passwordHashed, user.getPassword())) {
            return lista.get(0);
        }*/
		
		// HACER PETICIÓN AL SERVIDOR DB
		
		user = new User(1, "a@gmail.com", "123");
		
        return user;
	}

}