<template>
  <div class="edit-post">
    <div class="card">
      <div class="card-header">Edit Post</div>
      <div class="card-body">
        <form @submit.prevent="handleSubmit">
          <base-control-input label-name="Facebook Page Name" v-model="name">
            <small v-if="errors.name" class="error-message">
              {{ errors.name }}
            </small>
          </base-control-input>
          <base-control-input label-name="Facebook Page Link" v-model="link">
            <small v-if="errors.link" class="error-message">
              {{ errors.link }}
            </small>
          </base-control-input>
          <base-control-input label-name="Phone" v-model="phone">
            <small v-if="errors.phone" class="error-message">
              {{ errors.phone }}
            </small>
          </base-control-input>
          <base-control-input
            label-name="Email(Optional)"
            type="email"
            v-model="email"
          ></base-control-input>
          <base-control-input
            label-name="Supports"
            v-model.trim="support"
            @blur="addSupport"
          >
            <div class="badge-groups">
              <base-badge v-for="(support, idx) in supports" :key="idx">
                {{ support }}
                <i class="fas fa-times" @click="removeSupport(idx)"></i>
              </base-badge>
            </div>

            <small v-if="errors.supports" class="error-message">
              {{ errors.supports }}
            </small>
          </base-control-input>
          <base-control-input
            label-name="Image"
            control-type="image"
            @change="uploadImage"
          >
            <small v-if="errors.image" class="error-message">
              {{ errors.image }}
            </small>
          </base-control-input>
          <img :src="previewImage" alt="" />
          <base-control-input
            label-name="Description"
            control-type="textarea"
            v-model="description"
          >
            <small v-if="errors.description" class="error-message">
              {{ errors.description }}
            </small>
          </base-control-input>
          <button class="btn btn-secondary">Edit Post</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref, toRefs, watch } from "vue";
import BaseControlInput from "../../components/UI/BaseControlInput.vue";
import BaseBadge from "../../components/UI/BaseBadge.vue";
import useValidation from "../../hooks/validation";
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";

export default {
  components: { BaseControlInput, BaseBadge },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const post = reactive({
      name: "",
      link: "",
      phone: "",
      email: "",
      supports: [],
      image: "",
      description: "",
    });

    const postId = route.params.id;
    const getPost = computed(() => store.getters["Posts/post"]);
    store.dispatch("Posts/getPost", postId);
    watch(getPost, (val) => {
      if (val) {
        post.name = val.name;
        post.link = val.link;
        post.phone = val.phone;
        post.email = val.email;
        post.supports = val.supports;
        post.description = val.description;
      }
    });

    const { validation, errors } = useValidation(post);
    const support = ref("");
    const addSupport = () => {
      if (support.value && post.supports.length < 5) {
        post.supports.push(support.value.toUpperCase());
        support.value = "";
      }
    };
    const removeSupport = (idx) => {
      post.supports.splice(idx, 1);
    };

    const previewImage = ref(null);
    const type = ["image/png", "image/jpeg", "image/jpg"];
    const uploadImage = (e) => {
      let file = e.target.files[0];
      if (type.includes(file?.type)) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
        post.image = file;
      }
    };

    const handleSubmit = () => {
      let isValidate = validation({ email: false, image: false });
      if (isValidate) {
        store.dispatch("Posts/updatePost", post);
      }
    };

    return {
      ...toRefs(post),
      support,
      uploadImage,
      previewImage,
      addSupport,
      removeSupport,
      handleSubmit,
      errors,
    };
  },
};
</script>

<style scoped>
.edit-post {
  max-width: 800px;
  margin: 0 auto;
}
.support {
  display: flex;
}
.support > div {
  margin-top: 5px;
  margin-right: 1.2rem;
}
.badge {
  cursor: pointer;
  margin-top: 10px;
}
.fa-times {
  color: var(--primary);
  margin-left: 7px;
}
img {
  width: 100px;
}
</style>
