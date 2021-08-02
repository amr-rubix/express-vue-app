<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="row container">
      <div class="col">
        <h2>Hello,</h2>
        <p>Please Login with your crendetials</p>
      </div>
      <div class="col">
        <div class="q-pa-md">
          <q-form class="q-gutter-md" @submit="login">
            <q-input
              filled
              type="email"
              v-model="email"
              label="Your email *"
              hint="email address"
              lazy-rules
              :rules="[
                (val) => (val && val.length > 0) || 'Please type your email',
              ]"
            />

            <q-input
              filled
              type="password"
              v-model="password"
              label="Your password"
              lazy-rules
              :rules="[
                (val) =>
                  (val !== null && val !== '') || 'Please type your password',
              ]"
            />
            <p v-if="error" class="error">
              {{error}}
            </p>
            <q-btn @click="login" label="Login" type="submit" color="primary" />
            <q-btn
              @click="navigateTo({ name: 'register' })"
              label="Register"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
          </q-form>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  computed: {
    ...mapGetters(["isUserLoggedIn"]),
  },
  methods: {
    ...mapActions(["setToken", "setUser"]),
    navigateTo(path) {
      this.$router.push(path);
    },
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password,
        });
        this.setToken(response.data.token);
        this.setUser(response.data.user);
        this.$router.push({
          name: "songs",
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
  mounted() {
    if (this.isUserLoggedIn) {
      this.$router.push({
        name: "songs",
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.q-card {
  width: 560px;
}
h2 {
  margin: 0px;
  margin-bottom: 2%;
}
.error {
  color: red;
}

.container {
  width: 70%;
}
</style>