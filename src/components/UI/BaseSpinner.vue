<template>
  <teleport to="body">
    <Loading :active="isLoading" color="#951f1d" loader="bars" />
  </teleport>
</template>

<script>
import { computed } from "vue";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { useStore } from "vuex";
export default {
  components: {
    Loading,
  },
  setup() {
    const store = useStore();
    const isLoading = computed(() => store.getters["loading"]);
    return { isLoading };
  },
};
</script>

<style></style>
