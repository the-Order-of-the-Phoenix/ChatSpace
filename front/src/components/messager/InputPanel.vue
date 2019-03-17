<template>
  <div id="input-panel">
    <mu-text-field v-model="message" 
    :placeholder="$t('message_not_more_than', [400])" 
    multi-line 
    :rows="6" 
    :max-length="400"
    full-width
    solo></mu-text-field><br/>
    <mu-button color="primary" id="input-panel_send">
      {{$t('send')}}
      <mu-icon right value="send"></mu-icon>
    </mu-button>
  </div>
</template>

<script>
export default {
  name: 'InputPanel',
  data () {
    return {
      message: ""
    }
  },
  methods: {
    sendMessage() {

    }
  },
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
  &_send {
    position: absolute;
    right: 5px;
    bottom: 5px;
  }
}
</style>