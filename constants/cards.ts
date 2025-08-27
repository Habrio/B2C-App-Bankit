
import { CreditCard } from '../types';

export const creditCards: CreditCard[] = [
  {
    id: 'hdfc-1',
    bankName: 'HDFC Bank',
    cardNetwork: 'RuPay',
    lastFourDigits: '7212',
    cardHolderName: 'ASHISH DABAS',
    dueAmount: 13201.00,
    status: 'paid',
    cardArt: {
      background: 'linear-gradient(to bottom right, #1e3a8a, #3b82f6)',
      logoUrl: 'https://cdn.freelogovectors.net/wp-content/uploads/2023/09/hdfc-bank-logo-freelogovectors.net_.png',
      textColor: 'text-white',
      logoClass: 'bg-white p-1 rounded-md'
    },
  },
  {
    id: 'amex-1',
    bankName: 'American Express',
    cardNetwork: 'Amex',
    lastFourDigits: '3000',
    cardHolderName: 'ASHISH DABAS',
    dueAmount: 4099.98,
    status: 'paid',
    cardArt: {
      background: 'linear-gradient(to bottom right, #e5e7eb, #d1d5db)',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/American_Express_logo_%282018%29.svg/2048px-American_Express_logo_%282018%29.svg.png',
      textColor: 'text-gray-800'
    },
  },
  {
    id: 'amazon-1',
    bankName: 'Amazon Pay',
    cardNetwork: 'Visa',
    lastFourDigits: '3008',
    cardHolderName: 'ASHISH DABAS',
    dueAmount: -486.42,
    status: 'no_dues',
    cardArt: {
      background: 'linear-gradient(to bottom right, #1f2937, #374151)',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Amazon_Pay_logo.svg',
      textColor: 'text-white',
    },
  },
];
