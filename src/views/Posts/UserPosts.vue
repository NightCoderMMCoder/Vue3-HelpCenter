<template>
  <div>
    <posts-list :posts="posts"></posts-list>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import PostsList from "../../components/Posts/PostsList.vue";
export default {
  components: { PostsList },
  setup() {
    const store = useStore();
    const user = computed(() => store.getters["Auth/user"]);

    const query = ["uid", "==", user.value.uid];

    store.dispatch("Posts/getPosts", { query });
    const posts = computed(() => store.getters["Posts/posts"]);
    return { posts };
  },
};
</script>

<style></style>
