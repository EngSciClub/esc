App.DanceTableComponent = Ember.Component.extend({
  tagName: 'table',

  spacer: function() {
    var registrants = this.get('table.registrants');
    var count = 8;
    if (!Ember.isNone(registrants)) {
      count -= registrants.get('length');
    }

    var spacer = [];
    for (var i = 0; i < count; i++) {
      spacer.push('');
    }

    return spacer;
  }.property('table.registrants.@each'),

  click: function() {
    var registrants = this.get('table.registrants');
    var registrant = this.get('registrant');

    if (!registrants.contains(registrant) && !Ember.isEmpty(this.get('spacer'))) {
      this.sendAction('action', this.get('table.id'));
    }
    return false;
  }
});