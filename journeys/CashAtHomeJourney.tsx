import React, { useState } from 'react';
import { Screen } from '../types';
import { XIcon, ArrowLeftIcon, WalletIcon, HomeIcon, CheckCircleIcon, RupeeIcon } from '../constants/icons';

interface CashAtHomeJourneyProps {
  onClose: () => void;
  onSuccess: (amount: number, address: string, fee: number) => void;
  isWalletActive: boolean;
  walletBalance: number;
  onActivateWallet: () => void;
  onAddMoney: () => void;
}

type Step = 'AMOUNT' | 'ADDRESS' | 'CONFIRM' | 'SUCCESS' | 'NO_WALLET' | 'NO_FUNDS';

export const CashAtHomeJourney: React.FC<CashAtHomeJourneyProps> = ({
  onClose,
  onSuccess,
  isWalletActive,
  walletBalance,
  onActivateWallet,
  onAddMoney,
}) => {
  const [step, setStep] = useState<Step>('AMOUNT');
  const [amount, setAmount] = useState<number>(0);
  const [address, setAddress] = useState<string>('H-29, Sector 63, Noida, Uttar Pradesh, 201301');
  const deliveryFee = 50;

  const handleAmountNext = () => {
    if (!isWalletActive) {
      setStep('NO_WALLET');
      return;
    }
    if (walletBalance < amount + deliveryFee) {
      setStep('NO_FUNDS');
      return;
    }
    if (amount > 0) {
      setStep('ADDRESS');
    }
  };
  
  const handleConfirmOrder = () => {
    onSuccess(amount, address, deliveryFee);
    setStep('SUCCESS');
  }

  const renderContent = () => {
    switch (step) {
      case 'AMOUNT':
        return (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Cash Delivery</h2>
            <p className="text-gray-500 mb-8 text-sm">Enter the amount you need delivered.</p>
            <div className="relative my-6">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">₹</span>
              <input
                type="number"
                value={amount || ''}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full text-center py-3 text-3xl font-bold border-b-2 border-gray-300 focus:border-primary focus:outline-none"
                placeholder="0"
                autoFocus
              />
            </div>
            <div className="flex space-x-2">
                {[1000, 2000, 5000].map(val => (
                    <button key={val} onClick={() => setAmount(val)} className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-200">
                        ₹{val}
                    </button>
                ))}
            </div>
            <div className="flex-grow"></div>
            <button
              onClick={handleAmountNext}
              disabled={amount <= 0 || amount > 10000}
              className="w-full bg-primary text-white font-bold py-4 rounded-lg disabled:bg-gray-300"
            >
              Next
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">Max amount is ₹10,000.</p>
          </>
        );
      case 'ADDRESS':
        return (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Delivery Address</h2>
            <p className="text-gray-500 mb-8 text-sm">Confirm where you'd like the cash delivered.</p>
            <div className="border border-primary bg-primary/5 rounded-lg p-4 text-left">
                <div className="flex items-start">
                    <HomeIcon className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                        <p className="font-bold">Home</p>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full bg-transparent text-gray-600 focus:outline-none resize-none"
                            rows={3}
                        />
                    </div>
                </div>
            </div>
             <div className="flex-grow"></div>
            <button
              onClick={() => setStep('CONFIRM')}
              disabled={!address}
              className="w-full bg-primary text-white font-bold py-4 rounded-lg disabled:bg-gray-300"
            >
              Proceed to Confirmation
            </button>
          </>
        )
      case 'CONFIRM':
        const total = amount + deliveryFee;
        return (
          <>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Confirm Order</h2>
            <p className="text-gray-500 mb-8 text-sm">Review your order before placing it.</p>
            <div className="space-y-4 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-semibold">₹{amount.toFixed(2)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Delivery Fee</span><span className="font-semibold">₹{deliveryFee.toFixed(2)}</span></div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold"><span className="text-gray-800">Total to be Debited</span><span className="text-lg">₹{total.toFixed(2)}</span></div>
            </div>
            <div className="mt-6 p-3 bg-gray-100 rounded-lg text-left flex items-center">
                <WalletIcon className="w-5 h-5 text-gray-600 mr-3" />
                <div>
                    <p className="text-xs text-gray-500">Paying from Wallet</p>
                    <p className="font-semibold text-sm">Balance: ₹{walletBalance.toFixed(2)}</p>
                </div>
            </div>
             <div className="flex-grow"></div>
            <button
              onClick={handleConfirmOrder}
              className="w-full bg-primary text-white font-bold py-4 rounded-lg"
            >
              Confirm & Place Order
            </button>
          </>
        )
      case 'SUCCESS':
          return (
            <div className="flex flex-col items-center justify-center text-center h-full">
                <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800">Order Placed!</h2>
                <p className="text-gray-500 mt-2">Your cash delivery for ₹{amount} is confirmed.</p>
                <p className="text-gray-500">A delivery agent will be assigned shortly.</p>
                <button onClick={onClose} className="w-full bg-gray-800 text-white font-bold py-4 rounded-lg mt-12">
                    Done
                </button>
            </div>
          )
      case 'NO_WALLET':
          return (
             <div className="flex flex-col items-center justify-center text-center h-full">
                <WalletIcon className="w-16 h-16 text-gray-400 mb-4" />
                <h2 className="text-xl font-bold text-gray-800">Wallet Not Active</h2>
                <p className="text-gray-500 mt-2 mb-6">You need to activate your wallet to pay for cash delivery.</p>
                <button onClick={onActivateWallet} className="w-full bg-primary text-white font-bold py-4 rounded-lg">
                    Activate Wallet
                </button>
            </div>
          )
      case 'NO_FUNDS':
          return (
             <div className="flex flex-col items-center justify-center text-center h-full">
                <RupeeIcon className="w-16 h-16 text-red-500 mb-4" />
                <h2 className="text-xl font-bold text-gray-800">Insufficient Balance</h2>
                <p className="text-gray-500 mt-2 mb-6">Your wallet balance is too low to complete this order.</p>
                <p className="text-gray-500 text-sm">Required: ₹{(amount+deliveryFee).toFixed(2)}</p>
                <p className="text-gray-500 text-sm mb-6">Available: ₹{walletBalance.toFixed(2)}</p>
                <button onClick={onAddMoney} className="w-full bg-primary text-white font-bold py-4 rounded-lg">
                    Add Money
                </button>
            </div>
          )
    }
  };
  
  const showHeader = step !== 'SUCCESS' && step !== 'NO_WALLET' && step !== 'NO_FUNDS';

  return (
    <div className="absolute inset-0 bg-white z-40 flex flex-col">
       {showHeader && (
        <header className="flex-shrink-0 flex justify-between items-center p-4">
            {step === 'AMOUNT' ? <div className="w-8"/> : (
                <button onClick={() => setStep('AMOUNT')} className="p-1 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
                </button>
            )}
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                <XIcon className="w-6 h-6 text-gray-600" />
            </button>
        </header>
       )}
       <main className="flex-grow flex flex-col p-6 pt-0">
           {renderContent()}
       </main>
    </div>
  );
};
