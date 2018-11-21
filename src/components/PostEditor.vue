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
      validator: (validatedProp) => {
        const keyIsValid = typeof validatedProp.dotkey === 'string';
        const textIsValid = typeof validatedProp.text === 'string';
        if (!keyIsValid) {
          // eslint-disable-next-line
          console.warn('Prop `post` must include `key` attributes');
        }
        if (!textIsValid) {
          // eslint-disable-next-line
          console.warn('Prop `post` must include `text` attributes');
        }
        return keyIsValid && textIsValid;
      },
    },
    //  example validators
    // age: {
    //   type: Number,
    //   validator: value => value > 0,
    // },
    // cheeseOrHam: {
    //   type: String,
    //   validator: value => ['cheese', 'ham'].includes(value),
    // },
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
        id: this.post.dotkey,
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
