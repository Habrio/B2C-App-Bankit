import React, { useState } from 'react';

interface TabsProps {
    tabs: { name: string; icon?: React.FC<React.SVGProps<SVGSVGElement>>; content: React.ReactNode }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div>
            <div className="flex justify-center border-b border-gray-200">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`px-4 py-3 font-semibold text-center flex-1 transition-colors duration-200 focus:outline-none flex items-center justify-center space-x-2
                            ${activeTab === index 
                                ? 'border-b-2 border-secondary text-secondary' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                       {tab.icon && <tab.icon className="w-5 h-5" />}
                       <span>{tab.name}</span>
                    </button>
                ))}
            </div>
            <div className="pt-4">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tabs;
