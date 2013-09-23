var r = function(route, name, path, routes) {
  return {
    route: route,
    path: Ember.isNone(path) ? route : path,
    name: name,
    routes: routes
  };
};

App.routes = [
  r('index', 'Announcements', '/'),
  r('about', 'About'),
  r('events', 'Events', null, [
    r('socials', 'Weekly Socials'),
    r('smoker', 'Book Smoker'),
    r('dance', 'Dinner Dance', 'dinnerdance', [
      r('register', 'Registration'),
      r('sponsors', 'Sponsors')
    ]),
    r('foosball', 'Foosball Ladder'),
    r('smash', 'Smash Ladder')
  ]),
  r('sports', 'Intramural Sports'),
  r('merchandise', 'Merchandise'),
  r('suggestions', 'Suggestions'),
  r('courses', 'Anti-Calendar')
];

App.Router.map(function() {
  // Recursively build routes.
  var buildRoutes = function(self, list, parentRoute, parentPath) {
    parentRoute = Ember.isNone(parentRoute) ? '' : parentRoute + '.';
    parentPath = Ember.isNone(parentPath) ? '' : parentPath + '/';

    list.forEach(function(route) {
      var path = route.path;
      var longPath = parentPath + path;
      var longRoute = parentRoute + route.route;

      // If there are subroutes recurse and build each subroute.
      if (!Ember.isNone(route.routes) && route.routes.length > 0) {
        this.resource(longRoute, { path: path }, function() {
          buildRoutes(this, route.routes, longRoute, longRoute);
        });

      } else {
        this.route(route.route, { path: path });
      }

      // Modify the current route to include the parent name.
      route.route = longRoute;
      route.path = longPath;
    }, self);
  };
  buildRoutes(this, App.routes);

  // Catch-all for 404 handling.
  this.route('none', { path: '*path' });
});
