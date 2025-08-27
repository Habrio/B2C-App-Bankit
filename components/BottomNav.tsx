
import React from 'react';
import { Screen } from '../types';
import { HomeIcon, HistoryIcon, GridIcon, UpiNavIcon, WalletIcon } from '../constants/icons';

interface BottomNavProps {
  activeScreen: Screen;
  setActiveScreen: (screen: Screen) => void;
}

const NavItem: React.FC<{
  label: Screen;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon: Icon, isActive, onClick }) => {
  const activeColor = 'text-primary';
  const inactiveColor = 'text-gray-300';
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center flex-1 transition-transform duration-200 ease-in-out transform hover:scale-110 focus:outline-none"
      aria-label={label}
    >
      <Icon className={`w-6 h-6 ${isActive ? activeColor : inactiveColor}`} />
      <span className={`text-[10px] mt-1 font-semibold ${isActive ? activeColor : inactiveColor}`}>
        {label}
      </span>
    </button>
  );
};

const BottomNav: React.FC<BottomNavProps> = ({ activeScreen, setActiveScreen }) => {
  const navItemsLeft = [
    { label: Screen.Home, icon: HomeIcon },
    { label: Screen.Wallet, icon: WalletIcon },
  ];

  const navItemsRight = [
    { label: Screen.Transactions, icon: HistoryIcon },
    { label: Screen.More, icon: GridIcon },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 z-30">
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-900 shadow-[0_-2px_10px_rgba(0,0,0,0.2)] rounded-t-2xl flex justify-around items-center">
            <div className="flex justify-around w-2/5">
                {navItemsLeft.map((item) => (
                    <NavItem
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        isActive={activeScreen === item.label}
                        onClick={() => setActiveScreen(item.label)}
                    />
                ))}
            </div>
            
            <div className="w-1/5" />

            <div className="flex justify-around w-2/5">
                {navItemsRight.map((item) => (
                    <NavItem
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        isActive={activeScreen === item.label}
                        onClick={() => setActiveScreen(item.label)}
                    />
                ))}
            </div>
        </div>

        <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <button className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center shadow-lg" aria-label="Scan and Pay">
                 <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <UpiNavIcon />
                    </div>
                 </div>
            </button>
        </div>
    </div>
  );
};

export default BottomNav;
