/**
 * get_translation method
 * Return object translated in the given language
 */

module.exports = function( model_name ) {
    var self = this;
    return function( lang , options ) {
      let instance = this;
      var attributes = instance.rawAttributes;
      for(var prop in attributes){
        if('i18n' in attributes[prop] && attributes[prop].i18n == true){
          // Get i18n related records
          var model= attributes[prop].Model
          const i18n_name = `${model.name}_i18n`;
          let i18n_record = instance[i18n_name].map(obj => obj.dataValues).filter(v => v.language_id == lang)[0]

          if(i18n_record && i18n_record[prop]){
            instance[prop] = i18n_record[prop]
          }
          delete instance.dataValues[i18n_name];
        }
      }
      return instance;
    }
};
