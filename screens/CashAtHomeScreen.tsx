import React from 'react';
import { ArrowLeftIcon, ChevronRightIcon, HomeIcon, UserIcon } from '../constants/icons';
import { CashAtHomeOrder } from '../types';

interface CashAtHomeScreenProps {
    onBack: () => void;
    orders: CashAtHomeOrder[];
    onNewOrder: () => void;
}

const OrderStatusPill: React.FC<{ status: CashAtHomeOrder['status'] }> = ({ status }) => {
    const statusMap = {
        pending: { text: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
        out_for_delivery: { text: 'Out for Delivery', color: 'bg-blue-100 text-blue-800' },
        delivered: { text: 'Delivered', color: 'bg-green-100 text-green-800' },
    };
    const { text, color } = statusMap[status];
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${color}`}>{text}</span>;
}

const ActiveOrderCard: React.FC<{ order: CashAtHomeOrder }> = ({ order }) => (
    <div className="bg-white rounded-2xl shadow-sm p-4 text-left space-y-4">
        <div className="flex justify-between items-start">
            <div>
                <p className="text-2xl font-bold">₹{order.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">Ordered on {new Date(order.orderDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</p>
            </div>
            <OrderStatusPill status={order.status} />
        </div>
        {order.status === 'out_for_delivery' && order.deliveryAgent && (
            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <img src={order.deliveryAgent.photoUrl} className="w-10 h-10 rounded-full mr-3" alt={order.deliveryAgent.name} />
                <div>
                    <p className="text-sm font-semibold">{order.deliveryAgent.name}</p>
                    <p className="text-xs text-gray-500">is on the way</p>
                </div>
            </div>
        )}
        <div className="flex items-start text-sm">
             <HomeIcon className="w-5 h-5 text-gray-500 mr-3 mt-0.5 flex-shrink-0" />
            <p className="text-gray-600">{order.address}</p>
        </div>
    </div>
);


const CashAtHomeScreen: React.FC<CashAtHomeScreenProps> = ({ onBack, orders, onNewOrder }) => {
    const activeOrders = orders.filter(o => o.status !== 'delivered');
    return (
        <div className="h-full flex flex-col bg-gray-100">
            <header className="p-4 pt-6 bg-white flex-shrink-0 shadow-sm z-10 sticky top-0 flex items-center space-x-4">
                <button onClick={onBack} className="p-1 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                <h1 className="text-lg font-bold text-gray-800">Cash at Home</h1>
            </header>
            <main className="flex-grow overflow-y-auto p-4 space-y-5">
                {activeOrders.length > 0 ? (
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider px-2">Active Orders</h3>
                      {activeOrders.map(order => <ActiveOrderCard key={order.id} order={order} />)}
                    </div>
                ) : (
                    <div className="text-center pt-16">
                         <h2 className="text-xl font-bold text-gray-800">No Active Orders</h2>
                        <p className="text-gray-500 mt-2 mb-8 max-w-xs mx-auto text-sm">
                            Need cash? Get it delivered to your doorstep.
                        </p>
                    </div>
                )}
                <div className="pt-4">
                    <button 
                        onClick={onNewOrder}
                        className="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg"
                    >
                        Request New Cash Delivery
                    </button>
                </div>
            </main>
        </div>
    );
};

export default CashAtHomeScreen;