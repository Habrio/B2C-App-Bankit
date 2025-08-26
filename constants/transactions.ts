import { WalletTransaction } from '../types';
import { UpiIcon, StoreIcon } from './icons';

export const walletTransactions: WalletTransaction[] = [
    {
        id: '1',
        type: 'added',
        description: 'Balance added via UPI',
        amount: 100.00,
        timestamp: new Date('2025-07-06T12:53:00').toISOString(),
        icon: UpiIcon
    },
    {
        id: '2',
        type: 'paid',
        description: 'Paid to Grocery Store',
        amount: 350.50,
        timestamp: new Date('2025-07-05T18:22:00').toISOString(),
        icon: StoreIcon
    },
    {
        id: '3',
        type: 'added',
        description: 'Balance added via UPI',
        amount: 500.00,
        timestamp: new Date('2025-07-05T10:15:00').toISOString(),
        icon: UpiIcon
    },
     {
        id: '4',
        type: 'paid',
        description: 'Paid for Mobile Recharge',
        amount: 99.00,
        timestamp: new Date('2025-07-04T09:05:00').toISOString(),
        icon: UpiIcon
    },
];
