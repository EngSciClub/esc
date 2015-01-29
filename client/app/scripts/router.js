var r = function(route, name, options) {
  options = options || {};

  return {
    route: route,
    name: name,
    path: options.path || route,
    icon: options.icon || null,
    routes: options.routes || null,
    expandable: Ember.isNone(options.expand) ? true : options.expand,
    hidden: options.hidden || false
  };
};

App.routes = [
  // Redirects
  r('redirect', '', { hidden: true }),
  r('redirect.dance', '', { path: '/dinnerdance', hidden: true }),
  r('redirect.dance.register', '', { path: '/dinnerdance/register', hidden: true }),
  r('redirect.nocturne', '', { path: '/nocturne', hidden: true }),

  r('index', 'Announcements', { icon: 'icon-bullhorn', path: '/' }),
  r('about', 'About', { icon: 'icon-info-sign' }),
//  r('history', 'History', { icon: 'icon-time', hidden: true }),
  r('events', 'Events', { icon: 'icon-calendar', routes: [
    r('socials', 'Friday Night Socials'),
    r('nocturne', 'Nocturne'),
		r('ladder', 'Ladder', { path: 'ladder', expand: false, routes: [
      r('index', '', { path: '/' }),
      r('register', 'Registration'),
			r('submit', 'Match Submission')
		]}),

//    r('smoker', 'Book Smoker', { hidden: true }),
    r('dance', 'Dinner Dance', { path: 'dinnerdance', expand: false, routes: [
      r('index', '', { path: '/' }),
      r('register', 'Registration')
    ]})
//    r('skitrip', 'Ski Trip', { hidden: true }),
//    r('kart', 'Mario Kart Ladder', { hidden: true }),
//    r('foosball', 'Foosball Ladder', { hidden: true }),
//    r('smash', 'Smash Ladder', { hidden: true })
  ]}),
//  r('sports', 'Intramural Sports', { icon: 'icon-trophy', hidden: true }),
  r('merchandise', 'Merchandise', { icon: 'icon-tag', hidden: true }),
  r('suggestions', 'Suggestions', { icon: 'icon-pencil', hidden: true }),
//  r('found', 'Lost and Found', { icon: 'icon-archive', hidden: true }),
//  r('courses', 'Anti-Calendar', { icon: 'icon-book', hidden: true }),
  r('admin', 'Exec Login', { icon: 'icon-key', expand: false, routes: [
    r('dance', 'Dinner Dance', { path: 'dinnerdance' })
  ]}),

  r('none', '404', { path: '*path', hidden: true })
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
});

App.Router.reopen({
  location: 'auto',
  didTransition: function() {
    this._super.apply(this, arguments);
    if (!Ember.isNone(window._gaq)) {
      Ember.run.next(function() {
        var page = window.location.hash.length > 0 ? window.location.hash.substring(1) : window.location.pathname;
        window._gaq.push(['_trackPageview'], page);
      });
    }
  }.observes('currentPath')
});
