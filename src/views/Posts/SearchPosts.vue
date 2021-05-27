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
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import PostsList from "../../components/Posts/PostsList.vue";
import Pagination from "../../components/Posts/Pagination.vue";
export default {
  components: { PostsList, Pagination },
  setup() {
    const store = useStore();
    const route = useRoute();
    let page = ref(0);

    const query = [
      "supports",
      "array-contains",
      route.query.term.toUpperCase(),
    ];

    store.dispatch("Posts/getAllPosts", query);
    store.dispatch("Posts/getPosts", { query });
    const posts = computed(() => store.getters["Posts/posts"]);
    const lastPage = computed(() => store.getters["Posts/lastPage"]);

    const prevPosts = () => {
      page.value--;
      store.dispatch("Posts/prevPosts", query);
    };
    const nextPosts = () => {
      console.log("next");
      page.value++;
      store.dispatch("Posts/nextPosts", query);
    };

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
