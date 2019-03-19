<template>
  <div id="messager-body">
    <ChatsView/>
    <MessageView/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import ChatsView from './ChatsView'
import MessageView from './MessageView'
export default {
  name: 'MessagerBody',

  methods: {
    ...mapActions(['initFriends'])
  },
  beforeMount() {
    this.initFriends()
  },
  components: {
    ChatsView,
    MessageView
  }
}
</script>

<style lang="scss">
#messager-body {
  height: calc(100% - 64px);
  background: white;
  display: flex;
  flex-direction: row;
}
</style>