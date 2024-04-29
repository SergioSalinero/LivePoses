package com.liveposes.main.dao;


import java.util.List;

import com.liveposes.main.model.User;

public interface UserDAO {

    List<User> getUsers();

    void remove(Long id);

    void register(User user);

    User getUserByCredentials(User user);
}