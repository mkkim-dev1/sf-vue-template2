<!-- src/views/Chat.vue -->
<template>
    <div class="chat-container">
      <h2>Chat Room</h2>
      <div v-if="!username">
        <input v-model="usernameInput" placeholder="Enter your name" />
        <button @click="setUsername">Start Chatting</button>
      </div>
  
      <div v-else>
        <div class="chat-window">
          <div v-for="(msg, index) in messages" :key="index" class="message">
            <span style="color: blue;">{{ msg.username }}:</span> 
            <span>{{ msg.message }}</span>
          </div>
        </div>
        <input
          v-model="message"
          @keyup.enter="sendMessage"
          placeholder="Type your message and press Enter"
        />
        <button @click="sendMessage">Send</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue';
  import { Packet } from './types'; // Packet 타입 가져오기
  
  const socketUrl = process.env.VUE_APP_WEBSOCKET_URL;
  const socket = ref<WebSocket | null>(null);
  const messages = ref<Packet[]>([]); // 메시지 배열을 Packet 타입으로 설정
  const message = ref<string>('');
  const username = ref<string | null>(null);
  const usernameInput = ref<string>('');
  
  // 사용자 이름 색상 배열
  const colors = [
    '#FF5733', // Red
    '#33FF57', // Green
    '#3357FF', // Blue
    '#F1C40F', // Yellow
    '#8E44AD', // Purple
    '#E67E22', // Orange
  ];
  
  // 메시지 수신 및 WebSocket 초기화
  onMounted(() => {
    socket.value = new WebSocket(socketUrl);
  
    socket.value.onmessage = (event) => {
      messages.value.push(JSON.parse(event.data)); // JSON으로 파싱하여 메시지 배열에 추가
    };
  
    socket.value.onclose = () => {
      console.log("Disconnected from the server");
    };
  });
  
  // WebSocket 연결 해제
  onUnmounted(() => {
    socket.value?.close();
  });
  
  // 사용자 이름 설정
  function setUsername() {
    if (usernameInput.value.trim()) {
      username.value = usernameInput.value.trim();
    }
  }
  
  // 메시지 전송
  function sendMessage() {
    if (socket.value && message.value && username.value) {
      // Packet 타입을 사용하여 메시지 전송
      const payload: Packet = {
        username: username.value,
        message: message.value,
      };
      socket.value.send(JSON.stringify(payload)); // JSON 문자열로 변환하여 전송
      message.value = ''; // 메시지 입력란 초기화
    }
  }
  
  </script>
  
  <style scoped>
  .chat-container {
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .chat-window {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ddd;
    padding: 10px;
    margin-bottom: 10px;
  }
  .message {
    margin-bottom: 5px;
  }
  input {
    width: calc(100% - 120px);
    margin-right: 5px;
  }
  button {
    width: 100px;
  }
  </style>
  