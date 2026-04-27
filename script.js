'use strict';

/**
 * DOM要素の取得を簡略化するヘルパー関数
 */
const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));

/**
 * ページ読み込み完了時の初期化
 */
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initHamburgerMenu();
  initSmoothScroll();
  initBackToTop();
  initFaqAccordion();
  initScrollAnimations();
});

/**
 * ヘッダーのスクロール時スタイル変更
 */
function initHeaderScroll() {
  const header = $('.header');
  if (!header) return;

  const handleScroll = () => {
    const isScrolled = window.scrollY > 10;
    header.classList.toggle('scrolled', isScrolled);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // 初期状態を設定
}

/**
 * ハンバーガーメニューの開閉制御
 */
function initHamburgerMenu() {
  const hamburger = $('#hamburgerBtn');
  const nav = $('#globalNav');
  
  if (!hamburger || !nav) return;

  const toggleMenu = () => {
    const isOpen = hamburger.classList.contains('is-open');
    
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const openMenu = () => {
    hamburger.classList.add('is-open');
    nav.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'メニューを閉じる');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    hamburger.classList.remove('is-open');
    nav.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'メニューを開く');
    document.body.style.overflow = '';
  };

  // ハンバーガーボタンクリック
  hamburger.addEventListener('click', toggleMenu);

  // ナビリンククリックでメニューを閉じる

  $$('.header__nav-link', nav).forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // メニュー外クリックで閉じる
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
      closeMenu();
    }
  });

  // Escapeキーでメニューを閉じる
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && hamburger.classList.contains('is-open')) {
      closeMenu();
      hamburger.focus();
    }
  });
}

/**
 * スムーススクロールの実装
 */
function initSmoothScroll() {
  const headerHeight = $('.header')?.offsetHeight || 70;


  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      // "#"のみの場合はページトップへ
      if (targetId === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = $(targetId);
      if (targetElement) {
        e.preventDefault();
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        
        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * ページトップボタンの制御
 */
function initBackToTop() {
  const backToTopBtn = $('#backToTop');
  if (!backToTopBtn) return;

  const toggleVisibility = () => {
    const isVisible = window.scrollY > 300;
    backToTopBtn.classList.toggle('visible', isVisible);
    backToTopBtn.hidden = !isVisible;
  };

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // フォーカスをトップに移動
    const topElement = $('#top');
    if (topElement) {
      topElement.setAttribute('tabindex', '-1');
      topElement.focus({ preventScroll: true });
      // タブインデックスを元に戻す
      setTimeout(() => topElement.removeAttribute('tabindex'), 100);
    }
  });

  toggleVisibility(); // 初期状態を設定
}

/**
 * FAQアコーディオンの制御
 */
function initFaqAccordion() {

  $$('.faq__item').forEach(item => {
    const question = $('.faq__question', item);
    if (!question) return;

    question.addEventListener('click', (e) => {
      e.preventDefault();
      
      // 他のアイテムを閉じる（単一開閉の場合）

      $$('.faq__item').forEach(otherItem => {
        if (otherItem !== item && otherItem.open) {
          otherItem.open = false;
        }
      });
      
      // 現在のアイテムを切り替え
      item.open = !item.open;
    });
  });
}

/**
 * スクロールアニメーションの実装
 */
function initScrollAnimations() {
  // IntersectionObserverがサポートされていない場合は何もしない
  if (!('IntersectionObserver' in window)) {
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target); // パフォーマンス向上のため監視を停止
      }
    });
  }, observerOptions);

  // アニメーション対象の要素を設定
  const animateElements = [
    ...$$('.section'),
    ...$$('.skill-card'),
    ...$$('.work-card'),
    ...$$('.faq__item')
  ];

  animateElements.forEach(element => {
    // 初期スタイルを設定
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    
    // 監視を開始
    observer.observe(element);
  });
}

/**
 * ユーティリティ: デバウンス関数
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * エラーハンドリング
 */
window.addEventListener('error', (e) => {
  console.error('JavaScript Error:', e.error);
});

// 未処理のPromise拒否をキャッチ
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled Promise Rejection:', e.reason);
});
