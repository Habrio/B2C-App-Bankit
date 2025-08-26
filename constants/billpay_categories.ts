import {
    MobileIcon, MobilePostpaidIcon, DthIcon, BroadbandIcon, LandlineIcon, CableTvIcon,
    ElectricityIcon, LpgIcon, PipedGasIcon, WaterIcon,
    FastagIcon, InsuranceIcon, LoanIcon, SubscriptionsIcon, ApartmentsIcon, HospitalsIcon, ClubsIcon, DonationIcon,
} from './icons';

interface BillService {
    name: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface BillCategory {
    title: string;
    services: BillService[];
}

export const billPayCategories: BillCategory[] = [
    {
        title: 'TELECOM BILLS',
        services: [
            { name: 'Mobile Recharge', icon: MobileIcon },
            { name: 'Mobile Postpaid', icon: MobilePostpaidIcon },
            { name: 'DTH', icon: DthIcon },
            { name: 'Broadband', icon: BroadbandIcon },
            { name: 'Landline', icon: LandlineIcon },
            { name: 'Cable TV', icon: CableTvIcon },
        ]
    },
    {
        title: 'UTILITY BILLS',
        services: [
            { name: 'Electricity', icon: ElectricityIcon },
            { name: 'LPG Cylinder', icon: LpgIcon },
            { name: 'Piped Gas', icon: PipedGasIcon },
            { name: 'Water', icon: WaterIcon },
        ]
    },
    {
        title: 'OTHER BILLS',
        services: [
            { name: 'Fastag Recharge', icon: FastagIcon },
            { name: 'Insurance Premium', icon: InsuranceIcon },
            { name: 'Loan Repayment', icon: LoanIcon },
            { name: 'Subscriptions', icon: SubscriptionsIcon },
            { name: 'Apartments', icon: ApartmentsIcon },
            { name: 'Hospitals', icon: HospitalsIcon },
            { name: 'Clubs & Associations', icon: ClubsIcon },
            { name: 'Donation', icon: DonationIcon },
        ]
    }
];
