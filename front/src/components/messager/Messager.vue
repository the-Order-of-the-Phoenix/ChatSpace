<template>
  <div id="messager">
    <MessagerBar></MessagerBar>
    <MessagerBody/>
  </div>
</template>

<script>
import MessagerBar from '@/components/messager/MessagerBar'
import MessagerBody from '@/components/messager/MessagerBody'

export default {
  name: 'Messager',
  components: {
    MessagerBar,
    MessagerBody
  }
}
</script>

<style lang="scss">
#messager {
  width:40rem;
  height: calc( 100% - 4rem);
  overflow: hidden;
}
</style>
