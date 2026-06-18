# 한달정산 (Capture Finance) MVP

스크린샷 한 장으로 끝내는 AI 자동 가계부 서비스입니다.

## 주요 기능
- **AI OCR & 분석**: 카드 명세서/은행 거래내역 이미지를 업로드하면 GPT-4o가 내역을 자동으로 추출합니다.
- **자동 카테고리 분류**: AI가 사용처를 분석하여 식비, 카페, 구독 등으로 분류합니다.
- **구독 탐지**: 반복되는 결제 내역을 찾아 구독 서비스로 표시합니다.

## 시작하기

### 1. 환경 변수 설정
`.env.example` 파일을 복사하여 `.env.local` 파일을 만들고, 필요한 API 키를 입력하세요.
- `OPENAI_API_KEY`: OpenAI API 키 (GPT-4o 접근 권한 필요)
- Supabase 설정 (선택 사항): DB 연동 시 필요

### 2. 의존성 설치
```bash
npm install
```

### 3. 개발 서버 실행
```bash
npm run dev
```

## 기술 스택
- **Framework**: Next.js 14 (App Router)
- **AI**: OpenAI GPT-4o (Vision)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (준비 중)
```
