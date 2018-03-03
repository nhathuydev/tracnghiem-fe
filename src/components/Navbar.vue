<template>
  <div class="page-header navbar navbar-fixed-top">
    <div class="page-header-inner ">
      <div class="page-logo">
        <div class="menu-toggler sidebar-toggler">
        </div>
      </div>
      <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>
      <div class="top-menu">
        <ul class="nav navbar-nav pull-right">
          <li class="dropdown dropdown-user">
            <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
              <span class="username username-hide-on-mobile"> {{user.info.name}} </span>
              <i class="fa fa-angle-down"></i>
            </a>
            <ul class="dropdown-menu dropdown-menu-default">
              <!-- <li>
                <router-link :to="{name: 'Profile'}">
                  <i class="icon-user"></i> My Profile </router-link>
              </li> -->
              <li class="divider"> </li>
              <li>
                <a>
                  <i class="fa fa-lock"></i> Lock Screen </a>
              </li>
              <li>
                <router-link @click.native="logout()" :to="{name: 'Login'}">
                  <i class="fa fa-sign-out"></i> Log Out
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
        aaa: ''
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      ...mapActions([
        'logout'
      ])
    }
  }
</script>
