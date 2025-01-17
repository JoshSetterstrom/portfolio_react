import LandingPageCanvas from './landingPageCanvas';
import { useEffect, useRef, useState } from 'react';
import CircularGradient from './circularGradient';
import Settings from './settings';
import createStar from './utils/createStar';
import _time from './utils/time';

const Landing = () => {
    const [stars, setStars] = useState([]);
    const [time, setTime] = useState(new Date());
    const [animDelay, setAnimDelay] = useState(3);
    const [animSpeed, setAnimSpeed] = useState(1);
    const [rotation, setRotation] = useState(_time.toRadians())

    const options = {
        center: useRef([window.innerWidth/3.2, -window.innerHeight/3.2]),
        maxRadius: useRef(window.innerWidth * 1.2),
        density: useRef(1000),
        speed: useRef(1.0),
        animDelay, setAnimDelay,
        animSpeed, setAnimSpeed,
        rotation, setRotation,
        stars, setStars,
        size: [0.3, 1],
        scale: useRef(1),
        direction: useRef(true),
        time, setTime
    };

    useEffect(() => {
        setStars([...Array(options.density.current)].map(() => createStar(options)));
    }, []);

    return (
        <section id='landing'>
            <Settings options={options} createStar={createStar}/>
            {/* <CircularGradient options={options}/> */}
            <LandingPageCanvas options={options} createStar={createStar}/>
        </section>
    );
};

export default Landing;