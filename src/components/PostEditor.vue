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
      <button class="btn-blue">Submit post</button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'PostEditor',
  props: {
    threadId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      text: '',

    };
  },
  methods: {
    save() {
      const post = {
        text: this.text,
        publishedAt: Math.floor(Date.now() / 1000),
        threadId: this.threadId,
        userId: '7uVPJS9GHoftN58Z2MXCYDqmNAh2',
        '.key': `newPost${Math.random()}`,
      };
      this.text = '';
      //  not needed since adding vuex
      // this.$emit('save', { post });
      this.$store.dispatch('createPost', post);
    },
  },
};
</script>

<style scoped>

</style>
