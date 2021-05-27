<template>
  <nav>
    <div class="container">
      <div class="navbar">
        <router-link :to="{ name: 'Home' }">
          <h1><span>Help </span> Center</h1>
        </router-link>
        <ul>
          <router-link :to="{ name: 'Home' }">
            <li>Home</li>
          </router-link>
          <div v-if="user">
            <router-link :to="{ name: 'UserPosts' }">
              <li>My Posts</li>
            </router-link>
            <router-link :to="{ name: 'CreatePost' }">
              <li>Create Post</li>
            </router-link>
          </div>
        </ul>
      </div>
      <input
        type="text"
        placeholder="Search By Supports"
        class="form-control"
        v-model="searchTerm"
        @keyup.enter="searchPosts"
      />
      <div>
        <div v-if="user">
          <span class="username">{{ user.name }}</span>
          <button class="btn btn-secondary" @click="logout">Logout</button>
        </div>
        <div class="btn-groups" v-else>
          <router-link :to="{ name: 'Login' }">
            <button class="btn btn-secondary">Login</button>
          </router-link>
          <router-link :to="{ name: 'Register' }">
            <button class="btn btn-secondary">Register</button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const searchTerm = ref("");
    const searchPosts = () => {
      router.push({ name: "SearchPosts", query: { term: searchTerm.value } });
      searchTerm.value = "";
    };

    const user = computed(() => store.getters["Auth/user"]);

    const logout = () => {
      store.dispatch("Auth/logout");
    };
    return { user, logout, searchTerm, searchPosts };
  },
};
</script>

<style lang="scss" scoped>
nav {
  padding: 1rem 0;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .navbar {
      display: flex;
      align-items: center;
    }
    span {
      color: var(--secondary);
    }
    .login {
      margin-right: 15px;
    }
    .username {
      margin-right: 15px;
    }
    small {
      margin-right: 15px;
    }
  }
  background: var(--primary);
  color: white;
  ul {
    margin-left: 20px;
    display: flex;
    list-style: none;
    li {
      display: inline-block;
      font-size: 17px;
      margin: 0 15px;
      color: var(--secondary);
      position: relative;
    }
  }
  .form-control {
    padding: 10px;
    border: 1px solid #00000028;
    outline: none;
    border-radius: 5px;
    max-width: 300px;
    width: 250px;
    &:focus {
      box-shadow: 0 0 0 0.1rem #ffcd9498;
    }
  }
  .active li::after {
    content: "";
    position: absolute;
    border-bottom: 3px solid var(--secondary);
    width: 0%;
    left: 0;
    bottom: -7px;
    animation: slider 0.5s linear forwards;
  }
  @keyframes slider {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
}
</style>
