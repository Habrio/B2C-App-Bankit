import React from 'react';
import { ArrowLeftIcon, CheckCircleIcon } from '../constants/icons';
import { walletTransactions } from '../constants/transactions';

interface WalletHistoryScreenProps {
    onBack: () => void;
}

const WalletHistoryScreen: React.FC<WalletHistoryScreenProps> = ({ onBack }) => {

    const transactionsByDate = walletTransactions.reduce((acc, tx) => {
        const date = new Date(tx.timestamp).toDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(tx);
        return acc;
    }, {} as Record<string, typeof walletTransactions>);

    return (
        <div className="h-full flex flex-col bg-gray-900 text-white">
            <header className="p-4 pt-6 bg-gray-900 flex-shrink-0 z-10 sticky top-0 flex items-center space-x-4">
                <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-800">
                    <ArrowLeftIcon className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold">FindiBankit Wallet History</h1>
            </header>

            <div className="p-4">
                <div className="p-4 border border-gray-700 rounded-lg flex justify-between items-center">
                    <div>
                        <p className="text-3xl font-bold">₹ 100.00</p>
                        <p className="text-sm text-gray-400">FindiBankit wallet balance</p>
                    </div>
                     <button className="text-sm border border-gray-600 rounded-md px-3 py-1.5">all transactions</button>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto px-4 no-scrollbar">
                {Object.entries(transactionsByDate).map(([date, transactions]) => (
                    <div key={date} className="mb-4">
                        <p className="text-xs font-bold text-gray-500 uppercase py-2">{new Date(date).getFullYear()}</p>
                        <div className="bg-gray-800 rounded-lg overflow-hidden">
                            {transactions.map(tx => (
                                <div key={tx.id} className="flex items-center p-3 border-b border-gray-700 last:border-0">
                                    <div className="p-2 bg-gray-700 rounded-full mr-3">
                                        <tx.icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-semibold">{tx.description}</p>
                                         <div className="flex items-center space-x-1">
                                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                                            <p className="text-xs text-gray-400">{new Date(tx.timestamp).toLocaleString('en-IN', {  day: 'numeric', month: 'short', year:'2-digit', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                                        </div>
                                    </div>
                                    <p className={`font-bold ${tx.type === 'added' ? 'text-green-400' : ''}`}>
                                        {tx.type === 'added' ? '+' : ''}₹{tx.amount.toFixed(2)}
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