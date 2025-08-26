import React from 'react';
import { PurchasedGiftCard } from '../types';
import { ArrowLeftIcon, CheckCircleIcon, InfoIcon } from '../constants/icons';
import { mockCashEmiTransactions } from '../constants/cash_transactions';

interface PaymentHistoryScreenProps {
    category: string;
    onBack: () => void;
    purchasedGiftCards: PurchasedGiftCard[];
    onSelectGiftCard: (cardId: string) => void;
}

const PaymentHistoryScreen: React.FC<PaymentHistoryScreenProps> = ({ category, onBack, purchasedGiftCards, onSelectGiftCard }) => {
    
    const renderGiftCardHistory = () => {
        if (purchasedGiftCards.length === 0) {
            return <div className="text-center text-gray-500 pt-16">No gift card transactions found.</div>;
        }

        return purchasedGiftCards.map(card => (
            <button key={card.id} onClick={() => onSelectGiftCard(card.id)} className="w-full flex items-center p-4 bg-white text-left">
                <img src={card.brand.logo} alt={card.brand.name} className="w-10 h-10 rounded-full mr-4" />
                <div className="flex-grow">
                    <p className="font-bold">{card.brand.name} Gift Card</p>
                    <div className="flex items-center space-x-1">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <p className="text-xs text-gray-500">{new Date(card.purchaseDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    </div>
                </div>
                <p className="font-bold">₹{card.amount.toFixed(2)}</p>
            </button>
        ));
    };

    const renderCashEmiHistory = () => {
        if (mockCashEmiTransactions.length === 0) {
            return <div className="text-center text-gray-500 pt-16">No EMI payments found.</div>;
        }

        return mockCashEmiTransactions.map(emi => (
            <div key={emi.id} className="w-full flex items-center p-4 bg-white">
                <div className="flex-grow">
                    <p className="font-bold">EMI Payment</p>
                     <div className="flex items-center space-x-1">
                        {emi.isLate ? 
                            <InfoIcon className="w-4 h-4 text-red-500" /> : 
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        }
                        <p className="text-xs text-gray-500">Paid on {new Date(emi.paidOn).toLocaleString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                    {emi.isLate && <p className="text-xs text-red-500 font-semibold">Paid with late fee</p>}
                </div>
                <p className="font-bold text-right">₹{emi.amount.toLocaleString('en-IN')}</p>
            </div>
        ));
    };

    const renderContent = () => {
        switch(category) {
            case 'Gift Cards':
                return renderGiftCardHistory();
            case 'Cash EMI Payments':
                return renderCashEmiHistory();
            default:
                return <div className="text-center text-gray-500 pt-16">No transactions found for {category}.</div>;
        }
    };
    
    return (
        <>
            <header className="p-4 pt-6 bg-white flex-shrink-0 shadow-sm z-10 sticky top-0 flex items-center">
                <button onClick={onBack} className="mr-4"><ArrowLeftIcon className="w-6 h-6" /></button>
                <h1 className="text-xl font-bold text-gray-800">{category}</h1>
            </header>
            <div className="p-4 bg-gray-100 flex-grow">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm divide-y divide-gray-100">
                    {renderContent()}
                </div>
            </div>
        </>
    );
};

export default PaymentHistoryScreen;