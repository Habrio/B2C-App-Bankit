import React, { useState, useEffect } from 'react';
import { PurchasedGiftCard } from '../types';
import { ArrowLeftIcon, XIcon, CopyIcon, InfoIcon } from '../constants/icons';

const GiftCardDetailView: React.FC<{ card: PurchasedGiftCard; onBack: () => void; }> = ({ card, onBack }) => {
    const [copied, setCopied] = useState('');

    const handleCopy = (text: string, type: 'code' | 'pin') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(''), 2000);
    };

    return (
        <div className="absolute inset-0 bg-gray-900 text-white z-20 p-4 flex flex-col no-scrollbar">
            <header className="flex justify-between items-center mb-4 flex-shrink-0">
                <button onClick={onBack}><XIcon className="w-6 h-6" /></button>
                <button className="text-xs flex items-center space-x-1 border border-gray-600 rounded-full px-2 py-1"><InfoIcon className="w-4 h-4"/> <span>terms & conditions</span></button>
            </header>
            
            <div className="flex-grow overflow-y-auto no-scrollbar">
                <h2 className="text-xl font-bold mb-2">{card.brand.name} gift card</h2>
                <div className="w-full aspect-video rounded-xl overflow-hidden bg-cover bg-center mb-4" style={{backgroundImage: `url(${card.brand.cardImage})`}}></div>
                
                <div className="grid grid-cols-2 gap-4 my-6">
                    <div>
                        <p className="text-xs text-gray-400">code</p>
                        <div className="flex items-center space-x-2">
                           <p className="font-mono font-semibold">{card.code}</p>
                           <button onClick={() => handleCopy(card.code, 'code')}>
                               {copied === 'code' ? <span className="text-green-400 text-xs">Copied!</span> : <CopyIcon className="w-4 h-4 text-gray-400" />}
                           </button>
                        </div>
                    </div>
                     <div>
                        <p className="text-xs text-gray-400">pin</p>
                         <div className="flex items-center space-x-2">
                           <p className="font-mono font-semibold">{card.pin}</p>
                            <button onClick={() => handleCopy(card.pin, 'pin')}>
                               {copied === 'pin' ? <span className="text-green-400 text-xs">Copied!</span> : <CopyIcon className="w-4 h-4 text-gray-400" />}
                           </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="font-bold mb-2">how to redeem</h3>
                    <div className="space-y-4">
                        {card.brand.redemptionSteps.map((step, index) => (
                             <div key={index} className="flex items-start space-x-3">
                                <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center font-bold text-xs flex-shrink-0">{index + 1}</div>
                                <p className="text-sm text-gray-300">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


interface MyGiftCardsScreenProps {
    purchasedGiftCards: PurchasedGiftCard[];
    onBack: () => void;
    initialSelectedCardId: string | null;
    clearInitialCard: () => void;
}

const MyGiftCardsScreen: React.FC<MyGiftCardsScreenProps> = ({ purchasedGiftCards, onBack, initialSelectedCardId, clearInitialCard }) => {
    const [selectedCard, setSelectedCard] = useState<PurchasedGiftCard | null>(null);
    
    useEffect(() => {
        if (initialSelectedCardId) {
            const cardToShow = purchasedGiftCards.find(c => c.id === initialSelectedCardId);
            if (cardToShow) {
                setSelectedCard(cardToShow);
            }
        }
    }, [initialSelectedCardId, purchasedGiftCards]);

    const handleBackFromDetail = () => {
        setSelectedCard(null);
        if(initialSelectedCardId) {
           clearInitialCard();
        }
    };

  return (
    <div className="bg-gray-900 h-full text-white relative no-scrollbar">
      <header className="p-4 pt-6 flex-shrink-0 z-10 sticky top-0 bg-gray-900 shadow-md flex items-center space-x-4">
        <button onClick={onBack}><ArrowLeftIcon className="w-6 h-6" /></button>
        <h1 className="text-xl font-bold text-center flex-grow">Your Gift Cards</h1>
        <div className="w-6"></div>
      </header>
      <div className="p-4 space-y-4 overflow-y-auto no-scrollbar">
        {purchasedGiftCards.length === 0 ? (
            <div className="text-center pt-20">
                <p className="text-gray-400">You haven't purchased any gift cards yet.</p>
            </div>
        ) : (
            purchasedGiftCards.map(card => (
                <button key={card.id} onClick={() => setSelectedCard(card)} className="w-full text-left">
                     <h3 className="font-semibold mb-2">{card.brand.name} gift card</h3>
                     <div className="w-full aspect-video rounded-xl overflow-hidden bg-cover bg-center" style={{backgroundImage: `url(${card.brand.cardImage})`}}></div>
                </button>
            ))
        )}
      </div>
      {selectedCard && <GiftCardDetailView card={selectedCard} onBack={handleBackFromDetail} />}
    </div>
  );
};

export default MyGiftCardsScreen;