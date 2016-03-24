/**
	* @name alertsDirective
	* @desc Simple directive to bind the server and DOM together
	* @memberof Alerts
	* @namespace Alerts.Directive
	* @param {provider} alerts
	* @returns {this}
	*/
module.exports = function alertsDirective(officebotAlerts) {
	'use strict';
	'ngInject';

	var tmpl = "<div class='officebot-alerts-container bottom'> \
		<div ng-repeat='alert in _alertVM.alerts' class='col-xs-12 col-sm-4 col-sm-offset-8 single-alert' ng-class='{\"done\" : alert.isDone}'> \
			<div class='alert alert-dismissible' ng-class='alert.alertClass' role='alert'> \
				<button type='button' class='close' ng-click='_alertVM.dismiss(alert)' aria-label='Close'><span aria-hidden='true'>&times;</span></button> \
				<strong ng-show='alert.title'>{{alert.title}} </strong>{{alert.message || '???'}} \
			</div> \
		</div> \
	</div>";

	return {
		restrict : 'AE',
		template : tmpl,
		controller : function($rootScope, $interval) {
			var vm = this || {};
			vm.alerts = [];
			vm.dismiss = dismiss;
			$rootScope.$on('alerts.new', onNewAlert);
			return vm;

			function dismiss(alert) {
				alert.isDone = true;
			}

			function onNewAlert(event, newAlert) {
				vm.alerts.push(newAlert);
			}
		},
		controllerAs : '_alertVM'
	}
};