App.EventsLadderRegisterRoute = App.ApplicationRoute.extend({
  setupController: function(controller, model) {
    this._super.apply(this, arguments);

    var registrant = controller.get('model');
    if (Ember.isNone(registrant)) {
      registrant = App.LadderUser.create();
      controller.set('model', registrant);
    }
  }
});
