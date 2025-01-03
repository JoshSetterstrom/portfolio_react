import { useLayoutEffect, useRef, useState } from 'react';
import './slider.css';

export default function Slider({id, bounds, initial, callback}) {
    const [position, setPosition] = useState(initial/bounds[1]);
    const [positionPx, setPositionPx] = useState(null);
    const sliderRef = useRef(null);
    const mouseRef = useRef(null);

    useLayoutEffect(() => {
        return () => {
            window.removeEventListener('mouseup', mouseUp)
            window.removeEventListener('mousemove', mouseMove)
        }
    }, []);

    useLayoutEffect(() => updatePosition(), [position])

    const updatePosition = () => {
        const rect = sliderRef.current.getBoundingClientRect();

        if (position > 1) return setPositionPx(`${rect.x + sliderRef.current.clientWidth - 16}px`);
        if (position < 0) return setPositionPx(`${rect.x - 16}px`);
        else              return setPositionPx(`${rect.x + (position * sliderRef.current.clientWidth - 16)}px`);
    };

    const mouseUp = () => {    
        window.removeEventListener('mouseup', mouseUp)
        window.removeEventListener('mousemove', mouseMove)
    };

    const mouseMove = e => {
        if (!mouseRef.current) return mouseRef.current = e.x;

        const rect = sliderRef.current.getBoundingClientRect();

        const newPosition = (e.x - rect.x)/sliderRef.current.clientWidth;

        setPosition(newPosition);

        mouseRef.current = e.x;

        let newValue = bounds[1] * newPosition;

        newValue = newValue > bounds[1] ? bounds[1] : 
                   newValue < bounds[0] ? bounds[0] : 
                   newValue;

        callback(parseFloat(newValue));
    }

    const handleSliderClick = e => {
        const rect = sliderRef.current.getBoundingClientRect();

        const newPosition = (e.pageX - rect.x)/sliderRef.current.clientWidth;

        setPosition(newPosition);

        let newValue = bounds[1] * newPosition;

        newValue = newValue > bounds[1] ? bounds[1] : 
                   newValue < bounds[0] ? bounds[0] : 
                   newValue

        callback(parseFloat(newValue));
    };

    const handleMouseDown = () => {
        window.addEventListener('mouseup', mouseUp);
        window.addEventListener('mousemove', mouseMove)
    }

    return (
        <div className="slider-container" id={id} ref={sliderRef}>
            <div 
                className='slider' 
                onClick={handleSliderClick} 
                onMouseDown={handleMouseDown}
                onDragStart={e => e.preventDefault()}
            />
            <div 
                className='slider-ball' 
                style={{left: positionPx}}
                onClick={handleSliderClick} 
                onMouseDown={handleMouseDown}
                onDragStart={e => e.preventDefault()}
            />
        </div>
    );
}