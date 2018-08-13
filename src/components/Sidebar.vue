<template>
  <div class="page-sidebar-wrapper">
    <div class="page-sidebar navbar-collapse collapse">
      <ul class="page-sidebar-menu  page-header-fixed " data-keep-expanded="true" data-auto-scroll="true" data-slide-speed="200"
          style="padding-top: 20px">
        <li class="nav-item start ">
          <router-link :to="{name: 'Dashboard'}" class="nav-link">
            <i class="fa fa-dashboard"></i>
            <span class="title">Dashboard</span>
          </router-link>
        </li>

        <li class="nav-item">
          <a href="javascript:;" class="nav-link nav-toggle">
            <i class="fa fa-list-alt"></i>
            <span class="title">Collection</span>
            <span class="arrow"></span>
          </a>
          <ul class="sub-menu">
            <li class="nav-item">
              <router-link :to="{name: 'CollectionList'}" class="nav-link">
                <i class="fa fa-list"></i>
                <span class="title">List</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'CollectionAdd'}" class="nav-link">
                <i class="fa fa-plus-square"></i>
                <span class="title">Add</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li v-if="false" class="nav-item">
          <a href="javascript:;" class="nav-link nav-toggle">
            <i class="fa fa-sitemap"></i>
            <span class="title">Question</span>
            <span class="arrow"></span>
          </a>
          <ul class="sub-menu">
            <li class="nav-item">
              <router-link :to="{name: 'QuestionList'}" class="nav-link">
                <i class="fa fa-list"></i>
                <span class="title">List</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'QuestionAdd'}" class="nav-link">
                <i class="fa fa-plus-square"></i>
                <span class="title">Add</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li v-if="false" class="nav-item ">
          <a class="nav-link nav-toggle">
            <i class="fa fa-database"></i>
            <span class="title">Answer</span>
            <span class="arrow"></span>
          </a>
          <ul class="sub-menu">
            <li class="nav-item">
              <router-link :to="{name: 'AnswerList'}" class="nav-link">
                <i class="fa fa-list"></i>
                <span class="title">List</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'AnswerAdd'}" class="nav-link">
                <i class="fa fa-plus-square"></i>
                <span class="title">Add</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item ">
          <a class="nav-link nav-toggle">
            <i class="fa fa-tags"></i>
            <span class="title">Tag</span>
            <span class="arrow"></span>
          </a>
          <ul class="sub-menu">
            <li class="nav-item">
              <router-link :to="{name: 'TagList'}" class="nav-link">
                <i class="fa fa-list"></i>
                <span class="title">List</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'TagAdd'}" class="nav-link">
                <i class="fa fa-plus-square"></i>
                <span class="title">Add</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <router-link :to="{name: 'UserList'}" class="nav-link">
            <i class="fa fa-users"></i>
            <span class="title">User</span>
          </router-link>
        </li>

        <li class="nav-item ">
          <a class="nav-link nav-toggle">
            <i class="fa fa-magic"></i>
            <span class="title">Toolkit</span>
            <span class="arrow"></span>
          </a>
          <ul class="sub-menu">
            <li class="nav-item">
              <router-link :to="{name: 'PushNotification'}" class="nav-link">
                <i class="fa fa-bell"></i>
                <span class="title">Push Notification</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'SendPoint'}" class="nav-link">
                <i class="fa fa-bell"></i>
                <span class="title">Send Coin</span>
              </router-link>
            </li>
          </ul>
        </li>

        <li class="nav-item">
          <router-link :to="{name: 'Dashboard'}" class="nav-link">
            <i class="fa fa-cogs"></i>
            <span class="title">Setting</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
