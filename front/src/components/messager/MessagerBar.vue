<template>
  <div id="messager-bar">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-menu cover>
        <mu-button icon>
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        <mu-list slot="content" id="messager-bar_menu">
          <mu-list-item button @click="addFriend">
            <mu-list-item-title>{{$t('add_friend')}}</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="refresh">
            <mu-list-item-title>{{$t('refresh')}}</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button @click="doLogOut">
            <mu-list-item-title>{{$t('sign_out')}}</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
      Chat Space
      <mu-button flat slot="right"></mu-button>
    </mu-appbar>
  </div>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'

import { addFriendWithUsername } from '@/services/rest'
import hash from '@/router/hash'

export default {
  name: 'MessagerBar',
  methods: {
    ...mapActions(['logOut', 'initFriends']),
    async doLogOut () {
      let res = await this.logOut()
      if (res.ok) {
        this.$router.push({path: hash.loginHash})
      }
    },
    async refresh () {
      window.location.reload()
    },
    async addFriend () {
      let input = await this.$prompt('请输入好友用户名')
      let username = input.value
      let req = await addFriendWithUsername(username)
      let res = await req.json()
      if (req.ok) {
         this.initFriends()
      }
    }
  },
}
</script>

<style lang="scss">
#messager-bar {
  .mu-appbar-title {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
  }
  &_menu {
    width: 10rem;
  }
}
</style>