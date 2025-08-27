import React from 'react';
import { ArrowLeftIcon, GiftCardCollectionIcon, SearchIcon } from '../constants/icons';
import { GiftCardBrand } from '../types';
import { giftCardBrands } from '../constants/giftcards';

interface GiftCardStoreScreenProps {
    onBack: () => void;
    onSearch: () => void;
    onMyGiftCards: () => void;
    onSelectBrand: (brand: GiftCardBrand) => void;
}

const DealCard: React.FC<{ brand: GiftCardBrand; onClick: () => void; }> = ({ brand, onClick }) => (
    <button onClick={onClick} className="flex-shrink-0 w-64 h-32 rounded-xl overflow-hidden relative shadow-lg text-white">
        <img src={brand.dealImage || brand.cardImage} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-3 flex flex-col justify-end">
            <div className="flex items-center space-x-2">
                <img src={brand.logo} className="w-8 h-8 rounded-lg bg-white p-1" />
                <div>
                    <p className="font-bold text-sm">{brand.name}</p>
                    <p className="text-xs bg-black/50 px-1.5 py-0.5 rounded-full">{brand.discount}% OFF</p>
                </div>
            </div>
        </div>
    </button>
);

const BrandItem: React.FC<{ brand: GiftCardBrand; onClick: () => void; }> = ({ brand, onClick }) => (
     <div className="bg-gray-800 rounded-lg p-3 flex items-center">
        <img src={brand.logo} alt={brand.name} className="w-12 h-12 rounded-md mr-4" />
        <div className="flex-grow">
            <p className="font-bold text-sm">{brand.name}</p>
            <p className="text-sm font-semibold">₹{brand.denominations[0]} - ₹{brand.denominations[brand.denominations.length-1]}</p>
            <p className="text-sm text-green-400 font-bold">{brand.discount}% off</p>
        </div>
        <button onClick={onClick} className="bg-white text-black font-bold py-2 px-4 rounded-lg text-sm">Buy Now</button>
    </div>
);


const GiftCardStoreScreen: React.FC<GiftCardStoreScreenProps> = ({ onBack, onSearch, onMyGiftCards, onSelectBrand }) => {
    const handpickedDeals = giftCardBrands.filter(b => b.dealImage);
    const featuredBrands = giftCardBrands.slice(0, 5);
    
    return (
        <div className="h-full bg-gray-900 text-white flex flex-col">
             <header className="p-4 pt-6 flex-shrink-0 z-10 sticky top-0 bg-gray-900 flex items-center justify-between">
                <button onClick={onBack}><ArrowLeftIcon className="w-6 h-6" /></button>
                <h1 className="text-lg font-bold">Gift Card Store</h1>
                <button onClick={onMyGiftCards} className="flex items-center space-x-2 bg-blue-500/20 text-blue-300 font-semibold px-3 py-1.5 rounded-lg text-sm">
                    <GiftCardCollectionIcon className="w-5 h-5" />
                    <span>my gift cards</span>
                </button>
            </header>

            <div className="flex-grow overflow-y-auto no-scrollbar">
                <div className="px-4 pb-4">
                    <h1 className="text-xl font-bold">use coins to save</h1>
                    <p className="text-gray-400 text-sm">on 200+ brands</p>
                </div>
                 <div className="px-4 sticky top-[72px] bg-gray-900 py-2 z-10">
                    <button onClick={onSearch} className="w-full flex items-center space-x-3 text-left bg-gray-800 rounded-lg p-3">
                        <SearchIcon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-400 text-sm">search for brands</span>
                    </button>
                 </div>
                
                {/* Handpicked Deals */}
                <div className="py-4">
                    <h2 className="font-bold text-base px-4 mb-3">handpicked deals</h2>
                    <div className="flex space-x-4 px-4 overflow-x-auto no-scrollbar">
                        {handpickedDeals.map(brand => (
                            <DealCard key={brand.id} brand={brand} onClick={() => onSelectBrand(brand)} />
                        ))}
                    </div>
                </div>

                {/* Featured Brands */}
                <div className="py-4">
                    <div className="flex justify-between items-center px-4 mb-3">
                        <h2 className="font-bold text-base">featured brands</h2>
                        <button onClick={onSearch} className="text-sm font-semibold text-primary">view all</button>
                    </div>
                    <div className="px-4 space-y-3">
                        {featuredBrands.map(brand => (
                            <BrandItem key={brand.id} brand={brand} onClick={() => onSelectBrand(brand)} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default GiftCardStoreScreen;