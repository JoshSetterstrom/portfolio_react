import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useRef, forwardRef, createRef, useEffect, useImperativeHandle } from 'react';

import './landingPageCanvas.css';

const Circle = forwardRef(({ position, size, color }, ref) => {
	const [{opacity}, api] = useSpring(() => ({
		opacity: 1,
		config: {duration: 1000}
	}))

	useImperativeHandle(ref, () => ({
		start: (props) => api.start(props)
	}), [api]);

	const x = Math.floor(-window.innerWidth / 2 + position[0]);
	const y = Math.floor(-window.innerHeight / 2 + position[1]);

	return (
		<a.mesh position={[x, y, 1]}>
			<circleGeometry args={size} />
			<a.meshBasicMaterial color={color} transparent opacity={opacity}/>
		</a.mesh>
	);
});

const generateGeometry = (amount, maxSize, minSize, color, meshRefs) => {
	return new Array(amount).fill('').map((_, i) => {
		const position = [
			Math.floor(Math.random() * window.innerWidth),
			Math.floor(Math.random() * window.innerHeight)
		];

		const size = Math.random() * (maxSize - minSize) + minSize;

		const ref = createRef();
		meshRefs.push(ref);

		return <Circle key={i} position={position} size={[size]} color={color} ref={ref}/>
	})
}

const LandingPageCanvas = () => {
	const meshRefs = useRef([]);

	useEffect(() => {
		const check = setInterval(() => {
			if (meshRefs.current.length > 0) {
				const index = Math.floor(Math.random() * meshRefs.current.length);
				const mesh = meshRefs.current[index]?.current;
				
				mesh && mesh.start({opacity: 0});
			}
		}, 1000);

		return () => clearInterval(check);
	}, [])

	return (
		<Canvas
			id='landing-page-canvas'
			orthographic
			style={{ width: '100vw', height: '100vh', position: 'absolute'}}
			camera={{
				left: -window.innerWidth / 2,
				right: window.innerWidth / 2,
				top: window.innerHeight / 2,
				bottom: -window.innerHeight / 2,
				near: 0.1,
				far: 1000,
				position: [0, 0, 10] // closer so it's obvious
			}}
		>
			<group>
				{generateGeometry(100, 0.1, 1, 'white', meshRefs.current)}
			</group>
		</Canvas>
	);
};

export default LandingPageCanvas;
