App.DanceTable = Ember.Model.extend({
  id: Ember.attr(Number),
  registrants: Ember.hasMany(App.DanceRegistrant, { key: 'registrants', embedded: true }),

  /* Methods */
  contains: function(registrant) {
    var registrants = this.get('registrants');
    return !Ember.isNone(registrants) || registrants.some(function(item) {
      return registrant.get('id') === item.get('id');
    });
  }
});

App.DanceTable.url = '/api/dance_tables';
App.DanceTable.rootKey = 'dance_table';
App.DanceTable.collectionKey = 'dance_tables';
App.DanceTable.adapter = Ember.RESTAdapter.create();
App.DanceTable.camelizeKeys = true;