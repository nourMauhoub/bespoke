import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faList, faGears, faAngleUp, faSearch, faTimes, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

library.add(faList, faGears, faAngleUp, faSearch, faTimes, faPenToSquare, faTrash)


createApp(App).use(store).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
