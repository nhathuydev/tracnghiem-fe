<template>
  <div>
    <Pagebar :page-name="'Question'" :sub-page-name="'Detail'"/>
    <div class="portlet light bordered" v-if="question">
      <div class="row">
        <div class="col-xs-6">
          <ul class="list-unstyled">
            <li>
              <strong>Id #:</strong> {{question.id}}
            </li>
            <li>
              <strong>Content:</strong> {{question.content}}
            </li>
            <li v-if="question.explain">
              <strong>Explain:</strong> {{question.explain}}
            </li>
            <li v-if="question.tags">
              <strong>Tags:</strong>
              <span v-for="tag in question.tags">{{tag.name}} </span>
            </li>
            <li>
              <strong>Created at:</strong> {{moment.unix(question.created_at).fromNow()}}
            </li>
          </ul>
        </div>
        <div class="col-xs-4">
          <img v-if="question.extraContent" :src="question.extraContent"  class="img img-thumbnail pull-right" style="max-width: 200px"/>
        </div>
        <div class="col-xs-2">
          <div class="btn-group pull-right">
            <button @click="$router.go(-1)" class="btn btn-icon-only yellow">
              <i class="fa fa-arrow-left"></i>
            </button>
            <router-link :to="{name: 'QuestionEdit', id: question.id}" class="btn btn-icon-only green">
              <i class="fa fa-edit"></i>
            </router-link>
            <router-link :to="{name: 'QuestionList'}" class="btn btn-icon-only purple">
              <i class="fa fa-list-alt"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="portlet light bordered" v-if="question && question.answers">
      <table class="table">
        <thead>
        <tr>
          <th>#</th>
          <th>Content</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="answer in question.answers">
          <td>{{answer.id}}</td>
          <td>{{answer.content}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import { detailQuestion } from '@/api'
export default {
  data: () => {
    return {
      question: null
    }
  },
  created: function () {
    detailQuestion(this.$route.params.id).then(result => {
      this.question = result.data
    })
  }
}
</script>
