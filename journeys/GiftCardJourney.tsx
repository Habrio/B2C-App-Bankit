import React, { useState, useMemo, useEffect } from 'react';
import { GiftCardBrand, PurchasedGiftCard } from '../types';
import { giftCardBrands } from '../constants/giftcards';
import { ArrowLeftIcon, SearchIcon, XIcon, ChevronRightIcon, InfoIcon, CreditCardIcon, WalletIcon } from '../constants/icons';

type JourneyStep = 'LIST' | 'PURCHASE' | 'PAYMENT' | 'SUCCESS';

interface GiftCardJourneyProps {
  onClose: () => void;
  onPurchaseSuccess: (card: PurchasedGiftCard, finalPrice: number, paymentMethod: 'card' | 'wallet') => void;
  initialBrand?: GiftCardBrand;
  isWalletActive: boolean;
  walletBalance: number;
}

const GiftCardJourney: React.FC<GiftCardJourneyProps> = ({ onClose, onPurchaseSuccess, initialBrand, isWalletActive, walletBalance }) => {
  const [step, setStep] = useState<JourneyStep>('LIST');
  const [selectedBrand, setSelectedBrand] = useState<GiftCardBrand | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const [customAmount, setCustomAmount] = useState<string>('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Top Brands');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'wallet'>(isWalletActive ? 'wallet' : 'card');

  useEffect(() => {
    if (initialBrand) {
      handleBrandSelect(initialBrand);
    }
  }, [initialBrand]);

  const categories = ['Top Brands', 'Shopping', 'Food', 'Travel', 'Entertainment'];
  
  const filteredBrands = useMemo(() => {
    return giftCardBrands.filter(brand => {
        const matchesCategory = activeCategory === 'Top Brands' ? true : brand.category === activeCategory;
        const matchesSearch = brand.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleBrandSelect = (brand: GiftCardBrand) => {
    setSelectedBrand(brand);
    setSelectedAmount(brand.denominations[1] || brand.denominations[0] || 0);
    setCustomAmount('');
    setStep('PURCHASE');
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleProceedToPayment = () => {
      if ((selectedAmount > 0 || Number(customAmount) > 0)) {
          setStep('PAYMENT');
      }
  };

  const finalPrice = useMemo(() => {
      const amount = Number(customAmount) || selectedAmount;
      if (!selectedBrand || !amount) return 0;
      return amount - (amount * (selectedBrand.discount / 100));
  }, [selectedAmount, customAmount, selectedBrand]);

  const handlePayment = () => {
    // Mock payment success
    if (!selectedBrand) return;
    if (selectedPaymentMethod === 'wallet' && walletBalance < finalPrice) return;


    const finalAmount = Number(customAmount) || selectedAmount;
    const newCard: PurchasedGiftCard = {
        id: `GC-${Date.now()}`,
        brand: selectedBrand,
        amount: finalAmount,
        purchaseDate: new Date().toISOString(),
        code: Math.random().toString(36).substring(2, 10).toUpperCase(),
        pin: Math.random().toString().substring(2, 8),
    };

    onPurchaseSuccess(newCard, finalPrice, selectedPaymentMethod);
  };

  const savings = useMemo(() => {
    const amount = Number(customAmount) || selectedAmount;
    if (!selectedBrand || !amount) return 0;
    return amount * (selectedBrand.discount / 100);
  }, [selectedAmount, customAmount, selectedBrand]);

  const renderContent = () => {
    if (step === 'PAYMENT') {
        return (
            <div className="bg-gray-800 rounded-t-2xl p-4 text-white flex flex-col h-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-base">FindiBankit Pay</h3>
                    <button onClick={() => setStep('PURCHASE')} className="p-1 rounded-full hover:bg-gray-700"><XIcon className="w-5 h-5" /></button>
                </div>
                <div className="bg-gray-700 rounded-lg p-3 space-y-2">
                    <div className="flex items-center">
                        <img src={selectedBrand?.logo} alt={selectedBrand?.name} className="w-8 h-8 rounded-md mr-3" />
                        <div>
                            <p className="font-semibold text-sm">{selectedBrand?.name}</p>
                            <p className="text-sm font-bold">₹{Number(customAmount) || selectedAmount}</p>
                        </div>
                    </div>
                     <p className="text-sm text-green-400">saved ₹{savings.toFixed(2)} using FindiBankit member privileges</p>
                </div>

                <div className="my-6 flex-grow">
                    <p className="font-semibold text-sm mb-2">PAYMENT METHODS</p>
                    <div className="space-y-2">
                        {isWalletActive && (
                            <button 
                                onClick={() => setSelectedPaymentMethod('wallet')}
                                disabled={walletBalance < finalPrice}
                                className={`w-full bg-gray-900 rounded-lg p-4 flex justify-between items-center text-left disabled:opacity-50 transition-all`}
                            >
                                <div className="flex items-center">
                                    <WalletIcon className="w-8 h-8 mr-4 p-1.5 bg-gray-700 rounded-md" />
                                    <div>
                                        <p className="text-sm">FindiBankit Wallet</p>
                                        <p className="text-xs text-gray-400">Balance: ₹{walletBalance.toFixed(2)}</p>
                                        {walletBalance < finalPrice && <p className="text-xs text-red-400">Insufficient balance</p>}
                                    </div>
                                </div>
                                <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${selectedPaymentMethod === 'wallet' ? 'border-primary bg-primary' : 'border-gray-500'} ring-2 ring-transparent ${selectedPaymentMethod === 'wallet' ? 'ring-primary/50' : ''}`}></div>
                            </button>
                        )}
                        <button 
                            onClick={() => setSelectedPaymentMethod('card')}
                            className={`w-full bg-gray-900 rounded-lg p-4 flex justify-between items-center text-left transition-all`}
                        >
                            <div className="flex items-center">
                                <CreditCardIcon className="w-8 h-8 mr-4 p-1.5 bg-gray-700 rounded-md" />
                                <div>
                                    <p className="text-sm">HDFC Bank Credit Card</p>
                                    <p className="text-xs text-gray-400">xxxx xx12</p>
                                </div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 ${selectedPaymentMethod === 'card' ? 'border-primary bg-primary' : 'border-gray-500'} ring-2 ring-transparent ${selectedPaymentMethod === 'card' ? 'ring-primary/50' : ''}`}></div>
                        </button>
                    </div>
                </div>

                <div className="flex-shrink-0 bg-gray-900 border-t border-gray-700 flex justify-between items-center -mx-4 -mb-4 p-4">
                    <div>
                        <p className="text-xs text-gray-400 line-through">₹{Number(customAmount) || selectedAmount}</p>
                        <p className="text-base font-bold">₹{finalPrice.toFixed(2)}</p>
                    </div>
                    <button 
                        onClick={handlePayment} 
                        disabled={selectedPaymentMethod === 'wallet' && walletBalance < finalPrice}
                        className="bg-white text-black font-bold py-3 px-6 rounded-lg flex items-center space-x-2 disabled:bg-gray-400 disabled:text-gray-700"
                    >
                        <span>Pay now</span>
                        <ArrowLeftIcon className="w-5 h-5 transform rotate-180" />
                    </button>
                </div>
            </div>
        )
    }


    if (step === 'PURCHASE' && selectedBrand) {
        return (
            <div className="bg-gray-900 rounded-t-2xl p-4 text-white relative">
                 <div className="flex justify-between items-center mb-4">
                    <button onClick={initialBrand ? onClose : () => setStep('LIST')}><ArrowLeftIcon className="w-6 h-6" /></button>
                    <h3 className="text-base font-bold">{selectedBrand.name} gift card</h3>
                    <button className="text-xs flex items-center space-x-1 border border-gray-600 rounded-full px-2 py-1"><InfoIcon className="w-4 h-4"/> <span>how to redeem</span></button>
                </div>
                
                <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 bg-gray-800">
                    <img src={selectedBrand.cardImage} alt={`${selectedBrand.name} Gift Card`} className="w-full h-full object-cover" />
                </div>

                <p className="font-semibold text-sm mb-2">select amount</p>
                <div className="flex space-x-2 mb-4">
                    {selectedBrand.denominations.map(amount => (
                        <button key={amount} onClick={() => handleAmountSelect(amount)} className={`px-4 py-2 rounded-lg font-bold text-sm ${selectedAmount === amount && !customAmount ? 'bg-white text-black' : 'bg-gray-700'}`}>
                            ₹{amount}
                        </button>
                    ))}
                </div>
                <input
                    type="number"
                    value={customAmount}
                    onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(0);
                    }}
                    placeholder="Enter custom amount"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />

                <div className="bg-green-900/50 text-green-300 font-semibold p-2 rounded-lg text-center mb-24 text-sm">
                   + saving ₹{savings.toFixed(2)}
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gray-800 border-t border-gray-700 flex justify-between items-center">
                    <div>
                        <p className="text-xs text-gray-400 line-through">₹{Number(customAmount) || selectedAmount}</p>
                        <p className="text-base font-bold">₹{finalPrice.toFixed(2)}</p>
                    </div>
                    <button onClick={handleProceedToPayment} className="bg-white text-black font-bold py-3 px-6 rounded-lg text-sm">Buy Now</button>
                </div>
            </div>
        )
    }

    return (
      <div className="bg-gray-900 text-white flex flex-col h-full">
        {/* Header */}
        <header className="p-4 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <button onClick={onClose}><ArrowLeftIcon className="w-6 h-6" /></button>
            <h1 className="text-lg font-bold">Gift Cards</h1>
            <div className="w-6"></div>
          </div>
          <div className="relative">
            <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="search brands"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </header>
        
        {/* Categories */}
        <div className="px-4 py-2 flex-shrink-0">
            <div className="flex space-x-2 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-4 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap ${activeCategory === cat ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* Brand List */}
        <div className="flex-grow overflow-y-auto p-4 space-y-3 no-scrollbar">
            <h2 className="text-base font-semibold mb-2">Search Results</h2>
            {filteredBrands.map(brand => (
                <div key={brand.id} className="bg-gray-800 rounded-lg p-3 flex items-center">
                    <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-md mr-4" />
                    <div className="flex-grow">
                        <p className="font-bold text-sm">{brand.name}</p>
                        <p className="text-sm text-green-400">{brand.discount}% off</p>
                    </div>
                    <button onClick={() => handleBrandSelect(brand)} className="bg-white text-black font-bold py-2 px-4 rounded-lg text-sm">Buy Now</button>
                </div>
            ))}
        </div>
      </div>
    );
  };


  return (
    <div className="absolute inset-0 bg-black bg-opacity-70 z-50 flex flex-col justify-end">
        <div className={`w-full ${step === 'LIST' ? 'h-full' : ''} ${step === 'PURCHASE' ? 'h-[95%]' : ''} ${step === 'PAYMENT' ? 'h-[80%]' : ''} bg-gray-900 transition-all duration-300 rounded-t-2xl`}>
            {renderContent()}
        </div>
    </div>
  );
};

export default GiftCardJourney;