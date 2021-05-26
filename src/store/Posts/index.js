import { fireStorage } from "../../firebase/init";

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
    async createPost({ dispatch }, post) {
      const imageURL = await dispatch("uploadImage", post.image);
      console.log(imageURL);
    },
    async uploadImage({ commit }, image) {
      try {
        const storage = fireStorage.ref("posts");
        const uploadedImage = await storage.child(image.name).put(image);
        const imageURL = await uploadedImage.ref.getDownloadURL();
        return imageURL;
      } catch (error) {
        commit("setError", error.message);
      }
    },
  },
  getters: {},
};
