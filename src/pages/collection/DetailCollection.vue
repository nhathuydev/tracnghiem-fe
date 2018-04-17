<template>
  <div>
    <Pagebar :page-name="'Collection'" :sub-page-name="'Detail'"/>
    <div class="portlet light bordered">
      <div class="portlet-title">
        <div class="caption">
          <i class="icon-social-dribbble font-purple-soft"></i>
          <span class="caption-subject font-purple-soft bold uppercase">{{collection && collection.name}}</span>
        </div>
        <div class="actions" v-if="collection">
          <button @click="$router.go(-1)" class="btn btn-circle btn-icon-only btn-default">
            <i class="fa fa-arrow-left"></i>
          </button>
          <button class="btn btn-circle btn-icon-only btn-default" v-shortkey="['e']" @shortkey="navigateToCollectionEdit(collection.id)" @click="navigateToCollectionEdit(collection.id)">
            <i class="fa fa-edit"></i>
          </button>
          <button class="btn btn-circle btn-icon-only btn-default" v-shortkey="['a']" @shortkey="navigateToCollectionList">
            <i class="fa fa-list-alt"></i>
          </button>
          <button @click="tooglePublish" class="btn btn-circle btn-icon-only btn-default" v-shortkey="['l']" @shortkey="tooglePublish">
            <i :class="[{'fa': true}, !collection.isPublish ? 'fa-lock' : 'fa fa-unlock']"></i>
          </button>
          <button @click="fetchData" class="btn btn-circle btn-icon-only btn-default" v-shortkey="['r']" @shortkey="fetchData">
            <i :class="['fa fa-refresh', loading ? 'fa-spin' : '']"></i>
          </button>
        </div>
      </div>
      <div class="portlet-body">
        <ul class="nav nav-tabs">
          <li class="active">
            <a href="#tab_1_1" data-toggle="tab"> Info </a>
          </li>
          <li>
            <a href="#tab_1_2" data-toggle="tab"> Questions
              <span class="badge badge-info">{{collection && collection.questions.length}}</span>
            </a>
          </li>
          <li>
            <a href="#tab_1_3" data-toggle="tab"> Add question </a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane fade active in" id="tab_1_1">
            <div class="row" v-if="collection">
              <div class="col-xs-8">
                <h3>{{collection.title}}</h3>
                <ul class="list-unstyled">
                  <li>
                    <strong>Id #:</strong> {{collection.id}}
                  </li>
                  <li>
                    <strong>Name:</strong> {{collection.name}}
                  </li>
                  <li>
                    <strong>Description:</strong> {{collection.description}}
                  </li>
                  <li>
                    <strong>Duration:</strong> {{moment.duration(collection.time, 'seconds').humanize()}}
                  </li>
                  <li>
                    <strong>Status:</strong> <span :class="[{'label': true} ,collection.isPublish ? 'badge badge-info' : ' badge badge-danger']">{{collection.isPublish ? 'Publish' : 'Draft'}}</span>
                  </li>
                  <li>
                    <strong>Number of questions: </strong> {{collection.random_question_count || 'all'}}
                  </li>
                  <li>
                    <strong>Point ladder: </strong> {{collection.point_ladder}}
                  </li>
                  <li v-if="collection.category">
                    <strong>Category:</strong> {{collection.category.name}}
                  </li>
                  <li>
                    <strong>Created at:</strong> {{moment.unix(collection.created_at).fromNow()}}
                  </li>
                </ul>
              </div>
              <div class="col-xs-4">
                <img v-if="collection.image" :src="collection.image"  class="img img-thumbnail pull-right" style="max-width: 200px"/>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="tab_1_2">
            <div class="mt-element-list">
              <div class="mt-list-container list-todo">
                <ul v-if="collection && collection.questions">
                  <li class="mt-list-item" v-for="(question, index) in collection.questions">
                    <div class="list-todo-item">
                      <a class="list-toggle-container collapsed" data-toggle="collapse" :href="'#task-' + index+1" aria-expanded="false">
                        <div class="list-toggle done">
                          <div class="list-toggle-title bold" style="color: black">Question {{index + 1}}: {{question.content}}</div>
                          <div v-if="false" class="badge badge-danger font-white bold">{{question.answers.length}}</div>
                        </div>
                      </a>
                      <div class="task-list panel-collapse collapse" :id="'task-' + index+1" aria-expanded="false" style="height: 2px;">
                        <div v-if="question.explain" style="padding: 24px 16px 0 16px"><p>Expain: {{question.explain}}</p></div>
                        <ul>
                          <li class="task-list-item done" v-for="answer in question.answers">
                            <div class="task-icon">
                              <a href="javascript:;">
                                <i class="fa fa-database"></i>
                              </a>
                            </div>
                            <div class="task-status">
                              <a class="done" href="javascript:;">
                                <i :class="['fa', answer.pivot.isCorrect ? 'fa-check' : 'fa-close']"></i>
                              </a>
                            </div>
                            <div class="task-content">
                              <p>{{answer.content}}</p>
                            </div>
                          </li>
                        </ul>
                        <div class="task-footer bg-grey">
                          <div class="row">
                            <!--<div class="col-xs-6">-->
                              <!--<router-link :to="{name: 'QuestionDetail', id: 40}" class="task-add">-->
                                <!--<i class="fa fa-eye"></i>-->
                              <!--</router-link>-->
                            <!--</div>-->
                            <div class="col-xs-6">
                              <button class="task-trash" @click="onRemoveQuestionOfCollection(question.id)">
                                <i class="fa fa-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="tab-pane fade" id="tab_1_3">
            <form role="form" @submit.prevent="createQuestion">
              <div class="form-body col-md-6" style="padding-bottom: 24px;">
                <div :class="{'form-group': true, 'has-error': errors.has('new_question.content')}">
                  <label class="control-label">Content</label>
                  <div class="input-icon right">
                    <i v-if="errors.has('new_question.content')" class="fa fa-exclamation tooltips" data-original-title="please enter content" data-container="body"></i>
                    <textarea
                      v-model="new_question.content"
                      name="new_question.content"
                      v-validate="'required'"
                      type="text"
                      class="form-control"
                      placeholder="Enter question's content"></textarea>
                  </div>
                </div>

                <div>
                  <span class="btn default btn-file">
                  <span v-if="!new_question.image"> Select image </span>
                  <span v-if="new_question.image"> Change </span>
                    <input type="file" v-validate="'required'" name="new_question.image" @change="onFileChange">
                  </span>
                  <a v-if="new_question.image" @click="removeImage" class="btn red"> Remove </a>
                </div>

                <div class="form-group checkbox">
                  <label style="margin-left: 24px">
                    <span><input v-model="new_question.multiChoice" type="checkbox"></span>
                    Multi answers?
                  </label>
                </div>

                <div :class="{'form-group': true, 'has-error': false}">
                  <label class="control-label">Answers</label>
                  <button @click.prevent="addAnswerCapacity" class="btn btn-sm btn-circle pull-right" v-shortkey="['d']" @shortkey="addAnswerCapacity()">
                    <i class="fa fa-plus"></i></button>

                  <div
                    v-for="(ans, index) in answers_selected"
                    :key="index"
                    class="input-group"
                    style="margin-top: 16px"
                  >
                    <span class="input-group-btn">
                        <button :class="['btn' , answers_selected[index].isCorrect ? 'green-jungle' : 'red']"
                          @click.prevent="toogleCorrectAnswer(index)">
                          <i :class="['fa' , answers_selected[index].isCorrect ? 'fa-check' : 'fa-times']"></i>
                          <input type="checkbox" v-model="answers_selected[index].isCorrect" hidden>
                        </button>
                        <input type="checkbox" v-model="answers_selected[index].isCorrect" hidden>
                    </span>
                    <input type="text" v-model="answers_selected[index].content" class="form-control">
                    <span class="input-group-btn">
                        <button class="btn blue" @click.prevent="removeAnswerItem(index)">
                          <i class="fa fa-trash"></i>
                        </button>
                    </span>

                  </div>
                </div>

                <div :class="{'form-group': true, 'has-error': errors.has('new_question.explain')}">
                  <label class="control-label">Explain</label>
                  <div class="input-icon right">
                    <i v-if="errors.has('new_question.explain')" class="fa fa-exclamation tooltips" data-original-title="please enter explain" data-container="body"></i>
                    <input
                      v-model="new_question.explain"
                      name="new_question.explain"
                      type="text"
                      class="form-control"
                      placeholder="Enter question's explaination">
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
              <div v-if="new_question.content" class="form-body col-md-6 portlet">
                <div class="well">
                  <h4>Preview</h4>
                  <div v-html="new_question.content" class="bold"/>
                  <ol style="margin-top: 16px;">
                    <li v-for="ans in answers_selected" v-if="ans.content" type="A">{{ans.content}}
                      <i :class="['fa', ans.isCorrect ? 'fa-check' : 'fa-ban']"></i>
                    </li>
                  </ol>
                  <p v-if="new_question.explain" class="font-blue-madison">Explain: {{new_question.explain}}</p>
                  <div style="margin-top: 24px;">
                    <span v-for="tag in tags_selected" class="label label-success" style="margin-right: 8px;"> #{{tag.name}} </span>
                  </div>
                  <img v-if="new_question.image" class="img img-responsive img-thumbnail" style="max-height: 200px" :src="new_question.image" alt="">

                </div>
              </div>
              <div class="form-actions col-md-12">
                <button type="submit" class="btn blue">Submit</button>
                <button @click.prevent="$router.go(-1)" class="btn default">Cancel</button>
              </div>
            </form>
          </div>
        </div>
        <div class="clearfix margin-bottom-20"> </div>
      </div>
    </div>
  </div>
</template>
<script>
import { detailCollection, createQuestionOfCollection, searchTag, searchAnswer, removeQuestionOfCollection } from '@/api'
import {mapActions} from 'vuex'

export default {
  data: () => {
    return {
      collection: null,
      loading: false,
      new_question: {
        content: null,
        explain: null,
        tags: [],
        answers: [],
        image: null,
        multiChoice: false
      },
      tag_options: [],
      tags_selected: [],
      answer_options: [],
      answers_selected: [
        {
          content: '',
          isCorrect: false
        },
        {
          content: '',
          isCorrect: false
        }
      ]
    }
  },
  created: function () {
    this.fetchData()
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
      this.new_question.tags = tagsTmp
    },
    'new_question.multiChoice': function (value) {
      if (!value) {
        let flagVigrin = true
        for (let i = 0; i < this.answers_selected.length; i++) {
          if (!flagVigrin) {
            this.answers_selected[i].isCorrect = false
          } else if (this.answers_selected[i].isCorrect && flagVigrin) {
            flagVigrin = false
          }
        }
      }
    },
    'new_question.content': function (value) {
      this.$nextTick(function () {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
      })
    }
  },
  methods: {
    ...mapActions([
      'publishCollection'
    ]),
    fetchData () {
      this.loading = true
      detailCollection(this.$route.params.id).then(result => {
        this.collection = result.data
        this.loading = false
      })
      .then(() => {
        window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub])
      })
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
        vm.new_question.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    removeImage: function () {
      this.new_question.image = ''
    },
    createQuestion () {
      const answerTmp = []
      const value = this.answers_selected
      for (let i = 0; i < value.length; i++) {
        answerTmp.push({
          id: value[i].content,
          isCorrect: value[i].isCorrect
        })
      }
      this.new_question.answers = answerTmp
      console.log(this.new_question)
      createQuestionOfCollection({
        collection_id: this.collection.id,
        ...this.new_question
      }).then(data => {
        this.fetchData()
        this.new_question = {
          content: null,
          explain: null,
          tags: [],
          answers: [],
          image: null,
          multiChoice: false
        }
        this.answers_selected = [
          {
            content: '',
            isCorrect: false
          },
          {
            content: '',
            isCorrect: false
          }
        ]
        this.tags_selected = []
      })
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
    },
    searchAnswer (query) {
      searchAnswer({keyword: query})
        .then(data => {
          this.answer_options = data.data.data
        })
    },
    addAnswerCapacity () {
      this.answers_selected.push({
        content: '',
        isCorrect: false
      })
    },
    tooglePublish () {
      if (confirm('Xác nhận thao tác')) {
        this.publishCollection({ids: [this.collection.id], publish: !this.collection.isPublish})
          .then(() => {
            this.collection.isPublish = !this.collection.isPublish
          })
      }
    },
    removeAnswerItem (aId) {
      if (this.answers_selected.length <= 2) {
        return
      }
      this.answers_selected.splice(aId, 1)
    },
    toogleCorrectAnswer (aId) {
      const isMultiChoice = this.new_question.multiChoice
      if (!isMultiChoice) {
        let canChoiceMore = true
        for (let i = 0; i < this.answers_selected.length; i++) {
          if (this.answers_selected[i].isCorrect && aId !== i) {
            canChoiceMore = false
            break
          }
        }
        if (!canChoiceMore) {
          return
        }
      }
      this.answers_selected[aId].isCorrect = !this.answers_selected[aId].isCorrect
    },
    navigateToCollectionList () {
      this.$router.push({name: 'CollectionList'})
    },
    navigateToCollectionEdit (id) {
      this.$router.push({name: 'CollectionEdit', params: {id}})
    },
    onRemoveQuestionOfCollection (qid) {
      removeQuestionOfCollection({
        collection_id: this.$route.params.id,
        attach: 0,
        question_ids: [qid]
      }).then(() => {
        this.fetchData()
      })
    }
  }
}
</script>
