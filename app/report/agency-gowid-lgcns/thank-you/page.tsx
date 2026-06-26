'use client';

import Image from 'next/image';

const PDF_PATH = '/agency_ax_report.pdf';
const PDF_FILENAME = '광고대행사를 위한 AX 밀도 경영 리포트.pdf';

export default function AgencyGowidLgcnsThankYouPage() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = PDF_PATH;
    link.download = PDF_FILENAME;
    link.click();
  };

  return (
    <div className="report-page agency-report">
      <nav className="report-nav">
        <div className="report-container">
          <div className="report-nav-content">
            <a href="https://gowid.com" className="report-brand" target="_blank" rel="noopener noreferrer">
              <Image
                src="/Group 626579.png"
                alt="GOWID"
                width={84}
                height={28}
                priority
              />
            </a>
          </div>
        </div>
      </nav>

      <main className="thank-you-main" style={{ background: 'linear-gradient(135deg, #1a0a0f 0%, #17171c 100%)' }}>
        <div className="report-container">
          <div className="thank-you-content">
            <div className="thank-you-check" aria-hidden="true">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="40" fill="#A50034" />
                <path
                  d="M24 41.5L34.5 52L56 30"
                  stroke="white"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="thank-you-title" style={{ color: '#ffffff' }}>감사합니다!</h1>
            <p className="thank-you-description" style={{ color: 'rgba(255,255,255,0.75)' }}>
              제출이 완료되었습니다.<br/>
              아래 버튼을 클릭하여 리포트를 다운로드하세요.
            </p>

            <div className="thank-you-cta-group">
              <button
                onClick={handleDownload}
                className="thank-you-cta-primary"
                style={{
                  background: 'linear-gradient(135deg, #A50034 0%, #870029 100%)',
                  boxShadow: '0 4px 16px rgba(165, 0, 52, 0.4)',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                리포트 다운로드
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="report-footer">
        <div className="report-container">
          <div className="report-footer-content">
            <div>@GOWID ⓒ2026. All Rights Reserved</div>
            <div className="report-footer-divider">|</div>
            <div>
              <a
                href="https://www.notion.so/teamgowid/2026-ver-2e98db64698e8086ac85e01f29c32587"
                target="_blank"
                rel="noopener noreferrer"
                className="report-footer-link"
              >
                개인정보 처리방침
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
