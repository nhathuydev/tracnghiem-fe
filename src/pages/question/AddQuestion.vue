<template>
  <div>
    <Pagebar :page-name="'Question'" :sub-page-name="'Add'"/>

    <form role="form" @submit.prevent="submit">
      <div class="form-body col-md-6">
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
              placeholder="Enter question's content">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('explain')}">
          <label class="control-label">Explain</label>
          <div class="input-icon right">
            <i v-if="errors.has('explain')" class="fa fa-exclamation tooltips" data-original-title="please enter explain" data-container="body"></i>
            <input
              v-model="explain"
              name="explain"
              type="text"
              class="form-control"
              placeholder="Enter question's explaination">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': false}">
          <label class="control-label">Tags</label>
          <v-select
            :options="tags"
            :on-search="getTag"
            :on-change="onChangeTag"
            label="name"
            :multiple="true"
            placeholder="Type to search tags"
          />
        </div>

        <div id="answers" :class="{'form-group': true, 'has-error': false}">
          <label class="control-label">Answers</label>
          <button @click.prevent="addAnswer" class="btn btn-sm btn-circle pull-right"><i class="fa fa-plus"></i></button>
          <v-select
            v-for="n in answer_ids"
            :key="n"
            :options="answers"
            :on-search="getAnswer"
            :on-change="onChangeAnswer"
            label="content"
            placeholder="Type to search answers"
            style="margin-top: 16px"
          />
        </div>

      </div>
      <div class="form-body col-md-6">
        <img class="img img-responsive img-thumbnail" style="max-height: 200px" :src="image ? image : 'http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image'" alt="">
        <div style="margin-top: 8px">
            <span class="btn default btn-file">
                <span v-if="!image"> Select image </span>
                <span v-if="image"> Change </span>
              <!--<input type="hidden" value="" name="...">-->
                  <input type="file" v-validate="'required'" name="image" @change="onFileChange">
                </span>
          <a @click="removeImage" class="btn red"> Remove </a>
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
  import {createQuestion, searchAnswer, searchTag} from '@/api'
  export default {
    data: () => {
      return {
        content: null,
        explain: null,
        image: null,
        category_id: null,
        tag_ids: [],
        answer_ids: [
          -1
        ],
        answers: [],
        tags: []
      }
    },
    methods: {
      addAnswer () {
        this.answer_ids.push(-1)
      },
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        this.createImage(files[0])
      },
      createImage (file) {
        let reader = new FileReader()
        let vm = this

        reader.onload = (e) => {
          vm.image = e.target.result
        }
        reader.readAsDataURL(file)
      },
      submit: function () {
        createQuestion({
          content: this.content,
          explain: this.explain,
          image: this.image,
          tags: this.tag_ids,
          answers: this.answer_ids
        })
      },
      removeImage: function () {
        this.image = ''
      },
      onChangeAnswer: function (v) {
        this.answer_ids = [...this.answer_ids, v.id]
      },
      onChangeTag: function (v) {
        const temp = []
        v.map(item => {
          temp.push(item.id)
        })
        this.tag_ids = temp
      },
      getAnswer: function (v, loading) {
        if (v) {
          loading(true)
          searchAnswer({keyword: v})
            .then(result => {
              console.log(result)
              this.answers = result.data.data
              loading(false)
            })
        }
      },
      getTag: function (v, loading) {
        if (v) {
          loading(true)
          searchTag({keyword: v})
            .then(result => {
              this.tags = result.data.data
              loading(false)
            })
            .catch(() => {
              loading(false)
            })
        }
      }
    }
  }
</script>
