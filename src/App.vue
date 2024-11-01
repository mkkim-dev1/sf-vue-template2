<!-- src/App.vue -->
<template>
    <div class="card">
        <Menubar :model="items">
          <template #item="{ item, props, hasSubmenu }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                        <span :class="item.icon"></span>
                        <span>{{ item.label }}</span>
                    </a>
                </router-link>
                <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                    <span :class="item.icon"></span>
                    <span>{{ item.label }}</span>
                    <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down"></span>
                </a>
          </template>          
        </Menubar>
    </div>

    <!-- 라우트 뷰 -->
    <main class="content">
      <router-view />
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Menubar from 'primevue/menubar';


const items = ref([
    {
        label: 'Books',
        icon: 'pi pi-book',
        route: '/books'
    },
    {
        label: 'Dashboard',
        icon: 'pi pi-chart-bar',
        route: '/dashboard'
    },
    {
        label: 'Chat',
        icon: 'pi pi-send',
        route: '/chat'
    },    
    {
        label: 'Profile',
        icon: 'pi pi-user',
        route: '/profile'
    },
    {
        label: 'About',
        icon: 'pi pi-question-circle',
        route: '/about'
    }
]);


</script>

<style scoped>
.app-container {
  display: flex;
  height: 100vh;
  overflow: hidden; /* 스크롤 방지 */
}

.sidebar {
  width: 250px;
}

.app-toolbar {
  background-color: #007ad9;
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
}

.app-title {
  font-size: 1.5rem;
  margin-left: 1rem;
}

.content {
  flex: 1;
  padding: 2rem;
  background-color: #f9f9f9;
}
</style>
