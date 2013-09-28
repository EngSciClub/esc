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
  {
    id: 1,
    title: 'Hello World!',
    body: 'Just a basic sample announcement.',
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: {
      id: 1
    },
    comments: [
      {
        id: 1,
        body: 'this is a comment'
      },
      {
        id: 2,
        body: 'this is another comment!'
      }
    ]
  },
  {
    id: 2,
    title: 'Hello World!',
    body: 'Just a basic sample announcement.',
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: {
      id: 1
    },
    comments: [
      {
        id: 1,
        body: 'this is a comment'
      },
      {
        id: 2,
        body: 'this is another comment!'
      }
    ]
  },
  {
    id: 3,
    title: 'Hello World!',
    body: 'Just a basic sample announcement.',
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: {
      id: 1
    },
    comments: [
      {
        id: 1,
        body: 'this is a comment'
      },
      {
        id: 2,
        body: 'this is another comment!'
      }
    ]
  },
  {
    id: 4,
    title: 'Hello World!',
    body: 'Just a basic sample announcement.',
    createdAt: new Date(),
    updatedAt: new Date(),
    owner: {
      id: 1
    },
    comments: [
      {
        id: 1,
        body: 'this is a comment'
      },
      {
        id: 2,
        body: 'this is another comment!'
      }
    ]
  },
];
