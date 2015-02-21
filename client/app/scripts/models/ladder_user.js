require('scripts/models/base_model');

App.LadderUser = Ember.Model.extend(Ember.Validator.ValidatesModel, {
  id: Ember.attr(Number),
  createdAt: Ember.attr(Date),
  points: Ember.attr(Number),
  matchesPlayed: Ember.attr(Number),
  wins: Ember.attr(Number),

  /* Meta */

  // Full name
  name: Ember.attr(/* String */),
  validatesName: Ember.validates('name', Ember.Validator.notEmpty),

	//Username used for displaying scores
  username: Ember.attr(/* String */),
  validatesUsername: Ember.validates('username', Ember.Validator.notEmpty),

  // Email address used to send match notifications.
  email: Ember.attr(/* String */),
  validatesEmail: Ember.validates('email', Ember.Validator.notEmpty, function(property, forced) {
    var email = this.get('email') || '';
    this.set('errors.email', null);
		if (forced && email.indexOf('@mail.utoronto.ca') < 0) {
      this.set('errors.email', {
        message: 'Users must use their UToronto email.',
        css: 'error'
      });
      return false;
    }
    return true;
  }),

  // Password (not stored on client and not passed from server).
  password: Ember.attr(/* String */),
  //validatesPassword: Ember.validates('password', Ember.Validator.notEmpty),

  // Confirmation for Password (not storred on client)
  password_confirmation: Ember.attr(/* String */),
  //validatesPasswordConfirmation: Ember.validates('password_confirmation', Ember.Validator.notEmpty),

  /* Registrant Information */
	
/* Initial functions if Necessary*/
});


App.LadderUser.reopenClass({
  /*optionalFunction: function() {
    return this.adapter.ajax(this.url + '/early_bird_remaining').then(function(data) {
      if (Ember.isNone(data) || Ember.isNone(data.remaining)) {
        throw 'Cannot fetch remaining count.';
      }

      return data.remaining;
    });
  }*/
});

App.LadderUser.url = '/api/ladder_users';
App.LadderUser.rootKey = 'ladder_user';
App.LadderUser.collectionKey = 'ladder_users';
App.LadderUser.adapter = Ember.RESTAdapter.create();
App.LadderUser.camelizeKeys = true;

App.LadderUser.ScoreInitial = 1500;

