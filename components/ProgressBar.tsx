import React from 'react';

interface ProgressBarProps {
    value: number;
    max: number;
    color: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, color }) => {
    const percentage = (value / max) * 100;
    return (
        <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
                className="h-2.5 rounded-full" 
                style={{ width: `${percentage}%`, backgroundColor: color, transition: 'width 0.5s ease-in-out' }}
            ></div>
        </div>
    );
};

export default ProgressBar;
