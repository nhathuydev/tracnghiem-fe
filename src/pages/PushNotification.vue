<template>
  <div>
    <Pagebar :page-name="'Toolkit'" :sub-page-name="'Push Notification'"/>

    <form role="form" @submit.prevent="submit">
      <div class="form-body col-md-6">
        <div :class="{'form-group': true, 'has-error': errors.has('type')}">
          <label class="control-label">Type</label>
          <div class="input-icon right">
            <i v-if="errors.has('type')" class="fa fa-exclamation tooltips" data-original-title="Select notification's type" data-container="body"></i>
            <select class="form-control" v-model="type" name="type" placeholder="Pick one">
              <option value="0">General</option>
            </select>
          </div>

          <div :class="{'form-group': true, 'has-error': errors.has('Title')}">
            <label class="control-label">Title</label>
            <div class="input-icon right">
              <i v-if="errors.has('title')" class="fa fa-exclamation tooltips" data-original-title="please enter notification's type" data-container="body"></i>
              <input
                v-model="title"
                name="title"
                v-validate="'required'"
                type="text"
                class="form-control"
                placeholder="Enter notification's title">
            </div>
          </div>

          <div :class="{'form-group': true, 'has-error': errors.has('message')}">
            <label class="control-label">Message</label>
            <div class="input-icon right">
              <i v-if="errors.has('message')" class="fa fa-exclamation tooltips" data-original-title="please enter notification's type" data-container="body"></i>
              <textarea
                v-model="message"
                name="message"
                v-validate="'required'"
                type="text"
                class="form-control"
                placeholder="Enter notification's message"/>
            </div>
          </div>

          <div :class="{'form-group': true, 'has-error': false}">
            <label class="control-label">To</label>
            <multiselect
              v-model="users"
              tag-placeholder="Add this user"
              placeholder="Search user by id or name"
              label="name"
              track-by="id"
              :options="user_options"
              :multiple="true"
              :taggable="false"
              @search-change="searchUser"
              :custom-label="customLabel"
            >
            </multiselect>
          </div>

          <div class="form-actions col-md-12">
            <button type="submit" class="btn blue">Submit</button>
            <button @click.prevent="$router.go(-1)" class="btn default">Cancel</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { Pagebar } from '@/components'
import {searchAccount, pushNotification} from '@/api'

export default {
  name: 'Push_Notifcation',
  data () {
    return {
      type: 0,
      title: null,
      message: null,
      data: null,
      users: [],
      user_options: []
    }
  },
  components: {
    Pagebar
  },
  methods: {
    searchUser (query) {
      searchAccount({query}).then(data => {
        this.user_options = data.data
      })
    },
    customLabel ({ name, email }) {
      return `${name} – ${email}`
    },
    submit () {
      const payload = {
        type: this.type,
        data: this.data,
        title: this.title,
        message: this.message
      }

      payload.users = this.users.map(u => u.id)
      console.log(payload)
      pushNotification(payload)
    }
  }
}
</script>
