import React from 'react';
import Card from '../components/Card';
import ServiceIcon from '../components/ServiceIcon';
import { serviceData } from '../constants/services';
import { ServiceCategory, Screen } from '../types';

interface MoreScreenProps {
  onNavigate: (screen: Screen) => void;
}

const MoreScreen: React.FC<MoreScreenProps> = ({ onNavigate }) => {
  return (
    <>
      <header className="p-4 pt-6 bg-white flex-shrink-0 shadow-sm z-10 sticky top-0">
        <h1 className="text-xl font-bold text-center text-gray-800">More</h1>
      </header>
      <div className="p-4 space-y-4">
        {serviceData.map((category: ServiceCategory) => (
          <Card key={category.title} title={category.title} actionText={category.actionText}>
            <div className="flex flex-wrap">
              {category.services.map((service) => (
                <ServiceIcon 
                  key={service.name} 
                  service={service} 
                  onClick={service.screen ? () => onNavigate(service.screen) : undefined}
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default MoreScreen;
