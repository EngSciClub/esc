App.CurrentRoute = Ember.Mixin.create({
  concatenatedProperties: ['needs'],
  needs: ['application'],

  routeHierarchy: function() {
    var current = this.get('controllers.application.currentPath');

    // Search all routes until we find a match.
    var findRoute = function(routes) {
      var foundRoutes = [];
      var num = 0;
      var recursiveFind = function(routes) {
        var index = current.indexOf('index');
        routes.some(function(route) {
          if (route.route === current || (index > 0 && current.substring(0, index - 1) === route.route)) {
            foundRoutes.unshift(route);
            return true;
          }

          if (!Ember.isEmpty(route.routes)) {
            num++;
            recursiveFind(route.routes);
            num--;
            if (!Ember.isEmpty(foundRoutes)) {
              foundRoutes.unshift(route);
              return true;
            }
          }

          return false;
        });
      };

      recursiveFind(routes);
      return foundRoutes;
    };

    return findRoute(App.routes);
  }.property('controllers.application.currentPath'),

  currentRoute: function() {
    var routes = this.get('routeHierarchy');
    return routes.get('lastObject');
  }.property('routeHierarchy')
});