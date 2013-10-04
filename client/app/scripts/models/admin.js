App.Admin = Ember.Model.extend({
  id: Ember.attr(),
  email: Ember.attr(),
  access: Ember.attr(),
});

App.Admin.url = '/api/admins';
App.Admin.adapter = Ember.FixtureAdapter.create();
App.Admin.camelizeKeys = true;

App.Admin.FIXTURES = [
];