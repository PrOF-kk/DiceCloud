import SimpleSchema from 'simpl-schema';
import VARIABLE_NAME_REGEX from '/imports/constants/VARIABLE_NAME_REGEX.js';

let ClassLevelSchema = new SimpleSchema({
	name: {
		type: String,
		optional: true,
	},
  description: {
    type: String,
    optional: true,
  },
	// The name of this class level's variable
	variableName: {
    type: String,
    min: 2,
		regEx: VARIABLE_NAME_REGEX,
  },
	level: {
    type: SimpleSchema.Integer,
		defaultValue: 1,
  },
	nextLevelTags: {
		type: Array,
		defaultValue: [],
	},
	'nextLevelTags.$': {
		type: String,
	},
  // Same as in SlotFillers.js
  slotFillerCondition: {
    type: String,
    optional: true,
  },
});

export { ClassLevelSchema };
