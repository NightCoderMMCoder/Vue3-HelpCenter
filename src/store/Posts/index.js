import { db, fireStorage } from "../../firebase/init";
const postsRef = db.collection("posts");

export default {
  namespaced: true,
  state: () => ({
    error: null,
    post: null,
  }),
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setPost(state, post) {
      state.post = post;
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
        postsRef.add(newPost);
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
    async getPost({ commit }, id) {
      const doc = await postsRef.doc(id).get();
      commit("setPost", {
        ...doc.data(),
        id: doc.id,
      });
    },
  },
  getters: {
    post(state) {
      return state.post;
    },
    error(state) {
      return state.error;
    },
  },
};
