<template>
  <div>
    <Pagebar :page-name="'Tag'" :sub-page-name="'List'"/>
    <div class="portlet light bordered portlet-body">
      <div class="table-toolbar">
        <div class="row">
          <div class="col-md-6">
            <router-link :to="{name: 'TagAdd'}" id="sample_editable_1_new" class="btn sbold green">
              <i class="fa fa-plus"></i>
            </router-link>
            <button class="btn sbold blue" @click="getTag()">
              <i class="fa fa-refresh"></i>
            </button>
          </div>
          <div class="col-md-6">
            <div class="btn-group pull-right">
              <label>
                Show
                <select v-on:change="onChangeSize" :value="tags.per_page" class="form-control input-sm input-xsmall input-inline">
                  <option v-for="option in pageSizeOptions" v-bind:value="option">{{option}}</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="dataTables_wrapper no-footer">
        <div class="table-scrollable table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th> # </th>
                <th> Name </th>
                <th> Description </th>
                <th class="text-right"> Actions </th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="item in tags.data">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.description}}</td>
              <td class="text-right">
                <div class="btn-group">
                  <router-link :to="{name: 'TagDetail', params: {id: item.id}}" type="button" class="btn green">
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <router-link :to="{name: 'TagEdit', params: {id: item.id}}" type="button" class="btn purple">
                    <i class="fa fa-edit"></i>
                  </router-link>
                </div>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 col-sm-5">
          <div class="dataTables_info" id="sample_1_info" role="status" aria-live="polite">
            Showing {{tags.from}} to {{tags.to}} of {{tags.total}} records
          </div>
        </div>
        <div class="col-md-7 col-sm-7" v-if="tags.total / parseInt(tags.per_page, 10) > 1">
          <div class="dataTables_paginate paging_bootstrap_full_number pull-right" id="sample_1_paginate">
            <ul class="pagination" style="visibility: visible;">
              <li class="prev">
                <a @click="tags.current_page !== 1 && updatePageTag(1)"title="First">
                  <i class="fa fa-angle-double-left"></i>
                </a>
              </li>
              <li class="prev">
                <a @click="tags.current_page > 1 && updatePageTag(tags.current_page-1)" title="Prev">
                  <i class="fa fa-angle-left"></i>
                </a>
              </li>
              <li v-for="n in tags.last_page"  :class="[tags.current_page === n ? 'active' : '']">
                <a v-if="(tags.current_page - 3 < n && tags.current_page + 3 > n) || n === 1 || n === 2 ||
                n === tags.last_page || n === (tags.last_page - 1)" @click.prevent="updatePageTag(n)">{{n}}</a>
              </li>
              <li class="next">
                <a @click="tags.current_page < tags.last_page && updatePageTag(tags.current_page+1)"  title="Next">
                  <i class="fa fa-angle-right"></i>
                </a>
              </li>
              <li class="next">
                <a @click="tags.current_page !== tags.last_page && updatePageTag(tags.last_page)" title="Last">
                  <i class="fa fa-angle-double-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data () {
      return {
        pageSizeOptions: [
          5,
          10,
          20,
          50,
          100
        ]
      }
    },
    created: function () {
      if (this.tags.current_page < 0) {
        this.updatePageTag(1)
      }
    },
    computed: mapGetters([
      'tags'
    ]),
    methods: {
      ...mapActions([
        'getTag',
        'updateSizeTag',
        'updatePageTag'
      ]),
      onChangeSize (event) {
        this.updateSizeTag(event.srcElement.value)
      }
    }
  }
</script>
