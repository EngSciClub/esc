App.Comment = Ember.Model.extend({
  id: Ember.attr(),
  body: Ember.attr()
});

App.Comment.url = 'api/comments';
App.Comment.adapter = Ember.FixtureAdapter.create();