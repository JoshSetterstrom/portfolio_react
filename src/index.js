import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './home';
import Projects from './projects';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <main>
            {/* <Home/> */}
            <Projects />
        </main>
    </React.StrictMode>
);