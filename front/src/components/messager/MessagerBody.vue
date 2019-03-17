<template>
  <div id="messager-body">
    <ChatsView/>
    <MessageView/>
  </div>
</template>

<script>
import ChatsView from './ChatsView'
import MessageView from './MessageView'
export default {
  name: 'MessagerBody',
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