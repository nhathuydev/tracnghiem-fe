<template>
  <div>
    <Pagebar pageName="Toolkit"/>
  </div>
</template>

<script>
  import {Pagebar} from '@/components'
  export default {
    name: 'toolkit',
    data () {
      return {
        msg: 'Welcome to Dashboard!!!'
      }
    },
    components: {
      Pagebar
    }
  }
</script>
