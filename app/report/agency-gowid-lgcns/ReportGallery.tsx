'use client';

const SLIDES = [
  { src: '/agency_slide_04.png', alt: 'AX 밀도 경영 리포트 미리보기 - 슬라이드 4' },
  { src: '/agency_slide_06.png', alt: 'AX 밀도 경영 리포트 미리보기 - 슬라이드 6' },
  { src: '/agency_slide_17.png', alt: 'AX 밀도 경영 리포트 미리보기 - 슬라이드 17' },
  { src: '/agency_slide_18.png', alt: 'AX 밀도 경영 리포트 미리보기 - 슬라이드 18' },
];

const LOOP_COUNT = 6;
const LOOP_SLIDES = Array.from({ length: LOOP_COUNT }).flatMap((_, copy) =>
  SLIDES.map((slide, i) => ({ ...slide, key: `slide-${copy}-${i}` }))
);

export default function ReportGallery() {
  return (
    <div className="report-gallery">
      <div className="report-gallery-track">
        {LOOP_SLIDES.map((slide, index) => (
          <div
            className="report-gallery-item"
            key={slide.key}
            aria-hidden={index >= SLIDES.length}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.src}
              alt={index < SLIDES.length ? slide.alt : ''}
              draggable={false}
              onContextMenu={e => e.preventDefault()}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
