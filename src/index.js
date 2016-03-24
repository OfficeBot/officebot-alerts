var angular = require('angular');
var moduleName = 'officebotAlertsModule';

/**
	* @namespace Alerts
	* @requires angular
	*/
angular
	.module(moduleName, [])
	.service('officebotAlerts', require('./alerts.service.js'))
	.directive('officebotAlertsPane', require('./alerts.directive.js'));

module.exports = moduleName;