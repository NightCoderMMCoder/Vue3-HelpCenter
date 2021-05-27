<template>
  <Navbar />
  <main class="container">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
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

<style lang="scss" scoped>
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}
.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.3s linear;
}
</style>
