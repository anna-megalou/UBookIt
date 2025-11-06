'use client';

import Image from 'next/image';
import { Order } from '@/app/tracking/page';
import { withBasePath } from '@/lib/utils';

interface MapViewProps {
  order: Order;
}

export default function MapView({ order }: MapViewProps) {
  return (
    <div className="bg-white rounded-2xl mx-8 px-8 h-full relative overflow-hidden min-h-[600px]">
      {/* Map Background Image */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Image
          src={withBasePath('/assets/images/map.png')}
          alt="Map"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Map Content - Icons positioned on the map */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Bookstore (origin) - bottom left */}
          <div className="absolute bottom-[2%] left-[2%] w-50 h-50 z-20">
            <Image
              src={withBasePath('/assets/images/bookstore.png')}
              alt="Bookstore"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Delivery Truck - middle right */}
          <div className="absolute top-[26%] left-[46%] w-50 h-50 z-20">
            <Image
              src={withBasePath('/assets/images/truck.png')}
              alt="Delivery Truck"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>

          {/* House (destination) - top right */}
          <div className="absolute top-[12%] right-[2%] w-30 h-30 z-20">
            <Image
              src={withBasePath('/assets/images/house.png')}
              alt="House"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

