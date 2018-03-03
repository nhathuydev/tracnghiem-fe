<template>
  <div>
    <Pagebar pageName="Profile"/>
    <div class="portlet bordered light">
      <div class="row">
        <div class="col-md-12">
          <!-- BEGIN PROFILE SIDEBAR -->
          <div class="profile-sidebar">
            <!-- PORTLET MAIN -->
            <div class="portlet light profile-sidebar-portlet ">
              <!-- SIDEBAR USERPIC -->
              <div class="profile-userpic">
                <img src="https://scontent.fsgn4-1.fna.fbcdn.net/v/t1.0-9/16114598_784143988400871_799956445756955616_n.jpg?oh=3b42b0b1e2c47be28a28769355d9d89a&oe=5AA65CD4" class="img-responsive" alt=""> </div>
              <!-- END SIDEBAR USERPIC -->
              <!-- SIDEBAR USER TITLE -->
              <div class="profile-usertitle">
                <div class="profile-usertitle-name"> {{info.name}} </div>
                <div class="profile-usertitle-job"> Admin </div>
              </div>
              <!-- END SIDEBAR USER TITLE -->
              <!-- SIDEBAR BUTTONS -->
              <div class="profile-userbuttons">
                <button type="button" class="btn btn-circle green btn-sm">Follow</button>
                <button type="button" class="btn btn-circle red btn-sm">Message</button>
              </div>
              <!-- END SIDEBAR BUTTONS -->
              <!-- SIDEBAR MENU -->
              <div class="profile-usermenu">
                <ul class="nav">
                  <li class="active">
                    <a href="page_user_profile_1.html">
                      <i class="icon-home"></i> Overview </a>
                  </li>
                  <li>
                    <a href="page_user_profile_1_account.html">
                      <i class="icon-settings"></i> Account Settings </a>
                  </li>
                  <li>
                    <a href="page_user_profile_1_help.html">
                      <i class="icon-info"></i> Help </a>
                  </li>
                </ul>
              </div>
              <!-- END MENU -->
            </div>
            <!-- END PORTLET MAIN -->
          </div>
          <!-- END BEGIN PROFILE SIDEBAR -->

        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {Pagebar} from '@/components'
  export default {
    name: 'dashboard',
    data () {
      return {
        msg: 'Welcome to Dashboard!!!'
      }
    },
    components: {
      Pagebar
    },
    computed: {
      ...mapGetters(['info'])
    }
  }
</script>
