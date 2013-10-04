require('scripts/mixins/animations');

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

App.NavLinkComponent = Ember.Component.extend(App.Collapsable, {
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

  hierarchyActive: function() {
    var current = this.get('currentPath');
    var linkRoute = this.get('route.route');
    return current.indexOf(linkRoute) === 0;
  }.property('currentPath'),

  active: function() {
    var current = this.get('currentPath');
    var linkRoute = this.get('route.route');
    return current === linkRoute || current === linkRoute + '.index';
  }.property('currentPath'),

  init: function() {
    this._super.apply(this, arguments);
    if (this.get('hierarchyActive')) {
      this.set('expanded', true);
    }
  },

  onChangedRoute: function() {
    if (this.get('hierarchyActive')) {
      this.set('expanded', true);
    }
  }.observes('hierarchyActive'),

  click: function() {
    if (this.get('route.expandable') && !Ember.isEmpty(this.get('route.routes')) &&
        (this.get('active') || !this.get('expanded'))) {
      this.toggleProperty('expanded');
    } else {
      this.sendAction('action', this.get('route.route'));
    }

    return false;
  }
});