<template>
	<div class="page-header">

		<h2>{{page.title}}</h2>

		<p>{{page.description}}</p>

		<h3 v-if="page.loopDescription">{{page.loopDescription}}</h3>

	</div>
</template>


<script>

export default {
  name: 'page-header',
  props: ['page']
}
</script>


<style scoped>


.page-header {
	padding: 16px 0
}


</style>