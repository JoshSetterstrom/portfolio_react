import './circularGradient.css';
import img from './assets/gradient.png';

const CircularGradient = ({ options }) => {
    return (
        <div id="circular-gradient-container">
            <img id="circular-gradient" style={{transform: `rotate(${options.rotation - Math.PI/2}rad)`}} src={img}/>
        </div>
    );
};

export default CircularGradient;
