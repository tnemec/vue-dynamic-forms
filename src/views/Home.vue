<template>
  <div>
    <h1>Surveys</h1>

    <p>This is the landing page for the surveys.</p>


    <p>
        <button v-on:click="openSurvey">Start Survey</button>

    </p>


  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: ''
    }
  },
  methods : {
    openSurvey() {
      this.$router.push('Survey');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
