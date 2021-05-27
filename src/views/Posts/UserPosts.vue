<template>
  <div>
    <base-spinner></base-spinner>
    <posts-list :posts="posts"></posts-list>
    <Pagination
      v-if="totalPosts > PER_PAGE"
      @prev-posts="prevPosts"
      @next-posts="nextPosts"
      :page="page"
      :last-page="lastPage"
    />
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import PostsList from "../../components/Posts/PostsList.vue";
import Pagination from "../../components/Posts/Pagination.vue";
export default {
  components: { PostsList, Pagination },
  setup() {
    const store = useStore();
    let page = ref(0);

    const user = computed(() => store.getters["Auth/user"]);
    const query = ["uid", "==", user.value.uid];

    store.dispatch("Posts/getAllPosts", query);
    store.dispatch("Posts/getPosts", { query });
    const posts = computed(() => store.getters["Posts/posts"]);
    const totalPosts = computed(() => store.getters["Posts/totalPosts"]);
    const PER_PAGE = store.getters["Posts/PER_PAGE"];
    const lastPage = computed(() => store.getters["Posts/lastPage"]);

    const prevPosts = () => {
      page.value--;
      store.dispatch("Posts/prevPosts", query);
    };
    const nextPosts = () => {
      page.value++;
      store.dispatch("Posts/nextPosts", query);
    };

    return {
      posts,
      nextPosts,
      prevPosts,
      page,
      lastPage,
      totalPosts,
      PER_PAGE,
    };
  },
};
</script>

<style></style>
