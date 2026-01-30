'use client';

import { useState, useEffect, useRef } from 'react';
import Slide from './components/Slide';
import SlideIndicator from './components/SlideIndicator';
import TestimonialCarousel from './components/TestimonialCarousel';
import NavigationHint from './components/NavigationHint';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const totalSlides = 10;

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const slideWidth = container.clientWidth;
      const newSlide = Math.round(scrollLeft / slideWidth);
      setCurrentSlide(newSlide);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNext = () => {
    const container = scrollContainerRef.current;
    if (!container || currentSlide >= totalSlides - 1) return;
    
    container.scrollTo({
      left: (currentSlide + 1) * container.clientWidth,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div ref={scrollContainerRef} className="scroll-container">
        {/* 페이지 1: 메인 히어로 */}
        <Slide id="slide-1">
          <div className="text-left space-y-8 px-4 max-w-5xl">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold fade-in-1">
              문제는 돈이 아닙니다
              <br />
              <span className="gradient-text">타이밍</span>입니다
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light fade-in-2">
              매출 성장에 맞춰 자금도 함께 성장하는
              <br />
              고위드 법인카드로 기회를 놓치지 마세요
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 fade-in-3">
              <div className="feature-card text-left space-y-1">
                <div className="badge mb-2">CASE 1</div>
                <p className="text-lg text-gray-600 leading-tight">발주 주기는 짧아졌는데</p>
                <p className="text-lg font-semibold leading-tight">발주 금액은 더 커져요</p>
              </div>
              <div className="feature-card text-left space-y-1">
                <div className="badge mb-2">CASE 2</div>
                <p className="text-lg text-gray-600 leading-tight">광고비 효율은 상승했는데</p>
                <p className="text-lg font-semibold leading-tight">카드 한도는 작년이랑 똑같아요</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* 페이지 2: 헤드카피 */}
        <Slide id="slide-2" className="!justify-start !pt-64">
          <div className="text-left space-y-12 px-4 max-w-5xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold fade-in-1">
              다음달 매입에 필요한
              <br />
              자금이 <span className="gradient-text">무이자</span>로
              <br />
              제공된다면 어떨까요?
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold fade-in-2">
              게다가 매월
              <br />
              사용액의 <span className="gradient-text">0.5%</span>씩
              <br />
              돌려드리면요?
            </h2>
          </div>
        </Slide>

        {/* 페이지 3: 성공 사례 */}
        <Slide id="slide-3" className="!justify-start !pt-52">
          <div className="text-left space-y-12 px-4 max-w-5xl">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold fade-in-1">
              지난 해 <span className="gradient-text">300%</span> 성장한
              <br />
              조인앤조인(널담)
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-light fade-in-2">
              이번달 광고비와 발주금액 <span className="gradient-text font-bold">4,000만원</span>이
              <br />
              당장 다음달에 나갑니다
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold fade-in-3">
              월 <span className="gradient-text">4,000만원</span> 한도가 제공된다면,
              <br />
              연 <span className="gradient-text">5억원</span>의 대출을 <span className="gradient-text">무이자</span>로 받는 것과 같은 효과이죠
            </p>
            <p className="text-sm text-gray-500 mt-40 fade-in-4">
              *중소기업 대출 금리 (4%~7%) 기준
              <br />
              월 4,000만원, 연 5억원을 대출할 경우,
              <br />
              월 이자 160만원으로 총 2,000만원 손실
            </p>
          </div>
        </Slide>

        {/* 페이지 4: 고위드 소개 */}
        <Slide id="slide-4">
          <div className="text-left space-y-10 px-4 max-w-5xl w-full">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold fade-in-1">
              돈을 벌고 나서 쓰는 것 ㅡ
              <br />
              고위드와는 가능합니다
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-light fade-in-2">
              <span className="gradient-text font-bold">3,500개</span> 사가 선택한
              <br />
              고위드는 이미 알고 있습니다
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-light fade-in-3">
              법인카드를 성장의
              <br />
              레버리지로 사용하는 방법을
            </p>
            <div className="fade-in-4">
              <TestimonialCarousel />
            </div>
          </div>
        </Slide>

        {/* 페이지 5: 혜택 1 */}
        <Slide id="slide-5" className="!justify-start !pt-52">
          <div className="text-left space-y-10 px-4 max-w-5xl">
            <div className="section-header !text-left !items-start fade-in-1">
              <div className="section-label">Solution 01</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                최적의 한도를 받으세요
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-4 fade-in-2">
              <div className="feature-card text-left space-y-2">
                <div className="badge">높은 한도</div>
                <p className="text-lg sm:text-xl text-gray-700">기존 금융 대비 더 높은 한도</p>
              </div>
              <div className="feature-card text-left space-y-2">
                <div className="badge">최고 페이백</div>
                <p className="text-lg sm:text-xl text-gray-700">업계 최고의 페이백율</p>
              </div>
              <div className="feature-card text-left space-y-2">
                <div className="badge">매월 복원</div>
                <p className="text-lg sm:text-xl text-gray-700">매월 1일 마다 복원되는 한도</p>
              </div>
            </div>
          </div>
        </Slide>

        {/* 페이지 6: 혜택 2 */}
        <Slide id="slide-6">
          <div className="text-left space-y-8 px-4 max-w-5xl">
            <div className="section-header !text-left !items-start fade-in-1">
              <div className="section-label">Solution 02</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                공여일을 연장하세요
              </h2>
            </div>
            <div className="space-y-8">
              <p className="text-base text-gray-700 text-left fade-in-2">
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
                    <div className="text-right flex flex-col">
                      <span className="text-accent text-[10px] font-bold leading-tight">고위드 최대</span>
                      <span className="text-base font-bold gradient-text">83일</span>
                    </div>
                  </div>

                  {/* 통합 게이지 바 */}
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                    {/* 애니메이션 게이지 */}
                    <div className="absolute inset-0 h-full bg-gradient-to-r from-gray-300 via-accent/70 to-accent unified-gauge-bar rounded-full"></div>
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

        {/* 페이지 7: 혜택 3 */}
        <Slide id="slide-7">
          <div className="text-left space-y-8 px-4 max-w-5xl">
            <div className="section-header !text-left !items-start fade-in-1">
              <div className="section-label">Solution 03</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                세금계산서를 카드 결제로
              </h2>
            </div>
            <div className="feature-card space-y-6 fade-in-2">
              <div className="flex gap-2 justify-center flex-wrap">
                <span className="badge">거래처 수수료 부담 X</span>
                <span className="badge">결제 시스템 설치 X</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-w-2xl mx-auto">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-xl font-bold text-gray-400 mb-1">세금계산서 발행</div>
                  <p className="text-sm text-gray-500">현금만 받던 거래처</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border-2 border-accent animate-card-nudge">
                  <div className="text-xl font-bold gradient-text mb-1">카드 결제</div>
                  <p className="text-sm text-gray-700">고위드로 가능</p>
                </div>
              </div>
            </div>
          </div>
        </Slide>

        {/* 페이지 8: 혜택 4 */}
        <Slide id="slide-8">
          <div className="text-left space-y-8 px-4 max-w-5xl w-full">
            <div className="section-header !text-left !items-start !mb-8 fade-in-1">
              <div className="section-label">Solution 04</div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
                성장에 따라
                <br />
                한도도 늘어납니다
              </h2>
            </div>
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-medium -ml-0 fade-in-2">
              시즌성 매출 급증,
              <br />
              글로벌 진출 등
              <br />
              막힘없이 성장하세요
            </p>
          </div>
        </Slide>

        {/* 페이지 9: 최종 메시지 */}
        <Slide id="slide-9">
          <div className="text-left space-y-12 px-4 max-w-5xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold fade-in-1">
              <span className="gradient-text">매출 후 매입</span>,
              <br />
              들어올 돈과 나갈 돈의
              <br />
              타이밍이 맞기 시작합니다
            </h2>
            <p className="text-2xl sm:text-3xl md:text-4xl text-gray-700 font-medium fade-in-2">
              더이상
              <br />
              기회를 놓치지 않습니다
            </p>
          </div>
        </Slide>

        {/* 페이지 10: CTA */}
        <Slide id="slide-10">
          <div className="text-center space-y-12 px-4 max-w-4xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold fade-in-1">
              우리 기업의 시작 한도
              <br />
              <span className="gradient-text">지금 확인하세요</span>
            </h2>
            <a
              href="https://gowid.com/card-apply-lead/?utm_source=facebook&utm_medium=paid-social&utm_campaign=menu-01-2026&utm_content=commerce-newlanding-260130"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-gradient-to-r from-accent to-green-600 text-white font-bold text-xl sm:text-2xl px-16 py-6 rounded-full transition-all duration-500 touch-manipulation animate-cta-pulse hover:animate-none hover:scale-110 hover:shadow-[0_20px_60px_rgba(91,197,0,0.6)] active:scale-100 cursor-pointer scale-in-2"
            >
              한도 확인하기
            </a>
          </div>
        </Slide>
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
