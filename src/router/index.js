import { createRouter, createWebHistory } from 'vue-router'
import ProductsComponent from '../components/homepage/ProductsComponent.vue'
import AdminDashboard from '../components/admin-panel/AdminPanelComponent.vue'

const routes = [
  {
    path: '/',
    name: 'Products',
    component: ProductsComponent
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminDashboard,
  }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
      routes
})



export default router