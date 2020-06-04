<template>
  <form @submit.prevent="createUrl" class="form">
    <div class="pill form__wrapper col-12 col-md-auto">
      <ul class="errors" v-show="validation.show">
        <li v-show="validation.origin.has_error">
          <span v-for="message in validation.origin.messages" :key="message">{{ message }}</span>
        </li>
        <li v-show="validation.shortened.has_error">
          <span v-for="message in validation.shortened.messages" :key="message">{{ message }}</span>
        </li>
      </ul>
      <div class="form__origin" :class="validationClass('origin')">
        <input type="text" v-model="origin" authcomplete="off" spellcheck="false" placeholder="https://whatever-a-long-url-you-have.com">
      </div>
      <div class="form__shortened" :class="validationClass('shortened')">
        <span>https://hpy.hk/</span>
        <input type="text" v-model="shortened" authcomplete="off" spellcheck="false">              
      </div>
    </div>
    <button class="pill pill--violet button button--violet col-12 col-md-auto">
      Shorten
    </button>
  </form>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UrlForm',
  computed: {
    ...mapState({
      validation: 'validation',
    }),
    origin: {
      get () {
        return this.$store.state.url.origin
      },
      set (value) {
        this.$store.commit('updateUrlOrigin', value)
      },
    },
    shortened: {
      get () {
        return this.$store.state.url.shortened
      },
      set (value) {
        this.$store.commit('updateUrlShortened', value)
      },
    }
  },
  methods: {
    createUrl: function () {
      this.$store.dispatch('createUrl')
    },
    validationClass: function (field) {
      return {
        'input--valid': this.validation.show && !this.validation[field].has_error,
        'input--invalid': this.validation.show && this.validation[field].has_error,
      }
    },
  }
}
</script>

<style scoped>

</style>
