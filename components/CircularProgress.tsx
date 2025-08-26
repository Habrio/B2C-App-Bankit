import React from 'react';

interface CircularProgressProps {
  value: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  size = 200,
  strokeWidth = 16,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const angle = (value / 100) * 360;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <circle
          className="text-gray-200"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="text-green-400"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 0.3s ease',
          }}
        />
      </svg>
      <div
        className="absolute top-0 left-0 w-6 h-6 bg-white rounded-full border-4 border-green-400 shadow-lg"
        style={{
          transform: `rotate(${angle}deg) translate(${size / 2 - 3}px) rotate(-${angle}deg) translate(-50%, -50%)`,
          transformOrigin: `${size/2}px ${size/2}px`,
          left: `3px`, // half of (width - border)
          top: `${size/2}px`,
          transition: 'transform 0.3s ease',
        }}
      ></div>
    </div>
  );
};

export default CircularProgress;