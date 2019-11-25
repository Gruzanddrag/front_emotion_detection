import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    peoples: [
      {
        name: "Initial",
        age: "999"
      }
    ]
  },
  getters: {
    peoples: state => state.peoples
  },
  mutations: {
    ADD_HUMAN: (state, payload) => {
      state.peoples.push(payload);
    }
  },
  actions: {},
  modules: {}
});
