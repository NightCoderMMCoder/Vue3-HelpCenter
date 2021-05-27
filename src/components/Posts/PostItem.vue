<template>
  <div class="card">
    <div class="card-body">
      <h2>Post Name</h2>
      <div class="badge-groups">
        <base-badge>CDM</base-badge>
      </div>
      <div class="contact-info">
        <h4>Contact Info</h4>
        <div>
          <span>Phone: </span>
          <span>phone</span>
        </div>
        <div>
          <span>Email: </span>
          <span>email</span>
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
