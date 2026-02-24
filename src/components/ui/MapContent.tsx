'use client';

import { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { TrackingData } from '@/app/tracking/page';
import 'leaflet/dist/leaflet.css';

function createIcon(emoji: string, bg: string) {
  return L.divIcon({
    className: '',
    html: `<div style="background:${bg};width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);font-size:18px;">${emoji}</div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

function FitBounds({ tracking }: { tracking: TrackingData }) {
  const map = useMap();

  useEffect(() => {
    const pts: L.LatLngExpression[] = [
      [tracking.from.lat, tracking.from.lng],
      [tracking.to.lat, tracking.to.lng],
      [tracking.driver.lat, tracking.driver.lng],
    ];
    map.fitBounds(L.latLngBounds(pts), { padding: [60, 60] });
  }, [map, tracking]);

  return null;
}

export default function MapContent({ tracking }: { tracking: TrackingData }) {
  const originIcon = useMemo(() => createIcon('📚', '#04235C'), []);
  const destIcon = useMemo(() => createIcon('🏠', '#27C840'), []);
  const driverIcon = useMemo(() => createIcon('🚚', '#27D7FF'), []);

  const route: L.LatLngExpression[] = tracking.route.map((p) => [p.lat, p.lng]);

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[600px]">
      <MapContainer
        center={[tracking.driver.lat, tracking.driver.lng]}
        zoom={14}
        className="w-full h-full min-h-[400px] md:min-h-[600px] rounded-2xl z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds tracking={tracking} />

        <Marker
          position={[tracking.from.lat, tracking.from.lng]}
          icon={originIcon}
        />
        <Marker
          position={[tracking.to.lat, tracking.to.lng]}
          icon={destIcon}
        />
        <Marker
          position={[tracking.driver.lat, tracking.driver.lng]}
          icon={driverIcon}
        />

        {route.length > 1 && (
          <Polyline
            positions={route}
            pathOptions={{
              color: '#04235C',
              weight: 4,
              opacity: 0.7,
              dashArray: '10 6',
            }}
          />
        )}
      </MapContainer>

      {/* ETA & progress overlay */}
      <div className="absolute bottom-4 left-4 right-4 z-[1000]">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-5 border border-secondary-border">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-xs font-medium text-secondary-typography uppercase tracking-wide">
                  From
                </span>
                <span className="text-sm font-bold text-primary-dark">
                  {tracking.from.label}
                </span>
              </div>
              <span className="text-secondary-typography mx-1">→</span>
              <div className="flex flex-col">
                <span className="text-xs font-medium text-secondary-typography uppercase tracking-wide">
                  To
                </span>
                <span className="text-sm font-bold text-primary-dark">
                  {tracking.to.label}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-xs font-medium text-secondary-typography uppercase tracking-wide">
                ETA
              </span>
              <span className="text-lg font-bold text-primary-dark">
                {tracking.etaMinutes} min
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-secondary-border rounded-full h-2.5">
            <div
              className="h-2.5 rounded-full transition-all duration-500"
              style={{
                width: `${tracking.progress}%`,
                background: 'linear-gradient(90deg, #04235C, #27D7FF)',
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-secondary-typography">
              {tracking.progress}% delivered
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: '#27D7FF' }}
            >
              {tracking.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
