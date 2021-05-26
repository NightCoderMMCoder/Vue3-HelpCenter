<template>
  <Navbar />
  <main class="container">
    <router-view />
  </main>
</template>

<script>
import { useStore } from "vuex";
import Navbar from "./components/Layout/Navbar.vue";
export default {
  components: { Navbar },
  setup() {
    const store = useStore();
    store.dispatch("Auth/handleAuthStateChanged");
  },
};
</script>
