// src/OrbitParticles.js
import React, { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles"; // Ensures all features are loaded

const OrbitParticles = () => {
  // Initialize tsParticles with all features
  const particlesInit = useCallback(async (engine) => {
    // Load the full tsParticles package to include all features
    await loadFull(engine);
  }, []);

  // Callback when particles are loaded
  const particlesLoaded = useCallback((container) => {
    console.log(container);
  }, []);

  // Configuration options for tsParticles
  const particlesOptions = {
    fullScreen: {
      enable: true,
      zIndex: -1, // Ensures particles are behind other elements
    },
    background: {
      color: {
        value: "#0d47a1", // Background color
      },
    },
    fpsLimit: 60,
    particles: {
      number: {
        value: 50, // Number of particles
        density: {
          enable: true,
          area: 800,
        },
      },
      color: {
        value: "white", // Particle color
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.8,
        random: false,
      },
      size: {
        value: { min: 2, max: 4 },
        random: true,
      },
      move: {
        enable: true,
        speed: 2, // Base speed
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out",
        },
        // The attract property can simulate gravitational pull towards the center
        attract: {
          enable: true,
          rotate: {
            x: 600,
            y: 1200,
          },
        },
        // Alternatively, use path movement for circular orbits
        // path: {
        //   enable: true,
        //   delay: 0,
        // },
      },
      // Optional: Particle linking (set to false if not needed)
      links: {
        enable: false,
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse", // Repulse particles on hover
        },
        onClick: {
          enable: true,
          mode: "push", // Add more particles on click
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
        push: {
          quantity: 4,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "100vw", backgroundColor: 'black'}}>
      {/* tsParticles Component */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={particlesOptions}
      />
    </div>
  );
};

export default OrbitParticles;
