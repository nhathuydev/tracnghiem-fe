<template>
  <div>
    <Pagebar :page-name="'Collection'" :sub-page-name="'Add'"/>

    <form role="form" @submit.prevent="submit">
      <div class="form-body col-md-6">
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
              placeholder="Enter collection's name">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('description')}">
          <label class="control-label">Description</label>
          <div class="input-icon right">
            <i v-if="errors.has('description')" class="fa fa-exclamation tooltips" data-original-title="please enter description" data-container="body"></i>
            <textarea
              v-model="description"
              name="description"
              type="text"
              class="form-control"
              placeholder="Enter collection's description">
            </textarea>
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('time')}">
          <label class="control-label">Duration (seconds)</label>
          <div class="input-icon right">
            <i v-if="errors.has('time')" class="fa fa-exclamation tooltips" data-original-title="please enter duration" data-container="body"></i>
            <input
              v-model="time"
              name="time"
              v-validate="'required'"
              type="number"
              class="form-control"
              placeholder="Enter collection's duration">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': false}">
          <label class="control-label">Tags</label>
          <multiselect
            v-model="tags_selected"
            tag-placeholder="Add this as new tag"
            placeholder="Search or add a tag"
            label="name"
            track-by="id"
            :options="tag_options"
            :multiple="true"
            :taggable="true"
            @tag="addTag"
            @search-change="searchTag"
          >
          </multiselect>
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
  import {createCollection, searchTag} from '@/api'
  export default {
    data: () => {
      return {
        name: null,
        description: null,
        time: null,
        image: null,
        tags: [],
        tag_options: [],
        tags_selected: []
      }
    },
    watch: {
      tags_selected: function (value) {
        const tagsTmp = []
        for (let i = 0; i < value.length; i++) {
          if (value[i].id > 0) {
            tagsTmp.push(value[i].id)
          } else {
            tagsTmp.push(value[i].name)
          }
        }
        this.tags = tagsTmp
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
        createCollection({
          name: this.name,
          description: this.description,
          time: this.time,
          image: this.image,
          tags: this.tags,
          answers: this.answer_ids
        }).then(response => {
          const {data: {id}} = response
          this.$router.push({name: 'CollectionDetail', params: {id}})
        })
      },
      removeImage: function () {
        this.image = ''
      },
      addTag (newTag) {
        const tag = {
          name: newTag,
          id: -Math.floor((Math.random() * 10000000))
        }
        this.tag_options.push(tag)
        this.tags_selected.push(tag)
      },
      searchTag (query) {
        searchTag({keyword: query})
          .then(data => {
            this.tag_options = data.data.data
          })
      }
    }
  }
</script>
