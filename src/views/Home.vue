<template>
  <div class="home">
    <show-case></show-case>
    <div class="posts">
      <posts-list></posts-list>
    </div>
  </div>
</template>

<script>
import PostsList from "../components/Posts/PostsList.vue";
import ShowCase from "../components/Posts/ShowCase";
export default {
  components: { ShowCase, PostsList },
  name: "Home",
};
</script>

<style scoped>
.posts {
  padding: 50px 0 0;
}
</style>
