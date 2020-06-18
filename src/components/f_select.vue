<template>
	<el-form-item v-bind:label="field.label" :class="{required: field.required}" style="text-align:left">
		<el-select v-model="form[field.model]" :placeholder="field.placeholder" style="margin-left: 8px">
			<el-option v-for="item in field.options" :key="item.value" :label="item.label"
      :value="item.value"></el-option>
		</el-select>
	</el-form-item>
</template>


<script>

export default {
  name: 'f_select',
  props: ['form','field']
}
</script>

