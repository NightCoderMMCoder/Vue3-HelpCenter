import { firebaseAuth } from "../../firebase/init";
export default {
  namespaced: true,
  state: () => ({
    error: null,
    user: null,
  }),
  mutations: {
    setError(state, payload) {
      state.error = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async register({ commit }, user) {
      commit("setError", null);
      try {
        const res = await firebaseAuth.createUserWithEmailAndPassword(
          user.email,
          user.password
        );
        await res.user.updateProfile({ displayName: user.name });
        commit("setUser", {
          name: res.user.displayName,
          email: res.user.email,
          uid: res.user.uid,
        });
        console.log(res);
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
    async handleAuthStateChanged({ commit }) {
      firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
          commit("setUser", {
            name: user.displayName,
            email: user.email,
            uid: user.uid,
          });
        } else {
          commit("setUser", null);
        }
      });
    },
    async logout({ commit }) {
      commit("setError", null);
      try {
        await firebaseAuth.signOut();
      } catch (error) {
        commit("setError", error.message);
      }
    },
  },
  getters: {
    error(state) {
      return state.error;
    },
    user(state) {
      return state.user;
    },
  },
};
