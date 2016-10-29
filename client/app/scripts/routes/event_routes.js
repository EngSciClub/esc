App.EventsLadderIndexRoute = App.ApplicationRoute.extend({
  setupController: function(controller, model) {
    this._super.apply(this, arguments);
    var users = App.LadderUser.find();
    controller.set('ladderUsers', users);
  }
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
