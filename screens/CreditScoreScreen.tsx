
import React, { useState } from 'react';
import { ArrowLeftIcon, ArrowUpIcon, ShareIcon } from '../constants/icons';
import CreditScoreGauge from '../components/CreditScoreGauge';

type ScoreStatus = 'initial' | 'refreshing' | 'updated';

const CreditScoreScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [status, setStatus] = useState<ScoreStatus>('initial');
    const [score, setScore] = useState(781);

    const handleRefresh = () => {
        setStatus('refreshing');
        setTimeout(() => {
            setScore(prev => prev + 1);
            setStatus('updated');
        }, 2000);
    };

    const InitialView = () => (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex items-center justify-center p-8">
            <div className="bg-white rounded-2xl shadow-2xl p-6 text-center w-full">
                <p className="text-xs font-semibold text-gray-500">NEW REFRESH AVAILABLE</p>
                <h2 className="text-2xl font-bold text-gray-800 my-2">your credit score is stuck in the past.</h2>
                <div className="my-6 flex justify-center">
                   <CreditScoreGauge score={score} />
                </div>
                <p className="text-xs text-gray-500 mb-4">By refreshing, I agree to the T&C of TUCIBIL & consent to share my credit information with FindiBankit.</p>
                <button onClick={handleRefresh} className="w-full bg-gray-900 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2">
                    <span>Refresh now</span>
                    <ArrowLeftIcon className="w-5 h-5 transform rotate-180" />
                </button>
            </div>
        </div>
    );
    
    return (
        <div className="bg-gray-100 min-h-full relative">
            <header className="p-4 pt-6 flex items-center justify-between sticky top-0 bg-gray-100 z-10">
                <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-gray-200">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="font-semibold text-gray-800">Hey Ashish,</h1>
                <div className="w-6" />
            </header>

            <main className="p-4 text-center">
                <p className="text-2xl text-gray-800 leading-tight">your score is</p>
                <p className="text-3xl font-bold text-gray-800">
                    {status === 'updated' ? 'in a good place' : '...'}
                </p>

                <div className="my-6 flex justify-center">
                    <CreditScoreGauge score={score} status={status} change={1} />
                </div>
                
                {status === 'updated' &&
                    <>
                        <p className="text-xl font-bold text-gray-800">your score has increased by 1 point</p>
                        <p className="text-xs text-gray-500 font-semibold mt-1">LAST UPDATED ON 26 AUG 2025</p>
                    </>
                }

                <button 
                    onClick={() => { if(status === 'updated') alert('Sharing score...'); }}
                    disabled={status !== 'updated'}
                    className="w-full max-w-xs mx-auto mt-6 bg-gray-900 text-white font-bold py-3 rounded-lg flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:text-gray-500"
                >
                    {status === 'refreshing' && <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>}
                    <span>{status === 'refreshing' ? 'refreshing...' : 'Share your score'}</span>
                    {status !== 'refreshing' && <ShareIcon className="w-5 h-5" />}
                </button>

                 <div className="mt-12">
                    <div className="relative h-40">
                         <div className="absolute inset-x-0 top-0 h-full grid grid-cols-6">
                            {[...Array(6)].map((_, i) => <div key={i} className="border-r border-gray-200 last:border-r-0"></div>)}
                         </div>
                         <div className="absolute inset-y-0 left-0 w-full grid grid-rows-4">
                            {[...Array(4)].map((_, i) => <div key={i} className="border-b border-gray-200 last:border-b-0"></div>)}
                         </div>
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                           <polyline points="20,50 40,60 60,55 80,45" fill="none" stroke="#a78bfa" strokeWidth="1" />
                           <circle cx="80" cy="45" r="2" fill="#a78bfa" />
                        </svg>
                        <div className="absolute" style={{left: '80%', top: '45%', transform: 'translate(-50%, -120%)'}}>
                            <div className="bg-white p-1 rounded-md shadow-lg text-xs font-semibold">
                                <div className="flex items-center text-green-500">
                                   <ArrowUpIcon className="w-3 h-3 mr-1 stroke-2"/>
                                   <span>782</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1 px-2">
                        <span>MAR</span><span>APR</span><span>MAY</span><span>JUN</span><span>JUL</span><span>AUG</span><span>SEP</span>
                    </div>
                </div>

            </main>
            {status !== 'updated' && <InitialView />}
        </div>
    );
};

export default CreditScoreScreen;
