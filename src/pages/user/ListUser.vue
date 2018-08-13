<template>
  <div>
    <Pagebar :page-name="'User'" :sub-page-name="'Profile'"/>

    <div class="portlet light bordered portlet-body">
      <div class="table-toolbar">
        <div class="row">
          <div class="col-md-6">
            <router-link :to="{name: 'UserAdd'}" id="sample_editable_1_new" class="btn sbold green">
              <i class="fa fa-plus"></i>
            </router-link>
            <button class="btn sbold blue" @click="getAccount()">
              <i class="fa fa-refresh"></i>
            </button>
          </div>
          <div class="col-md-6">
            <div class="btn-group pull-right">
              <label>
                Show
                <select v-on:change="onChangeSize" :value="accounts.per_page" class="form-control input-sm input-xsmall input-inline">
                  <option v-for="option in pageSizeOptions" v-bind:value="option">{{option}}</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="dataTables_wrapper no-footer">
        <div class="table-scrollable table-responsive">
          <table class="table">
            <thead>
            <tr>
              <th> # </th>
              <th> Name </th>
              <th> Email </th>
              <th> Coin </th>
              <th> Linked </th>
              <th class="text-right"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in accounts.data" :class="item.isBan ? 'bg-danger' : (item.isAdmin ? 'bg-info' : '')">
              <td>{{item.id}}</td>
              <td>{{item.name}}</td>
              <td><a href="#">{{item.email}}</a></td>
              <td>{{item.point}}</td>
              <td>{{renderProviderText(item.providers)}}</td>
              <td class="text-right">
                <div class="btn-group btn-group-solid">
                  <router-link :to="{name: 'UserDetail', params: {id: item.id}}" type="button" class="btn green">
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <button v-if="uid === 1" type="button" class="btn red" @click="confirmBanUser({uid: item.id, isBan: !item.isBan})">
                    <i class="fa fa-ban"></i>
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
            Showing {{accounts.from}} to {{accounts.to}} of {{accounts.total}} records
          </div>
        </div>
        <div v-if="accounts.total / parseInt(accounts.per_page, 10) > 1" class="col-md-7 col-sm-7">
          <div class="dataTables_paginate paging_bootstrap_full_number pull-right" id="sample_1_paginate">
            <ul class="pagination" style="visibility: visible;">
              <li class="prev">
                <a @click="accounts.current_page !== 1 && updatePageAccount(1)"title="First">
                  <i class="fa fa-angle-double-left"></i>
                </a>
              </li>
              <li class="prev">
                <a @click="accounts.current_page > 1 && updatePageAccount(accounts.current_page-1)" title="Prev">
                  <i class="fa fa-angle-left"></i>
                </a>
              </li>
              <li v-for="n in accounts.last_page"  :class="[accounts.current_page === n ? 'active' : '']">
                <a @click.prevent="updatePageAccount(n)">{{n}}</a>
              </li>
              <li class="next">
                <a @click="accounts.current_page < accounts.last_page && updatePageAccount(accounts.current_page+1)"  title="Next">
                  <i class="fa fa-angle-right"></i>
                </a>
              </li>
              <li class="next">
                <a @click="accounts.current_page !== accounts.last_page && updatePageAccount(accounts.last_page)" title="Last">
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
      this.updatePageAccount(1)
      if (this.accounts.current_page < 0) {
        this.updatePageAccount(1)
      }
    },
    computed: mapGetters([
      'accounts',
      'uid'
    ]),
    methods: {
      ...mapActions([
        'getAccount',
        'updateSizeAccount',
        'updatePageAccount',
        'banAccount'
      ]),
      onChangeSize (event) {
        this.updateSizeAccount(event.srcElement.value)
      },
      renderProviderText: function (providers) {
        let result = ''
        for (var i = 0; i < providers.length; i++) {
          result += `${providers[i].name}, `
        }
        return result.slice(0, -2)
      },
      confirmBanUser (payload) {
        if (confirm('Xác nhận thao tác')) {
          this.banAccount(payload)
        }
      }
    }
  }
</script>
