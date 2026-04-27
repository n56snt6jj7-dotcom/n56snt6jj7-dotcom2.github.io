{\rtf1\ansi\ansicpg932\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww33400\viewh19380\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 'use strict';\
\
/**\
 * DOM\uc0\u35201 \u32032 \u12398 \u21462 \u24471 \u12434 \u31777 \u30053 \u21270 \u12377 \u12427 \u12504 \u12523 \u12497 \u12540 \u38306 \u25968 \
 */\
const $ = (selector, context = document) => context.querySelector(selector);\
const $$ = (selector, context = document) => Array.from(context.querySelectorAll(selector));\
\
/**\
 * \uc0\u12506 \u12540 \u12472 \u35501 \u12415 \u36796 \u12415 \u23436 \u20102 \u26178 \u12398 \u21021 \u26399 \u21270 \
 */\
document.addEventListener('DOMContentLoaded', () => \{\
  initHeaderScroll();\
  initHamburgerMenu();\
  initSmoothScroll();\
  initBackToTop();\
  initFaqAccordion();\
  initScrollAnimations();\
\});\
\
/**\
 * \uc0\u12504 \u12483 \u12480 \u12540 \u12398 \u12473 \u12463 \u12525 \u12540 \u12523 \u26178 \u12473 \u12479 \u12452 \u12523 \u22793 \u26356 \
 */\
function initHeaderScroll() \{\
  const header = $('.header');\
  if (!header) return;\
\
  const handleScroll = () => \{\
    const isScrolled = window.scrollY > 10;\
    header.classList.toggle('scrolled', isScrolled);\
  \};\
\
  window.addEventListener('scroll', handleScroll, \{ passive: true \});\
  handleScroll(); // \uc0\u21021 \u26399 \u29366 \u24907 \u12434 \u35373 \u23450 \
\}\
\
/**\
 * \uc0\u12495 \u12531 \u12496 \u12540 \u12460 \u12540 \u12513 \u12491 \u12517 \u12540 \u12398 \u38283 \u38281 \u21046 \u24481 \
 */\
function initHamburgerMenu() \{\
  const hamburger = $('#hamburgerBtn');\
  const nav = $('#globalNav');\
  \
  if (!hamburger || !nav) return;\
\
  const toggleMenu = () => \{\
    const isOpen = hamburger.classList.contains('is-open');\
    \
    if (isOpen) \{\
      closeMenu();\
    \} else \{\
      openMenu();\
    \}\
  \};\
\
  const openMenu = () => \{\
    hamburger.classList.add('is-open');\
    nav.classList.add('is-open');\
    hamburger.setAttribute('aria-expanded', 'true');\
    hamburger.setAttribute('aria-label', '\uc0\u12513 \u12491 \u12517 \u12540 \u12434 \u38281 \u12376 \u12427 ');\
    document.body.style.overflow = 'hidden';\
  \};\
\
  const closeMenu = () => \{\
    hamburger.classList.remove('is-open');\
    nav.classList.remove('is-open');\
    hamburger.setAttribute('aria-expanded', 'false');\
    hamburger.setAttribute('aria-label', '\uc0\u12513 \u12491 \u12517 \u12540 \u12434 \u38283 \u12367 ');\
    document.body.style.overflow = '';\
  \};\
\
  // \uc0\u12495 \u12531 \u12496 \u12540 \u12460 \u12540 \u12508 \u12479 \u12531 \u12463 \u12522 \u12483 \u12463 \
  hamburger.addEventListener('click', toggleMenu);\
\
  // \uc0\u12490 \u12499 \u12522 \u12531 \u12463 \u12463 \u12522 \u12483 \u12463 \u12391 \u12513 \u12491 \u12517 \u12540 \u12434 \u38281 \u12376 \u12427 \
\
  $$('.header__nav-link', nav).forEach(link => \{\
    link.addEventListener('click', closeMenu);\
  \});\
\
  // \uc0\u12513 \u12491 \u12517 \u12540 \u22806 \u12463 \u12522 \u12483 \u12463 \u12391 \u38281 \u12376 \u12427 \
  document.addEventListener('click', (e) => \{\
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) \{\
      closeMenu();\
    \}\
  \});\
\
  // Escape\uc0\u12461 \u12540 \u12391 \u12513 \u12491 \u12517 \u12540 \u12434 \u38281 \u12376 \u12427 \
  document.addEventListener('keydown', (e) => \{\
    if (e.key === 'Escape' && hamburger.classList.contains('is-open')) \{\
      closeMenu();\
      hamburger.focus();\
    \}\
  \});\
\}\
\
/**\
 * \uc0\u12473 \u12512 \u12540 \u12473 \u12473 \u12463 \u12525 \u12540 \u12523 \u12398 \u23455 \u35013 \
 */\
function initSmoothScroll() \{\
  const headerHeight = $('.header')?.offsetHeight || 70;\
\
\
  $$('a[href^="#"]').forEach(link => \{\
    link.addEventListener('click', (e) => \{\
      const targetId = link.getAttribute('href');\
      \
      // "#"\uc0\u12398 \u12415 \u12398 \u22580 \u21512 \u12399 \u12506 \u12540 \u12472 \u12488 \u12483 \u12503 \u12408 \
      if (targetId === '#') \{\
        e.preventDefault();\
        window.scrollTo(\{ top: 0, behavior: 'smooth' \});\
        return;\
      \}\
\
      const targetElement = $(targetId);\
      if (targetElement) \{\
        e.preventDefault();\
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight - 20;\
        \
        window.scrollTo(\{\
          top: Math.max(0, targetPosition),\
          behavior: 'smooth'\
        \});\
      \}\
    \});\
  \});\
\}\
\
/**\
 * \uc0\u12506 \u12540 \u12472 \u12488 \u12483 \u12503 \u12508 \u12479 \u12531 \u12398 \u21046 \u24481 \
 */\
function initBackToTop() \{\
  const backToTopBtn = $('#backToTop');\
  if (!backToTopBtn) return;\
\
  const toggleVisibility = () => \{\
    const isVisible = window.scrollY > 300;\
    backToTopBtn.classList.toggle('visible', isVisible);\
    backToTopBtn.hidden = !isVisible;\
  \};\
\
  window.addEventListener('scroll', toggleVisibility, \{ passive: true \});\
\
  backToTopBtn.addEventListener('click', () => \{\
    window.scrollTo(\{ top: 0, behavior: 'smooth' \});\
    \
    // \uc0\u12501 \u12457 \u12540 \u12459 \u12473 \u12434 \u12488 \u12483 \u12503 \u12395 \u31227 \u21205 \
    const topElement = $('#top');\
    if (topElement) \{\
      topElement.setAttribute('tabindex', '-1');\
      topElement.focus(\{ preventScroll: true \});\
      // \uc0\u12479 \u12502 \u12452 \u12531 \u12487 \u12483 \u12463 \u12473 \u12434 \u20803 \u12395 \u25147 \u12377 \
      setTimeout(() => topElement.removeAttribute('tabindex'), 100);\
    \}\
  \});\
\
  toggleVisibility(); // \uc0\u21021 \u26399 \u29366 \u24907 \u12434 \u35373 \u23450 \
\}\
\
/**\
 * FAQ\uc0\u12450 \u12467 \u12540 \u12487 \u12451 \u12458 \u12531 \u12398 \u21046 \u24481 \
 */\
function initFaqAccordion() \{\
\
  $$('.faq__item').forEach(item => \{\
    const question = $('.faq__question', item);\
    if (!question) return;\
\
    question.addEventListener('click', (e) => \{\
      e.preventDefault();\
      \
      // \uc0\u20182 \u12398 \u12450 \u12452 \u12486 \u12512 \u12434 \u38281 \u12376 \u12427 \u65288 \u21336 \u19968 \u38283 \u38281 \u12398 \u22580 \u21512 \u65289 \
\
      $$('.faq__item').forEach(otherItem => \{\
        if (otherItem !== item && otherItem.open) \{\
          otherItem.open = false;\
        \}\
      \});\
      \
      // \uc0\u29694 \u22312 \u12398 \u12450 \u12452 \u12486 \u12512 \u12434 \u20999 \u12426 \u26367 \u12360 \
      item.open = !item.open;\
    \});\
  \});\
\}\
\
/**\
 * \uc0\u12473 \u12463 \u12525 \u12540 \u12523 \u12450 \u12491 \u12513 \u12540 \u12471 \u12519 \u12531 \u12398 \u23455 \u35013 \
 */\
function initScrollAnimations() \{\
  // IntersectionObserver\uc0\u12364 \u12469 \u12509 \u12540 \u12488 \u12373 \u12428 \u12390 \u12356 \u12394 \u12356 \u22580 \u21512 \u12399 \u20309 \u12418 \u12375 \u12394 \u12356 \
  if (!('IntersectionObserver' in window)) \{\
    return;\
  \}\
\
  const observerOptions = \{\
    root: null,\
    rootMargin: '0px 0px -50px 0px',\
    threshold: 0.1\
  \};\
\
  const observer = new IntersectionObserver((entries) => \{\
    entries.forEach(entry => \{\
      if (entry.isIntersecting) \{\
        entry.target.style.opacity = '1';\
        entry.target.style.transform = 'translateY(0)';\
        observer.unobserve(entry.target); // \uc0\u12497 \u12501 \u12457 \u12540 \u12510 \u12531 \u12473 \u21521 \u19978 \u12398 \u12383 \u12417 \u30435 \u35222 \u12434 \u20572 \u27490 \
      \}\
    \});\
  \}, observerOptions);\
\
  // \uc0\u12450 \u12491 \u12513 \u12540 \u12471 \u12519 \u12531 \u23550 \u35937 \u12398 \u35201 \u32032 \u12434 \u35373 \u23450 \
  const animateElements = [\
    ...$$('.section'),\
    ...$$('.skill-card'),\
    ...$$('.work-card'),\
    ...$$('.faq__item')\
  ];\
\
  animateElements.forEach(element => \{\
    // \uc0\u21021 \u26399 \u12473 \u12479 \u12452 \u12523 \u12434 \u35373 \u23450 \
    element.style.opacity = '0';\
    element.style.transform = 'translateY(20px)';\
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';\
    \
    // \uc0\u30435 \u35222 \u12434 \u38283 \u22987 \
    observer.observe(element);\
  \});\
\}\
\
/**\
 * \uc0\u12518 \u12540 \u12486 \u12451 \u12522 \u12486 \u12451 : \u12487 \u12496 \u12454 \u12531 \u12473 \u38306 \u25968 \
 */\
function debounce(func, wait) \{\
  let timeout;\
  return function executedFunction(...args) \{\
    const later = () => \{\
      clearTimeout(timeout);\
      func.apply(this, args);\
    \};\
    clearTimeout(timeout);\
    timeout = setTimeout(later, wait);\
  \};\
\}\
\
/**\
 * \uc0\u12456 \u12521 \u12540 \u12495 \u12531 \u12489 \u12522 \u12531 \u12464 \
 */\
window.addEventListener('error', (e) => \{\
  console.error('JavaScript Error:', e.error);\
\});\
\
// \uc0\u26410 \u20966 \u29702 \u12398 Promise\u25298 \u21542 \u12434 \u12461 \u12515 \u12483 \u12481 \
window.addEventListener('unhandledrejection', (e) => \{\
  console.error('Unhandled Promise Rejection:', e.reason);\
\});\
}