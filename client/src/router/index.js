import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Register from "../components/Register.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
