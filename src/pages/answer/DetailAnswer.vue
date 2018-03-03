<template>
  <div>
    <Pagebar :page-name="'Answer'" :sub-page-name="'Detail'"/>
    <div class="portlet light bordered" v-if="answer">
      <div class="row">
        <div class="col-xs-8">
          <h3>{{answer.name}}</h3>
          <ul class="list-unstyled">
            <li>
              <strong>Id #:</strong> {{answer.id}}
            </li>
            <li>
              <strong>Content:</strong> {{answer.content}}
            </li>
            <li>
              <strong>Created at:</strong> {{moment.unix(answer.created_at).fromNow()}} ({{moment.unix(answer.created_at).format('DD-MM-YYYY')}})
            </li>
          </ul>
        </div>
        <div class="col-xs-4">
          <router-link :to="{name: 'AnswerEdit', params: {id: answer.id}}" class="btn btn-icon-only green pull-right">
            <i class="fa fa-edit"></i>
          </router-link>
        </div>
      </div>
    </div>
    <div class="portlet light bordered" v-if="false">
      <table class="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts.data">
            <td>{{post.id}}</td>
            <td>{{post.title}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import {detailAnswer} from '@/api'
  export default {
    data: () => {
      return {
        answer: null,
        posts: []
      }
    },
    created: function () {
      detailAnswer(this.$route.params.id)
        .then(result => {
          this.answer = result.data
        })
    }
  }
</script>
