function TaskView() {

    var self = Ti.UI.createView({
        backgroundColor:'white'
    });

    var table = Ti.UI.createTableView();

    self.add(table);


    self.addEventListener('goalSelected', function(e) {
        var url = Ti.App.Properties.getString('blimp_url') + '/task/?goal=' + e.goal_id;

        var username = Ti.App.Properties.getString('blimpUsername');
        var api_key = Ti.App.Properties.getString('blimpApiKey');
        var app_id = Ti.App.Properties.getString('blimp_app_id');

        var client = Ti.Network.createHTTPClient({
            onload : function(e) {
                var data = JSON.parse(this.responseText);
                var tableData = [];

                for(var i = 0; i < data['meta']['total_count']; i++) {
                    var task = data['objects'][i];
                    tableData.push({title: task.title, task: task, hasChild: true});
                }

                table.setData(tableData);

            },
            onerror : function(e) {
                Ti.API.debug(e.error);
                alert('error');
            },
            timeout : 5000
        });

        client.open("GET", url);

        client.setRequestHeader('Content-Type', 'application/json');
        client.setRequestHeader('Authorization', 'ApiKey ' + username + ':' + api_key);
        client.setRequestHeader('X_BLIMP_APPID', app_id);

        client.send();

        table.addEventListener('click', function(e) {
            self.fireEvent('taskSelected', {
                name: e.rowData.title,
                task: e.rowData.task
            });
        });
    });

    return self;
}

module.exports = TaskView;
