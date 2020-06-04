<template>
  <nav v-if="!user.loading">
    <ul v-if="user.data.uid" class="nav__item-list">
      <li class="nav__item">
        <span>{{ user.data.email }}</span>
      </li>
      <li class="nav__item">
        <a @click="signOut">Logout</a>
      </li>
    </ul>
    <ul v-else class="nav__item-list">
      <li class="nav__item">
        <a id="signin-with-google" @click="signInWithGoogle">Sign in with Google</a>
      </li>
    </ul>
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
      .catch(function(err) {
        console.log(err)
      });
    },
  },
  mounted: function () {
    this.onAuthStateChanged()
  },
}
</script>

<style>
/* Navbar */

.nav__item-list {
  display: flex;
  justify-content: flex-end;
  padding-right: 2rem;
  padding-left: 2rem;
}

@media (max-width: 575px) {
  .nav__item-list {
    padding-right: 1rem;
    padding-left: 1rem;
  }
}

.nav__item {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.nav__item > a,
.nav__item > span {
  display: inline-block;
  padding: .75rem 1.5rem;
  color: #495057;
  border-radius: 16px;
  background-color: none;
  transition: background-color .15s;
}

.nav__item > a:hover,
.nav__item > a:focus {
  cursor: pointer;
  text-decoration: none;
  color: #212529;
  background-color: #f1f3f5;
  transition: background-color .15s;
}
</style>
