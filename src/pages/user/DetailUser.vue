<template>
  <div>
    <Pagebar :page-name="'User'" :sub-page-name="'Profile'"/>

    <div class="portlet light bordered">
      <div class="portlet-body form">

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: () => {
      return {
        title: null,
        image: null
      }
    }
  }
</script>
