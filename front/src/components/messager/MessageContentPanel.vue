<template>
  <div id="message-content-panel">
    <div v-for="(message, index) in curMessages" :key="index">
      <TextMessage v-bind="message" v-if="message.type == 'text'" :self="isSelf(message)"/>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import TextMessage from '@/components/messageItem/TextMessage'
import AudioMessage from '@/components/messageItem/AudioMessage'
import ImageMessage from '@/components/messageItem/ImageMessage'

export default {
  name: 'MessageContentPanel',
  computed: {
    ...mapGetters(['messages', 'curFriend', 'curMessages', 'userInfo'])
  },
  methods: {
    isSelf(message) {
      if (message.sender == this.userInfo.userId) return true
      return false
    }
  },
  components: {
    TextMessage,
    AudioMessage,
    ImageMessage
  }
}
</script>

<style lang="scss">
#message-content-panel {
  background: white;
  width: 100%;
  height:60%;
  overflow-y: auto;
}
</style>