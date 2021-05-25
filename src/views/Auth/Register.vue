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
import BaseControlInput from "../../components/UI/BaseControlInput.vue";
export default {
  components: { BaseControlInput },
  setup() {
    const store = useStore();
    const user = reactive({
      name: "",
      email: "@gmail.com",
      password: "123456",
    });
    const errors = ref({});

    console.log(Object.entries(user));

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

    const handleSubmit = () => {
      let isValidate = validation();
      if (isValidate) {
        store.dispatch("Auth/register", user);
      }
    };

    const error = computed(() => store.getters["Auth/error"]);

    return { ...toRefs(user), handleSubmit, error, errors };
  },
};
</script>

<style></style>
