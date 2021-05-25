import { firebaseAuth } from "../../firebase/init";
export default {
  namespaced: true,
  state: () => ({}),
  mutations: {},
  actions: {
    async register(_, user) {
      await firebaseAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );
    },
  },
};
