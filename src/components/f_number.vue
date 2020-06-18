<template>
	<el-form-item v-bind:label="field.label" :class="{required: field.required}" style="text-align:left">
		<el-input-number  v-model="form[field.model]" :placeholder="field.placeholder" :min="field.min" :max="field.max" style="margin-left:8px"></el-input-number>
	</el-form-item>
</template>


<script>

export default {
  name: 'f_number',
  props: ['form','field']
}
</script>
