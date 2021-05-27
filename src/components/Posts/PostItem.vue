<template>
  <div class="card">
    <div class="card-body">
      <h2>{{ post.name }}</h2>
      <div class="badge-groups">
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
      <div class="btn-groups actions">
        <button class="btn btn-primary">View Details</button>
        <button class="btn btn-primary flat">Contact</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseBadge from "../UI/BaseBadge.vue";
export default {
  components: { BaseBadge },
  props: { post: Object },
};
</script>

<style lang="scss" scoped>
.badge-groups {
  margin: 15px 0 20px;
}
.actions {
  margin-top: 20px;
  text-align: right;
}
</style>
