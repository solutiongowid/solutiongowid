'use client';

import { useState, useEffect } from 'react';

interface NavigationHintProps {
  currentSlide: number;
  totalSlides: number;
  onNext: () => void;
}

export default function NavigationHint({ currentSlide, totalSlides, onNext }: NavigationHintProps) {
  const [showAnimation, setShowAnimation] = useState(false);
  const isFirstSlide = currentSlide === 0;

  useEffect(() => {
    // 첫 페이지에서만 3초 후 점프 애니메이션 시작
    if (isFirstSlide) {
      const timer = setTimeout(() => {
        setShowAnimation(true);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setShowAnimation(false);
    }
  }, [currentSlide, isFirstSlide]);

  // 마지막 슬라이드에서는 표시하지 않음
  if (currentSlide >= totalSlides - 1) return null;

  return (
    <>
      {/* 오른쪽 중앙 스와이프 힌트 - 첫 페이지만 점프, 나머지는 화살표만 */}
      <div className={`fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-2 ${isFirstSlide && showAnimation ? 'animate-jump' : ''}`}>
        <div className="text-gray-400 text-sm font-medium text-center">스와이프</div>
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          className={`text-accent ${!isFirstSlide ? 'animate-arrow-nudge' : ''}`}
        >
          <path 
            d="M5 12h14m-6-6l6 6-6 6" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* 하단 스와이프 안내 텍스트 (모바일용) - 첫 페이지만 점프, 나머지는 화살표만 */}
      <div className={`fixed bottom-32 left-1/2 -translate-x-1/2 z-40 md:hidden ${isFirstSlide && showAnimation ? 'animate-jump' : ''}`}>
        <div className="text-gray-400 text-xs font-medium flex items-center justify-center gap-2 text-center">
          <span>좌우로 스와이프하세요</span>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none"
            className={!isFirstSlide ? 'animate-arrow-nudge' : ''}
          >
            <path 
              d="M5 12h14" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round"
            />
            <path 
              d="M13 5l7 7-7 7" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
