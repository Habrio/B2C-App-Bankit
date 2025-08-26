import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, XIcon, ZeroDocIcon, ZeroForeclosureIcon, ZeroHiddenChargesIcon } from '../constants/icons';
import CircularProgress from '../components/CircularProgress';

interface CashJourneyProps {
  onClose: () => void;
  onSuccess: () => void;
}

type JourneyStep = 'LANDING' | 'SELECTION' | 'PROCESSING' | 'OFFER';

const CashJourney: React.FC<CashJourneyProps> = ({ onClose, onSuccess }) => {
    const [step, setStep] = useState<JourneyStep>('LANDING');
    const [amount, setAmount] = useState(50000);
    const [tenure, setTenure] = useState(6);
    const [progress, setProgress] = useState(0);

    const maxAmount = 200000;
    const maxTenure = 12;
    const interestRate = 0.15; // 15% annual interest

    const emi = Math.round((amount * (interestRate / 12) * Math.pow(1 + (interestRate / 12), tenure)) / (Math.pow(1 + (interestRate / 12), tenure) - 1));

    const handleProceed = () => {
        setStep('PROCESSING');
        setProgress(0);
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStep('OFFER'), 500);
                    return 100;
                }
                return prev + 1;
            });
        }, 30);
    };

    const handleAcceptOffer = () => {
        onSuccess();
    }
    
    const LandingScreen = () => {
        const benefits = [
            { icon: ZeroDocIcon, title: 'Zero Documentation', desc: '100% paperless application process' },
            { icon: ZeroForeclosureIcon, title: 'Zero Foreclosure Charges', desc: 'No charges on prepaying your loan' },
            { icon: ZeroHiddenChargesIcon, title: 'Zero Hidden Charges', desc: 'Complete transparency on your loan' }
        ];

        return (
            <div className="bg-white h-full flex flex-col p-6">
                <header className="flex-shrink-0 flex justify-end">
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XIcon className="w-6 h-6 text-gray-600" /></button>
                </header>
                <main className="flex-grow flex flex-col justify-center text-center">
                    <h1 className="text-3xl font-bold text-gray-900">Get Cash Instantly</h1>
                    <p className="text-gray-600 mt-2">Up to ₹2,00,000 directly in your bank account.</p>
                    <div className="my-8 space-y-4">
                        {benefits.map(b => (
                            <div key={b.title} className="flex items-center text-left p-3 bg-gray-50 rounded-lg">
                                <div className="p-2 bg-primary/10 rounded-full mr-3"><b.icon className="w-6 h-6 text-primary"/></div>
                                <div>
                                    <p className="font-semibold text-gray-800">{b.title}</p>
                                    <p className="text-sm text-gray-500">{b.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
                <footer className="flex-shrink-0">
                    <button onClick={() => setStep('SELECTION')} className="w-full bg-primary text-white font-bold py-4 rounded-lg">Get Cash Now</button>
                </footer>
            </div>
        );
    };
    
    const SelectionScreen = () => (
        <div className="bg-white h-full flex flex-col p-6">
            <header className="flex-shrink-0 flex items-center">
                 <button onClick={() => setStep('LANDING')} className="p-1 rounded-full hover:bg-gray-100 -ml-1 mr-2"><ArrowLeftIcon className="w-6 h-6 text-gray-600" /></button>
                 <h2 className="text-xl font-bold">Select Loan Details</h2>
            </header>
            <main className="flex-grow flex flex-col justify-center space-y-8">
                <div>
                    <div className="flex justify-between items-end mb-2">
                        <label className="text-gray-600">Loan Amount</label>
                        <span className="font-bold text-2xl text-primary">₹{amount.toLocaleString('en-IN')}</span>
                    </div>
                    <input type="range" min="5000" max={maxAmount} step="1000" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                 <div>
                    <div className="flex justify-between items-end mb-2">
                        <label className="text-gray-600">Tenure (Months)</label>
                        <span className="font-bold text-2xl text-primary">{tenure} months</span>
                    </div>
                    <input type="range" min="3" max={maxTenure} step="1" value={tenure} onChange={e => setTenure(Number(e.target.value))} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" />
                </div>
                <div className="text-center bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600">Your EMI will be</p>
                    <p className="font-bold text-3xl text-gray-800">₹{emi.toLocaleString('en-IN')}<span className="text-base font-normal">/month</span></p>
                </div>
            </main>
             <footer className="flex-shrink-0">
                <button onClick={handleProceed} className="w-full bg-primary text-white font-bold py-4 rounded-lg">Confirm & Proceed</button>
            </footer>
        </div>
    );
    
    const ProcessingScreen = () => (
        <div className="bg-white h-full flex flex-col items-center justify-center p-6 text-center">
            <CircularProgress value={progress} size={200} strokeWidth={10}/>
            <h2 className="text-2xl font-bold mt-8">Reviewing Application</h2>
            <p className="text-gray-600">Please wait while we check your eligibility. This won't take long.</p>
        </div>
    );

    const OfferScreen = () => (
         <div className="bg-white h-full flex flex-col p-6 text-center">
             <header className="flex-shrink-0 flex justify-end">
                <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100"><XIcon className="w-6 h-6 text-gray-600" /></button>
            </header>
            <main className="flex-grow flex flex-col justify-center">
                <h1 className="text-3xl font-bold text-green-600">Congratulations!</h1>
                <p className="text-gray-600 mt-2">Your loan has been approved.</p>
                <div className="my-8 bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-4">
                     <div>
                        <p className="text-gray-500 text-sm">Loan Amount</p>
                        <p className="font-bold text-2xl text-gray-800">₹{amount.toLocaleString('en-IN')}</p>
                    </div>
                     <div>
                        <p className="text-gray-500 text-sm">Monthly EMI</p>
                        <p className="font-bold text-2xl text-gray-800">₹{emi.toLocaleString('en-IN')} for {tenure} months</p>
                    </div>
                </div>
                <p className="text-xs text-gray-500">The amount will be disbursed to your primary bank account within 24 hours.</p>
            </main>
            <footer className="flex-shrink-0">
                <button onClick={handleAcceptOffer} className="w-full bg-primary text-white font-bold py-4 rounded-lg">Accept & Continue</button>
            </footer>
        </div>
    );
    
    const renderContent = () => {
        switch (step) {
            case 'LANDING': return <LandingScreen />;
            case 'SELECTION': return <SelectionScreen />;
            case 'PROCESSING': return <ProcessingScreen />;
            case 'OFFER': return <OfferScreen />;
            default: return <LandingScreen />;
        }
    };

    return (
        <div className="absolute inset-0 bg-white z-40 flex flex-col">
            {renderContent()}
        </div>
    );
};

export default CashJourney;