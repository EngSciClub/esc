Ember.RESTAdapter.reopen({
  buildURL: function() {
    var url = this._super.apply(this, arguments);
    return url.substring(0, url.length - '.json'.length);
  }
});