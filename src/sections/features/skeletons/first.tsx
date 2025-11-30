'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const World = dynamic(
  () => import('@/components/ui/world-map').then((m) => m.default),
  {
    ssr: false,
  }
);

export function SkeletonOne() {
  return (
    <div className="relative w-full h-full">
      <div className="h-[300px] w-[300px] md:w-[600px] md:h-[600px] mx-auto absolute -bottom-20 md:-bottom-60 z-20 inset-x-0">
        <World dots={[
          {
            start: {
              lat: 64.2008,
              lng: -149.4937,
            },
            end: {
              lat: 34.0522,
              lng: -118.2437,
            },
          },
          {
            start: { lat: 64.2008, lng: -149.4937 },
            end: { lat: -15.7975, lng: -47.8919 },
          },
          {
            start: { lat: -15.7975, lng: -47.8919 },
            end: { lat: 38.7223, lng: -9.1393 },
          },
          {
            start: { lat: 51.5074, lng: -0.1278 },
            end: { lat: 28.6139, lng: 77.209 },
          },
          {
            start: { lat: 28.6139, lng: 77.209 },
            end: { lat: 43.1332, lng: 131.9113 },
          },
          {
            start: { lat: 28.6139, lng: 77.209 },
            end: { lat: -1.2921, lng: 36.8219 },
          },
        ]}
        />
      </div>
    </div>
  );
}