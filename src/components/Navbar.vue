<template>
  <nav v-if="loading">
    Loading...
  </nav>
  <nav v-else>
    <div v-if="user.data.uid">
      <span>{{ user.data.userName }} </span>
      <button @click="signOut">Sign out</button>
    </div>
    <button v-else id="signin-with-google" @click="signInWithGoogle">Sign in with hphk.kr</button>
  </nav>
</template>

<script>
import firebase from '../firebase';
import { mapState } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapState({
      loading: state => state.user.loading,
      user: 'user',
    }),
  },
  mounted () {
    this.onAuthStateChanged()
  },
  methods: {
    signInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        'hd': 'hphk.kr',
      });
      firebase.auth().signInWithRedirect(provider);
    },
    onAuthStateChanged () {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User is signed in.
          const userData = { 'uid': user.uid, 'email': user.email, 'displayName': user.displayName }
          this.$store.dispatch('setUser', userData)
        } else {
          // User is signed out.
          this.$store.dispatch('setUserLoading', false)
        }
      });
    },
    signOut () {
      firebase.auth().signOut().then(() => {
        // Sign-out successful.
        this.$store.dispatch('clearUser')
      })
      // .catch(function(error) {
      //   // An error happened.
        
      // });
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
