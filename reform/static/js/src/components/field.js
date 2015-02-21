var React = require('react');
var templateManager = require('../template-manager.js');


// Load default field templates
var CharField = require('./widgets/templates/char_field.js');
var TextField = require('./widgets/templates/text_field.js');
var EmailField = require('./widgets/templates/email_field.js');
var URLField = require('./widgets/templates/url_field.js');
var BooleanField = require('./widgets/templates/boolean_field.js');
var IntegerField = require('./widgets/templates/integer_field.js');
var DecimalField = require('./widgets/templates/decimal_field.js');
var DateTimeField = require('./widgets/templates/datetime_field.js');
var DateField = require('./widgets/templates/date_field.js');
var TimeField = require('./widgets/templates/time_field.js');
var SelectField = require('./widgets/templates/select_field.js');
var RadioSelectField = require('./widgets/templates/radio_select_field.js');


// Register default field templates
templateManager.registerFieldTemplate('char', CharField);
templateManager.registerFieldTemplate('text', TextField);
templateManager.registerFieldTemplate('email', EmailField);
templateManager.registerFieldTemplate('url', URLField);
templateManager.registerFieldTemplate('boolean', BooleanField);
templateManager.registerFieldTemplate('integer', IntegerField);
templateManager.registerFieldTemplate('decimal', DecimalField);
templateManager.registerFieldTemplate('date_time', DateTimeField);
templateManager.registerFieldTemplate('date', DateField);
templateManager.registerFieldTemplate('time', TimeField);
templateManager.registerFieldTemplate('select', SelectField);
templateManager.registerFieldTemplate('radio_select', RadioSelectField);
