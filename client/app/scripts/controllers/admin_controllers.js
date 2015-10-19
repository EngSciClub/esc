require('scripts/models/dance_registrants');
require('scripts/controllers/base_controllers');

App.AdminDanceController = App.ObjectController.extend({
  earlyBirdRemaining: null,
  froshDiscountRemaining: null,
  ticketPrice: null,

  registrantChanged: true,

  formButtonLoading: false,
  formButtonDisabled: function() {
    // Disable the form button during loading and if there are validations to fix.
    return this.get('formButtonLoading') || !Ember.isNone(this.get('model.errors'));
  }.property('formButtonLoading', 'model.errors'),

  info: Ember.Object.extend({
    visible: false,
    good: false,
    error: false,
    neutral: function() {
      return !this.get('good') && !this.get('error');
    }.property('good', 'error'),

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

  oldModel: null,

  actions: {
    checkOrActivate: function() {
      var self = this;
      var model = self.get('model');

      // Perform client side validations.
      model.validate();
      if (!Ember.isNone(model.get('errors'))) {
		self.get('info').show('error');
        return;
      }

      // Remove the previous model, we're registering someone else now
      // and don't need the information anymore.
      self.set('oldModel', null);

      // Begin the loader as we make requests.
      self.set('formButtonLoading', true);
      self.get('info').hide();

      // Check if we need to check price or just activate.
      var promise;
      if (self.get('registrantChanged')) {
        // Fetch the number of early bird tickets remaining, for reference.
        App.DanceRegistrant.getEarlyBirdRemaining().then(function(remaining) {
          self.set('earlyBirdRemaining', remaining);
        });
        
        App.DanceRegistrant.getFroshDiscountsRemaining().then(function(remaining){ // barryklfung - added reference to frosh discounts remaining
		  self.set('froshDiscountsRemaining', remaining);
		});

        promise = model.checkTicketPricing().then(function(data) {
          self.set('ticketPrice', data.price);
          self.set('registrantChanged', false);
          self.get('info').show();
        });
      } else {
        promise = model.save().then(function(data) {
          self.set('oldModel', self.get('model'));
          self.set('model', App.DanceRegistrant.create({}));
          self.set('registrantChanged', true);
          self.get('info').show('good');
			
		  App.DanceRegistrant.getFroshDiscountsRemaining().then(function(remaining){ //KLBF added separate frosh counters
			  self.set('froshDiscountsRemaining', remaining > 0 ? remaining : null);
		  });
		  App.DanceRegistrant.getEarlyBirdRemaining().then(function(remaining) {
		      self.set('earlyBirdRemaining', remaining > 0 ? remaining : null);
		  });
		  /*(if (self.get('oldModel').get('year') === '1T9'){ //KLBF separate earlybird from frosh
			if (self.get('froshDiscountsRemaining') > 0){
				self.decrementProperty('froshDiscountsRemaining');
			}
		  }
          else if (self.get('earlyBirdRemaining') > 0){
            self.decrementProperty('earlyBirdRemaining');
          }*/
        });
      }

      // Apply errors on failure.
      promise.fail(model.applyErrors()).then(function() {
        if (!Ember.isNone(model.get('errors'))) {
          self.get('info').show('error');
        }

        // We're done now so stop loading.
        self.set('formButtonLoading', false);
      });
    }
  },

  observesRegistrant: function() {
    this.get('info').hide();
    this.set('registrantChanged', true);
  }.observes('model.name',
             'model.email',
             'model.ticketNumber',
             'model.year',
             'model.phone')
});
