<template>
  <div id="app">
    <UrlForm />
    <UrlList :urls="urls"/>
  </div>
</template>

<script>
import UrlForm from './components/UrlForm.vue'
import UrlList from './components/UrlList.vue'
import { db } from './firebase'

export default {
  name: 'app',
  data () {
    return {
      urls: [],
    }
  },
  firestore: {
    urls: db.collection('urls'),
  },
  components: {
    UrlForm,
    UrlList,
  }
}
</script>

<style>

</style>
