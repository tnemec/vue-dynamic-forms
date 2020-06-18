<template>
  <div>
    <component :is="formComponent" :configData="configData"></component>

  </div>
</template>

<script>
// for dev, import config as staic file
import formConfig from '../assets/form_config.json';


// import components
import dynamicForm from '../components/dynamicForm';

export default {
  name: 'Survey',
  components: {
    dynamicForm
  },
  data () {
    return {
      configData: {},
      formComponent: null 
    }
  },
  created() {
    // you can get the formConfig data from a webserivce call instead of import
    this.initForm(formConfig);
  },

  methods : {
    initForm(formConfig) {
      this.configData = formConfig;  
      this.formComponent = 'dynamicForm';      
    }

  }
}
</script>


