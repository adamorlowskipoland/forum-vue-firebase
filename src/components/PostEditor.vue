<template>
  <form @submit.prevent="save">
    <div class="form-group">
        <textarea name=""
                  id=""
                  cols="30"
                  rows="10"
                  class="form-input"
                  v-model="text"></textarea>
    </div>
    <div class="form-actions">
      <button v-if="isUpdate"
              @click.prevent="cancel"
              class="btn btn-ghost">Cancel</button>
      <button class="btn-blue">{{ isUpdate ? 'Update' : 'Submit post' }}</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'PostEditor',
  props: {
    threadId: {
      type: String,
      required: false,
    },
    post: {
      type: Object,
    },
  },
  data() {
    return {
      text: this.post ? this.post.text : '',
    };
  },
  computed: {
    isUpdate() {
      return !!this.post;
    },
  },
  methods: {
    save() {
      //  first parentease call condition and method, alwayse return a promise,
      // is the same as using commented method persist below.
      // like that: this.persist().then(post => ...
      (this.isUpdate ? this.update() : this.create())
        .then(post => this.$emit('save', { post }));
    },
    cancel() {
      this.$emit('cancel');
    },
    create() {
      const post = {
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
      };
      this.text = '';
      //  not needed since adding vuex
      // this.$emit('save', { post });
      return this.$store.dispatch('createPost', post);
    },
    update() {
      const payload = {
        id: this.post['.key'],
        text: this.text,
      };
      return this.$store.dispatch('updatePost', payload);
    },
    // persist() {
    //   return this.isUpdate ? this.update() : this.create();
    // },
  },
};
</script>

<style scoped>

</style>
