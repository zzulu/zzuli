<template>
  <form v-on:submit.prevent="createUrl">
    <input type="text" v-model="url.origin" placeholder="https://whatever-a-long-url-you-have.com"> &rarr; https://zzu.li/<input type="text" v-model="url.shortened">
    <input class="btn" :data-clipboard-text="'https://zzu.li/' + url.shortened" type="submit" value="Shorten!">
  </form>
</template>

<script>
export default {
  name: 'UrlForm',
  data: function () {
    return {
      url: {
        shortened: '',
        origin: '',
      }
    }
  },
  methods: {
    createUrl: function () {
      this.$store.dispatch('createUrl', this.url)
      this.url = {
        shortened: '',
        origin: '',
      }
    }
  }
}
</script>

<style scoped>

</style>
