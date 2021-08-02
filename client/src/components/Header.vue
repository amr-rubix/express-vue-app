<template>
  <div class="q-pa-md">
    <q-toolbar class="bg-purple text-white shadow-2 rounded-borders">
      <q-btn flat label="TabTracker" @click="navigateTo({ name: 'home' })" />
      <q-space />
      <q-tabs v-model="tab" shrink>
        <q-tab
          name="tab1"
          label="Browse"
          @click="navigateTo({ name: 'songs' })"
        />
        <q-tab
          v-if="!isUserLoggedIn"
          name="tab2"
          label="Login"
          @click="navigateTo({ name: 'login' })"
        />
        <q-tab
          v-if="!isUserLoggedIn"
          name="tab3"
          label="Register"
          @click="navigateTo({ name: 'register' })"
        />
        <q-tab
          v-if="isUserLoggedIn"
          name="tab4"
          label="Logout"
          @click="logOut"
        />
      </q-tabs>
    </q-toolbar>
  </div>
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

</style>
