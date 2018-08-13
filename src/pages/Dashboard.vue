<template>
  <div>
    <Pagebar pageName="Dashboard"/>
    <div class="row" v-if="dashboard">
      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div class="dashboard-stat blue">
          <div class="visual">
            <i class="fa fa-users"></i>
          </div>
          <div class="details">
            <div class="number">
              <span data-counter="counterup" data-value="1349">{{dashboard.collection}}</span>
            </div>
            <div class="desc"> Total Collections </div>
          </div>
          <router-link :to="{name: 'CollectionList'}" class="more" href="javascript:;"> View more
            <i class="m-icon-swapright m-icon-white"></i>
          </router-link>
        </div>
      </div>

      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div class="dashboard-stat purple">
          <div class="visual">
            <i class="fa fa-globe"></i>
          </div>
          <div class="details">
            <div class="number">
              <span data-counter="counterup" data-value="89">{{ dashboard.tag }}</span>
            </div>
            <div class="desc"> Total Tags </div>
          </div>
          <router-link :to="{name: 'TagList'}" class="more" href="javascript:;"> View more
            <i class="m-icon-swapright m-icon-white"></i>
          </router-link>
        </div>
      </div>

      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div class="dashboard-stat red">
          <div class="visual">
            <i class="fa fa-bar-chart-o"></i>
          </div>
          <div class="details">
            <div class="number">
              <span data-counter="counterup" data-value="12,5">{{dashboard.question}}</span></div>
            <div class="desc"> Total Questions </div>
          </div>
          <router-link :to="{name: 'QuestionList'}" class="more" href="javascript:;"> View more
            <i class="m-icon-swapright m-icon-white"></i>
          </router-link>
        </div>
      </div>

      <div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
        <div class="dashboard-stat green">
          <div class="visual">
            <i class="fa fa-user"></i>
          </div>
          <div class="details">
            <div class="number">
              <span data-counter="counterup" data-value="549">{{ dashboard.user }}</span>
            </div>
            <div class="desc"> Total Users </div>
          </div>
          <router-link :to="{name: 'UserList'}" class="more" href="javascript:;"> View more
            <i class="m-icon-swapright m-icon-white"></i>
          </router-link>
        </div>
      </div>

    </div>
    <div class="row">
      <div class="col-md-6 col-sm-6">
        <div class="portlet light bordered">
          <div class="portlet-title">
            <div class="caption">
              <span class="caption-subject font-purple bold uppercase">Home Collection</span>
            </div>
          </div>
          <div class="portlet-body">
            <div class="row">
              <table class="table">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Index</th>
                  <th scope="col"></th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="c in home_posts.data">
                  <td>{{c.collection.id}}</td>
                  <td>{{c.collection.name}}</td>
                  <td>{{c.index}}</td>
                  <td class="text-right">
                    <button class="btn btn-sm" @click="removeByTypeId(c.id, 1)">
                      <i class="fa fa-remove"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>

              <form class="form-inline">
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="inputPassword2" class="sr-only">Collection Id</label>
                        <multiselect
                                v-model="home_collection_selected"
                                tag-placeholder="Add this collection"
                                placeholder="Search collection by id or name"
                                label="name"
                                track-by="id"
                                :options="collection_options"
                                :multiple="false"
                                :taggable="false"
                                @search-change="searchCollection"
                        >
                        </multiselect>
                    </div>

                    <div class="form-group mx-sm-3 mb-2">
                        <label for="inputPassword2" class="sr-only">Index</label>
                        <input type="number" class="form-control" id="inputPassword2" placeholder="Index" v-model="home_collection_index">
                    </div>
                    <button @click.prevent="addCollectionToQueue(1)" class="btn btn-primary mb-2">Add</button>
                </form>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="portlet light bordered">
          <div class="portlet-title">
            <div class="caption">
              <span class="caption-subject font-yellow bold uppercase">Slider collections</span>
            </div>
          </div>
          <div class="portlet-body">
            <div class="row">
              <table class="table">
                <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Index</th>
                  <th scope="col"></th>
                </tr>
                </thead>
                <tbody>

                <tr v-for="c in slider_posts.data">
                  <td>{{c.collection.id}}</td>
                  <td>{{c.collection.name}}</td>
                  <td>{{c.index}}</td>
                  <td class="text-right">
                    <button class="btn btn-sm" @click="removeByTypeId(c.id, 1)">
                      <i class="fa fa-remove"></i>
                    </button>
                  </td>
                </tr>
                </tbody>
              </table>

            <form class="form-inline">
                <div class="form-group mx-sm-3 mb-2">
                    <label for="inputPassword2" class="sr-only">Collection Id</label>
                    <multiselect
                            v-model="slider_collection_selected"
                            tag-placeholder="Add this collection"
                            placeholder="Search collection by id or name"
                            label="name"
                            track-by="id"
                            :options="collection_options"
                            :multiple="false"
                            :taggable="false"
                            @search-change="searchCollection"
                    >
                    </multiselect>
                </div>

                <div class="form-group mx-sm-3 mb-2">
                    <label for="inputPassword2" class="sr-only">Index</label>
                    <input type="number" class="form-control" id="inputPassword2" placeholder="Index" v-model="slider_collection_index">
                </div>
                <button @click.prevent="addCollectionToQueue(0)" class="btn btn-primary mb-2">Add</button>
            </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Pagebar } from '@/components'
import {getDashboard, getFeature, removeFeature, searchCollection, addFeature} from '@/api'

export default {
  name: 'dashboard',
  data () {
    return {
      dashboard: null,
      slider_posts: [],
      home_posts: [],
      slider_collection_selected: null,
      slider_collection_index: 0,
      home_collection_selected: null,
      home_collection_index: 0,
      collection_options: []
    }
  },
  components: {
    Pagebar
  },
  created () {
    this.fetchData()
  },
  methods: {
    fetchData: function () {
      getDashboard()
        .then(data => {
          this.dashboard = data.data
        })
      getFeature({type: 1})
        .then(data => {
          this.home_posts = data.data
        })

      getFeature({type: 0})
        .then(data => {
          this.slider_posts = data.data
        })
    },
    removeByTypeId (id) {
      removeFeature({id})
        .then(() => {
          this.fetchData()
        })
    },
    searchCollection (query) {
      searchCollection({query})
          .then(data => {
            this.collection_options = data.data
          })
    },
    addCollectionToQueue (type) {
      let ci, index
      if (type === 0) {
        ci = this.slider_collection_selected.id
        index = this.slider_collection_index
      } else if (type === 1) {
        ci = this.home_collection_selected.id
        index = this.home_collection_index
      }
      if (!ci) return
      addFeature({
        collection_id: ci,
        type,
        index
      }).then(() => this.fetchData())
    }
  }
}
</script>
