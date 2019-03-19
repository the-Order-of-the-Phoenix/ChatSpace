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
import {mapGetters, mapActions} from 'vuex'
import { format } from '@/services/dateUtil'

import ChatPreview from '@/components/ChatPreview'
import defaultAvator from '@/assets/default_avator.jpg'
const chat = (name, message, date) => ({
  name,message,date,
  avator: defaultAvator
})
const now = new Date()
const chats = []
for (var i = 0 ; i < 5 ; ++i) {
  chats.push(chat('好友' + i, '早上好' + i, now))
}
chats[1].isActive = true
export default {
  name: 'ChatsView',
  data () {
    return {
      // chats
    }
  },
  computed: {
    ...mapGetters(['userInfo', 'curFriend', 'friends', 'messages']),
    chats () {
      // debugger
      let friendIds = Object.keys(this.friends)
      let chats = []
      for (let id of friendIds) {
        let chat = {}
        let friend = this.friends[id]
        let messages = this.messages[id]
        let time
        if (!messages || !messages.length) time = '更早'
        else {
          let lastMessage = messages[messages.length - 1]
          time = lastMessage.date || format(lastMessage.created_at)
          chat.message = lastMessage.content
        }
        if (id == this.curFriend) {
          chat.isActive = true
        }
        chat.name = friend.nickName || friend.name || friend.username
        chat.time = time
        chat.id = id
        chat.avator = friend.avator || defaultAvator
        chats.push(chat)
      }
      return chats
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
  overflow-y: auto;
}
</style>