# (주)메종영 홈페이지 — 정적 사이트

`documents/maisonyoung-homepage/claude-source/` 의 공식 자료(문서 5개, 시안 6화면, 메인 화면 HTML, 로고 원본, 촬영 현장 사진)를 바탕으로 만든 **한 페이지 스크롤형 정적 사이트**입니다.
빌드 도구 없이 파일 그대로 올리면 동작하고, 나중에 Next.js 등으로 옮기기도 쉬운 구조입니다.

## 구성

```
site/
├─ index.html            전체 페이지(7개 섹션 + 헤더 + 푸터)
├─ styles.css            디자인 시스템(색·서체·레이아웃·반응형)
├─ script.js             헤더 상태 / 모바일 메뉴 / 스크롤 등장 / 영상 슬롯 / 상담 폼
└─ images/
   ├─ logo-dark.png      어두운 배경용 로고(검정 글자→아이보리, 배경 투명, 금색 유지)
   ├─ logo-dark-640.png  헤더·푸터용 축소본
   ├─ favicon.png        방패 모노그램 파비콘
   ├─ eardream-set.jpg / -1600 / -900   이어드림 촬영 현장 흐림본(히어로·팀 소개 배경)
   └─ eardream-camera.jpg               서비스 01 카드용 세로 크롭
```

- 섹션: `#top` 메인 / `#service` 서비스 / `#story` 브랜드 스토리 / `#team` 팀 소개 / `#works` 일하는 방식·영상·함께한 곳 / `#vision` 비전 / `#contact` 문의
- 색: 배경 `#0d0d0e`·`#121214`, 카드 `#18181b`, 금색 `#C9A96E`(hover `#d8bc86`), 본문 `#F5F3EE`/`#A8A29E`
- 서체: 제목 `Noto Serif KR`, 영문 라벨 `Cormorant Garamond`, 본문 `Noto Sans KR` (Google Fonts)
- 반응형: 1440px 데스크톱 ~ 320px 까지 확인, 760px 이하에서 햄버거 메뉴

## 로컬에서 보기

```bash
cd site
python3 -m http.server 8000
# 브라우저에서 http://localhost:8000
```

`index.html` 을 더블클릭해도 대부분 보이지만, 폰트·이미지 경로 문제를 피하려면 위처럼 띄우는 편이 안전합니다.

## 배포 현황 (2026-11-18 연결 완료)

빌드 도구 없이 이 폴더가 그대로 배포됩니다.

| 항목 | 값 |
|---|---|
| GitHub 저장소 | https://github.com/makjang97-prog/maisonyoung-homepage (public, `main`) |
| Vercel 프로젝트 | `maisonyoung` (팀 `maisonyoung`, Hobby 무료) — 저장소 루트 = 이 폴더 |
| 운영 주소 | **https://maisonyoung.co.kr** |
| 함께 연결 | `www.maisonyoung.co.kr`(같은 사이트), `maisonyoung.kr`·`www.maisonyoung.kr`(308 리다이렉트 → `maisonyoung.co.kr`) |
| Vercel 기본 주소 | https://maisonyoung.vercel.app |
| DNS | 가비아 DNS 관리 (A `@` → `216.198.79.1`, CNAME `www` → `74bf7955529234ec.vercel-dns-017.com.`) |

**수정하는 방법** — 이 폴더의 파일을 고쳐 `main` 브랜치에 push 하면 Vercel이 자동으로 다시 배포합니다(1분 내).

```bash
cd documents/maisonyoung-homepage/site
git add -A && git commit -m "문구 수정" && git push
```

주의: `maisonyoung.co.kr` 의 **MX(다음 스마트워크 2건)·TXT(SPF)** 레코드는 메일용이므로 DNS에서 지우거나 바꾸지 않습니다. 웹 연결용 A/CNAME만 위 값으로 유지합니다.

Vercel Hobby는 약관상 비상업·개인 용도 기준입니다. 법인 사이트로 트래픽이 늘면 유료 전환을 요청받을 수 있고, 그때는 Cloudflare Pages·GitHub Pages 같은 무료 대안으로 옮길 수 있습니다.

## 아직 비어 있는 자리 — 채우는 방법

### 1) 영상 3개 (05 포트폴리오)
`index.html` 의 `<figure class="film" data-video="" data-title="">` 세 곳에 주소만 넣으면 카드가 자동으로 플레이어로 바뀝니다.

```html
<figure class="film reveal" data-video="https://youtu.be/영상ID" data-title="인천광역시 i+ 이어드림 홍보영상">
```

- 유튜브: `https://youtu.be/ID`, `https://www.youtube.com/watch?v=ID`, `https://www.youtube.com/shorts/ID` 모두 인식
- MP4: `data-video="videos/promo.mp4"` 처럼 파일 경로를 넣으면 `<video>` 로 재생 (파일은 `site/images/` 옆에 두면 됩니다)
- `data-title` 을 비우면 캡션에 "메종영 포트폴리오 영상"으로 표시됩니다.

### 2) 행사 현장 사진 (02 서비스 · 02 행사 기획 카드)
지금은 사진이 없어서 **금색 라인 + MAISON YOUNG / EVENT·CURATION** 로 만든 에디토리얼 프레임이 들어가 있습니다.
사진이 오면 `index.html` 에서 아래 부분을 이미지로 바꾸면 됩니다.

```html
<!-- before -->
<div class="card__media card__media--editorial"> …plaque… </div>
<!-- after -->
<div class="card__media">
  <img src="images/event-01.jpg" width="1200" height="1500" loading="lazy" alt="행사 현장">
  <span class="card__caption">‘아빠랑 행복한 피날레’ 체험 행사</span>
</div>
```
(사진은 세로 4:5 비율로 잘라 두면 가장 자연스럽습니다.)

### 3) 문의 이메일·도메인
- 지금 주소는 `contact@maisonyoung.co.kr` **자리 표시자**입니다. 도메인을 먼저 연결한 뒤 메일(Google Workspace, 네이버 웍스, Vercel+Resend 등)을 만들고, 실제로 받을 수 있게 되면 그대로 사용하면 됩니다.
- 주소가 바뀌면 `index.html`, `footer`, `script.js` 의 `MAIL` 상수 세 곳을 함께 바꿔 주세요.
- 상담 폼은 서버가 없어서 **메일 앱을 여는 방식(mailto)** 으로 동작합니다. 방문자 메일 앱이 없으면 전화번호가 안내됩니다.
  나중에 실제 접수 폼이 필요하면 Formspree·Google Forms·Resend API 등으로 `script.js` 의 submit 부분만 교체하면 됩니다.

## 수정할 때 위치

| 바꾸고 싶은 것 | 위치 |
|---|---|
| 색·서체·여백 | `styles.css` 상단 `:root` 변수 |
| 메뉴 항목 | `index.html` 의 `<nav class="nav">` |
| 섹션 순서 | `index.html` 의 `<section>` 블록 순서 |
| 스크롤 등장 속도 | `styles.css` 의 `.js .reveal` |
| 푸터 사업자 정보 | `index.html` 의 `<footer>` |

## 검수 이미지

`documents/maisonyoung-homepage/previews/` 에 PC(1440px)·모바일(390px) 캡처가 있습니다.
다시 캡처하려면: `python3 scripts/shoot.py` (헤드리스 크로미움 필요)
