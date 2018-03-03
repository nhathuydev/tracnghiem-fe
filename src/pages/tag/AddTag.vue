<template>
  <div>
    <Pagebar :page-name="'Tag'" :sub-page-name="'Add'"/>

    <form role="form" @submit.prevent="submit">
      <div class="form-body col-md-6">
        <div :class="{'form-group': true, 'has-error': errors.has('name')}">
          <label class="control-label">Name</label>
          <div class="input-icon right">
            <i v-if="errors.has('name')" class="fa fa-exclamation tooltips" data-original-title="please enter tag's name" data-container="body"></i>
            <input
              v-model="name"
              name="name"
              v-validate="'required'"
              type="text"
              class="form-control"
              placeholder="Enter tag's name">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('description')}">
          <label class="control-label">Description</label>
          <div class="input-icon right">
            <i v-if="errors.has('description')" class="fa fa-exclamation tooltips" data-original-title="please enter tag's description" data-container="body"></i>
            <textarea
              v-model="description"
              name="description"
              type="text"
              class="form-control"
              placeholder="Enter tag's description"></textarea>
          </div>
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
  import {createTag} from '@/api'
  export default {
    data: () => {
      return {
        name: null,
        description: null
      }
    },
    methods: {
      submit: function () {
        createTag({
          name: this.name,
          description: this.description
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
