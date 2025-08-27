
import { ServiceCategory, Screen } from '../types';
import {
  GiftIcon, CashIcon
} from './icons';

export const serviceData: ServiceCategory[] = [
  {
    title: 'Payments & More',
    services: [
      { name: 'Cash', icon: CashIcon, screen: Screen.Cash },
      { name: 'Gift Card', icon: GiftIcon, screen: Screen.GiftCardStore },
      { name: 'My Gift Cards', icon: GiftIcon, screen: Screen.MyGiftCards },
    ],
  }
];
