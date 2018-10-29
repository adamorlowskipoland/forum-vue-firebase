<template>
  <span :title="timestamp | formatedDate">{{ timestamp | timeFromNow }}</span>
</template>

<script>
import moment from 'moment';

export default {
  name: 'AppDate',
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  filters: {
    formatedDate(date) {
      return moment.unix(date).format('MMMM Do YYYY, h:mm:ss a');
    },
    timeFromNow(date) {
      return moment.unix(date).fromNow();
    },
  },
};
</script>
