import { createRef } from "react";
import Star from "../star";

const generateStar = (options, index) => {
    const size = Math.random() * (options.size[1] - options.size[0]) + options.size[0];

    return <Star key={index} options={options} size={[size]} ref={createRef()}/>;
};

export default generateStar;