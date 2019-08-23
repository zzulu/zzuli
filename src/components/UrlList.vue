<template>
  <div class="urls">
    <div v-if="urls.loading">
      Loading...
    </div>
    <ul v-else>
      <li v-for="url in urls.data" :key="url.id">
        <div>https://zzu.li/<b>{{ url.id }}</b> &rarr; {{ url.origin }}</div>
        <div>Shortened by {{ url.owner.username }} <button v-if="url.owner.uid === user.data.uid" @click="deleteShortened(url.id)">Delete</button></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from '../firebase'
import { mapState } from 'vuex'

export default {
  name: 'UrlList',
  computed: {
    ...mapState({
      urls: 'urls',
      user: 'user',
    })
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
