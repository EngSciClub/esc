App.RedirectRoute = Ember.Route.extend({
  redirect: function() { this.transitionTo('index'); }
});

App.RedirectDanceRoute = Ember.Route.extend({
  redirect: function() { this.transitionTo('events.dance'); }
});