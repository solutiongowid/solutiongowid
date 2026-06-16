'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const previewImages = [
  { src: '/fnb_slide_07.png', alt: '리포트 미리보기 - 7페이지' },
  { src: '/fnb_slide_08.png', alt: '리포트 미리보기 - 8페이지' },
  { src: '/fnb_slide_09.png', alt: '리포트 미리보기 - 9페이지' },
  { src: '/fnb_slide_11.png', alt: '리포트 미리보기 - 11페이지' },
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
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, currentIndex]);

  return (
    <div
      className="report-preview-carousel"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={() => setIsAutoPlaying(false)}
      onTouchEnd={() => setIsAutoPlaying(true)}
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

      <button onClick={goToPrev} className="carousel-nav-button carousel-nav-prev" aria-label="이전 페이지">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      <button onClick={goToNext} className="carousel-nav-button carousel-nav-next" aria-label="다음 페이지">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
