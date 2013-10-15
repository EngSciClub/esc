require('scripts/models/base_model');

App.DanceRegistrant = Ember.Model.extend(Ember.Validator.ValidatesModel, {
  id: Ember.attr(),
  createdAt: Ember.attr(Date),


  /* Meta */

  // Full name
  name: Ember.attr(/* String */),
  validatesName: Ember.validates('name', Ember.Validator.notEmpty),

  // Phone number
  phone: Ember.attr(/* String */),

  // Email address used when signing up.
  email: Ember.attr(/* String */),
  validatesEmail: Ember.validates('email', Ember.Validator.notEmpty, function(property, forced) {
    var year = this.get('year') || '';
    var email = this.get('email') || '';
    if (forced && year === '1T7' && email.indexOf('@mail.utoronto.ca') < 0) {
      this.set('errors.email', {
        message: 'F!rosh must use utoronto email.',
        css: 'error'
      });
      return false;
    }

    this.set('errors.email', null);
    return true;
  }),

  // Year (1T7, 1T6, 1T5, 1T4, PEY, 1T3+PEY, Guest)
  year: Ember.attr(/* String */),
  validatesYear: Ember.validates('year', Ember.Validator.notEmpty),

  // Password (not stored on client and not passed from server).
  password: Ember.attr(/* String */),

  // The id admin who registered the user.
  registeredBy: Ember.belongsTo(App.Admin, { key: 'registered_by_id', embedded: false}),

  // The ticket number.
  ticketNumber: Ember.attr(Number),
  validatesTicketNumber: Ember.validates('ticketNumber', Ember.Validator.notEmpty, function(property, forced) {
    var number = this.get('ticketNumber');
    if (isNaN(window.parseInt(number, 10)) || number <= 0 || number > 350) {
      this.set('errors.ticketNumber', {
        message: 'Invalid ticket number.',
        css: 'error'
      });
      return false;
    }

    this.set('errors.ticketNumber', null);
    return true;
  }),


  /* Registrant Information */

  // User's dietary restrictions.
  dietaryRestrictions: Ember.attr(/* String */),

  // If the user is of age or not.
  isOver19: Ember.attr(/* Boolean */),

  // If the user is early bird (calculated by server).
  isEarlyBird: Ember.attr(/* Boolean */),

  // Amount paid.
  amountPaid: Ember.attr(Number),

  // Which entree the user has chosen.
  entreeChoice: Ember.attr(/* String */),

  // Which table number the user has chosen.
  tableNumber: Ember.attr(Number),


  /* Methods */

  // Gets the ticket price for this user, based on the entered information.
  checkTicketPricing: function() {
    var adapter = this.constructor.adapter;
    var url = this.constructor.url;
    return adapter.ajax(url + '/check_price', this.toJSON());
  }
});


App.DanceRegistrant.reopenClass({
  getEarlyBirdRemaining: function() {
    return this.adapter.ajax(this.url + '/early_bird_remaining').then(function(data) {
      if (Ember.isNone(data) || Ember.isNone(data.remaining)) {
        throw 'Cannot fetch remaining count.';
      }

      return data.remaining;
    });
  }
});

App.DanceRegistrant.url = '/api/dance_registrants';
App.DanceRegistrant.rootKey = 'dance_registrant';
App.DanceRegistrant.collectionKey = 'dance_registrants';
App.DanceRegistrant.adapter = Ember.RESTAdapter.create();
App.DanceRegistrant.camelizeKeys = true;

App.DanceRegistrant.yearList = [
  '1T7', '1T6', '1T5', '1T4', 'PEY', '1T3+PEY', 'Guest'
];
