<template>
  <div class="error" v-if="error">
    <h2>{{ error }}</h2>
    <button
      class="btn btn-secondary"
      @click="$router.replace({ name: 'Home' })"
    >
      Go Home
    </button>
  </div>
  <div class="details" v-if="post">
    <div>
      <h2>{{ post.name }}</h2>
      <img :src="post.imageURL" alt="" />
      <div>
        <base-badge v-for="(support, idx) in post.supports" :key="idx">
          {{ support }}
        </base-badge>
      </div>
      <div class="contact-info">
        <h4>Contact Info</h4>
        <div>
          <span>Phone: </span>
          <span>{{ post.phone }}</span>
        </div>
        <div v-if="post.email">
          <span>Email: </span>
          <span>{{ post.email }}</span>
        </div>
      </div>
      <div class="btn-groups">
        <button
          class="btn btn-secondary"
          @click="$router.push({ name: 'EditPost', params: { id: post.id } })"
        >
          Edit
        </button>
        <button class="btn btn-primary" @click="handleDelete">Delete</button>
      </div>
    </div>
    <div>
      <div class="link">
        <p class="copy">
          <span class="link">{{ post.link }}</span>
          <i class="fas fa-copy" @click="copyLink"></i>
        </p>
        <input type="text" :value="post.link" ref="link" />
        <a href="" target="_blank">
          <button class="btn btn-primary">Go Facebook Page</button>
        </a>
      </div>
      <small v-if="isCopied">Link copied successfully!</small>
      <div class="desc">
        <h4>Description:</h4>
        <p>
          {{ post.description }}
        </p>
      </div>
      <div class="btn-groups">
        <button class="btn btn-secondary">Back</button>
        <button
          class="btn btn-primary flat"
          @click="$router.push({ name: 'AddContact', params: { id: post.id } })"
        >
          Add Contact
        </button>
      </div>
      <router-view></router-view>
      <contacts-list
        :contacts="contacts"
        v-if="contacts.length !== 0"
      ></contacts-list>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import BaseBadge from "../../components/UI/BaseBadge.vue";
import ContactsList from "../../components/Posts/Contacts/ContactsList.vue";
export default {
  components: { BaseBadge, ContactsList },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const postId = route.params.id;
    const post = computed(() => store.getters["Posts/post"]);
    store.dispatch("Posts/getPost", postId);

    const link = ref(null);
    const isCopied = ref(false);
    let timer;
    const copyLink = () => {
      link.value.select();
      document.execCommand("copy");
      isCopied.value = true;
      clearTimeout(timer);
      timer = setTimeout(() => {
        isCopied.value = false;
      }, 1000);
    };

    const error = computed(() => store.getters["Posts/error"]);
    const handleDelete = async () => {
      await store.dispatch("Posts/deletePost", post.value.id);
      if (!error.value) {
        router.push({ name: "Home" });
      }
    };

    store.dispatch("Posts/getContacts", postId);
    const contacts = computed(() => store.getters["Posts/contacts"]);

    window.addEventListener("scroll", handleScroll);

    function handleScroll() {
      const {
        scrollHeight,
        scrollTop,
        clientHeight,
      } = document.documentElement;
      let currentHeight = clientHeight + scrollTop + 1;
      if (currentHeight >= scrollHeight) {
        store.dispatch("Posts/getContacts", postId);
      }
    }

    return { post, copyLink, link, isCopied, handleDelete, error, contacts };
  },
};
</script>

<style lang="scss" scoped>
.details {
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 30px;

  img {
    margin: 30px 0 20px 0;
    width: 100%;
  }
  .btn-groups {
    margin-top: 30px;
  }
  .link {
    display: grid;
    grid-template-columns: 3.2fr 1fr;
    align-items: center;

    p {
      background: var(--secondary);
      padding: 10px 20px;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
      margin-right: 20px;
      color: var(--font-color);
      white-space: pre-line;
    }
    .copy i {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      background: white;
      padding: 0.5rem;
      border-radius: 50%;
      cursor: pointer;
    }
  }
  .desc {
    display: flex;
    margin: 20px 0 20px;
    background: none;
    padding: 0;
    p {
      padding: 0;
      background: none;
      margin-left: 20px;
    }
  }
}
input {
  opacity: 0;
  position: absolute;
}
.error {
  padding: 30px 20px;
  margin-top: 50px;
  h2 {
    margin-bottom: 20px;
  }
}
</style>
