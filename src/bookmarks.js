// 私有
var vue = null
var bookmarks = null

// 公开
var plugin = {
	// 初始化
	init(arg)
	{
		vue = arg
		chrome.bookmarks.getTree(function(array)
		{
			bookmarks = array[0]["children"][0]
			plugin.openFolder(1)
		})
	},
	// 其他
	openFolder(id)
	{
		var f = plugin.find(bookmarks, id)
		if (f != null)
		{
			vue.icons = []
			if (f["id"] != 1)
			{
				vue.icons.push(
				{
					title: "返回",
					type: "back",
					parentId: f["parentId"]
				})
			}
			for (var i = 0; i < f["children"].length; i++)
			{
				vue.icons.push(
				{
					title: f["children"][i]["title"],
					url: f["children"][i]["url"],
					folderID: f["children"][i]["id"],
					type: f["children"][i]["children"] == null ? "link" : "folder"
				})
			}
		}
	},
	find(arg, id)
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
					var f = plugin.find(arg["children"][i], id)
					if (f !== null)
					{
						return f
					}
				}
			}
		}
		return null
	}
}

// 母鸡呀
function install(Vue)
{
	Vue.bookmarks = plugin
}
if (typeof exports == "object")
{
	module.exports = install
}
else if (typeof define == "function" && define.amd)
{
	define([], function()
	{
		return install
	})
}
else if (window.Vue)
{
	Vue.use(install)
}