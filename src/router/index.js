import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Auth/Register.vue";
import Login from "../views/Auth/Login.vue";
import CreatePost from "../views/Posts/CreatePost";
import PostDetails from "../views/Posts/PostDetails";
import EditPost from "../views/Posts/EditPost";
import AddContact from "../views/Posts/Contacts/AddContact";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/posts/create",
    name: "CreatePost",
    component: CreatePost,
  },
  {
    path: "/posts/:id",
    name: "PostDetails",
    component: PostDetails,
    children: [
      {
        path: "contact/add",
        name: "AddContact",
        component: AddContact,
      },
    ],
  },
  {
    path: "/posts/edit/:id",
    name: "EditPost",
    component: EditPost,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active",
});

export default router;
