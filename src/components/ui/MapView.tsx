'use client';

import { Order } from '@/app/orders/page';
import BookstoreIcon from '@/components/icons/BookstoreIcon';
import DeliveryTruckIcon from '@/components/icons/DeliveryTruckIcon';
import HouseIcon from '@/components/icons/HouseIcon';

interface MapViewProps {
  order: Order;
}

export default function MapView({ order }: MapViewProps) {
  return (
    <div className="bg-white rounded-2xl p-8 h-full relative overflow-hidden min-h-[600px]">
      {/* Map Grid Background */}
      <div className="absolute inset-0 bg-primary-light">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#B8DBFF"
                strokeWidth="1.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Map Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="relative w-full h-full max-w-5xl">
          {/* Route Path - SVG overlay */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1000 700"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Dashed route path - follows the grid lines */}
            <path
              d="M 150 550 L 250 550 L 250 450 L 600 450 L 600 500 L 750 500"
              fill="none"
              stroke="#04235C"
              strokeWidth="12"
              strokeDasharray="25 15"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Icons positioned along the route */}
          {/* Bookstore (origin) - bottom left */}
          <div className="absolute bottom-[20%] left-[12%] w-20 h-20">
            <BookstoreIcon />
          </div>

          {/* Delivery Truck - middle right */}
          <div className="absolute top-[38%] left-[58%] w-24 h-24">
            <DeliveryTruckIcon />
          </div>

          {/* House (destination) - top right */}
          <div className="absolute top-[20%] right-[10%] w-20 h-20">
            <HouseIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

