import Vue from "vue"

Vue.use(require("./bookmarks.js"))

// 创建
new Vue(
{
	el: "#app",
	render: h => h(require("./app.vue"))
})