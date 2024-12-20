import LandingPageCanvas from './landingPageCanvas';
import CircularGradient from './circularGradient';
import { createRef, useEffect, useRef, useState } from 'react';
import Star from './star';


const generateStar = (index, options, minSize, maxSize) => {
    const size = Math.random() * (maxSize - minSize) + minSize;

    return <Star key={index} options={options} size={[size]} ref={createRef()}/>;
};


const LandingSettings = ({options}) => {
    const [settingsValues, setSettingsValues] = useState({speed: 0, rotation: 0, density: 0});

    const handleSpeedChange = e => {
        const val = parseFloat(e.target.value);

        if (isNaN(val)) return;

        options.speed.current = val;

        setSettingsValues({...settingsValues, speed: options.speed.current});
    };

    const handleRotationChange = e => {
        const val = parseFloat(e.target.value);

        if      (!val)      return;
        else if (val > 361) e.target.value = options.userRotation.current = 0;
        else if (val < 0)   e.target.value = options.userRotation.current = 360;
        else                e.target.value = options.userRotation.current = val;

        setSettingsValues({...settingsValues, rotation: options.userRotation.current});
    };

    const handleDensityChange = e => {
        const val = parseFloat(e.target.value);
        const total = options.meshes.length;

        if (!val) {
            options.density.current = 0;
            options.setMeshes([]);
        }
        else if (total < val) {
            const startingKey = options.meshes.at(-1)?.key || 0;

            options.density.current = val;
            options.setMeshes(meshes => [...meshes, ...new Array(val - total).fill('').map((_, index) => generateStar(index+startingKey, options, 0.3, 1))]);
        } else {
            options.density.current = val;
            options.setMeshes(meshes => meshes.slice(0, val));
        };

        setSettingsValues({...settingsValues, density: parseFloat(options.density.current)});
    };

    useEffect(() => {
        setSettingsValues({
            speed: options.speed.current,
            density: options.density.current,
            rotation: options.userRotation.current
        });
    }, []);

    return (
        <div style={{color: 'white'}}>
            Speed: <input id='speed' value={settingsValues.speed} type='number' onChange={handleSpeedChange}/>
            Rotation: <input id='speed' value={settingsValues.rotation} type='number' onChange={handleRotationChange}/>
            Density: <input id='speed' value={settingsValues.density} type='number' onChange={handleDensityChange}/>
        </div>
    );
};


const Landing = () => {
    const [meshes, setMeshes] = useState([]);

    const options = {
        center: useRef([window.innerWidth/2.5, -window.innerHeight/2.2]),
        density: useRef(500),
        speed: useRef(24),
        animationRotation: useRef(0),
        userRotation: useRef(0),
        meshes, setMeshes
    };

    useEffect(() => {
        setMeshes(new Array(options.density.current).fill('').map((_, index) => generateStar(index, options, 0.3, 1)));
    }, []);

    return (
        <section id='landing'>
            <LandingSettings options={options} generateStar={generateStar}/>
            {/* <CircularGradient options={options}/> */}
            <LandingPageCanvas options={options} generateStar={generateStar}/>
        </section>
    );
};

export default Landing;