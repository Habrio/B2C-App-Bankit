import React from 'react';
import { CashAtHomeOrder, PurchasedGiftCard } from '../types';
import { ArrowLeftIcon, CheckCircleIcon, HomeIcon, InfoIcon } from '../constants/icons';
import { mockCashEmiTransactions } from '../constants/cash_transactions';

interface PaymentHistoryScreenProps {
    category: string;
    onBack: () => void;
    purchasedGiftCards: PurchasedGiftCard[];
    onSelectGiftCard: (cardId: string) => void;
    cashAtHomeOrders: CashAtHomeOrder[];
}

const PaymentHistoryScreen: React.FC<PaymentHistoryScreenProps> = ({ category, onBack, purchasedGiftCards, onSelectGiftCard, cashAtHomeOrders }) => {
    
    const renderGiftCardHistory = () => {
        if (purchasedGiftCards.length === 0) {
            return <div className="text-center text-gray-500 pt-16 text-sm">No gift card transactions found.</div>;
        }

        return purchasedGiftCards.map(card => (
            <button key={card.id} onClick={() => onSelectGiftCard(card.id)} className="w-full flex items-center p-4 bg-white text-left">
                <img src={card.brand.logo} alt={card.brand.name} className="w-10 h-10 rounded-full mr-4" />
                <div className="flex-grow">
                    <p className="font-bold text-sm">{card.brand.name} Gift Card</p>
                    <div className="flex items-center space-x-1">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <p className="text-xs text-gray-500">{new Date(card.purchaseDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                    </div>
                </div>
                <p className="font-bold text-sm">₹{card.amount.toFixed(2)}</p>
            </button>
        ));
    };

    const renderCashEmiHistory = () => {
        if (mockCashEmiTransactions.length === 0) {
            return <div className="text-center text-gray-500 pt-16 text-sm">No EMI payments found.</div>;
        }

        return mockCashEmiTransactions.map(emi => (
            <div key={emi.id} className="w-full flex items-center p-4 bg-white">
                <div className="flex-grow">
                    <p className="font-bold text-sm">EMI Payment</p>
                     <div className="flex items-center space-x-1">
                        {emi.isLate ? 
                            <InfoIcon className="w-4 h-4 text-red-500" /> : 
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        }
                        <p className="text-xs text-gray-500">Paid on {new Date(emi.paidOn).toLocaleString('en-IN', { day: 'numeric', month: 'short' })}</p>
                    </div>
                    {emi.isLate && <p className="text-xs text-red-500 font-semibold">Paid with late fee</p>}
                </div>
                <p className="font-bold text-right text-sm">₹{emi.amount.toLocaleString('en-IN')}</p>
            </div>
        ));
    };

    const renderCashAtHomeHistory = () => {
        if (cashAtHomeOrders.length === 0) {
            return <div className="text-center text-gray-500 pt-16 text-sm">No cash at home transactions found.</div>;
        }

        return cashAtHomeOrders.map(order => (
            <div key={order.id} className="w-full p-4 bg-white">
                <div className="flex items-center">
                    <div className="flex-grow">
                        <p className="font-bold text-sm">Cash Delivery</p>
                         <div className="flex items-center space-x-1">
                            <CheckCircleIcon className="w-4 h-4 text-green-500" />
                            <p className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                        </div>
                         <div className="flex items-start text-xs text-gray-500 mt-1">
                            <HomeIcon className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0" />
                            <span>{order.address}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="font-bold text-sm">₹{order.totalDebited.toFixed(2)}</p>
                        <p className="text-xs text-gray-400">Fee: ₹{order.fee.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        ));
    };

    const renderContent = () => {
        switch(category) {
            case 'Gift Cards':
                return renderGiftCardHistory();
            case 'Cash EMI Payments':
                return renderCashEmiHistory();
            case 'Cash At Home':
                return renderCashAtHomeHistory();
            default:
                return <div className="text-center text-gray-500 pt-16 text-sm">No transactions found for {category}.</div>;
        }
    };
    
    return (
        <>
            <header className="p-4 pt-6 bg-white flex-shrink-0 shadow-sm z-10 sticky top-0 flex items-center">
                <button onClick={onBack} className="mr-4"><ArrowLeftIcon className="w-6 h-6" /></button>
                <h1 className="text-lg font-bold text-gray-800">{category}</h1>
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