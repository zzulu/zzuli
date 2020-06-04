<template>
  <transition-group v-if="!urls.loading" tag="ul" name="url-list" class="url__wrapper">
    <url-item v-for="url in urls.data" :key="url.id" :url="url" @delete-url="deleteUrl"></url-item>
  </transition-group>
</template>

<script>
import { mapState } from 'vuex'
import ClipboardJS from 'clipboard'
import UrlItem from '@/components/UrlItem.vue'

export default {
  name: 'UrlList',
  components: {
    UrlItem,
  },
  computed: {
    ...mapState({
      urls: 'urls',
    })
  },
  methods: {
    deleteUrl: function (urlId) {
      this.$store.dispatch('deleteUrl', urlId)
    },
    initClipboardJS: function () {
      const clipboard = new ClipboardJS('.copy', {
        text: function(trigger) {
          return trigger.previousElementSibling.lastChild.innerText;
        },
      });

      clipboard.on('success', function(e) {
        const copiedElement = e.trigger.previousElementSibling.lastChild
        copiedElement.classList.add('copying')
        window.setTimeout(() => {
          copiedElement.classList.remove('copying')
        }, 1800);
      });
    },
  },
  mounted: function () {
    this.initClipboardJS()
  },
}
</script>

<style>
/* URLs */

.url__wrapper {
  position: relative;
  margin-bottom: 5rem;
}


/* Animation */

.url-list-enter {
  opacity: 0;
  transform: translateY(-110px);
}

@media (max-width: 767px) {
  .url-list-enter {
    transform: translateY(-160px);
  }
}

.url-list-leave-to {
  opacity: 0;
  transform: translateY(-55px);
}

@media (max-width: 767px) {
  .url-list-leave-to {
    transform: translateY(-80px);
  }
}

.url-list-leave-active {
  position: absolute;
  right: 0;
  left: 0;
  z-index: -1;
}
</style>
