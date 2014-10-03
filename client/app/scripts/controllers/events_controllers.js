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
  email: '',
  ticketNumber: '',
  mealOptions: ['MAIN - Grilled Beef Tenderloin', 'VEGAN - Vegetable Ratatouille'],

  info: Ember.Object.extend({
    visible: false,
    good: false,
    error: false,

    show: function(type) {
      this.set('visible', true);
      this.set('good', type === 'good');
      this.set('error', type === 'error');
    },

    hide: function() {
      this.set('visible', false);
      this.set('good', false);
      this.set('error', false);
    }
  }).create(),

  fetchTablesAndUserPromise: function() {
    var self = this;
    return App.DanceTable.fetch({}).then(function(data) {
      self.set('tables', data);
      return App.DanceRegistrant.fetch({
        'email': self.get('email'),
        'ticket_number': self.get('ticketNumber')
      });
    });
  },

  resolveRegistrantFromData: function() {
    var self = this;
    return function(data) {
      self.set('registrant', data.get('firstObject'));
      self.set('registrantChanged', false);
    };
  },

  preferencesDisabled: function() {
    //return true;
    return this.get('preferencesLoading') || !this.get('registrantChanged');
  }.property('preferencesLoading', 'registrantChanged'),

  actions: {
    activateUser: function() {
      var self = this;
      self.set('loginErrors', false);
      self.set('loginLoading', true);

      self.fetchTablesAndUserPromise().then(function(data) {
        self.set('loginLoading', false);
        if (Ember.isEmpty(data)) {
          // Ticket not activated.
          self.set('loginErrors', true);
        } else {
          self.resolveRegistrantFromData()(data);
        }
      });
    },

    logout: function() {
      this.set('registrant', null);
      this.set('email', '');
      this.set('ticketNumber', '');
    },

    savePreferences: function() {
      var self = this;
      self.get('info').hide();
      self.set('preferencesLoading', true);

      self.get('registrant').save().then(function(data) {
        return self.fetchTablesAndUserPromise();
      }).then(self.resolveRegistrantFromData()).then(function(data) {
        self.get('info').show('good');
      }, function(reason) {
        self.get('info').show('error');
      }).then(function(data) {
        self.set('preferencesLoading', false);
      });
    },

    toggleRegistered: function() {
      this.toggleProperty('registered');
    },

    toggleOver19: function() {
      this.toggleProperty('registrant.isOver19');
    },

    changeTable: function(newTableId) {
      var registrant = this.get('registrant');
      var tables = this.get('tables');

      var oldTableId = registrant.get('tableNumber');
      var oldTable = tables.findBy('id', oldTableId);
      var newTable = tables.findBy('id', newTableId);

      // Remove registrant from old table.
      if (!Ember.isNone(oldTable)) {
        oldTable.get('registrants').removeObject(registrant);
      }
      newTable.get('registrants').pushObject(registrant);
      registrant.set('tableNumber', newTableId);
    }
  },

  observesFormChanges: function() {
    this.get('info').hide();
    this.set('registrantChanged', true);
  }.observes('registrant.tableNumber',
             'registrant.entreeChoice',
             'registrant.isOver19',
             'registrant.dietaryRestrictions')
});
