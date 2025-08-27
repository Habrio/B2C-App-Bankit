import React, { useState, FormEvent } from 'react';
import { FindiBankitLogo } from '../constants/icons';

interface LoginScreenProps {
  onSubmit: (mobileNumber: string) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onSubmit }) => {
  const [number, setNumber] = useState<string>('9876543210');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Allow only digits
    if (value.length <= 10) {
      setNumber(value);
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (number.length === 10) {
      onSubmit(number);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white p-8">
      <div className="flex-grow flex flex-col items-center justify-center text-center">
        <FindiBankitLogo />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">FindiBankit</h1>
        
        <div className="w-full max-w-xs mt-12 text-left">
            <h2 className="text-lg font-bold text-gray-900">Enter your mobile number</h2>
            <p className="text-sm text-gray-500 mt-1">We'll send an OTP to verify your number.</p>
        
            <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex items-center border-2 border-gray-200 rounded-lg focus-within:border-primary transition-colors">
                    <span className="pl-3 text-gray-500 font-semibold">+91</span>
                    <input
                        type="tel"
                        value={number}
                        onChange={handleInputChange}
                        placeholder="00000 00000"
                        className="w-full p-3 bg-transparent focus:outline-none text-lg tracking-wider"
                        aria-label="Mobile Number"
                    />
                </div>

                <button
                    type="submit"
                    disabled={number.length !== 10}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg mt-6 hover:bg-primary/90 disabled:bg-gray-300 transition-all duration-300"
                >
                    Continue
                </button>
            </form>
        </div>
      </div>
      
      <div className="flex-shrink-0 text-center text-xs text-gray-400 pb-4">
        <p>By proceeding, you agree to our</p>
        <p>
            <a href="#" className="font-semibold text-gray-500">Terms & Conditions</a> and <a href="#" className="font-semibold text-gray-500">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;