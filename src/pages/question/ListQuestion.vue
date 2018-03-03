<template>
  <div>
    <Pagebar :page-name="'Question'" :sub-page-name="'List'"/>
    <div class="portlet light bordered portlet-body">
      <div class="table-toolbar">
        <div class="row">
          <div class="col-md-6">
            <router-link :to="{name: 'QuestionAdd'}" id="sample_editable_1_new" class="btn sbold green">
              <i class="fa fa-plus"></i>
            </router-link>
            <button class="btn sbold blue" @click="getQuestion()">
              <i class="fa fa-refresh"></i>
            </button>
          </div>
          <div class="col-md-6">
            <div class="btn-group pull-right">
              <label>
                Show
                <select v-on:change="onChangeSize" :value="questions.per_page" class="form-control input-sm input-xsmall input-inline">
                  <option v-for="option in pageSizeOptions" v-bind:value="option">{{option}}</option>
                </select>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="dataTables_wrapper no-footer">
        <div class="table-scrollable table-responsive">
          <table class="table table-hover text-center">
            <thead>
              <tr>
                <th> # </th>
                <th style="text-align: center"> Content </th>
                <th style="text-align: center"> Answers </th>
                <th style="text-align: center"> Tags </th>
                <th style="text-align: center"> Image </th>
                <th style="text-align: center"> Actions </th>
              </tr>
            </thead>
            <tbody>
            <tr v-for="item in questions.data">
              <td>{{item.id}}</td>
              <td>{{item.content}}</td>
              <td>{{item.answers_count}}</td>
              <td>
                <router-link :key="tag.id" :to="{name: 'TagDetail', params: {id: tag.id}}" v-for="tag in item.tags" class="btn btn-sm badge badge-roundless">
                  <span>
                    {{tag.name}}
                  </span>
                </router-link>
              </td>
              <td><img v-if="item.extraContent" :src="item.extraContent" alt="item.content" class="img img-thumbnail" style="max-width: 150px"></td>
              <td>
                <div class="btn-group-vertical">
                  <router-link :to="{name: 'QuestionDetail', params: {id: item.id}}" type="button" class="btn purple">
                    <i class="fa fa-eye"></i>
                  </router-link>
                  <router-link :to="{name: 'QuestionEdit', params: {id: item.id}}" type="button" class="btn green">
                    <i class="fa fa-pencil"></i>
                  </router-link>
                  <button type="button" class="btn red" @click="deleteQuestion(item.id)">
                    <i class="fa fa-trash"></i>
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
            Showing {{questions.from}} to {{questions.to}} of {{questions.total}} records
          </div>
        </div>
        <div class="col-md-7 col-sm-7">
          <div v-if="questions.total / parseInt(questions.per_page, 10) > 1" class="dataTables_paginate paging_bootstrap_full_number pull-right" id="sample_1_paginate">
            <ul class="pagination" style="visibility: visible;">
              <li class="prev">
                <a @click="questions.current_page !== 1 && updatePageQuestion(1)"title="First">
                  <i class="fa fa-angle-double-left"></i>
                </a>
              </li>
              <li class="prev">
                <a @click="questions.current_page > 1 && updatePageQuestion(questions.current_page-1)" title="Prev">
                  <i class="fa fa-angle-left"></i>
                </a>
              </li>
              <li v-for="n in questions.last_page"  :class="[questions.current_page === n ? 'active' : '']">
                <a @click.prevent="updatePageQuestion(n)">{{n}}</a>
              </li>
              <li class="next">
                <a @click="questions.current_page < questions.last_page && updatePageQuestion(questions.current_page+1)"  title="Next">
                  <i class="fa fa-angle-right"></i>
                </a>
              </li>
              <li class="next">
                <a @click="questions.current_page !== questions.last_page && updatePageQuestion(questions.last_page)" title="Last">
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
      if (this.questions.current_page < 0) {
        this.updatePageQuestion(1)
      }
    },
    computed: mapGetters([
      'questions'
    ]),
    methods: {
      ...mapActions([
        'getQuestion',
        'updateSizeQuestion',
        'updatePageQuestion',
        'deleteQuestion',
        'publishQuestion'
      ]),
      onChangeSize (event) {
        this.updateSizeQuestion(event.srcElement.value)
      }
    }
  }
</script>
