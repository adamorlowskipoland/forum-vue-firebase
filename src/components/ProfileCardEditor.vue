<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" :alt="user.name" class="avatar-xlarge img-update">
      </p>
      <div class="form-group">
        <input v-model="activeUser.username"
               type="text"
               placeholder="Username"
               class="form-input text-lead text-bold">
      </div>
      <div class="form-group">
        <input v-model="activeUser.name"
               type="text"
               placeholder="Full name"
               class="form-input text-lead">
      </div>
      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea v-model="activeUser.bio"
                  id="user_bio"
                  placeholder="Write a few words about yourself"
                  class="form-input"></textarea>
      </div>
      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>
      <div class="form-group">
        <label for="user_website"
               class="form-label">Website</label>
        <input v-model="activeUser.website"
               type="text"
               autocomplete="off"
               id="user_website"
               class="form-input">
      </div>
      <div class="form-group">
        <label for="user_email"
               class="form-label">Email</label>
        <input v-model="activeUser.email"
               type="text"
               autocomplete="off"
               id="user_email"
               class="form-input">
      </div>
      <div class="form-group">
        <label for="user_location"
               class="form-label">Location</label>
        <input v-model="activeUser.location"
               type="text"
               autocomplete="off"
               id="user_location"
               class="form-input">
      </div>
      <div class="btn-group space-between">
        <button @click="cancel"
                class="btn-ghost">
          Cancel
        </button>
        <button @click.prevent="save"
                type="submit"
                class="btn-blue">
          Save
        </button>
      </div>
      <p class="text-xsmall text-faded text-center">
        Member since june 2013, last visited 4 hourse ago
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCardEditor',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeUser: { ...this.user },
    };
  },
  computed: {
    userPostsCount() {
      return this.$store.getters.userPostsCount(this.user['.key']);
    },
    userThreadsCount() {
      return this.$store.getters.userThreadsCount(this.user['.key']);
    },
  },
  methods: {
    save() {
      this.$store.dispatch('updateUser', { ...this.activeUser });
      this.$router.push({ name: 'Profile' });
    },
    cancel() {
      this.$router.push({ name: 'Profile' });
    },
  },
};
</script>
