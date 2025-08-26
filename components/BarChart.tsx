import React from 'react';

interface BarChartProps {
    data: { label: string; value: number }[];
    color: string;
    average: number;
}

const BarChart: React.FC<BarChartProps> = ({ data, color, average }) => {
    const maxValue = Math.max(...data.map(d => d.value), average) * 1.2;

    return (
        <div className="w-full h-40 flex items-end space-x-2 relative">
            <div className="absolute w-full border-t border-dashed border-gray-300" style={{ bottom: `${(average / maxValue) * 100}%` }}>
                <span className="absolute right-0 -top-2 text-xs text-yellow-600 bg-yellow-100 px-1 rounded">Avg {average.toLocaleString('en-IN', { notation: 'compact', compactDisplay: 'short' })}</span>
            </div>
            {data.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                    <div 
                        className="w-full rounded-t-sm" 
                        style={{ height: `${(d.value / maxValue) * 100}%`, backgroundColor: color }}
                    ></div>
                    <span className="text-xs text-gray-500 mt-1">{d.label}</span>
                </div>
            ))}
        </div>
    );
};

export default BarChart;
