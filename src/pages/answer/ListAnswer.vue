<template>
  <div>
    <Pagebar :page-name="'Answer'" :sub-page-name="'List'"/>
    <div class="portlet light bordered portlet-body">
      <div class="table-toolbar">
        <div class="row">
          <div class="col-md-6">
            <router-link :to="{name: 'AnswerAdd'}" id="sample_editable_1_new" class="btn sbold green">
              <i class="fa fa-plus"></i>
            </router-link>
            <button class="btn sbold blue" @click="getAnswer()">
              <i class="fa fa-refresh"></i>
            </button>
          </div>
          <div class="col-md-6">
            <div class="btn-group pull-right">
              <label>
                Show
                <select v-on:change="onChangeSize" :value="answers.per_page" class="form-control input-sm input-xsmall input-inline">
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
                <th> Content </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="item in answers.data">
              <td>{{item.id}}</td>
              <td>{{item.content}}</td>
              <td class="">
                <div class="btn-group btn-group-solid pull-right">
                  <router-link :to="{name: 'AnswerDetail', params: {id: item.id}}" type="button" class="btn green">
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <router-link :to="{name: 'AnswerEdit', params: {id: item.id}}" type="button" class="btn purple">
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
            Showing {{answers.from}} to {{answers.to}} of {{answers.total}} records
          </div>
        </div>
        <div class="col-md-7 col-sm-7">
          <div v-if="answers.total / parseInt(answers.per_page, 10) > 1" class="dataTables_paginate paging_bootstrap_full_number pull-right" id="sample_1_paginate">
            <ul class="pagination" style="visibility: visible;">
              <li class="prev">
                <a @click="answers.current_page !== 1 && updatePageAnswer(1)"title="First">
                  <i class="fa fa-angle-double-left"></i>
                </a>
              </li>
              <li class="prev">
                <a @click="answers.current_page > 1 && updatePageAnswer(answers.current_page-1)" title="Prev">
                  <i class="fa fa-angle-left"></i>
                </a>
              </li>
              <li v-for="n in answers.last_page"  :class="[answers.current_page === n ? 'active' : '']">
                <a @click.prevent="updatePageAnswer(n)">{{n}}</a>
              </li>
              <li class="next">
                <a @click="answers.current_page < answers.last_page && updatePageAnswer(answers.current_page+1)"  title="Next">
                  <i class="fa fa-angle-right"></i>
                </a>
              </li>
              <li class="next">
                <a @click="answers.current_page !== answers.last_page && updatePageAnswer(answers.last_page)" title="Last">
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
      if (this.answers.current_page < 0) {
        this.updatePageAnswer(1)
      }
    },
    computed: mapGetters([
      'answers'
    ]),
    methods: {
      ...mapActions([
        'getAnswer',
        'updateSizeAnswer',
        'updatePageAnswer'
      ]),
      onChangeSize (event) {
        this.updateSizeAnswer(event.srcElement.value)
      }
    }
  }
</script>
