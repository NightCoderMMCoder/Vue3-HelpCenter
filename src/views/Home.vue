<template>
  <div class="home">
    <show-case></show-case>
    <div class="posts">
      <posts-list :posts="posts"></posts-list>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PostsList from "../components/Posts/PostsList.vue";
import ShowCase from "../components/Posts/ShowCase";
export default {
  components: { ShowCase, PostsList },
  name: "Home",
  setup() {
    const store = useStore();
    store.dispatch("Posts/getPosts");
    const posts = computed(() => store.getters["Posts/posts"]);
    return { posts };
  },
};
</script>

<style scoped>
.posts {
  padding: 50px 0 0;
}
</style>
