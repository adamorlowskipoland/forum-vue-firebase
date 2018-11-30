<template>
  <div v-if="asyncDataStatus_ready"
       class="col-full push-top">
    <h1>Create new thread in <i>{{ forum.name }}</i></h1>
    <ThreadEditor ref="editor"
                  @save="save"
                  @cancel="cancel" />
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import ThreadEditor from '@/components/ThreadEditor.vue';
import asyncDataStatus from '@/mixins/asyncDataStatus';

export default {
  name: 'ThreadCreate',
  components: { ThreadEditor },
  props: {
    forumId: {
      type: String,
      required: true,
    },
  },
  created() {
    this.fetchForum({ id: this.forumId })
      .then(() => { this.asyncDataStatus_fetched(); });
  },
  beforeRouteLeave(to, from, next) {
    if (this.hasUnsavedChanges) {
      // eslint-disable-next-line
      const confirmed = window.confirm('Are you sure you want to leave? Unsaved changes will be lost');
      if (confirmed) {
        next();
      } else {
        //  aborting route change
        next(false);
      }
    } else {
      next();
    }
  },
  data() {
    return {
      saved: false,
    };
  },
  computed: {
    forum() {
      return this.$store.state.forums[this.forumId];
    },
    hasUnsavedChanges() {
      return (this.$refs.editor.form.title || this.$refs.editor.form.text) && !this.saved;
    },
  },
  methods: {
    ...mapActions(['createThread', 'fetchForum']),
    save({ title, text }) {
      this.createThread({
        forumId: this.forum.dotkey,
        title,
        text,
      })
        .then((thread) => {
          this.saved = true;
          this.$router.push({ name: 'ThreadShow', params: { id: thread.dotkey } });
        });
    },
    cancel() {
      this.$router.push({ name: 'Forum', params: { id: this.forum.dotkey } });
    },
  },
  mixins: [asyncDataStatus],
};
</script>
