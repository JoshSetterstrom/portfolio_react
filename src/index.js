import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Landing from './landing';



const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <main>
            <Landing />
		</main>
    </React.StrictMode>
);

