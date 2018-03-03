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
            <i class="fa fa-shopping-cart"></i>
          </div>
          <div class="details">
            <div class="number">
              <span data-counter="counterup" data-value="549">{{ dashboard.answer }}</span>
            </div>
            <div class="desc"> Total Answers </div>
          </div>
          <router-link :to="{name: 'AnswerList'}" class="more" href="javascript:;"> View more
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
    </div>
    <div class="row" v-if="false">
      <div class="col-md-6 col-sm-6">
        <div class="portlet light bordered">
          <div class="portlet-title">
            <div class="caption">
              <i class="icon-cursor font-purple"></i>
              <span class="caption-subject font-purple bold uppercase">General Stats</span>
            </div>
            <div class="actions">
              <a href="javascript:;" class="btn btn-sm btn-circle red easy-pie-chart-reload">
                <i class="fa fa-repeat"></i> Reload </a>
            </div>
          </div>
          <div class="portlet-body">
            <div class="row">
              <div class="col-md-4">
                <div class="easy-pie-chart">
                  <div class="number transactions" data-percent="55">
                    <span>+55</span>% <canvas height="75" width="75"></canvas></div>
                  <a class="title" href="javascript:;"> Transactions
                    <i class="icon-arrow-right"></i>
                  </a>
                </div>
              </div>
              <div class="margin-bottom-10 visible-sm"> </div>
              <div class="col-md-4">
                <div class="easy-pie-chart">
                  <div class="number visits" data-percent="85">
                    <span>+85</span>% <canvas height="75" width="75"></canvas></div>
                  <a class="title" href="javascript:;"> New Visits
                    <i class="icon-arrow-right"></i>
                  </a>
                </div>
              </div>
              <div class="margin-bottom-10 visible-sm"> </div>
              <div class="col-md-4">
                <div class="easy-pie-chart">
                  <div class="number bounce" data-percent="46">
                    <span>-46</span>% <canvas height="75" width="75"></canvas></div>
                  <a class="title" href="javascript:;"> Bounce
                    <i class="icon-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-sm-6">
        <div class="portlet light bordered">
          <div class="portlet-title">
            <div class="caption">
              <i class="icon-equalizer font-yellow"></i>
              <span class="caption-subject font-yellow bold uppercase">Server Stats</span>
              <span class="caption-helper">monthly stats...</span>
            </div>
            <div class="tools">
              <a href="" class="collapse" data-original-title="" title=""> </a>
              <a href="#portlet-config" data-toggle="modal" class="config" data-original-title="" title=""> </a>
              <a href="" class="reload" data-original-title="" title=""> </a>
              <a href="" class="remove" data-original-title="" title=""> </a>
            </div>
          </div>
          <div class="portlet-body">
            <div class="row">
              <div class="col-md-4">
                <div class="sparkline-chart">
                  <div class="number" id="sparkline_bar5"><canvas width="113" height="55" style="display: inline-block; width: 113px; height: 55px; vertical-align: top;"></canvas></div>
                  <a class="title" href="javascript:;"> Network
                    <i class="icon-arrow-right"></i>
                  </a>
                </div>
              </div>
              <div class="margin-bottom-10 visible-sm"> </div>
              <div class="col-md-4">
                <div class="sparkline-chart">
                  <div class="number" id="sparkline_bar6"><canvas width="107" height="55" style="display: inline-block; width: 107px; height: 55px; vertical-align: top;"></canvas></div>
                  <a class="title" href="javascript:;"> CPU Load
                    <i class="icon-arrow-right"></i>
                  </a>
                </div>
              </div>
              <div class="margin-bottom-10 visible-sm"> </div>
              <div class="col-md-4">
                <div class="sparkline-chart">
                  <div class="number" id="sparkline_line"><canvas width="100" height="55" style="display: inline-block; width: 100px; height: 55px; vertical-align: top;"></canvas></div>
                  <a class="title" href="javascript:;"> Load Rate
                    <i class="icon-arrow-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Pagebar } from '@/components'
import {getDashboard} from '@/api'

export default {
  name: 'dashboard',
  data () {
    return {
      dashboard: null
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
    }
  }
}
</script>
