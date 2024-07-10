'use client'

import React, { useEffect, useState } from 'react';

const BarMoving: React.FC = () => {
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
      className={`fit fixed left-0 bottom-0 w-full overflow-hidden bg-colorPrimary text-colorSecondary transition-opacity duration-300 z-10 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
      <div className="whitespace-nowrap animate-marquee">
        <span className="">
          Este es el texto que se mueve de derecha a izquierda y vuelve a aparecer por la derecha en un bucle continuo.
        </span>
      </div>
    </div>
  );
};

export default BarMoving;