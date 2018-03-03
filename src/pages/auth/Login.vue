<template>
  <form class="login-form" @submit.prevent="submit()">
    <h3 class="form-title font-green">Log In</h3>
    <div :class="{alert: true, 'alert-danger': true, 'display-hide': errors.items.length <= 0}">
      <button class="close" data-close="alert"></button>
      <span v-for="error in errors.all()"> {{error}} </span>
    </div>
    <div class="form-group">
      <label for="email">Email address:</label>
      <input type="email" class="form-control" id="email" v-model="email" name="email" v-validate="'required|email'">
    </div>
    <div class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" id="pwd" v-model="password" name="password" v-validate="'required'">
    </div>
    <div class="form-actions">
      <button type="submit" class="btn btn-block green uppercase">Login</button>
    </div>
  </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'login',
  head: {
    title: {
      inner: 'Login'
    }
  },
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    submit () {
      this.login({email: this.email, password: this.password})
    }
  }
}
</script>
