import React, { useState } from 'react';
import { XIcon } from '../constants/icons';

interface WalletActivationJourneyProps {
  onClose: () => void;
  onSuccess: () => void;
}

const WalletActivationJourney: React.FC<WalletActivationJourneyProps> = ({ onClose, onSuccess }) => {
  const [name, setName] = useState('Ashish Kumar');
  const [dob, setDob] = useState('1990-01-01');
  const [pan, setPan] = useState('ABCDE1234F');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && dob && pan) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 1500);
    }
  };
  
  const isFormValid = name && dob && pan.length === 10;

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
        <div className="bg-white w-full h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-secondary">Activate Your Wallet</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                    <XIcon className="w-6 h-6 text-gray-600" />
                </button>
            </div>

            <p className="text-gray-600 mb-8 text-sm">
                Provide your basic details as per government regulations to activate your PPI wallet.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col flex-grow space-y-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name (as per PAN)</label>
                    <input
                        type="text"
                        id="fullName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="e.g. Ashish Kumar"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                 <div>
                    <label htmlFor="pan" className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
                    <input
                        type="text"
                        id="pan"
                        value={pan}
                        onChange={(e) => setPan(e.target.value.toUpperCase())}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        required
                    />
                </div>

                <div className="flex-grow"></div>

                <button
                    type="submit"
                    disabled={!isFormValid || loading}
                    className="w-full bg-primary text-white font-bold py-4 px-4 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 transition-all duration-300"
                >
                    {loading ? 'Activating...' : 'Submit & Activate'}
                </button>
            </form>
        </div>
    </div>
  );
};

export default WalletActivationJourney;