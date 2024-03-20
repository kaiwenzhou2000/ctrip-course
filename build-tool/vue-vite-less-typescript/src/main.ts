import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import Comp1 from './components/comp1/index.vue'
import Comp2 from './components/comp2/index.vue'


console.log('应该看不到这个console.log');

const routes = [
    { path: '/', component: Comp1 },
    { path: '/about', component: Comp2 },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

createApp(App).use(router).mount('#app')