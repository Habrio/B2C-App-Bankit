import React from 'react';
import { ChevronRightIcon } from '../constants/icons';

interface CardProps {
  title: string;
  actionText?: string;
  onActionClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, actionText, onActionClick, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-sm p-4 ${className}`}>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</h2>
        {actionText && (
          <button onClick={onActionClick} className="flex items-center text-sm font-light text-secondary hover:text-secondary/80">
            {actionText}
            <ChevronRightIcon className="w-4 h-4 ml-1" />
          </button>
        )}
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Card;