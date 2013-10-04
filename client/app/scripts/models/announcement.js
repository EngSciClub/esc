App.Announcement = Ember.Model.extend({
  id: Ember.attr(),
  title: Ember.attr(),
  body: Ember.attr(),
  createdAt: Ember.attr(Date),
  updatedAt: Ember.attr(Date),
  owner: Ember.belongsTo('App.User', { key: 'owner', embedded: false }),
  comments: Ember.hasMany('App.Comment', { key: 'comments', embedded: true })
});

App.Announcement.url = 'api/announcements';
App.Announcement.adapter = Ember.FixtureAdapter.create();

App.Announcement.FIXTURES = [
];
