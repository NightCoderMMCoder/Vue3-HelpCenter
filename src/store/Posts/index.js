import { db, fireStorage } from "../../firebase/init";
import router from "../../router";
const postsRef = db.collection("posts");
const postsRefWithLimit = postsRef.orderBy("createdAt", "desc").limit(3);
const contactsRef = db.collection("contacts");
const storageRef = fireStorage.ref("posts");
let firstDoc;
let lastDoc;

export default {
  namespaced: true,
  state: () => ({
    posts: [],
    post: null,
    contacts: [],
    error: null,
    totalPosts: 0,
    PER_PAGE: 3,
    loading: false,
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
    setContactsToDefault(state) {
      state.contacts = [];
    },
    setTotalPosts(state, total) {
      state.totalPosts = total;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async createPost({ dispatch, commit, rootGetters }, post) {
      commit("setError", null);
      commit("setLoading", true);
      let uid = rootGetters["Auth/user"].uid;
      const imageURL = await dispatch("uploadImage", post.image);
      try {
        let newPost = {
          ...post,
          imageURL,
          filePath: post.image.name,
          uid,
          createdAt: Date.now(),
        };
        delete newPost.image;
        await postsRef.add(newPost);
      } catch (error) {
        commit("setError", error.message);
      } finally {
        commit("setLoading", false);
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
    async getAllPosts({ commit }, query) {
      commit("setLoading", true);
      let collectionRef;
      if (query) {
        collectionRef = postsRef.where(...query);
      } else {
        collectionRef = postsRef;
      }
      collectionRef.onSnapshot((snapshot) => {
        commit("setTotalPosts", snapshot.docs.length);
      });
      commit("setLoading", false);
    },
    async getPosts({ commit }, payload = {}) {
      commit("setLoading", true);
      let collectionRef;
      if (payload.collectionRef) {
        collectionRef = payload.collectionRef;
      } else {
        collectionRef = postsRefWithLimit;
      }
      if (payload.query) {
        collectionRef = collectionRef.where(...payload.query);
      }
      collectionRef.onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          lastDoc = snapshot.docs[snapshot.docs.length - 1];
          firstDoc = snapshot.docs[0];
        }
        const posts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        commit("setPosts", posts);
        commit("setLoading", false);
      });
    },
    async nextPosts({ dispatch }, query) {
      let nextPostsRef = postsRefWithLimit.startAfter(lastDoc);
      if (query) {
        nextPostsRef = nextPostsRef.where(...query);
      }
      dispatch("getPosts", { collectionRef: nextPostsRef });
    },
    async prevPosts({ dispatch }, query) {
      let prevPostsRef = postsRef
        .orderBy("createdAt", "desc")
        .endBefore(firstDoc)
        .limitToLast(3);
      if (query) {
        prevPostsRef = prevPostsRef.where(...query);
      }
      dispatch("getPosts", { collectionRef: prevPostsRef });
    },
    async getPost({ commit }, id) {
      commit("setError", null);
      commit("setLoading", true);
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
      } finally {
        commit("setLoading", false);
      }
    },
    async deletePost({ commit, rootState }, id) {
      commit("setLoading", true);
      const filePath = rootState.Posts.post.filePath;
      const contacts = rootState.Posts.contacts;
      commit("setError", null);
      try {
        contacts.forEach(async (contact) => {
          await contactsRef.doc(contact.id).delete();
        });
        await postsRef.doc(id).delete();
        await storageRef.child(filePath).delete();
      } catch (error) {
        commit("setError", error.message);
      } finally {
        commit("setLoading", false);
      }
    },

    async addContact({ rootGetters, commit }, payload) {
      commit("setLoading", true);
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
        commit("setLoading", false);
      }
    },
    async getContacts({ commit }, postId) {
      commit("setLoading", true);
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
            commit("setLoading", false);
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
    totalPosts(state) {
      return state.totalPosts;
    },
    lastPage(state) {
      return Math.floor((state.totalPosts - 1) / 3);
    },
    PER_PAGE(state) {
      return state.PER_PAGE;
    },
    loading(state) {
      return state.loading;
    },
  },
};
