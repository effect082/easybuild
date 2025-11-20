# Mobile Content App

모바일 콘텐츠 크리에이터 애플리케이션

## 기능

- 드래그 앤 드롭 방식의 블록 기반 편집기
- 다양한 블록 타입 (텍스트, 이미지, 영상, 일정, 지도, 입력폼, 사업안내, 헤더, 소셜미디어)
- 프로젝트 저장 및 관리 (localStorage 기반)
- 비밀번호 보호 기능
- 반응형 모바일 미리보기

## 개발 환경 설정

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## GitHub Pages 배포

### 자동 배포 설정

1. GitHub 저장소의 Settings → Pages로 이동
2. Source를 "GitHub Actions"로 선택
3. `main` 브랜치에 푸시하면 자동으로 배포됩니다

### 수동 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# dist 폴더를 GitHub Pages에 배포
# (gh-pages 패키지 사용 시)
npm install -g gh-pages
gh-pages -d dist
```

## 프로젝트 구조

```
src/
├── blocks/           # 블록 컴포넌트 및 레지스트리
├── components/       # UI 컴포넌트
│   ├── Editor/       # 편집기 관련 컴포넌트
│   └── Layout/       # 레이아웃 컴포넌트
├── context/          # React Context (상태 관리)
├── templates/        # 초기 템플릿 데이터
├── utils/            # 유틸리티 함수
└── App.jsx           # 메인 앱 컴포넌트
```

## 기술 스택

- **React 19** - UI 프레임워크
- **Vite** - 빌드 도구
- **localStorage** - 로컬 데이터 저장
- **CSS Modules** - 스타일링

## 라이선스

MIT License
