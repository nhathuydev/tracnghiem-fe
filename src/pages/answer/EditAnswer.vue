<template>
  <div>
    <Pagebar :page-name="'Category'" :sub-page-name="'Edit'"/>
    <div class="portlet light bordered">
      <div class="portlet-title">
        <div class="caption font-red-sunglo">
          <span class="caption-subject bold uppercase"># {{this.$route.params.id}}</span>
        </div>
      </div>
      <div class="portlet-body form">
        <form role="form" @submit.prevent="submit">
          <div class="form-body">
            <div :class="{'form-group': true, 'has-error': errors.has('content')}">
              <label class="control-label">Content</label>
              <div class="input-icon right">
                <i v-if="errors.has('content')" class="fa fa-exclamation tooltips" data-original-title="please enter content" data-container="body"></i>
                <input
                  v-model="content"
                  name="content"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  placeholder="Enter content of answer">
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
import { detailAnswer, updateAnswer } from '@/api'
export default {
  data: () => {
    return {
      content: null
    }
  },
  created () {
    const id = this.$route.params.id
    detailAnswer(id).then(data => {
      this.content = data.data.content
    })
  },
  methods: {
    submit: function () {
      updateAnswer({
        content: this.content,
        id: this.$route.params.id
      })
    }
  }
}
</script>
