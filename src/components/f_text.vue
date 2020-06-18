<template>
	<el-form-item v-bind:label="field.label" :class="{required: field.required}">
		<el-input v-model="form[field.model]" :placeholder="field.placeholder"></el-input>
	</el-form-item>
</template>


<script>

export default {
  name: 'f_text',
  props: ['form','field']
}
</script>

