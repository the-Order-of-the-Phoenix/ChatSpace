<template>
  <div id="chats-view">
    <div class="chats-container" v-if="chats && chats.length">
      <ChatPreview v-for="(chat, index) in chats" :key="index" v-bind="chat"/>
    </div>
    <div class="chats-container" v-if="!chats || !chats.length">
      <!--ChatsView v-for="(chat, index) in chats" :key="index"/-->
    </div>
  </div>
</template>

<script>
import ChatPreview from '@/components/ChatPreview'
import defaultAvator from '@/assets/default_avator.jpg'
const chat = (name, message, date) => ({
  name,message,date,
  avator: defaultAvator
})
const now = new Date()
const chats = []
for (var i = 0 ; i < 20 ; ++i) {
  chats.push(chat('aak1247', '早上好' + i, now))
}
export default {
  name: 'ChatsView',
  data () {
    return {
      chats
    }
  },
  components: {
    ChatPreview
  }
}
</script>

<style lang="scss">
#chats-view {
  height: 100%;
  background: white;
  width: 20rem;
  border-right: 1px solid #DDD;
}
</style>