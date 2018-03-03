<template>
  <div>
    <Pagebar :page-name="'Answer'" :sub-page-name="'Add'"/>

    <form role="form" @submit.prevent="submit">
        <div class="form-body col-md-6">
          <div :class="{'form-group': true, 'has-error': errors.has('content')}">
            <label class="control-label">Content</label>
            <div class="input-icon right">
              <i v-if="errors.has('content')" class="fa fa-exclamation tooltips" data-original-title="please enter answer" data-container="body"></i>
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
        <div class="form-actions col-md-12">
          <button type="submit" class="btn blue">Submit</button>
          <button @click.prevent="$router.go(-1)" class="btn default">Cancel</button>
        </div>
      </form>
  </div>
</template>
<script>
  import {createAnswer} from '@/api'
  export default {
    data: () => {
      return {
        content: null
      }
    },
    methods: {
      submit: function () {
        createAnswer({
          content: this.content
        }).then(() => {
          this.content = null
//          this.errors.clear()
        })
      }
    }
  }
</script>
