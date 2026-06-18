# 한달정산 (Capture Finance) 실행 가이드

이 프로젝트를 로컬에서 실행하거나 웹에 배포하는 방법입니다.

## 1. 로컬에서 실행하기 (Local Development)

### 환경 변수 설정
`.env.local` 파일을 생성하고 아래 내용을 입력하세요.

```env
# OpenAI API Key (이미지 분석용)
OPENAI_API_KEY=your_openai_api_key

# Supabase 설정 (데이터 저장용)
NEXT_PUBLIC_SUPABASE_URL=https://ukinitqxblalodsqrlsz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
*   `NEXT_PUBLIC_SUPABASE_ANON_KEY`는 Supabase 대시보드의 **Project Settings > API**에서 확인 가능합니다.

### 실행 명령어
```bash
npm install
npm run dev
```
실행 후 브라우저에서 `http://localhost:3000`에 접속하세요.

---

## 2. 웹에 배포하여 "실행 링크" 만들기 (Vercel)

가장 쉽고 빠른 방법은 **Vercel**을 사용하는 것입니다.

1.  **GitHub에 코드 올리기**:
    *   새 레포지토리를 만들고 현재 폴더의 코드를 Push하세요.
2.  **Vercel 연결**:
    *   [Vercel](https://vercel.com/)에 접속하여 GitHub 레포지토리를 임포트합니다.
3.  **환경 변수 입력**:
    *   Vercel 대시보드 설정에서 위 `.env.local`에 들어갈 값들을 입력합니다.
4.  **배포 완료**:
    *   배포가 완료되면 `https://your-project.vercel.app` 형태의 실행 링크가 생성됩니다.

---

## 3. 주요 링크
- **Supabase 대시보드**: [https://supabase.com/dashboard/project/ukinitqxblalodsqrlsz](https://supabase.com/dashboard/project/ukinitqxblalodsqrlsz)
- **OpenAI API Keys**: [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
