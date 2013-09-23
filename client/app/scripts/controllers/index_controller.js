App.IndexController = Ember.ArrayController.extend({
  content: function() {
    return App.Announcement.find();
  }.property()
});
