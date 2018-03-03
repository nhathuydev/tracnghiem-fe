<template>
  <div>
    <Navbar />
    <div class="page-container">
      <Sidebar />
      <div class="page-content-wrapper">
        <div class="page-content">
          <notifications group="notification" position="bottom right"/>
          <div class="col-md-12 page-500">
            <div class=" number font-red"> 500 </div>
            <div class=" details">
              <h3>Oops! Something went wrong.</h3>
              <p> We are fixing it! Please come back in a while.
                <br> </p>
              <p>
                <router-link :to="{name: 'Dashboard'}" class="btn red btn-outline"> Return home </router-link>
                <br> </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footerr />
  </div>
</template>
<script>
  export default {
    data () {

    }
  }
</script>
