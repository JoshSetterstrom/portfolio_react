import './circularGradient.css';
import img from './assets/daynightgradient.png';
import { useEffect, useRef, useState } from 'react';

const time = (percentage) => {
    const totalHours = (percentage * 24 + 8) % 24;

    const hours = Math.floor(totalHours);
    const fractionalHour = totalHours - hours;
    
    const totalMinutes = fractionalHour * 60;
    const minutes = Math.floor(totalMinutes);
    const fractionalMinute = totalMinutes - minutes;
    
    const totalSeconds = fractionalMinute * 60;
    const seconds = Math.floor(totalSeconds);
  
    // Create a new Date for “today” and set hours/minutes to the above:
    const date = new Date();
    date.setHours(hours, minutes, seconds, 0);

    return date;
}

const CircularGradient = ({ options }) => {
    const animationRef = useRef(null);
    const lastTimeRef = useRef(performance.now());

    useEffect(() => {
        const animate = (currentTime) => {
            const elapsed = currentTime - lastTimeRef.current;

            lastTimeRef.current = currentTime;

            const speedCoefficient = (360/86400000) * options.speed.current;

            options.animationRotation.current = (options.animationRotation.current + speedCoefficient * elapsed) % 360;

            const percentage = options.animationRotation.current / 360;

            options.setTime(time(percentage).toLocaleTimeString())

            const circularGradient = document.getElementById('circular-gradient');

            if (circularGradient) {
                circularGradient.style.transform = `rotate(${options.animationRotation.current}deg)`;
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
