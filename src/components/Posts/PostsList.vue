<template>
  <div class="posts-list">
    <post-item v-for="post in posts" :key="post.id" :post="post"></post-item>
  </div>
</template>

<script>
import PostItem from "./PostItem.vue";
export default {
  components: { PostItem },
  props: { posts: Array },
};
</script>

<style scoped lang="scss">
.posts-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  padding-bottom: 50px;
}
</style>
