import React from 'react';
import { ArrowLeftIcon } from '../constants/icons';
import FaqItem from '../components/FaqItem';
import { faqData } from '../constants/faq';

interface FaqScreenProps {
  onBack: () => void;
}

const FaqScreen: React.FC<FaqScreenProps> = ({ onBack }) => {
  return (
    <div className="bg-white h-full flex flex-col">
      <header className="p-4 pt-6 bg-white flex-shrink-0 shadow-sm z-10 sticky top-0 flex items-center space-x-4">
        <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-100">
            <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">FAQs</h1>
      </header>
      <div className="flex-grow overflow-y-auto p-4">
        {faqData.map(section => (
            <div key={section.category} className="mb-8">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{section.category}</h2>
                <div className="bg-white rounded-lg">
                    {section.items.map(item => (
                        <FaqItem key={item.question} question={item.question} answer={item.answer} />
                    ))}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default FaqScreen;