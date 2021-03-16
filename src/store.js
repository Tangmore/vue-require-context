import Vue from 'vue'
import Vuex from 'vuex'; 
Vue.use(Vuex);

export default  new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    changeNetwork:true, 
  },
  mutations: { 
    changeNetwork(state,data){
        state.changeNetwork=data;
    },
  },
  actions: {},
  getters: {}
});


