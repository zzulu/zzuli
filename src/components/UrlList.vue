<template>
  <div class="urls">
    <ul>
      <li v-for="url in urls" :key="url.id">
        {{ url.id }} &rarr; {{ url.origin }}
        <button @click="deleteShortened(url.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '../firebase'

export default {
  name: 'UrlList',
  props: {
    urls: Array
  },
  methods: {
    deleteShortened: function (docId) {
      db.collection('urls').doc(docId).delete()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
