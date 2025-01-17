import { useLayoutEffect, useRef, useState } from 'react';
import './circularSlider.css';
import _time from './utils/time'

export default function CirularSlider({id, callback}) {
    const [angle, setAngle] = useState(_time.toRadians() + (Math.PI/2));

    const sliderRef = useRef(null);

    useLayoutEffect(() => {
        return () => {
            window.removeEventListener('mouseup', mouseUp)
            window.removeEventListener('mousemove', updateSlider)
        }
    }, []);

    const mouseUp = () => {    
        window.removeEventListener('mouseup', mouseUp)
        window.removeEventListener('mousemove', updateSlider)
    };

    const updateSlider = e => {
        const rect = sliderRef.current.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
  
        const mouseX = e.pageX - centerX;
        const mouseY = e.pageY - centerY;

        let rads = Math.atan2(-mouseY, -mouseX);

        setAngle(rads);

        rads -= Math.PI/2; // Offset 90 degrees

        if (rads < 0) rads += Math.PI*2;

        callback(parseFloat(rads));
    }

    const mouseDown = () => {
        window.addEventListener('mouseup', mouseUp);
        window.addEventListener('mousemove', updateSlider)
    };

    return (
        <div className="circular-slider-container" id={id} ref={sliderRef}>
            <div 
                className='circular-slider' 
                onClick={updateSlider} 
                onMouseDown={mouseDown}
                onDragStart={e => e.preventDefault()}
            />
            <div className='circular-slider-ball-container' style={{transform: `rotate(${angle}rad)`}}>
                <div 
                    className='circular-slider-ball' 
                    onClick={updateSlider}
                    onMouseDown={mouseDown}
                    onDragStart={e => e.preventDefault()}
                />
            </div>
        </div>
    );
}