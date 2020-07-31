<template>
  <form @submit.prevent="createUrl" class="form">
    <div class="form__wrapper pill col-12 col-md-auto bg-white">
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
        <span>https://zzu.li/</span>
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

<style>
/* Form */

.form {
  display: flex;
  margin-top: 3rem;
  margin-bottom: 1rem;
}

@media (max-width: 767px) {
  .form {
    flex-wrap: wrap;  
    margin-top: 1.5rem;
  }
}

.form > div {
  flex-grow: 1;
}

.form__origin {
  position: relative;
  font-size: .875rem;
  margin-bottom: .25rem;
}

.form__origin > input {
  border: none;
  box-shadow: none;
  padding: 0;
  color: #495057;
  width: 100%;
}

.form__shortened {
  position: relative;
  font-size: 1.125rem;
  display: flex;
  align-items: baseline;
}

.form__shortened > input {
  border: none;
  box-shadow: none;
  padding: 0;
  width: 100%;
  flex-grow: 1;
}

.form__wrapper {
  position: relative;
  transition: box-shadow .15s;
}

.form__wrapper:focus-within {
  box-shadow: 0px 2px 8px #ced4da;
}

.form__wrapper:focus-within + .pill {
  box-shadow: 0px 2px 8px #9775fa;
  transition: box-shadow .15s;
}

.input--valid::before {
  content: '';
  position: absolute;
  left: -1.125rem;
  background-image: url('../assets/images/valid.svg');
  background-position: .75rem 1rem;
  width: .75rem;
  height: 1rem;
}

.form__origin.input--valid::before {
  top: .2rem;
}

.form__shortened.input--valid::before {
  top: .5rem;
}

.input--invalid::before {
  content: '';
  position: absolute;
  left: -1.125rem;
  background-image: url('../assets/images/invalid.svg');
  background-position: .75rem 1rem;
  width: .75rem;
  height: 1rem;
}

.form__origin.input--invalid::before {
  top: .2rem;
}

.form__shortened.input--invalid::before {
  top: .5rem;
}

.errors {
  position: absolute;
  bottom: 5.5rem;
  font-size: .875rem;
  color: #fa5252;
}

.errors > li {
  position: relative;
}

.errors > li::before {
  content: '';
  position: absolute;
  top: .15rem;
  left: -1.125rem;
  background-image: url('../assets/images/invalid.svg');
  background-position: .75rem 1rem;
  width: .75rem;
  height: 1rem;
}

.errors > li > span::after {
  content: ' ';
}

</style>
