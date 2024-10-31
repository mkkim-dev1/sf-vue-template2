import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import PrimeVue from 'primevue/config';

import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css'
import comms from './comms/comms'


const app = createApp(App);

app.use(store);
app.provide("comms", comms);
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});
app.use(router);
app.mount('#app');
