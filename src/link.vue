<template>
	<div class="link test">
		<slot></slot>
	</div>
</template>

<script>
	export default {
		props: [
			"type",
			"data"
		]
	}
</script>

<style>
	.link
	{
		cursor: pointer;
	}
</style>