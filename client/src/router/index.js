import { createRouter, createWebHistory } from "vue-router";
import CreateSong from "../components/CreateSong.vue";
import EditSong from "../components/EditSong.vue";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Songs from "../components/Songs.vue";
import ViewSong from "../components/ViewSong.vue";


const routes = [
    { path: '/', component: Home, name:'home' },
    { path: '/register', component: Register, name:'register' },
    { path: '/login', component: Login, name:'login' },
    { path: '/songs', component: Songs, name:'songs' },
    { path: '/songs/new', component: CreateSong, name:'newSong' },
    { path: '/song/:id', component: ViewSong, name:'Song' },
    { path: '/editSong/:id', component: EditSong, name:'EditSong' }
  ]
const router = createRouter({
  history: createWebHistory(),
  routes
});
export default router;
