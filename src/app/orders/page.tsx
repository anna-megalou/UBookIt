'use client';

import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import OrderCard from '@/components/ui/OrderCard';
import MapView from '@/components/ui/MapView';
import BookstoreIcon from '@/components/icons/BookstoreIcon';
import HouseIcon from '@/components/icons/HouseIcon';

export interface Order {
  id: string;
  status: 'processing' | 'delivering' | 'completed';
  quantity: number;
  itemType: string;
  storeName: string;
  destination: string;
  price: string;
}

const mockOrders: Order[] = [
  {
    id: 'U44653',
    status: 'processing',
    quantity: 3,
    itemType: 'Books',
    storeName: 'Book Store Name',
    destination: 'City, Postal Code',
    price: '5€',
  },
  {
    id: 'U44653',
    status: 'delivering',
    quantity: 3,
    itemType: 'Books',
    storeName: 'Book Store Name',
    destination: 'City, Postal Code',
    price: '5€',
  },
  {
    id: 'U44653',
    status: 'completed',
    quantity: 3,
    itemType: 'Books',
    storeName: 'Book Store Name',
    destination: 'City, Postal Code',
    price: '5€',
  },
  {
    id: 'U44653',
    status: 'completed',
    quantity: 3,
    itemType: 'Books',
    storeName: 'Book Store Name',
    destination: 'City, Postal Code',
    price: '5€',
  },
];

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(
    mockOrders.find((order) => order.status === 'delivering') || null
  );

  return (
    <div className="container mx-auto py-8  pt-0">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Left Panel - Orders List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-2 mx-4">
          {/* Back Button */}
          <Link
            href="/"
            className="flex items-center gap-2  text-black bg-black text-white py-2 rounded-lg w-fit hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-fit h-fit ml-3" />
            <span className="text-white text-lg font-bold mr-4">Back</span>
          </Link>

          {/* Orders Title */}
          <p className="text-[45px] font-[500] text-primary-dark font-inter">Orders</p>

          {/* Orders List */}
          <div className="flex flex-col gap-3">
            {mockOrders.map((order, index) => (
              <OrderCard
                key={`${order.id}-${index}`}
                order={order}
                isSelected={selectedOrder?.id === order.id && selectedOrder?.status === order.status}
                onClick={() => setSelectedOrder(order)}
              />
            ))}
          </div>
        </div>

        {/* Right Panel - Map/Preview */}
        <div className="w-full lg:w-2/3 flex-1">
          {selectedOrder ? (
            <MapView order={selectedOrder} />
          ) : (
            <div className="bg-white rounded-2xl p-12 h-full flex flex-col items-center justify-center relative overflow-hidden">
              {/* Background icons */}
              <div className="absolute bottom-10 left-10 opacity-10">
                <BookstoreIcon />
              </div>
              <div className="absolute bottom-10 right-10 opacity-10">
                <HouseIcon />
              </div>
              
              {/* Main content */}
              <div className="relative z-10 flex flex-col items-center gap-6">
                <div className="w-32 h-32 text-primary-dark">
                  <svg
                    viewBox="0 0 100 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full"
                  >
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="4" fill="none" />
                    <line x1="70" y1="70" x2="85" y2="85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
                <p className="text-2xl font-bold text-primary-dark">
                  Select an order to preview
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

