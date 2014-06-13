UserManager.Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'usersList': 'showUsersList',
		'usersList/new': 'newUser',
		'usersList/edit/:id': 'editUser'
	}
});
