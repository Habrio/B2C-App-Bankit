import React, { useState, useEffect } from 'react';
import { ArrowLeftIcon, XIcon, CheckCircleIcon, ChevronDownIcon, PlayCircleIcon, FinvuLogo, FindiBankitLogo } from '../constants/icons';

interface ConnectedBankingJourneyProps {
  onClose: () => void;
  onSuccess: () => void;
}

type JourneyStep = 'LANDING' | 'MOBILE_INPUT' | 'OTP' | 'DISCOVERY' | 'PROCESSING';

const ConnectedBankingJourney: React.FC<ConnectedBankingJourneyProps> = ({ onClose, onSuccess }) => {
    const [step, setStep] = useState<JourneyStep>('LANDING');
    
    // State for Mobile and OTP
    const [mobileNumber, setMobileNumber] = useState('9871658358');
    const [otp, setOtp] = useState('123456');

    // State for discovery
    const [discoveredAccounts, setDiscoveredAccounts] = useState<any[]>([]);
    const [isDiscovering, setIsDiscovering] = useState(true);
    
    useEffect(() => {
        if (step === 'DISCOVERY') {
            setDiscoveredAccounts([]);
            setIsDiscovering(true);
            setTimeout(() => {
                setDiscoveredAccounts([
                    { id: '1', bankName: 'Federal Bank', accNo: 'XX9147', logo: 'https://logo.clearbit.com/federalbank.co.in', selected: true },
                    { id: '2', bankName: 'Punjab National Bank', accNo: 'XX1019', logo: 'https://logo.clearbit.com/pnbindia.in', selected: true },
                ]);
            }, 1500);
            setTimeout(() => {
                setIsDiscovering(false);
            }, 3000);
        }
    }, [step]);


    const handleBack = () => {
        if (step === 'OTP') setStep('MOBILE_INPUT');
    };

    const handleMobileSubmit = () => {
        if (mobileNumber.length === 10) {
            setStep('OTP');
        }
    }

    const handleOtpSubmit = () => {
        if (otp.length === 6) {
            setStep('DISCOVERY');
        }
    }

    const handleApproval = () => {
        setStep('PROCESSING');
        setTimeout(onSuccess, 4000);
    }
    
    const toggleAccountSelection = (id: string) => {
        setDiscoveredAccounts(prev => prev.map(acc => acc.id === id ? {...acc, selected: !acc.selected } : acc));
    };

    // Sub-components for each step
    const LandingScreen = () => {
        const benefits = [
            "One view of all your bank accounts for you to stay on top of your money",
            "Automatic AI driven grouping of transactions to help you budget better",
            "Get regular insights and key alerts on how your money moves",
        ];
        const howItWorks = [
            "Connect all your accounts & we will auto-fetch data",
            "We will take less than 2 minutes to setup the Connected Banking dashboard",
            "Check daily to stay on top of your money and stress free",
        ];
        const faqs = [
            { q: "What is an Account Aggregator?", a: "It's an RBI-regulated entity that helps you securely and digitally access and share information from one financial institution to any other in the AA network." },
            { q: "How can I track my bank accounts via FindiBankit?", a: "By connecting your accounts through the secure AA framework, FindiBankit can fetch your transaction data to provide insights." },
            { q: "What are the benefits of AA?", a: "It's secure, consent-based, and saves you the hassle of tracking multiple bank statements manually." },
        ];

        return (
            <div className="bg-gray-100 text-gray-800 h-full flex flex-col">
                <header className="p-4 flex items-center justify-between sticky top-0 bg-gray-100 z-10">
                    <button onClick={onClose} className="p-2 -ml-2"><ArrowLeftIcon className="w-6 h-6"/></button>
                    <button className="flex items-center space-x-1 font-semibold text-secondary text-sm">
                        <PlayCircleIcon className="w-5 h-5"/>
                        <span>Watch Story</span>
                    </button>
                </header>
                <main className="flex-grow overflow-y-auto pb-24 px-4 space-y-6">
                    {/* Benefits Card */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Benefits</h2>
                        <div className="space-y-4">
                            {benefits.map((text, i) => (
                                <div key={i} className="flex items-start space-x-3">
                                    <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-gray-700">{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* How We Do It Card */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm">
                        <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">How we do it?</h2>
                        <p className="text-gray-700 mb-6">RBI's Account Aggregator tech makes sharing your account info simple and secure.</p>
                        <div className="relative">
                            <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gray-200" />
                            {howItWorks.map((text, i) => (
                                <div key={i} className="flex items-start space-x-4 pl-8 mb-4 relative">
                                    <div className="absolute left-0 top-1.5 w-5 h-5 rounded-full bg-white border-2 border-gray-300" />
                                    <p className="text-gray-700">{text}</p>
                                </div>
                            ))}
                        </div>
                         <button className="flex items-center space-x-1 font-semibold text-secondary text-sm ml-8 mt-4">
                            <PlayCircleIcon className="w-5 h-5"/>
                            <span>RBI Account Aggregator Video</span>
                        </button>
                    </div>
                     {/* FAQs Card */}
                    <div className="bg-white p-5 rounded-2xl shadow-sm">
                         <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">FAQs</h2>
                         <div className="divide-y divide-gray-200">
                             {faqs.map(({q, a}, i) => (
                                <details key={i} className="group py-3">
                                    <summary className="flex justify-between items-center cursor-pointer list-none">
                                        <span className="font-semibold text-gray-800">{q}</span>
                                        <ChevronDownIcon className="w-5 h-5 text-gray-500 transition-transform duration-300 group-open:rotate-180" />
                                    </summary>
                                    <p className="text-gray-600 mt-2 text-sm">{a}</p>
                                </details>
                             ))}
                         </div>
                         <button className="font-semibold text-secondary mt-4">See All &gt;</button>
                    </div>
                </main>
                <footer className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
                    <p className="text-xs text-center text-gray-500 mb-2">By continuing you agree with <a href="#" className="font-semibold text-secondary">Terms & conditions</a></p>
                    <button onClick={() => setStep('MOBILE_INPUT')} className="w-full bg-secondary text-white font-bold py-3.5 rounded-lg">
                        Connect Your Accounts
                    </button>
                </footer>
            </div>
        );
    };

    const MobileInputScreen = () => (
        <div className="absolute inset-0 bg-black/60 flex flex-col justify-end" onClick={() => setStep('LANDING')}>
            <div className="bg-white rounded-t-2xl p-6 pt-4" onClick={e => e.stopPropagation()}>
                <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900">Enter mobile number linked to your account</h2>
                <p className="text-gray-500 mt-1 mb-6">Bank accounts only linked to this number can be tracked</p>
                <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">🇮🇳</div>
                    <p className="text-xl font-semibold tracking-wider">{mobileNumber}</p>
                </div>
                <button onClick={handleMobileSubmit} className="w-full bg-secondary text-white font-bold py-3.5 rounded-lg mt-6">
                    Continue
                </button>
            </div>
        </div>
    );

    const OTPScreen = () => {
        // Auto-submit simulation
        useEffect(() => {
            const timer = setTimeout(handleOtpSubmit, 1000);
            return () => clearTimeout(timer);
        }, []);

        return (
            <div className="flex flex-col h-full bg-white p-6">
                <header className="flex-shrink-0">
                    <button onClick={onClose} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                        <XIcon className="w-6 h-6" />
                    </button>
                </header>
                <main className="flex-grow flex flex-col items-center justify-center text-center -mt-12">
                    <div className="w-full max-w-sm">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <FindiBankitLogo className="w-10 h-10"/>
                            <span className="text-2xl font-bold text-gray-800">FindiBankit</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">Enter OTP to fetch your accounts</h1>
                        <p className="text-gray-500 mt-1">
                            Sent to +91 {mobileNumber}
                        </p>
                        <div className="flex justify-center space-x-3 my-8 text-4xl text-gray-400">
                            {Array.from({length: 6}).map((_, i) => <span key={i}>X</span>)}
                        </div>
                         <p className="text-gray-500">Resend OTP in 00:30</p>
                    </div>
                </main>
                 <footer className="p-4">
                    <p className="text-xs text-center text-gray-500 mb-2">by proceeding you agree to the <a href="#" className="font-semibold text-secondary">terms & conditions</a></p>
                     <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                        <CheckCircleIcon className="w-4 h-4 text-green-500" />
                        <span>Powered by RBI authorized account aggregator</span>
                        <FinvuLogo />
                    </div>
                </footer>
            </div>
        );
    }

    const DiscoveryScreen = () => (
        <div className="flex flex-col h-full bg-gray-100 p-6">
            <header className="flex-shrink-0">
                <button onClick={onClose} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
                    <XIcon className="w-6 h-6" />
                </button>
            </header>
            <main className="flex-grow flex flex-col -mt-8">
                <h1 className="text-2xl font-bold text-gray-900">We found {discoveredAccounts.length} accounts.</h1>
                <h2 className="text-2xl font-bold text-gray-500">Choose which to connect.</h2>
                {isDiscovering && <p className="text-gray-500 mt-1">Discovering more accounts</p>}
                
                <div className="bg-white rounded-2xl shadow-sm p-4 my-6 space-y-4">
                    {discoveredAccounts.map(acc => (
                         <div key={acc.id} onClick={() => toggleAccountSelection(acc.id)} className="flex items-center">
                            <img src={acc.logo} alt={acc.bankName} className="w-10 h-10 rounded-lg mr-4" />
                            <div className="flex-grow">
                                <p className="font-bold">{acc.bankName}</p>
                                <p className="text-sm text-gray-600">ACC No. {acc.accNo}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${acc.selected ? 'bg-secondary border-secondary' : 'border-gray-300'}`}>
                                {acc.selected && <CheckCircleIcon className="w-4 h-4 text-white" style={{ strokeWidth: 3 }}/>}
                            </div>
                        </div>
                    ))}
                    {isDiscovering && (
                        <div className="flex items-center animate-pulse">
                            <div className="w-10 h-10 rounded-lg mr-4 bg-gray-200"></div>
                            <div className="flex-grow space-y-2">
                                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        </div>
                    )}
                </div>
                 <div className="bg-yellow-100 text-yellow-800 text-sm p-3 rounded-lg text-center">
                    Consent OTPs will be sent from your Bank
                </div>
                <div className="flex-grow" />
                <div className="bg-gray-200/50 p-4 rounded-lg">
                     <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Purpose</h3>
                     <p className="text-sm text-gray-700">Transaction data being shared for your customer spending patterns budget or other reportings</p>
                </div>
            </main>
             <footer className="py-4">
                 <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 mb-4">
                    <CheckCircleIcon className="w-4 h-4 text-green-500" />
                    <span>Powered by RBI authorized account aggregator</span>
                    <FinvuLogo />
                </div>
                <div className="flex space-x-4">
                    <button onClick={onClose} className="w-full bg-white border border-gray-300 text-secondary font-bold py-3.5 rounded-lg">Deny</button>
                    <button onClick={handleApproval} className="w-full bg-secondary text-white font-bold py-3.5 rounded-lg">Approve</button>
                </div>
            </footer>
        </div>
    );
    
    const ProcessingScreen = () => {
        const [progress, setProgress] = useState(0);
        useEffect(() => {
            const timers = [
                setTimeout(() => setProgress(1), 500),
                setTimeout(() => setProgress(2), 2000),
                setTimeout(() => setProgress(3), 3500),
            ];
            return () => timers.forEach(clearTimeout);
        }, []);

        const checkpoints = ["Fetching transactions", "Analyzing spends", "Setting up dashboard"];
        
        return (
            <div className="flex flex-col h-full bg-white p-6 justify-center">
                <div className="bg-white rounded-2xl shadow-sm p-4">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center">
                            <img src="https://logo.clearbit.com/pnbindia.in" className="w-10 h-10 rounded-lg" />
                            <div className="ml-2">
                                <p className="font-bold text-sm">Punjab National Bank</p>
                                <p className="text-xs text-gray-500">xx 1019</p>
                            </div>
                        </div>
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    </div>
                     <div className="h-px bg-gray-200 my-2" />
                     <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center">
                            <img src="https://logo.clearbit.com/federalbank.co.in" className="w-10 h-10 rounded-lg" />
                            <div className="ml-2">
                                <p className="font-bold text-sm">Federal Bank</p>
                                <p className="text-xs text-gray-500">xx 9147</p>
                            </div>
                        </div>
                        <CheckCircleIcon className="w-6 h-6 text-green-500" />
                    </div>
                     <div className="relative h-2 bg-gray-200 rounded-full my-6 overflow-hidden">
                        <div className="absolute top-0 left-0 h-full bg-green-500 transition-all duration-1000" style={{width: `${(progress/checkpoints.length)*100}%`}}/>
                     </div>
                     <div className="flex justify-between text-xs text-gray-500 px-1">
                        {checkpoints.map((text, i) => (
                           <div key={i} className={`flex items-center space-x-1 ${progress > i ? 'text-green-600 font-semibold' : ''}`}>
                               <div className={`w-3 h-3 rounded-full border-2 ${progress > i ? 'bg-green-500 border-green-500' : 'border-gray-400'}`} />
                               <span>{text}</span>
                           </div>
                        ))}
                     </div>
                </div>
                <p className="text-center text-gray-600 mt-4">Getting your dashboard ready for review...</p>
                 <div className="mt-8 text-center">
                    <h2 className="text-2xl font-bold">Explore with demo<br/>Account <ChevronDownIcon className="inline w-6 h-6 transform -rotate-90"/></h2>
                    <p className="text-gray-500">Numbers here are just for representation.</p>
                 </div>
            </div>
        )
    };
    
    const renderContent = () => {
        switch (step) {
            case 'LANDING': return <LandingScreen />;
            case 'DISCOVERY': return <DiscoveryScreen />;
            case 'PROCESSING': return <ProcessingScreen />;
            case 'OTP': return <OTPScreen />;
            default: return <LandingScreen />;
        }
    };

    return (
        <div className="absolute inset-0 bg-white z-40 flex flex-col">
            {renderContent()}
            {step === 'MOBILE_INPUT' && <MobileInputScreen />}
        </div>
    );
};

export default ConnectedBankingJourney;