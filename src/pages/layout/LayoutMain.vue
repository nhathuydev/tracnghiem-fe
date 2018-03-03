<template>
  <div>
    <Navbar />
    <div class="page-container">
      <Sidebar />
      <div class="page-content-wrapper">
        <div class="page-content">
          <notifications group="notification" position="bottom right"/>
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footerr />
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    name: 'main'
  }
</script>
