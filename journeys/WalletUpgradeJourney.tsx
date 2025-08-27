import React, { useState, useEffect, useRef } from 'react';
import { XIcon, ArrowLeftIcon } from '../constants/icons';

interface WalletUpgradeJourneyProps {
  onClose: () => void;
  onSuccess: () => void;
}

type UpgradeStep = 'AADHAAR' | 'OTP';

const WalletUpgradeJourney: React.FC<WalletUpgradeJourneyProps> = ({ onClose, onSuccess }) => {
  const [step, setStep] = useState<UpgradeStep>('AADHAAR');
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const otpInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (step === 'OTP' && otpInputRef.current) {
        otpInputRef.current.focus();
    }
  }, [step]);


  const handleAadhaarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (aadhaar.length === 12) {
      setLoading(true);
      // Simulate sending OTP
      setTimeout(() => {
        setLoading(false);
        setStep('OTP');
      }, 1000);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      setLoading(true);
      // Simulate OTP verification
      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 1500);
    }
  };
  
  const isAadhaarValid = aadhaar.length === 12;
  const isOtpValid = otp.length === 6;

  return (
    <div className="absolute inset-0 bg-gray-800 bg-opacity-75 z-50 flex items-center justify-center">
        <div className="bg-white w-full h-full flex flex-col p-6">
            <div className="flex justify-between items-center mb-6">
                 {step === 'OTP' ? (
                     <button onClick={() => setStep('AADHAAR')} className="p-1 rounded-full hover:bg-gray-100">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-600" />
                    </button>
                 ) : <div className="w-8 h-8"></div>}
                <h2 className="text-lg font-bold text-secondary text-center">Upgrade Wallet KYC</h2>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
                    <XIcon className="w-6 h-6 text-gray-600" />
                </button>
            </div>
            
            {step === 'AADHAAR' && (
                <>
                    <p className="text-gray-600 mb-8 text-center text-sm">
                        Enter your Aadhaar number to complete e-KYC and unlock higher limits.
                    </p>
                    <form onSubmit={handleAadhaarSubmit} className="flex flex-col flex-grow space-y-6">
                        <div>
                            <label htmlFor="aadhaar" className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number</label>
                            <input
                                type="tel"
                                id="aadhaar"
                                value={aadhaar}
                                onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary tracking-widest text-sm"
                                placeholder="xxxx xxxx xxxx"
                                maxLength={12}
                                required
                            />
                        </div>
                        <div className="flex-grow"></div>
                        <button
                            type="submit"
                            disabled={!isAadhaarValid || loading}
                            className="w-full bg-primary text-white font-bold py-4 px-4 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 transition-all duration-300"
                        >
                            {loading ? 'Sending OTP...' : 'Send OTP'}
                        </button>
                    </form>
                </>
            )}

            {step === 'OTP' && (
                 <>
                    <p className="text-gray-600 mb-8 text-center text-sm">
                        Enter the 6-digit OTP sent to your Aadhaar-linked mobile number.
                    </p>
                    <form onSubmit={handleOtpSubmit} className="flex flex-col flex-grow space-y-6">
                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                             <input
                                ref={otpInputRef}
                                type="tel"
                                id="otp"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary text-center text-xl tracking-[1.5rem]"
                                maxLength={6}
                                required
                            />
                        </div>
                        <div className="flex-grow"></div>
                        <button
                            type="submit"
                            disabled={!isOtpValid || loading}
                            className="w-full bg-primary text-white font-bold py-4 px-4 rounded-lg hover:bg-primary/90 disabled:bg-gray-300 transition-all duration-300"
                        >
                            {loading ? 'Verifying...' : 'Verify & Upgrade'}
                        </button>
                    </form>
                </>
            )}
        </div>
    </div>
  );
};

export default WalletUpgradeJourney;