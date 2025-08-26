import React from 'react';
import { ArrowLeftIcon, FilterIcon, SortIcon } from '../constants/icons';

const transactions = [
    { id: '1', name: 'ICICI Prudential Mutual Fund', date: "25 Aug, 05:49 AM", amount: '100', type: 'debit', category: 'Mutual Fund', icon: 'https://logo.clearbit.com/iciciprulife.com' },
    { id: '2', name: 'Tata Mutual Fund', date: "25 Aug, 05:48 AM", amount: '100', type: 'debit', category: 'Mutual Fund', icon: 'https://logo.clearbit.com/tatamutualfund.com' },
    { id: '3', name: 'Googleplay', date: "24 Aug, 08:34 PM", amount: '1,950', type: 'debit', category: 'Other App...', icon: 'https://logo.clearbit.com/play.google.com' },
    { id: '4', name: 'Muthoot Finance', date: "24 Aug, 08:06 PM", amount: '99,988.85', type: 'debit', category: 'Other EMI', icon: 'https://logo.clearbit.com/muthootfinance.com' },
    { id: '5', name: 'Ashwani Kumar', date: "24 Aug, 10:42 AM", amount: '6,00,000', type: 'credit', category: 'Personal Tra...', icon: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },

];

const StatementScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="h-full flex flex-col bg-gray-100">
            <header className="p-4 flex items-center justify-between sticky top-0 bg-gray-100 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="font-bold text-lg text-gray-800">Statement</h1>
                <div className="w-6"></div>
            </header>

            <div className="px-4 py-2 flex-shrink-0 sticky top-[68px] bg-gray-100 z-10">
                <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm">
                        <FilterIcon className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm">
                        <SortIcon className="w-4 h-4" />
                        <span>Sort</span>
                    </button>
                    <div className="flex-grow"></div>
                    <button className="px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-sm">Money In</button>
                    <button className="px-3 py-1.5 bg-gray-800 text-white border border-gray-800 rounded-lg text-sm">Money Out</button>
                </div>
            </div>

            <main className="flex-grow overflow-y-auto px-4 pb-20">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider my-3">AUG 2025 (174 TRANSACTIONS)</p>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    {transactions.map(tx => (
                        <div key={tx.id} className="flex items-center p-3 border-b border-gray-100 last:border-b-0">
                            <img src={tx.icon} alt={tx.name} className="w-10 h-10 rounded-full mr-3 bg-gray-100 p-1" />
                            <div className="flex-grow">
                                <p className="font-bold text-sm text-gray-800">{tx.name}</p>
                                <p className="text-xs text-gray-500">{tx.date}</p>
                            </div>
                            <div className="text-right">
                                <p className={`font-bold ${tx.type === 'debit' ? 'text-red-500' : 'text-green-500'}`}>
                                    ₹{tx.amount} {tx.type === 'debit' ? '↗' : '↙'}
                                </p>
                                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{tx.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-xs px-4">
                 <button className="w-full bg-secondary text-white font-bold py-3 rounded-lg shadow-lg">
                    Download Statement
                </button>
            </footer>
        </div>
    );
};

export default StatementScreen;