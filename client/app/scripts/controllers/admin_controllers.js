require('scripts/models/dance_registrants');
require('scripts/controllers/base_controllers');

App.AdminIndexController = App.Controller.extend({
});

App.AdminDanceController = App.ObjectController.extend({
  registrantChanged: true,
  formButtonLoading: false,

  actions: {
    checkOrActivate: function() {
      if (this.get('registrantChanged')) {
        var model = this.get('model');
        model.validate();
        if (Ember.isNone(this.get('errors'))) {
          this.set('formButtonLoading', true);
          model.checkTicketPricing().then(function(data) {
            this.set('registrantChanged', false);
            this.set('formButtonLoading', false);
          });
        }
      } else {

      }
    }
  },

  observesRegistrant: function() {
    this.set('registrantChanged', true);
  }.observes('model.name', 'model.email', 'model.ticketNumber', 'model.year')
});