<template>
  <div>
    <h1>
      Search Posts By <span>{{ $route.query.term.toUpperCase() }}</span>
    </h1>
    <div class="posts">
      <posts-list :posts="posts"></posts-list>
      <Pagination
        @prev-posts="prevPosts"
        @next-posts="nextPosts"
        :page="page"
        :last-page="lastPage"
      />
    </div>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteUpdate } from "vue-router";
import PostsList from "../../components/Posts/PostsList.vue";
import Pagination from "../../components/Posts/Pagination.vue";
export default {
  components: { PostsList, Pagination },
  setup() {
    const store = useStore();
    const route = useRoute();
    let page = ref(0);

    let query = ["supports", "array-contains", route.query.term.toUpperCase()];

    store.dispatch("Posts/getAllPosts", query);
    const getPosts = () => {
      store.dispatch("Posts/getPosts", { query });
    };
    getPosts();
    const posts = computed(() => store.getters["Posts/posts"]);
    const lastPage = computed(() => store.getters["Posts/lastPage"]);

    const prevPosts = () => {
      page.value--;
      store.dispatch("Posts/prevPosts", query);
    };
    const nextPosts = () => {
      page.value++;
      store.dispatch("Posts/nextPosts", query);
    };

    // onBeforeRouteUpdate((to, _, next) => {
    //   const term = to.query.term.toUpperCase();
    //   query = ["supports", "array-contains", term.toUpperCase()];
    //   store.dispatch("Posts/getAllPosts", query);
    //   getPosts();
    //   next();
    // });

    watch(
      () => route.query.term,
      (val) => {
        page.value = 0;
        const term = val.toUpperCase();
        query = ["supports", "array-contains", term.toUpperCase()];
        store.dispatch("Posts/getAllPosts", query);
        getPosts();
      }
    );

    return { posts, nextPosts, prevPosts, page, lastPage };
  },
};
</script>

<style scoped>
span {
  color: var(--primary);
}
.posts {
  margin-top: 30px;
}
</style>
