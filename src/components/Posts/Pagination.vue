<template>
  <div class="btn-groups">
    <button
      class="btn btn-secondary"
      @click="$emit('prevPosts')"
      :disabled="page === 0"
    >
      <i class="fas fa-chevron-left"></i>
    </button>
    <button
      class="btn btn-secondary"
      @click="$emit('nextPosts')"
      :disabled="page >= lastPage"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  emits: ["prevPosts", "nextPosts"],
  props: { lastPage: Number, page: Number },
};
</script>
<style scoped>
.btn-groups {
  text-align: center;
}
</style>
