import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./main.scss";
import { firebaseAuth } from "./firebase/init";

let app;

firebaseAuth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App);
    app
      .use(store)
      .use(router)
      .mount("#app");
  }
});
