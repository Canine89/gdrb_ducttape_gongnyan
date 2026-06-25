# 이게 되네? GPT Image 2 미친 활용법 61제 · 프롬프트 복붙 사이트

Google 스프레드시트에 정리된 **장 / 번호 / 제목 / 순서 / 프롬프트**를 불러와, 검색·필터 후 **복사** 버튼으로 바로 쓸 수 있는 Next.js 단일 페이지입니다.

## 사전 조건 (스프레드시트)

- 시트가 **「링크가 있는 모든 사용자: 뷰어」** 이상으로 공개되어 있어야 합니다.
- CSV 내보내기 URL로 읽습니다:  
  `https://docs.google.com/spreadsheets/d/<ID>/export?format=csv&gid=0`
- 시트 ID는 코드의 [`src/lib/sheets.ts`](src/lib/sheets.ts)에 있습니다.

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 엽니다.

## 빌드

```bash
npm run build
npm start
```

## 배포 (Vercel)

1. 저장소를 Vercel에 연결합니다.
2. 프로젝트 설정에서 **환경 변수** `NEXT_PUBLIC_SITE_URL`에 배포 도메인을 넣습니다.  
   예: `https://your-site.vercel.app`  
   (OG/Twitter 이미지 URL 해석용 `metadataBase`에 사용됩니다.)
3. 배포 후 시트만 수정하면, 페이지는 **최대 약 60초** 내에 갱신됩니다 (`revalidate: 60`).

## 디자인

- UI 컬러는 **ChatGPT / OpenAI 브랜드 팔레트**를 기준으로 [`src/app/globals.css`](src/app/globals.css)의 `@theme`에서 조정합니다.
  - OpenAI Green: `#10A37F`
  - Black / Ink: `#0F0F0F`
  - Tint: `#ECFDF5`
- 표지 이미지: `public/cover.jpeg` (없으면 ChatGPT 테마 플레이스홀더가 표시됩니다).

## 구매·원본 링크

도서 링크는 [`src/lib/links.ts`](src/lib/links.ts)에서 한 곳에 모아 두었습니다. 출간 후 검색 URL 대신 상품 상세 URL로 바꾸면 됩니다.

## 기술 스택

- Next.js (App Router) · React · TypeScript
- Tailwind CSS v4 (`@theme` 토큰)
- Pretendard
- papaparse (CSV)
- Google Sheets CSV export (실시간 반영, ISR 60초)
