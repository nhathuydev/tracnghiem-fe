<template>
  <div class="page-body text-center center-block">
    <h1>Locked</h1>
    <div class="lock-body">
        <img class="img img-responsive img-thumbnail" src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-1/p160x160/16114598_784143988400871_799956445756955616_n.jpg?oh=f78966b73fad20548ca631fd249948fd&oe=5A9CDEAE">
      <form class="lock-form" action="index.html" method="post">
        <h4 class="text-center">Huy Bui</h4>
        <div class="form-group">
          <input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="Password" name="password"> </div>
      </form>
    </div>
  </div>
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
      'login',
      'updateUser'
    ]),
    submit () {
      this.login({email: this.email, password: this.password})
        .then((d) => {
          console.log(d)
          this.updateUser()
          this.$router.push({name: 'Dashboard'})
        })
    }
  }
}
</script>
