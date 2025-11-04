'use client';

import { Order } from '@/app/orders/page';

interface OrderCardProps {
  order: Order;
  isSelected?: boolean;
  onClick?: () => void;
}

const statusConfig = {
 
  processing: {
    label: 'Processing',
    color: '#99AAC1',
    bgColor: 'bg-white',
    textColor: 'text-secondary-typography',
    activeBgColor: 'bg-white',
  },
  delivering: {
    label: 'Delivering',
    color: '#80BFFF',
    bgColor: 'bg-primary-dark',
    textColor: 'text-white',
    activeBgColor: 'bg-primary-dark',
  },
  completed: {
    label: 'Completed',
    color: '#27C840',
    bgColor: 'bg-white',
    textColor: 'text-secondary-typography',
    activeBgColor: 'bg-gray-100',
  },
};

// /* Frame 45 */

export default function OrderCard({ order, isSelected = false, onClick }: OrderCardProps) {
  const config = statusConfig[order.status];
  // Delivering orders are always highlighted with dark blue background
  // Other orders remain with light gray background even when selected
  const isActive = order.status === 'delivering';

  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl cursor-pointer transition-all px-6 py-4
        ${isActive ? config.activeBgColor : config.bgColor}
        shadow-[0px_1px_2px_rgba(0,0,0,0.3),0px_1px_3px_1px_rgba(0,0,0,0.15)]
      `}
    >
      <div className="flex items-start gap-3">
        {/* Status Indicator */}
        <div className="flex items-center gap-2 mt-1">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: config.color }}
          />
          <span className={`text-sm font-semibold ${isActive ? 'text-white' : 'text-secondary-typography'}`}>
            {config.label}
          </span>
        </div>
      </div>

      <div className="mt-3 flex justify-between items-start">
        <div className="flex flex-col gap-1 flex-1">
          <div className={`font-bold text-lg ${isActive ? 'text-white' : 'text-secondary-dark'}`}>
            {order.quantity} {order.itemType}
          </div>
          <div className={`text-sm ${isActive ? 'text-gray-300' : 'text-secondary-typography'}`}>
            {order.storeName} → {order.destination}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 ml-4">
          <div className={`text-sm ${isActive ? 'text-gray-300' : 'text-secondary-typography'}`}>
            #{order.id}
          </div>
          <div className={`font-bold text-lg ${isActive ? 'text-white' : 'text-secondary-dark'}`}>
            {order.price}
          </div>
        </div>
      </div>
    </div>
  );
}

