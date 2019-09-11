<template>
  <form v-on:submit.prevent="createShortened">
    <input type="text" v-model="url.origin" placeholder="https://whatever-a-long-url-you-have.com"> &rarr; https://zzu.li/<input type="text" v-model="url.shortened">
    <input class="btn" :data-clipboard-text="'https://zzu.li/' + url.shortened" type="submit" value="Shorten!">
  </form>
</template>

<script>
import firebase, { db } from '../firebase';

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
      const userData = this.$store.state.user.data
      const data = {
        origin: this.url.origin,
        created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        owner: {
          uid: userData.uid,
          username: userData.userName,
        },
      }
      await db.collection('urls').doc(this.url.shortened).set(data)
      this.url = {
        shortened: '',
        origin: '',
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
