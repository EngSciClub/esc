App.AdminBaseRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    if (Ember.isNone(controller.get('currentAdmin'))) {
      this.transitionTo('admin.index');
    }
  }
});

App.AdminIndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var self = this;

    if (Ember.isNone(controller.get('currentAdmin'))) {
      App.Admin.getCurrent().then(function(admin) {
        controller.set('currentAdmin', admin);
        self.transitionTo('admin.dance');
      }).fail(function(reason) {
        // Redirect to Google sign in.
        var url = [
          'https://accounts.google.com/o/oauth2/auth',
          '?response_type=code',
          '&client_id=',
          '164438098489.apps.googleusercontent.com',
          '&redirect_uri=',
          window.location.protocol, '//', window.location.host,
          '/auth',
          '&scope=https://www.googleapis.com/auth/userinfo.email',
          '&access_type=offline',
          '&approval_prompt=force'
        ];

        url = url.join('');
        window.location = url;
      });
    } else {
      self.transitionTo('admin.dance');
    }
  }
});

App.AdminDanceRoute = App.AdminBaseRoute.extend({
  setupController: function(controller, model) {
    this._super.apply(this, arguments);

    var registrant = controller.get('model');
    if (Ember.isNone(registrant)) {
      registrant = App.DanceRegistrant.create();
      controller.set('model', registrant);
    }
    var id = 0;
    id = controller.get("currentAdmin").get("id");
    controller.set("admin", App.Admin.find(id).get("admin"));
  }
});
