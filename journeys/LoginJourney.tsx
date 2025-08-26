
import React, { useState } from 'react';
import LoginScreen from '../screens/LoginScreen';
import OTPScreen from '../screens/OTPScreen';

interface LoginJourneyProps {
  onLoginSuccess: () => void;
}

type LoginStep = 'LOGIN' | 'OTP';

const LoginJourney: React.FC<LoginJourneyProps> = ({ onLoginSuccess }) => {
  const [step, setStep] = useState<LoginStep>('LOGIN');
  const [mobileNumber, setMobileNumber] = useState<string>('');

  const handleNumberSubmit = (number: string) => {
    setMobileNumber(number);
    setStep('OTP');
    // In a real app, you would trigger the OTP sending API here.
  };
  
  const handleOtpVerify = (otp: string) => {
    // Mock OTP verification. In a real app, you'd call an API.
    if (otp === '123456') {
      onLoginSuccess();
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  const handleBackToLogin = () => {
    setMobileNumber('');
    setStep('LOGIN');
  }

  switch (step) {
    case 'LOGIN':
      return <LoginScreen onSubmit={handleNumberSubmit} />;
    case 'OTP':
      return <OTPScreen mobileNumber={mobileNumber} onVerify={handleOtpVerify} onBack={handleBackToLogin} />;
    default:
      return <LoginScreen onSubmit={handleNumberSubmit} />;
  }
};

export default LoginJourney;
