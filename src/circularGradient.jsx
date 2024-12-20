import './circularGradient.css';
import img from './assets/daynightgradient.png';
import { useEffect, useRef, useState } from 'react';

const CircularGradient = ({ options }) => {
    const animationRef = useRef(null);
    const lastTimeRef = useRef(performance.now());

    useEffect(() => {
        const animate = (currentTime) => {
            const elapsed = currentTime - lastTimeRef.current;

            lastTimeRef.current = currentTime;

            const speedCoefficient = (360/86400000) * options.speed.current;

            options.animationRotation.current = (options.animationRotation.current + speedCoefficient * elapsed) % 360;

            const totalRotation = (options.userRotation.current + options.animationRotation.current) % 360;

            const circularGradient = document.getElementById('circular-gradient');

            if (circularGradient) {
                circularGradient.style.transform = `rotate(${totalRotation}deg)`;
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
