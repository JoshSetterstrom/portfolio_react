import { useSpring, a } from '@react-spring/three';
import { useFrame } from "@react-three/fiber";
import { forwardRef, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import randomInt from './utils/randomInt';

const colors = [
    "#B0E0E6", "#B0C4DE", "#87CEFA", "#87CEEB", "#D3D3D3",
    "#DCDCDC", "#E6E6FA", "#F0F8FF", "#FAFAD2", "#EEE8AA",
    "#FFE4B5", "#FFFFE0", "#FFA07A", "#FFDAB9", "#FFE4E1",
    "#FFDEAD", "#F08080", "#FA8072", "#BC8F8F", "#CD5C5C",
];

const Star = forwardRef(({ options, size }, ref) => {
    const [active, setActive] = useState(true);

    const color = colors[Math.floor(Math.random() * colors.length)];

    const x = randomInt(-window.innerWidth/1.5, window.innerWidth/1.5);
    const y = randomInt(-window.innerHeight/2, window.innerWidth);

    const dx = x - options.center.current[0];
    const dy = y - options.center.current[1];

    const radius = useRef(Math.sqrt(dx*dx + dy*dy));
    const angleRef = useRef(-Math.atan2(dy, dx));

    const { opacity } = useSpring({
        from: {opacity: 1},
        to: {opacity: 0},
        loop: {reverse: true},
        delay: Math.random() * 100000,
        config: {duration: 1000}
    });

    const { scale } = useSpring({
        from: {scale: 1},
        to: {scale: 1.7},
        loop: {reverse: true},
        delay: Math.random() * 100000,
        config: {duration: 1000}
    });

    useEffect(() => {
        // const interval = setInterval(() => setActive(!active), 2000);

        // return () => clearInterval(interval);
    }, []);

    useLayoutEffect(() => {
        ref.current.position.set(x, y, 0);
    })

    useFrame((_, delta) => {
        const speedCoefficient = (2 * Math.PI) / ((24 / options.speed.current) * 3600);

        angleRef.current += speedCoefficient * delta;
    
        ref.current.position.set(
            options.center.current[0] + radius.current * Math.cos(-angleRef.current),
            options.center.current[1] + radius.current * Math.sin(-angleRef.current),
            0
        );

        const {x, y} = ref.current.position;

        const direction = options.speed.current > 0;

        const outOfBoundsX = x > window.innerWidth/2;
        const outOfBoundsY = y < -window.innerHeight/2;

        if (outOfBoundsX || outOfBoundsY) {
            angleRef.current = Math.PI - angleRef.current;

            const newRadius = Math.floor(Math.random() * window.innerWidth) * 1.2;

            const requiredSin = direction ? 
                ((-window.innerHeight / 2) - options.center.current[1]) / newRadius : 
                ((window.innerWidth / 2) - options.center.current[0]) / newRadius

            if (Math.abs(requiredSin) <= 1) {
                angleRef.current = direction ? -Math.asin(requiredSin) : -Math.acos(requiredSin);
                radius.current = newRadius
            }
        }
    });

    return (
        <a.mesh scale={scale} ref={ref}>
            <circleGeometry args={size} />
            <a.meshBasicMaterial color={color} transparent opacity={opacity}/>
        </a.mesh>
    )
});

export default Star