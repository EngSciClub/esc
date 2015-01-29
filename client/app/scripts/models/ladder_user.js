require('scripts/models/base_model');

App.LadderUser = Ember.Model.extend(Ember.Validator.ValidatesModel, {
  id: Ember.attr(Number),
  createdAt: Ember.attr(Date),


  /* Meta */

  // Full name
  name: Ember.attr(/* String */),
  validatesName: Ember.validates('name', Ember.Validator.notEmpty),

	//Username used for displaying scores
  username: Ember.attr(/* String */),
  validatesUsername: Ember.validates('username', Ember.Validator.notEmpty),

  // Email address used when signing up.
  email: Ember.attr(/* String */),
  validatesEmail: Ember.validates('email', Ember.Validator.notEmpty, function(property, forced) {
    var email = this.get('email') || '';
    this.set('errors.email', null);
		if (forced && email.indexOf('@mail.utoronto.ca') < 0) {
      this.set('errors.email', {
        message: 'Users must use utoronto email.',
        css: 'error'
      });
      return false;
    }
    return true;
  }),

  // Password (not stored on client and not passed from server).
  password: Ember.attr(/* String */),

  /* Registrant Information */

  userScore: Ember.attr(Number)
	
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
App.LadderUser.rootKey = 'ladder_users';
App.LadderUser.collectionKey = 'ladder_usesrs';
App.LadderUser.adapter = Ember.RESTAdapter.create();
App.LadderUser.camelizeKeys = true;

App.LadderUser.ScoreInitial = 2500;

