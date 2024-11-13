'use client';

import React, { useEffect } from 'react';

import {
    BACKGROUND_COLOR,
    START_ROUTINE_BUTTON_COLOR,
    START_ROUTINE_BUTTON_HOVER_COLOR,
    SECTION_BUTTON_COLOR,
    SECTION_BUTTON_HOVER_COLOR,
    SECTION_TEXT_COLOR,
    SIDE_BAR_TEX_COLOR,
} from '@/utils/Colors';

export default function LandingPage() {

    useEffect(() => {
        document.body.style.backgroundColor = BACKGROUND_COLOR;
    }, []);

    const styles = {
        container: {
            backgroundColor: BACKGROUND_COLOR,
            //height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            color: SECTION_TEXT_COLOR,
            fontFamily: 'Roboto, sans-serif',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '0px 20px 20px 20px',
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'fixed',
            width: '95%',
            backgroundColor: BACKGROUND_COLOR,
            padding: '20px'
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
            marginBottom: '20px'
        },
        getStartedHover: {
            backgroundColor: START_ROUTINE_BUTTON_HOVER_COLOR,
        },
        image: {
            width: '50%',
            margin: '20px auto',
            display: 'block',
            borderRadius: '10px',
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)"
        },
        sidebarTitle: {
            color: SIDE_BAR_TEX_COLOR,
            fontSize: '36px',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <p style={styles.sidebarTitle}>LIVE POSES</p>
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

            <div style={styles.mainContent}>
                <h1 style={styles.mainHeader}>Transform Your Workouts</h1>
                <p style={styles.subHeader}>
                    Experience the next level of fitness tracking. Improve your posture, monitor your progress, and achieve your goals with ease.
                </p>
                <img src="/_next/static/media/FrontLegRaise.5ac6d4f9.gif" alt="Posture Demo" style={styles.image} />
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
