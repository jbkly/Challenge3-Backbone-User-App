UserManager.Views.UserForm = Backbone.View.extend({
	template: _.template($('#template-new-user').html()),

	events: {
		'submit .user-form': 'onFormSubmit'
	},

	render: function() {
		var html = this.template(_.extend(this.model.toJSON(), {
			isNew: this.model.isNew()
		}));
		this.$el.append(html);
		return this;
	},

	onFormSubmit: function(e) {
		e.preventDefault();

		// awful, awful form validation hack in case Safari ignores HTML5 form validation
		if (this.$('.user-firstname-input').val().trim() && (!this.$('.user-email-input').val() || (/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(this.$('.user-email-input').val()))) {
	 		this.trigger('form:submitted', {
		 		firstname: this.$('.user-firstname-input').val(),
		 		lastname: this.$('.user-lastname-input').val(),
		 		email: this.$('.user-email-input').val()
	 		});
	 	}
	}
});
