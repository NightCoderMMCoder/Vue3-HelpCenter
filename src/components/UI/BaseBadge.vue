<template>
  <span class="badge">
    <small>
      <slot></slot>
    </small>
  </span>
</template>

<script>
export default {};
</script>

<style scoped>
.badge {
  margin-right: 10px;
  display: inline-block;
  padding: 7px 15px;
  border-radius: 100px;
  background: var(--secondary);
}
</style>
