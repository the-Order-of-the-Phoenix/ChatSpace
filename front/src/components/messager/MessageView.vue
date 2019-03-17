<template>
  <div id="messager-view">
    <MessageContentPanel></MessageContentPanel>
    <InputPanel></InputPanel>
  </div>
</template>

<script>
import MessageContentPanel from './MessageContentPanel'
import InputPanel from './InputPanel'

export default {
  name: 'MessagerView',
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