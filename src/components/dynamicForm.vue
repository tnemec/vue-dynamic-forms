<template>

    <el-container>

      <el-header>
        <surveyHeader v-bind:config="configData"></surveyHeader>
      </el-header>

      <el-main>

        <el-row>

          <el-col :span="6">&nbsp;</el-col>

          <el-col :span="12">       


            <pageHeader v-bind:page="currentPageHeader"></pageHeader>


            <el-form ref="form" @submit.prevent="handleSubmit">

              <div class="field-container" v-for="item in fieldList">

                  <component :is="'f_' + item.type" :field="item" :form="formData" v-if="showField(item)"></component>

              </div>

              <div class="button-container">
                
              </div>
              <div class="button-container">
                <el-row  type="flex" justify="space-between">
                  <el-col :span="12"><el-button  @click="prev" v-if="hasPrev">Previous</el-button></el-col>
                  <el-col :span="12">
                    <el-button  @click="next" v-if="hasNext">Next</el-button>
                    <el-button type="primary" @click="handleSubmit" v-if="canSubmit">Submit</el-button>
                  </el-col>
                </el-row>
              </div>


            </el-form>
          </el-col>


          <el-col :span="6">&nbsp;</el-col>          


        </el-row>

      </el-main>

    </el-container>

</template>

<script>

// import components
import surveyHeader from './survey-header';
import pageHeader from './page-header';
import f_text from './f_text';
import f_textarea from './f_textarea';
import f_number from './f_number';
import f_select from './f_select';
import f_checkbox from './f_checkbox';
import f_checkboxgroup from './f_checkboxgroup';
import f_radio from './f_radio';
import f_subheading from './f_subheading';
import f_paragraph from './f_paragraph';
import f_divider from './f_divider';


export default {
  name: 'dynamicForm',
  props: ['configData','existingData','loopOptions'],
  components: {
    surveyHeader,
    pageHeader,
    f_text,
    f_textarea,
    f_number,
    f_select,
    f_checkbox,
    f_checkboxgroup,
    f_radio,   
    f_subheading,
    f_paragraph,
    f_divider

  },
  data () {
    return {
      formData: {},
      currentPageIndex : 0,
      currentLoopIndex: 0
    }
  },
  created() {
    if(Object.keys(this.existingData).length === 0) {
      //this.initLoops(); // only need to do this once
      this.initFields(this.configData.pages[this.currentPageIndex].fields); // init first page fields      
    }
  }, 
  computed: {
      numPages() {
          return this.configData.pages.length;
      },
      getLoop() {
        return this.loopOptions[this.configData.pages[this.currentPageIndex].loop];
      },
      fieldList() {
        let fields = this.configData.pages[this.currentPageIndex].fields || [];
        if(this.getLoop) {
          let fieldsCopy = JSON.parse(JSON.stringify( fields )); // deep copy
          for(let field of fieldsCopy) {
            field.model = this.getLoop.model + '-' + this.currentLoopIndex + '|' + field.model;
            console.log(field.model)
          }
          return fieldsCopy;
        }
        return fields;
      },      
      hasNext() {
        if(this.getLoop != undefined && this.currentLoopIndex < this.getLoop.length -1) {
          return true;
        }
        return this.currentPageIndex < this.numPages -1;  // show the next button
      },
      hasPrev() {
        if(this.getLoop != undefined && this.currentLoopIndex > 0) {
            return true;
        }
        return this.currentPageIndex > 0;  // show the previous button
      },
      currentPageHeader() {
          let hdr = {
              title: this.configData.pages[this.currentPageIndex].title,
              description: this.configData.pages[this.currentPageIndex].description,
              loopDescription: ''
          };
          if(this.getLoop) {
            hdr.loopDescription = this.getLoop.name + ' ' + (this.currentLoopIndex +1);
          }
          return hdr;
      },
      canSubmit() {
           // handle validation at this step
          return this.currentPageIndex == this.numPages -1; // is this on the final page?
      }
  },
  methods : {
    initFields(fields) {
      // will pre-fill all the form properties
      // some modification of the formData object is needed for grouped/array fields
      var arrayTypes = ['checkboxgroup'];
      for(let field of fields) {
        if(this.formData[field.model] == undefined) {
           this.$set(this.formData, field.model, arrayTypes.includes(field.type) ? [] : "");  // must use reactive setter to add object properties
        }
      }
    },
    /*
    initLoops() {
      console.log('initLoops')
      // used on empty forms
      // preconfigures any loop arrays
        if(this.configData.pages && this.configData.pages.length) {
          let tempForm = {};
          for(let page of this.configData.pages) {
            if(page.loop != undefined && this.loopOptions[page.loop]) {
              let temploop = [];
              for(let loop = 0; loop < this.loopOptions[page.loop].length; loop++) {
                  temploop.push({});
              }
              tempForm[this.loopOptions[page.loop].model] = temploop;
            }
          }
          this.formData = tempForm;
        }
    },
    */
    handleSubmit() {
      this.$message({
        message: 'Submit to ' + this.configData.submit,
        type: 'success',
        showClose: true
      });
    },
    next() {
      if(this.getLoop != undefined && this.currentLoopIndex < this.getLoop.length -1) {
        this.currentLoopIndex = Math.min(this.currentLoopIndex +1, this.getLoop.length -1);
      } else {
        this.currentLoopIndex = 0;
        this.currentPageIndex = Math.min(this.currentPageIndex +1, this.numPages -1);
      }
      this.initFields(this.fieldList); 
    },
    prev() {
      if(this.getLoop != undefined && this.currentLoopIndex > 0) {
        this.currentLoopIndex = Math.min(this.currentLoopIndex -1, 0);
      } else {
        this.currentLoopIndex = 0;
        this.currentPageIndex = Math.max(this.currentPageIndex -1, 0);
        this.initFields(this.fieldList);   
      }
    },    
    showField(item) {
      var cond = item.conditional
      if(cond == undefined) {
        return true
      }
      var m = cond.match(/([^=|!|>|<| ]+)[ ]+?(=|\!=|>|<)[ ]+?'([^']*)'/); // matches string (=,!=,< or >) 'string'
      if(m && m.length == 4) {
        var mdl = this.formData[m[1]]; 
        if(mdl == undefined) {
          return false; // cannot get a valid model
        }
        switch (m[2]) {
          case '=' :
            if(mdl == m[3]) {
              return true;
            }
            break;
          case '!=':
            if(mdl != m[3]) {
              return true;
            }
            break;
          case '>':
            if(mdl > m[3]) {
              return true;
            }
            break;  
          case '<':
            if(mdl < m[3]) {
              return true;
            }
            break; 
        }
        return false;
      }
      return true;
    }
  }
}
</script>


<style>

.el-form-item.required label {
  padding-right: 24px;
  background-image: url('../assets/asterisk.svg');
  background-repeat: no-repeat;
  background-position: 100% 50%;
  background-size: 12px;
}

.el-form-item.required .el-radio-group label {
  background-image: none;
}

.button-container {
  margin-top: 48px;
}

</style>