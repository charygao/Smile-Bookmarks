<template>
	<div class="icon test">
		<o-link :type="icon.type" :data="icon.data" :title="icon.title">
			<img class="img" src="res/default.png">
			<div class="title">
				{{ icon.title }}
			</div>
		</o-link>
	</div>
</template>

<script>
	import OLink from "./link.vue"
	export default {
		props: [
			"icon"
		],
		components: {
			OLink
		}
	}
</script>

<style>
	.icon
	{
		margin: 5px;
		float: left;
		line-height: 0;
	}
	.icon .img
	{
		width: 60px;
		height: 60px;
		border-radius: 3px;
		margin: 15px 15px 0 15px;
		box-shadow: 0 2px 5px rgba(0,0,0,0.12);
	}
	.icon .title
	{
		width: 90px;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
		text-align: center;
		color: rgba(0,0,0,0.8);

		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>