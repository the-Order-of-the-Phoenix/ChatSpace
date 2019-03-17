<template>
  <div id="chat">
    <Messager></Messager>
  </div>
</template>

<script>
import Messager from '@/components/messager/Messager'

export default {
  name: 'Chat',
  components: {
    Messager
  }
}
</script>

<style lang="scss">
#chat {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 2rem;
}
</style>
