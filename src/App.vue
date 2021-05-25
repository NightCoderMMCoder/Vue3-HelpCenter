<template>
  <Navbar />
  <main>
    <router-view />
  </main>
</template>

<script>
import Navbar from "./components/Layout/Navbar.vue";
export default {
  components: { Navbar },
  setup() {},
};
</script>
