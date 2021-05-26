<template>
  <div class="details">
    <div>
      <h2>Heading</h2>
      <img src="" alt="" />
      <div>
        <base-badge>Badge</base-badge>
      </div>
      <div class="contact-info">
        <h4>Contact Info</h4>
        <div>
          <span>Phone: </span>
          <span>2343423</span>
        </div>
        <div>
          <span>Email: </span>
          <span>2343423</span>
        </div>
      </div>
      <div class="btn-groups">
        <button class="btn btn-secondary">Edit</button>
        <button class="btn btn-primary">Delete</button>
      </div>
    </div>
    <div>
      <div class="link">
        <p class="copy">
          <span class="link">link</span>
          <i class="fas fa-copy"></i>
        </p>
        <a href="" target="_blank">
          <button class="btn btn-primary">Go Facebook Page</button>
        </a>
      </div>
      <div class="desc">
        <h4>Description:</h4>
        <p>
          description
        </p>
      </div>
      <div class="btn-groups">
        <button class="btn btn-secondary">Back</button>
      </div>
    </div>
  </div>
</template>

<script>
import BaseBadge from "../../components/UI/BaseBadge.vue";
export default {
  components: { BaseBadge },
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
</style>
