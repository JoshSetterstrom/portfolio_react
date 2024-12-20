import { Canvas } from '@react-three/fiber';

import './landingPageCanvas.css';
import { useEffect, useState } from 'react';

const LandingPageCanvas = ({options}) => {
	const [canvas, setCanvas] = useState(null);

	useEffect(() => {
		window.removeEventListener('resize', renderCanvas);

		options.meshes && renderCanvas();

		window.addEventListener('resize', renderCanvas);

		return () => window.removeEventListener('resize', renderCanvas);
	}, [options.meshes]);


	const renderCanvas = () => {
		setCanvas(
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
					{options.meshes}
				</group>
			</Canvas>
		)
	}

	return canvas;
};

export default LandingPageCanvas;