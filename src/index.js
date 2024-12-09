import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import OrbitParticles from './particles';
import waveTransition from './transition-wave';
import calculateOpacityColor from './getColor';
import daynight from './assets/daynightgradient.png'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <main>
            <section id='landing'>
                {/* <div id='cycle-gradient-container'>
                    <img id='cycle-gradient' src={daynight}/>
                </div> */}
                <OrbitParticles particleCount={20} particleSize={2} particleSpeed={0.1} gradient={["var(--compcolor24) 0%", "var(--compcolor22) 100%"]}/>
            </section>
		</main>
    </React.StrictMode>
);

