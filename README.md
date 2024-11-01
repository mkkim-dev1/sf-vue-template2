이 프로젝트는 Vue.js를 사용하여 구축된 웹 애플리케이션입니다. 프로젝트는 여러 파일과 폴더로 구성되어 있으며, 각 파일과 폴더는 특정한 기능을 수행합니다.

### 화면구성
- Books: 도서 목록을 테이블 형태로 표시하며, 도서 등록/수정/삭제 기능을 제공하는 페이지
- Dashboard: 차트 예시 6가지를 보여주는 페이지. 차트는 echarts를 사용 함.
- Chat: Websocket을 이용한 실시간 체팅 예시 페이지. (Websocket 서버 필요)
- Profile: 더미 페이지
- About: 더미 페이지

### 프로젝트 구조

- src: 이 폴더는 프로젝트의 소스 코드를 포함합니다.
- main.ts: 이 파일은 프로젝트의 엔트리 포인트입니다. Vue.js 애플리케이션을 생성하고, 라우터와 스토어를 설정합니다.
- App.vue: 이 파일은 프로젝트의 루트 컴포넌트입니다. 애플리케이션의 레이아웃과 라우팅을 정의합니다.
- router: 이 폴더는 라우팅을 정의합니다. 라우터는 URL에 따라 컴포넌트를 렌더링합니다.
- store: 이 폴더는 상태 관리를 정의합니다. 스토어는 애플리케이션의 상태를 관리합니다.
- views: 이 폴더는 각 라우트에 해당하는 컴포넌트를 포함합니다.
- components: 이 폴더는 재사용 가능한 컴포넌트를 포함합니다.
- public: 이 폴더는 정적 파일을 포함합니다. 정적 파일은 애플리케이션의 시작 시점에 로드됩니다.
- comms: 서버와 주고 받는 Rest API가 정의되어 있다.

### 프로젝트 기능

- 라우팅: 프로젝트는 라우팅을 사용하여 URL에 따라 컴포넌트를 렌더링합니다.
- 상태 관리: 프로젝트는 Vuex를 사용하여 상태 관리를 구현합니다.
- WebSocket: 프로젝트는 WebSocket을 사용하여 실시간 통신을 구현합니다.
- 데이터 테이블: 프로젝트는 PrimeVue를 사용하여 데이터 테이블을 구현합니다.

### 프로젝트 컴포넌트

- App.vue: 루트 컴포넌트
- HomeView.vue: 홈 뷰 컴포넌트
- Books.vue: 책 목록 뷰 컴포넌트
- Chat.vue: 채팅 뷰 컴포넌트
- Settings.vue: 설정 뷰 컴포넌트
- About.vue: 정보 뷰 컴포넌트

### 프로젝트 의존성

- vue: Vue.js 프레임워크
- vue-router: 라우팅 라이브러리
- vuex: 상태 관리 라이브러리
- primevue: UI 컴포넌트 라이브러리
- websocket: WebSocket 라이브러리

### 라우터

- /: 루트 경로입니다. 이 경로는 /books 경로로 리다이렉트됩니다.
- /dashboard: 대시보드 경로입니다. 이 경로는 Dashboard 컴포넌트를 렌더링합니다.
- /profile: 프로필 경로입니다. 이 경로는 Profile 컴포넌트를 렌더링합니다.
- /settings: 설정 경로입니다. 이 경로는 Settings 컴포넌트를 렌더링합니다.
- /books: 책 목록 경로입니다. 이 경로는 Books 컴포넌트를 렌더링합니다.
- /about: 정보 경로입니다. 이 경로는 About 컴포넌트를 렌더링합니다.
- /contact: 연락처 경로입니다. 이 경로는 Contact 컴포넌트를 렌더링합니다.
- /chat: 채팅 경로입니다. 이 경로는 Chat 컴포넌트를 렌더링합니다.

### 환경 변수
개발 및 운영 환경에 따라서 서버 접속 주소를 설정 할 수 있습니다.

``` bash
# /src/comms/books에서 사용되는 REST Service URL
VUE_APP_SERVICE_URL="http://localhost:8080"

# /src/views/Chat.vue에서 사용되는 Websocket Service URL
VUE_APP_WEBSOCKET_URL="ws://localhost:8080/ws"
```

- .env.development: 개발 환경에 사용되는 환경변수 파일
- .env.production: 운영 환경에서 사용되는 환경변수 파일

### 테스트 및 빌드

- 코드 빌드
```
npm run build
```

- 로컬 테스트
```
npm run serve
```

- 도커 빌드
```
docker build -t vue-app1 .
```



