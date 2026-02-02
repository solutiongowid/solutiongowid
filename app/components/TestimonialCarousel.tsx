'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  company: string;
  category: string;
  quote: string;
  author: string;
}

const testimonials: Testimonial[] = [
  {
    company: '조인앤조인',
    category: '비건푸드 브랜드',
    quote: '신제품 개발 속도 늦추지 않고\n성장할 수 있었습니다',
    author: '한재성 책임님',
  },
  {
    company: '베이직스',
    category: '노트북 브랜드',
    quote: '쿠팡, 올영 매출의 늦은 정산\n자금 흐름 정상화됐습니다',
    author: '강신경 대표님',
  },
  {
    company: '댄프',
    category: '스포츠웨어 브랜드',
    quote: '성장 속도 유지하면서\n블프, 신제품 출시 등 급증하는\n시즌 준비 가능해졌습니다',
    author: '진승재 대표님',
  },
  {
    company: '차일드',
    category: '키즈패션 브랜드',
    quote: '멀티채널 재고 운영에 필요한\n자금을 유연하게 지원해주었습니다',
    author: '강준기 대표님',
  },
];

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [current, isPaused]);

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <div className="w-full">
      <div 
        className="relative min-h-[280px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* 스택 효과 - 뒤 카드들 */}
        <div 
          className="absolute inset-0 feature-card opacity-40"
          style={{ 
            transform: 'translateY(10px) scale(0.95)',
            zIndex: 1 
          }}
        />
        <div 
          className="absolute inset-0 feature-card opacity-60"
          style={{ 
            transform: 'translateY(5px) scale(0.97)',
            zIndex: 2 
          }}
        />
        
        {/* 메인 카드 */}
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ${
              index === current
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
            style={{ zIndex: 3 }}
          >
            <div 
              className={`feature-card text-left space-y-4 transition-all duration-300 ${
                isPaused ? 'scale-[1.02] shadow-2xl' : ''
              }`}
              style={{
                boxShadow: isPaused 
                  ? '0 12px 40px rgba(91, 197, 0, 0.25)' 
                  : '0 8px 30px rgba(91, 197, 0, 0.15)'
              }}
            >
              <div className="flex items-center gap-3">
                <span className="badge">
                  {testimonial.category}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  {testimonial.company}
                </span>
              </div>
              <p className="text-lg sm:text-xl whitespace-pre-line text-gray-700">
                {testimonial.quote}
              </p>
              <div className="pt-2 border-t border-gray-100">
                <span className="text-sm text-gray-500">
                  {testimonial.author}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* 좌우 버튼 */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all z-10"
        >
          ‹
        </button>
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:scale-110 active:scale-95 transition-all z-10"
        >
          ›
        </button>
      </div>

      {/* 인디케이터 */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? 'bg-green-500 w-4' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
