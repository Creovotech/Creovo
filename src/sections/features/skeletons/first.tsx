'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const Globe = dynamic(
  () => import('@/components/ui/globe').then((m) => m.Globe),
  {
    ssr: false,
  }
);

export function SkeletonOne() {
  return (
    <div className="relative w-full h-full">
      <div className="h-[300px] w-[300px] md:w-[600px] md:h-[600px] mx-auto absolute -bottom-20 md:-bottom-60 z-20 inset-x-0">
        <Globe />
      </div>
    </div>
  );
}