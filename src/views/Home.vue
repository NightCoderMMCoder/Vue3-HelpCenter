<template>
  <div class="home">
    <show-case></show-case>
    <div class="posts">
      <posts-list :posts="posts"></posts-list>
      <Pagination @prev-posts="prevPosts" @next-posts="nextPosts" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PostsList from "../components/Posts/PostsList.vue";
import ShowCase from "../components/Posts/ShowCase";
import Pagination from "../components/Posts/Pagination.vue";
export default {
  components: { ShowCase, PostsList, Pagination },
  name: "Home",
  setup() {
    const store = useStore();
    store.dispatch("Posts/getPosts");
    const posts = computed(() => store.getters["Posts/posts"]);

    const prevPosts = () => {
      store.dispatch("Posts/prevPosts");
    };
    const nextPosts = () => {
      store.dispatch("Posts/nextPosts");
    };

    return { posts, prevPosts, nextPosts };
  },
};
</script>

<style scoped>
.posts {
  padding: 50px 0 0;
}
</style>
