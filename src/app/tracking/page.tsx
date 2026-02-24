'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, Package, Loader2, MapPinOff } from 'lucide-react';
import Link from 'next/link';
import OrderCard from '@/components/ui/OrderCard';
import MapView from '@/components/ui/MapView';
import BookstoreIcon from '@/components/icons/BookstoreIcon';
import HouseIcon from '@/components/icons/HouseIcon';

const API_BASE = 'http://localhost:8080';

export interface Order {
  id: string;
  status: 'processing' | 'delivering' | 'completed';
  items: number;
  price: number;
  store: string;
  city: string;
  postalCode: string;
}

export interface TrackingData {
  id: string;
  status: string;
  from: { label: string; lat: number; lng: number };
  to: { label: string; lat: number; lng: number };
  driver: { lat: number; lng: number };
  etaMinutes: number;
  progress: number;
  route: { lat: number; lng: number }[];
}

function normalizeStatus(status: string): Order['status'] {
  const s = status.toLowerCase();
  if (s === 'delivering') return 'delivering';
  if (s === 'completed') return 'completed';
  return 'processing';
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [tracking, setTracking] = useState<TrackingData | null>(null);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingTracking, setLoadingTracking] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const [trackingFailed, setTrackingFailed] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch(`${API_BASE}/api/orders`);
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        if (data.code !== 0) throw new Error(data.message || 'API error');

        const mapped: Order[] = (data.orders ?? []).map(
          (o: Record<string, unknown>) => ({
            id: o.id as string,
            status: normalizeStatus(o.status as string),
            items: o.items as number,
            price: o.price as number,
            store: o.store as string,
            city: o.city as string,
            postalCode: o.postalCode as string,
          }),
        );

        setOrders(mapped);

        const delivering = mapped.find((o) => o.status === 'delivering');
        if (delivering) setSelectedOrderId(delivering.id);
      } catch (err) {
        setOrdersError(
          err instanceof Error ? err.message : 'Failed to load orders',
        );
      } finally {
        setLoadingOrders(false);
      }
    }

    fetchOrders();
  }, []);

  const fetchTracking = useCallback(async (orderId: string) => {
    setLoadingTracking(true);
    setTracking(null);
    setTrackingFailed(false);
    try {
      const res = await fetch(`${API_BASE}/api/orders/${orderId}/tracking`);
      if (!res.ok) throw new Error('Not available');
      const data = await res.json();
      if (data.code !== 0) throw new Error('Not available');

      setTracking({
        id: data.id,
        status: data.status,
        from: data.from,
        to: data.to,
        driver: data.driver,
        etaMinutes: data.etaMinutes,
        progress: data.progress,
        route: data.route ?? [],
      });
    } catch {
      setTracking(null);
      setTrackingFailed(true);
    } finally {
      setLoadingTracking(false);
    }
  }, []);

  useEffect(() => {
    if (selectedOrderId) fetchTracking(selectedOrderId);
  }, [selectedOrderId, fetchTracking]);

  const rightPanel = (() => {
    if (selectedOrderId && loadingTracking) {
      return (
        <div className="bg-white rounded-2xl p-12 h-full flex flex-col items-center justify-center min-h-[600px]">
          <Loader2 className="w-12 h-12 text-primary-dark animate-spin mb-4" />
          <p className="text-lg font-semibold text-primary-dark">
            Loading tracking…
          </p>
        </div>
      );
    }

    if (selectedOrderId && tracking) {
      return <MapView tracking={tracking} />;
    }

    if (selectedOrderId && trackingFailed) {
      return (
        <div className="bg-white rounded-2xl p-12 h-full flex flex-col items-center justify-center relative overflow-hidden min-h-[600px]">
          <MapPinOff className="w-20 h-20 text-secondary-typography mb-4" />
          <p className="text-2xl font-bold text-primary-dark mb-2">
            Tracking not available
          </p>
          <p className="text-secondary-typography text-center max-w-sm">
            Live tracking data is not available for this order yet. Check back
            later.
          </p>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-2xl p-12 h-full flex flex-col items-center justify-center relative overflow-hidden min-h-[600px]">
        <div className="absolute bottom-10 left-10 opacity-10">
          <BookstoreIcon />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10">
          <HouseIcon />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="w-32 h-32 text-primary-dark">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <line
                x1="70"
                y1="70"
                x2="85"
                y2="85"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <p className="text-2xl font-bold text-primary-dark">
            Select an order to preview
          </p>
        </div>
      </div>
    );
  })();

  return (
    <div className="container justify-center items-center pt-0 mx-auto px-4 md:px-8">
      <div className="flex flex-col md:flex-col lg:flex-row gap-6 h-full">
        {/* Left Panel – Orders List */}
        <div className="w-full lg:w-1/3 flex flex-col gap-2 md:pl-2">
          <Link
            href="/"
            className="flex items-center gap-2 bg-black text-white py-2 rounded-lg w-fit hover:bg-gray-800 transition-colors"
          >
            <ArrowLeft className="w-fit h-fit ml-3" />
            <span className="text-white text-lg font-bold mr-4">Back</span>
          </Link>

          <p className="text-[45px] font-[500] text-primary-dark font-inter">
            Orders
          </p>

          {loadingOrders ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="w-8 h-8 text-primary-dark animate-spin" />
              <p className="text-secondary-typography">Loading orders…</p>
            </div>
          ) : ordersError ? (
            <div className="rounded-2xl bg-red-50 p-6 text-center">
              <p className="text-accents-red font-semibold">{ordersError}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-2xl bg-primary-light p-6 text-center">
              <Package className="w-10 h-10 text-secondary-typography mx-auto mb-2" />
              <p className="text-secondary-typography font-medium">
                No orders found
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isSelected={selectedOrderId === order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Panel – Map / Preview */}
        <div className="w-full lg:w-2/3 flex-1 md:mt-5 lg:mt-0 mb-0 pb-0">
          {rightPanel}
        </div>
      </div>
    </div>
  );
}
