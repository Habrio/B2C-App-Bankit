import React from 'react';
import { ArrowLeftIcon, ChevronDownIcon, MoneyInIcon, MoneyOutIcon, HealthIcon, InvestmentIcon, TransferIcon } from '../constants/icons';
import BarChart from '../components/BarChart';

const moneyOutData = {
    total: '1,97,647',
    change: '-68.7%',
    chartData: Array.from({ length: 31 }, (_, i) => ({ label: (i + 1).toString(), value: i === 24 ? 107000 : Math.random() * 10000 })).map((d, i) => i % 2 ? d : { ...d, value: 0 }),
    average: 6380,
    categories: [
        { name: 'EMI', amount: '99,988.85', icon: TransferIcon },
        { name: 'Money Transfer', amount: '80,884', icon: TransferIcon },
        { name: 'Healthcare', amount: '6,200', icon: HealthIcon },
        { name: 'Investment', amount: '6,000', icon: InvestmentIcon },
    ],
};

const moneyInData = {
    total: '6,62,002',
    change: '+101.4%',
    chartData: Array.from({ length: 31 }, (_, i) => ({ label: (i + 1).toString(), value: i === 24 ? 600000 : Math.random() * 10000 })).map((d, i) => i % 4 ? d : { ...d, value: 0 }),
    average: 21350,
    categories: [
        { name: 'Money Transfer', amount: '6,62,000', icon: TransferIcon },
        { name: 'General Expense', amount: '2', icon: TransferIcon },
    ],
};

const CashflowScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="h-full flex flex-col bg-gray-100">
            <header className="p-4 flex items-center justify-between sticky top-0 bg-gray-100 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="font-bold text-lg text-gray-800">Cashflow</h1>
                <button className="flex items-center space-x-1 font-semibold text-gray-800">
                    <span>Aug '25</span>
                    <ChevronDownIcon className="w-5 h-5"/>
                </button>
            </header>

            <main className="flex-grow overflow-y-auto px-4 pb-4 space-y-5">
                {/* Money Out Card */}
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500 flex items-center">MONEY OUT <MoneyOutIcon className="w-4 h-4 ml-1 text-red-500"/></p>
                            <p className="text-2xl font-bold text-gray-900">₹{moneyOutData.total}</p>
                        </div>
                        <p className="text-sm text-red-500 font-semibold">{moneyOutData.change} vs last month</p>
                    </div>
                    <BarChart data={moneyOutData.chartData} color="#ef4444" average={moneyOutData.average} />
                    <div className="mt-4 space-y-2">
                        {moneyOutData.categories.map(cat => (
                            <div key={cat.name} className="flex items-center text-sm">
                                <div className="p-1.5 bg-gray-100 rounded-full mr-3"><cat.icon className="w-4 h-4 text-gray-600"/></div>
                                <p className="flex-grow text-gray-700">{cat.name}</p>
                                <p className="font-semibold">₹{cat.amount}</p>
                            </div>
                        ))}
                    </div>
                    <button className="text-sm text-secondary font-semibold mt-3">+ 3 More Categories &gt;</button>
                </div>

                 {/* Money In Card */}
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-sm text-gray-500 flex items-center">MONEY IN <MoneyInIcon className="w-4 h-4 ml-1 text-green-500"/></p>
                            <p className="text-2xl font-bold text-gray-900">₹{moneyInData.total}</p>
                        </div>
                        <p className="text-sm text-green-500 font-semibold">{moneyInData.change} vs last month</p>
                    </div>
                    <BarChart data={moneyInData.chartData} color="#22c55e" average={moneyInData.average} />
                    <div className="mt-4 space-y-2">
                        {moneyInData.categories.map(cat => (
                            <div key={cat.name} className="flex items-center text-sm">
                                <div className="p-1.5 bg-gray-100 rounded-full mr-3"><cat.icon className="w-4 h-4 text-gray-600"/></div>
                                <p className="flex-grow text-gray-700">{cat.name}</p>
                                <p className="font-semibold">₹{cat.amount}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Summary Card */}
                <div className="bg-white p-4 rounded-2xl shadow-sm space-y-3 text-sm">
                    <div className="flex justify-between items-center"><span className="text-gray-600">Opening Balance</span> <span className="font-semibold">₹1,03,678</span></div>
                    <div className="flex justify-between items-center"><span className="text-green-600">+ Money In</span> <span className="font-semibold text-green-600">₹6,62,002</span></div>
                    <div className="flex justify-between items-center"><span className="text-red-600">- Money Out</span> <span className="font-semibold text-red-600">₹1,97,648</span></div>
                    <div className="border-t border-gray-200 my-2"></div>
                    <div className="flex justify-between items-center font-bold text-base"><span className="text-gray-800">Closing Balance</span> <span className="text-gray-900">₹5,68,132</span></div>
                </div>
            </main>
        </div>
    );
};

export default CashflowScreen;
