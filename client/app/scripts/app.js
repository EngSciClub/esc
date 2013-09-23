$(function() {
  FastClick.attach(document.body);
})

var App = window.App = Ember.Application.create();

/* Order and include as you please. */
require('scripts/controllers/*');
require('scripts/models/*');
require('scripts/routes/*');
require('scripts/components/*');
require('scripts/views/*');
require('scripts/router');
