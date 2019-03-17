<template>
  <div :class="{'chat-preview':true, 'chat-preview__active': isActive}">
    <img :src="avator" class="chat-preview_avator">
    <div class="chat-preview_middle">
      <span class="chat-preview_name">
        {{name}}
      </span>
      <span class="chat-preview_message">
        {{message}}
      </span>
    </div>
    <div class="chat-preview_right">
      {{displayTime}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatPreview',
  props: ['avator', 'name', 'message', 'time', 'isActive'],
  computed: {
    displayTime: function () {
      return this.time || '今天'
    }
  }
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
    display: flex;
    flex-direction: column;
    width: 2rem;
  }
}
</style>
