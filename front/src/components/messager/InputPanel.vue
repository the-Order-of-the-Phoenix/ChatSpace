X<template>
  <div id="input-panel">
    <mu-text-field v-model="message" 
    :placeholder="$t('message_not_more_than', [400])" 
    multi-line 
    :rows="6" 
    :max-length="400"
    full-width
    @keyup.enter.exact="doSendMessage"
    @keyup.enter.ctrl.exact="lineFeed"
    solo></mu-text-field><br/>
    
    <mu-button color="primary" ref="emojiButton" fab small @click="openEmoji=!openEmoji" id="input-panel_emotion">
      <mu-icon value="insert_emoticon"></mu-icon>
    </mu-button>
    <mu-button color="primary" id="input-panel_send" @click="doSendMessage">
      {{$t('send')}}
      <mu-icon right value="send"></mu-icon>
    </mu-button>

    <mu-popover cover :open.sync="openEmoji" :trigger="triggerEmoji">
      <VEmojiPicker :pack="pack" @select="selectEmoji" />
    </mu-popover>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import VEmojiPicker from 'v-emoji-picker'
import packData from 'v-emoji-picker/data/emojis.json'

export default {
  name: 'InputPanel',
  data () {
    return {
      message: '',
      triggerEmoji: null,
      openEmoji: false,
      pack: packData
    }
  },
  methods: {
    ...mapActions(['sendMessage']),
    doSendMessage () {
      let message = this.message.trim()
      if (message != '') {
        this.sendMessage(this.message)
        this.message = ''
      } else {
        this.$toast.message('不能发送空消息')
      }
    },
    lineFeed () {
      this.message += '\n'
    },
    selectEmoji (emoji) {
      this.message += emoji.emoji
      this.openEmoji = false
    }
  },
  mounted() {
    this.triggerEmoji = this.$refs.emojiButton.$el
  },
  components: {
    VEmojiPicker
  }
}
</script>

<style lang="scss">
#input-panel {
  background: white;
  width: 100%;
  height: 40%;
  border-top: 1px solid #CCC;
  position: relative;
  textarea {
    overflow: hidden;
  }
  &_emotion {
    position: absolute;
    right: 110px;
    bottom: 5px;
    height: 36px;
    width: 36px;
  }
  &_send {
    position: absolute;
    right: 5px;
    bottom: 5px;
  }
}
</style>