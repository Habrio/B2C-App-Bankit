import React from 'react';

export enum Screen {
    Home = 'Home',
    Wallet = 'Wallet',
    Transactions = 'Transactions',
    More = 'More',
    MyGiftCards = 'My Gift Cards',
    Faq = 'FAQ',
    WalletHistory = 'Wallet History',
    GiftCardStore = 'Gift Card Store',
    BillPay = 'Bill Pay',
    ConnectedBanking = 'Connected Banking',
    Cash = 'Cash',
    Cashflow = 'Cashflow',
    Highlights = 'Highlights',
    ManageAccounts = 'Manage Accounts',
    StatementScreen = 'Statement Screen',
}

export interface Service {
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    tag?: string;
    tagColor?: string;
    screen?: Screen;
    onClick?: () => void;
}

export interface ServiceCategory {
    title: string;
    services: Service[];
    actionText?: string;
}

export interface GiftCardBrand {
    id: string;
    name: string;
    logo: string;
    category: 'Shopping' | 'Food' | 'Travel' | 'Entertainment' | 'Top Brands';
    discount: number;
    denominations: number[];
    cardImage: string;
    redemptionSteps: string[];
    terms: string[];
    dealImage?: string;
}

export interface PurchasedGiftCard {
    id: string;
    brand: GiftCardBrand;
    amount: number;
    purchaseDate: string;
    code: string;
    pin: string;
}

export interface WalletTransaction {
    id: string;
    type: 'added' | 'paid';
    description: string;
    amount: number;
    timestamp: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface CashEmiTransaction {
    id: string;
    amount: number;
    paidOn: string;
    isLate: boolean;
}