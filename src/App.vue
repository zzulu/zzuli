<template>
  <div id="app">
    <Navbar />
    <div v-if="user.data.uid" class="container">
      <UrlForm />
      <UrlList />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Navbar from '@/components/Navbar.vue'
import UrlForm from '@/components/UrlForm.vue'
import UrlList from '@/components/UrlList.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    UrlForm,
    UrlList,
  },
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
}
</script>

<style>

</style>
