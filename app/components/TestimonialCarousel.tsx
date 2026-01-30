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
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const delay = isHovered ? 8000 : 6000; // 클릭/호버 후 8초, 일반 6초
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
      setIsHovered(false); // 자동 전환 후 원래 속도로
    }, delay);

    return () => clearInterval(interval);
  }, [current, isHovered]);

  const handleCardClick = () => {
    setIsHovered(true);
  };

  return (
    <div className="w-full mt-16 md:mt-20">
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
              className="feature-card text-left space-y-4 cursor-pointer"
              onClick={handleCardClick}
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

      {/* 인디케이터 */}
      <div className="flex justify-center gap-2 mt-1">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1 rounded-full transition-all duration-300 touch-manipulation ${
              index === current ? 'w-12 bg-accent' : 'w-1 bg-gray-300'
            }`}
            aria-label={`후기 ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
