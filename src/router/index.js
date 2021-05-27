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
import NotFound from "../views/NotFound.vue";

import { firebaseAuth } from "../firebase/init";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/posts/user",
    name: "UserPosts",
    component: UserPosts,
    meta: {
      title: "My Posts",
      requiresAuth: true,
    },
  },
  {
    path: "/posts/search",
    name: "SearchPosts",
    component: SearchPosts,
    meta: {
      title: "Search Posts",
    },
  },
  {
    path: "/posts/create",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      title: "Create Posts",
      requiresAuth: true,
    },
  },
  {
    path: "/posts/edit/:id",
    name: "EditPost",
    component: EditPost,
    meta: {
      title: "Edit Posts",
      requiresAuth: true,
    },
  },
  {
    path: "/posts/:id",
    name: "PostDetails",
    component: PostDetails,
    meta: {
      title: "PostDetails",
    },
    children: [
      {
        path: "contact/add",
        name: "AddContact",
        component: AddContact,
        meta: {
          title: "Add Contact",
        },
      },
    ],
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register",
      requiresGuest: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login",
      requiresGuest: true,
    },
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "Not Found",
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

let DEFAULT_TITLE = "Help Center";
router.beforeEach((to, _, next) => {
  console.log(to);
  document.title = to.meta.title || DEFAULT_TITLE;
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
