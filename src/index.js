import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Particles from './particles';
import waveTransition from './transition-wave';
import calculateOpacityColor from './getColor';
import daynight from './assets/daynightgradient.png'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <main>
            <div id='cycle-gradient-container'>
                <img id='cycle-gradient' src={daynight}/>
            </div>
			<Particles id="particle1" particleCount={200} particleSize={1} particleSpeed={0.1} gradient={["var(--compcolor24) 0%", "var(--compcolor22) 100%"]}/>
			{/* {waveTransition} */}
		</main>
    </React.StrictMode>
);

