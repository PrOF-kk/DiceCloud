/**
 * Forms that take in a schema and a model of the current data, manages smart
 * inputs, and sends update events when valid data model changes must occur
 */
import { get, toPath } from 'lodash';

function resolvePath(model, path){
  let arrayPath = toPath(path);
  if (arrayPath.length === 1){
    return { object: model, key: arrayPath[0] };
  }
  let objectPath = arrayPath.slice(0, -1);
  let key = arrayPath.slice(-1);
  let object = get(model, objectPath);
  return {object, key};
};

const schemaFormMixin = {
	data(){ return {
		valid: true,
	};},
	computed: {
		errors(){
			this.valid = true;
			if (!this.model){
				throw new Error("this.model must be set");
			}
			if (!this.validationContext) return {};
			let cleanModel = this.validationContext.clean(this.model, {
				getAutoValues: false,
			});
			this.validationContext.validate(cleanModel);
			let errors = {};
			this.validationContext.validationErrors().forEach(error => {
				if (this.valid) this.valid = false;
				errors[error.name] = this.schema.messageForError(error);
			});
			return errors;
		},
	},
	methods: {
    // Sets the value at the given path
		change({path, value, ack}){
      let {object, key} = resolvePath(this.model, path);
			this.$set(object, key, value);
			if (ack) ack();
		},
    push({path, value, ack}){
      get(this.model, path).push(value);
			if (ack) ack();
    },
    pull({path, ack}){
      let {object, key} = resolvePath(this.model, path);
      object.splice(key, 1);
      if (ack) ack();
    },
	},
};

export default schemaFormMixin;
