import LandingPageCanvas from './landingPageCanvas';
import CircularGradient from './circularGradient';
import { useState } from 'react';

const Landing = () => {
    const [options, setOptions] = useState({
        duration: 100000,
        position: 0
    })

    return (
        <section id='landing'>
            {/* <CircularGradient options={{...options}}/> */}
            <LandingPageCanvas options={{...options}}/>
        </section>
    )
}

export default Landing;