<template>
	<div id="app" class="test">
		<o-icons></o-icons>
		<!-- <o-quick></o-quick> -->
	</div>
</template>

<script>
	import OIcons from "./icons.vue"
	// import OQuick from "./quick.vue"
	export default {
		components: {
			OIcons,
			// OQuick
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
		width: 490px;
	}
</style>