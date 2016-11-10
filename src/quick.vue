<template>
	<div id="quick" class="test">
		<div class="left test">
			<o-link type="link" data="chrome://settings/">设置</o-link>
			<o-link type="link" data="chrome://extensions/">扩展程序</o-link>
			<o-link type="link" data="chrome://bookmarks/">书签管理器</o-link>
			<o-link type="link" data="chrome://downloads/">下载内容</o-link>
			<o-link type="link" data="chrome://flags/">实验室</o-link>
		</div>
		<div class="right test">
			<o-link type="link" data="http://oneo.me/">作者博客</o-link>
			<o-link type="link" data="http://oneo.me/my-bookmarks/">官方网站</o-link>
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
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
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
		margin: 5px;
		color: rgba(0,0,0,0.7);
	}
	#quick .link:hover
	{
		margin: 5px;
		color: rgba(0,0,0,1);
	}
</style>