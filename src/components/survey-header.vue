<template>
	<div class="survey-header">

		<h1>{{config.title}}</h1>

		<p>{{config.description}}</p>

		<hr/>

	</div>
</template>


<script>

export default {
  name: 'survey-header',
  props: ['config']
}
</script>