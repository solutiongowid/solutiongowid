'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { INTRO_MESSAGES, INTRO_OPTIONS, MORE_OPTIONS, CHATBOT_RESPONSES } from './chatData';
import type { Option } from './chatData';
import { trackEvent, buildCtaUrl } from './tracking';

const CTA_URL = 'https://gowid.com/card-apply-lead/?utm_source=facebook&utm_medium=paid-display&utm_campaign=commerce-apply-lead-04';

type Message = { type: 'bot' | 'user'; text: string };

export default function CardApplyPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<Option[]>([]);
  const [finalState, setFinalState] = useState<'apply' | 'soft_close' | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const introPlayed = useRef(false);

  const playIntro = useCallback(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    let t = 0;
    INTRO_MESSAGES.forEach((msg, i) => {
      t += 300;
      timeouts.push(setTimeout(() => setIsTyping(true), t));
      t += i === 0 ? 1200 : 900;
      timeouts.push(setTimeout(() => {
        setMessages((prev) => [...prev, { type: 'bot', text: msg }]);
        setIsTyping(false);
      }, t));
    });
    t += 500;
    timeouts.push(setTimeout(() => {
      setCurrentOptions(INTRO_OPTIONS);
      setShowOptions(true);
      trackEvent('intro_complete');
    }, t));
    return timeouts;
  }, []);

  useEffect(() => {
    if (introPlayed.current) return;
    introPlayed.current = true;
    const timeouts = playIntro();
    return () => timeouts.forEach(clearTimeout);
  }, [playIntro]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping, showOptions]);

  const pushBotMessage = useCallback((key: string) => {
    const data = CHATBOT_RESPONSES[key];
    if (!data) return;
    setIsTyping(true);
    setShowOptions(false);
    setTimeout(() => {
      setMessages((prev) => [...prev, { type: 'bot', text: data.text }]);
      setIsTyping(false);
      if (data.isFinal) {
        setFinalState(data.finalType!);
        trackEvent('conversation_end', { type: data.finalType! });
      } else if (data.options?.length > 0) {
        setTimeout(() => { setCurrentOptions(data.options); setShowOptions(true); }, 400);
      }
    }, 800 + Math.random() * 600);
  }, []);

  const handleOptionClick = useCallback((option: Option) => {
    trackEvent('option_click', { option_id: option.id, option_label: option.label });

    if (option.id === 'more') {
      setMessages((prev) => [...prev, { type: 'user', text: option.label }]);
      setShowOptions(false);
      setCurrentOptions([]);
      setTimeout(() => { setCurrentOptions(MORE_OPTIONS); setShowOptions(true); }, 300);
      return;
    }

    if (option.id === 'back') {
      setMessages([]);
      setShowOptions(false);
      setCurrentOptions([]);
      setFinalState(null);
      introPlayed.current = false;
      setTimeout(() => {
        introPlayed.current = true;
        playIntro();
      }, 100);
      return;
    }

    setMessages((prev) => [...prev, { type: 'user', text: option.label }]);
    setShowOptions(false);
    setCurrentOptions([]);
    setTimeout(() => pushBotMessage(option.id), 300);
  }, [playIntro, pushBotMessage]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        background: '#E8E8E8',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 480,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#F7F7F8',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: 'max(env(safe-area-inset-top, 12px), 12px) 16px 12px',
            background: '#fff',
            borderBottom: '1px solid #E8E8E8',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              background: '#fff',
              border: '1px solid #E8E8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              overflow: 'hidden',
            }}
          >
            <Image src="/gowid-logo.png" alt="고위드" width={28} height={28} style={{ objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>고위드</div>
            <div style={{ fontSize: 12, color: '#34C759' }}>● 지금 응답 가능</div>
          </div>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '20px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className="animate-chat-fade-slide-in"
              style={{
                display: 'flex',
                justifyContent: msg.type === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
                gap: 8,
              }}
            >
              {msg.type === 'bot' && (
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    background: '#fff',
                    border: '1px solid #E8E8E8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    overflow: 'hidden',
                  }}
                >
                  <img src="/gowid-logo.png" alt="고위드" style={{ width: 28, height: 28, objectFit: 'contain' }} />
                </div>
              )}
              <div
                style={{
                  maxWidth: '75%',
                  padding: '12px 16px',
                  borderRadius: msg.type === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  background: msg.type === 'user' ? '#5BC500' : '#fff',
                  color: msg.type === 'user' ? '#fff' : '#1a1a1a',
                  fontSize: 15,
                  lineHeight: 1.7,
                  whiteSpace: 'pre-line',
                  boxShadow: msg.type === 'bot' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                }}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', gap: 8 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  background: '#fff',
                  border: '1px solid #E8E8E8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  overflow: 'hidden',
                }}
              >
                <img src="/gowid-logo.png" alt="고위드" style={{ width: 28, height: 28, objectFit: 'contain' }} />
              </div>
              <div
                style={{
                  padding: '12px 20px',
                  borderRadius: '18px 18px 18px 4px',
                  background: '#fff',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                  display: 'flex',
                  gap: 5,
                }}
              >
                {[0, 1, 2].map((j) => (
                  <div
                    key={j}
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#BDBDBD',
                      animationDelay: `${j * 0.2}s`,
                    }}
                    className="animate-chat-typing-dot"
                  />
                ))}
              </div>
            </div>
          )}

          {showOptions && currentOptions.length > 0 && (
            <div
              className="animate-chat-fade-slide-in"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                paddingLeft: 4,
              }}
            >
              {currentOptions.map((opt) => {
                const isCta = opt.id === 'cta_apply';
                const isBack = opt.id === 'back';
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleOptionClick(opt)}
                    className={isCta ? 'animate-chat-cta-pulse' : ''}
                    style={{
                      padding: isBack ? '8px 18px' : '12px 18px',
                      background: 'transparent',
                      border: isBack
                        ? 'none'
                        : isCta
                          ? '2px solid #5BC500'
                          : '1.5px solid #E0E0E0',
                      borderRadius: 14,
                      fontSize: isBack ? 13 : 15,
                      color: isBack ? '#999' : isCta ? '#5BC500' : '#1a1a1a',
                      fontWeight: isCta ? 700 : 500,
                      cursor: 'pointer',
                      textAlign: isBack ? 'center' : 'left',
                      transition: 'all 0.2s',
                      WebkitTapHighlightColor: 'transparent',
                      fontFamily: 'inherit',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}

          {finalState && (
            <div
              className="animate-chat-fade-slide-in"
              style={{
                marginTop: 8,
                padding: 20,
                background: '#fff',
                borderRadius: 16,
              }}
            >
              {finalState === 'apply' ? (
                <a
                  href={buildCtaUrl(CTA_URL)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    padding: '14px 24px',
                    background: '#fff',
                    borderRadius: 10,
                    textAlign: 'center',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    boxShadow: '0 0 20px rgba(91, 197, 0, 0.4)',
                    border: '1.5px solid rgba(91, 197, 0, 0.2)',
                  }}
                >
                  연락처 남기기 →
                </a>
              ) : (
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(0,0,0,0.4)',
                    textAlign: 'center',
                    padding: '8px 0',
                  }}
                >
                  언제든 돌아오세요
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom safe area */}
        <div
          style={{
            padding: '12px 16px max(env(safe-area-inset-bottom, 16px), 16px)',
            background: '#fff',
            borderTop: '1px solid #E8E8E8',
            flexShrink: 0,
          }}
        >
          <a
            href={buildCtaUrl(CTA_URL)}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'block',
              padding: '10px 16px',
              background: '#5BC500',
              borderRadius: 20,
              fontSize: 14,
              color: '#FFFFFF',
              fontWeight: 600,
              textAlign: 'center',
              cursor: 'pointer',
              textDecoration: 'none',
            }}
          >
            챗봇 말고 사람이랑 얘기하고싶어요
          </a>
        </div>
      </div>
    </div>
  );
}
