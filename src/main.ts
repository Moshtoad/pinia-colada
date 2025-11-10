import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import { PiniaColada } from '@pinia/colada';

const app = createApp(App);
app.use(createPinia());
app.use(PiniaColada);

app.mount('#app');
