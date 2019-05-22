'use strict';

Vue.component('folder', {
	props: ["name"],
	template: '#folder-tpl',
	mounted: function mounted() {
		var el = $(this.$el);
		var that = this;
		$(this.$el).dropzone({
			url: function url(f) { 
				return "/ups?label="+that.name;
			},
			method: "post",
			paramName:"file",
			acceptedFiles: "image/*",
			previewTemplate: $("#tpl01").html(),
			previewsContainer: el.find(".extra.content")[0],
			autoProcessQueue:true
		});
	}
});

new Vue({
	el: '#app',
	data: {
		msg: "hello",
		arr: [1, 2, 3],
		labels: ["Daisy", "Dandelion", "Rose", "Sunflower", "Tulip"]
	}
});
