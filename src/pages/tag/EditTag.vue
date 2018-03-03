<template>
  <div>
    <Pagebar :page-name="'Tag'" :sub-page-name="'Edit'"/>

    <div class="portlet light bordered">
      <div class="portlet-title">
        <div class="caption font-red-sunglo">
          <span class="caption-subject bold uppercase"># {{this.$route.params.id}}</span>
        </div>
      </div>
      <div class="portlet-body form">
        <form role="form" @submit.prevent="submit">
          <div class="form-body">
            <div :class="{'form-group': true, 'has-error': errors.has('name')}">
              <label class="control-label">Name</label>
              <div class="input-icon right">
                <i v-if="errors.has('name')" class="fa fa-exclamation tooltips" data-original-title="please enter name" data-container="body"></i>
                <input
                  v-model="name"
                  name="name"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  placeholder="Enter name of tag">
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
          <div class="form-actions">
            <button type="submit" class="btn blue">Submit</button>
            <button @click.prevent="$router.go(-1)" type="button" class="btn default">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { detailTag, updateTag } from '@/api'
export default {
  data: () => {
    return {
      name: null,
      description: null
    }
  },
  created () {
    const id = this.$route.params.id
    detailTag(id).then(data => {
      this.name = data.data.name
      this.description = data.data.description
    })
  },
  methods: {
    submit: function () {
      updateTag({
        id: this.$route.params.id,
        name: this.name,
        description: this.description
      })
    }
  }
}
</script>
