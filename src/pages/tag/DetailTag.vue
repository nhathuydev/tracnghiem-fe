<template>
  <div>
    <Pagebar :page-name="'Tag'" :sub-page-name="'Detail'"/>
    <div class="portlet light bordered" v-if="tag">
      <div class="row">
        <div class="col-xs-8">
          <h3>Tags Details:</h3>
          <ul class="list-unstyled">
            <li>
              <strong>Id #:</strong> {{tag.id}}
            </li>
            <li>
              <strong>Name:</strong> {{tag.name}}
            </li>
            <li>
              <strong>Description:</strong> {{tag.description}}
            </li>
            <li>
              <strong>Created at:</strong> {{moment.unix(tag.created_at).fromNow()}} ({{moment.unix(tag.created_at).format('DD-MM-YYYY')}})
            </li>
          </ul>
        </div>
        <div class="col-xs-4">
          <router-link :to="{name: 'TagEdit', params: {id: tag.id}}"  class="btn btn-icon-only green pull-right">
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
  import {detailTag} from '@/api'
  export default {
    data: () => {
      return {
        tag: null
      }
    },
    created: function () {
      detailTag(this.$route.params.id)
        .then(result => {
          this.tag = result.data
        })
    }
  }
</script>
