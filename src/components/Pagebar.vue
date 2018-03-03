<template>
  <div>
    <div class="page-bar">
      <ul class="page-breadcrumb">
        <li>
          <a href="#">{{pageName}}</a>
          <i class="fa fa-circle"></i>
        </li>
        <li>
          <span>{{subPageName}}</span>
        </li>
      </ul>
    </div>
    <h3></h3>
    <!--<h3 class="page-title"> Welcomeeee to my dashboard!!!-->
      <!--<small>blank page layout</small>-->
    <!--</h3>-->
  </div>
</template>
<script>
  export default {
    props: {
      pageName: {
        type: String,
        required: true
      },
      subPageName: {
        type: String
      }
    }
  }
</script>
