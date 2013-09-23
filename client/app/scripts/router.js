var r = function(route, name, icon, path, routes) {
  return {
    route: route,
    path: Ember.isNone(path) ? route : path,
    name: name,
    icon: icon,
    routes: routes
  };
};

App.routes = [
  r('index', 'Announcements', 'icon-bullhorn', '/'),
  r('about', 'About', 'icon-info-sign'),
  r('events', 'Events', 'icon-calendar', null, [
    r('socials', 'Weekly Socials', ''),
    r('smoker', 'Book Smoker', null),
    r('dance', 'Dinner Dance', null, 'dinnerdance', [
      r('register', 'Registration', null),
      r('sponsors', 'Sponsors', null)
    ]),
    r('foosball', 'Foosball Ladder', null),
    r('smash', 'Smash Ladder', null)
  ]),
  r('sports', 'Intramural Sports', 'icon-trophy'),
  r('merchandise', 'Merchandise', 'icon-tag'),
  r('suggestions', 'Suggestions', 'icon-pencil'),
  r('courses', 'Anti-Calendar', 'icon-book')
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
