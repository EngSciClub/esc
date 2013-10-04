App.AdminIndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('admin.dance');
  }
});

App.AdminDanceRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var existingModel = controller.get('model');
    if (Ember.isNone(existingModel)) {
      controller.set('model', App.DanceRegistrant.create({}));
    }
  }
});
