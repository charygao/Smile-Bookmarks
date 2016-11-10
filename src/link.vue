<template>
	<div class="link test" :href="href">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: [
			"type",
			"href"
		]
	}
</script>

<style>
	.link
	{
		cursor: pointer;
	}
</style>