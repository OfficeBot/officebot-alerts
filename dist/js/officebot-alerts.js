(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/andrew/dev/office-bot/andrew-prior-ob-alerts/officebot-alerts/src/alerts.directive.js":[function(require,module,exports){
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
				<strong ng-show='alert.title'>{{alert.title}} </strong>{{alert.message || ''}} \
				<button type='button' class='close' ng-click='_alertVM.dismiss(alert)' aria-label='Close'>\
					<span aria-hidden='true'></span>\
					<i class=\"material-icons close-icon\">close</i>\
				</button> \
		</div> \
	</div>";

	// var tmpl = "<div class='officebot-alerts-container bottom'> \
	// 	<div ng-repeat='alert in _alertVM.alerts' class='col-xs-12 col-sm-3 col-sm-offset-9 single-alert' ng-class='{\"done\" : alert.isDone}'> \
	// 		<div class='alert' role='alert'> \
	// 			<strong ng-show='alert.title'>{{alert.title}} </strong>{{alert.message || ''}} \
	// 		</div> \
	// 	</div> \
	// </div>";

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
	};
};

},{}],"/Users/andrew/dev/office-bot/andrew-prior-ob-alerts/officebot-alerts/src/alerts.service.js":[function(require,module,exports){
/**
	* @name alertsService
	* @desc simple service layer so the rest of our code can talk to our directive
	* @memberof Alerts
	* @namespace Alerts.Service
	* @param {provider} $timeout
	* @returns {null}
	*/
module.exports = function alertsService($timeout, $rootScope, $window) {
	'use strict';

	var alerts = [];
	var defaultTimeout = 3000; //in milliseconds

	this.info = info;
	this.success = success;
	this.warning = warning;
	this.error = error;
	this.danger = danger;
	this.alert = alert;

	this.get = get;
	this.clear = clear;

	/**
		* @desc Displays an info message
		* @memberof Alerts.Service
		* @param {string} title
		* @param {string=} message
		* @param {number=} timeout
		* @returns {number} Alerts array length
		*/
	function info(title, message, timeout) {
		return alert(title, message, 'alert-info', timeout);
	}

	/**
		* @desc Displays a warning message
		* @memberof Alerts.Service
		* @param {string} title
		* @param {string=} message
		* @param {number=} timeout
		* @returns {number} Alerts array length
		*/
	function warning(title, message, timeout) {
		return alert(title, message, 'alert-warning', timeout);
	}

	/**
		* @desc Displays a error message
		* @memberof Alerts.Service
		* @param {string} title
		* @param {string=} message
		* @param {number=} timeout
		* @returns {number} Alerts array length
		*/
	function error(title, message, timeout) {
		return alert(title, message, 'alert-error', timeout);
	}

	/**
		* @desc Displays a danger message
		* @memberof Alerts.Service
		* @param {string} title
		* @param {string=} message
		* @param {number=} timeout
		* @returns {number} Alerts array length
		*/
	function danger(title, message, timeout) {
		return alert(title, message, 'alert-danger', timeout || 5000);
	}

	/**
		* @desc Displays a success message
		* @memberof Alerts.Service
		* @param {string} title
		* @param {string=} message
		* @param {number=} timeout
		* @returns {number} Alerts array length
		*/
	function success(title, message, timeout) {
		return alert(title, message, 'alert-success', timeout);
	}

	/**
		* @desc Displays an alert message
		* @memberof Alerts.Service
		* @param {string} title
		* @param {string=} message
		* @param {string} class
		* @param {number=} timeout
		* @returns {number} Alerts array length
		*/
	function alert(title, message, alertClass, timeout ) {
		var alertTimeout = timeout || defaultTimeout;

		var newAlert = {
			"title" : title,
			"message" : message,
			"alertClass" : alertClass,
			"timeout" : alertTimeout,
			"isDone" : false,
			"timestamp" : new Date().toString()
		};

		var len = alerts.push(newAlert);
		//Instead of adding these to the window object, we should create some logging of some kind
		$rootScope.$emit('alerts.new', newAlert);

		if (timeout <= 0) {
			return len;
		}

		$timeout(function() {
			newAlert.isDone = true;

		}, alertTimeout);

		return len;
	}

	/**
		* @desc Returns the current alert array
		* @memberof Alerts.Service
		* @returns {object[]} alerts
		*/
	function get() {
		return alerts;
	}

	/**
		* @desc Clears the current alert array
		* @memberof Alerts.Service
		* @returns {object[]} alerts
		*/
	function clear() {
		alerts = [];
		return alerts;
	}
};

},{}],"/Users/andrew/dev/office-bot/andrew-prior-ob-alerts/officebot-alerts/src/index.js":[function(require,module,exports){
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
},{"./alerts.directive.js":"/Users/andrew/dev/office-bot/andrew-prior-ob-alerts/officebot-alerts/src/alerts.directive.js","./alerts.service.js":"/Users/andrew/dev/office-bot/andrew-prior-ob-alerts/officebot-alerts/src/alerts.service.js","angular":"angular"}]},{},["/Users/andrew/dev/office-bot/andrew-prior-ob-alerts/officebot-alerts/src/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWxlcnRzLmRpcmVjdGl2ZS5qcyIsInNyYy9hbGVydHMuc2VydmljZS5qcyIsInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG5cdCogQG5hbWUgYWxlcnRzRGlyZWN0aXZlXG5cdCogQGRlc2MgU2ltcGxlIGRpcmVjdGl2ZSB0byBiaW5kIHRoZSBzZXJ2ZXIgYW5kIERPTSB0b2dldGhlclxuXHQqIEBtZW1iZXJvZiBBbGVydHNcblx0KiBAbmFtZXNwYWNlIEFsZXJ0cy5EaXJlY3RpdmVcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSBhbGVydHNcblx0KiBAcmV0dXJucyB7dGhpc31cblx0Ki9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYWxlcnRzRGlyZWN0aXZlKG9mZmljZWJvdEFsZXJ0cykge1xuXHQndXNlIHN0cmljdCc7XG5cdCduZ0luamVjdCc7XG5cblx0dmFyIHRtcGwgPSBcIjxkaXYgY2xhc3M9J29mZmljZWJvdC1hbGVydHMtY29udGFpbmVyIGJvdHRvbSc+IFxcXG5cdFx0PGRpdiBuZy1yZXBlYXQ9J2FsZXJ0IGluIF9hbGVydFZNLmFsZXJ0cycgY2xhc3M9J2NvbC14cy0xMiBjb2wtc20tNCBjb2wtc20tb2Zmc2V0LTggc2luZ2xlLWFsZXJ0JyBuZy1jbGFzcz0ne1xcXCJkb25lXFxcIiA6IGFsZXJ0LmlzRG9uZX0nPiBcXFxuXHRcdFx0PGRpdiBjbGFzcz0nYWxlcnQgYWxlcnQtZGlzbWlzc2libGUnIG5nLWNsYXNzPSdhbGVydC5hbGVydENsYXNzJyByb2xlPSdhbGVydCc+IFxcXG5cdFx0XHRcdDxzdHJvbmcgbmctc2hvdz0nYWxlcnQudGl0bGUnPnt7YWxlcnQudGl0bGV9fSA8L3N0cm9uZz57e2FsZXJ0Lm1lc3NhZ2UgfHwgJyd9fSBcXFxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2Nsb3NlJyBuZy1jbGljaz0nX2FsZXJ0Vk0uZGlzbWlzcyhhbGVydCknIGFyaWEtbGFiZWw9J0Nsb3NlJz5cXFxuXHRcdFx0XHRcdDxzcGFuIGFyaWEtaGlkZGVuPSd0cnVlJz48L3NwYW4+XFxcblx0XHRcdFx0XHQ8aSBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnMgY2xvc2UtaWNvblxcXCI+Y2xvc2U8L2k+XFxcblx0XHRcdFx0PC9idXR0b24+IFxcXG5cdFx0PC9kaXY+IFxcXG5cdDwvZGl2PlwiO1xuXG5cdC8vIHZhciB0bXBsID0gXCI8ZGl2IGNsYXNzPSdvZmZpY2Vib3QtYWxlcnRzLWNvbnRhaW5lciBib3R0b20nPiBcXFxuXHQvLyBcdDxkaXYgbmctcmVwZWF0PSdhbGVydCBpbiBfYWxlcnRWTS5hbGVydHMnIGNsYXNzPSdjb2wteHMtMTIgY29sLXNtLTMgY29sLXNtLW9mZnNldC05IHNpbmdsZS1hbGVydCcgbmctY2xhc3M9J3tcXFwiZG9uZVxcXCIgOiBhbGVydC5pc0RvbmV9Jz4gXFxcblx0Ly8gXHRcdDxkaXYgY2xhc3M9J2FsZXJ0JyByb2xlPSdhbGVydCc+IFxcXG5cdC8vIFx0XHRcdDxzdHJvbmcgbmctc2hvdz0nYWxlcnQudGl0bGUnPnt7YWxlcnQudGl0bGV9fSA8L3N0cm9uZz57e2FsZXJ0Lm1lc3NhZ2UgfHwgJyd9fSBcXFxuXHQvLyBcdFx0PC9kaXY+IFxcXG5cdC8vIFx0PC9kaXY+IFxcXG5cdC8vIDwvZGl2PlwiO1xuXG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3QgOiAnQUUnLFxuXHRcdHRlbXBsYXRlIDogdG1wbCxcblx0XHRjb250cm9sbGVyIDogZnVuY3Rpb24oJHJvb3RTY29wZSwgJGludGVydmFsKSB7XG5cdFx0XHR2YXIgdm0gPSB0aGlzIHx8IHt9O1xuXHRcdFx0dm0uYWxlcnRzID0gW107XG5cdFx0XHR2bS5kaXNtaXNzID0gZGlzbWlzcztcblx0XHRcdCRyb290U2NvcGUuJG9uKCdhbGVydHMubmV3Jywgb25OZXdBbGVydCk7XG5cdFx0XHRyZXR1cm4gdm07XG5cblx0XHRcdGZ1bmN0aW9uIGRpc21pc3MoYWxlcnQpIHtcblx0XHRcdFx0YWxlcnQuaXNEb25lID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gb25OZXdBbGVydChldmVudCwgbmV3QWxlcnQpIHtcblx0XHRcdFx0dm0uYWxlcnRzLnB1c2gobmV3QWxlcnQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y29udHJvbGxlckFzIDogJ19hbGVydFZNJ1xuXHR9O1xufTtcbiIsIi8qKlxuXHQqIEBuYW1lIGFsZXJ0c1NlcnZpY2Vcblx0KiBAZGVzYyBzaW1wbGUgc2VydmljZSBsYXllciBzbyB0aGUgcmVzdCBvZiBvdXIgY29kZSBjYW4gdGFsayB0byBvdXIgZGlyZWN0aXZlXG5cdCogQG1lbWJlcm9mIEFsZXJ0c1xuXHQqIEBuYW1lc3BhY2UgQWxlcnRzLlNlcnZpY2Vcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkdGltZW91dFxuXHQqIEByZXR1cm5zIHtudWxsfVxuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbGVydHNTZXJ2aWNlKCR0aW1lb3V0LCAkcm9vdFNjb3BlLCAkd2luZG93KSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgYWxlcnRzID0gW107XG5cdHZhciBkZWZhdWx0VGltZW91dCA9IDMwMDA7IC8vaW4gbWlsbGlzZWNvbmRzXG5cblx0dGhpcy5pbmZvID0gaW5mbztcblx0dGhpcy5zdWNjZXNzID0gc3VjY2Vzcztcblx0dGhpcy53YXJuaW5nID0gd2FybmluZztcblx0dGhpcy5lcnJvciA9IGVycm9yO1xuXHR0aGlzLmRhbmdlciA9IGRhbmdlcjtcblx0dGhpcy5hbGVydCA9IGFsZXJ0O1xuXG5cdHRoaXMuZ2V0ID0gZ2V0O1xuXHR0aGlzLmNsZWFyID0gY2xlYXI7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBEaXNwbGF5cyBhbiBpbmZvIG1lc3NhZ2Vcblx0XHQqIEBtZW1iZXJvZiBBbGVydHMuU2VydmljZVxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG5cdFx0KiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2Vcblx0XHQqIEBwYXJhbSB7bnVtYmVyPX0gdGltZW91dFxuXHRcdCogQHJldHVybnMge251bWJlcn0gQWxlcnRzIGFycmF5IGxlbmd0aFxuXHRcdCovXG5cdGZ1bmN0aW9uIGluZm8odGl0bGUsIG1lc3NhZ2UsIHRpbWVvdXQpIHtcblx0XHRyZXR1cm4gYWxlcnQodGl0bGUsIG1lc3NhZ2UsICdhbGVydC1pbmZvJywgdGltZW91dCk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIERpc3BsYXlzIGEgd2FybmluZyBtZXNzYWdlXG5cdFx0KiBAbWVtYmVyb2YgQWxlcnRzLlNlcnZpY2Vcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuXHRcdCogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlXG5cdFx0KiBAcGFyYW0ge251bWJlcj19IHRpbWVvdXRcblx0XHQqIEByZXR1cm5zIHtudW1iZXJ9IEFsZXJ0cyBhcnJheSBsZW5ndGhcblx0XHQqL1xuXHRmdW5jdGlvbiB3YXJuaW5nKHRpdGxlLCBtZXNzYWdlLCB0aW1lb3V0KSB7XG5cdFx0cmV0dXJuIGFsZXJ0KHRpdGxlLCBtZXNzYWdlLCAnYWxlcnQtd2FybmluZycsIHRpbWVvdXQpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBEaXNwbGF5cyBhIGVycm9yIG1lc3NhZ2Vcblx0XHQqIEBtZW1iZXJvZiBBbGVydHMuU2VydmljZVxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG5cdFx0KiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2Vcblx0XHQqIEBwYXJhbSB7bnVtYmVyPX0gdGltZW91dFxuXHRcdCogQHJldHVybnMge251bWJlcn0gQWxlcnRzIGFycmF5IGxlbmd0aFxuXHRcdCovXG5cdGZ1bmN0aW9uIGVycm9yKHRpdGxlLCBtZXNzYWdlLCB0aW1lb3V0KSB7XG5cdFx0cmV0dXJuIGFsZXJ0KHRpdGxlLCBtZXNzYWdlLCAnYWxlcnQtZXJyb3InLCB0aW1lb3V0KTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgRGlzcGxheXMgYSBkYW5nZXIgbWVzc2FnZVxuXHRcdCogQG1lbWJlcm9mIEFsZXJ0cy5TZXJ2aWNlXG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcblx0XHQqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZVxuXHRcdCogQHBhcmFtIHtudW1iZXI9fSB0aW1lb3V0XG5cdFx0KiBAcmV0dXJucyB7bnVtYmVyfSBBbGVydHMgYXJyYXkgbGVuZ3RoXG5cdFx0Ki9cblx0ZnVuY3Rpb24gZGFuZ2VyKHRpdGxlLCBtZXNzYWdlLCB0aW1lb3V0KSB7XG5cdFx0cmV0dXJuIGFsZXJ0KHRpdGxlLCBtZXNzYWdlLCAnYWxlcnQtZGFuZ2VyJywgdGltZW91dCB8fCA1MDAwKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgRGlzcGxheXMgYSBzdWNjZXNzIG1lc3NhZ2Vcblx0XHQqIEBtZW1iZXJvZiBBbGVydHMuU2VydmljZVxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG5cdFx0KiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2Vcblx0XHQqIEBwYXJhbSB7bnVtYmVyPX0gdGltZW91dFxuXHRcdCogQHJldHVybnMge251bWJlcn0gQWxlcnRzIGFycmF5IGxlbmd0aFxuXHRcdCovXG5cdGZ1bmN0aW9uIHN1Y2Nlc3ModGl0bGUsIG1lc3NhZ2UsIHRpbWVvdXQpIHtcblx0XHRyZXR1cm4gYWxlcnQodGl0bGUsIG1lc3NhZ2UsICdhbGVydC1zdWNjZXNzJywgdGltZW91dCk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIERpc3BsYXlzIGFuIGFsZXJ0IG1lc3NhZ2Vcblx0XHQqIEBtZW1iZXJvZiBBbGVydHMuU2VydmljZVxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG5cdFx0KiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2Vcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc1xuXHRcdCogQHBhcmFtIHtudW1iZXI9fSB0aW1lb3V0XG5cdFx0KiBAcmV0dXJucyB7bnVtYmVyfSBBbGVydHMgYXJyYXkgbGVuZ3RoXG5cdFx0Ki9cblx0ZnVuY3Rpb24gYWxlcnQodGl0bGUsIG1lc3NhZ2UsIGFsZXJ0Q2xhc3MsIHRpbWVvdXQgKSB7XG5cdFx0dmFyIGFsZXJ0VGltZW91dCA9IHRpbWVvdXQgfHwgZGVmYXVsdFRpbWVvdXQ7XG5cblx0XHR2YXIgbmV3QWxlcnQgPSB7XG5cdFx0XHRcInRpdGxlXCIgOiB0aXRsZSxcblx0XHRcdFwibWVzc2FnZVwiIDogbWVzc2FnZSxcblx0XHRcdFwiYWxlcnRDbGFzc1wiIDogYWxlcnRDbGFzcyxcblx0XHRcdFwidGltZW91dFwiIDogYWxlcnRUaW1lb3V0LFxuXHRcdFx0XCJpc0RvbmVcIiA6IGZhbHNlLFxuXHRcdFx0XCJ0aW1lc3RhbXBcIiA6IG5ldyBEYXRlKCkudG9TdHJpbmcoKVxuXHRcdH07XG5cblx0XHR2YXIgbGVuID0gYWxlcnRzLnB1c2gobmV3QWxlcnQpO1xuXHRcdC8vSW5zdGVhZCBvZiBhZGRpbmcgdGhlc2UgdG8gdGhlIHdpbmRvdyBvYmplY3QsIHdlIHNob3VsZCBjcmVhdGUgc29tZSBsb2dnaW5nIG9mIHNvbWUga2luZFxuXHRcdCRyb290U2NvcGUuJGVtaXQoJ2FsZXJ0cy5uZXcnLCBuZXdBbGVydCk7XG5cblx0XHRpZiAodGltZW91dCA8PSAwKSB7XG5cdFx0XHRyZXR1cm4gbGVuO1xuXHRcdH1cblxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0bmV3QWxlcnQuaXNEb25lID0gdHJ1ZTtcblxuXHRcdH0sIGFsZXJ0VGltZW91dCk7XG5cblx0XHRyZXR1cm4gbGVuO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBSZXR1cm5zIHRoZSBjdXJyZW50IGFsZXJ0IGFycmF5XG5cdFx0KiBAbWVtYmVyb2YgQWxlcnRzLlNlcnZpY2Vcblx0XHQqIEByZXR1cm5zIHtvYmplY3RbXX0gYWxlcnRzXG5cdFx0Ki9cblx0ZnVuY3Rpb24gZ2V0KCkge1xuXHRcdHJldHVybiBhbGVydHM7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIENsZWFycyB0aGUgY3VycmVudCBhbGVydCBhcnJheVxuXHRcdCogQG1lbWJlcm9mIEFsZXJ0cy5TZXJ2aWNlXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0W119IGFsZXJ0c1xuXHRcdCovXG5cdGZ1bmN0aW9uIGNsZWFyKCkge1xuXHRcdGFsZXJ0cyA9IFtdO1xuXHRcdHJldHVybiBhbGVydHM7XG5cdH1cbn07XG4iLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbnZhciBtb2R1bGVOYW1lID0gJ29mZmljZWJvdEFsZXJ0c01vZHVsZSc7XG5cbi8qKlxuXHQqIEBuYW1lc3BhY2UgQWxlcnRzXG5cdCogQHJlcXVpcmVzIGFuZ3VsYXJcblx0Ki9cbmFuZ3VsYXJcblx0Lm1vZHVsZShtb2R1bGVOYW1lLCBbXSlcblx0LnNlcnZpY2UoJ29mZmljZWJvdEFsZXJ0cycsIHJlcXVpcmUoJy4vYWxlcnRzLnNlcnZpY2UuanMnKSlcblx0LmRpcmVjdGl2ZSgnb2ZmaWNlYm90QWxlcnRzUGFuZScsIHJlcXVpcmUoJy4vYWxlcnRzLmRpcmVjdGl2ZS5qcycpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtb2R1bGVOYW1lOyJdfQ==
