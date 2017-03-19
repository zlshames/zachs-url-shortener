<template>
  <div>
    <div class="page-container">
      <h1>Zach's URL Shortener</h1>
      <create-form
        style="margin: 0 auto;">
      </create-form>
    </div>

    <footer-template></footer-template>
  </div>
</template>

<script>
import FooterTemplate from './components/Footer.vue'
import CreateForm from './components/CreateForm.vue'

export default {
  components: {
    FooterTemplate,
    CreateForm
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1 {
    text-align: center;
    color: whitesmoke;
  }
  p {
    text-align: center;
  }
</style>
