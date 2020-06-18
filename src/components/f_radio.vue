<template>
	<el-form-item v-bind:label="field.label" :class="{required: field.required}" style="text-align: left">
		<el-radio-group  v-model="form[field.model]" style="margin-left: 8px">
			<el-radio v-for="item in field.options" :label="item.value" :key="item.value">{{item.label}}</el-radio>
		</el-radio-group>
	</el-form-item>
</template>


<script>

export default {
  name: 'f_radio',
  props: ['form','field']
}
</script>

