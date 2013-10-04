App.CurrentAdmin = Ember.Mixin.create({
  concatenatedProperties: ['needs'],
  needs: ['application'],

  currentAdmin: Ember.computed.alias('controllers.application.admin')
});