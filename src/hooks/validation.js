import { ref } from "vue";

const useValidation = (item) => {
  const errors = ref({});
  const validation = (checkValidation = {}) => {
    errors.value = {};
    let formValidate = true;
    for (let [key, value] of Object.entries(item)) {
      if ((!value || value.length === 0) && checkValidation[key] !== false) {
        formValidate = false;
        errors.value[key] = `Please fill the ${key} field.`;
      }
    }
    return formValidate;
  };
  return { validation, errors };
};

export default useValidation;
