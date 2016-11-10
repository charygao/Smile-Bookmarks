<template>
	<div id="quick" class="test">
		<div class="left test">
			<o-link type="link" href="chrome://settings/">设置</o-link>
			<o-link type="link" href="chrome://extensions/">扩展程序</o-link>
			<o-link type="link" href="chrome://bookmarks/">书签管理器</o-link>
			<o-link type="link" href="chrome://downloads/">下载内容</o-link>
			<o-link type="link" href="chrome://flags/">实验室</o-link>
		</div>
		<div class="right test">
			<o-link type="link" href="http://oneo.me/">作者博客</o-link>
			<o-link type="link" href="http://oneo.me/my-bookmarks/">官方网站</o-link>
		</div>
	</div>
</template>

<script>
	import OLink from "./link.vue"
	export default {
		components: {
			OLink
		}
	}
</script>

<style>
	#quick
	{
		overflow: hidden;
	}
	#quick .left, #quick .left .link
	{
		float: left;
	}
	#quick .right, #quick .right .link
	{
		float: right;
	}
	#quick .link
	{
		padding: 5px;
		color: rgba(0,0,0,0.7);
	}
	#quick .link:hover
	{
		color: rgba(0,0,0,1);
	}
	#quick .left .link
	{
		margin-left: 10px; 
	}
	#quick .right .link
	{
		margin-right: 10px; 
	}
</style>