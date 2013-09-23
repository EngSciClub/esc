App.User = Ember.Model.extend({
  id: Ember.attr(),
  name: Ember.attr(),
  type: Ember.attr()
});

App.Announcement.url = 'api/users';
App.Announcement.adapter = Ember.FixtureAdapter.create();
