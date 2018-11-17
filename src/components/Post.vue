<template>
  <div class="post">
    <div class="user-info">
      <a href="#" class="user-name">{{ user.name }}</a>
      <a href="#">
        <img :src="user.avatar"
             alt="User's avatar"
             class="avatar-large">
      </a>
      <p class="desktop-only text-small">{{ userPostsCount }} posts</p>
    </div>
    <div class="post-content">
      <template v-if="!editing">
        <div>
          {{ post.text }}
        </div>
        <a v-if="!editing"
           @click.prevent="editing = true"
           href="#"
           style="margin-left: auto;"
           class="link-unstyled"
           title="Make a change">
          <i class="fa fa-pencil"></i>
        </a>
      </template>
      <div v-else>
        <PostEditor :post="post"
                    @save="editing = false"
                    @cancel="editing = false" />
      </div>
    </div>
    <div class="post-date text-faded">
      <div v-if="post.edited"
           class="edition-info">
        edited
      </div>
      <AppDate :timestamp="post.publishedAt" />
    </div>
  </div>
</template>

<script>
import { countObjectProperties } from '@/utilities/index';
import PostEditor from '@/components/PostEditor.vue';

export default {
  name: 'Post',
  components: { PostEditor },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editing: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.users[this.post.userId];
    },
    userPostsCount() {
      return countObjectProperties(this.user.posts);
    },
  },
};
</script>

<style scoped>

</style>
