<template>
  <div class="flex-grid">
    <ProfileCard v-if="!edit"
                 :user="user"
                 :userPostsCount="userPostsCount"
                 :userThreadsCount="userThreadsCount" />
    <ProfileCardEditor v-else
                       :user="user"
                       :userPostsCount="userPostsCount"
                       :userThreadsCount="userThreadsCount" />
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
import ProfileCard from '@/components/ProfileCard.vue';
import ProfileCardEditor from '@/components/ProfileCardEditor.vue';
import PostList from '@/components/PostList.vue';
import { mapGetters } from 'vuex';

const countObjectProperties = (obj) => {
  if (typeof obj === 'object') {
    return Object.keys(obj).length;
  }
  return 0;
};

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
    userPostsCount() {
      return countObjectProperties(this.user.posts);
    },
    userThreadsCount() {
      return countObjectProperties(this.user.threads);
    },
    userPosts() {
      if (this.user.posts) {
        return Object.values(this.$store.state.posts)
          .filter(post => post.userId === this.user['.key']);
      }
      return [];
    },
  },
};
</script>
