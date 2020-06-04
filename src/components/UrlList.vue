<template>
  <transition-group v-if="!urls.loading" tag="ul" name="url-list" class="url__wrapper">
    <url-item v-for="url in urls.data" :key="url.id" :url="url" @delete-url="deleteUrl"></url-item>
  </transition-group>
</template>

<script>
import { mapState } from 'vuex'
import ClipboardJS from 'clipboard'
import UrlItem from '@/components/UrlItem.vue'

export default {
  name: 'UrlList',
  components: {
    UrlItem,
  },
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
