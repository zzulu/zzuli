<template>
  <li class="url">
    <div class="url__meta pill col-12 col-md bg-white">
      <div class="url__origin">
        {{ url.origin }}
      </div>
      <div class="url__shortened">
        https://zzu.li/{{ url.id }}
      </div>
    </div>
    <button class="pill button button--white copy col-6 col-md-auto">
      Copy
    </button>
    <button @click="deleteUrl" class="pill pill--red button button--red col-6 col-md-auto">
      Delete
    </button>
  </li>
</template>

<script>
export default {
  name: 'UrlList',
  props: {
    url: Object,
  },
  methods: {
    deleteUrl: function () {
      this.$emit('delete-url', this.url.id);
    },
  },
}
</script>

<style>
.url {
  display: flex;
  margin-bottom: 1rem;
  transition: all .5s;
}

@media (max-width: 767px) {
  .url {
    flex-wrap: wrap;  
  }
}

.url__meta {
  flex-grow: 1;
  min-width: 0;
}

.url__origin {
  font-size: .875rem;
  color: #868e96;
  margin-bottom: .25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.url__shortened {
  font-size: 1.125rem;
  transition: color .15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.button {
  margin-left: .5rem;
  transition: background-color .15s, box-shadow .15s;
}

@media (max-width: 767px) {
  .button {
    margin-left: 0;
    text-align: center;
  }
}

.button--white {
  background-color: #fff;
}

.button--white:hover {
  background-color: #f1f3f5;
  transition: background-color .15s;
}

.button--red {
  color: #f8f9fa;
  background-color: #fa5252;
}

.button--red:hover,
.button--red:focus {
  background-color: #e03131;
  transition: background-color .15s;
}

.button--violet {
  color: #f8f9fa;
  background-color: #7950f2;
}

.button--violet:hover,
.button--violet:focus {
  background-color: #6741d9;
  transition: background-color .15s;
}

.copying {
  color: #4263eb;
}
</style>
