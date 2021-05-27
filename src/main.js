import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./main.scss";
import { firebaseAuth } from "./firebase/init";

import BaseSpinner from "./components/UI/BaseSpinner";

let app;

firebaseAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app.component("BaseSpinner", BaseSpinner);
    app
      .use(store)
      .use(router)
      .mount("#app");
  }
});
