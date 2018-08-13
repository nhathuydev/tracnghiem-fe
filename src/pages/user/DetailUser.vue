<template>
  <div>
    <Pagebar :page-name="'User'" :sub-page-name="'Detail'"/>
    <div class="portlet light bordered" v-if="user">
      <div class="row">
        <div class="col-xs-8">
          <h3>User Details:</h3>
          <div class="row">
            <ul class="list-unstyled">
              <li>
                <strong>Id #:</strong> {{user.id}}
              </li>
              <li>
                <strong>Name:</strong> {{user.name}}
              </li>
              <li>
                <strong>Email:</strong> {{user.email}}
              </li>
              <li v-if="user.phone">
                <strong>Phone:</strong> {{user.phone}}
              </li>
              <li v-if="user.address">
                <strong>Address:</strong> {{user.address}}
              </li>
              <li v-if="user.bio">
                <strong>Address:</strong> {{user.bio}}
              </li>
              <li>
                <strong>Point:</strong> {{user.point}}
              </li>
              <li>
                <strong>Role:</strong> {{user.isAdmin ? 'Admin' : 'Normal User'}}
              </li>
              <li v-if="user.providers && user.providers.length > 0">
                <strong>Linked:</strong> {{renderProviderText(user.providers)}}</p>
              </li>
              <li>
                <strong>Created at:</strong> {{moment.unix(user.created_at).fromNow()}} ({{moment.unix(user.created_at).format('DD-MM-YYYY')}})
              </li>
            </ul>
          </div>

        </div>
        <div class="col-xs-4">
          <img v-if="user.avatar" :src="'http://toimanhme.com:3001/' + user.avatar" class="img img-thumbnail img-rounded pull-right" style="width: 200px; height: 200px;">
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
  import {detailUserById} from '@/api'
  export default {
    data: () => {
      return {
        user: null
      }
    },
    created: function () {
      detailUserById(this.$route.params.id)
        .then(result => {
          this.user = result.data
        })
    },
    methods: {
      renderProviderText: function (providers) {
        let result = ''
        for (var i = 0; i < providers.length; i++) {
          result += `${providers[i].name}, `
        }
        return result.slice(0, -2)
      }
    }
  }
</script>
