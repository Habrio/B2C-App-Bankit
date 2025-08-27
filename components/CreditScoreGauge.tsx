
import React from 'react';
import { ArrowUpIcon } from '../constants/icons';

interface CreditScoreGaugeProps {
    score: number;
    status?: 'refreshing' | 'updated' | 'initial';
    change?: number;
}

const CreditScoreGauge: React.FC<CreditScoreGaugeProps> = ({ score, status = 'initial', change = 0 }) => {
    const minScore = 300;
    const maxScore = 900;
    const range = maxScore - minScore;

    // Map score to a 0-270 degree angle range
    const angle = ((score - minScore) / range) * 270;

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
        const angleInRadians = (angleInDegrees - 135) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    };

    const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
        const start = polarToCartesian(x, y, radius, endAngle);
        const end = polarToCartesian(x, y, radius, startAngle);
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
        return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
    };

    const arcPath = describeArc(100, 100, 85, 0, angle);

    return (
        <div className="relative w-64 h-64 flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-full h-full">
                <defs>
                    <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f87171" />
                        <stop offset="50%" stopColor="#facc15" />
                        <stop offset="100%" stopColor="#4ade80" />
                    </linearGradient>
                </defs>
                {/* Background arc */}
                <path
                    d={describeArc(100, 100, 85, 0, 270)}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="20"
                />
                {/* Foreground arc */}
                <path
                    d={arcPath}
                    fill="none"
                    stroke="url(#scoreGradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                {status === 'updated' && (
                    <div className="flex items-center text-green-500 font-semibold">
                       <ArrowUpIcon className="w-4 h-4 mr-1"/>
                       <span>{change}</span>
                    </div>
                )}
                <div className="text-7xl font-bold text-gray-800 tracking-tighter" style={{transition: 'all 1s ease-out'}}>
                    {status === 'refreshing' ? '...' : score}
                </div>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/CIBIL_Logo.svg/2560px-CIBIL_Logo.svg.png" alt="CIBIL" className="h-4 mt-1" />
                <p className="text-gray-400 text-xs mt-1">Part of TransUnion</p>
                <div className="absolute bottom-6 w-full flex justify-between px-8 text-xs font-semibold text-gray-400">
                    <span>300</span>
                    <span>900</span>
                </div>
            </div>
        </div>
    );
};

export default CreditScoreGauge;
