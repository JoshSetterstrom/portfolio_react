import { useEffect, useState } from "react";
import generateStar from "./utils/createStar";
import Slider from './slider'
import './settings.css';

const Settings = ({options}) => {
    const [settingsValues, setSettingsValues] = useState({});

    useEffect(() => {
        setSettingsValues({
            speed: {
                value: options.speed.current,
                type: 'number',
                callback: handleSpeedChange,
                bounds: [0, 16384]
            },
            rotation: {
                value: options.userRotation.current,
                type: 'number',
                callback: handleRotationChange,
                bounds: [0, 359]
            }, 
            density: {
                value: options.density.current,
                type: 'number',
                callback: handleDensityChange,
                bounds: [200, 2000]
            }, 
            scale: {
                value: options.scale.current,
                type: 'number',
                callback: handleScaleChange,
                bounds: [0, 2]
            }
        });
    }, []);

    const handleSpeedChange = val => {
        options.speed.current = isNaN(val) ? 0 : val;

        setSettingsValues(settingsValues => ({...settingsValues, speed: {...settingsValues.speed, value: options.speed.current}}));
    };

    const handleRotationChange = val => {
        options.direction.current = val > options.userRotation.current;

        if (isNaN(val) || val > 359) options.userRotation.current = 0;
        else if (val <= 0) options.userRotation.current = 360;
        else options.userRotation.current = val;
        
        setSettingsValues(settingsValues => ({...settingsValues, rotation: {...settingsValues.rotation, value: options.userRotation.current}}));

        options.animationRotation.current = val;

        options.setMeshes(meshes => {
            meshes.forEach(mesh => {
                const star = mesh.ref.current;
    
                const rads = (-options.userRotation.current * Math.PI) / 180;
    
                star.angleRef.current = star.initialAngle.current + rads;
                star.angleRef.current %= 2 * Math.PI;
            });

            return meshes;
        });
    };

    const handleDensityChange = val => {
        options.setMeshes(meshes => {
            const total = meshes.length;

            if (!val) {
                options.density.current = 0;
                return [];
            } else if (total < val) {
                const startingKey = meshes.at(-1)?.key || 0;

                options.density.current = val;

                return [...meshes, ...new Array(Math.floor(val - total)).fill('').map((_, index) => generateStar(options, index+startingKey))];
            } else {
                options.density.current = val;
                return meshes.slice(0, val);
            }
        })

        setSettingsValues(settingsValues => ({...settingsValues, density: {...settingsValues.density, value: parseFloat(options.density.current)}}));
    };

    const handleScaleChange = val => {
        if (isNaN(val)) return;

        options.scale.current = val;

        setSettingsValues(settingsValues => ({...settingsValues, scale: {...settingsValues.scale, value: parseFloat(options.scale.current)}}));

        options.setMeshes(meshes => {
            meshes.forEach(mesh => {
                const {x, y, z} = mesh.ref.current.initialScale;
                const {x2, y2, z2} = mesh.ref.current.scale;

                console.log(x, y, z)
                console.log(x2, y2, z2)
    
                mesh.ref.current.scale.set(x*val, y*val, z*val)
            })


            return meshes;
        })
    }

    const renderSettings = () => {
        return Object.keys(settingsValues).map(key => (
            <div key={key} className="settings-item">
                <span>{key}</span>
                <Slider id={key} bounds={settingsValues[key].bounds} initial={settingsValues[key].value} callback={settingsValues[key].callback}/>
                {/* <input id={key} value={settingsValues[key].value} type={settingsValues[key].type} onChange={settingsValues[key].callback}/> */}
            </div>
        ))
    }

    return (
        <div id="settings-container">
            {renderSettings()}
            <div className="settings-item">
                <span>time</span>
                <input value={options.time}/>
            </div>
        </div>
    );
};

export default Settings;