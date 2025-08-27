import React from 'react';
import { ArrowLeftIcon, SearchIcon } from '../constants/icons';
import { billPayCategories } from '../constants/billpay_categories';

interface BillPayScreenProps {
    onBack: () => void;
}

const BillPayScreen: React.FC<BillPayScreenProps> = ({ onBack }) => {
    return (
        <div className="h-full flex flex-col bg-gray-100 text-gray-800">
            <header className="p-4 pt-6 bg-white flex-shrink-0 z-10 sticky top-0 flex items-center space-x-4 shadow-sm">
                <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-lg font-bold text-gray-800">Bill Pay & Recharges</h1>
            </header>

            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">here you can start a new payment</h2>
                <div className="relative">
                    <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="search recharge, fastag, and more..."
                        className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-4 space-y-8 pb-8 no-scrollbar">
                {billPayCategories.map(category => (
                    <div key={category.title}>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">{category.title}</h3>
                        <div className="grid grid-cols-4 gap-y-6">
                            {category.services.map(service => (
                                <button key={service.name} className="flex flex-col items-center justify-start text-center group">
                                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-2 shadow-sm border border-gray-200 group-hover:bg-gray-50 transition-colors">
                                        <service.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <p className="text-xs text-gray-700 leading-tight font-medium h-8">{service.name}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default BillPayScreen;