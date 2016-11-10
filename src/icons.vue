<template>
	<div id="icons" class="test">
		<o-icon v-for="icon in icons" :icon="icon"></o-icon>
	</div>
</template>

<script>
	import OIcon from "./icon.vue"

	var othis = null
	var bookmarks = null

	function findBookmarks(arg,id)
	{
		if (id === 1)
		{
			return bookmarks
		}
		for (var i = 0; i < arg["children"].length; i++)
		{
			if (arg["children"][i]["children"] !== null)
			{
				if (arg["children"][i]["id"] === id)
				{
					return arg["children"][i]
				}
				else
				{
					var f = findBookmarks(arg["children"][i],id)
					if (f !== null)
					{
						return f
					}
				}
			}
		}
		return null
	}
	function openBookmarks(id)
	{
		var f = findBookmarks(bookmarks,id)
		if (f !== null)
		{
			othis.icons = []
			if (f["id"] !== 1)
			{
				// 添加返回按钮
				othis.icons.push({
					title: "返回",
					type: "back",
					back: f["parentId"]
				})
				// 设置大小，图标数量 + 1
			}
			else
			{
				// 设置大小，图标数量
			}
			for (var i = 0; i < f["children"].length; i++)
			{
				othis.icons.push({
					title: "标题",
					url: "链接",
					type: "类型"
				})
			}
			console.log(othis.icons)
		}
	}
	function initBookmarks()
	{
		chrome.bookmarks.getTree(function(array)
		{
			bookmarks = array[0]["children"][0]
			openBookmarks(1)
		})
	}

	export default {
		data () {
			return {
				icons: []
			}
		},
		created () {
			othis = this
			initBookmarks()
		},
		components: {
			OIcon
		}
	}
</script>

<style>
	#icons
	{
		padding: 5px;
		margin-bottom: 26px;
		overflow: hidden;
	}
</style>