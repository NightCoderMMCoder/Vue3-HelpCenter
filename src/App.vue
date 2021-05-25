<template>
  <Navbar />
  <router-view />
</template>

<script>
import Navbar from "./components/Layout/Navbar.vue";
export default {
  components: { Navbar },
  setup() {},
};
</script>
