<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import {Navbar, Footerr, Sidebar} from '@/components'
export default {
  data () {
    return {}
  },
  name: 'app',
  components: {
    Navbar,
    Footerr,
    Sidebar
  }
}
</script>
