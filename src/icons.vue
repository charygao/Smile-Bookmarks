<template>
	<div id="icons" class="test">
		<div class="scroll">
			<o-icon v-for="icon in icons" :icon="icon"></o-icon>
		</div>
	</div>
</template>

<script>
	import OIcon from "./icon.vue"

	var othis = null
	var bookmarks = null

	function findBookmarks(arg,id)
	{
		if (id == 1)
		{
			return bookmarks
		}
		for (var i = 0; i < arg["children"].length; i++)
		{
			if (arg["children"][i]["children"] != null)
			{
				if (arg["children"][i]["id"] == id)
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
		if (f != null)
		{
			othis.icons = []
			if (f["id"] != 1)
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
					title: f["children"][i]["title"],
					url: f["children"][i]["url"],
					type: f["children"][i]["children"] == null ? "link" : "folder"
				})
			}
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
		width: 490px;
		height: 525px;
		overflow: hidden;

		padding-bottom: 10px;
	}
	#icons .scroll
	{
		width: 100%;
		height: 100%;
		padding: 5px;
		overflow-y: scroll;
	}
</style>