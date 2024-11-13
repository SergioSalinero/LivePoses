import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//import { backend_util } from '@tensorflow/tfjs';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { IoMdAdd } from "react-icons/io";
import { MdPublish } from "react-icons/md";

import ExerciseCategory from "@/components/ExerciseCategory";

import {
    GET_CATEGORY_COUNT_URL,
    GET_BASIC_STATISTICS_URL,
    GET_STATISTICS_URL
} from '@/utils/Config';

import strenghtImage from '../../public/images/exerciseCategories/Strenght.jpeg';
import flexibilityImage from '../../public/images/exerciseCategories/Flexibility.jpg';
import rehabilitationImage from '../../public/images/exerciseCategories/Rehabilitation.jpeg';

import frontLegRaiseImage from "../../public/images/exercises/FrontLegRaise.gif";
import lungesImage from "../../public/images/exercises/Lunges.gif";
import hamstringsImage from "../../public/images/exercises/Hamstrings.gif";
import tiryakTasadanImage from "../../public/images/exercises/TiryakTasadan.gif";
import pullUpsImage from "../../public/images/exercises/PullUps.gif";
import bicepsCurlImage from "../../public/images/exercises/BicepsCurl.gif";
import stantingCrunchImage from "../../public/images/exercises/StandingCrunch.gif";

import { 
    BACKGROUND_COLOR,
    SIDE_BAR_COLOR,
    SIDE_BAR_BUTTON_COLOR,
    SIDE_BAR_BUTTON_HOVER_COLOR,
    SIDE_BAR_TEX_COLOR,
    FLOATING_CONTAINER_COLOR,
    SECTION_TEXT_COLOR
} from '@/utils/Colors';


export default function Home() {

    const router = useRouter();
    const [strenghtImageURL, setStrenghtImageURL] = useState('');
    const [flexibilityImageURL, setflexibilityImageURL] = useState('');
    const [rehabilitationImageURL, setRehabilitationImageURL] = useState('');

    const [strenghtCounter, setStrenghtCounter] = useState(0);
    const [flesibilityCounter, setFlexibilityCounter] = useState(0);
    const [rehabilitationCounter, setRehabilitationCounter] = useState(0);
    const [equilibriumCounter, setEquilibriumCounter] = useState(0);

    var categoryCounter;

    var [basicStatistics, setBasicStatistics] = useState([]);
    var [statistics, setStatistics] = useState([]);
    var [routineStatistics, setRoutineStatistics] = useState([]);
    var [timeStatistics, setTimeStatistics] = useState([]);
    var [caloriesStatistics, setCaloriesStatistics] = useState([]);

    var [token, setToken] = useState('');

    useEffect(() => {
        document.body.style.backgroundColor = BACKGROUND_COLOR;


        setStrenghtImageURL(strenghtImage.src);
        setflexibilityImageURL(flexibilityImage.src);
        setRehabilitationImageURL(rehabilitationImage.src);


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
                console.log(categoryCounter);

                categoryCounter.forEach((element) => {
                    if (element.category == 'Muscle&Strenght')
                        setStrenghtCounter(element.count);
                    else if (element.category == 'Flexibility&Mobility')
                        setFlexibilityCounter(element.count);
                    else if (element.category == 'Rehabilitation')
                        setRehabilitationCounter(element.count);
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
                const data = await response.json()
                data['averageAccuracy'] = data['averageAccuracy'].toFixed(2);
                data['caloriesCounter'] = data['caloriesCounter'].toFixed(2);
                data['timeCounter'] = (data['timeCounter'] / 60).toFixed(2);
                data['breakCounter'] = (data['breakCounter'] / 60).toFixed(2)
                setBasicStatistics(data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        async function fetchStatistics() {
            try {
                const response = await fetch(GET_STATISTICS_URL, {
                    method: 'GET',
                    headers: {
                        'Authorization': token,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setStatistics(data);

                const routineS = data.map((element) => {
                    return [element[2].split(" ")[0], element[4]];
                });
                setRoutineStatistics(routineS.map(element => ({
                    date: element[0],
                    value: parseInt(element[1])
                })));

                const timeS = data.map((element) => {
                    return [element[2].split(" ")[0], (parseInt(element[3]) / 60).toFixed(2)];
                });
                setTimeStatistics(timeS.map(element => ({
                    date: element[0],
                    value: parseInt(element[1])
                })));

                const caloriesS = data.map((element) => {
                    return [element[2].split(" ")[0], element[5]];
                });
                setCaloriesStatistics(caloriesS.map(element => ({
                    date: element[0],
                    value: parseFloat(element[1])
                })));

                console.log(frontLegRaiseImage.src);
                console.log(lungesImage.src)
                console.log(hamstringsImage.src)
                console.log(tiryakTasadanImage.src)
                console.log(pullUpsImage.src)
                console.log(bicepsCurlImage.src)
                console.log(stantingCrunchImage.src)
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }

        fetchCategoryCount();
        fetchBasicStatistics();
        fetchStatistics();
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
            fontSize: '36px',
            fontWeight: 'bold',
            fontFamily: 'Montserrat, sans-serif',
            marginLeft: '5px',
            marginTop: '30px',
            width: '220px'
        },
        sidebarButton: {
            border: 'none',
            cursor: 'pointer',
            marginBottom: '10px',
            fontSize: '20px',
            textAlign: 'center',
            padding: '20px 10px 20px 10px',
            backgroundColor: SIDE_BAR_BUTTON_COLOR,
            color: SIDE_BAR_TEX_COLOR,
            borderRadius: '20px',
        },
        spanIcon: {
            fontSize: '40px',
        },
        sidebarButtonHover: {
            backgroundColor: SIDE_BAR_BUTTON_HOVER_COLOR
        },
        sidebarDivider: {
            margin: '10px 5px 10px 5px',
            backgroundColor: "rgba(255, 255, 255, 0.2)"
        },
        exerciseCategory: {
            backgroundColor: 'transparent',
            marginTop: '25px',
            marginLeft: '275px',
            marginRight: '20px',
            marginBottom: '55px',
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
        },
        chartsDiv: {
            backgroundColor: '#E0E0E0',
            borderRadius: '20px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
            marginBottom: '20px'
        },
        basicStatisticsDiv: {
            flex: 3,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(75px, 1fr))',
            gap: '5px',
            marginTop: '-20px'
        },
        basicSpecificStatistic: {
            backgroundColor: "rgba(224, 224, 224, 0.9)",
            padding: '15px 7px 15px 7px',
            borderRadius: '10px',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
        },
        boldSpan: {
            fontWeight: 'bold'
        }
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
                            <span style={StyleSheet.spanIcon}><IoMdAdd /></span>
                            <br></br>
                            Create your own rutine
                        </button>
                        <button
                            style={StyleSheet.sidebarButton}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('/PublishRoutine')}
                        >
                            <span style={StyleSheet.spanIcon}><MdPublish /></span>
                            <br></br>
                            Publish a routine
                        </button>
                        <hr style={StyleSheet.sidebarDivider} />
                        <button
                            style={{
                                ...StyleSheet.sidebarButton,
                                marginTop: '10px',
                            }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButtonHover.backgroundColor}
                            onMouseLeave={(e) => e.target.style.backgroundColor = StyleSheet.sidebarButton.backgroundColor}
                            onClick={() => router.push('/Profile')}
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
                                imageURL="/_next/static/media/FrontLegRaise.5ac6d4f9.gif"
                                title="Rehabilitation"
                                numRoutines={rehabilitationCounter}
                                onClick={() => handleClick(4)} />
                            <ExerciseCategory
                                imageURL="/_next/static/media/TiryakTasadan.4908e6c3.gif"
                                title="Flexibility & Mobility"
                                numRoutines={flesibilityCounter}
                                onClick={() => handleClick(3)} />
                            <ExerciseCategory
                                imageURL="/_next/static/media/BicepsCurl.449b5c5f.gif"
                                title="Muscle & Strenght"
                                numRoutines={strenghtCounter}
                                onClick={() => handleClick(2)} />
                            <ExerciseCategory
                                imageURL="/_next/static/media/StandingCrunch.07dc2eb3.gif"
                                title="Equilibrium"
                                numRoutines={equilibriumCounter}
                                onClick={() => handleClick(7)} />
                        </div>
                    </div>
                </div>

                <div style={StyleSheet.exerciseCategory}>
                    <div style={StyleSheet.floatingContainer}>
                    <p style={StyleSheet.sectionTitle}>Your statistics</p>
                        <div style={StyleSheet.basicStatisticsDiv}>
                            <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Routine counter:</span> {basicStatistics['routineCounter']}</p>
                            <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Time counter:</span> {basicStatistics['timeCounter']}</p>
                            <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Calories counter:</span> {basicStatistics['caloriesCounter']}</p>
                            <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Breaktime counter:</span> {basicStatistics['breakTimeCounter']}</p>
                            <p style={StyleSheet.basicSpecificStatistic}><span style={StyleSheet.boldSpan}>Average Accuracy:</span> {basicStatistics['averageAccuracy']}%</p>
                        </div>
                        <div style={StyleSheet.chartsDiv}>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={routineStatistics} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#555', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#333', borderRadius: 8, color: '#fff' }}
                                        labelStyle={{ fontWeight: 'bold' }}
                                        itemStyle={{ color: '#ddd' }}
                                    />
                                    <Legend verticalAlign="top" height={36} iconType="square" />
                                    <Bar
                                        dataKey="value"
                                        name="Routines per day"
                                        fill="#212121"
                                        barSize={40}
                                        radius={[10, 10, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div style={StyleSheet.chartsDiv}>
                            <ResponsiveContainer width="100%" height={400}>
                                <BarChart data={timeStatistics} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#555', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#333', borderRadius: 8, color: '#fff' }}
                                        labelStyle={{ fontWeight: 'bold' }}
                                        itemStyle={{ color: '#ddd' }}
                                    />
                                    <Legend verticalAlign="top" height={36} iconType="square" />
                                    <Bar
                                        dataKey="value"
                                        name="Trained time per day (minutes)"
                                        fill="#212121"
                                        barSize={40}
                                        radius={[10, 10, 0, 0]}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <div style={StyleSheet.chartsDiv}>
                            <ResponsiveContainer width="100%" height={400}>
                                <LineChart data={caloriesStatistics} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                                    <XAxis dataKey="date" tick={{ fill: '#555', fontSize: 12 }} />
                                    <YAxis tick={{ fill: '#555', fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#333', borderRadius: 8, color: '#fff' }}
                                        labelStyle={{ fontWeight: 'bold' }}
                                        itemStyle={{ color: '#ddd' }}
                                    />
                                    <Legend verticalAlign="top" height={36} iconType="square" />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        name="Calories burned per day"
                                        stroke="#212121"
                                        strokeWidth={2.5}
                                        dot={{ r: 6, fill: '#212121' }}
                                        activeDot={{ r: 8, fill: '#4a47a3' }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}