import React, { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import MoreScreen from './screens/MoreScreen';
import WalletScreen from './screens/WalletScreen';
import TransactionsScreen from './screens/TransactionsScreen';
import BottomNav from './components/BottomNav';
import { Screen, PurchasedGiftCard, GiftCardBrand } from './types';
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


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const [activeScreen, setActiveScreen] = useState<Screen>(Screen.Home);
  const [previousScreen, setPreviousScreen] = useState<Screen>(Screen.Home);

  const [isWalletActive, setIsWalletActive] = useState<boolean>(false);
  const [showWalletKyc, setShowWalletKyc] = useState<boolean>(false);
  const [isWalletUpgraded, setIsWalletUpgraded] = useState<boolean>(false);
  const [showWalletUpgrade, setShowWalletUpgrade] = useState<boolean>(false);
  
  const [giftCardJourneyState, setGiftCardJourneyState] = useState<{show: boolean, initialBrand?: GiftCardBrand}>({show: false});
  const [purchasedGiftCards, setPurchasedGiftCards] = useState<PurchasedGiftCard[]>([]);
  const [selectedGiftCardIdToShow, setSelectedGiftCardIdToShow] = useState<string | null>(null);

  const [transactionCategory, setTransactionCategory] = useState<string | null>(null);

  const [showConnectedBankingJourney, setShowConnectedBankingJourney] = useState<boolean>(false);
  const [isBankingConnected, setIsBankingConnected] = useState<boolean>(false);

  const [showCashJourney, setShowCashJourney] = useState<boolean>(false);
  const [isCashActive, setIsCashActive] = useState<boolean>(false);


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
  };

  const handleWalletUpgradeSuccess = () => {
    setIsWalletUpgraded(true);
    setShowWalletUpgrade(false);
  };

  const handlePurchaseSuccess = (card: PurchasedGiftCard) => {
    setPurchasedGiftCards(prev => [card, ...prev]);
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
                />;
      case Screen.Transactions:
        if (transactionCategory) {
            return <PaymentHistoryScreen 
                      category={transactionCategory} 
                      onBack={() => setTransactionCategory(null)} 
                      purchasedGiftCards={purchasedGiftCards}
                      onSelectGiftCard={handleSelectGiftCardFromHistory}
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
        return <WalletHistoryScreen onBack={goBack} />;
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
            {giftCardJourneyState.show && <GiftCardJourney onClose={() => setGiftCardJourneyState({ show: false })} onPurchaseSuccess={handlePurchaseSuccess} initialBrand={giftCardJourneyState.initialBrand}/>}
            {showWalletUpgrade && <WalletUpgradeJourney onClose={() => setShowWalletUpgrade(false)} onSuccess={handleWalletUpgradeSuccess} />}
            {showConnectedBankingJourney && <ConnectedBankingJourney onClose={() => setShowConnectedBankingJourney(false)} onSuccess={handleConnectedBankingSuccess} />}
            {showCashJourney && <CashJourney onClose={() => setShowCashJourney(false)} onSuccess={handleCashSuccess} />}
          </>
        )}
      </div>
    </div>
  );
};

export default App;