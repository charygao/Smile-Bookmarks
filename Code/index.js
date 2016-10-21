function Ad()
{
	
}

// 禁止选择
document.onselectstart = function(e)
{
	return false;
}

// 禁止右键菜单
document.oncontextmenu = function(e)
{
	return false;
}

// 清理全部书签
function Clear()
{
	$("#bookmarks").children('.link').remove();
}

// 书签栏的书签
var bookmarks;

// 添加书签
function AddLink(title,url)
{
	var html = "";
	html += '<div class="link" type="link" ' + 'title="' + title + '" ' + 'url="' + url + '" ' + '">';
	html += '	<div class="icon" style="background-image: url(http://bookmarks.oneo.me/icons/default);"></div>';
	html += '	<div class="title">' + title + '</div>';
	html += '</div>';
	$("#bookmarks").append(html);
}

// 添加文件夹
function AddFolder(id,parentId,title)
{
	var html = "";
	html += '<div class="link" type="folder" ' + 'id="' + id + '" ' + 'parentId="' + parentId + '" ' + 'title="' + title + '" ' + '">';
	html += '	<div class="icon" style="background-image: url(http://bookmarks.oneo.me/icons/folder);"></div>';
	html += '	<div class="title">' + title + '</div>';
	html += '</div>';
	$("#bookmarks").append(html);
}

// 添加返回按钮
function AddBack(backId)
{
	var html = "";
	html += '<div class="link" type="back" backId="' + backId + '">';
	html += '	<div class="icon" style="background-image: url(http://bookmarks.oneo.me/icons/back);"></div>';
	html += '	<div class="title">返回</div>';
	html += '</div>';
	$("#bookmarks").append(html);
}

// 添加书签
function Add(arg)
{
	if(arg["children"] == null)
	{
		// 书签
		var title = arg["title"];
		var url = arg["url"];
		AddLink(title,url);
	}
	else
	{
		// 文件夹
		var id = arg["id"];
		var parentId = arg["parentId"];
		var title = arg["title"];
		AddFolder(id,parentId,title);
	}
}

// 设置图标
function SetIcon(link,logoUrl,success)
{
	if(logoUrl != null && success)
	{
		$(link).children(".icon").css({"background": "url(" + logoUrl + ")"});
	}
	else
	{
		// 生成颜色
		var favicon = "chrome://favicon/" + $(link).attr("url");
		RGBaster.colors(favicon, {
			success: function(payload) {
				if(payload.dominant != "rgb()")
				{
					var rgb = payload.dominant.substr(4,payload.dominant.length-5).split(',');
					var r = parseInt(rgb[0]);
					var g = parseInt(rgb[1]);
					var b = parseInt(rgb[2]);
					if(!((r == 0 && g == 0 && b == 0) || (r == 255 && g == 255 && b == 255)))
					{
						var max = 100;
						var min = 100;
						if(r >= max && g >= max && b >= max)
						{
							r = r >= max ? max : r;
							g = g >= max ? max : g;
							b = b >= max ? max : b;
						}
						if(r <= min && g <= min && b <= min)
						{
							r = r <= min ? min : r;
							g = g <= min ? min : g;
							b = b <= min ? min : b;
						}
						var color = "rgb(" + r + "," + g + "," + b + ")";
						$(link).children(".icon").css({"background": color});
						$(link).children(".icon").append("<div class='text'>" + $(link).children(".title").text().substr(0,1) + "</div>");
					}
				}
			}
		});
	}
}

// 获取自定义图标地址
function GetLogoUrl(url)
{
	if(/http[s]?:\/\/(.*?)([:\/]|$)/.test(url))
	{
		return "http://bookmarks.oneo.me/icons/" + (url.match(/http[s]?:\/\/(.*?)([:\/]|$)/)[1]).replace("www.","").replace(/\./g,"_");
	}
	return null;
}

// 加载图标
function LoacIcon(link)
{
	if ($(link).attr("type") == "link")
	{
		var logoUrl = GetLogoUrl($(link).attr("url"));
		$.ajax({
			type: "get",
			url: logoUrl,
			success: function()
			{
				SetIcon(link,logoUrl,true);
			},
			error: function()
			{
				SetIcon(link,logoUrl,false);
			}
		});
	}
}

// 点击书签
function Click(link)
{
	var type = $(link).attr("type");
	$(link).mouseup(function(e){
		if (type == "folder")
		{
			OpenFolder($(link).attr("id"));
		}
		else if (type == "back")
		{
			OpenFolder($(link).attr("backId"));
		}
		else if (type == "link")
		{
			if (e.which == 1)
			{
				chrome.tabs.update({"url": $(link).attr("url")});
			}
			else if (e.which == 2)
			{
				chrome.tabs.create({"url": $(link).attr("url")});
			}
		}
	});
}

// 刷新显示
function Refresh()
{
	// 刷新书签
	var links = $("#bookmarks .link");
	for (var i = 0; i < links.length; i++)
	{
		Click(links[i]);
		LoacIcon(links[i]);
	}

	// 刷新底部链接
	$("#site .link").mouseup(function(e){
		if (e.which == 1)
		{
			chrome.tabs.update({"url": $(this).attr("url")});
		}
		else if (e.which == 2)
		{
			chrome.tabs.create({"url": $(this).attr("url")});
		}
	});
}

// 查找指定书签
function FindFolder(arg,id)
{
	if(id == 1)
	{
		return bookmarks;
	}
	else
	{
		for (var i = 0; i < arg["children"].length; i++)
		{
			if (arg["children"][i]["children"] != null)
			{
				if (arg["children"][i]["id"] == id)
				{
					return arg["children"][i];
				}
				else
				{
					var folder = FindFolder(arg["children"][i],id);
					if (folder != null)
					{
						return folder;
					}
				}
			}
		}
	}
	return null;
}

// 显示首页的书签，获取这个ID的所有子元素
function OpenFolder(id)
{
	var folder = FindFolder(bookmarks,id);
	if (folder != null)
	{
		Clear();
		if (folder["id"] != 1)
		{
			AddBack(folder["parentId"]);
		}
		for (var i = 0; i < folder["children"].length; i++) {
			Add(folder["children"][i]);
		}
		Ad();
		Refresh();
	}
}

// 初始化
function Init()
{
	Clear();
	chrome.bookmarks.getTree(function(array)
	{
		bookmarks = array[0]["children"][0];
		OpenFolder(1);
	});
}

Init();