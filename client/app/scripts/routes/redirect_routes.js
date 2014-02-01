App.RedirectRoute = Ember.Route.extend({
  redirect: function() { this.transitionTo('index'); }
});

App.RedirectDanceRoute = Ember.Route.extend({
  redirect: function() { this.transitionTo('events.dance'); }
});

App.RedirectDanceRegisterRoute = Ember.Route.extend({
  redirect: function() { this.transitionTo('events.dance.register'); }
});

App.RedirectNocturneRoute = Ember.Route.extend({
  redirect: function() { this.transitionTo('events.nocturne'); }
});
