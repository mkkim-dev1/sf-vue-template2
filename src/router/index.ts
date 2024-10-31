import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/Profile.vue';
import Settings from '../views/Settings.vue';
import Books from '../views/Books.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Chat from '../views/Chat.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', redirect: '/books' },
  { path: '/dashboard', component: Dashboard },
  { path: '/profile', component: Profile },
  { path: '/settings', component: Settings },
  { path: '/books', component: Books },
  { path: '/about', component: About },
  { path: '/contact', component: Contact },
  { path: '/chat', name: 'Chat', component: Chat },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
