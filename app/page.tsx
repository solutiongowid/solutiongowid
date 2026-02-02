'use client';

import { useState, useEffect, useRef } from 'react';
import Slide from './components/Slide';
import SlideIndicator from './components/SlideIndicator';
import TestimonialCarousel from './components/TestimonialCarousel';
import NavigationHint from './components/NavigationHint';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const touchStartXRef = useRef(0);
  const touchStartYRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const totalSlides = 10;

  // 페이지 이동 함수
  const goToSlide = (newSlide: number) => {
    if (isTransitioningRef.current) return;
    if (newSlide < 0 || newSlide >= totalSlides) return;
    if (newSlide === currentSlide) return;

    isTransitioningRef.current = true;
    setCurrentSlide(newSlide);
    
    // CSS transition이 끝나면 플래그 해제
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 550);
  };

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleTouchStart = (e: TouchEvent) => {
      if (isTransitioningRef.current) return;
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isTransitioningRef.current) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const touchDiffX = touchStartXRef.current - touchEndX;
      const touchDiffY = touchStartYRef.current - touchEndY;
      
      const thresholdX = 50;
      const thresholdY = 50;
      
      // 가로 스와이프가 더 큰 경우
      if (Math.abs(touchDiffX) > Math.abs(touchDiffY)) {
        if (Math.abs(touchDiffX) > thresholdX) {
          if (touchDiffX > 0 && currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
          } else if (touchDiffX < 0 && currentSlide > 0) {
            goToSlide(currentSlide - 1);
          }
        }
      } 
      // 세로 스와이프가 더 큰 경우 (위/아래 모두 다음 페이지로)
      else {
        if (Math.abs(touchDiffY) > thresholdY) {
          if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
          }
        }
      }
    };

    // 마우스 휠 이벤트
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) return;
      e.preventDefault();
      
      if (Math.abs(e.deltaY) > 30) {
        if (currentSlide < totalSlides - 1) {
          goToSlide(currentSlide + 1);
        }
      }
    };

    wrapper.addEventListener('touchstart', handleTouchStart, { passive: true });
    wrapper.addEventListener('touchend', handleTouchEnd, { passive: true });
    wrapper.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      wrapper.removeEventListener('touchstart', handleTouchStart);
      wrapper.removeEventListener('touchend', handleTouchEnd);
      wrapper.removeEventListener('wheel', handleWheel);
    };
  }, [currentSlide, totalSlides]);

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    }
  };

  return (
    <>
      {/* 상단 고정 헤더 */}
      <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between">
        <a
          href="https://gowid.com/card-apply-lead/?utm_source=facebook&utm_medium=paid-social&utm_campaign=menu-01-2026&utm_content=commerce-newlanding-260130"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/Group 626579.png" alt="gowid" className="h-8 hover:opacity-80 transition-opacity" />
        </a>
        <a
          href="https://gowid.com/card-apply-lead/?utm_source=facebook&utm_medium=paid-social&utm_campaign=menu-01-2026&utm_content=commerce-newlanding-260130"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white text-xs font-semibold px-3 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
          style={{background: 'linear-gradient(135deg, #5BC500 0%, #4a9f00 100%)'}}
        >
          도입 신청하기
        </a>
      </div>

      <div ref={wrapperRef} className="slide-wrapper">
        <div 
          className="scroll-container"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
        {/* 페이지 1: 표지 */}
        <Slide id="slide-cover">
          <div className="text-center space-y-4 px-4 w-full max-w-md">
            <div className="text-4xl">📈</div>
            <h1 className="text-2xl font-bold leading-snug">
              성장하는 내 커머스 비즈니스,<br />
              <span className="gradient-text">J 커브</span>를 꿈꾸시나요?
            </h1>
          </div>
        </Slide>

        {/* 페이지 2: 메인 히어로 */}
        <Slide id="slide-1">
          <div className="text-left space-y-8 px-4 w-full max-w-md">
            <div className="text-3xl fade-in-1">⏰</div>
            <h1 className="text-2xl font-bold fade-in-1">
              문제는 돈이 아닙니다
              <br />
              <span className="gradient-text">타이밍</span>입니다
          </h1>
            <p className="text-base text-gray-600 font-light fade-in-2">
              매출 성장에 맞춰 자금도 함께 성장하는
              <br />
              고위드 법인카드로 기회를 놓치지 마세요
            </p>
            <div className="flex flex-col gap-4 mt-12 fade-in-3">
              <div className="feature-card text-left space-y-1">
                <div className="badge mb-2">CASE 1</div>
                <p className="text-lg text-gray-600 leading-tight">발주 주기는 짧아졌는데</p>
                <p className="text-lg font-semibold leading-tight">발주 금액은 더 커질 때</p>
              </div>
              <div className="feature-card text-left space-y-1">
                <div className="badge mb-2">CASE 2</div>
                <p className="text-lg text-gray-600 leading-tight">광고비 효율은 상승했는데</p>
                <p className="text-lg font-semibold leading-tight">카드 한도는 작년이랑 똑같을 때</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* 페이지 2: 헤드카피 + 성공 사례 통합 */}
        <Slide id="slide-2">
          <div className="text-left space-y-5 px-4 w-full max-w-sm">
            {/* 헤드카피 섹션 */}
            <div className="space-y-2 fade-in-1">
              <div className="text-3xl mb-2">💰</div>
              <h2 className="text-2xl font-bold leading-snug">
                다음달 매입 자금이<br />
                <span className="gradient-text">무이자</span>로 제공된다면?
              </h2>
              <p className="text-sm font-bold">
                게다가 매월 사용액의 <span className="gradient-text">0.5%</span>씩 돌려드리면요?
              </p>
            </div>

            {/* 구분선 */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* 성공 사례 섹션 */}
            <div className="space-y-4 fade-in-2">
              <h3 className="text-base font-bold">
                지난 해 <span className="gradient-text">300%</span> 성장한<br />
                조인앤조인(널담)
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                이번달 광고비와 발주금액 <span className="gradient-text font-bold">4,000만원</span>이<br />
                당장 다음달에 나갑니다
              </p>
              <p className="text-lg font-bold leading-relaxed fade-in-3">
                월 <span className="gradient-text">4,000만원</span> 한도가 제공된다면,<br />
                연 <span className="gradient-text">5억원</span>의 대출을 <span className="gradient-text">무이자</span>로 받는<br />
                것과 같은 효과이죠
              </p>
            </div>

            {/* 주석 */}
            <p className="text-[10px] text-gray-400 fade-in-4 leading-snug">
              *중소기업 대출 금리 (4%~7%) 기준, 월 이자 160만원 절감
            </p>
          </div>
        </Slide>

        {/* 페이지 3: 고위드 소개 */}
        <Slide id="slide-3">
          <div className="text-left px-4 w-full max-w-md">
            <div className="space-y-6 mb-6">
              <div className="text-3xl fade-in-1">💳</div>
              <h2 className="text-2xl font-bold fade-in-1">
                돈을 벌고 나서 쓰는 것 ㅡ
                <br />
                고위드와는 가능합니다
              </h2>
              <p className="text-base text-gray-700 font-light fade-in-2">
                <span className="gradient-text font-bold">3,500개</span> 사가 선택한
                <br />
                고위드는 이미 알고 있습니다
              </p>
              <p className="text-base text-gray-700 font-light fade-in-3">
                법인카드를 성장의
                <br />
                레버리지로 사용하는 방법을
              </p>
            </div>
            <div className="fade-in-4">
              <TestimonialCarousel />
            </div>
          </div>
        </Slide>

        {/* 페이지 4: 혜택 1 */}
        <Slide id="slide-4">
          <div className="text-left space-y-10 px-4 w-full max-w-md">
            <div className="text-left fade-in-1">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm font-semibold mb-2" style={{color: '#5BC500'}}>SOLUTION 01</div>
              <h2 className="text-2xl font-bold">
                최적의 한도를 받으세요
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="feature-card text-left fade-in-2">
                <p className="text-base font-semibold text-gray-800">기존 금융 대비 더 높은 한도</p>
              </div>
              <div className="feature-card text-left fade-in-3">
                <p className="text-base font-semibold text-gray-800">업계 최고의 페이백율</p>
              </div>
              <div className="feature-card text-left fade-in-4">
                <p className="text-base font-semibold text-gray-800">매월 1일 마다 복원되는 한도</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* 페이지 5: 혜택 2 */}
        <Slide id="slide-5">
          <div className="text-left space-y-8 px-4 w-full max-w-md">
            <div className="text-left fade-in-1">
              <div className="text-3xl mb-2">📅</div>
              <div className="text-sm font-semibold mb-2" style={{color: '#5BC500'}}>SOLUTION 02</div>
              <h2 className="text-2xl font-bold">
                공여일을 연장하세요
              </h2>
            </div>
            <div className="space-y-8">
              <p className="text-base text-gray-700 text-center fade-in-2">
                최대 공여일 연장으로
                <br />
                지출 이연 효과를 누려보세요
              </p>
              
              {/* 통합 게이지 바 카드 */}
              <div className="feature-card fade-in-3">
                <div className="space-y-4 text-center">
                  {/* 라벨 영역 */}
                  <div className="flex justify-between items-end text-xs mb-3">
                    <div className="text-left flex flex-col">
                      <span className="text-gray-600 text-[10px] leading-tight">일반 카드</span>
                      <span className="text-sm font-bold text-gray-600">45일</span>
                    </div>
                    <div className="text-center flex flex-col">
                      <span className="text-gray-600 text-[10px] leading-tight">타사 법인카드</span>
                      <span className="text-sm font-bold text-gray-600">53일</span>
                    </div>
                    <div className="text-center flex flex-col">
                      <span className="text-gray-700 text-[10px] leading-tight">고위드 기본</span>
                      <span className="text-sm font-bold text-gray-700">61일</span>
                    </div>
                    <div className="text-right flex flex-col animate-pulse">
                      <span className="text-[10px] font-bold leading-tight" style={{color: '#5BC500'}}>고위드 최대</span>
                      <span className="text-base font-bold gradient-text">83일</span>
                    </div>
                  </div>

                  {/* 통합 게이지 바 */}
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    {/* 애니메이션 게이지 */}
                    <div 
                      className="absolute inset-0 h-full unified-gauge-bar rounded-full"
                      style={{background: 'linear-gradient(90deg, #5BC500 0%, #4a9f00 100%)'}}
                    ></div>
                  </div>
                </div>
                
                <div className="flex gap-2 justify-center flex-wrap mt-6">
                  <span className="badge">업계 최장</span>
                  <span className="badge">공여일 연장</span>
                  <span className="badge">자금 운용</span>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* 페이지 6: 혜택 3 */}
        <Slide id="slide-6">
          <div className="text-left space-y-8 px-4 w-full max-w-md">
            <div className="text-left fade-in-1">
              <div className="text-3xl mb-2">📄</div>
              <div className="text-sm font-semibold mb-2" style={{color: '#5BC500'}}>SOLUTION 03</div>
              <h2 className="text-2xl font-bold">
                세금계산서를 카드 결제로
              </h2>
            </div>
            <div className="feature-card space-y-6 fade-in-2">
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="badge">거래처 수수료 부담 X</span>
                <span className="badge">결제 시스템 설치 X</span>
              </div>
              <div className="flex flex-col gap-4 items-center max-w-2xl mx-auto">
                <div className="text-center p-4 bg-gray-50 rounded-xl w-full">
                  <div className="text-xl font-bold text-gray-400 mb-1">세금계산서 발행</div>
                  <p className="text-sm text-gray-500">현금만 받던 거래처</p>
                </div>
                <div className="text-center p-4 bg-white rounded-xl border-2 w-full" style={{borderColor: '#5BC500'}}>
                  <div className="text-xl font-bold gradient-text mb-1">카드 결제</div>
                  <p className="text-sm text-gray-700">고위드로 가능</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* 페이지 7: 혜택 4 */}
        <Slide id="slide-7">
          <div className="text-left space-y-8 px-4 w-full max-w-md">
            <div className="text-left fade-in-1">
              <div className="text-3xl mb-2">🚀</div>
              <div className="text-sm font-semibold mb-2" style={{color: '#5BC500'}}>SOLUTION 04</div>
              <h2 className="text-2xl font-bold">
                성장에 따라
                <br />
                한도도 늘어납니다
              </h2>
            </div>
            <p className="text-xl text-gray-700 font-medium -ml-0 fade-in-2">
              시즌성 매출 급증,
              <br />
              글로벌 진출 등
              <br />
              막힘없이 성장하세요
            </p>
          </div>
        </Slide>

        {/* 페이지 8: 최종 메시지 */}
        <Slide id="slide-8">
          <div className="text-center space-y-12 px-4 max-w-md">
            <div className="text-4xl fade-in-1">✨</div>
            <h2 className="text-2xl font-bold fade-in-1">
              <span className="gradient-text">매출 후 매입</span>,
              <br />
              들어올 돈과 나갈 돈의
              <br />
              타이밍이 맞기 시작합니다
            </h2>
            <p className="text-lg text-gray-700 font-medium fade-in-2">
              더이상
              <br />
              기회를 놓치지 않습니다
          </p>
        </div>
        </Slide>

        {/* 페이지 9: CTA */}
        <Slide id="slide-9">
          <div className="text-center space-y-8 px-4 max-w-md w-full">
            <div className="text-4xl fade-in-1">🚀</div>
            <h2 className="text-2xl font-bold fade-in-1">
              커머스 기업 폭풍 성장,
              <br />
              <span className="gradient-text">지금 고위드와 함께하세요</span>
            </h2>
            <div className="fade-in-2">
              <a
                href="https://gowid.com/card-apply-lead/?utm_source=facebook&utm_medium=paid-social&utm_campaign=menu-01-2026&utm_content=commerce-newlanding-260130"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-white font-bold text-lg px-12 py-5 rounded-full transition-all duration-300 animate-cta-pulse hover:animate-none hover:scale-105 hover:shadow-xl active:scale-100 cursor-pointer w-full max-w-xs"
                style={{background: 'linear-gradient(135deg, #5BC500 0%, #4a9f00 100%)'}}
              >
                도입 신청하기
              </a>
            </div>
          </div>
        </Slide>
        </div>
      </div>

      <NavigationHint 
        currentSlide={currentSlide} 
        totalSlides={totalSlides}
        onNext={handleNext}
      />
      
      <SlideIndicator total={10} current={currentSlide} />
    </>
  );
}
