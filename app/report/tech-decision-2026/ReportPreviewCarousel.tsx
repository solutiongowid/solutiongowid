'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const previewImages = [
  { src: '/techdecision_slide_01.png', alt: '테크 기업의 사건과 의사결정 리포트 2026 - 다섯 상황 판정표' },
  { src: '/techdecision_slide_02.png', alt: '테크 기업의 사건과 의사결정 리포트 2026 - 사람이 빠지고 인당이 오른 갈래' },
  { src: '/techdecision_slide_03.png', alt: '테크 기업의 사건과 의사결정 리포트 2026 - 채용과 매출 회복 시점 비교' },
  { src: '/techdecision_slide_04.png', alt: '테크 기업의 사건과 의사결정 리포트 2026 - 인건비 효율(LER) 구간별 결과' },
  { src: '/techdecision_slide_05.png', alt: '테크 기업의 사건과 의사결정 리포트 2026 - 사건 전 LER과 회복률' },
  { src: '/techdecision_slide_06.png', alt: '테크 기업의 사건과 의사결정 리포트 2026 - 자가진단' },
];

export default function ReportPreviewCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % previewImages.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? previewImages.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, 3000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);
  const handleTouchStart = () => setIsAutoPlaying(false);
  const handleTouchEnd = () => setIsAutoPlaying(true);

  return (
    <div
      className="report-preview-carousel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-image-wrapper">
        {previewImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={800}
              height={600}
              className="carousel-image"
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="carousel-nav-button carousel-nav-prev"
        aria-label="이전 페이지"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M15 18L9 12L15 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="carousel-nav-button carousel-nav-next"
        aria-label="다음 페이지"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 18L15 12L9 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="carousel-indicators">
        {previewImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            aria-label={`페이지 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
