import React, { useState } from 'react';
import { Screen } from '../types';
import { ArrowLeftIcon, SearchIcon, EyeOffIcon, ChevronRightIcon, ChatIcon } from '../constants/icons';
import AccountBalanceModal from '../components/AccountBalanceModal';

interface ConnectedBankingScreenProps {
    onBack: () => void;
    onNavigate: (screen: Screen) => void;
}

const recentTransactions = [
    { id: '1', name: 'ICICI Prudential Mutual Fund', date: "25 Aug, 5:49 AM", amount: '100', type: 'debit', category: 'Mutual Fund', icon: 'https://logo.clearbit.com/iciciprulife.com' },
    { id: '2', name: 'Tata Mutual Fund', date: "25 Aug, 5:48 AM", amount: '100', type: 'debit', category: 'Mutual Fund', icon: 'https://logo.clearbit.com/tatamutualfund.com' },
    { id: '3', name: 'GOOGLEPLAY', date: "24 Aug, 8:34 PM", amount: '1,950', type: 'debit', category: 'Other App...', icon: 'https://logo.clearbit.com/play.google.com' },
];

const ConnectedBankingScreen: React.FC<ConnectedBankingScreenProps> = ({ onBack, onNavigate }) => {
    const [showBalanceModal, setShowBalanceModal] = useState(false);
    const totalBalance = "5,57,032.29";

    return (
        <div className="h-full flex flex-col bg-gray-100">
            <header className="p-4 flex items-center justify-between sticky top-0 bg-gray-100 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                 <h1 className="font-bold text-lg text-gray-800">Connected Banking</h1>
                <div className="flex items-center space-x-2">
                    <button className="p-2 rounded-full hover:bg-gray-200">
                        <ChatIcon className="w-6 h-6 text-gray-800" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-200">
                        <SearchIcon className="w-6 h-6 text-gray-800" />
                    </button>
                </div>
            </header>

            <main className="flex-grow overflow-y-auto px-4 pb-4 space-y-5">
                {/* Balance Card */}
                <div className="bg-white p-4 rounded-2xl shadow-sm">
                    <button onClick={() => setShowBalanceModal(true)} className="w-full text-left">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">All Bank Balance</p>
                             <div className="flex items-center space-x-1">
                                <img src="https://logo.clearbit.com/federalbank.co.in" className="w-5 h-5 rounded-full" />
                                <img src="https://logo.clearbit.com/pnbindia.in" className="w-5 h-5 rounded-full" />
                                <ChevronRightIcon className="w-4 h-4 text-gray-400 transform rotate-90" />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                            <p className="text-3xl font-bold text-gray-900">₹{totalBalance}</p>
                            <EyeOffIcon className="w-5 h-5 text-gray-400" />
                        </div>
                    </button>
                     <p className="text-xs text-gray-400 mt-2">Next refresh in 03:42 AM, 27 Aug '25</p>
                </div>
                
                {/* Action Cards */}
                <div className="grid grid-cols-2 gap-4">
                    <button onClick={() => onNavigate(Screen.Cashflow)} className="bg-white p-4 rounded-2xl shadow-sm text-left">
                        <p className="font-bold">Cashflow</p>
                        <p className="text-xs text-gray-500">Money In/Out</p>
                    </button>
                     <button onClick={() => onNavigate(Screen.Highlights)} className="bg-white p-4 rounded-2xl shadow-sm text-left">
                        <p className="font-bold">Highlights</p>
                        <p className="text-xs text-gray-500">Tax & Lifestyle</p>
                    </button>
                </div>

                {/* Instant Loan Ad */}
                <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center">
                    <div className="flex-grow">
                        <p className="font-semibold text-gray-800">Need Cash? Get Instant</p>
                        <p className="font-bold text-lg text-secondary">Loan upto ₹5 Lakh!</p>
                        <button className="text-sm font-semibold text-blue-600 mt-1">Apply Now</button>
                    </div>
                    <img src="https://i.imgur.com/8Qk7a2F.png" alt="Zip EMI" className="w-16 h-16"/>
                </div>

                {/* Recent Transactions */}
                 <div>
                    <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Recent Transactions</h2>
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                        {recentTransactions.map(tx => (
                            <div key={tx.id} className="flex items-center p-3 border-b border-gray-100 last:border-b-0">
                                <img src={tx.icon} alt={tx.name} className="w-10 h-10 rounded-full mr-3" />
                                <div className="flex-grow">
                                    <p className="font-bold text-sm text-gray-800">{tx.name}</p>
                                    <p className="text-xs text-gray-500">{tx.date} • <img src="https://logo.clearbit.com/federalbank.co.in" className="w-3 h-3 rounded-full inline-block -mt-px" /></p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-red-500">₹{tx.amount} <span className="text-lg">↗</span></p>
                                    <span className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{tx.category}</span>
                                </div>
                            </div>
                        ))}
                         <button onClick={() => onNavigate(Screen.StatementScreen)} className="w-full text-center py-3 font-semibold text-secondary text-sm">
                            View Statement
                        </button>
                    </div>
                </div>
            </main>

            {showBalanceModal && <AccountBalanceModal onClose={() => setShowBalanceModal(false)} totalBalance={totalBalance} onNavigate={onNavigate}/>}
        </div>
    );
};

export default ConnectedBankingScreen;