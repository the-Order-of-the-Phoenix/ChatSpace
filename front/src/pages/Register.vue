<template>
  <div id="register">
    <mu-container id="register-container">
      <p id="register-title">
        <mu-breadcrumbs>
          <mu-breadcrumbs-item :disabled="true">{{$t('register')}}
          </mu-breadcrumbs-item>
          <mu-breadcrumbs-item :disabled="false" :to="hash.loginHash">{{$t('login')}}
          </mu-breadcrumbs-item>
        </mu-breadcrumbs>
      </p>
      <mu-form ref="form" :model="user" class="mu-form">
        <mu-form-item :label="$t('username')" prop="username" :rules="usernameRules">
          <mu-text-field v-model="user.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('phone_number')" prop="phone" :rules="phoneRules">
          <mu-text-field v-model="user.phone" prop="phone"></mu-text-field>
        </mu-form-item>
        <mu-form-item :label="$t('password')" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="user.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox :label="$t('must_agree_protocol')" v-model="user.isAgree"></mu-checkbox>
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
import hash from '@/router/hash'

const initUser = {
  username: '',
  password: '',
  phone: '',
  isAgree: true
}

export default {
  name: 'Register',
  data () {
    return {
      user: initUser,
      usernameRules: [
        { validate: (val) => !!val, message: this.$t('not_empty', [this.$t('username')])},
        { validate: (val) => val.length >= 4, message: this.$t('too_short', [this.$t('username'), 4])},
        { validate: (val) => val.length <= 12, message: this.$t('too_short', [this.$t('username'), 12])}
      ],
      phoneRules: [
        { validate: val => !! val, message: this.$t('not_empty', [this.$t('phone_number')])},
        { validate: val => !isNaN(val), message: this.$t('must_be_number', [this.$t('phone_number')])},
      ],
      passwordRules: [
        { validate: (val) => !!val, message: this.$t('not_empty', [this.$t('username')])},
        { validate: (val) => val.length >= 4 && val.length <= 10, message: this.$t('too_short', [this.$t('password'), 4])},
        { validate: (val) => val.length <= 20, message: this.$t('too_long', [this.$t('password'), 20])}
      ],
      argeeRules: [{ validate: (val) => !!val, message: 'must_agree_protocol'}],
      hash
    }
  },
  methods: {
    async submit () {
      let form = await this.$refs.form.validate()
      console.log(form)
    },
    clear () {
      this.$refs.form.clear();
      this.user = initUser
    }
  }
}
</script>

<style lang="scss">
#register {
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
