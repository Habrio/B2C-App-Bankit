import React from 'react';
import { WalletIcon, ArrowLeftIcon, SettingsIcon, ChevronRightIcon, UpgradeWalletIcon, HistoryIcon, FaqIcon, CloseWalletIcon, CheckCircleIcon } from '../constants/icons';
import { Screen } from '../types';

interface WalletScreenProps {
    isWalletActive: boolean;
    onActivateWallet: () => void;
    isWalletUpgraded: boolean;
    onStartWalletUpgrade: () => void;
    onNavigate: (screen: Screen) => void;
    onBack: () => void;
}

const QuickActionItem: React.FC<{icon: React.ReactNode, title: string, subtitle: string, onClick: () => void}> = ({ icon, title, subtitle, onClick }) => (
    <button onClick={onClick} className="flex items-center w-full text-left py-3 border-b border-gray-200 last:border-b-0">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
            {icon}
        </div>
        <div className="flex-grow">
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-400" />
    </button>
);

interface ActivatedWalletViewProps {
    isWalletUpgraded: boolean;
    onStartWalletUpgrade: () => void;
    onNavigate: (screen: Screen) => void;
    onBack: () => void;
}

const ActivatedWalletView: React.FC<ActivatedWalletViewProps> = ({ isWalletUpgraded, onStartWalletUpgrade, onNavigate, onBack }) => {
    const quickActions = [
        ...(isWalletUpgraded ? [] : [{ 
            title: 'upgrade wallet', 
            subtitle: 'get a limit of up to ₹2L', 
            icon: <UpgradeWalletIcon className="w-5 h-5 text-gray-600" />,
            onClick: onStartWalletUpgrade
        }]),
        { 
            title: 'transaction history', 
            subtitle: 'view FindiBankit wallet transactions', 
            icon: <HistoryIcon className="w-5 h-5 text-gray-600" />,
            onClick: () => onNavigate(Screen.WalletHistory)
        },
        { 
            title: 'FAQs', 
            subtitle: 'frequent questions, answered', 
            icon: <FaqIcon className="w-5 h-5 text-gray-600" />,
            onClick: () => onNavigate(Screen.Faq)
        },
        { 
            title: 'close wallet', 
            subtitle: 'transfer balance and close wallet', 
            icon: <CloseWalletIcon className="w-5 h-5 text-gray-600" />,
            onClick: () => {}
        },
    ];
    return (
        <div className="h-full bg-white">
            <header className="p-4 flex items-center justify-between sticky top-0 bg-white z-10">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                 <h1 className="font-semibold text-gray-800">MY WALLET</h1>
                <button className="p-2 rounded-full hover:bg-gray-100">
                    <SettingsIcon className="w-6 h-6 text-gray-800" />
                </button>
            </header>

            <div className="p-4 pt-0 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center font-bold text-white text-2xl shadow-md">
                    A
                </div>
                <div className="flex items-center justify-center mt-2 space-x-2">
                    <h1 className="font-semibold text-gray-800">ASHISH'S WALLET</h1>
                    {isWalletUpgraded && <CheckCircleIcon className="w-5 h-5 text-green-500" />}
                </div>
                 {isWalletUpgraded && <p className="text-xs text-green-600 font-semibold">Full KYC Verified</p>}


                <div className="mt-6">
                    <p className="text-xs text-gray-400 font-semibold tracking-widest">TAP THE WALLET TO CHANGE ITS SKIN</p>
                    <div className="relative aspect-[3/2] w-full max-w-xs mx-auto mt-2">
                        <div className="absolute inset-0 bg-gray-900 rounded-2xl shadow-2xl p-2">
                             <div className="relative w-full h-full bg-gray-800 rounded-xl flex flex-col justify-center items-center text-white p-4 overflow-hidden">
                                <div className="absolute -top-8 w-48 h-16 bg-gradient-to-t from-primary/50 to-primary/60 rounded-b-full"></div>
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-4 bg-gray-900/50 rounded-t-md border-b-2 border-gray-700"></div>
                                
                                <span className="text-5xl font-light tracking-tighter z-10">₹100.00</span>
                                <span className="text-sm font-semibold text-gray-300 z-10">WALLET BALANCE</span>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {!isWalletUpgraded && (
                <div className="bg-white p-6 mt-6">
                    <h2 className="text-xl font-bold text-center text-gray-800">upgrade to a FindiBankit card</h2>
                    <p className="text-center text-gray-500 mt-2">complete your full KYC to unlock higher limits and get your physical card.</p>
                    <button onClick={onStartWalletUpgrade} className="w-full bg-gray-900 text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2">
                        <span>Upgrade in one click</span>
                        <ArrowLeftIcon className="w-5 h-5 transform rotate-180" />
                    </button>
                </div>
            )}
            
            <div className="bg-white p-4 pt-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Quick Actions</h3>
                <div className="divide-y divide-gray-200">
                   {quickActions.map(action => (
                       <QuickActionItem key={action.title} {...action} />
                   ))}
                </div>
            </div>

        </div>
    );
}

const InactiveWalletView: React.FC<{onActivate: () => void}> = ({ onActivate }) => (
    <>
        <header className="p-4 pt-6 bg-white flex-shrink-0 shadow-sm z-10">
            <h1 className="text-xl font-bold text-center text-gray-800">Wallet</h1>
        </header>
        <div className="p-6 flex flex-col items-center text-center flex-grow justify-center bg-gray-100">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                <WalletIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-6">Activate Your Wallet</h2>
            <p className="text-gray-500 mt-2 mb-8 max-w-xs">
                Complete a simple KYC process to unlock seamless payments and exclusive offers.
            </p>
            <button 
                onClick={onActivate}
                className="w-full bg-primary text-white font-bold py-4 px-4 rounded-lg hover:bg-primary/90 transition-all duration-300"
            >
                Activate Wallet
            </button>
        </div>
    </>
);


const WalletScreen: React.FC<WalletScreenProps> = ({ isWalletActive, onActivateWallet, isWalletUpgraded, onStartWalletUpgrade, onNavigate, onBack }) => {
  return (
    <div className="h-full flex flex-col bg-gray-100">
        {isWalletActive ? <ActivatedWalletView isWalletUpgraded={isWalletUpgraded} onStartWalletUpgrade={onStartWalletUpgrade} onNavigate={onNavigate} onBack={onBack}/> : <InactiveWalletView onActivate={onActivateWallet} />}
    </div>
  );
};

export default WalletScreen;