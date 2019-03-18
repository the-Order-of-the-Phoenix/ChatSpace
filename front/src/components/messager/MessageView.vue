<template>
  <div id="messager-view">
    <MessageContentPanel></MessageContentPanel>
    <InputPanel></InputPanel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Event from '@/services/dispatch'

import MessageContentPanel from './MessageContentPanel'
import InputPanel from './InputPanel'

export default {
  name: 'MessagerView',

  methods: {
    ...mapActions(['setCurFriend'])
  },

  mounted() {
    this.setCurFriend('test')
  },

  components: {
    MessageContentPanel,
    InputPanel
  }
}
</script>

<style lang="scss">
#messager-view {
  height: 100%;
  background: white;
  width: 100%;
}
</style>