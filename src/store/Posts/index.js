import { db, fireStorage } from "../../firebase/init";
const postsRef = db.collection("posts");
const storageRef = fireStorage.ref("posts");

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
    async updatePost({ commit, rootState, dispatch }, post) {
      const { id: docId, filePath } = rootState.Posts.post;
      if (!post.image) {
        delete post.image;
        await postsRef.doc(docId).update(post);
      } else {
        await storageRef.child(filePath).delete();
        const imageURL = await dispatch("uploadImage", post.image);
        let newPost = {
          ...post,
          imageURL,
          filePath: post.image.name,
        };
        delete newPost.image;
        await postsRef.doc(docId).update(newPost);
      }
    },
    async uploadImage({ commit }, image) {
      try {
        const uploadedImage = await storageRef.child(image.name).put(image);
        const imageURL = await uploadedImage.ref.getDownloadURL();
        return imageURL;
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async getPost({ commit }, id) {
      commit("setError", null);
      try {
        const doc = await postsRef.doc(id).get();
        if (!doc.exists) {
          throw new Error("Data not found!!!");
        }
        commit("setPost", {
          ...doc.data(),
          id: doc.id,
        });
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async deletePost({ commit, rootState }, id) {
      const filePath = rootState.Posts.post.filePath;
      commit("setError", null);
      try {
        await postsRef.doc(id).delete();
        await storageRef.child(filePath).delete();
      } catch (error) {
        commit("setError", error.message);
      }
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
