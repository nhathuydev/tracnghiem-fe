<template>
  <div>
    <Pagebar :page-name="'Question'" :sub-page-name="'Edit'"/>
    <div class="portlet light bordered">
      <div class="portlet-title">
        <div class="caption font-red-sunglo">
          <span class="caption-subject bold uppercase"># {{this.$route.params.id}}</span>
        </div>
      </div>
      <div class="portlet-body form">
        <form role="form" @submit.prevent="submit">
          <div class="form-body">
            <div :class="{'form-group': true, 'has-error': errors.has('title')}">
              <label class="control-label">Title</label>
              <div class="input-icon right">
                <i v-if="errors.has('title')" class="fa fa-exclamation tooltips" data-original-title="please enter title" data-container="body"></i>
                <input
                  v-model="title"
                  name="title"
                  v-validate="'required'"
                  type="text"
                  class="form-control"
                  placeholder="Enter post's title">
              </div>
            </div>
          </div>
          <div>
            <img class="img img-responsive img-thumbnail" style="max-height: 200px" :src="image ? image : 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&amptext=no+image'" alt="">
            <div>
            <span class="btn default btn-file">
                <span v-if="!image"> Select image </span>
                <span v-if="image"> Change </span>
              <!--<input type="hidden" value="" name="...">-->
                  <input type="file" v-validate="'required'" name="image" @change="onFileChange">
                </span>
              <a @click="removeImage" class="btn red"> Remove </a>
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
import { detailQuestion } from '@/api'
export default {
  data: () => {
    return {
      title: null,
      image: null
    }
  },
  created () {
    const id = this.$route.params.id
    detailQuestion(id).then(data => {
      this.title = data.data.title
      this.image = `http://api.tracnghiem.dev/image${data.data.id}.jpg`
    })
  },
  methods: {
    onFileChange (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.createImage(files[0])
    },
    createImage (file) {
      let reader = new FileReader()
      let vm = this

      reader.onload = e => {
        vm.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    submit: function () {
      //        detailQuestion({
      //          title: this.title,
      //          image: this.image
      //        })
    },
    removeImage: function () {
      // this.image = ''
    }
  }
}
</script>
