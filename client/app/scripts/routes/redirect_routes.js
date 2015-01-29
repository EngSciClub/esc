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

App.RedirectLadderRoute = Ember.Route.extend({
	redirect: function() { this.transitionTo('events.ladder'); }
});

App.RedirectLadderRegisterRoute = Ember.Route.extend({
	redirect: function() { this.transitionTo('events.ladder.register'); }
});

App.RedirectLadderSubmitRoute = Ember.Route.extend({
	redirect: function() { this.transitionTo('events.ladder.submit'); }
});
