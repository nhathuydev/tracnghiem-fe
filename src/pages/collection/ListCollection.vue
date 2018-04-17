<template>
  <div>
    <Pagebar :page-name="'Collection'" :sub-page-name="'List'"/>
    <div class="portlet light bordered portlet-body">
      <div class="table-toolbar">
        <div class="row">
          <div class="col-md-6">
            <button :to="{name: 'CollectionAdd'}" id="sample_editable_1_new" class="btn sbold green" @click="navigateToCollectionAdd()" v-shortkey="['a']" @shortkey="navigateToCollectionAdd()">
              <i class="fa fa-plus"></i>
            </button>
            <button class="btn sbold blue" @click="getCollection()" v-shortkey="['r']" @shortkey="getCollection()">
              <i class="fa fa-refresh"></i>
            </button>
          </div>
          <div class="col-md-6">
            <div class="btn-group pull-right">
              <label>
                Show
                <select v-on:change="onChangeSize" :value="collections.per_page" class="form-control input-sm input-xsmall input-inline">
                  <option v-for="option in pageSizeOptions" v-bind:value="option">{{option}}</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="dataTables_wrapper no-footer">
        <div class="table-scrollable">
          <table class="table table-hover text-center table-responsive">
            <thead>
              <tr>
                <th> # </th>
                <th style="text-align: center"> Name </th>
                <th style="text-align: center"> Description </th>
                <th style="text-align: center"> Duration</th>
                <th style="text-align: center"> Questions</th>
                <th style="text-align: center"> Status</th>
                <th style="text-align: center"> Image</th>
                <th style="text-align: center"> Actions </th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="item in collections.data">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td>{{item.description}}</td>
              <td>{{moment.duration(item.time, 'seconds').humanize()}}</td>
              <td>{{item.questions_count}}</td>
              <td>
                <span :class="['label label-sm label-mini', item.isPublish ? 'label-success' : 'label-warning']"> {{item.isPublish ? 'Published' : 'Draft'}} </span>
              </td>
              <td>
                <img v-if="item.image" :src="item.image" :alt="item.name" class="img img-thumbnail" style="max-width: 150px"/>
              </td>
              <td>
                <div class="btn-group-vertical">
                  <router-link :to="{name: 'CollectionDetail', params: {id: item.id}}" type="button" class="btn purple">
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <router-link :to="{name: 'CollectionEdit', params: {id: item.id}}" type="button" class="btn green">
                    <i class="fa fa-pencil"></i>
                  </router-link>
                  <!-- <button type="button" class="btn red" @click="deleteCollection(item.id)">
                    <i class="fa fa-trash"></i>
                  </button> -->
                  <button type="button" class="btn blue" @click="confirmPulishCollection({ids: [item.id], publish: !item.isPublish})">
                    <i :class="[{fa: true}, !item.isPublish ? 'fa fa-unlock' : 'fa fa-lock']"></i>
                  </button>
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
            Showing {{collections.from}} to {{collections.to}} of {{collections.total}} records
          </div>
        </div>
        <div class="col-md-7 col-sm-7">
          <div v-if="collections.total / parseInt(collections.per_page, 10) > 1" class="dataTables_paginate paging_bootstrap_full_number pull-right" id="sample_1_paginate">
            <ul class="pagination" style="visibility: visible;">
              <li class="prev">
                <a @click="collections.current_page !== 1 && updatePageCollection(1)"title="First">
                  <i class="fa fa-angle-double-left"></i>
                </a>
              </li>
              <li class="prev">
                <a @click="collections.current_page > 1 && updatePageCollection(collections.current_page-1)" title="Prev">
                  <i class="fa fa-angle-left"></i>
                </a>
              </li>
              <li v-for="n in collections.last_page"  :class="[collections.current_page === n ? 'active' : '']">
                <a v-if="(collections.current_page - 3 < n && collections.current_page + 3 > n) || n === 1 || n === 2 ||
                n === collections.last_page || n === (collections.last_page - 1)" @click.prevent="updatePageCollection(n)">{{n}}</a>
              </li>
              <li class="next">
                <a @click="collections.current_page < collections.last_page && updatePageCollection(collections.current_page+1)"  title="Next">
                  <i class="fa fa-angle-right"></i>
                </a>
              </li>
              <li class="next">
                <a @click="collections.current_page !== collections.last_page && updatePageCollection(collections.last_page)" title="Last">
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
      // if (this.collections.current_page < 0) {
      this.updatePageCollection(1)
      // }
    },
    computed: mapGetters([
      'collections'
    ]),
    methods: {
      ...mapActions([
        'getCollection',
        'updateSizeCollection',
        'updatePageCollection',
        'deleteCollection',
        'publishCollection'
      ]),
      onChangeSize (event) {
        this.updateSizeCollection(event.srcElement.value)
      },
      navigateToCollectionAdd () {
        this.$router.push({name: 'CollectionAdd'})
      },
      confirmPulishCollection (payload) {
        if (confirm('Xác nhận thao tác')) {
          this.publishCollection(payload)
        }
      }
    }
  }
</script>
