<template>
  <div class="col-3 push-top">
    <div class="profile-card">
      <p class="text-center">
        <img :src="user.avatar" :alt="user.name" class="avatar-xlarge">
      </p>
      <h1 class="title">{{ user.username }}</h1>
      <p class="text-lead">{{ user.name }}</p>
      <p class="text-justify">
        <span v-if="user.bio">{{ user.bio }}</span>
        <span v-else>No bio specified.</span>
      </p>
      <span class="online">{{ user.username }} is online</span>
      <div class="stats">
        <span>{{ userPostsCount }} posts</span>
        <span>{{ userThreadsCount }} threads</span>
      </div>
      <hr>
      <p v-if="user.website" class="text-large text-center">
        <i class="fa fa-globe"></i>
        <a :href="user.website">{{ user.website }}</a>
      </p>
      <p class="text-xsmall text-faded text-center">
        Member since june 2013, last visited 4 hourse ago
      </p>
      <div class="text-center">
        <hr>
        <router-link :to="{ name: 'ProfileEdit' }"
                     class="btn-green btn-small">
          Edit Profile
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileCard',
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    userPostsCount() {
      return this.$store.getters['users/userPostsCount'](this.user.dotkey);
    },
    userThreadsCount() {
      return this.$store.getters['users/userThreadsCount'](this.user.dotkey);
    },
  },
};
</script>
