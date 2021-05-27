import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Auth/Register.vue";
import Login from "../views/Auth/Login.vue";
import CreatePost from "../views/Posts/CreatePost";
import PostDetails from "../views/Posts/PostDetails";
import EditPost from "../views/Posts/EditPost";
import UserPosts from "../views/Posts/UserPosts";
import SearchPosts from "../views/Posts/SearchPosts";
import AddContact from "../views/Posts/Contacts/AddContact";
import { firebaseAuth } from "../firebase/init";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/posts/user",
    name: "UserPosts",
    component: UserPosts,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/posts/search",
    name: "SearchPosts",
    component: SearchPosts,
  },
  {
    path: "/posts/create",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/posts/edit/:id",
    name: "EditPost",
    component: EditPost,
    meta: {
      requiresAuth: true,
    },
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
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "active",
  scrollBehavior(_, _1, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to, _, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (firebaseAuth.currentUser) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (!firebaseAuth.currentUser) {
      next();
    } else {
      next({ name: "UserPosts" });
    }
  } else {
    next();
  }
});

export default router;
