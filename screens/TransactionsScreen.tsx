import React from 'react';
import { CreditCardIcon, RupeeIcon, UserIcon, GiftIcon, StoreIcon, EducationIcon, BankIcon, HomeRentIcon, UpiIcon, WalletIcon, BillsAndRechargesIcon, CashEmiIcon, CashAtHomeIcon } from '../constants/icons';
import { ChevronRightIcon } from '../constants/icons';

interface TransactionCategory {
    name: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
}

const transactionCategories: TransactionCategory[] = [
    { name: 'Credit Card Bill Payments', description: 'all repayments to your credit cards', icon: CreditCardIcon },
    { name: 'Bills & Recharges', description: 'utility, telecom, and other payments', icon: BillsAndRechargesIcon },
    { name: 'FindiBankit Pay & UPI', description: 'online merchants, UPI payments', icon: UpiIcon },
    { name: 'Rent and Education Payments', description: 'all rent and education fees', icon: HomeRentIcon },
    { name: 'Wallet Transactions', description: 'wallet transactions, spends, transfers', icon: WalletIcon },
    { name: 'Cash At Home', description: 'cash delivery orders', icon: CashAtHomeIcon },
    { name: 'Cash EMI Payments', description: 'all EMIs for your cash loans', icon: CashEmiIcon },
    { name: 'Gift Cards', description: 'all payments related to gift cards', icon: GiftIcon },
    { name: 'Store Orders', description: 'track delivery status', icon: StoreIcon },
];

const CategoryItem: React.FC<{category: TransactionCategory, onClick: () => void}> = ({ category, onClick }) => {
    const Icon = category.icon;
    return (
        <button onClick={onClick} className="w-full flex items-center p-4 bg-white rounded-xl shadow-sm text-left">
            <div className="p-3 bg-gray-100 rounded-full">
                <Icon className="w-6 h-6 text-gray-700" />
            </div>
            <div className="flex-grow ml-4">
                <p className="font-bold text-gray-800 text-sm">{category.name}</p>
                <p className="text-xs text-gray-500">{category.description}</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-gray-400" />
        </button>
    );
};


interface TransactionsScreenProps {
    onSelectCategory: (category: string) => void;
}

const TransactionsScreen: React.FC<TransactionsScreenProps> = ({ onSelectCategory }) => {
  return (
    <>
        <header className="p-4 pt-6 bg-white flex-shrink-0 shadow-sm z-10 sticky top-0">
            <h1 className="text-lg font-bold text-center text-gray-800">Transaction History</h1>
        </header>
        <div className="p-4 space-y-3">
            {transactionCategories.map(cat => (
                <CategoryItem key={cat.name} category={cat} onClick={() => onSelectCategory(cat.name)} />
            ))}
        </div>
    </>
  );
};

export default TransactionsScreen;