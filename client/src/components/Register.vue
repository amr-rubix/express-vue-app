<template>
  <div class="home">
    <h1>register</h1>
    <br>
    <input
      type="email"
      name="email"
      v-model="email"
      placeholder="email"
    >
    <br>
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="password"
    >
    <br>
    <div v-if="error" class="error">
      {{ error.message }}
      <ul>
        <li v-for="detail in error.details" :key="detail.type">
          {{ detail.message }}
        </li>
      </ul>
    </div>
    <button @click="register">
      register
    </button>
  </div>
</template>

<script>
import auth from '../services/auth'
export default {
  name: 'home',
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  methods: {
    async register(){
      try{
        await auth.register({
        email: this.email,
        password: this.password
      })
      }catch(error){
        const { message, details } = error.response.data
        this.error = {
          message,
          details
        }
      }
    }
  },
  watch: {
    error(value){
      /**
       * This is just for testing purposes
       */
      console.log(`error value has changed ${value}`)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error{
  color: red;
}
</style>