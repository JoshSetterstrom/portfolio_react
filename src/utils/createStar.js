const colors = [
    "#B0E0E6", "#B0C4DE", "#87CEFA", "#87CEEB", "#D3D3D3",
    "#DCDCDC", "#E6E6FA", "#F0F8FF", "#FAFAD2", "#EEE8AA",
    "#FFE4B5", "#FFFFE0", "#FFA07A", "#FFDAB9", "#FFE4E1",
    "#FFDEAD", "#F08080", "#FA8072", "#BC8F8F", "#CD5C5C",
];

const createStar = (options) => {
    const angle = Math.random() * Math.PI*2;
    const radius = options.maxRadius.current * Math.sqrt(Math.random());
    const size = Math.random() * (options.size[1] - options.size[0]) + options.size[0];

    return {
        angle,
        radius,
        size,
        initialSize: size,
        color: colors[Math.floor(Math.random() * colors.length)],
        x: radius * Math.cos(angle),
        y: radius * Math.sin(angle),
        z: 0
    }
};

export default createStar;