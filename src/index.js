import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Particles from './particles';
import waveTransition from './transition-wave';
import calculateOpacityColor from './getColor';


const root = ReactDOM.createRoot(document.getElementById('root'));

console.log(calculateOpacityColor('#fff', "#171726", 0.9))

root.render(
    <React.StrictMode>
        <main>
			<Particles id="particle1" particleCount={100} particleSize={1} particleSpeed={0.1} gradient={["var(--compcolor24) 0%", "var(--compcolor22) 100%"]}/>
			{waveTransition}
		</main>
    </React.StrictMode>
);

