/* Ember Model Validator.
 * author: John Liu
 */

(function() {
  var slice = [].slice;

  Ember.Validator = Ember.Object.create({
    ValidatesModel: Ember.Mixin.create({
      validate: function() {
        this.toggleProperty('_runValidations');
      }
    }),

    notEmpty: function(property) {
      if (Ember.isEmpty(this.get(property))) {
        this.set('errors.' + property, {
          message: "Property '" + property + "' cannot be empty.",
          css: 'error'
        });
        return false;
      }

      this.set('errors.' + property, null);
      return true;
    }
  });

  Ember.validates = function() {
    Ember.assert('There should be at least two arguments.', arguments.length >= 2);
    var property = arguments[0];
    var validators = slice.call(arguments, 1);

    return function() {
      var forced = arguments[1] === '_runValidations';
      if (Ember.isNone(this.get('errors'))) {
        this.set('errors', {});
      }

      for (var i = 0; i < validators.length; i++) {
        Ember.assert('Validator must be a function.', Ember.typeOf(validators[i]) === 'function');
        if (!validators[i].call(this, property, forced)) {
          return;
        }
      }

      // Check if there are any existing errors, otherwise set errors to null.
      var errors = this.get('errors');
      if (Ember.keys(errors).every(function(item) { return Ember.isNone(errors[item]) })) {
        this.set('errors', null);
      }
    }.observes(property, '_runValidations');
  }
})();

