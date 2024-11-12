'use client';

import React from 'react';

import {
    BACKGROUND_COLOR,
    START_ROUTINE_BUTTON_COLOR,
    START_ROUTINE_BUTTON_HOVER_COLOR,
    SECTION_BUTTON_COLOR,
    SECTION_BUTTON_HOVER_COLOR,
    SECTION_TEXT_COLOR
} from '@/utils/Colors';

export default function LandingPage() {
    const styles = {
        container: {
            backgroundColor: BACKGROUND_COLOR,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: SECTION_TEXT_COLOR,
            fontFamily: 'Roboto, sans-serif',
            backgroundImage: 'url(/images/posture-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '20px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        logo: {
            width: '120px',
        },
        navButtons: {
            display: 'flex',
            gap: '10px',
        },
        button: {
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: SECTION_BUTTON_COLOR,
            color: SECTION_TEXT_COLOR,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: SECTION_BUTTON_HOVER_COLOR,
        },
        mainContent: {
            textAlign: 'center',
            marginTop: '10%',
        },
        mainHeader: {
            fontSize: '48px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
        },
        subHeader: {
            fontSize: '20px',
            marginBottom: '40px',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
        },
        getStartedButton: {
            padding: '15px 30px',
            borderRadius: '5px',
            backgroundColor: START_ROUTINE_BUTTON_COLOR,
            color: '#fff',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        getStartedHover: {
            backgroundColor: START_ROUTINE_BUTTON_HOVER_COLOR,
        },
        image: {
            width: '50%',
            margin: '20px auto',
            display: 'block',
            borderRadius: '10px',
        },
    };

    return (
        <div style={styles.container}>
            {/* Header con Logo y Botones */}
            <div style={styles.header}>
                <img src="/images/logo.png" alt="Platform Logo" style={styles.logo} />
                <div style={styles.navButtons}>
                    <button
                        style={styles.button}
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        onClick={() => window.location.href = '/Login'}
                    >
                        Log In
                    </button>
                    <button
                        style={styles.button}
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        onClick={() => window.location.href = '/Signup'}
                    >
                        Sign Up
                    </button>
                </div>
            </div>

            {/* Contenido Principal */}
            <div style={styles.mainContent}>
                <h1 style={styles.mainHeader}>Transform Your Workouts</h1>
                <p style={styles.subHeader}>
                    Experience the next level of fitness tracking. Improve your posture, monitor your progress, and achieve your goals with ease.
                </p>
                <img src="/images/posture-demo.jpg" alt="Posture Demo" style={styles.image} />
                <button
                    style={styles.getStartedButton}
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.getStartedHover.backgroundColor}
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.getStartedButton.backgroundColor}
                    onClick={() => window.location.href = '/Login'}
                >
                    Get Started
                </button>
            </div>
        </div>
    );
}
