import { useEffect, useState } from "react";
import createStar from "./utils/createStar";
import LinearSlider from './linearSlider'
import CircularSlider from './circularSlider'
import './settings.css';
import _time from './utils/time'


const Settings = ({options}) => {
    const [settingsValues, setSettingsValues] = useState({});

    useEffect(() => {
        setSettingsValues({
            speed: {
                value: options.speed.current,
                type: 'linear',
                callback: handleSpeedChange,
                step: 1,
                bounds: [1, 16384]
            },
            rotation: {
                value: options.rotation.current,
                type: 'circular',
                callback: handleRotationChange,
                step: 0.5,
                bounds: [0, 359]
            }, 
            density: {
                value: options.density.current,
                type: 'linear',
                callback: handleDensityChange,
                step: 1,
                bounds: [0, 10000]
            }, 
            scale: {
                value: options.scale.current,
                type: 'linear',
                callback: handleScaleChange,
                step: 0.1,
                bounds: [0, 2]
            },
            animDelay: {
                value: options.animDelay,
                type: 'linear',
                callback: handleAnimDelayChange,
                step: 1,
                bounds: [1, 25]
            },
            animSpeed: {
                value: options.animSpeed,
                type: 'linear',
                callback: handleAnimSpeedChange,
                step: 1,
                bounds: [1, 10]
            }
        });
    }, []);

    useEffect(() => {
        options.setTime(_time.angleToTime(options.rotation))
    }, [options.rotation])

    const handleSpeedChange = val => {
        options.speed.current = isNaN(val) ? 0 : val;

        setSettingsValues(settingsValues => ({...settingsValues, speed: {...settingsValues.speed, value: options.speed.current}}));
    };

    const handleAnimSpeedChange = val => {
        options.setAnimSpeed(isNaN(val) ? 0 : val);

        setSettingsValues(settingsValues => ({...settingsValues, animSpeed: {...settingsValues.animSpeed, value: options.animSpeed}}));
    };

    const handleAnimDelayChange = val => {
        options.setAnimDelay(isNaN(val) ? 0 : val);

        setSettingsValues(settingsValues => ({...settingsValues, animDelay: {...settingsValues.animDelay, value: options.animDelay}}));
    };

    const handleRotationChange = val => {
        if (isNaN(val) || val > Math.PI*2) options.setRotation(0);
        else if (val <= 0) options.setRotation(Math.PI*2);
        else options.setRotation(val);

        setSettingsValues(settingsValues => ({...settingsValues, rotation: {...settingsValues.rotation, value: options.rotation}}));

        options.meshRef.current.rotation.z = -val;
    };

    const handleDensityChange = val => {
        val = parseInt(val);

        options.setStars(stars => {
            const total = stars.length;

            if (!val) {
                options.density.current = 0;
                return [];
            } else if (total < val) {
                options.density.current = val;

                return [...stars, ...new Array(Math.floor(val - total)).fill('').map(() => createStar(options))];
            } else {
                options.density.current = val;
                return stars.slice(0, val);
            }
        })

        setSettingsValues(settingsValues => ({...settingsValues, density: {...settingsValues.density, value: parseFloat(options.density.current)}}));
    };

    const handleScaleChange = val => {
        if (isNaN(val)) return;

        options.scale.current = val;

        setSettingsValues(settingsValues => ({...settingsValues, scale: {...settingsValues.scale, value: parseFloat(options.scale.current)}}));

        // options.setStars(stars => {
        //     stars.forEach(star => {
        //         const {x, y, z} = star.ref.current.initialScale;
        //         const {x2, y2, z2} = star.ref.current.scale;
    
        //         star.ref.current.scale.set(x*val, y*val, z*val)
        //     })

        //     return stars;
        // });
    };

    const renderSettings = () => {
        return Object.keys(settingsValues).map(key => (
            <div key={key} className="settings-item">
                <span>{key}</span>
                {settingsValues[key].type === 'linear'
                    ? <LinearSlider id={key} initial={settingsValues[key].value} {...settingsValues[key]}/>
                    : <CircularSlider id={key} initial={settingsValues[key].value} {...settingsValues[key]}/>
                }
            </div>
        ))
    }

    return (
        <div id="settings-container">
            {renderSettings()}
            <div className="settings-item">
                <span>time</span>
                <input readOnly value={options.time.toLocaleTimeString()}/>
            </div>
        </div>
    );
};

export default Settings;