
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'  

const app = createApp(App);

// Provide the store to all components
app.provide('store', store);

app.use(router).mount('#app');
