import React from 'react';
import { ArrowLeftIcon, ChevronDownIcon, TaxIcon, LifestyleIcon, ChevronRightIcon } from '../constants/icons';
import Tabs from '../components/Tabs';
import ProgressBar from '../components/ProgressBar';

const TaxSavingsContent: React.FC = () => {
    const taxItems = [
        { name: 'Investments', value: 0, color: 'bg-blue-500', max: 150000 },
        { name: 'Healthcare', value: 0, color: 'bg-green-500', max: 25000 },
        { name: 'Bank Interest', value: 2490, color: 'bg-teal-500', max: 10000 },
        { name: 'NPS', value: 0, color: 'bg-purple-500', max: 50000 },
        { name: 'HRA', value: 0, color: 'bg-pink-500', max: 100000 },
        { name: 'Donations', value: 0, color: 'bg-orange-500', max: 0 },
    ];

    const totalSaved = taxItems.reduce((sum, item) => sum + item.value, 0);
    const totalMax = 10000;
    const progressPercent = (totalSaved / totalMax) * 100;

    return (
        <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm">
                <p className="font-semibold text-sm">Tax Progress</p>
                <p className="text-sm text-gray-500">Track deductible investments & expenses for hassle-free filing</p>
                <div className="my-4">
                    <p className="text-xl font-bold">{progressPercent.toFixed(0)}% <span className="text-base font-normal">completed</span></p>
                    <ProgressBar value={totalSaved} max={totalMax} color="#00c9b8" />
                </div>
                <div className="space-y-3">
                    {taxItems.map(item => (
                        <div key={item.name} className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-3 ${item.color}`} />
                            <p className="flex-grow text-gray-700 text-sm">{item.name}</p>
                            <p className="font-semibold text-sm">
                                ₹{item.value.toLocaleString('en-IN')}
                                {item.max > 0 && <span className="text-gray-400"> / {item.max.toLocaleString('en-IN', { notation: 'compact', compactDisplay: 'short' })}</span>}
                            </p>
                            <ChevronRightIcon className="w-4 h-4 text-gray-400 ml-1" />
                        </div>
                    ))}
                </div>
            </div>

             <div className="bg-white p-4 rounded-2xl shadow-sm">
                 <p className="font-semibold text-sm">Bank Interest</p>
                 <p className="text-sm text-gray-500 mb-4">Get deduction for the amount earned from bank interest</p>
                 <div className="flex justify-between items-baseline mb-2">
                    <p className="text-xl font-bold text-gray-900">₹2,485</p>
                    <p className="text-sm font-semibold text-gray-500">₹10.0K</p>
                 </div>
                 <ProgressBar value={2485} max={10000} color="#00c9b8"/>
                 <button className="text-sm text-secondary font-semibold mt-4 w-full text-center">View Transactions</button>
            </div>
        </div>
    );
};

const LifestyleContent: React.FC = () => {
     const recurringTransactions = [
        { name: 'Muthoot Finance', amount: '99,988.85', frequency: 'Monthly', category: 'EMI', icon: 'https://logo.clearbit.com/muthootfinance.com' },
        { name: 'ICICI Prudential', amount: '100', frequency: 'Daily', category: 'Investment', icon: 'https://logo.clearbit.com/iciciprulife.com' },
    ];
    return (
         <div className="space-y-4">
             <div className="bg-white p-4 rounded-2xl shadow-sm">
                <p className="font-semibold mb-3 text-sm">Recurring Transactions</p>
                <div className="space-y-3">
                    {recurringTransactions.map(tx => (
                        <div key={tx.name} className="flex items-center">
                            <img src={tx.icon} className="w-10 h-10 p-1 bg-gray-100 rounded-full mr-3"/>
                            <div className="flex-grow">
                                <p className="font-semibold text-sm">{tx.name}</p>
                                <p className="text-xs text-green-600 font-semibold">{tx.frequency}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-sm">₹{tx.amount}</p>
                                <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{tx.category}</span>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <p className="font-semibold text-sm">Spending Trend</p>
                <p className="text-sm text-gray-500 mb-4">This month you've spent 69% less than the last month</p>
                <div className="space-y-2">
                    <div>
                        <p className="font-bold text-base">₹1.98L <span className="text-sm font-normal text-gray-500">August</span></p>
                        <ProgressBar value={1.98} max={6.32} color="#002393" />
                    </div>
                    <div>
                        <p className="font-bold text-base">₹6.32L <span className="text-sm font-normal text-gray-500">July</span></p>
                        <ProgressBar value={6.32} max={6.32} color="#aab4e0" />
                    </div>
                </div>
              </div>
         </div>
    )
}

const HighlightsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    
    const tabs = [
        { name: 'Tax Savings', icon: TaxIcon, content: <TaxSavingsContent /> },
        { name: 'Lifestyle', icon: LifestyleIcon, content: <LifestyleContent /> },
    ];

    return (
        <div className="h-full flex flex-col bg-gray-100">
            <header className="p-4 flex items-center justify-between sticky top-0 bg-gray-100 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="font-bold text-lg text-gray-800">Highlights</h1>
                <div className="w-6"></div>
            </header>

            <main className="flex-grow overflow-y-auto px-4 pb-4">
                 <div className="bg-white p-2 rounded-lg shadow-sm mb-4">
                    <button className="w-full flex justify-between items-center text-left">
                        <span className="font-semibold text-sm">Financial Year 2025-26</span>
                        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                    </button>
                 </div>
                 <Tabs tabs={tabs} />
            </main>
        </div>
    );
};

export default HighlightsScreen;