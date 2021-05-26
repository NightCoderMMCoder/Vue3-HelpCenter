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
import { onBeforeRouteLeave, useRouter } from "vue-router";
import BaseControlInput from "../../components/UI/BaseControlInput.vue";
import useValidation from "../../hooks/validation";

export default {
  components: { BaseControlInput },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = reactive({
      email: "@gmail.com",
      password: "123456",
    });
    const { validation, errors } = useValidation(user);

    const error = computed(() => store.getters["Auth/error"]);

    onBeforeRouteLeave((_, _1, next) => {
      let isData = false;
      Object.values(user).forEach((val) => {
        if (val) {
          isData = true;
        }
      });
      if (isData) {
        const confirm = window.confirm(
          "Do you really want to leave? You have unsaved changes!"
        );
        if (confirm) {
          next();
        }
      } else {
        next();
      }
    });

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
