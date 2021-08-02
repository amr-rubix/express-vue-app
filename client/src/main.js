import { Quasar } from 'quasar';
import { createApp } from 'vue';
import App from "./App.vue";
import quasarUserOptions from './quasar-user-options';
import router from "./router";
let app = createApp(App).use(Quasar, quasarUserOptions);
import store from "./store";

app.use(router).use(store).mount("#app");


