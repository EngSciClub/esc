App.NavBarComponent = Ember.Component.extend({
  tagName: 'ul',
  classNameBindings: ['expanded'],

  actions: {
    selectRoute: function(route) {
      this.sendAction('action', route);
      return false;
    }
  }
});

App.NavLinkComponent = Ember.Component.extend({
  tagName: 'li',
  classNameBindings: ['active', 'expanded'],

  actions: {
    selectRoute: function(route) {
      this.sendAction('action', route);
      return false;
    },

    expand: function() {
      this.toggleProperty('expanded');
      return false;
    }
  },

  active: function() {
    var current = this.get('currentPath');
    var linkRoute = this.get('route.route');
    return current.indexOf(linkRoute) === 0;
  }.property('currentPath'),

  init: function() {
    this._super.apply(this, arguments);
    if (this.get('active')) {
      this.set('expanded', true);
    }
  },

  click: function() {
    if (this.get('expandable') && !Ember.isEmpty(this.get('route.routes')) &&
        (this.get('active') || !this.get('expanded'))) {
      this.toggleProperty('expanded');
    } else {
      this.sendAction('action', this.get('route.route'));
    }

    return false;
  }
});