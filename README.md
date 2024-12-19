# 간편 채팅 서비스, grape

### 🔗 [grape](https://grape-chat.vercel.app/)

<br/>

### 기술 스택

- **Client**: React, TypeScript, StyleX, Tanstack-query, Jotai
- **Database**: Supabase
- **Deployment**: Vercel

<br/>

### ERD Diagram
<img width="1123" alt="diagram" src="https://github.com/user-attachments/assets/1a065468-4449-4975-8d14-8f9486032c0a" />


## UI Design
![UI](https://github.com/user-attachments/assets/fabbc9e4-cca7-4c17-a94f-bbd064a9a06d)

<br/>

### 주요 기능

- 회원가입/로그인
- 프로필 설정
- 1:1 채팅
- 친구 추가
- 비밀번호 변경
- 로그아웃


<br/>

### 프로젝트 목적

1. **React 렌더링 과정과 상태 관리에 대한 이해**
2. **Tanstack-query 사용법 학습**
    
    비동기 상태 관리와 데이터 캐싱을 효율적으로 처리하는 방법을 이해하고, 실시간 데이터 요청 및 서버 상태 관리의 best practice를 고민했습니다.
    
3. **실시간 통신 원리 학습**
    
    Supabase Realtime을 활용한 실시간 데이터 처리 방법을 익히고, 이를 바탕으로 실시간 채팅 기능을 구현했습니다.
    
4. **Jotai 상태 관리 학습**
    
    Jotai를 사용해 애플리케이션 상태를 atom 단위로 관리하고, 해당 라이브러리에 대한 깊은 이해를 목표로 삼았습니다.
    
5. **Meta의 StyleX 학습**
    
    Meta에서 개발한 새로운 스타일 라이브러리인 StyleX를 이해하고, 이를 효율적으로 프로젝트에 적용하고자 했습니다.

<br/>

### 학습 내용
|제목|
|---|
|[WebSocket과 실시간 웹 애플리케이션](https://velog.io/@xxziiko/WebSocket%EA%B3%BC-%EC%8B%A4%EC%8B%9C%EA%B0%84-%EC%9B%B9-%EC%95%A0%ED%94%8C%EB%A6%AC%EC%BC%80%EC%9D%B4%EC%85%98)|
|[Context API와 Jotai: 인증 상태 관리를 어떻게 더 효율적으로 만들까?](https://velog.io/@xxziiko/Context-API%EC%99%80-Jotai)
|[Context API 리렌더링과 React.memo의 한계](https://velog.io/@xxziiko/Context-API-%EC%82%AC%EC%9A%A9-%EC%8B%9C-%EB%A6%AC%EB%A0%8C%EB%8D%94%EB%A7%81-%EB%AC%B8%EC%A0%9C%EC%99%80-React.memo%EC%9D%98-%ED%95%9C%EA%B3%84)



<br/>


### 설치 및 실행 방법

**Installation**

```sql
  npm install
```

**Running the Project**

```sql
  npm run dev
```

<br/>

### **Commit Convention**

- feat: 새로운 기능 추가
- fix: 버그 수정
- docs: 문서 수정
- style: 코드 스타일 변경 (코드 포매팅, 세미콜론 누락 등)
- design: 사용자 UI 디자인 변경 (CSS 등)
- test: 테스트 코드, 리팩토링 (Test Code)
- refactor: 리팩토링 (Production Code)
- build: 빌드 파일 수정
- ci: CI 설정 파일 수정
- perf: 성능 개선
- chore: 자잘한 수정이나 빌드 업데이트
- rename: 파일 혹은 폴더명을 수정만 한 경우
- remove: 파일을 삭제만 한 경우
