<template>
  <div class="create-contact">
    <div class="card">
      <div class="card-header">Create Contact</div>
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
            label-name="Descrition"
            v-model="description"
            control-type="textarea"
          >
            <small v-if="errors.description" class="error-message">
              {{ errors.description }}
            </small>
          </base-control-input>
          <button class="btn btn-secondary">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs } from "vue";
import useValidation from "@/hooks/validation";
import { useStore } from "vuex";
import BaseControlInput from "@/components/UI/BaseControlInput.vue";
export default {
  components: { BaseControlInput },
  setup() {
    const store = useStore();
    const contact = reactive({
      email: "",
      description: "",
    });
    const { validation, errors } = useValidation(contact);

    const error = computed(() => store.getters["Posts/error"]);

    const handleSubmit = () => {
      const isValidate = validation();
      if (isValidate) {
        store.dispatch("Posts/addContact", contact);
      }
    };

    return { ...toRefs(contact), errors, error, handleSubmit };
  },
};
</script>

<style scoped lang="scss">
.create-contact {
  margin-top: 50px;
}
</style>
