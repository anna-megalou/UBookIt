'use client';

import type { Order } from '@/app/tracking/page';

interface OrderCardProps {
  order: Order;
  isSelected?: boolean;
  onClick?: () => void;
}

const statusConfig = {
  processing: {
    label: 'Processing',
    color: '#787878',
    labelColor: '#787878',
    bgColor: 'bg-white',
    activeBgColor: 'bg-primary-dark',
  },
  delivering: {
    label: 'Delivering',
    color: '#27D7FF',
    labelColor: '#27D7FF',
    bgColor: 'bg-white',
    activeBgColor: 'bg-primary-dark',
  },
  completed: {
    label: 'Completed',
    color: '#5ADA55',
    labelColor: '#5ADA55',
    bgColor: 'bg-white',
    activeBgColor: 'bg-primary-dark',
  },
};

export default function OrderCard({
  order,
  isSelected = false,
  onClick,
}: OrderCardProps) {
  const config = statusConfig[order.status];
  const isActive = isSelected;

  const formattedPrice = new Intl.NumberFormat('el-GR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(order.price);

  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl cursor-pointer transition-all px-6 py-4
        ${isActive ? config.activeBgColor : config.bgColor}
        shadow-[0px_1px_2px_rgba(0,0,0,0.3),0px_1px_3px_1px_rgba(0,0,0,0.15)]
      `}
    >
      <div className="flex flex-row justify-between items-center gap-3">
        <div className="flex gap-2 mt-1">
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: config.color }}
          />
          <span
            className="text-sm font-semibold"
            style={{ color: config.labelColor }}
          >
            {config.label}
          </span>
        </div>
        <div
          className={`text-sm ${isActive ? 'text-gray-300' : 'text-secondary-typography'} font-bold`}
        >
          #{order.id}
        </div>
      </div>

      <div className="mt-1 flex justify-between items-start">
        <div className="flex flex-col gap-1 flex-1">
          <div
            className={`font-bold text-2xl ${isActive ? 'text-white' : 'text-secondary-dark'}`}
          >
            {order.items} {order.items === 1 ? 'Book' : 'Books'}
          </div>
          <div
            className={`text-sm ${isActive ? 'text-gray-300' : 'text-secondary-typography'}`}
          >
            {order.store} → {order.city}, {order.postalCode}
          </div>
        </div>

        <div className="flex flex-col items-end gap-1 ml-4">
          <div
            className={`font-bold text-2xl ${isActive ? 'text-white' : 'text-secondary-dark'}`}
          >
            {formattedPrice}
          </div>
        </div>
      </div>
    </div>
  );
}
