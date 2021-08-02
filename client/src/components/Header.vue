<template>
  <q-header elevated class="glossy">
    <q-toolbar>
      <q-toolbar-title>
        <span @click="navigateTo({ name: 'home' })" class="pointer">
          TabTracker
        </span>
      </q-toolbar-title>

      <q-btn
        @click="navigateTo({ name: 'songs' })"
        color="amber"
        glossy
        label="Browse"
      />
      <div v-if="!isUserLoggedIn">
        <q-btn
          @click="navigateTo({ name: 'login' })"
          color="primary"
          label="Login"
        />
        <q-btn
          @click="navigateTo({ name: 'register' })"
          color="secondary"
          label="Register"
        />
      </div>
      <div v-if="isUserLoggedIn">
        <q-btn @click="logOut" color="secondary" label="Logout" />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "header",
  methods: {
    ...mapActions(["setToken"]),
    navigateTo(path) {
      this.$router.push(path);
    },
    logOut() {
      this.setToken(null);
    },
  },
  computed: {
    ...mapGetters(["isUserLoggedIn"]),
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
