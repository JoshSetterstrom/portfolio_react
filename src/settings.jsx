import { useEffect, useState } from "react";
import generateStar from "./utils/createStar";
import './settings.css';

const Settings = ({options}) => {
    const [settingsValues, setSettingsValues] = useState({});

    useEffect(() => {
        setSettingsValues({
            speed: {
                value: options.speed.current,
                type: 'number',
                callback: handleSpeedChange
            },
            rotation: {
                value: options.userRotation.current,
                type: 'number',
                callback: handleRotationChange
            }, 
            density: {
                value: options.density.current,
                type: 'number',
                callback: handleDensityChange
            }, 
            scale: {
                value: options.scale.current,
                type: 'number',
                callback: handleScaleChange
            }
        });
    }, []);

    const handleSpeedChange = e => {
        const val = parseFloat(e.target.value);

        options.speed.current = isNaN(val) ? 0 : val;

        setSettingsValues(settingsValues => ({...settingsValues, speed: {...settingsValues.speed, value: options.speed.current}}));

        e.target.value = options.speed.current;
        // options.direction.current = options.speed.current > 0;
    };

    const handleRotationChange = e => {
        console.log(e)
        const val = parseFloat(e.target.value);

        options.direction.current = val > options.userRotation.current;

        if (isNaN(val) || val > 359) e.target.value = options.userRotation.current = 0;
        else if (val <= 0) e.target.value = options.userRotation.current = 360;
        else e.target.value = options.userRotation.current = val;
        
        setSettingsValues(settingsValues => ({...settingsValues, rotation: {...settingsValues.rotation, value: options.userRotation.current}}));

        options.animationRotation.current = val;

        options.meshes.forEach(mesh => {
            const star = mesh.ref.current;

            const rads = (options.userRotation.current * Math.PI) / 180;

            star.angleRef.current = star.initialAngle.current + rads;
            star.angleRef.current %= 2 * Math.PI;
        });
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

        setSettingsValues(settingsValues => ({...settingsValues, density: {...settingsValues.density, value: parseFloat(options.density.current)}}));
    };

    const handleScaleChange = e => {
        const val = parseFloat(e.target.value);

        if (isNaN(val)) return;

        options.scale.current = val;

        setSettingsValues({...settingsValues, scale: options.scale.current});

        options.meshes.forEach(mesh => {
            // const {x, y, z} = mesh.ref.current.scale;

            // mesh.ref.current.scale.set(x*val, y*val, z*val)
        })
    }

    const renderSettings = () => {
        return Object.keys(settingsValues).map(key => (
            <div key={key} className="settings-item">
                <span>{key}</span>
                <input id={key} value={settingsValues[key].value} type={settingsValues[key].type} onChange={settingsValues[key].callback}/>
            </div>
        ))
    }

    return (
        <div id="settings-container">
            {renderSettings()}
            {/* Speed: <input id='speed' value={settingsValues.speed} type='number' onChange={handleSpeedChange}/>
            Rotation: <input id='speed' step="1" value={settingsValues.rotation || 0} type='number' onChange={handleRotationChange}/>
            Density: <input id='speed' value={settingsValues.density} type='number' onChange={handleDensityChange}/>
            Scale: <input id='speed' step="0.1" value={settingsValues.scale || 1} type='number' onChange={handleScaleChange}/> */}
        </div>
    );
};

export default Settings;