App.ApplicationController = Ember.Controller.extend({
  sidebarExpanded: false,

  actions: {
    selectRoute: function(route) {
      this.transitionToRoute(route);
      this.set('sidebarExpanded', false);
    },

    toggleSidebar: function() {
      this.toggleProperty('sidebarExpanded');
    }
  }
});