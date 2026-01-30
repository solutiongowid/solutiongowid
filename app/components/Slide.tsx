'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

interface SlideProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function Slide({ children, className = '', id }: SlideProps) {
  const slideRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.5 }
    );

    if (slideRef.current) {
      observer.observe(slideRef.current);
    }

    return () => {
      if (slideRef.current) {
        observer.unobserve(slideRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={slideRef}
      className={`scroll-slide ${className} ${isVisible ? 'slide-active' : ''}`} 
      id={id}
    >
      {children}
    </div>
  );
}
