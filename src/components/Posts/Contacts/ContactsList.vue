<template>
  <div class="contacts">
    <div class="card">
      <div class="card-body">
        <div class="contact" v-for="contact in contacts" :key="contact.id">
          <h4>{{ contact.email }}</h4>
          <p>{{ contact.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: { contacts: Array },
};
</script>

<style lang="scss" scoped>
.contacts {
  margin-top: 30px;
  .contact {
    padding: 20px 0;
    border-bottom: 1px solid rgba(167, 166, 166, 0.575);
    &:nth-child(1) {
      padding-top: 0px;
    }
    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
    h4 {
      color: var(--primary);
      margin-bottom: 10px;
    }
  }
}
</style>
