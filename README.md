# Todo List

## 📝 프로젝트 소개

코드잇 프론트엔드 단기심화 과정의 과제테스트로 제작된 Todo 앱.
TenantId 를 클라이언트에게 숨기기 위해 노력하였습니다.

## 🔗 배포 링크

[배포 링크](your-deployment-url)

## 🛠 사용 스택

### Frontend

- Next.js 15.1.6
- TypeScript
- Tailwind CSS
- shadcn/ui

### 상태 관리 & 데이터 처리

- TanStack Query (무한 스크롤)
- Zod (데이터 유효성 검증)

### 개발 도구

- pnpm (패키지 매니저)
- Turbopack

## ✨ 주요 기능

### 할 일 목록 페이지 (`/`)

- 진행 중/완료된 할 일 구분 표시
- 할 일 추가 (입력 + 엔터키/버튼 클릭)
- 할 일 완료 상태 토글
- name 클릭시 디테일 페이지 이동
- 무한 스크롤을 통한 할 일 목록 로딩 (tanstackQuery)

### 할 일 상세 페이지 (`/items/{itemId}`)

- 할 일 이름 수정 (3글자 이상, 포커스 빠질시 자동저장)
- 메모 추가/수정
- 이미지 업로드 (영문 파일명, 5MB 이하)
- 할 일 삭제

### 부가 기능

- Toast 알림
- 반응형 웹 디자인 (모바일/태블릿/데스크탑)
- Not Found 페이지

## 🚀 시작하기

### 설치

```bash

# 의존성 설치
pnpm install

# 개발 서버 실행
pnpm dev
```

### 환경 설정

`.env`

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
TENANT_ID= 고유값이면 됩니다
API_URL= 백엔드 주소
```

## ⚙️ 구현 사항

### 필수 요구사항

- [o] 컬러 시스템 설정
- [o] 공용 컴포넌트 구현
- [o] 반응형 웹 디자인 (mob->tab->desk)
- [o] 할 일 목록 CRUD
- [o] 상세 페이지 기능 (메모, 이미지 업로드)

### 추가 구현사항

- [o] Toast 알림 시스템
- [o] TanStack Query를 활용한 무한 스크롤
- [o] Zod를 통한 데이터 검증
- [o] Not Found 페이지 커스터마이징

### 미 구현사항

- [x] 테스트코드 작성
- [x] 낙관적 업데이트

## 📂 프로젝트 구조

```
├── README.md
├── app
│   ├── TanstackProvider.tsx
│   ├── api
│   │   ├── detai

│   │   │   └── [itemId]
│   │   │       └── route.ts
│   │   ├── images
│   │   │   └── upload
│   │   │       └── route.ts
│   │   └── todos
│   │       └── route.ts
│   ├── detail
│   │   └── [itemId]
│   │       ├── ButtonGroup.tsx
│   │       ├── DetailPageClient.tsx
│   │       ├── ImageUpload.tsx
│   │       ├── MemoInput.tsx
│   │       ├── NameInput.tsx
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   └── provider.tsx
├── components
│   ├── Empty
│   │   ├── DoneEmpty.tsx
│   │   └── TodoEmpty.tsx
│   ├── ItemList
│   │   ├── DoneList.tsx
│   │   ├── DoneListItem.tsx
│   │   ├── TodoList.tsx
│   │   └── TodoListItem.tsx
│   ├── Nav
│   │   └── Navbar.tsx
│   ├── SearchBox
│   │   └── SearchBox.tsx
│   ├── Todosection
│   │   ├── client.tsx
│   │   └── index.tsx
│   └── ui
│       ├── toast.tsx
│       └── toaster.tsx
├── components.json
├── eslint.config.mjs
├── hooks
│   └── use-toast.ts
├── lib
│   └── utils.ts
```
