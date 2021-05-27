<template>
  <div class="auth">
    <div class="card">
      <div class="card-header">Login</div>
      <div class="card-body">
        <div class="error" v-if="error">
          {{ error }}
        </div>
        <form @submit.prevent="handleSubmit">
          <base-control-input label-name="Email" type="email" v-model="email">
            <small v-if="errors.email" class="error-message">
              {{ errors.email }}
            </small>
          </base-control-input>
          <base-control-input
            label-name="Password"
            type="password"
            v-model="password"
          >
            <small v-if="errors.password" class="error-message">
              {{ errors.password }}
            </small>
          </base-control-input>
          <button class="btn btn-secondary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseControlInput from "../../components/UI/BaseControlInput.vue";
import useValidation from "../../hooks/validation";
import useBeforeRouteLeave from "../../hooks/beforeRouteLeave";

export default {
  components: { BaseControlInput },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = reactive({
      email: "@gmail.com",
      password: "123456",
    });
    useBeforeRouteLeave(user);
    const { validation, errors } = useValidation(user);

    const error = computed(() => store.getters["Auth/error"]);

    const handleSubmit = async () => {
      let isValidate = validation();
      if (isValidate) {
        await store.dispatch("Auth/login", user);
        if (!error.value) {
          user.email = "";
          user.password = "";
          router.push({ name: "Home" });
        }
      }
    };

    return { ...toRefs(user), handleSubmit, error, errors };
  },
};
</script>

<style></style>
