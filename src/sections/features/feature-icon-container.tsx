import React from 'react';

import { cn } from '@/lib/utils';

export const FeatureIconContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const hexagonClipPath =
    'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

  return (
    <div className=" perspective-[400px] transform-3d">
      <div
        className={cn(
          'h-16 w-14 p-[4px] bg-linear-to-b from-neutral-800  to-neutral-950 mx-auto relative scale-110'
        )}
        style={{
          transform: 'rotateX(25deg)',
          transformOrigin: 'center',
          clipPath: hexagonClipPath,
        }}
      >
        <div
          className={cn(
            'bg-charcoal h-full w-full relative z-20', 
            className
          )}
          style={{
            clipPath: hexagonClipPath, 
          }}
        >
          {children}
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-neutral-600 opacity-50 rounded-full blur-lg h-6 w-full mx-auto z-30"></div>
        <div className="absolute bottom-0 inset-x-0 bg-linear-to-r from-transparent via-neutral-500 to-transparent h-px w-[60%] mx-auto"></div>
        <div className="absolute bottom-0 inset-x-0 bg-linear-to-r from-transparent via-neutral-600 blur-xs to-transparent h-[8px] w-[60%] mx-auto"></div>
      </div>
    </div>
  );
};