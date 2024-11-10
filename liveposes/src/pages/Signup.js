import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { POST_SIGNUP_URL } from '@/utils/Config';

import {
    BACKGROUND_COLOR,
    FLOATING_CONTAINER_COLOR,
    SECTION_TEXT_COLOR,
    SECTION_BUTTON_COLOR,
    SECTION_BUTTON_HOVER_COLOR
} from '@/utils/Colors';


export default function Signup() {

    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [weight, setWeight] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        if (!email || !password || !weight) {
            setError("Please complete all fields");
            return;
        }

        const formData = { 
            "email": email, 
            "password": password, 
            "weight": weight
        };

        try {
            const response = await fetch(POST_SIGNUP_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const token = await response.text();
                localStorage.setItem('accessToken', token);
                router.push('/Login');
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
            backgroundColor: BACKGROUND_COLOR,
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: SECTION_TEXT_COLOR,
            fontFamily: 'Roboto, sans-serif',
        },
        signupBox: {
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
        signupButton: {
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: SECTION_BUTTON_COLOR,
            color: SECTION_TEXT_COLOR,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        linksContainer: {
            marginTop: '15px',
        },
        link: {
            display: 'block',
            color: SECTION_TEXT_COLOR,
            textDecoration: 'none',
            fontSize: '14px',
            marginTop: '10px',
        },
    };

    styles.signupButton[':hover'] = {
        backgroundColor: SECTION_BUTTON_HOVER_COLOR,
    };

    return (
        <div style={styles.container}>
            <div style={styles.signupBox}>
                <h2 style={styles.header}>Sign Up</h2>
                {error && <p style={styles.error}>{error}</p>}
                <form style={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        style={styles.input}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        style={styles.input}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Weight (kg)"
                        style={styles.input}
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                    <button type="submit" style={styles.signupButton}>
                        Sign Up
                    </button>
                </form>
                <div style={styles.linksContainer}>
                    <a href="/login" style={styles.link}>Already have an account? Log in</a>
                </div>
            </div>
        </div>
    );
};
