<template>
  <div id="message-content-panel">
    
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'MessageContentPanel',
  methods: {
    ...mapActions([])
  },
}
</script>

<style lang="scss">
#message-content-panel {
  background: white;
  width: 100%;
  height:60%;
}
</style>