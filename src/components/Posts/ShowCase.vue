<template>
  <section>
    <div>
      <h1>Welcome To Help Center</h1>
      <p>
        Find the posts and Support <span> Myanmar People</span> Who really need
        your help
      </p>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
section {
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("../../assets/bg.jpg");
  color: white;
  height: 30vh;
  background-size: cover;
  background-position: center center;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 2rem;
    margin-bottom: 0.8rem;
  }
  p {
    font-size: 1.2rem;
    span {
      color: var(--secondary);
    }
  }
}
</style>
