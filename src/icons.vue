<template>
	<div id="icons" class="test" :style="'height:' + iconsHeight + 'px'">
		<div class="scroll">
			<o-icon v-for="icon in icons" :icon="icon" @click.native="clicka(icon)"></o-icon>
		</div>
	</div>
</template>

<script>
	import Vue from "vue"

	export default {
		data () {
			return {
				icons: []
			}
		},
		methods: {
			clicka (icon) {
				switch (icon.type)
				{
					case "back":
						Vue.bookmarks.openFolder(icon.parentId)
						break
					case "folder":
						Vue.bookmarks.openFolder(icon.folderID)
						break
					default:
						console.log("不支持")
						break
				}
			}
		},
		computed: {
			iconsHeight () {
				var line = parseInt(this.icons.length / 6) + (this.icons.length % 6 > 0 ? 1 : 0)
				line = line > 5 ? 5 : line
				return line * 105
			}
		},
		created () {
			Vue.bookmarks.init(this)
		},
		components: {
			"o-icon": require("./icon.vue")
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