function ApplicationWindow() {

	var username = Ti.App.Properties.getString('blimpUsername');
	var api_key = Ti.App.Properties.getString('blimpApiKey');

	var CompanyView = require('ui/common/CompanyView'),
		ProjectView = require('ui/common/ProjectView'),
		GoalView = require('ui/common/GoalView'),
		TaskView = require('ui/common/TaskView'),
		TaskDetailView = require('ui/common/TaskDetailView'),
		AuthView = require('ui/common/AuthView');

	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});

	var companyView = new CompanyView(),
		projectView = new ProjectView(),
		goalView = new GoalView(),
		taskView = new TaskView(),
		taskDetailView = new TaskDetailView(),
		authView = new AuthView();

	var authContainerWindow = Ti.UI.createWindow({
		title: 'Blimp'
	});

	var loginButton = Ti.UI.createButton({
		title: 'Login'
	});

	authContainerWindow.setRightNavButton(loginButton);
	authContainerWindow.add(authView);

	var companyContainerWindow = Ti.UI.createWindow({
		title:'Companies'
	});
	companyContainerWindow.add(companyView);

	var projectContainerWindow = Ti.UI.createWindow({
		title:'Projects'
	});
	projectContainerWindow.add(projectView);

	var goalContainerWindow = Ti.UI.createWindow({
		title: 'Goals'
	});
	goalContainerWindow.add(goalView);

	var taskContainerWindow = Ti.UI.createWindow({
		title: 'Tasks'
	});
	taskContainerWindow.add(taskView);

	var taskDetailContainerWindow = Ti.UI.createWindow({
		title: 'Task Details'
	});
	taskDetailContainerWindow.add(taskDetailView);

	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:companyContainerWindow
	});
	self.add(navGroup);


	loginButton.addEventListener('click', function(e) {
		if(username && api_key) {
			companyView.fireEvent('loggedIn');
			authContainerWindow.close();
		} else {
			alert('Enter your username and API Key');
		}
	});

	companyView.addEventListener('companySelected', function(e) {
		projectView.fireEvent('companySelected',e);
		navGroup.open(projectContainerWindow);
	});

	projectView.addEventListener('projectSelected', function(e) {
		goalView.fireEvent('projectSelected', e);
		navGroup.open(goalContainerWindow);
	});

	goalView.addEventListener('goalSelected', function(e) {
		taskView.fireEvent('goalSelected', e);
		navGroup.open(taskContainerWindow);
	});

	taskView.addEventListener('taskSelected', function(e) {
		taskDetailView.fireEvent('taskSelected', e);
		navGroup.open(taskDetailContainerWindow);
	});

	self.open();

	if(username && api_key) {
		companyView.fireEvent('loggedIn');
	} else {
		authContainerWindow.open({modal: true});
	}

	return self;
}

module.exports = ApplicationWindow;
