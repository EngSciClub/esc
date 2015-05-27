require('scripts/models/base_model');

App.LadderMatch = Ember.Model.extend(Ember.Validator.ValidatesModel, {
  id: Ember.attr(Number),
  createdAt: Ember.attr(Date),

  // Full name
  player1: Ember.attr(/* String */),
  validatesPlayer1: Ember.validates('player1', Ember.Validator.notEmpty),

  //Username used for displaying scores
  player2: Ember.attr(/* String */),
  validatesPlayer2: Ember.validates('player2', Ember.Validator.notEmpty),
  
  //Date of Match - passed directly to server, as Ember Model/Validator has some issues with validation of dates
  date_of_match: Ember.attr(/* String */),
  
  // Email address used when signing up.
  winner: Ember.attr(/* String */),
  
  // Password (verification done on server).
  password: Ember.attr(/* String */)
});

App.LadderMatch.url = '/api/ladder_matches';
App.LadderMatch.rootKey = 'ladder_match';
App.LadderMatch.collectionKey = 'ladder_matches';
App.LadderMatch.adapter = Ember.RESTAdapter.create();
App.LadderMatch.camelizeKeys = true;

