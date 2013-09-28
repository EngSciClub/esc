Ember.Handlebars.helper('markdown', function(value, options) {
  return new Ember.Handlebars.SafeString(marked(value));
});