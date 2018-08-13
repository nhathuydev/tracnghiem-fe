<template>
  <div>
    <Pagebar :page-name="'Collection'" :sub-page-name="'Edit'"/>
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
              placeholder="Enter collection's description"></textarea>
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('time')}">
          <label class="control-label">Duration (minutes)</label>
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

        <div :class="{'form-group': true, 'has-error': errors.has('point')}">
          <label class="control-label">Coin</label>
          <div class="input-icon right">
            <i v-if="errors.has('point')" class="fa fa-exclamation tooltips" data-original-title="please enter coin" data-container="body"></i>
            <input
              v-model="point"
              name="point"
              v-validate="'required'"
              type="number"
              class="form-control"
              placeholder="Enter collection's coin">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('turn')}">
          <label class="control-label">Turn</label>
          <div class="input-icon right">
            <i v-if="errors.has('turn')" class="fa fa-exclamation tooltips" data-original-title="please enter turn" data-container="body"></i>
            <input
              v-model="turn"
              name="turn"
              v-validate="'required'"
              type="number"
              class="form-control"
              placeholder="Enter collection's turn">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('point_ladder')}">
          <label class="control-label">Point ladder</label>
          <div class="input-icon right">
            <i v-if="errors.has('point_ladder')" class="fa fa-exclamation tooltips" data-original-title="please enter point ladder" data-container="body"></i>
            <input
              v-model="point_ladder"
              name="point_ladder"
              type="number"
              class="form-control"
              placeholder="Enter collection's point ladder">
          </div>
        </div>

        <div :class="{'form-group': true, 'has-error': errors.has('random_question_count')}">
          <label class="control-label">Number of questions</label>
          <div class="input-icon right">
            <i v-if="errors.has('random_question_count')" class="fa fa-exclamation tooltips" data-original-title="please enter a number" data-container="body"></i>
            <input
              v-model="random_question_count"
              name="random_question_count"
              type="number"
              class="form-control"
              placeholder="Enter collection's number of questions"
            >
          </div>
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
import { detailCollection, updateCollection } from '@/api'
export default {
  data: () => {
    return {
      name: null,
      description: null,
      time: null,
      image: null,
      point: 0,
      turn: 0,
      initImage: null,
      point_ladder: null,
      random_question_count: null
    }
  },
  created () {
    const id = this.$route.params.id
    detailCollection(id).then(data => {
      const d = data.data
      this.name = d.name
      this.description = d.description
      this.time = d.time / 60
      this.point_ladder = d.point_ladder
      this.random_question_count = d.random_question_count
      this.image = d.image
      this.point = d.point
      this.turn = d.turn
      this.initImage = d.image
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
      updateCollection({
        id: this.$route.params.id,
        name: this.name,
        description: this.description,
        random_question_count: this.random_question_count,
        point_ladder: this.point_ladder,
        time: this.time * 60,
        point: this.point,
        turn: this.turn,
        image: this.image === this.initImage ? null : this.image
      })
    },
    removeImage: function () {
      // this.image = ''
    }
  }
}
</script>
