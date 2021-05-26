<template>
  <div class="create-post">
    <div class="card">
      <div class="card-header">Create Post</div>
      <div class="card-body">
        <form>
          <base-control-input
            label-name="Facebook Page Name"
          ></base-control-input>
          <base-control-input
            label-name="Facebook Page Link"
          ></base-control-input>
          <base-control-input label-name="Phone"></base-control-input>
          <base-control-input
            label-name="Email(Optional)"
            type="email"
          ></base-control-input>
          <base-control-input label-name="Supports"></base-control-input>
          <base-control-input
            label-name="Image"
            control-type="image"
          ></base-control-input>
          <base-control-input
            label-name="Description"
            control-type="textarea"
          ></base-control-input>
          <button class="btn btn-secondary">Create Post</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BaseControlInput from "../../components/UI/BaseControlInput.vue";
export default {
  components: { BaseControlInput },
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
</style>
