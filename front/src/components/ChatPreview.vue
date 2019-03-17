<template>
  <div class="chat-preview">
    <img :src="avator" class="chat-preview-avator">
    <p>
      <span>
        {{message}}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ChatPreview',
  props: ['avator', 'name', 'message', 'time']
}
</script>

<style lang="scss">
.chat-preview {
  &-avator {
    width: 1rem;
    height: 1rem;
  }
}
</style>
