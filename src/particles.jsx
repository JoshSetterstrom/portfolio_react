import React, { useEffect, useRef } from 'react';

import 'particles.js';
import './particles.css';

const Particles = ({id, particleCount=160, particleSpeed=0.1, particleSize=1, gradient=[]}) => {
    const animationFrameIdRef = useRef(null);

    const initializeParticles = () => {
        window.particlesJS(id, {
            particles: {
                number: {
                    value: particleCount,
                    density: { enable: true, value_area: 800 },
                },
                color: { value: '#b0e0e6' },
                shape: {
                    type: 'circle',
                    stroke: { width: 0, color: '#000000' },
                    polygon: { nb_sides: 5 },
                    image: { src: 'img/github.svg', width: 100, height: 100 },
                },
                opacity: {
                    value: 1,
                    random: true,
                    anim: { enable: true, speed: 2, opacity_min: 0, sync: false },
                },
                size: {
                    value: particleSize,
                    random: true,
                    anim: { enable: false, speed: 4, size_min: 0.3, sync: false },
                },
                line_linked: {
                    enable: false,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: particleSpeed,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                    attract: { enable: false, rotateX: 600, rotateY: 600 },
                },
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'bubble' },
                    onclick: { enable: true, mode: 'repulse' },
                    resize: true,
                },
                modes: {
                    grab: { distance: 400, line_linked: { opacity: 1 } },
                    bubble: {
                        distance: 250,
                        size: 0,
                        duration: 2,
                        opacity: 0,
                        speed: 3,
                    },
                    repulse: { distance: 400, duration: 0.4 },
                    push: { particles_nb: 4 },
                    remove: { particles_nb: 2 },
                },
            },
            retina_detect: true,
        });
    };

    useEffect(() => {
        initializeParticles();

        return () => {
            animationFrameIdRef.current && cancelAnimationFrame(animationFrameIdRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        initializeParticles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [particleCount, particleSpeed, particleSize]);

    return (
        <div className="particles-container">
            <div className="particles" id={id}/>
        </div>
    );
};

export default Particles;
