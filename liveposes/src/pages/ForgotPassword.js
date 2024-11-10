import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { POST_SEND_EMAIL_URL } from '@/utils/Config';

import {
  BACKGROUND_COLOR,
  FLOATING_CONTAINER_COLOR,
  SECTION_TEXT_COLOR,
  SECTION_BUTTON_COLOR,
  SECTION_BUTTON_HOVER_COLOR
} from '@/utils/Colors';


export default function ForgotPassword() {

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(POST_SEND_EMAIL_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('accessToken', token);
        router.push('/Home');
      } else if (response.status === 500) {
        setError('Internal server error. Please try again later.');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error processing request:', error);
      setError('Error processing request. Please try again later.');
    }
  };

  const styles = {
    container: {
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: BACKGROUND_COLOR,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: SECTION_TEXT_COLOR,
    },
    loginBox: {
      backgroundColor: FLOATING_CONTAINER_COLOR,
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.5)',
      textAlign: 'center',
      width: '320px',
    },
    header: {
      color: SECTION_TEXT_COLOR,
      fontSize: '24px',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    input: {
      padding: '10px',
      marginBottom: '15px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: SECTION_BUTTON_COLOR,
      color: SECTION_TEXT_COLOR,
      fontSize: '16px',
    },
    loginButton: {
      padding: '10px',
      borderRadius: '4px',
      border: 'none',
      backgroundColor: SECTION_BUTTON_COLOR,
      color: SECTION_TEXT_COLOR,
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
  };

  styles.loginButton[':hover'] = {
    backgroundColor: SECTION_BUTTON_HOVER_COLOR,
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2 style={styles.header}>Reset Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" style={styles.loginButton}>
            Send email
          </button>
        </form>
      </div>
    </div>
  );
};
