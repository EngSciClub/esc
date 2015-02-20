require('scripts/models/base_model');

App.LadderMatch = Ember.Model.extend(Ember.Validator.ValidatesModel, {
  id: Ember.attr(Number),
  createdAt: Ember.attr(Date),

  /* Meta */

  // Full name
  player1: Ember.attr(/* String */),
  validatesPlayer1: Ember.validates('player1', Ember.Validator.notEmpty),

  //Username used for displaying scores
  player2: Ember.attr(/* String */),
  validatesPlayer2: Ember.validates('player2', Ember.Validator.notEmpty),
  
  //Date of Match
//  date_of_match: Ember.attr(Date),
//  validatesDateOfMatch: Ember.validates('date_of_match', Ember.Validator.notEmpty),
  
  // Email address used when signing up.
  winner: Ember.attr(/* String */),
  //validatesWinner: Ember.validates('winner', Ember.Validator.notEmpty),

  // Password (not stored on client and not passed from server).
  password: Ember.attr(/* String */),
  //validatesPassword: Ember.validates('password', Ember.Validator.notEmpty),

});

App.LadderMatch.url = '/api/ladder_matches';
App.LadderMatch.rootKey = 'ladder_match';
App.LadderMatch.collectionKey = 'ladder_matches';
App.LadderMatch.adapter = Ember.RESTAdapter.create();
App.LadderMatch.camelizeKeys = true;

