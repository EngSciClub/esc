require('scripts/controllers/base_controllers');

App.IndexController = App.ArrayController.extend({
  content: function() {
    return App.Announcement.find();
  }.property()
});
