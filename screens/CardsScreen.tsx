
import React from 'react';
import { CreditCard, Screen } from '../types';
import { creditCards } from '../constants/cards';
import { CheckCircleIcon, ChevronDownIcon, ChevronRightIcon, InfoIcon, RefreshIcon, CreditCardIcon as ActionIcon } from '../constants/icons';

interface CardsScreenProps {
    onNavigate: (screen: Screen) => void;
}

const CreditCardDisplay: React.FC<{ card: CreditCard }> = ({ card }) => {
    const getStatus = () => {
        switch(card.status) {
            case 'paid':
                return (
                    <div className="flex items-center space-x-1">
                        <CheckCircleIcon className="w-4 h-4 text-green-400" />
                        <span className="font-semibold">FULLY PAID</span>
                    </div>
                );
            case 'no_dues':
                 return <span className="font-semibold">NO DUES</span>;
            case 'due':
                return <span className="font-semibold">DUE</span>;
        }
    };
    
    return (
        <div className="w-full aspect-[1.586] rounded-xl shadow-lg p-5 flex flex-col justify-between text-white relative overflow-hidden" style={{ background: card.cardArt.background }}>
            <div className={`flex justify-between items-start ${card.cardArt.textColor}`}>
                <div>
                    <h3 className="font-semibold">{card.bankName}</h3>
                    <p className="text-xs opacity-80">{card.cardNetwork}</p>
                </div>
                <img src={card.cardArt.logoUrl} className={`h-8 ${card.cardArt.logoClass || ''}`} alt={`${card.bankName} logo`} />
            </div>
            
            <div className={`text-right ${card.cardArt.textColor}`}>
                <div className="flex items-center justify-end space-x-2">
                    {card.status !== 'no_dues' && <p className="text-lg font-bold">₹{Math.abs(card.dueAmount).toLocaleString('en-IN')}</p>}
                    <div className="text-xs opacity-80">
                         {getStatus()}
                    </div>
                </div>
            </div>
            
            <div className={`flex justify-between items-end ${card.cardArt.textColor}`}>
                <p className="font-mono tracking-widest text-lg">···· {card.lastFourDigits}</p>
                <p className="text-xs font-semibold uppercase">{card.cardHolderName}</p>
            </div>

            <button className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm text-white font-bold py-2 px-5 rounded-lg text-sm hover:bg-white/30">
                Pay more
            </button>
        </div>
    );
};


const CardsScreen: React.FC<CardsScreenProps> = ({ onNavigate }) => {
    const totalDue = creditCards.reduce((sum, card) => card.status === 'due' ? sum + card.dueAmount : sum, 17001);

    const quickActions = [
        { name: 'add a new card', sub: 'give your new card the FindiBankit experience', onClick: () => {} },
        { name: 'view bill payments history', sub: 'check your recent bill payments', onClick: () => {} },
        { name: 'card offers', sub: 'view exciting offers on your card', onClick: () => {} },
        { name: 'check my credit score', sub: 'what impacts your credit score', onClick: () => onNavigate(Screen.CreditScore) },
        { name: 'contact support', sub: 'reach out for any queries', onClick: () => {} },
        { name: 'remove a card', sub: 'remove my credit card from FindiBankit', onClick: () => {} },
    ];

    return (
        <div className="bg-gray-100">
            <div className="p-4 pt-6 text-center">
                <p className="text-sm text-gray-500 uppercase">Statement due for 1 card</p>
                <div className="flex items-center justify-center space-x-2">
                    <h1 className="text-3xl font-bold text-gray-800">₹{totalDue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h1>
                    <ChevronDownIcon className="w-6 h-6 text-gray-500" />
                </div>
                <button className="mt-4 inline-flex items-center space-x-2 bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-md">
                    <RefreshIcon className="w-5 h-5"/>
                    <span>switch to recent spends</span>
                </button>
            </div>

            <div className="p-4 space-y-4">
                {creditCards.map(card => (
                    <div key={card.id} className="space-y-3">
                        <CreditCardDisplay card={card} />
                         <button className="w-full flex items-center justify-center space-x-2 text-sm font-semibold text-blue-600 bg-blue-100 p-2 rounded-lg">
                            <InfoIcon className="w-5 h-5"/>
                            <span>july statement generated</span>
                            <ChevronRightIcon className="w-4 h-4"/>
                        </button>
                    </div>
                ))}

                <div className="pt-6">
                    <h2 className="text-center text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Quick Actions</h2>
                    <div className="bg-white rounded-xl shadow-sm divide-y divide-gray-100">
                        {quickActions.map(action => (
                            <button key={action.name} onClick={action.onClick} className="w-full flex items-center p-4 text-left">
                                <div className="p-2 bg-gray-100 rounded-full mr-4">
                                    <ActionIcon className="w-6 h-6 text-gray-600" />
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm capitalize">{action.name}</p>
                                    <p className="text-xs text-gray-500">{action.sub}</p>
                                </div>
                                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardsScreen;
