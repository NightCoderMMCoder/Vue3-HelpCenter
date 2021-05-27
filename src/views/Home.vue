<template>
  <div class="home">
    <show-case></show-case>
    <div class="posts">
      <posts-list :posts="posts"></posts-list>
      <Pagination
        v-if="totalPosts > PER_PAGE"
        @prev-posts="prevPosts"
        @next-posts="nextPosts"
        :page="page"
        :last-page="lastPage"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import PostsList from "../components/Posts/PostsList.vue";
import ShowCase from "../components/Posts/ShowCase";
import Pagination from "../components/Posts/Pagination.vue";
export default {
  components: { ShowCase, PostsList, Pagination },
  name: "Home",
  setup() {
    const store = useStore();
    let page = ref(0);

    store.dispatch("Posts/getAllPosts");
    store.dispatch("Posts/getPosts");
    const posts = computed(() => store.getters["Posts/posts"]);
    const totalPosts = computed(() => store.getters["Posts/totalPosts"]);
    const PER_PAGE = store.getters["Posts/PER_PAGE"];
    const lastPage = computed(() => store.getters["Posts/lastPage"]);

    const prevPosts = () => {
      page.value--;
      store.dispatch("Posts/prevPosts");
    };
    const nextPosts = () => {
      page.value++;
      store.dispatch("Posts/nextPosts");
    };

    return {
      posts,
      prevPosts,
      nextPosts,
      lastPage,
      page,
      totalPosts,
      PER_PAGE,
    };
  },
};
</script>

<style scoped>
.posts {
  padding: 50px 0 0;
}
</style>
