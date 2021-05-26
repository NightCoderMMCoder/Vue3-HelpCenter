<template>
  <div class="create-post">
    <div class="card">
      <div class="card-header">Create Post</div>
      <div class="card-body">
        <form>
          <base-control-input
            label-name="Facebook Page Name"
            v-model="name"
          ></base-control-input>
          <base-control-input
            label-name="Facebook Page Link"
            v-model="link"
          ></base-control-input>
          <base-control-input
            label-name="Phone"
            v-model="phone"
          ></base-control-input>
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
          </base-control-input>
          <base-control-input
            label-name="Image"
            control-type="image"
            @change="uploadImage"
          ></base-control-input>
          <img :src="previewImage" alt="" />
          <base-control-input
            label-name="Description"
            control-type="textarea"
            v-model="description"
          ></base-control-input>
          <button class="btn btn-secondary">Create Post</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "vue";
import BaseControlInput from "../../components/UI/BaseControlInput.vue";
import BaseBadge from "../../components/UI/BaseBadge.vue";
export default {
  components: { BaseControlInput, BaseBadge },
  setup() {
    const post = reactive({
      name: "",
      link: "",
      phone: "",
      email: "",
      supports: [],
      image: "",
      description: "",
    });
    const support = ref("");
    const addSupport = () => {
      if (support.value && post.supports.length < 5) {
        post.supports.push(support.value);
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
      if (type.includes(file.type)) {
        const reader = new FileReader();
        reader.onload = function(e) {
          previewImage.value = e.target.result;
          console.log(e.target.result);
        };
        reader.readAsDataURL(file);
        previewImage.value = file;
        post.image = file;
      }
    };
    return {
      ...toRefs(post),
      support,
      uploadImage,
      previewImage,
      addSupport,
      removeSupport,
    };
  },
};
</script>

<style scoped>
.create-post {
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
