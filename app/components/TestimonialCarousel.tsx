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
    if (isPaused) return; // 멈춤 상태면 자동 전환 안 함
    
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 4000); // 4초마다 자동 전환

    return () => clearInterval(interval);
  }, [current, isPaused]);

  const handleCardClick = () => {
    setIsPaused(!isPaused); // 클릭할 때마다 토글
  };

  return (
    <div className="w-full">
      <div className="relative min-h-[280px]">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ${
              index === current
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            <div 
              className={`feature-card text-left space-y-4 cursor-pointer transition-all duration-300 ${
                isPaused ? 'scale-105 shadow-2xl' : ''
              }`}
              onClick={handleCardClick}
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
      </div>
    </div>
  );
}
