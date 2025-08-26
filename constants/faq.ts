interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  category: string;
  items: FaqItem[];
}

export const faqData: FaqSection[] = [
  {
    category: 'Wallet Basics',
    items: [
      {
        question: 'What is FindiBankit wallet?',
        answer: 'FindiBankit Wallet is a digital prepaid payment instrument (PPI) that allows you to store money and make quick payments for various services like recharges, bill payments, and online shopping.',
      },
      {
        question: 'What are the perks of using FindiBankit wallet?',
        answer: 'Benefits include one-tap payments, exclusive offers and cashback, secure transactions, and the ability to manage your spending easily without exposing your bank account details for every transaction.',
      },
       {
        question: 'Is FindiBankit wallet a paid feature?',
        answer: 'No, creating and using a FindiBankit wallet is completely free. There are no charges for adding money or making payments.',
      },
    ],
  },
  {
    category: 'KYC & Limits',
    items: [
      {
        question: 'What is a minimum KYC wallet?',
        answer: 'A minimum KYC wallet is created by providing basic details like your name, date of birth, and a government ID number (like PAN). It has certain limitations, such as a maximum balance of ₹10,000 and restrictions on transferring money to other wallets or bank accounts.',
      },
      {
        question: 'How can I upgrade to a Full KYC wallet?',
        answer: 'You can upgrade to a Full KYC wallet by completing your e-KYC using your Aadhaar number and OTP. A Full KYC wallet increases your balance limit to ₹2,00,000 and allows you to transfer money to banks and other users.',
      },
      {
        question: 'Is KYC needed to create a wallet account?',
        answer: 'Yes, as per RBI guidelines, completing at least minimum KYC is mandatory to activate and use any digital wallet in India.',
      },
    ],
  },
  {
    category: 'Payments & Adding Money',
    items: [
        {
            question: 'Which instruments can I use to add money to my wallet?',
            answer: 'You can add money to your FindiBankit wallet using various methods, including UPI, debit cards, credit cards, and net banking from any Indian bank.',
        },
        {
            question: 'Do I need to authenticate Wallet payments with a PIN or OTP?',
            answer: 'For added security, wallet payments may require your app lock PIN or biometric authentication. High-value transactions might also require an OTP sent to your registered mobile number.',
        },
    ],
  },
   {
    category: 'Account Management',
    items: [
        {
            question: 'How do I set up my FindiBankit wallet?',
            answer: 'Simply navigate to the Wallet section in the app and follow the on-screen instructions to complete your minimum KYC. Once verified, your wallet will be activated instantly.',
        },
        {
            question: 'Can I close my FindiBankit wallet account?',
            answer: 'Yes, you can request to close your wallet from the Wallet settings. You will be prompted to transfer any remaining balance to your bank account before the closure is processed.',
        },
    ],
  },
];
