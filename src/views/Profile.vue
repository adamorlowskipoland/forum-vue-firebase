<template>
  <div class="flex-grid">
    <ProfileCard v-if="!edit"
                 :user="user" />
    <ProfileCardEditor v-else
                       :user="user" />
    <div class="col-7 push-top">
      <div class="profile-header">
        <span class="text-lead">
          {{ user.username }}'s recent activity
        </span>
      </div>
      <hr>
      <PostList :posts="userPosts" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ProfileCard from '@/components/ProfileCard.vue';
import ProfileCardEditor from '@/components/ProfileCardEditor.vue';
import PostList from '@/components/PostList.vue';
import store from '@/store';

export default {
  name: 'Profile',
  components: { PostList, ProfileCard, ProfileCardEditor },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      user: 'authUser',
    }),
    userPosts() {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts)
          .filter(post => post.userId === this.user.dotkey);
      }
      return [];
    },
  },
  beforeRouteEnter(to, from, next) {
    if (store.state.authId) {
      next();
    } else {
      next({ name: 'Home' });
    }
  },
};
</script>

<!--  middlewere hooks
beforeRouteEnter(to, from, next) {}
beforeRouteUpdate(to, from, next) {
  this one fires when navigating from one route to the other which renders the same component
}
beforeRouteLeave(to, from, next) {}
-->
