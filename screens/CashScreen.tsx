import React from 'react';
import { ArrowLeftIcon, ChevronRightIcon } from '../constants/icons';

interface CashScreenProps {
    onBack: () => void;
    isCashActive: boolean;
    onStartJourney: () => void;
}

const CashScreen: React.FC<CashScreenProps> = ({ onBack, isCashActive, onStartJourney }) => {
    return (
        <div className="h-full flex flex-col bg-gray-100">
            <header className="p-4 pt-6 bg-white flex-shrink-0 shadow-sm z-10 sticky top-0 flex items-center space-x-4">
                <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-lg font-bold text-gray-800">FindiBankit Cash</h1>
            </header>

            <main className="flex-grow overflow-y-auto p-4 space-y-5">
                {isCashActive ? (
                    <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
                        <p className="text-sm text-gray-500">Outstanding Loan Amount</p>
                        <p className="text-3xl font-bold text-gray-900 mt-1">₹41,833.12</p>

                        <div className="mt-8 grid grid-cols-2 gap-4 text-left">
                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500">Next EMI Date</p>
                                <p className="font-semibold text-gray-800 text-sm">Oct 03, 2025</p>
                            </div>
                             <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-xs text-gray-500">Next EMI Amount</p>
                                <p className="font-semibold text-gray-800 text-sm">₹8,560.00</p>
                            </div>
                        </div>

                        <button className="w-full mt-6 bg-primary text-white font-bold py-3 rounded-lg">
                            Make EMI Payment
                        </button>
                    </div>
                ) : (
                    <div className="text-center pt-16">
                         <h2 className="text-xl font-bold text-gray-800">No Active Loan</h2>
                        <p className="text-gray-500 mt-2 mb-8 max-w-xs mx-auto text-sm">
                            Get an instant loan of up to ₹2,00,000 directly in your bank account.
                        </p>
                        <button 
                            onClick={onStartJourney}
                            className="bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300"
                        >
                            Apply Now
                        </button>
                    </div>
                )}
                 <div className="bg-white rounded-2xl shadow-sm p-4 mt-4">
                    <button className="w-full flex justify-between items-center text-left">
                        <h3 className="font-semibold text-gray-800 text-sm">View Repayment Schedule</h3>
                        <ChevronRightIcon className="w-5 h-5 text-gray-500" />
                    </button>
                 </div>
            </main>
        </div>
    );
};

export default CashScreen;