App.ControllerCurrentRoute = Ember.Mixin.create({
  concatenatedProperties: ['needs'],
  needs: ['application'],

  currentRoute: function() {
    var current = this.get('controllers.application.currentPath');
    return App.routes.find(function(route) {
      var index = current.indexOf('index');
      return route.route === current ||
        (index > 0 && current.substring(0, index - 1) === route.route);
    });
  }.property('controllers.application.currentPath')
});