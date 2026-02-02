'use client';

interface SlideIndicatorProps {
  total: number;
  current: number;
}

export default function SlideIndicator({ total, current }: SlideIndicatorProps) {
  return (
    <div className="fixed bottom-36 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50">
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={`rounded-full transition-all duration-300 ${
            index === current
              ? 'w-8 h-1 bg-foreground'
              : 'w-1 h-1 bg-foreground/40'
          }`}
        />
      ))}
    </div>
  );
}
