<template>
  <div class="auth">
    <div class="card">
      <div class="card-header">Register</div>
      <div class="card-body">
        <div class="error" v-if="error">
          {{ error }}
        </div>
        <form @submit.prevent="handleSubmit">
          <base-control-input label-name="Name" v-model="name">
            <small v-if="errors.name" class="error-message">
              {{ errors.name }}
            </small>
          </base-control-input>
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
          <button class="btn btn-secondary">Register</button>
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
export default {
  components: { BaseControlInput },
  setup() {
    const store = useStore();
    const router = useRouter();
    const user = reactive({
      name: "",
      email: "@gmail.com",
      password: "123456",
    });
    const errors = ref({});

    const error = computed(() => store.getters["Auth/error"]);

    const validation = () => {
      errors.value = {};
      let formValidate = true;
      for (let [key, value] of Object.entries(user)) {
        if (!value) {
          formValidate = false;
          errors.value[key] = `Please fill the ${key} field.`;
        }
      }
      return formValidate;
    };
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
        await store.dispatch("Auth/register", user);
        if (!error.value) {
          user.name = "";
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
