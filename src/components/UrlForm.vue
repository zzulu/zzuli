<template>
  <form v-on:submit.prevent="createShortened">
    <input type="text" v-model="url.shortened"> &rarr; <input type="text" v-model="url.origin">
    <input type="submit" value="Shorten!">
  </form>
</template>

<script>
import { db, serverTimestamp } from '../firebase'

export default {
  name: 'UrlForm',
  data () {
    return {
      url: {
        shortened: '',
        origin: '',
      }
    }
  },
  methods: {
    createShortened: async function () {
      const data = { origin: this.url.origin, created_at: serverTimestamp }
      await db.collection('urls').doc(this.url.shortened).set(data)
      this.url = { shortened: '', origin: '' }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
