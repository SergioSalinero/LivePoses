import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//import { backend_util } from '@tensorflow/tfjs';

import ExerciseCategory from "@/components/ExerciseCategory";

import { 
    GET_CATEGORY_COUNT_URL,
    GET_BASIC_STATISTICS_URL
} from '@/utils/Config';

import cardioBurnerImage from '../../public/images/exerciseCategories/Cardio Burner.jpeg';
import strenghtImage from '../../public/images/exerciseCategories/Strenght.jpeg';
import flexibilityImage from '../../public/images/exerciseCategories/Flexibility.jpg';
import rehabilitationImage from '../../public/images/exerciseCategories/Rehabilitation.jpeg';
import hiitImage from '../../public/images/exerciseCategories/HIIT.jpeg';
import calisthenicImage from '../../public/images/exerciseCategories/Calisthenic.jpeg';

import { BACKGROUND_COLOR } from '@/utils/Colors';
import { SIDE_BAR_COLOR } from '@/utils/Colors';
import { SIDE_BAR_BUTTON_COLOR } from '@/utils/Colors';
import { SIDE_BAR_BUTTON_HOVER_COLOR } from '@/utils/Colors';
import { SIDE_BAR_TEX_COLOR } from '@/utils/Colors';
import { FLOATING_CONTAINER_COLOR } from '@/utils/Colors';
import { SECTION_TEXT_COLOR } from '@/utils/Colors';


export default function Home() {

    const router = useRouter();
    const [cardioBurnerImageURL, setCardioBurnerImageURL] = useState('');
    const [strenghtImageURL, setStrenghtImageURL] = useState('');
    const [flexibilityImageURL, setflexibilityImageURL] = useState('');
    const [rehabilitationImageURL, setRehabilitationImageURL] = useState('');
    const [hiitImageURL, setHiitImageURL] = useState('');
    const [calisthenicImageURL, setCalisthenicImageURL] = useState('');

    const [cardioBurnerCounter, setCardioBurnerCounter] = useState(0);
    const [strenghtCounter, setStrenghtCounter] = useState(0);
    const [flesibilityCounter, setFlexibilityCounter] = useState(0);
    const [rehabilitationCounter, setRehabilitationCounter] = useState(0);
    const [hiitCounter, setHiitCounter] = useState(0);
    const [calisthenicCounter, setCalisthenicCounter] = useState(0);
    const [equilibriumCounter, setEquilibriumCounter] = useState(0);

    var categoryCounter;

    var [basicStatistics, setBasicStatistics] = useState([]);

    var [token, setToken] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = BACKGROUND_COLOR;

        setCardioBurnerImageURL(cardioBurnerImage.src);
        setStrenghtImageURL(strenghtImage.src);
        setflexibilityImageURL(flexibilityImage.src);
        setRehabilitationImageURL(rehabilitationImage.src);
        setHiitImageURL(hiitImage.src);
        setCalisthenicImageURL(calisthenicImage.src);

        const storedToken = localStorage.getItem('accessToken');
        if (storedToken !== null && storedToken !== undefined) {
            setToken(storedToken);
            token = storedToken;
        }
        else {
            router.push('/Login');
        }

        async function fetchCategoryCount() {
            try {
                const response = await fetch(GET_CATEGORY_COUNT_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                categoryCounter = await response.json();
                //setCategoryCounter(jsonData);

                categoryCounter.forEach((element) => {
                    if (element.category == 'CardioBurner')
                        setCardioBurnerCounter(element.count);
                    else if (element.category == 'Muscle&Strenght')
                        setStrenghtCounter(element.count);
                    else if (element.category == 'Flexibility&Mobility')
                        setFlexibilityCounter(element.count);
                    else if (element.category == 'Rehabilitation')
                        setRehabilitationCounter(element.count);
                    else if (element.category == 'HIIT')
                        setHiitCounter(element.count);
                    else if (element.category == 'Calisilthenic')
                        setCalisthenicCounter(element.count);
                    else
                        setEquilibriumCounter(element.count);
                })
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        async function fetchBasicStatistics() {
            try {
                const response = await fetch(GET_BASIC_STATISTICS_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setBasicStatistics(await response.json());
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchCategoryCount();
        fetchBasicStatistics();
    }, []);

    const handleClick = (id) => {
        var category;
        var encodedCategory;
        var url;

        switch (id) {
            case 1:
                category = "Cardio Burner";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
            case 2:
                category = "Muscle & Strenght";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
            case 3:
                category = "Flexibility & Mobility";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
            case 4:
                category = "Rehabilitation";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
            case 5:
                category = "HIIT";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
            case 6:
                category = "Calisthenic";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
            case 7:
                category = "Equilibrium";
                encodedCategory = encodeURIComponent(category);
                url = `/CategoryRoutines?category=${encodedCategory}`;
                router.push(url);
                break;
        }
    };

    const StyleSheet = {
        backgroundContainer: {
            height: '100vh',
            //width: '100vw',
            //backgroundColor: BACKGROUND_COLOR,
            marginTop: '-16px',
            marginRight: '-8px',
            paddingBottom: '0px',
            userSelect: 'none',
            fontFamily: 'Roboto, sans-serif',
            //overflowY: 'hidden',
            //overflowX: 'hidden'
        },
        mainContainer: {
            //marginTop: '-10px',
            marginLeft: '-10px',
            //marginRight: '-8px',
            //marginBottom: '-10px',
            backgroundColor: BACKGROUND_COLOR,
            //height: '100%',
            height: '100vh'
        },
        content: {
            display: 'flex',
            flex: 1,
        },
        sidebar: {
            flex: '0 0 300px',
            padding: '1rem',
            backgroundColor: SIDE_BAR_COLOR,
            height: '100%',
            position: 'fixed',
            //marginTop: '80px',
            display: 'flex',
            flexDirection: 'column',
            //boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
        },
        sidebarTitle: {
            color: SIDE_BAR_TEX_COLOR,
            fontSize: '38px',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            marginLeft: '15px',
            marginTop: '30px',
            width: '250px'
        },
        sidebarButton: {
            border: 'none',
            cursor: 'pointer',
            marginBottom: '15px',
            fontSize: '20px',
            textAlign: 'left',
            padding: '15px',
            backgroundColor: SIDE_BAR_BUTTON_COLOR,
            color: SIDE_BAR_TEX_COLOR,
            borderRadius: '20px',
        },
        sidebarButtonHover: {
            backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR
        },
        sidebarDivider: {
            margin: '10px 5px 10px 5px',
        },
        exerciseCategory: {
            //flex: 3,
            //display: 'grid',
            //gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            //gap: '1rem',
            //padding: '1rem',
            //width: '70%',
            backgroundColor: 'transparent',
            marginTop: '25px',
            marginLeft: '320px',
            marginRight: '20px',
            marginBottom: '157px',
            height: '400px'
        },
        sectionTitle: {
            color: SECTION_TEXT_COLOR,
            fontSize: '35px',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: '600',
            marginTop: '0px',
        },
        horizontalScroll: {
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollbarColor: 'rgba(248, 248, 248, 0.8) transparent'
        },
        floatingContainer: {
            backgroundColor: FLOATING_CONTAINER_COLOR,
            borderRadius: '20px',
            padding: '20px 20px 20px 20px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.5)',
            marginBottom: '20px',
            marginTop: '30px',
            //textAlign: 'center'
        },
    };

    return (
        <div style={StyleSheet.backgroundContainer}>
            <div style={StyleSheet.mainContainer}>
                <div style={StyleSheet.content}>
                    <div style={StyleSheet.sidebar}>
                        <p style={StyleSheet.sidebarTitle}>Live Poses</p>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('/RoutineBuilding')}
                        >
                            Create your own rutine
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('/PublishRoutine')}
                        >
                            Publish a routine
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => router.push('/PublishRoutine')}*/
                        >
                            Your published routines
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => handleClick(2)}*/
                        >
                            Your statistics
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => handleClick(2)}*/
                        >
                            Stored routines
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => handleClick(2)}*/
                        >
                            Training history
                        </button>
                        <hr style={StyleSheet.sidebarDivider} />
                        <button
                            style={{
                                ...StyleSheet.sidebarButton,
                                marginTop: '10px',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                        /*onClick={() => handleClick(3)}*/
                        >
                            Profile
                        </button>
                    </div>
                </div>


                <div style={StyleSheet.exerciseCategory}>
                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Select a fitness plan</p>

                        <div style={StyleSheet.horizontalScroll}>
                            <ExerciseCategory
                                imageURL={rehabilitationImageURL}
                                title="Rehabilitation"
                                numRoutines={rehabilitationCounter}
                                onClick={() => handleClick(4)} />
                            <ExerciseCategory
                                imageURL={flexibilityImageURL}
                                title="Flexibility & Mobility"
                                numRoutines={flesibilityCounter}
                                onClick={() => handleClick(3)} />
                            <ExerciseCategory
                                imageURL={cardioBurnerImageURL}
                                title="Cardio Burner"
                                numRoutines={cardioBurnerCounter}
                                onClick={() => handleClick(1)} />
                            <ExerciseCategory
                                imageURL={strenghtImageURL}
                                title="Muscle & Strenght"
                                numRoutines={strenghtCounter}
                                onClick={() => handleClick(2)} />
                            <ExerciseCategory
                                imageURL={hiitImageURL}
                                title="HIIT"
                                numRoutines={hiitCounter}
                                onClick={() => handleClick(5)} />
                            <ExerciseCategory
                                imageURL={calisthenicImageURL}
                                title="Calisthenic"
                                numRoutines={calisthenicCounter}
                                onClick={() => handleClick(6)} />
                            <ExerciseCategory
                                imageURL={strenghtImageURL}
                                title="Equilibrium"
                                numRoutines={equilibriumCounter}
                                onClick={() => handleClick(7)} />
                        </div>
                    </div>
                </div>

                <div style={StyleSheet.exerciseCategory}>
                    <div style={StyleSheet.floatingContainer}>
                        <p style={StyleSheet.sectionTitle}>Your statistics</p>
                        <p>Routine counter: {basicStatistics['routineCounter']}</p>
                        <p>Time counter: {basicStatistics['timeCounter']}</p>
                        <p>Calories counter: {basicStatistics['caloriesCounter']}</p>
                        <p>Breaktime counter: {basicStatistics['breakTimeCounter']}</p>
                        <p>Average Accuracy: {basicStatistics['averageAccuracy']}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}