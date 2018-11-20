<template>
  <div class="col-full push-top">
    <h1>Create new thread in <i>{{ forum.name }}</i></h1>
    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import ThreadEditor from '@/components/ThreadEditor.vue';

export default {
  name: 'ThreadCreate',
  components: { ThreadEditor },
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  computed: {
    forum() {
      return this.$store.state.forums[this.forumId];
    },
  },
  methods: {
    save({ title, text }) {
      this.$store.dispatch('createThread', {
        forumId: this.forum.dotkey,
        title,
        text,
      })
        .then((thread) => {
          this.$router.push({ name: 'ThreadShow', params: { id: thread.dotkey } });
        });
    },
    cancel() {
      this.$router.push({ name: 'Forum', params: { id: this.forum.dotkey } });
    },
  },
};
</script>
