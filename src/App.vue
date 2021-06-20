<template>
  <Tiptap />
</template>

<script>
import Tiptap from './components/Tiptap.vue'

export default {
  name: 'App',
  components: {
    Tiptap
  }
}
</script>

<style lang="scss">
@import "src/editorcss/prosemirror.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.pagebreak {
  page-break-after: always;
}

</style>
