import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { reveal } from './lib/reveal'
import WikiKeyboard from './components/WikiKeyboard.vue'
import './style.css'

const app = createApp(App)
app.use(router)
app.directive('reveal', reveal)
app.component('WikiKeyboard', WikiKeyboard)
app.mount('#app')
