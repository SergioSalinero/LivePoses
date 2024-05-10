import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { POST_LOGING_URL } from '@/components/Config';


export default function Login() {
  
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    //if (storedToken !== null && storedToken !== undefined) {
      //router.push('/RoutineBuilding');
    //}
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(POST_LOGING_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const token = await response.text();
        localStorage.setItem('accessToken', token);
        router.push('/RoutineBuilding');
      } else if (response.status === 500) {
        setError('Internal server error. Please try again later.');
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Error processing request:', error);
      setError('Error processing request. Please try again later.');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Log In</button>
      </form>
    </div>
  );
};
