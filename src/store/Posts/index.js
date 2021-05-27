import { db, fireStorage } from "../../firebase/init";
import router from "../../router";
const postsRef = db.collection("posts");
const contactsRef = db.collection("contacts");
const storageRef = fireStorage.ref("posts");
let lastDoc;

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    post: null,
    contacts: [],
    error: null,
  }),
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
    setPost(state, post) {
      state.post = post;
    },
    setContact(state, contact) {
      state.contacts.push(contact);
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
      commit("setError", null);
      const { id: docId, filePath } = rootState.Posts.post;
      if (!post.image) {
        delete post.image;
        try {
          await postsRef.doc(docId).update(post);
        } catch (error) {
          commit("setError", error.message);
        }
      } else {
        await storageRef.child(filePath).delete();
        const imageURL = await dispatch("uploadImage", post.image);
        let newPost = {
          ...post,
          imageURL,
          filePath: post.image.name,
        };
        delete newPost.image;
        try {
          await postsRef.doc(docId).update(newPost);
        } catch (error) {
          commit("setError", error.message);
        }
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
    async getPosts({ commit }) {
      postsRef.orderBy("createdAt", "desc").onSnapshot((snapshot) => {
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        commit("setPosts", posts);
      });
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

    async addContact({ rootGetters, commit }, payload) {
      commit("setError", null);
      const postId = rootGetters["Posts/post"].id;
      try {
        contactsRef.add({
          ...payload,
          postId,
          createdAt: Date.now(),
        });
        router.push({ name: "Home" });
      } catch (error) {
        commit("setError", error.message);
      }
    },
    async getContacts({ commit }, postId) {
      contactsRef
        .where("postId", "==", postId)
        .orderBy("createdAt", "desc")
        .startAfter(lastDoc || "")
        .limit(5)
        .onSnapshot((snapshot) => {
          if (!snapshot.empty) {
            lastDoc = snapshot.docs[snapshot.docs.length - 1];

            snapshot.docChanges().forEach((change) => {
              if (change.type === "added") {
                commit("setContact", {
                  id: change.doc.id,
                  ...change.doc.data(),
                });
              }
            });
          }
        });
    },
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    post(state) {
      return state.post;
    },
    error(state) {
      return state.error;
    },
    contacts(state) {
      return state.contacts;
    },
  },
};
