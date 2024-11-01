# 1단계: Node 이미지로 빌드하기
FROM node:18 AS build

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json을 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 모든 소스 코드 복사
COPY . .

# Vue 애플리케이션 빌드
RUN npm run build

# 2단계: Nginx로 서빙하기
FROM nginx:stable-alpine

# 빌드 결과물을 Nginx의 기본 경로로 복사
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Nginx 설정 파일 복사 (옵션)
# 커스텀 Nginx 설정이 필요하면 프로젝트 루트에 있는 nginx.conf를 복사합니다.
# COPY nginx.conf /etc/nginx/nginx.conf

# 80 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]