import { createStore } from "vuex";
import Auth from "./Auth";
import Posts from "./Posts";

export default createStore({
  state: {
    loading: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {},
  getters: {
    loading(state) {
      return state.loading;
    },
  },
  modules: {
    Auth,
    Posts,
  },
});
