<template>
  <div class="auth">
    <div class="card">
      <div class="card-header">Register</div>
      <div class="card-body">
        <form>
          <base-control-input
            label-name="Name"
            v-model="name"
          ></base-control-input>
          <base-control-input
            label-name="Email"
            type="email"
            v-model="email"
          ></base-control-input>
          <base-control-input
            label-name="Password"
            type="password"
            v-model="password"
          ></base-control-input>
          <button class="btn btn-secondary">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import BaseControlInput from "../../components/UI/BaseControlInput.vue";
export default {
  components: { BaseControlInput },
  setup() {
    const user = reactive({
      name: "adsf",
      email: "",
      password: "",
    });
    return { ...toRefs(user) };
  },
};
</script>

<style></style>
