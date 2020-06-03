<template>
  <div class="urls">
    <div v-if="urls.loading">
      Loading...
    </div>
    <ul v-else>
      <li v-for="url in urls.data" :key="url.id">
        <div>
          <span>{{ url.origin }}</span> &rarr; <span>https://zzu.li/{{ url.id }}</span>
          <button class="btn" :data-clipboard-text="'https://zzu.li/' + url.id">copy</button>
        </div>
        <div><button @click="deleteUrl(url.id)">Delete</button></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import ClipboardJS from 'clipboard'

export default {
  name: 'UrlList',
  computed: {
    ...mapState({
      urls: 'urls',
    })
  },
  methods: {
    deleteUrl: function (urlId) {
      this.$store.dispatch('deleteUrl', urlId)
    }
  },
  mounted: function () {
    new ClipboardJS('.btn')
  },
}
</script>

<style scoped>

</style>
