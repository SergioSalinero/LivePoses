import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import {
    GET_USER_DATA,
    POST_UPDATE_WEIGHT,
    POST_DELETE_ACCOUNT
} from '@/utils/Config';

import {
    BACKGROUND_COLOR,
    FLOATING_CONTAINER_COLOR,
    SECTION_TEXT_COLOR,
    SECTION_BUTTON_COLOR,
    SECTION_BUTTON_HOVER_COLOR,
    DANGER_BUTTON_COLOR
} from '@/utils/Colors';


export default function UserProfilePage() {

    var [userData, setUserData] = useState('');
    var [weight, setWeight] = useState('');
    const [error, setError] = useState(null);
    const router = useRouter();

    var [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        if (storedToken !== null && storedToken !== undefined) {
            setToken(storedToken);
            token = storedToken;
        }
        else {
            router.push('/Login');
        }

        async function fetchUserData() {
            try {
                const response = await fetch(GET_USER_DATA, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                var data = await response.json();
                data[1] = parseFloat(data[1]);
                setUserData(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchUserData();
    }, []);

    async function handleUpdateWeight() {
        if (weight > 0) {
            try {
                const response = await fetch(POST_UPDATE_WEIGHT, {
                    method: 'POST',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ "weight": weight }),
                });

                if (response.ok) {
                    router.push('/Profile');
                } else if (response.status === 500) {
                    setError('Internal server error. Please try again later.');
                } else {
                    setError('Invalid credentials');
                }
            } catch (error) {
                console.error('Error processing request:', error);
                setError('Error processing request. Please try again later.');
            }
        }
    }

    async function handleDeleteAccount() {
        try {
            const response = await fetch(POST_DELETE_ACCOUNT, {
                method: 'POST',
                headers: {
                    'Authorization': token,
                    'Content-Type': 'application/json'
                },
            });

            if (response.ok) {
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
    }

    async function handleLogOut() {
        localStorage.removeItem('accessToken');

        document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        router.push('/Login');
    }

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
        profileBox: {
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
        infoContainer: {
            marginBottom: '20px',
        },
        label: {
            color: SECTION_TEXT_COLOR,
            fontSize: '16px',
            marginBottom: '10px',
        },
        buttonsContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
        },
        button: {
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: SECTION_BUTTON_COLOR,
            color: SECTION_TEXT_COLOR,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        deleteButton: {
            padding: '10px',
            borderRadius: '4px',
            border: 'none',
            backgroundColor: DANGER_BUTTON_COLOR,
            color: SECTION_TEXT_COLOR,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        weightDiv: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '10px',
            marginLeft: '20px'
        },
        buttonHover: {
            backgroundColor: SECTION_BUTTON_HOVER_COLOR,
        },
        deleteButtonHover: {
            backgroundColor: '#FF1744', // Color de hover para el botón de eliminación
        }
    };


    return (
        <div style={styles.container}>
            <div style={styles.profileBox}>
                <h2 style={styles.header}>User Profile</h2>
                <div style={styles.infoContainer}>
                    <p style={styles.label}><strong>Email:</strong> {userData[0]}</p>
                    <div style={styles.weightDiv}>
                        <p><strong>Weight:</strong></p>
                        <input
                            type="number"
                            placeholder={userData[1]}
                            onChange={(e) => setWeight(e.target.value)}
                            value={weight}
                        >
                        </input>
                    </div>
                </div>
                <div style={styles.buttonsContainer}>
                    <button
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        style={styles.button}
                        onClick={() => handleUpdateWeight()}
                    >
                        Update Weight
                    </button>
                    <button
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        style={styles.button}
                    >
                        Change Password
                    </button>
                    <br></br>
                    <button
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                        style={styles.button}
                        onClick={() => handleLogOut()}
                    >
                        Log out
                    </button>
                    <button
                        onMouseEnter={(e) => e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = styles.deleteButton.backgroundColor}
                        style={styles.deleteButton}
                        onClick={() => handleDeleteAccount()}
                    >
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};
