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
    CreditScore = 'Credit Score',
    CashAtHome = 'Cash At Home',
    CashAtHomeHistory = 'Cash At Home History',
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

export interface CreditCard {
  id: string;
  bankName: string;
  cardNetwork: 'Visa' | 'Mastercard' | 'RuPay' | 'Amex';
  lastFourDigits: string;
  cardHolderName: string;
  dueAmount: number;
  status: 'paid' | 'no_dues' | 'due';
  cardArt: {
    background: string;
    logoUrl: string;
    textColor: string;
    logoClass?: string;
  };
}

export interface CashAtHomeOrder {
  id: string;
  amount: number;
  fee: number;
  totalDebited: number;
  address: string;
  status: 'pending' | 'out_for_delivery' | 'delivered';
  orderDate: string;
  deliveryDate?: string;
  deliveryAgent?: { name: string; photoUrl: string; };
}
