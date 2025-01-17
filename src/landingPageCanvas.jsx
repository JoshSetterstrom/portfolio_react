import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './landingPageCanvas.css';
import { forwardRef, useEffect, useMemo, useRef } from 'react';
import { Matrix4 } from 'three';
import _time from './utils/time'

const Stars = forwardRef(({options}, ref) => {
	const meshRef = useRef();

	const matrix = useMemo(() => new Matrix4(), []);

	useEffect(() => {
		options.stars.forEach((star, i) => {
			if (i%2) return;

			const duration = 10 - (Math.random() * options.animSpeed);
			const type = Math.floor(Math.random() * 2);

			star.animationData = {
				from: star.initialSize,
				to: star.scale * 1.5 * type,
				delay: null,
				duration,
				elapsed: 0,
			};
		});
	}, [options.animOccurence, options.animSpeed]);

	useEffect(() => {
		ref.current.rotation.z = -_time.toRadians();
	}, [])

	useEffect(() => {
		options.stars.forEach((star, i) => {
			matrix.identity();
			matrix.multiply(new Matrix4().makeTranslation(star.x, star.y, star.z));
			matrix.multiply(new Matrix4().makeScale(star.size, star.size, star.size));

			meshRef.current.setMatrixAt(i, matrix);
			meshRef.current.setColorAt(i, new THREE.Color(star.color));
		});

		if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

		meshRef.current.instanceMatrix.needsUpdate = true;
	}, [options.stars, matrix]);

	useFrame((_, delta) => {
		const baseAngularSpeed = (2*Math.PI) / 86400;
		ref.current.rotation.z += (baseAngularSpeed * delta * -options.speed.current) % Math.PI*2;

		options.setRotation(-ref.current.rotation.z);
	});

	return (
		<instancedMesh ref={meshRef} args={[null, null, options.density.current]}>
			<circleGeometry />
			<meshBasicMaterial color="white" />
		</instancedMesh>
	)
});


const Tails = forwardRef(({options}, ref) => {
	const tailsRef = useRef();

	const createGeometry = () => {
		const ring = new THREE.RingGeometry(1.0, 1.01, 32, 1, 0, 1);
		const geometry = new THREE.InstancedBufferGeometry();

		geometry.index = ring.index;
	
		for (const key in ring.attributes) geometry.setAttribute(key, ring.attributes[key]);
	
		const starDataArray = new Float32Array(options.stars.length * 4);
	
		for (let i = 0; i < options.stars.length; i++) {
			const star = options.stars[i];
				
			starDataArray[i * 4 + 0] = star.radius - star.size/2;
			starDataArray[i * 4 + 1] = star.radius + star.size/2;
			starDataArray[i * 4 + 2] = star.angle;
			starDataArray[i * 4 + 3] = 0.3;
		};
	
		const starDataAttr = new THREE.InstancedBufferAttribute(starDataArray, 4);
	
		geometry.setAttribute('starData', starDataAttr);
		geometry.instanceCount = options.stars.length;

		return geometry;
	};

	const createMaterial = () => {
		const material = new THREE.MeshBasicMaterial({ 
			side: THREE.DoubleSide ,
			transparent: true,
			depthWrite: false
		});
		
		material.onBeforeCompile = (shader) => {
			shader.uniforms.uSpeed = { value: parseFloat(options.speed.current) };

			shader.vertexShader = `
				uniform float uSpeed;
				attribute vec4 starData;
				varying float vFrac;


				${shader.vertexShader}
			`;
	
			shader.vertexShader = shader.vertexShader.replace(
				'#include <begin_vertex>',
				`
				float localR = length(position.xy);
				float localAngle = atan(position.y, position.x);
			
				float rInner      = starData.x;
				float rOuter      = starData.y;
				float angleOffset = starData.z; 
				float arcSize     = starData.w;

				float f = (localR - 1.0)/0.01;
				f = clamp(f, 0.0, 1.0);
			
				float finalR = (rInner + f*(rOuter - rInner));
				float finalAngle = angleOffset + localAngle*(uSpeed/100000.0);

				vFrac = clamp(localAngle, 0.0, 1.0);
			
				vec3 transformed = vec3(
					finalR * cos(finalAngle),
					finalR * sin(finalAngle),
					0.0
				);
				`
			);

			shader.fragmentShader = `
				varying float vFrac;

				${shader.fragmentShader}
			`;

			shader.fragmentShader = shader.fragmentShader.replace(
				'#include <dithering_fragment>',
				`
				gl_FragColor.a *= (1.0 - vFrac);
		
				#include <dithering_fragment>
				`
			);

			material.userData.shader = shader;
		};

		return material
	};

	const geometry = useMemo(createGeometry, [options.density.current]);
	const material = useMemo(createMaterial, []);

	useFrame(() => {
		if (material.userData.shader) material.userData.shader.uniforms.uSpeed.value = options.speed.current;
	})

	return options.density.current
		? <instancedMesh ref={tailsRef} args={[geometry, material, options.density.current-1]} />
		: null
});



const LandingPageCanvas = ({options}) => {
	const meshRef = useRef();

	const position = new THREE.Vector3(...options.center.current, 0);

	useEffect(() => {options.meshRef = meshRef}, [])

	return (
		<Canvas orthographic>
			<group className="canvas-mesh" ref={meshRef} position={position}>
				<Stars options={options} ref={meshRef}/>
				<Tails options={options} ref={meshRef}/>
			</group>
		</Canvas>
	);
};

export default LandingPageCanvas;