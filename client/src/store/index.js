import { createStore } from "vuex";
export default createStore({
  strict:true,
  state: {
    token: null || localStorage.getItem('token'),
    user: null,
    songs: []
  },
  getters: {
    isUserLoggedIn: state => !!state.token,
    songs: state => state.songs
  },
  mutations: {
    setToken(state, token){
      state.token = token 
    },
    setUser(state, user){
      state.user = user 
    },
    setSongs(state, songs){
      state.songs = songs 
    }
  },
  actions: {
    setToken({commit}, token){
      commit('setToken', token)
      if(token){
        localStorage.setItem( 'token', token );
      }else{
        localStorage.removeItem('token')
      }
    },
    setUser({commit}, user){
      commit('setUser', user)
    },
    setSongs({commit}, songs){
      commit('setSongs', songs)
    }
  }
});