import React from 'react';
import { XIcon } from '../constants/icons';
import { Screen } from '../types';

const connectedAccounts = [
    { name: 'Punjab National Bank', number: 'xx 1019', balance: '5,49,057.35', logo: 'https://logo.clearbit.com/pnbindia.in', timestamp: "as of 03:42 AM, 26 Aug" },
    { name: 'Federal Bank', number: 'xx 9147', balance: '7,974.94', logo: 'https://logo.clearbit.com/federalbank.co.in', timestamp: "as of 03:42 AM, 26 Aug" },
];

interface AccountBalanceModalProps {
    onClose: () => void;
    totalBalance: string;
    onNavigate: (screen: Screen) => void;
}

const AccountBalanceModal: React.FC<AccountBalanceModalProps> = ({ onClose, totalBalance, onNavigate }) => {
    return (
        <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end" onClick={onClose}>
            <div className="bg-white rounded-t-2xl p-6 pt-4" onClick={e => e.stopPropagation()}>
                <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <p className="text-sm text-gray-500">All Bank Balance</p>
                        <p className="text-2xl font-bold">₹{totalBalance}</p>
                    </div>
                    <button onClick={() => onNavigate(Screen.ManageAccounts)} className="text-sm font-semibold text-secondary">Manage</button>
                </div>
                
                <div className="space-y-3">
                    {connectedAccounts.map(account => (
                        <div key={account.name} className="flex items-center p-3 border border-gray-200 rounded-lg">
                             <img src={account.logo} alt={account.name} className="w-10 h-10 rounded-lg mr-4" />
                             <div className="flex-grow">
                                <p className="font-bold text-gray-800">{account.name} <span className="text-gray-500 font-normal">{account.number}</span></p>
                                <p className="text-xs text-gray-400">{account.timestamp}</p>
                             </div>
                             <p className="font-bold">₹{account.balance}</p>
                        </div>
                    ))}
                </div>

                <button className="w-full text-left p-4 mt-4 flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-4 text-secondary font-bold text-xl">
                        +
                    </div>
                    <span className="font-semibold text-secondary">Add Bank Account</span>
                </button>
            </div>
        </div>
    )
}

export default AccountBalanceModal;