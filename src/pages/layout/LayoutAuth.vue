<template>
  <div class="login">
    <div class="menu-toggler sidebar-toggler"></div>
    <div class="logo">
      <!--<a href="index.html">-->
        <!--<img src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/16114598_784143988400871_799956445756955616_n.jpg?oh=3e31f76511e8968f4f5cda8caafea44d&oe=5A7ECFD4" alt="" /> </a>-->
    </div>
    <div class="content">
      <router-view></router-view>
      <notifications group="notification" />
    </div>
    <div class="copyright"> 2014 © Metronic. Admin Dashboard Template. </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    name: 'auth'
  }
</script>
