<template>
  <div id="app">
    <Navbar />
    <div v-if="user.data.uid">
      <UrlForm />
      <UrlList />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from './components/Navbar.vue'
import UrlForm from './components/UrlForm.vue'
import UrlList from './components/UrlList.vue'
import { db } from './firebase'
import ClipboardJS from 'clipboard'
new ClipboardJS('.btn')

export default {
  name: 'app',
  computed: {
    ...mapState({
      urls: 'urls',
      user: 'user'
    })
  },
  created () {
    this.$store.dispatch('setUrlsRef', db.collection('urls').orderBy('created_at', 'desc'))
  },
  components: {
    Navbar,
    UrlForm,
    UrlList,
  }, 
}
</script>

<style>

</style>
