<template>
  <div class="portlet light bordered">
    <div class="portlet-title">
      <div class="caption font-red-sunglo">
        <i class="icon-settings font-red-sunglo"></i>
        <span class="caption-subject bold uppercase"> Default Form</span>
      </div>
      <div class="actions">
        <div class="btn-group">
          <a class="btn btn-sm green dropdown-toggle" href="javascript:;" data-toggle="dropdown"> Actions
            <i class="fa fa-angle-down"></i>
          </a>
          <ul class="dropdown-menu pull-right">
            <li>
              <a href="javascript:;">
                <i class="fa fa-pencil"></i> Edit </a>
            </li>
            <li>
              <a href="javascript:;">
                <i class="fa fa-trash-o"></i> Delete </a>
            </li>
            <li>
              <a href="javascript:;">
                <i class="fa fa-ban"></i> Ban </a>
            </li>
            <li class="divider"> </li>
            <li>
              <a href="javascript:;"> Make admin </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="portlet-body form">
      <form role="form">
        <div class="form-body">
          <div v-for="item in data" class="form-group">
            <label>{{item.label}}</label>
            <div class="input-group">
              <span class="input-group-addon">
                  <i class="fa fa-envelope"></i>
              </span>
              <Inputt v-if="item.type === 'input'" placeholder="aaa"/>

            </div>
            </div>
        </div>
        <!--<div class="form-actions">-->
          <!--<button type="submit" class="btn blue">Submit</button>-->
          <!--<button type="button" class="btn default">Cancel</button>-->
        <!--</div>-->
      </form>
    </div>
  </div>
</template>
<script>
  import Inputt from './Input.vue'
  export default {
    data () {
      return {}
    },
    props: {
      data: {
        type: Array,
        required: true
      }
    },
    components: {
      Inputt
    }
  }
</script>
