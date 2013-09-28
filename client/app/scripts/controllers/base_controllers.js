require('scripts/mixins/current_route');

App.Controller = Ember.Controller.extend(
    App.ControllerCurrentRoute);

App.ArrayController = Ember.ArrayController.extend(
    App.ControllerCurrentRoute);

App.ObjectController = Ember.ObjectController.extend(
    App.ControllerCurrentRoute);
