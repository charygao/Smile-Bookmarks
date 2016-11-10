<template>
	<div class="icon test">
		<o-link :type="icon.type" :href="icon.href" :title="icon.title + '\n'">
			<img class="img" :src="getIcon">
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
		},
		computed: {
			getIcon: function () {
				switch (this.icon.type)
				{
					case "back":
						return "res/back.png"
					case "folder":
						return "res/folder.png"
					default:
						// 获取在线图标
						// 否则  生成颜色背景
						// 否则  返回这个默认图标
						return "res/default.png"
				}
			}
		}
	}
</script>

<style>
	.icon
	{
		float: left;
		line-height: 0;
		margin: 5px;

		transition: transform 0.2s;
	}
	.icon .img
	{
		width: 60px;
		height: 60px;
		border-radius: 3px;
		margin: 5px;
		box-shadow: 0 2px 5px rgba(0,0,0,0.12);
	}
	.icon .title
	{
		width: 70px;
		height: 25px;
		line-height: 25px;
		font-size: 0.8em;
		text-align: center;
		color: rgba(0,0,0,0.8);

		overflow: hidden;
		text-overflow: ellipsis;
	}
	.icon:hover
	{
		transform: scale(1.15,1.15);

		transition: transform 0.1s;
	}
	.icon:active
	{
		transform: scale(1.1,1.1);

		transition: transform 0.1s;
	}
</style>