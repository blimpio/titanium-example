function TaskDetailView() {

    var self = Ti.UI.createView({
        backgroundColor:'white'
    });

    var titleLabel = Ti.UI.createLabel({
        width: 300,
        top: 50
    });

    self.add(titleLabel);

    self.addEventListener('taskSelected', function(e) {
        titleLabel.text = e.task.title;
    });

    return self;
}

module.exports = TaskDetailView;
