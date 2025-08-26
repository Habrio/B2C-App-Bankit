import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeftIcon } from '../constants/icons';

interface OTPScreenProps {
  mobileNumber: string;
  onVerify: (otp: string) => void;
  onBack: () => void;
}

const OTP_LENGTH = 6;
const RESEND_TIMER = 30;

const OTPScreen: React.FC<OTPScreenProps> = ({ mobileNumber, onVerify, onBack }) => {
  const [otp, setOtp] = useState<string>('123456');
  const [timer, setTimer] = useState<number>(RESEND_TIMER);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
      // Automatically verify if OTP is prefilled
      if (otp === '123456') {
          const timeoutId = setTimeout(() => onVerify('123456'), 500);
          return () => clearTimeout(timeoutId);
      }
      if (inputRef.current) {
          inputRef.current.focus();
      }
  }, []);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= OTP_LENGTH) {
      setOtp(value);
      if (value.length === OTP_LENGTH) {
        onVerify(value);
      }
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(RESEND_TIMER);
      // In a real app, you would call the resend OTP API here.
    }
  };

  const formattedNumber = `+91 ${mobileNumber.slice(0, 5)} ${mobileNumber.slice(5)}`;

  return (
    <div className="flex flex-col h-full bg-white p-8">
      <div className="flex-shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
          <ArrowLeftIcon className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center text-center -mt-12">
        <div className="w-full max-w-xs">
          <h1 className="text-xl font-bold text-gray-900">Verify your number</h1>
          <p className="text-sm text-gray-500 mt-1">
            Enter the 6-digit code sent to <span className="font-semibold text-gray-700">{formattedNumber}</span>
          </p>

          <div className="relative mt-8" onClick={() => inputRef.current?.focus()}>
              <div className="flex justify-center space-x-2">
                  {Array.from({length: OTP_LENGTH}).map((_, index) => (
                      <div key={index} className={`w-12 h-14 border-2 rounded-lg flex items-center justify-center text-2xl font-bold transition-colors ${otp.length === index ? 'border-primary' : 'border-gray-200'}`}>
                          {otp[index] || ''}
                      </div>
                  ))}
              </div>
              <input
                ref={inputRef}
                type="tel"
                value={otp}
                onChange={handleOtpChange}
                className="absolute top-0 left-0 w-full h-full opacity-0"
                aria-label="OTP Input"
              />
          </div>

          <div className="mt-6 text-sm">
            {timer > 0 ? (
              <p className="text-gray-500">Resend OTP in <span className="font-bold text-gray-700">00:{timer.toString().padStart(2, '0')}</span></p>
            ) : (
              <p className="text-gray-500">
                Didn't receive the code?{' '}
                <button onClick={handleResend} className="font-bold text-primary hover:underline">
                  Resend OTP
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;