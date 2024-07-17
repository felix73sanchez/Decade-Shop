// src/components/ui/barmoving/barMoving.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useVisibility } from './VisibilityContext';

const BarMoving: React.FC = () => {
  const { isBarMovingVisible } = useVisibility();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY === 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className={`fit fixed left-0 bottom-0 w-full overflow-hidden bg-colorPrimary text-colorSecondary transition-opacity duration-75 z-10 ${
        isBarMovingVisible && isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
      <div className="whitespace-nowrap animate-marquee p-1">
        <span className="font-fw5 text-fs2">
          ENVÍO GRATIS A REPÚBLICA DOMINICANA EN TODOS LOS PEDIDOS SUPERIORES A RD$6,510.00
        </span>
      </div>
    </div>
  );
};

export default BarMoving;
