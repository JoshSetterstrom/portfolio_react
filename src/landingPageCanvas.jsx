import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { useRef, forwardRef, createRef, useEffect, useState } from 'react';

import './landingPageCanvas.css';
import { sortInstancedMesh } from 'three/examples/jsm/utils/SceneUtils.js';

const colors = [
  // Blue Stars (Washed-Out)
  "#B0E0E6", // Powder Blue
  "#B0C4DE", // Light Steel Blue
  "#87CEFA", // Light Sky Blue
  "#87CEEB", // Sky Blue

  // White Stars (Washed-Out)
  "#D3D3D3", // Light Gray
  "#DCDCDC", // Gainsboro
  "#E6E6FA", // Lavender
  "#F0F8FF", // Alice Blue

  // Yellow Stars (Washed-Out)
  "#FAFAD2", // Light Goldenrod
  "#EEE8AA", // Pale Goldenrod
  "#FFE4B5", // Moccasin
  "#FFFFE0", // Light Yellow

  // Orange Stars (Washed-Out)
  "#FFA07A", // Light Salmon
  "#FFDAB9", // Peach Puff
  "#FFE4E1", // Misty Rose
  "#FFDEAD", // Navajo White

  // Red Stars (Washed-Out)
  "#F08080", // Light Coral
  "#FA8072", // Salmon
  "#BC8F8F", // Rosy Brown
  "#CD5C5C", // Indian Red
  ];

const Circle = forwardRef(({ speed, size }, ref) => {
	const [active, setActive] = useState(true);
	const angleRef = useRef(Math.random() * Math.PI * 2);

	const center = [window.innerWidth/2.5, -window.innerHeight/2.2];
	let radius = Math.floor(Math.random() * window.innerWidth);
	const color = colors[Math.floor(Math.random() * colors.length)];

	const { opacity } = useSpring({
		from: {opacity: active ? 1 : 0},
		to: {opacity: active ? 0 : 1},
		config: {duration: 2000}
	});

	useEffect(() => {
		const interval = setInterval(() => setActive(!active), 2000);

		return () => clearInterval(interval);
	}, []);

	useFrame((_, delta) => {
		const speedCoefficient = (2 * Math.PI) / ((24 / speed.current) * 3600);

		angleRef.current += speedCoefficient * delta;
	
		ref.current.position.set(
			center[0] + radius * Math.cos(-angleRef.current),
			center[1] + radius * Math.sin(-angleRef.current),
			0
		);

		const {x, y} = ref.current.position;

		const outOfBoundsX = x > window.innerWidth/2;
		const outOfBoundsY = y < -window.innerHeight/2;

		if (outOfBoundsX || outOfBoundsY) {
			angleRef.current = Math.PI - angleRef.current;

			const newRadius = Math.floor(Math.random() * window.innerWidth);

			const requiredSin = ((-window.innerHeight / 2) - center[1]) / newRadius;

			if (Math.abs(requiredSin) <= 1) {
				angleRef.current = -Math.asin(requiredSin);
				radius = newRadius;
			}
		}
	});

	return (
		<a.mesh  ref={ref}>
			<circleGeometry args={size} />
			<a.meshBasicMaterial color={color} transparent/>
		</a.mesh>
	)
});

const generateStar = (index, options, minSize, maxSize, meshRefs) => {
	const size = Math.random() * (maxSize - minSize) + minSize;

	const ref = createRef();
	// meshRefs[index] = ref;
	options.stars[index] = ref;

	return <Circle key={index} speed={options.speed} size={[size]} ref={ref}/>
}

const generateGeometry = (options, amount, maxSize, minSize, meshRefs) => {
	return new Array(amount).fill('').map((_, i) => generateStar(i, options, minSize, maxSize, meshRefs))
}

const LandingPageCanvas = ({options}) => {
	const amount = 500;
	const meshRefs = useRef([...Array(amount)].map(createRef));
	const meshes = generateGeometry(options, amount, 1, 0.3, meshRefs.current);

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
				position: [0, 0, 10]
			}}
		>
			<group>
				{meshes}
			</group>
		</Canvas>
	);
};

export default LandingPageCanvas;
