App.RedirectDanceRoute = Ember.Route.extend({
  redirect: function() { this.transitionTo('events.dance'); }
});