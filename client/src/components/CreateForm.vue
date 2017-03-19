<template>
  <div class="box">
    <form class="form-horizontal" novalidate v-on:submit.prevent="submit">
      <div class="form-group">
        <div class="label-input">
          <label for="url" class="control-label">URL:</label>
          <input id="url" type="text" class="form-control" v-model="form.url" required>
        </div>
      </div>

      <div class="form-group">
        <div class="label-input">
          <label for="path" class="control-label">Custom Path (optional):</label>
          <input id="path" type="text" class="form-control" v-model="form.path" required>
        </div>
      </div>

      <div class="form-group">
        <div class="submit-row">
          <button type="submit" class="btn btn-primary">Shorten!</button>
          <input id="path" type="text" class="form-control" v-model="shortened" readonly>
          <a @click="copy" id="clipboard" class="btn btn-warning">
            <i class="fa fa-clipboard"></i>
          </a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import clipboard from 'clipboard-js'

  export default {
    data() {
      return {
        form: {
          url: '',
          path: ''
        },
        shortened: ''
      }
    },
    mounted() {
      global.jQuery('#clipboard').tooltip('hide')
        .attr('data-title', 'Copied!')
        .attr('data-placement', 'right')
        .attr('data-trigger', 'click')
    },
    methods: {
      submit() {
        this.shortened = ''

        // Shorten URL
        fetch('http://localhost:3000/url', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            this.shortened = data.error
          } else {
            this.shortened = data.data.url
          }
        })
      },
      copy() {
        // Don't copy if no URL
        if (this.shortened.indexOf('http://') == -1) {
          return
        }

        // Copy to clipboard
        clipboard.copy(this.shortened)
        global.jQuery('#clipboard').tooltip('show')

        setTimeout(() => {
          global.jQuery('#clipboard').tooltip('hide')
        }, 1000)
      }
    }
  }
</script>

<style scoped>
  .submit-row {
    margin-left: 10px;
    margin-top: 5px;
    margin-right: 10px;
    display: flex;
    flex-direction: row;
  }

  .submit-row>input {
    margin-left: 15px;
    margin-right: 15px;
  }

  .box {
    color: black;
    border-radius: 5px;
    background-color: whitesmoke;
    width: 500px;
    padding-bottom: 20px;
  }

  @media only screen and (max-width: 768px) {
    .box {
      width: 90%;
    }
  }

  .form-group {
    margin: 0 auto;
    width: 90%;
  }

  .label-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin: 10px;
  }
</style>
