<template>
  <div>
    <Pagebar :page-name="'User'" :sub-page-name="'Add'"/>

    <form role="form" @submit.prevent="submit">
      <div class="form-body col-md-6">
        <div :class="{'form-group': true, 'has-error': errors.has('name')}">
          <label class="control-label">Name</label>
          <div class="input-icon right">
            <i v-if="errors.has('name')" class="fa fa-exclamation tooltips" data-original-title="please enter user's name" data-container="body"></i>
            <input
              v-model="name"
              name="name"
              v-validate="'required'"
              type="text"
              class="form-control"
              placeholder="Enter user's name">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('email')}">
          <label class="control-label">Email</label>
          <div class="input-icon right">
            <i v-if="errors.has('email')" class="fa fa-exclamation tooltips" data-original-title="please enter user's email" data-container="body"></i>
            <input
              v-model="email"
              name="email"
              v-validate="'required'"
              type="text"
              class="form-control"
              placeholder="Enter user's email">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('password')}">
          <label class="control-label">Password</label>
          <div class="input-icon right">
            <i v-if="errors.has('password')" class="fa fa-exclamation tooltips" data-original-title="please enter tag's name" data-container="body"></i>
            <input
              v-model="password"
              name="password"
              v-validate="'required'"
              type="text"
              class="form-control"
              placeholder="Enter user's password">
          </div>
        </div>

        <div class="form-check" v-if="uid === 1">
          <input class="form-check-input" type="checkbox" v-model="isAdmin" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            Is Admin
          </label>
        </div>
      </div>
      <div class="form-actions col-md-12">
        <button type="submit" class="btn blue">Submit</button>
        <button @click.prevent="$router.go(-1)" class="btn default">Cancel</button>
      </div>
    </form>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  import {createUser} from '@/api'
  export default {
    data: () => {
      return {
        name: null,
        email: null,
        password: null,
        isAdmin: false
      }
    },
    computed: mapGetters([
      'uid'
    ]),
    methods: {
      submit: function () {
        createUser({
          name: this.name,
          email: this.email,
          password: this.password,
          isAdmin: this.isAdmin
        }).then(() => {
          this.name = null
          this.description = null
//          this.errors.clear()
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
</script>
