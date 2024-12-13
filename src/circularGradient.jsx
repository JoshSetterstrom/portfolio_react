import './circularGradient.css';
import img from './assets/daynightgradient.png';
import { useEffect, useRef } from 'react';
import { globalState } from './options';

// Variable to store the current rotation
let globalRotation = process.env.REACT_APP_GLOBAL_ROTATION;

const CircularGradient = ({ options }) => {
    const animationRef = useRef(null);
    const lastTimeRef = useRef(performance.now());
    const durationRef = useRef(options.duration);

    useEffect(() => {
        durationRef.current = options.duration;
    }, [options.duration]);

    useEffect(() => {
        const animate = (currentTime) => {
            const elapsed = currentTime - lastTimeRef.current;
            lastTimeRef.current = currentTime;

            // Calculate the new rotation and update the global variable
            globalState.rotation = (globalState.rotation + (elapsed / durationRef.current) * 360) % 360;

            // Apply the rotation to the element directly
            const circularGradient = document.getElementById('circular-gradient');
            if (circularGradient) {
                circularGradient.style.transform = `rotate(${globalState.rotation}deg)`;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current); // Cleanup
    }, []);

    return (
        <div id="circular-gradient-container">
            <img id="circular-gradient" src={img} />
        </div>
    );
};

export default CircularGradient;
