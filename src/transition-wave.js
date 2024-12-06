const waveTransition = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 300"
        preserveAspectRatio="xMidYMid"
        width="1920"
        height="300"
        style={{
            display: "block",
            position: 'relative',
            // top: -100,
            backgroundColor: "fff",
            shapeRendering: "auto",
        }}
    >
        <g data-idx="1">
            <linearGradient id="lg-nq4q5u6dq7r" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#0e0e1d" />
                <stop offset="1" stopColor="#0e0e1d" />
            </linearGradient>
    
            <path
                opacity="0.9"
                fill="url(#lg-nq4q5u6dq7r)"
                d="M 0 0 L 0 217.388 Q 240 262.021 480 236.308 T 960 180.518 T 1440 134.468 T 1920 12.258 L 1920 0 Z"
                data-idx="5"
            >
                <animate
                    attributeName="d"
                    dur="12s"
                    repeatCount="indefinite"
                    values="
                        M 0 0 L 0 217.388 Q 240 262.021 480 236.308 T 960 180.518 T 1440 134.468 T 1920 12.258 L 1920 0 Z;
                        M 0 0 L 0 220.000 Q 240 270.000 480 240.000 T 960 190.000 T 1440 140.000 T 1920 10.000 L 1920 0 Z;
                        M 0 0 L 0 217.388 Q 240 262.021 480 236.308 T 960 180.518 T 1440 134.468 T 1920 12.258 L 1920 0 Z;
                    "
                />
            </path>
    
            <path
                opacity="0.4"
                fill="url(#lg-nq4q5u6dq7r)"
                d="M 0 0 L 0 291.813 Q 240 208.119 480 170.503 T 960 96.505 T 1440 29.677 T 1920 5.694 L 1920 0 Z"
                data-idx="7"
            >
                <animate
                    attributeName="d"
                    dur="12s"
                    repeatCount="indefinite"
                    values="
                        M 0 0 L 0 291.813 Q 240 208.119 480 170.503 T 960 96.505 T 1440 29.677 T 1920 5.694 L 1920 0 Z;
                        M 0 0 L 0 300.000 Q 240 220.000 480 180.000 T 960 100.000 T 1440 30.000 T 1920 0 L 1920 0 Z;
                        M 0 0 L 0 291.813 Q 240 208.119 480 170.503 T 960 96.505 T 1440 29.677 T 1920 5.694 L 1920 0 Z;
                    "
                />
            </path>
    
            <path
                opacity="0.4"
                fill="url(#lg-nq4q5u6dq7r)"
                d="M 0 0 L 0 276.686 Q 240 263.312 480 242.264 T 960 133.093 T 1440 132.52 T 1920 67.851 L 1920 0 Z"
                data-idx="9"
            >
                <animate
                    attributeName="d"
                    dur="12s"
                    repeatCount="indefinite"
                    values="
                        M 0 0 L 0 276.686 Q 240 263.312 480 242.264 T 960 133.093 T 1440 132.52 T 1920 67.851 L 1920 0 Z;
                        M 0 0 L 0 280.000 Q 240 270.000 480 250.000 T 960 140.000 T 1440 130.000 T 1920 70.000 L 1920 0 Z;
                        M 0 0 L 0 276.686 Q 240 263.312 480 242.264 T 960 133.093 T 1440 132.52 T 1920 67.851 L 1920 0 Z;
                    "
                />
            </path>
        </g>
    </svg>
);

export default waveTransition