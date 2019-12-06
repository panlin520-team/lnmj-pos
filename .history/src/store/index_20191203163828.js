import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  leftNavState: '/'
}

export default new Vuex.Store({
  state,
  userstate:{
    username: ""
  },
  mutations: {
    setuser: (userstate,name) =>{
      userstate.username = name
    }
  }
})
log