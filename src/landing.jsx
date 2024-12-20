import LandingPageCanvas from './landingPageCanvas';
import CircularGradient from './circularGradient';
import { useRef, useState } from 'react';


const LandingSettings = ({options}) => {
    const handleSpeedChange = e => {
        const val = parseFloat(e.target.value);

        if (val <= 0) return;

        return options.speed.current = val;
    }

    const handleRotationChange = e => {
        const val = parseFloat(e.target.value);

        if      (!val)      return;
        else if (val > 361) e.target.value = options.userRotation.current = 0;
        else if (val < 0)   e.target.value = options.userRotation.current = 360;
        else                e.target.value = options.userRotation.current = val;
    }

    return (
        <div>
            <input id='speed' placeholder={1} type='number' onChange={handleSpeedChange}/>
            <input id='speed' placeholder={0} type='number' onChange={handleRotationChange}/>
        </div>
    )
}


const Landing = () => {
    const options = {
        speed: useRef(1),
        animationRotation: useRef(0),
        userRotation: useRef(0),
        stars: useRef([])
    }

    return (
        <section id='landing'>
            <LandingSettings options={options}/>
            <CircularGradient options={options}/>
            <LandingPageCanvas options={options}/>
        </section>
    )
}

export default Landing;