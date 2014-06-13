window.UserManager = {
	Models: {},
	Collections: {},
	Views: {},

	start: function(data) {
		var usersList = new UserManager.Collections.UsersList(data.usersList),
		router = new UserManager.Router();

		router.on('route:home', function() {
			router.navigate('usersList', {
				trigger: true,
				replace: true
			});
		});

		router.on('route:showUsersList', function() {
			var usersListView = new UserManager.Views.UsersList({
				collection: usersList
			});
			$('.main-container').html(usersListView.render().$el);
		});

		router.on('route:newUser', function() {
			var newUserForm = new UserManager.Views.UserForm({
				model: new UserManager.Models.User()
			});

			newUserForm.on('form:submitted', function(attrs) {
				attrs.id = usersList.isEmpty() ? 1 : (_.max(usersList.pluck('id')) + 1);
				usersList.add(attrs);
				router.navigate('usersList', true);
			});
			$('.main-container').html(newUserForm.render().$el);
		});

		router.on('route:editUser', function(id) {
			var user = usersList.get(id),
			editUserForm;

			if (user) {
				editUserForm = new UserManager.Views.UserForm({
					model: user
				});

				editUserForm.on('form:submitted', function(attrs) {
					user.set(attrs);
					router.navigate('usersList', true);
				});

				$('.main-container').html(editUserForm.render().$el);
			} else {
				router.navigate('usersList', true);
			}
		});

		Backbone.history.start();
	}
};
