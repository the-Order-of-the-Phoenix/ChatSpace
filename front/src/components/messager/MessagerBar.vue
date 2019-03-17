<template>
  <div id="messager-bar">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-menu cover>
        <mu-button icon>
          <mu-icon value="menu"></mu-icon>
        </mu-button>
        <mu-list slot="content">
          <mu-list-item button>
            <mu-list-item-title>{{$t('refresh')}}</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Send feedback</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Settings</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Help</mu-list-item-title>
          </mu-list-item>
          <mu-list-item button>
            <mu-list-item-title>Sign out</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
      Chat Space
      <mu-button flat slot="right"></mu-button>
    </mu-appbar>
  </div>
</template>

<script>
export default {
  name: 'MessagerBar'
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
}
</style>