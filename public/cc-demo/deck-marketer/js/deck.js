/* ============================================================
   발렌 세미나 Part 1 — deck.js
   키보드 네비 · 스크롤 스냅 동기화 · 진행바/카운터 · 풀스크린
   규칙: DECK_GUIDE.md §6
   ============================================================ */
(() => {
  const deck = document.getElementById('deck');
  const slides = Array.from(deck.querySelectorAll('.slide'));
  const progress = document.getElementById('progress');
  const counterCur = document.querySelector('#counter .cur');
  const totalEl = document.getElementById('total');

  let index = 0;
  totalEl.textContent = slides.length;

  function sync(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    counterCur.textContent = index + 1;
    progress.style.width = ((index + 1) / slides.length) * 100 + '%';
  }

  function goto(i) {
    const clamped = Math.max(0, Math.min(slides.length - 1, i));
    slides[clamped].scrollIntoView({ behavior: 'smooth', block: 'start' });
    sync(clamped);
  }

  // 수동 스크롤도 현재 슬라이드에 반영
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) sync(slides.indexOf(e.target));
    });
  }, { root: deck, threshold: 0.6 });
  slides.forEach((s) => io.observe(s));

  // 키보드 네비
  window.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight': case 'ArrowDown': case 'PageDown': case ' ':
        e.preventDefault(); goto(index + 1); break;
      case 'ArrowLeft': case 'ArrowUp': case 'PageUp':
        e.preventDefault(); goto(index - 1); break;
      case 'Home': e.preventDefault(); goto(0); break;
      case 'End': e.preventDefault(); goto(slides.length - 1); break;
      case 'f': case 'F':
        e.preventDefault();
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
        break;
    }
  });

  sync(0);
})();
