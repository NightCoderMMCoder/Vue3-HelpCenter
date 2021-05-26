import { db, fireStorage } from "../../firebase/init";

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
    async createPost({ dispatch, commit }, post) {
      commit("setError", null);
      const imageURL = await dispatch("uploadImage", post.image);
      try {
        let newPost = {
          ...post,
          imageURL,
          filePath: post.image.name,
        };
        delete newPost.image;
        console.log(newPost);
        db.collection("posts").add(newPost);
      } catch (error) {
        commit("setError", error.message);
      }
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
