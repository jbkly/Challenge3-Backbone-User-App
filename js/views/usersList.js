UserManager.Views.UsersList = Backbone.View.extend({
	template: _.template($('#template-usersList').html()),

	renderOne: function(user) {
		var userView = new UserManager.Views.User({model: user});
		this.$('.usersList-container').append(userView.render().$el);
	},

	render: function() {
		var html = this.template();
		this.$el.html(html);

		this.collection.each(this.renderOne, this);

		return this;
	}
});
