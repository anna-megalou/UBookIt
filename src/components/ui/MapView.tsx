'use client';

import Image from 'next/image';
import { Order } from '@/app/tracking/page';
import { withBasePath } from '@/lib/utils';

interface MapViewProps {
  order: Order;
}

export default function MapView({ order }: MapViewProps) {
  return (
    <div className="bg-white rounded-2xl mx-0 md:mx-8 px-4 md:px-8 h-full relative overflow-hidden min-h-[400px] md:min-h-[600px]">
      {/* Map Background Image */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <Image
          src={withBasePath('/assets/images/map.png')}
          alt="Map"
          fill
          className="object-cover map-image-1271"
          priority
        />
      </div>

      {/* Map Content - Icons positioned on the map */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Bookstore (origin) - bottom left */}
          <div className="absolute bottom-[8%] left-[2%] w-40 h-40 md:w-20 md:h-20 lg:w-40 lg:h-40 z-20 lg:bottom-[8%] xl:bottom-[8%]">
            <Image
              src={withBasePath('/assets/images/bookstore.png')}
              alt="Bookstore"
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Delivery Truck - middle right */}
          <div className="absolute top-[26%] left-[46%] lg:w-50 lg:h-50 md:left-[50%] lg:left-[46%] xl:left-[46%] z-20 md:top-[26%] lg:top-[26%] xl:top-[26%]">
            <Image
              src={withBasePath('/assets/images/truck.png')}
              alt="Delivery Truck"
              width={96}
              height={96}
              className="w-full h-full object-contain"
            />
          </div>

          {/* House (destination) - top right */}
          <div className="absolute top-[12%] right-[2%] w-40 h-40 md:w-20 md:h-20 lg:w-30 lg:h-30 z-20">
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

