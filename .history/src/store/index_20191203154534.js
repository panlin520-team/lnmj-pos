import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  leftNavState: '/'
},
const u = {
  leftNavState: '/'
}

export default new Vuex.Store({
  state
})