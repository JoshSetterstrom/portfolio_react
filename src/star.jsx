import { useSpring, a } from '@react-spring/three';
import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from "react";
import randomInt from './utils/randomInt';

const colors = [
    "#B0E0E6", "#B0C4DE", "#87CEFA", "#87CEEB", "#D3D3D3",
    "#DCDCDC", "#E6E6FA", "#F0F8FF", "#FAFAD2", "#EEE8AA",
    "#FFE4B5", "#FFFFE0", "#FFA07A", "#FFDAB9", "#FFE4E1",
    "#FFDEAD", "#F08080", "#FA8072", "#BC8F8F", "#CD5C5C",
];

const Star = forwardRef(({ options, size }, ref) => {
    const color = colors[Math.floor(Math.random() * colors.length)];

    const x = randomInt(-window.innerWidth, window.innerWidth*2);
    const y = randomInt(-window.innerHeight, window.innerHeight*1.4);

    const dx = x - options.center.current[0];
    const dy = y - options.center.current[1];

    const radius = useRef(Math.sqrt(dx*dx + dy*dy));
    const angleRef = useRef(Math.atan2(dy, dx));
    const initialAngle = useRef(angleRef.current);
    const prevRads = useRef(null);

    const { opacity } = useSpring({
        from: {opacity: 1},
        to: {opacity: 0},
        loop: {reverse: true},
        delay: Math.random() * 100000,
        config: {duration: 1000}
    });

    const { scale } = useSpring({
        from: {scale: options.scale.current},
        to: {scale: options.scale.current * 1.7},
        loop: {reverse: true},
        delay: Math.random() * 100000,
        config: {duration: 1000}
    });

    useLayoutEffect(() => {
        ref.current.angleRef = angleRef;
        ref.current.initialAngle = initialAngle;
        ref.current.prevRads = prevRads;
    })

    useFrame((_, delta) => {
        const [centerX, centerY] = options.center.current;

        if (options.speed.current !== 0) {
            const speed = (2 * Math.PI) / ((24 / -options.speed.current) * 3600);
    
            angleRef.current += speed * delta;
            angleRef.current %= 2 * Math.PI;
        };

        ref.current.position.set(
            centerX + radius.current * Math.cos(angleRef.current),
            centerY + radius.current * Math.sin(angleRef.current),
            0
        );
    })

    useFrame(() => {
        const [centerX, centerY] = options.center.current;
        const {x, y} = ref.current.position;
        
        const outOfBoundsX = x > window.innerWidth/2;
        const outOfBoundsY = y < -window.innerHeight/2;
        
        if (outOfBoundsX || outOfBoundsY) {
            // const rads = (options.userRotation.current * Math.PI) / 180;
            // const newX = options.direction.current ? window.innerWidth/2 : randomInt(-window.innerWidth/1.5, window.innerWidth/1.5);
            // const newY = options.direction.current ? randomInt(-window.innerHeight/2, window.innerWidth) : -window.innerHeight/2;
            
            // const dx = newX - centerX;
            // const dy = newY - centerY;
            
            // ref.current.position.set(newX, newY, 0);
            // angleRef.current = Math.atan2(dy, dx) - rads;
            // radius.current = Math.sqrt(dx*dx + dy*dy);

            // console.log(prevRads)

            // initialAngle.current = angleRef.current;
            // prevRads.current = rads;
        }
    });

    return (
        <a.mesh scale={scale} ref={ref} position={[x, y, 0]}>
            <circleGeometry args={size} />
            <a.meshBasicMaterial color={color} transparent/>
        </a.mesh>
    )
});

export default Star