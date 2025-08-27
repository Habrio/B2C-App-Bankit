import React from 'react';
import { ArrowLeftIcon, CheckCircleIcon } from '../constants/icons';
import { WalletTransaction } from '../types';

interface WalletHistoryScreenProps {
    onBack: () => void;
    transactions: WalletTransaction[];
    walletBalance: number;
}

const WalletHistoryScreen: React.FC<WalletHistoryScreenProps> = ({ onBack, transactions, walletBalance }) => {

    const transactionsByDate = transactions.reduce((acc, tx) => {
        const date = new Date(tx.timestamp).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(tx);
        return acc;
    }, {} as Record<string, typeof transactions>);

    return (
        <div className="h-full flex flex-col bg-gray-100">
            <header className="p-4 pt-6 bg-white flex-shrink-0 z-10 sticky top-0 flex items-center space-x-4 shadow-sm">
                <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-lg font-bold text-gray-800">FindiBankit Wallet History</h1>
            </header>

            <div className="p-4">
                <div className="p-4 bg-white border border-gray-200 rounded-lg flex justify-between items-center">
                    <div>
                        <p className="text-2xl font-bold text-gray-800">₹ {walletBalance.toFixed(2)}</p>
                        <p className="text-sm text-gray-500">FindiBankit wallet balance</p>
                    </div>
                     <button className="text-sm border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 font-semibold">all transactions</button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-4 no-scrollbar">
                {Object.entries(transactionsByDate).map(([date, transactions]) => (
                    <div key={date} className="mb-4">
                        <p className="text-xs font-bold text-gray-500 uppercase py-2">{new Date(date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                            {transactions.map(tx => (
                                <div key={tx.id} className="flex items-center p-3 border-b border-gray-100 last:border-0">
                                    <div className="p-2 bg-primary/10 rounded-full mr-3">
                                        <tx.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold text-sm text-gray-800">{tx.description}</p>
                                         <div className="flex items-center space-x-1">
                                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                            <p className="text-xs text-gray-500">{new Date(tx.timestamp).toLocaleString('en-IN', {  day: 'numeric', month: 'short', year:'2-digit', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                        </div>
                                    </div>
                                    <p className={`font-bold text-sm ${tx.type === 'added' ? 'text-green-500' : 'text-gray-800'}`}>
                                        {tx.type === 'added' ? '+' : '-'}₹{tx.amount.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WalletHistoryScreen;