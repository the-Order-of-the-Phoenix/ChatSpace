<template>
  <div :class="{'text-message': true, left: !self, right: self}">
    <img class="text-message_avator" :src="defaultAvator" v-if="!self"/>
    <div :class="{'text-message_body': true, left: !self, right: self}">
      <p class="text-message_date">{{date}}</p>
      <div class="text-message_message">
        <p>{{content}}</p>
      </div>
    </div>
    <img class="text-message_avator" :src="defaultAvator" v-if="self"/>
  </div>
</template>

<script>
import defaultAvator from '@/assets/default_avator.jpg'

export default {
  name: 'TextMessage',
  props: ['content', 'name', 'date', 'avator', 'self'],
  data() {
    return {
      defaultAvator
    }
  }
}
</script>

<style lang="scss">
.text-message {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 3rem;
  
  align-items: center;
  padding: .5rem;
  font-size: .5rem;
  &.left {
    justify-content: flex-start;
  }
  &.right {
    justify-content: flex-end;
  }

  &_avator {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
  &_body {
    display: flex;
    flex-direction: column;
    &.left {
      align-items: flex-start;
    }
    &.right {
      align-items: flex-end;
    }
    padding: 0 1rem;
    p {
      margin:0;
    }
  }
  &_date {
    font-size: .4rem;
    color: #AAA;

  }
  &_message{
    font-size: .6rem;
  }
}
</style>
