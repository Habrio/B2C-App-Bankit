
import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/MoreScreen';
import WalletScreen from './screens/WalletScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import BottomNav from './components/BottomNav';
import { Screen, PurchasedGiftCard, GiftCardBrand, WalletTransaction, CashAtHomeOrder } from './types';
import LoginJourney from './journeys/LoginJourney';
import WalletActivationJourney from './journeys/WalletActivationJourney';
import GiftCardJourney from './journeys/GiftCardJourney';
import MyGiftCardsScreen from './screens/MyGiftCardsScreen';
import PaymentHistoryScreen from './screens/PaymentHistoryScreen';
import WalletUpgradeJourney from './journeys/WalletUpgradeJourney';
import FaqScreen from './screens/FaqScreen';
import WalletHistoryScreen from './screens/WalletHistoryScreen';
import GiftCardStoreScreen from './screens/GiftCardStoreScreen';
import BillPayScreen from './screens/BillPayScreen';
import ConnectedBankingJourney from './journeys/AccountAggregatorJourney';
import ConnectedBankingScreen from './screens/ConnectedBankingScreen';
import CashJourney from './journeys/CashJourney';
import CashScreen from './screens/CashScreen';
import CashflowScreen from './screens/CashflowScreen';
import HighlightsScreen from './screens/HighlightsScreen';
import ManageAccountsScreen from './screens/ManageAccountsScreen';
import StatementScreen from './screens/StatementScreen';
import AddMoneyJourney from './journeys/AddMoneyJourney';
import { walletTransactions as initialWalletTransactions } from './constants/transactions';
import { UpiIcon, GiftIcon, CashAtHomeIcon } from './constants/icons';
import CreditScoreScreen from './screens/CreditScoreScreen';
import { CashAtHomeJourney } from './journeys/CashAtHomeJourney';
import CashAtHomeScreen from './screens/CashAtHomeScreen';


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.Home);
  const [previousScreen, setPreviousScreen] = useState<Screen>(Screen.Home);

  const [isWalletActive, setIsWalletActive] = useState<boolean>(false);
  const [walletBalance, setWalletBalance] = useState<number>(100.00);
  const [showWalletKyc, setShowWalletKyc] = useState<boolean>(false);
  const [isWalletUpgraded, setIsWalletUpgraded] = useState<boolean>(false);
  const [showWalletUpgrade, setShowWalletUpgrade] = useState<boolean>(false);
  
  const [giftCardJourneyState, setGiftCardJourneyState] = useState<{show: boolean, initialBrand?: GiftCardBrand}>({show: false});
  const [purchasedGiftCards, setPurchasedGiftCards] = useState<PurchasedGiftCard[]>([]);
  const [selectedGiftCardIdToShow, setSelectedGiftCardIdToShow] = useState<string | null>(null);

  const [transactionCategory, setTransactionCategory] = useState<string | null>(null);
  const [walletTransactions, setWalletTransactions] = useState<WalletTransaction[]>(initialWalletTransactions);
  const [showAddMoney, setShowAddMoney] = useState<boolean>(false);

  const [showConnectedBankingJourney, setShowConnectedBankingJourney] = useState<boolean>(false);
  const [isBankingConnected, setIsBankingConnected] = useState<boolean>(false);

  const [showCashJourney, setShowCashJourney] = useState<boolean>(false);
  const [isCashActive, setIsCashActive] = useState<boolean>(false);
  
  const [showCashAtHomeJourney, setShowCashAtHomeJourney] = useState<boolean>(false);
  const [cashAtHomeOrders, setCashAtHomeOrders] = useState<CashAtHomeOrder[]>([]);


  const navigate = (screen: Screen) => {
    setPreviousScreen(activeScreen);
    setActiveScreen(screen);
  };

  const goBack = () => {
    // When going back from a gift card detail view opened via transactions, return to history.
    if (activeScreen === Screen.MyGiftCards && selectedGiftCardIdToShow) {
      setSelectedGiftCardIdToShow(null);
      setActiveScreen(Screen.Transactions);
      return;
    }
    // General back navigation
    setActiveScreen(previousScreen);
  };

  const handleActivateWalletSuccess = () => {
    setIsWalletActive(true);
    setShowWalletKyc(false);
    navigate(Screen.Wallet);
    setShowAddMoney(true);
  };

  const handleWalletUpgradeSuccess = () => {
    setIsWalletUpgraded(true);
    setShowWalletUpgrade(false);
  };

  const handlePurchaseSuccess = (card: PurchasedGiftCard, finalPrice: number, paymentMethod: 'card' | 'wallet') => {
    setPurchasedGiftCards(prev => [card, ...prev]);

    if (paymentMethod === 'wallet') {
        setWalletBalance(prev => prev - finalPrice);
        const newTransaction: WalletTransaction = {
            id: `tx-gc-${Date.now()}`,
            type: 'paid',
            description: `For ${card.brand.name} Gift Card`,
            amount: finalPrice,
            timestamp: new Date().toISOString(),
            icon: GiftIcon,
        };
        setWalletTransactions(prev => [newTransaction, ...prev]);
    }

    setGiftCardJourneyState({ show: false });
    setSelectedGiftCardIdToShow(card.id);
    navigate(Screen.MyGiftCards);
  };
  
  const handleSelectTransactionCategory = (category: string) => {
    if (category === 'Wallet Transactions') {
      navigate(Screen.WalletHistory);
    } else {
      setTransactionCategory(category);
    }
  };

  const handleSelectGiftCardFromHistory = (cardId: string) => {
    setSelectedGiftCardIdToShow(cardId);
    navigate(Screen.MyGiftCards);
  };

  const handleConnectedBankingSuccess = () => {
      setIsBankingConnected(true);
      setShowConnectedBankingJourney(false);
      navigate(Screen.ConnectedBanking);
  };

  const handleCashSuccess = () => {
      setIsCashActive(true);
      setShowCashJourney(false);
      navigate(Screen.Cash);
  }

  const handleAddMoneySuccess = (amount: number) => {
    const newTransaction: WalletTransaction = {
        id: `tx-${Date.now()}`,
        type: 'added',
        description: 'Balance added via UPI',
        amount: amount,
        timestamp: new Date().toISOString(),
        icon: UpiIcon,
    };
    setWalletTransactions(prev => [newTransaction, ...prev]);
    setWalletBalance(prev => prev + amount);
    setShowAddMoney(false);
  };

  const handleCashAtHomeSuccess = (amount: number, address: string, fee: number) => {
    const totalDebited = amount + fee;

    const newOrder: CashAtHomeOrder = {
        id: `cah-${Date.now()}`,
        amount,
        fee,
        totalDebited,
        address,
        status: 'pending',
        orderDate: new Date().toISOString(),
        deliveryAgent: { name: 'Rohan Sharma', photoUrl: 'https://i.pravatar.cc/150?u=rohan' }
    };
    
    // Simulate order status changes
    setTimeout(() => {
        setCashAtHomeOrders(prev => prev.map(o => o.id === newOrder.id ? {...o, status: 'out_for_delivery'} : o));
    }, 5000);
     setTimeout(() => {
        setCashAtHomeOrders(prev => prev.map(o => o.id === newOrder.id ? {...o, status: 'delivered', deliveryDate: new Date().toISOString()} : o));
    }, 15000);
    
    setCashAtHomeOrders(prev => [newOrder, ...prev]);
    setWalletBalance(prev => prev - totalDebited);
    
    const newTransaction: WalletTransaction = {
        id: `tx-cah-${Date.now()}`,
        type: 'paid',
        description: `Cash at Home order`,
        amount: totalDebited,
        timestamp: new Date().toISOString(),
        icon: CashAtHomeIcon,
    };
    setWalletTransactions(prev => [newTransaction, ...prev]);

    setShowCashAtHomeJourney(false);
    navigate(Screen.CashAtHome);
  };


  const renderScreen = () => {
    switch (activeScreen) {
      case Screen.Home:
        return <HomeScreen 
                  onNavigate={navigate} 
                  onStartConnectedBankingJourney={() => setShowConnectedBankingJourney(true)} 
                  isBankingConnected={isBankingConnected}
                  onStartCashJourney={() => setShowCashJourney(true)}
                  isCashActive={isCashActive} 
                />;
      case Screen.Wallet:
        return <WalletScreen 
                  isWalletActive={isWalletActive} 
                  onActivateWallet={() => setShowWalletKyc(true)} 
                  isWalletUpgraded={isWalletUpgraded}
                  onStartWalletUpgrade={() => setShowWalletUpgrade(true)}
                  onNavigate={navigate}
                  onBack={goBack}
                  onAddMoney={() => setShowAddMoney(true)}
                  walletBalance={walletBalance}
                />;
      case Screen.Transactions:
        if (transactionCategory) {
            return <PaymentHistoryScreen 
                      category={transactionCategory} 
                      onBack={() => setTransactionCategory(null)} 
                      purchasedGiftCards={purchasedGiftCards}
                      onSelectGiftCard={handleSelectGiftCardFromHistory}
                      cashAtHomeOrders={cashAtHomeOrders}
                    />;
        }
        return <TransactionsScreen onSelectCategory={handleSelectTransactionCategory} />;
      case Screen.More:
        return <MoreScreen onNavigate={navigate} />;
      case Screen.MyGiftCards:
        return <MyGiftCardsScreen 
                  purchasedGiftCards={purchasedGiftCards} 
                  onBack={goBack}
                  initialSelectedCardId={selectedGiftCardIdToShow}
                  clearInitialCard={() => setSelectedGiftCardIdToShow(null)}
                />;
      case Screen.Faq:
        return <FaqScreen onBack={goBack} />;
      case Screen.WalletHistory:
        return <WalletHistoryScreen onBack={goBack} transactions={walletTransactions} walletBalance={walletBalance}/>;
      case Screen.GiftCardStore:
        return <GiftCardStoreScreen 
                  onBack={goBack}
                  onSearch={() => setGiftCardJourneyState({ show: true })}
                  onMyGiftCards={() => navigate(Screen.MyGiftCards)}
                  onSelectBrand={(brand) => setGiftCardJourneyState({ show: true, initialBrand: brand })}
                />
      case Screen.BillPay:
          return <BillPayScreen onBack={goBack} />;
      case Screen.ConnectedBanking:
        return <ConnectedBankingScreen onBack={goBack} onNavigate={navigate} />;
       case Screen.Cash:
        return <CashScreen onBack={goBack} isCashActive={isCashActive} onStartJourney={() => setShowCashJourney(true)} />;
       case Screen.Cashflow:
        return <CashflowScreen onBack={goBack} />;
      case Screen.Highlights:
        return <HighlightsScreen onBack={goBack} />;
      case Screen.ManageAccounts:
        return <ManageAccountsScreen onBack={goBack} />;
      case Screen.StatementScreen:
        return <StatementScreen onBack={goBack} />;
      case Screen.CreditScore:
        return <CreditScoreScreen onBack={goBack} />;
      case Screen.CashAtHome:
        return <CashAtHomeScreen onBack={goBack} orders={cashAtHomeOrders} onNewOrder={() => setShowCashAtHomeJourney(true)} />
      default:
        return <HomeScreen 
                  onNavigate={navigate} 
                  onStartConnectedBankingJourney={() => setShowConnectedBankingJourney(true)} 
                  isBankingConnected={isBankingConnected}
                  onStartCashJourney={() => setShowCashJourney(true)}
                  isCashActive={isCashActive} 
                />;
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen py-4">
      <div className="w-full max-w-sm h-[850px] bg-gray-50 font-sans shadow-2xl rounded-3xl overflow-hidden flex flex-col relative">
        {!isLoggedIn ? (
          <LoginJourney onLoginSuccess={() => setIsLoggedIn(true)} />
        ) : (
          <>
            <main className="flex-grow overflow-y-auto pb-20 bg-gray-100 no-scrollbar">
              {renderScreen()}
            </main>
            <BottomNav activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            {showWalletKyc && <WalletActivationJourney onClose={() => setShowWalletKyc(false)} onSuccess={handleActivateWalletSuccess} />}
            {giftCardJourneyState.show && <GiftCardJourney onClose={() => setGiftCardJourneyState({ show: false })} onPurchaseSuccess={handlePurchaseSuccess} initialBrand={giftCardJourneyState.initialBrand} isWalletActive={isWalletActive} walletBalance={walletBalance} />}
            {showWalletUpgrade && <WalletUpgradeJourney onClose={() => setShowWalletUpgrade(false)} onSuccess={handleWalletUpgradeSuccess} />}
            {showConnectedBankingJourney && <ConnectedBankingJourney onClose={() => setShowConnectedBankingJourney(false)} onSuccess={handleConnectedBankingSuccess} />}
            {showCashJourney && <CashJourney onClose={() => setShowCashJourney(false)} onSuccess={handleCashSuccess} />}
            {showAddMoney && <AddMoneyJourney onClose={() => setShowAddMoney(false)} onSuccess={handleAddMoneySuccess} walletBalance={walletBalance} />}
            {showCashAtHomeJourney && <CashAtHomeJourney 
              onClose={() => setShowCashAtHomeJourney(false)}
              onSuccess={handleCashAtHomeSuccess}
              isWalletActive={isWalletActive}
              walletBalance={walletBalance}
              onActivateWallet={() => {setShowCashAtHomeJourney(false); setShowWalletKyc(true);}}
              onAddMoney={() => {setShowCashAtHomeJourney(false); setShowAddMoney(true);}}
            />}
          </>
        )}
      </div>
    </div>
  );
};

export default App;