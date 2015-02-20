App.EventsLadderIndexRoute = App.ApplicationRoute.extend({
 //TO-DO (barryklfung) (P1) Write Retrieval code for accessing all users
});

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

App.EventsLadderSubmitRoute = App.ApplicationRoute.extend({
  setupController: function(controller, model) {
    this._super.apply(this, arguments);

    var match = controller.get('model');
    if (Ember.isNone(match)) {
      match = App.LadderMatch.create();
      controller.set('model', match);
    }
  }
});
