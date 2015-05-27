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

  // Password (check only done on server, to deal with client re-validation).
  password: Ember.attr(/* String */),
  
  // Confirmation for Password (check only done on server)
  password_confirmation: Ember.attr(/* String */)
});

App.LadderUser.url = '/api/ladder_users';
App.LadderUser.rootKey = 'ladder_user';
App.LadderUser.collectionKey = 'ladder_users';
App.LadderUser.adapter = Ember.RESTAdapter.create();
App.LadderUser.camelizeKeys = true;

App.LadderUser.ScoreInitial = 1500;

