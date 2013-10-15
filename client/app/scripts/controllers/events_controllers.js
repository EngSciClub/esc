require('scripts/controllers/base_controllers');
require('scripts/models/base_controllers');

App.EventsDanceIndexController = App.Controller.extend({
  remaining: null,

  init: function() {
    this._super.apply(this, arguments);

    // Set the number of early bird tickets.
    var self = this;
    App.DanceRegistrant.getEarlyBirdRemaining().then(function(remaining) {
      self.set('remaining', remaining > 0 ? remaining : null);
    });
  }
});

App.EventsDanceRegisterController = App.Controller.extend({
  errors: {},

  actions: {
    activateUser: function() {
      var self = this;
      self.set('errors.has', false);
      self.toggleProperty('loading');
      window.setTimeout(function() {
        self.toggleProperty('loading');

        self.set('errors.has', true);
        if (self.get('registered')) {
          self.set('errors.credentials', true);
          self.set('errors.exists', false);
          self.set('errors.invalid', false);
        } else {
          if (Math.random() > 0.5) {
            self.set('errors.invalid', true);
            self.set('errors.exists', false);
            self.set('errors.credentials', false);
          } else {
            self.set('errors.exists', true);
            self.set('errors.invalid', false);
            self.set('errors.credentials', false);
          }
        }
      }, 1000);
    },

    toggleRegistered: function() {
      this.toggleProperty('registered');
    }
  }
});