<template>
  <div id="app">
    <Navbar />
    <template v-if="!user.loading">
      <div v-if="user.data.uid" class="container">
        <UrlForm />
        <UrlList />
      </div>
      <div v-else class="container text-center">
        <img src="./assets/images/logo.png" alt="logo" class="logo">
      </div>
    </template>
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
body {
  font-family: 'Spoqa Han Sans', sans-serif;
  color: #343a40;
}

ul {
  list-style: none;
  padding: 0;
}

input:focus,
button:focus {
  outline: none;
}

::placeholder {
  color: #adb5bd;
}


/* Pill */

.pill {
  border: 1px solid #ced4da;
  border-radius: 16px;
  padding: 1.25rem 2rem;
  box-shadow: 0px 2px 8px #e9ecef;
  z-index: 1;
}

@media (max-width: 767px) {
  .form > .pill:first-child,
  .url > .pill:first-child {
    border-radius: 16px 16px 0 0;
  }

  .form > .pill:last-child,
  .url > .pill:last-child {
    border-radius: 0 0 16px 16px;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
}

.pill--red {
  border-color: #fa5252;
  box-shadow: 0px 2px 8px #ffc9c9;
}

.pill--violet {
  border-color: #7950f2;
  box-shadow: 0px 2px 8px #d0bfff;
}

.logo {
  max-width: 300px;
  width: 100%;
  margin-top: 1.5rem;
}
</style>
