<template>
  <div id="app">
    <div v-loading="isLoading"></div>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import 'typeface-roboto'
import Event from '@/services/dispatch'

const event = Event()

export default {
  name: 'App',
  computed: {
    ...mapGetters(['isLoading'])
  },
  methods: {
    ...mapActions(['addLoading', 'removeLoading'])
  },
  beforeMount () {
    event.on('startLoad', () => {
      this.addLoading()
    })
    event.on('endLoad', () => {
      this.removeLoading()
    })
    event.on('error', (err) => {
      debugger
    })
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
}
#app {
  font-family: 'roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: #64b5f6;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
}
</style>
