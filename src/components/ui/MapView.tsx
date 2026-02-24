'use client';

import dynamic from 'next/dynamic';
import { Loader2 } from 'lucide-react';
import type { TrackingData } from '@/app/tracking/page';

const MapContent = dynamic(() => import('./MapContent'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full min-h-[400px] md:min-h-[600px]">
      <Loader2 className="w-8 h-8 text-primary-dark animate-spin" />
    </div>
  ),
});

interface MapViewProps {
  tracking: TrackingData;
}

export default function MapView({ tracking }: MapViewProps) {
  return (
    <div className="bg-white rounded-2xl h-full relative overflow-hidden min-h-[400px] md:min-h-[600px]">
      <MapContent tracking={tracking} />
    </div>
  );
}
