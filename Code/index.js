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

// 环境变量
var bookmarks;
var icons;
var serverUrl = "http://bookmarks.oneo.me"

// 添加书签
function AddLink(title,url)
{
	var logoUrl = GetIconUrl(GetDomain(url));
	var html = "";
	html += '<div class="link" type="link" ' + 'title="' + title + '" ' + 'url="' + url + '" ' + '">';
	if (logoUrl == null)
	{
		html += '	<div class="icon"></div>';
	}
	else
	{
		html += '	<div class="icon" style="background-image: url(' + logoUrl + ');"></div>';
	}
	html += '	<div class="title">' + title + '</div>';
	html += '</div>';
	$("#bookmarks").append(html);
}

// 添加文件夹
function AddFolder(id,parentId,title)
{
	var html = "";
	html += '<div class="link" type="folder" ' + 'id="' + id + '" ' + 'parentId="' + parentId + '" ' + 'title="' + title + '" ' + '">';
	html += '	<div class="icon" style="background-image: url(res/folder.png);"></div>';
	html += '	<div class="title">' + title + '</div>';
	html += '</div>';
	$("#bookmarks").append(html);
}

// 添加返回按钮
function AddBack(backId)
{
	var html = "";
	html += '<div class="link" type="back" backId="' + backId + '">';
	html += '	<div class="icon" style="background-image: url(res/back.png);"></div>';
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

// 获取图标链接
function GetIconUrl(domain)
{
	if (icons == null)
	{
		return;
	}
	// 获取绝对匹配的图标
	for (var i = 0; i < icons.length; i++)
	{
		if (icons[i]["domain"] == domain || icons[i]["domain"] == "." + domain)
		{
			return serverUrl + icons[i]["url"] + "&count=true";
		}
	}
	// 获取通配的图标
	for (var i = 0; i < icons.length; i++)
	{
		if (domain.endsWith("." + icons[i]["domain"]))
		{
			return serverUrl + icons[i]["url"] + "&count=true";
		}
	}
}

// 设置图标
function GenerateIcon(link)
{
	if ($(link).children(".icon").css("background-image") == "none")
	{
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

				if ($(link).children(".icon")[0].style.background == "")
				{
					$(link).children(".icon").css({"background-image": "url(res/default.png)"});
				}
			}
		});
	}
}

// 获取域名
function GetDomain(url)
{
	return url.match(/http[s]?:\/\/(.*?)([:\/]|$)/)[1].replace("www.","");
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
		GenerateIcon(links[i]);
	}
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

function SetSize(num)
{
	max = 4;
	thh = parseInt(num / 5);
	if (num % 5 > 0)
	{
		thh += 1;
	}
	if (thh > max)
	{
		$("#bookmarks").css("height",max * 120 + 20 + "px" );
	}
	else
	{
		$("#bookmarks").css("height",thh * 120 + 20 + "px" );
	}
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
			SetSize(folder["children"].length + 1);
			AddBack(folder["parentId"]);
		}
		else
		{
			SetSize(folder["children"].length);
		}
		for (var i = 0; i < folder["children"].length; i++) {
			Add(folder["children"][i]);
		}
		Refresh();
	}
}

// 初始化
function Init()
{
	// 设置底部链接
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
	//  获取图标列表
	$.getJSON(serverUrl + "/icons?action=json",function(json)
	{
		icons = json;
	});
	// 打开书签栏的书签
	Clear();
	chrome.bookmarks.getTree(function(array)
	{
		bookmarks = array[0]["children"][0];
		OpenFolder(1);
	});
}

Init();