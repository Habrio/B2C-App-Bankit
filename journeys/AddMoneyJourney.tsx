import React, { useState } from 'react';
import { XIcon } from '../constants/icons';

interface AddMoneyJourneyProps {
  onClose: () => void;
  onSuccess: (amount: number) => void;
  walletBalance: number;
}

const AddMoneyJourney: React.FC<AddMoneyJourneyProps> = ({ onClose, onSuccess, walletBalance }) => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (numericAmount > 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        onSuccess(numericAmount);
      }, 1500);
    }
  };

  const suggestedAmounts = [100, 500, 1000];

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white w-full h-full flex flex-col p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-secondary">Add Money to Wallet</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <XIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <p className="text-gray-600 mb-2 text-sm">Current Balance: <span className="font-bold">₹{walletBalance.toFixed(2)}</span></p>
        <p className="text-gray-600 mb-8 text-sm">Enter amount you wish to add.</p>

        <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-6">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-xl font-bold border-b-2 border-gray-300 focus:border-primary focus:outline-none"
              placeholder="0"
              autoFocus
              required
            />
          </div>

          <div className="flex space-x-3">
            {suggestedAmounts.map(val => (
              <button
                key={val}
                type="button"
                onClick={() => handleAmountSelect(val)}
                className="flex-1 bg-gray-100 text-gray-700 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 text-sm"
              >
                + ₹{val}
              </button>
            ))}
          </div>

          <div className="flex-grow"></div>

          <button
            type="submit"
            disabled={!amount || Number(amount) <= 0 || loading}
            className="w-full bg-primary text-white font-bold py-4 px-4 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 transition-all duration-300"
          >
            {loading ? 'Adding Money...' : `Add ₹${amount || 0}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMoneyJourney;