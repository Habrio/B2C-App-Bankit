import React from 'react';
import { Service } from '../types';

interface ServiceIconProps {
  service: Service;
  onClick?: () => void;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ service, onClick }) => {
  const IconComponent = service.icon;
  return (
    <button onClick={onClick} className="flex flex-col items-center justify-start text-center w-1/4 mb-4 relative group" disabled={!onClick}>
      {service.tag && (
        <span className={`absolute -top-1.5 right-1 text-[8px] font-bold px-1.5 py-0.5 rounded-full ${service.tagColor || 'bg-primary/10 text-primary'}`}>
            {service.tag}
        </span>
      )}
      <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mb-2 shadow-sm border border-primary/20 group-hover:bg-primary/20 transition-colors">
        <IconComponent className="w-7 h-7 text-primary" />
      </div>
      <p className="text-xs text-gray-700 leading-tight font-medium h-8">{service.name}</p>
    </button>
  );
};

export default ServiceIcon;
