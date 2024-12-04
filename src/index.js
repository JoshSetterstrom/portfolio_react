import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './home';
import Projects from './projects';
import asd from './assets/asd.png';
import gradient2 from './assets/gradient2.png'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <main>
            <img src={gradient2} style={{left: "-2%", width: 2800, display: 'flex', position: 'absolute', zIndex: 2}}/>
            <img src={asd} style={{height: "100vh", display: 'flex', position: 'absolute', zIndex: 1}}/>
            {/* <Home/> */}
            {/* <Projects /> */}
        </main>
    </React.StrictMode>
);