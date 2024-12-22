package com.liveposes.main.utils;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Base64;

public class PasswordEncryption {
	
	public String encryptPassword(String password) {
        try {
            // Generate a random salt
            SecureRandom random = new SecureRandom();
            byte[] salt = new byte[16];
            random.nextBytes(salt);

            // Create MessageDigest object for SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            
            // Apply salt to the message (password)
            digest.update(salt);
            
            // Get the hash of the password
            byte[] hashedPassword = digest.digest(password.getBytes());

            // Convert hash and salt to Base64 representation
            String encodedSalt = Base64.getEncoder().encodeToString(salt);
            String encodedHashedPassword = Base64.getEncoder().encodeToString(hashedPassword);

            // Return the encrypted representation of the password (including salt)
            return encodedSalt + ":" + encodedHashedPassword;

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
	
	public boolean verifyPassword(String inputPassword, String storedPassword) {
        try {
            // Get the stored salt and hash
            String[] parts = storedPassword.split(":");
            String encodedSalt = parts[0];
            String encodedHashedPassword = parts[1];

            // Decode salt and stored password
            byte[] salt = Base64.getDecoder().decode(encodedSalt);
            byte[] hashedPassword = Base64.getDecoder().decode(encodedHashedPassword);

            // Create MessageDigest object for SHA-256
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            
            // Apply salt to the message (input password)
            digest.update(salt);
            
            // Get the hash of the input password
            byte[] hashedInputPassword = digest.digest(inputPassword.getBytes());

            // Compare the hashes
            return MessageDigest.isEqual(hashedPassword, hashedInputPassword);

        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return false;
        }
    }

}
