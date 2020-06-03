<template>
  <nav v-if="user.loading">
    Loading...
  </nav>
  <nav v-else>
    <div v-if="user.data.uid">
      <span>{{ user.data.displayName }} </span>
      <button @click="signOut">Sign out</button>
    </div>
    <button v-else id="signin-with-google" @click="signInWithGoogle">Sign in with Google</button>
  </nav>
</template>

<script>
import firebase from '@/firebase';
import { mapState } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapState({
      user: 'user',
    }),
  },
  methods: {
    signInWithGoogle: function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider);
    },
    onAuthStateChanged: function () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          const userData = { 
            'uid': user.uid,
            'email': user.email,
            'displayName': user.displayName,
          }
          this.$store.dispatch('setUser', userData)
        } else {
          // User is signed out.
          this.$store.dispatch('clearUser')
        }
      });
    },
    signOut: function () {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        this.$store.dispatch('clearUser')
      })
      // .catch(function(error) {
      //   // An error happened.
      // });
    },
  },
  mounted: function () {
    this.onAuthStateChanged()
  },
}
</script>

<style scoped>

</style>
