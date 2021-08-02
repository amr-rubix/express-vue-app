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
              {{ error }}
            </div>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              @click="login"
              uenlevated
              color="light-green-7"
              size="lg"
              class="full-width"
              label="Login"
            />
          </q-card-actions>
        </q-card>
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
  width: 360px;
}

.error {
  color: red;
}
</style>