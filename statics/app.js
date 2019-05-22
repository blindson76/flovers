'use strict';

Vue.component('folder', {
	props: ["name"],
	template: '#folder-tpl',
	mounted: function mounted() {
		var el = $(this.$el);
		$(this.$el).dropzone({
			url: function url(f) { 
				return "/classify";
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
