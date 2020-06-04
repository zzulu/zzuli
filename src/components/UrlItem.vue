<template>
  <li class="url">
    <div class="url__meta pill col-12 col-md">
      <div class="url__origin">
        {{ url.origin }}
      </div>
      <div class="url__shortened">
        https://zzu.li/{{ url.id }}
      </div>
    </div>
    <button class="button pill copy col-6 col-md-auto">
      Copy
    </button>
    <button @click="deleteUrl" class="pill pill--red button button--red col-6 col-md-auto">
      Delete
    </button>
  </li>
</template>

<script>
export default {
  name: 'UrlList',
  props: {
    url: Object,
  },
  methods: {
    deleteUrl: function () {
      this.$emit('delete-url', this.url.id);
    },
  },
}
</script>

<style scoped>

</style>
