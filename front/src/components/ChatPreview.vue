<template>
  <div :class="{'chat-preview':true, 'chat-preview__active': isActive}" @click="setCur" @contextmenu.prevent="showMenu">
    <img :src="avator" class="chat-preview_avator">
    <div class="chat-preview_middle">
      <span class="chat-preview_name">
        {{name}}
      </span>
      <span class="chat-preview_message">
        {{trim(message, 10)}}
      </span>
    </div>
    <div class="chat-preview_right">
      {{displayTime}}
    </div>
    <mu-menu cover placement="bottom-end" :open.sync="open">
      <mu-list slot="content" dense>
        <mu-list-item button @click="deleteFriend">
          <mu-list-item-title>删除好友</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-menu>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { trim } from '@/services/strUtil'

export default {
  name: 'ChatPreview',
  props: ['avator', 'name', 'message', 'time', 'isActive','id'],
  data () {
    return {
      trim,
      open: false
    }
  },
  computed: {
    displayTime: function () {
      let str = this.time || '今天'
      if (str.length > 10) str = str.substring(0, 10)
      return str
    }
  },
  methods: {
    ...mapActions(['setCurFriend', 'removeFriend']),
    setCur() {
      this.setCurFriend(this.id)
    },
    showMenu() {
      this.open = !this.open
    },
    async deleteFriend () {
      await this.removeFriend(this.id)
      this.open = false
    }
  },
}
</script>

<style lang="scss">
.chat-preview {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  height: 3.5rem;
  padding: .5rem;
  font-size: .5rem;
  cursor: pointer;
  position: relative;

  &__active {
    background-color: #ebebec;
  }

  &_avator {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }

  &_middle {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    justify-content: space-between;
    align-items: self-start;
    padding: 0 1rem;
  }

  &_name {
    font-size: .8rem;
  }

  &_message {
    color: #AAA;
  }

  &_right {
    position: absolution;
    right: 5;
    display: flex;
    flex-direction: column;
    width: 10rem;
    align-items: flex-end;
  }
}
</style>
