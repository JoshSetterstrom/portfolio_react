import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './linearSlider.css';



export default function LinearSlider({value, id, step, bounds, initial, callback}) {
    const [position, setPosition] = useState(null);
    const [currentValue, setCurrentValue] = useState(initial)
    const trackRef = useRef(null);
    const mouseRef = useRef(null);

    useLayoutEffect(() => {
        const rect = trackRef.current.getBoundingClientRect();

        mouseRef.current = rect.x;
        setPosition(rect.x)

        return () => {
            window.removeEventListener('mouseup', mouseUp)
            window.removeEventListener('mousemove', mouseMove)
        }
    }, []);

    useEffect(() => {
        const rect = trackRef.current.getBoundingClientRect();

        let _position;

        if (!position) {
            _position = rect.x + (initial/bounds[1] * (rect.width - 39));

            setPosition(_position);

            mouseRef.current = _position;
        } else {
            _position = position;
        }

        const percent = (_position - rect.x)/(rect.width - 39);
    
        setCurrentValue(percent*bounds[1]);

        // callback(parseFloat(valueRef.current));
    }, [position]);

    const mouseUp = () => {    
        window.removeEventListener('mouseup', mouseUp)
        window.removeEventListener('mousemove', mouseMove)
    };

    const mouseMove = e => {
        const rect = trackRef.current.getBoundingClientRect();
        
        let newPosition = e.movementX + mouseRef.current;

        if (newPosition - rect.x < -0.01) return rect.x;
        if (newPosition + 39 - rect.x > rect.width + 0.01) return rect.x + rect.width - 39;

        setPosition(newPosition);

        mouseRef.current = newPosition;

        const percent = (newPosition - rect.x)/(rect.width - 39);

        callback(parseFloat(bounds[1] * percent || bounds[0]));
    };

    const sliderClick = e => {
        const rect = trackRef.current.getBoundingClientRect();

        let newPosition = e.pageX - 20;

        if (newPosition - rect.x < 0) newPosition = rect.x;
        if (newPosition + 39 - rect.x > rect.width) newPosition = rect.x + rect.width - 39;

        setPosition(newPosition);

        mouseRef.current = newPosition;

        const percent = (newPosition - rect.x)/(rect.width - 39);

        callback(parseFloat(bounds[1] * percent || bounds[0]));
    };

    const mouseDown = () => {
        window.addEventListener('mouseup', mouseUp);
        window.addEventListener('mousemove', mouseMove)
    }

    const wheel = e => {
        const direction = -e.deltaY/100;

        let newPosition = position + (direction * step/bounds[1]);
        newPosition = newPosition > 1 ? 1 : newPosition < 0 ? 0 : newPosition

        setPosition(newPosition);

        let newValue = bounds[1] * newPosition;

        // callback(parseFloat(newValue));
    }

    return (
        <div className="linear-slider-container" id={id} ref={trackRef}>
            <div 
                className='linear-slider' 
                onClick={sliderClick} 
                onMouseDown={mouseDown}
                onWheel={wheel}
                onDragStart={e => e.preventDefault()}
            />
            <div 
                className='slider-ball' 
                style={{left: position}}
                onClick={sliderClick} 
                onMouseDown={mouseDown}
                onDragStart={e => e.preventDefault()}
            >
                {parseInt(currentValue || initial)}
            </div>
        </div>
    );
}