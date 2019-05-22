/**
 * get_translation method
 * Return object translated in the given language
 */

module.exports = function( model_name ) {
    var self = this;

    const replace = function(instance, lang){
      const rawAttributes = instance.rawAttributes;
      const attributes = instance.dataValues

      for(var prop_name in attributes){
        // console.log(prop_name);
        if(prop_name in rawAttributes && !Array.isArray(prop_name)){
          // console.log(prop_name);
          const attribute = rawAttributes[prop_name]
          // console.log(attribute);
          const fieldName = attribute.fieldName;
          const model= attribute.Model
          const i18n_name = `${model.name}_i18n`;

          if('i18n' in attribute && attribute.i18n == true){
            let i18n_record = instance[i18n_name].map(obj => obj.dataValues).filter(v => v.language_id == lang)[0]
            if(i18n_record && i18n_record[fieldName]){
              instance[fieldName] = i18n_record[fieldName]
            }
            delete instance.dataValues[i18n_name];
          }
        } else if(Array.isArray(attributes[prop_name]) && !RegExp("_i18n$").test(prop_name)){
          for(var inst of attributes[prop_name]){
            replace(inst, lang)
          }
        }
      }
    }

    return function( lang , options ) {
      let instance = this;
      // var rawAttributes = instance.rawAttributes;
      // var attributes = instance.dataValues
      // for(var prop in attributes){
      replace(instance, lang);
      // }
      return instance;
    }


};
