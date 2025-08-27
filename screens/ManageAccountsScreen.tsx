import React from 'react';
import { ArrowLeftIcon, BankIcon, HelpIcon, UserIcon, ChevronRightIcon } from '../constants/icons';

const connectedAccounts = [
    { name: 'Punjab National Bank', number: 'xx 1019', logo: 'https://logo.clearbit.com/pnbindia.in' },
    { name: 'Federal Bank', number: 'xx 9147', logo: 'https://logo.clearbit.com/federalbank.co.in' },
    { name: 'IndusInd Bank', number: 'xx 8358', logo: 'https://logo.clearbit.com/indusind.com' },
];

const ManageAccountsScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    return (
        <div className="h-full flex flex-col bg-gray-100">
             <header className="p-4 flex items-center justify-between sticky top-0 bg-gray-100 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="font-bold text-lg text-gray-800">Manage Accounts</h1>
                <div className="w-6"></div>
            </header>

            <main className="flex-grow overflow-y-auto px-4 pb-4 space-y-5">
                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-2xl flex justify-between items-center">
                    <div>
                        <p className="font-semibold text-sm">money-wiser with FindiBankit</p>
                        <button className="text-sm bg-secondary text-white font-semibold px-4 py-1.5 rounded-lg mt-2">Invite Now</button>
                    </div>
                    <div className="w-16 h-16">
                        {/* Placeholder for graphic */}
                    </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-4">
                     <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Manage</h2>
                     <div className="divide-y divide-gray-100">
                        <button className="w-full flex items-center text-left py-3">
                           <BankIcon className="w-6 h-6 text-gray-600 mr-4" />
                           <span className="flex-grow font-semibold text-sm">Bank Accounts</span>
                           <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </button>
                         <button className="w-full flex items-center text-left py-3">
                           <HelpIcon className="w-6 h-6 text-gray-600 mr-4" />
                           <span className="flex-grow font-semibold text-sm">Help & FAQs</span>
                           <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </button>
                         <button className="w-full flex items-center text-left py-3">
                           <UserIcon className="w-6 h-6 text-gray-600 mr-4" />
                           <span className="flex-grow font-semibold text-sm">Your Details</span>
                           <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                        </button>
                     </div>
                </div>

                <div className="text-center py-6">
                    <h3 className="font-bold text-base">Your Data is</h3>
                    <h3 className="font-bold text-base text-green-600">Safe with us</h3>
                    <p className="text-xs text-gray-500 mt-2">Powered by</p>
                    <p className="text-xs text-gray-500">RBI licensed Account Aggregators</p>
                </div>
            </main>
        </div>
    )
}

export default ManageAccountsScreen;