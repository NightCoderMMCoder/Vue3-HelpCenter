<template>
  <div class="btn-groups">
    <button class="btn btn-secondary" @click="$emit('prevPosts')">
      <i class="fas fa-chevron-left"></i>
    </button>
    <button class="btn btn-secondary" @click="$emit('nextPosts')">
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  emits: ["prevPosts", "nextPosts"],
};
</script>
<style scoped>
.btn-groups {
  text-align: center;
}
</style>
