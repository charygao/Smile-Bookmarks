<template>
	<div class="icon test">
		<div class="logo" :style="'background-image: url(' + getIcon + ')'">
			<span class="logoText"></span>
		</div>
		<div class="title">
			{{ icon.title }}
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			"icon"
		],
		computed: {
			getIcon: function () {
				switch (this.icon.type)
				{
					case "back":
						return "res/back.png"
						break
					case "folder":
						return "res/folder.png"
						break
					default:
						// 获取在线图标
						// 否则  生成颜色背景
						// 否则  返回这个默认图标
						return "res/default.png"
						break
				}
			}
		}
	}
</script>

<style>
	.icon
	{
		cursor: pointer;
		float: left;
		line-height: 0;
		margin: 5px;
	}
	.icon .logo
	{
		width: 60px;
		height: 60px;
		background-size: 60px 60px;
		border-radius: 3px;
		margin: 5px;
		box-shadow: 0 2px 5px rgba(0,0,0,0.12);

		transition: transform 0.2s;
	}
	.icon .logo .logoText
	{
		font-size: 3.5em;
		display: block;
		text-align: center;
		line-height: 50px;
		color: rgba(255,255,255,1);
		
		font-weight: lighter;
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
	.icon:hover .logo
	{
		transform: scale(1.1,1.1);

		transition: transform 0.1s;
	}
	.icon:active .logo
	{
		transform: scale(1,1);

		transition: transform 0.1s;
	}
</style>