import { onBeforeRouteLeave } from "vue-router";

const useBeforeRouteLeave = (item) => {
  onBeforeRouteLeave((_, _1, next) => {
    let isData = false;
    Object.values(item).forEach((val) => {
      if (val && val.length !== 0) {
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
};

export default useBeforeRouteLeave;
