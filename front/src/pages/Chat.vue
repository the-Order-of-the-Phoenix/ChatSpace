<template>
  <div id="chat">
    <Messager></Messager>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import hash from '@/router/hash'

import Messager from '@/components/messager/Messager'

export default {
  name: 'Chat',
  computed: {
    ...mapGetters(['hasLogin'])
  },
  beforeMount() {
    if (!this.hasLogin) {
      this.$router.push(hash.loginHash)
    }
  },
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
