import React from 'react';
import { BellIcon, CashIcon, ChevronRightIcon, CibilScoreIcon, EducationIcon, BillsAndRechargesIcon, PayContactsIcon, RewardsIcon, StoreIcon, BankIcon, CheckCircleIcon } from '../constants/icons';
import { Screen } from '../types';
import Card from '../components/Card';

const PromoCard: React.FC<{
  title: string;
  subtitle: string;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ title, subtitle, onClick, children, className }) => (
    <button onClick={onClick} className={`relative rounded-xl overflow-hidden h-28 w-full shadow-lg text-white font-bold p-3 flex flex-col justify-between text-left bg-gray-800 ${className}`}>
        {children}
        <div className="relative z-10">
            <p className="text-xs font-light uppercase tracking-wider">{subtitle}</p>
            <span className="text-md font-semibold">{title}</span>
        </div>
    </button>
);

const HomeHeader: React.FC = () => (
    <header className="absolute top-0 left-0 right-0 z-20">
        <div className="p-4 pt-6 text-black">
            <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center font-bold text-white text-xl shadow-md border-2 border-white">
                    A
                </div>
                <div>
                    <p className="font-light text-gray-500 text-sm">hello,</p>
                    <p className="font-semibold text-lg -mt-1 text-gray-800">Ashish</p>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="relative w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md">
                    <BellIcon className="w-6 h-6 text-gray-700" />
                    <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 border-2 border-white"></span>
                </button>
            </div>
            </div>
        </div>
    </header>
);

const ExplorePill: React.FC<{ 
    name: string; 
    icon: React.FC<any>; 
    onClick: () => void; 
    bgColor?: string; 
    iconColor?: string;
    special?: 'cibil';
}> = ({ name, icon: Icon, onClick, bgColor = 'bg-gray-100', iconColor = 'text-gray-700', special }) => {
  
  const renderIcon = () => {
    if (special === 'cibil') {
      return (
        <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-200 to-indigo-300">
          <span className="text-secondary font-bold text-xs">781</span>
        </div>
      );
    }
    return (
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgColor}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    );
  };

  return (
    <button onClick={onClick} className="bg-white border border-gray-200 rounded-full shadow-sm flex items-center p-1 pr-4 m-1 hover:bg-gray-50 transition-colors">
      {renderIcon()}
      <span className="font-semibold text-sm text-gray-800 ml-2 capitalize">{name}</span>
    </button>
  );
};

interface HomeScreenProps {
    onNavigate: (screen: Screen) => void;
    onStartCashJourney: () => void;
    isCashActive: boolean;
    onStartConnectedBankingJourney: () => void;
    isBankingConnected: boolean;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigate, onStartCashJourney, isCashActive, onStartConnectedBankingJourney, isBankingConnected }) => {
  const exploreServices = [
      { name: 'bills & recharges', icon: BillsAndRechargesIcon, screen: Screen.BillPay, bgColor: 'bg-blue-100', iconColor: 'text-blue-600' },
      { name: 'pay contacts', icon: PayContactsIcon, screen: Screen.Home, bgColor: 'bg-purple-100', iconColor: 'text-purple-600' },
      { name: 'rewards', icon: RewardsIcon, screen: Screen.Home, bgColor: 'bg-indigo-100', iconColor: 'text-indigo-600' },
      { name: 'shop', icon: StoreIcon, screen: Screen.Home, bgColor: 'bg-orange-100', iconColor: 'text-orange-600' },
      { name: 'CIBIL score', icon: CibilScoreIcon, screen: Screen.Home, special: 'cibil' as const },
      { name: 'connected banking', icon: BankIcon, onClick: () => isBankingConnected ? onNavigate(Screen.ConnectedBanking) : onStartConnectedBankingJourney(), bgColor: 'bg-green-100', iconColor: 'text-green-600' },
      { name: 'cash', icon: CashIcon, onClick: () => isCashActive ? onNavigate(Screen.Cash) : onStartCashJourney(), bgColor: 'bg-red-100', iconColor: 'text-red-600' },
      { name: 'education fees', icon: EducationIcon, screen: Screen.Home, bgColor: 'bg-teal-100', iconColor: 'text-teal-600' },
  ];
  return (
    <div className="relative h-full bg-gray-50">
      <HomeHeader />
      <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 -z-10" />
      <div className="p-4 space-y-5 pt-28">
        
        {/* Shopping Cards */}
        <div className="flex space-x-2">
            <PromoCard title="Gift Cards" subtitle="NOW LIVE" onClick={() => onNavigate(Screen.GiftCardStore)} className="flex-1">
                <div className="absolute top-0 right-0 w-24 h-24">
                    <img src="https://assets-global.website-files.com/62325221c8195a72de754d92/62325221c8195a56d9754fde_Uber_Logo_2018.png" className="absolute top-2 -right-2 w-10 h-10 rounded-lg transform -rotate-12 shadow-lg" />
                    <img src="https://logo.clearbit.com/zomato.com" className="absolute top-8 right-8 w-12 h-12 rounded-lg transform rotate-12 shadow-lg" />
                    <img src="https://logo.clearbit.com/zeptonow.com" className="absolute top-16 -right-1 w-9 h-9 rounded-lg transform -rotate-6 shadow-lg" />
                </div>
            </PromoCard>
            <PromoCard title="Store" subtitle="DEAL OF THE DAY" onClick={() => {}} className="flex-1">
                <img src="https://images.unsplash.com/photo-1570857502809-08184874388e?q=80&w=2592&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            </PromoCard>
             <PromoCard title="Travel" subtitle="BOOK NOW" onClick={() => {}} className="flex-1">
                <img src="https://images.unsplash.com/photo-1502920514313-52581002a659?q=80&w=2940&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            </PromoCard>
        </div>

        {/* Financial Profile */}
        <div>
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Financial Profile</h3>
            <div className="space-y-3">
                <button onClick={isBankingConnected ? () => onNavigate(Screen.ConnectedBanking) : onStartConnectedBankingJourney} className="w-full bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                    <div className="p-1.5 bg-secondary/10 rounded-full"><BankIcon className="w-5 h-5 text-secondary"/></div>
                    <div>
                        <p className="text-sm font-semibold text-left">Connected Banking</p>
                        {isBankingConnected ? (
                            <div className="flex items-center space-x-1">
                                <CheckCircleIcon className="w-4 h-4 text-green-500"/>
                                <p className="text-xs font-medium text-left text-gray-500">2 Accounts Connected</p>
                            </div>
                        ) : (
                            <p className="text-xs font-medium text-left text-gray-500">Connect your bank accounts</p>
                        )}
                    </div>
                </button>
                 <button onClick={isCashActive ? () => onNavigate(Screen.Cash) : onStartCashJourney} className="w-full bg-white p-3 rounded-lg shadow-sm flex items-center space-x-2">
                    <div className="p-1.5 bg-red-500/10 rounded-full"><CashIcon className="w-5 h-5 text-red-500"/></div>
                    <div>
                        <p className="text-sm font-semibold text-left">FindiBankit Cash</p>
                        {isCashActive ? (
                            <div className="flex items-center space-x-1">
                                <CheckCircleIcon className="w-4 h-4 text-green-500"/>
                                <p className="text-xs font-medium text-left text-gray-500">Loan Active: ₹50,000</p>
                            </div>
                        ) : (
                            <p className="text-xs font-medium text-left text-gray-500">Get an instant loan up to ₹2L</p>
                        )}
                    </div>
                </button>
            </div>
        </div>

        {/* Upcoming Bills */}
        <Card title="UPCOMING BILLS (1)" actionText="view all">
            <div className="flex items-center space-x-4">
                <img src="https://logo.clearbit.com/rblbank.com" className="w-10 h-10 rounded-full" />
                <div className="flex-grow">
                    <p className="font-bold text-gray-800">RBL Bank</p>
                    <p className="text-sm text-gray-500">XXXX XXXX 2299</p>
                </div>
                <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg">
                    Pay ₹17,001
                </button>
            </div>
            <p className="text-xs text-red-500 font-semibold text-right mt-1">DUE ON 11 SEP</p>
        </Card>
        
        {/* Explore FindiBankit */}
        <Card title="EXPLORE FINDIBANKIT" actionText="view all">
            <div className="flex flex-wrap -m-1">
                {exploreServices.map(service => (
                    <ExplorePill 
                        key={service.name} 
                        name={service.name} 
                        icon={service.icon} 
                        onClick={() => {
                            if (service.onClick) {
                                service.onClick();
                            } else if (service.screen) {
                                onNavigate(service.screen);
                            }
                        }}
                        bgColor={service.bgColor}
                        iconColor={service.iconColor}
                        special={service.special}
                    />
                ))}
            </div>
        </Card>

      </div>
    </div>
  );
};

export default HomeScreen;