import LandingPageCanvas from './landingPageCanvas';
import { useEffect, useRef, useState } from 'react';
import CircularGradient from './circularGradient';
import Settings from './settings';
import generateStar from './utils/createStar';


const Landing = () => {
    const [meshes, setMeshes] = useState([]);
    const [time, setTime] = useState(0)

    const options = {
        center: useRef([window.innerWidth/2.2, -window.innerHeight/2.2]),
        density: useRef(1000),
        speed: useRef(1),
        animationRotation: useRef(0),
        userRotation: useRef(0),
        meshes, setMeshes,
        size: [0.3, 1],
        scale: useRef(1),
        direction: useRef(true),
        time, setTime
    };

    useEffect(() => {
        setMeshes([...Array(options.density.current)].map((_, index) => generateStar(options, index)))
    }, []);

    return (
        <section id='landing'>
            <Settings options={options} generateStar={generateStar}/>
            <CircularGradient options={options}/>
            <LandingPageCanvas options={options} generateStar={generateStar}/>
        </section>
    );
};

export default Landing;