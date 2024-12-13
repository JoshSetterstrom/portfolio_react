const animations = {
    rotate: (id, lastTimeRef, durationRef, animationRef, globalRotation) => {
        const animate = currentTime => {
            const elapsed = currentTime - lastTimeRef.current;
            lastTimeRef.current = currentTime;

            // Calculate the new rotation and update the global variable
            globalRotation = (globalRotation + (elapsed / durationRef.current) * 360) % 360;

            // Apply the rotation to the element directly
            const circularGradient = document.getElementById(id);
            if (circularGradient) {
                circularGradient.style.transform = `rotate(${globalRotation}deg)`;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }
};

export default animations