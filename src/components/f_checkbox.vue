<template>
	<div style="text-align:left">
		<el-checkbox v-model="form[field.model]" :label="field.value">{{field.label}}</el-checkbox>
	</div>
</template>


<script>

export default {
  name: 'f_checkbox',
  props: ['form','field']
}
</script>

