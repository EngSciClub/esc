App.DanceRegistrant = Ember.Model.extend(Ember.Validator.ValidatesModel, {
  id: Ember.attr(),
  createdAt: Ember.attr(Date),


  /* Meta */

  // Full name
  name: Ember.attr(/* String */),

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

  // Password (not stored on client and not passed from server).
  password: Ember.attr(/* String */),

  // The id admin who registered the user.
  registeredBy: Ember.belongsTo(App.Admin, { key: 'registered_by', embedded: true}),

  // The ticket number.
  ticketNumber: Ember.attr(Number),
  validatesTicketNumber: Ember.validates('ticketNumber', Ember.Validator.notEmpty),


  /* Registrant Information */

  // User's dietary restrictions.
  dietaryRestrictions: Ember.attr(/* String */),

  // If the user is of age or not.
  isOver19: Ember.attr(/* Boolean */),

  // If the user is early bird (calculated by server).
  isEarlyBird: Ember.attr(/* Boolean */),

  // Which entree the user has chosen.
  entreeChoice: Ember.attr(/* String */),

  // Which table number the user has chosen.
  tableNumber: Ember.attr(Number),


  /* Methods */

  // Gets the ticket price for this user, based on the entered information.
  checkTicketPricing: function() {
    var adapter = this.constructor.adapter;
    return adapter.ajax(url, this.toJSON(), 'POST');
  },
});

App.DanceRegistrant.url = '/api/dance_registrants';
App.DanceRegistrant.adapter = Ember.FixtureAdapter.create();
App.DanceRegistrant.camelizeKeys = true;

App.DanceRegistrant.yearList = [
  '1T7', '1T6', '1T5', '1T4', 'PEY', '1T3+PEY', 'Guest'
];

App.DanceRegistrant.FIXTURES = [
];