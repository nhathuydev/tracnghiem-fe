<template>
  <div>
    <input
      type="text"
      class="form-control"
      :placeholder="placeholder"
      v-validate="'required|email'"
    />
    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
  </div>
</template>
<script>
  export default {
    props: {
      placeholder: String
    }
  }
</script>
