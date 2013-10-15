require('scripts/models/base_model');

App.Admin = Ember.Model.extend({
  id: Ember.attr(),
  email: Ember.attr(),
  name: Ember.attr(),
  authorizedRoutes: Ember.attr()
});

App.Admin.reopenClass({
  getCurrent: function() {
    var self = this;

    // TODO(johnliu): Rewrite using root key.
    return this.adapter.ajax(this.url + '/current').then(function(data) {
      if (Ember.isNone(data) || Ember.isNone(data.admin) || Ember.isNone(data.admin.id)) {
        throw 'Could not get the current admin.';
      }

      // Load the admin into the cache and return that record.
      self.load(data.admin);
      var record = self.cachedRecordForId(data.admin.id);
      return record;
    });
  }
});

App.Admin.url = '/api/admins';
App.Admin.rootKey = 'admin';
App.Admin.collectionKey = 'admins';
App.Admin.adapter = Ember.RESTAdapter.create();
App.Admin.camelizeKeys = true;
