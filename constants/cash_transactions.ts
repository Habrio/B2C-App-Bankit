import { CashEmiTransaction } from '../types';

export const mockCashEmiTransactions: CashEmiTransaction[] = [
    {
        id: 'emi1',
        amount: 14575,
        paidOn: new Date('2025-10-03T10:00:00').toISOString(),
        isLate: false,
    },
    {
        id: 'emi2',
        amount: 14575,
        paidOn: new Date('2025-11-03T10:00:00').toISOString(),
        isLate: false,
    },
    {
        id: 'emi3',
        amount: 14575,
        paidOn: new Date('2025-12-05T10:00:00').toISOString(),
        isLate: true,
    },
];
