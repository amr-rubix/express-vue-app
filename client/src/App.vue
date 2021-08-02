<template>
  <q-layout view="lHh Lpr lFf">
    <Header />
    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components:{
    Header
  },
  name: 'LayoutDefault',

  setup () {
    return {
    }
  }
}
</script>
