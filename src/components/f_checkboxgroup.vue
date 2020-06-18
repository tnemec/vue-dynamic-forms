<template>
	<el-form-item v-bind:label="field.label" :class="{required: field.required}">
		<el-checkbox-group  v-model="form[field.model]">
			<el-checkbox v-for="item in field.options" :label="item.value" :key="item.value">{{item.label}}</el-checkbox>
		</el-checkbox-group>
	</el-form-item>
</template>


<script>

export default {
  name: 'f_checkboxgroup',
  props: ['form','field']
}
</script>

