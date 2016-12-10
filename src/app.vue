<template>
	<div id="app" class="test">
		<o-icons></o-icons>
	</div>
</template>

<script>
	export default {
		components: {
			"o-icons": require("./icons.vue")
		},
		created () {
			document.onselectstart = function(e) { return false }
			// document.oncontextmenu = function(e) { return false }
		}
	}
</script>

<style>
	body
	{
		margin: 0;
		padding: 0;
	}
	::-webkit-scrollbar
	{
		width: 0;
	}
	.test
	{
		/*background: rgba(255,0,0,0.1);*/
	}
	#app
	{
		
	}
</style>