<template>
  <div class="form-group">
    <label>{{ labelName }}</label>
    <input
      v-if="controlType === 'input'"
      :type="type"
      class="form-control"
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.target.value)"
    />
    <textarea
      v-else-if="controlType === 'textarea'"
      class="form-control"
      rows="10"
      :value="modelValue"
      @input="(e) => $emit('update:modelValue', e.target.value)"
    ></textarea>
    <input
      type="file"
      class="form-control"
      @change="(e) => $emit('uploadImage', e)"
      v-else
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue", "uploadImage"],
  props: {
    labelName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: String,
    controlType: {
      type: String,
      default: "input",
    },
  },
};
</script>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 20px;
  label {
    display: inline-block;
    margin-bottom: 8px;
  }

  .form-control {
    width: 100%;
    padding: 10px;
    border: 1px solid #00000028;
    outline: none;
    border-radius: 5px;
    &:focus {
      box-shadow: 0 0 0 0.1rem #ffcd9498;
    }
  }
}
</style>
