<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="row container">
      <div class="col">
        <h2>Hello,</h2>
        <p>Please Register with your crendetials</p>
      </div>
      <div class="col">
        <div class="q-pa-md">
          <q-form class="q-gutter-md" @submit="register">
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
            <q-card-section>
              <div v-if="error" class="row error">
                {{ error.message }}
                <ul>
                  <li v-for="detail in error.details" :key="detail.type">
                    {{ detail.message }}
                  </li>
                </ul>
              </div>
            </q-card-section>
            <q-btn
              @click="register"
              label="Register"
              type="submit"
              color="primary"
            />
            <q-btn
              @click="navigateTo({ name: 'login' })"
              label="Login"
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
import { mapActions } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  methods: {
    ...mapActions(["setUser", "setToken"]),
    navigateTo(path) {
      this.$router.push(path);
    },
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password,
        });
        this.setUser(response.data.user);
        this.setToken(response.data.token);
        this.$router.push({
          name: "songs",
        });
      } catch (error) {
        const { message, details } = error.response.data;
        this.error = {
          message,
          details,
        };
      }
    },
  },
  watch: {
    error(value) {
      /**
       * This is just for testing purposes
       */
      console.log(`error value has changed ${value}`);
    },
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