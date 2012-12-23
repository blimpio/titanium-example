function AuthView() {

    var self = Ti.UI.createView({
        backgroundColor:'white'
    });

    var usernameField = Ti.UI.createTextField({
        autocorrect: false,
        autocapitalization: Titanium.UI.TEXT_AUTOCAPITALIZATION_NONE,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: '#444444',
        height: 35,
        hintText: 'Username',
        top: 20,
        width: 300
    });

    self.add(usernameField);

    var apiKeyField = Ti.UI.createTextField({
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        color: '#444444',
        height: 35,
        hintText: 'API Key',
        top: 65,
        width: 300
    });

    self.add(apiKeyField);

    usernameField.addEventListener('change', function(e) {
        Ti.App.Properties.setString('blimpUsername', usernameField.value);
    });

    apiKeyField.addEventListener('change', function(e) {
        Ti.App.Properties.setString('blimpApiKey', apiKeyField.value);
    });

    return self;
}

module.exports = AuthView;
