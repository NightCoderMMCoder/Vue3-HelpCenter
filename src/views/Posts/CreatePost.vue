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
            v-model="support"
          ></base-control-input>
          <base-control-input
            label-name="Image"
            control-type="image"
            @upload-image="uploadImage"
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
export default {
  components: { BaseControlInput },
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
    return { ...toRefs(post), support, uploadImage, previewImage };
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
