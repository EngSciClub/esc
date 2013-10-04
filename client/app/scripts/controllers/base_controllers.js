require('scripts/mixins/current_route');
require('scripts/mixins/current_admin');

App.Controller = Ember.Controller.extend(
    App.CurrentRoute,
    App.CurrentAdmin);

App.ArrayController = Ember.ArrayController.extend(
    App.CurrentRoute,
    App.CurrentAdmin);

App.ObjectController = Ember.ObjectController.extend(
    App.CurrentRoute,
    App.CurrentAdmin);
