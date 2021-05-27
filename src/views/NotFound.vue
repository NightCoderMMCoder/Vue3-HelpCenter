<template>
  <div class="not-found">
    <div>
      <h1>404 Page</h1>
      <button
        @click="$router.replace({ name: 'Home' })"
        class="btn btn-secondary"
      >
        Go Back Home
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  width: 100%;
  text-align: center;
  h1 {
    color: var(--primary);
    margin-bottom: 20px;
  }
}
</style>
