
import { createApp } from 'vue'
import main from './main.vue'
import router from './router/index'

const app = createApp(main) 
app.use(router)
app.mount('#main')
