<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="row">
        <h5 class="text-h5 text-white q-my-md">Company & Co</h5>
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="email"
                type="email"
                label="email"
              />
              <q-input
                square
                filled
                clearable
                v-model="password"
                type="password"
                label="password"
              />
            </q-form>
          </q-card-section>
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
          <q-card-actions class="q-px-md">
            <q-btn
              @click="register"
              uenlevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="Register"
            />
          </q-card-actions>
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">Already reigistered? Login</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import AuthenticationService from "../services/AuthenticationService";
import { mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      email: "",
      password: "",
      error: false,
    };
  },
  methods: {
    ...mapActions(["setUser", "setToken"]),
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
  width: 360px;
}

.error {
  color: red;
}
</style>