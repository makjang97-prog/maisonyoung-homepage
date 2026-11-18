/* =========================================================
   (주)메종영 MAISON YOUNG — script.js
   1) 헤더 상태 / 2) 모바일 메뉴 / 3) 스크롤 등장
   4) 현재 섹션 표시 / 5) 영상 슬롯 / 6) 상담 폼
   ========================================================= */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var nav = document.getElementById('primaryNav');
  var navToggle = document.getElementById('navToggle');
  var prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. 헤더 배경 / 현재 섹션 ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link'));
  var targets = links
    .map(function (link) { return document.querySelector(link.getAttribute('href')); })
    .filter(Boolean);

  function updateActive() {
    if (!targets.length) return;
    var pos = window.scrollY + window.innerHeight * 0.35;
    var current = null;
    targets.forEach(function (t) {
      if (t.getBoundingClientRect().top + window.scrollY <= pos) current = t;
    });
    links.forEach(function (link) {
      link.classList.toggle('is-active', !!current && link.getAttribute('href') === '#' + current.id);
    });
  }

  function onScroll() {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');
    updateActive();
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', updateActive);

  /* ---------- 2. 모바일 메뉴 ---------- */
  function setMenu(open) {
    nav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    document.body.classList.toggle('nav-open', open);
  }

  navToggle.addEventListener('click', function () {
    setMenu(!nav.classList.contains('is-open'));
  });

  nav.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      setMenu(false);
      navToggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 760 && nav.classList.contains('is-open')) setMenu(false);
  });

  /* ---------- 3. 스크롤 등장 ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (prefersReduce || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 4. (현재 섹션 표시는 1번에서 처리) ---------- */

  /* ---------- 5. 영상 슬롯 ----------
     HTML 의 <figure class="film" data-video="주소" data-title="제목"> 에
     유튜브(https://youtu.be/ID, https://www.youtube.com/watch?v=ID) 또는
     MP4/웹 영상 주소를 넣으면 카드가 플레이어로 바뀝니다.
     제목(data-title)을 넣으면 프레임 아래 캡션에 표시됩니다. */
  function youtubeId(url) {
    var m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/))([\w-]{6,})/);
    return m ? m[1] : null;
  }

  document.querySelectorAll('.film').forEach(function (film) {
    var src = (film.getAttribute('data-video') || '').trim();
    var title = (film.getAttribute('data-title') || '').trim();
    var frame = film.querySelector('.film__frame');
    var cap = film.querySelector('.film__cap');
    if (!src || !frame) return;

    var yt = youtubeId(src);
    var el;

    if (yt) {
      el = document.createElement('iframe');
      el.src = 'https://www.youtube.com/embed/' + yt + '?rel=0';
      el.title = title || '메종영 포트폴리오 영상';
      el.loading = 'lazy';
      el.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      el.allowFullscreen = true;
    } else {
      el = document.createElement('video');
      el.src = src;
      el.controls = true;
      el.playsInline = true;
      el.preload = 'metadata';
      if (title) el.setAttribute('aria-label', title);
    }

    frame.innerHTML = '';
    frame.appendChild(el);
    frame.style.background = '#000';

    if (cap) {
      cap.innerHTML = '';
      var span = document.createElement('span');
      span.textContent = title || '메종영 포트폴리오 영상';
      cap.appendChild(span);
    }
  });

  /* ---------- 6. 상담 폼 (정적 사이트 → 메일 앱으로 전달) ---------- */
  var form = document.getElementById('contactForm');
  var note = document.getElementById('formNote');
  var MAIL = 'contact@maisonyoung.co.kr';

  if (form) {
    var f = form.elements;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = f.name.value.trim();
      var phone = f.phone.value.trim();
      var type = f.type.value;
      var message = f.message.value.trim();

      if (!name || !phone) {
        note.textContent = '성함과 연락처를 입력해 주세요.';
        note.classList.add('is-error');
        note.classList.remove('is-ok');
        (!name ? f.name : f.phone).focus();
        return;
      }

      var subject = '[메종영 홈페이지 상담] ' + type + ' — ' + name;
      var body = [
        '문의 유형: ' + type,
        '성함: ' + name,
        '연락처: ' + phone,
        '',
        '문의 내용',
        (message || '(작성하지 않음)'),
        '',
        '— 메종영 홈페이지에서 보냄'
      ].join('\r\n');

      var href = 'mailto:' + MAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = href;
      note.textContent = '메일 앱이 열리면 그대로 보내주세요. 열리지 않으면 ' + MAIL + ' 또는 010-2047-4596 으로 연락 주세요.';
      note.classList.remove('is-error');
      note.classList.add('is-ok');
    });
  }

  /* ---------- 7. 연도 ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
