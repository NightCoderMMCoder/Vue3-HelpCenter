import { firebaseAuth } from "../../firebase/init";
export default {
  namespaced: true,
  state: () => ({
    error: null,
  }),
  mutations: {
    setError(state, payload) {
      state.error = payload;
    },
  },
  actions: {
    async register({ commit }, user) {
      commit("setError", null);
      try {
        await firebaseAuth.createUserWithEmailAndPassword(
          user.email,
          user.password
        );
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async login({ commit }, user) {
      commit("setError", null);
      try {
        await firebaseAuth.signInWithEmailAndPassword(
          user.email,
          user.password
        );
      } catch (error) {
        commit("setError", error.message);
      }
    },
  },
  getters: {
    error(state) {
      return state.error;
    },
  },
};
