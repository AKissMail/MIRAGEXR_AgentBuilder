import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Tooltip from 'primevue/tooltip';

const app = createApp(App);
app.directive('tooltip', Tooltip);
app.use(router);
app.mount('#app');