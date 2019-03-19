<template>
  <div id="login">
    <mu-container id="login-container">
      <p id="register-title">
        <mu-breadcrumbs>
          <mu-breadcrumbs-item :disabled="false" :to="hash.registerHash">{{$t('register')}}
          </mu-breadcrumbs-item>
          <mu-breadcrumbs-item :disabled="true">{{$t('login')}}
          </mu-breadcrumbs-item>
        </mu-breadcrumbs>
      </p>
      <mu-form ref="form" :model="user" class="mu-form">
        <mu-form-item :label="$t('username')" prop="username" :rules="usernameRules">
          <mu-text-field v-model="user.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('password')" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="user.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="shouldRemember">
          <mu-checkbox :label="$t('should_remember_username')" v-model="user.shouldRemember"></mu-checkbox>
        </mu-form-item>
        <mu-form-item id="button">
          <mu-button color="primary" @click="submit">{{$t('submit')}}</mu-button>
          <mu-button @click="clear">{{$t('reset')}}</mu-button>
        </mu-form-item>
      </mu-form>
    </mu-container>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import hash from '@/router/hash'
import storageService from '@/services/storageService'

const initUser = {
  username: '',
  password: '',
  shouldRemember: true
}

export default {
  name: 'Login',
  data () {
    return {
      user: initUser,
      usernameRules: [
        { validate: (val) => !!val, message: this.$t('not_empty', [this.$t('username')])}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: this.$t('not_empty', [this.$t('password')])}
      ],
      hash
    }
  },
  computed: {
  },
  methods: {
    ...mapActions(['login']),
    async submit () {
      let valid = await this.$refs.form.validate()
      if (valid) {
        if (this.user.shouldRemember) {
          storageService.set('username', this.user.username)
        }
        let res = await this.login(this.user)
        if (res.ok) {
          this.$router.push({path: hash.chatHash})
        }
      }
    },
    clear () {
      debugger
      this.$refs.form.clear();
      this.user = initUser
    }
  },
}
</script>

<style lang="scss">
#login {
  background: white;
  width: 24rem;
  &-container {
    padding: 2rem;
    padding-top: 1rem;
  }
  #button {
    .mu-form-item-content {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
    }
  }
}
</style>
