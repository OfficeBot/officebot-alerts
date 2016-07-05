(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/scott/Dev/officebot-alerts/src/alerts.directive.js":[function(require,module,exports){
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

	// var tmpl = "<div class='officebot-alerts-container bottom'> \
	// 	<div ng-repeat='alert in _alertVM.alerts' class='col-xs-12 col-sm-4 col-sm-offset-8 single-alert' ng-class='{\"done\" : alert.isDone}'> \
	// 		<div class='alert alert-dismissible' ng-class='alert.alertClass' role='alert'> \
	// 			<button type='button' class='close' ng-click='_alertVM.dismiss(alert)' aria-label='Close'><span aria-hidden='true'>&times;</span></button> \
	// 			<strong ng-show='alert.title'>{{alert.title}} </strong>{{alert.message || ''}} \
	// 		</div> \
	// 	</div> \
	// </div>";

	var tmpl = "<div class='officebot-alerts-container bottom'> \
		<div ng-repeat='alert in _alertVM.alerts' class='col-xs-12 col-sm-3 col-sm-offset-9 single-alert' ng-class='{\"done\" : alert.isDone}'> \
			<div class='alert' role='alert'> \
				<strong ng-show='alert.title'>{{alert.title}} </strong>{{alert.message || ''}} \
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
},{}],"/Users/scott/Dev/officebot-alerts/src/alerts.service.js":[function(require,module,exports){
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
		* @desc Displays a danger message
		* @memberof Alerts.Service
		* @param {string} title
		* @param {string=} message
		* @param {number=} timeout
		* @returns {number} Alerts array length
		*/
	function danger(title, message, timeout) {
		return alert(title, message, 'alert-danger', timeout || 0);
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
		}

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
},{}],"/Users/scott/Dev/officebot-alerts/src/index.js":[function(require,module,exports){
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
},{"./alerts.directive.js":"/Users/scott/Dev/officebot-alerts/src/alerts.directive.js","./alerts.service.js":"/Users/scott/Dev/officebot-alerts/src/alerts.service.js","angular":"angular"}]},{},["/Users/scott/Dev/officebot-alerts/src/index.js"])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWxlcnRzLmRpcmVjdGl2ZS5qcyIsInNyYy9hbGVydHMuc2VydmljZS5qcyIsInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcblx0KiBAbmFtZSBhbGVydHNEaXJlY3RpdmVcblx0KiBAZGVzYyBTaW1wbGUgZGlyZWN0aXZlIHRvIGJpbmQgdGhlIHNlcnZlciBhbmQgRE9NIHRvZ2V0aGVyXG5cdCogQG1lbWJlcm9mIEFsZXJ0c1xuXHQqIEBuYW1lc3BhY2UgQWxlcnRzLkRpcmVjdGl2ZVxuXHQqIEBwYXJhbSB7cHJvdmlkZXJ9IGFsZXJ0c1xuXHQqIEByZXR1cm5zIHt0aGlzfVxuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbGVydHNEaXJlY3RpdmUob2ZmaWNlYm90QWxlcnRzKSB7XG5cdCd1c2Ugc3RyaWN0Jztcblx0J25nSW5qZWN0JztcblxuXHQvLyB2YXIgdG1wbCA9IFwiPGRpdiBjbGFzcz0nb2ZmaWNlYm90LWFsZXJ0cy1jb250YWluZXIgYm90dG9tJz4gXFxcblx0Ly8gXHQ8ZGl2IG5nLXJlcGVhdD0nYWxlcnQgaW4gX2FsZXJ0Vk0uYWxlcnRzJyBjbGFzcz0nY29sLXhzLTEyIGNvbC1zbS00IGNvbC1zbS1vZmZzZXQtOCBzaW5nbGUtYWxlcnQnIG5nLWNsYXNzPSd7XFxcImRvbmVcXFwiIDogYWxlcnQuaXNEb25lfSc+IFxcXG5cdC8vIFx0XHQ8ZGl2IGNsYXNzPSdhbGVydCBhbGVydC1kaXNtaXNzaWJsZScgbmctY2xhc3M9J2FsZXJ0LmFsZXJ0Q2xhc3MnIHJvbGU9J2FsZXJ0Jz4gXFxcblx0Ly8gXHRcdFx0PGJ1dHRvbiB0eXBlPSdidXR0b24nIGNsYXNzPSdjbG9zZScgbmctY2xpY2s9J19hbGVydFZNLmRpc21pc3MoYWxlcnQpJyBhcmlhLWxhYmVsPSdDbG9zZSc+PHNwYW4gYXJpYS1oaWRkZW49J3RydWUnPiZ0aW1lczs8L3NwYW4+PC9idXR0b24+IFxcXG5cdC8vIFx0XHRcdDxzdHJvbmcgbmctc2hvdz0nYWxlcnQudGl0bGUnPnt7YWxlcnQudGl0bGV9fSA8L3N0cm9uZz57e2FsZXJ0Lm1lc3NhZ2UgfHwgJyd9fSBcXFxuXHQvLyBcdFx0PC9kaXY+IFxcXG5cdC8vIFx0PC9kaXY+IFxcXG5cdC8vIDwvZGl2PlwiO1xuXG5cdHZhciB0bXBsID0gXCI8ZGl2IGNsYXNzPSdvZmZpY2Vib3QtYWxlcnRzLWNvbnRhaW5lciBib3R0b20nPiBcXFxuXHRcdDxkaXYgbmctcmVwZWF0PSdhbGVydCBpbiBfYWxlcnRWTS5hbGVydHMnIGNsYXNzPSdjb2wteHMtMTIgY29sLXNtLTMgY29sLXNtLW9mZnNldC05IHNpbmdsZS1hbGVydCcgbmctY2xhc3M9J3tcXFwiZG9uZVxcXCIgOiBhbGVydC5pc0RvbmV9Jz4gXFxcblx0XHRcdDxkaXYgY2xhc3M9J2FsZXJ0JyByb2xlPSdhbGVydCc+IFxcXG5cdFx0XHRcdDxzdHJvbmcgbmctc2hvdz0nYWxlcnQudGl0bGUnPnt7YWxlcnQudGl0bGV9fSA8L3N0cm9uZz57e2FsZXJ0Lm1lc3NhZ2UgfHwgJyd9fSBcXFxuXHRcdFx0PC9kaXY+IFxcXG5cdFx0PC9kaXY+IFxcXG5cdDwvZGl2PlwiO1xuXG5cdHJldHVybiB7XG5cdFx0cmVzdHJpY3QgOiAnQUUnLFxuXHRcdHRlbXBsYXRlIDogdG1wbCxcblx0XHRjb250cm9sbGVyIDogZnVuY3Rpb24oJHJvb3RTY29wZSwgJGludGVydmFsKSB7XG5cdFx0XHR2YXIgdm0gPSB0aGlzIHx8IHt9O1xuXHRcdFx0dm0uYWxlcnRzID0gW107XG5cdFx0XHR2bS5kaXNtaXNzID0gZGlzbWlzcztcblx0XHRcdCRyb290U2NvcGUuJG9uKCdhbGVydHMubmV3Jywgb25OZXdBbGVydCk7XG5cdFx0XHRyZXR1cm4gdm07XG5cblx0XHRcdGZ1bmN0aW9uIGRpc21pc3MoYWxlcnQpIHtcblx0XHRcdFx0YWxlcnQuaXNEb25lID0gdHJ1ZTtcblx0XHRcdH1cblxuXHRcdFx0ZnVuY3Rpb24gb25OZXdBbGVydChldmVudCwgbmV3QWxlcnQpIHtcblx0XHRcdFx0dm0uYWxlcnRzLnB1c2gobmV3QWxlcnQpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Y29udHJvbGxlckFzIDogJ19hbGVydFZNJ1xuXHR9XG59OyIsIi8qKlxuXHQqIEBuYW1lIGFsZXJ0c1NlcnZpY2Vcblx0KiBAZGVzYyBzaW1wbGUgc2VydmljZSBsYXllciBzbyB0aGUgcmVzdCBvZiBvdXIgY29kZSBjYW4gdGFsayB0byBvdXIgZGlyZWN0aXZlXG5cdCogQG1lbWJlcm9mIEFsZXJ0c1xuXHQqIEBuYW1lc3BhY2UgQWxlcnRzLlNlcnZpY2Vcblx0KiBAcGFyYW0ge3Byb3ZpZGVyfSAkdGltZW91dFxuXHQqIEByZXR1cm5zIHtudWxsfVxuXHQqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbGVydHNTZXJ2aWNlKCR0aW1lb3V0LCAkcm9vdFNjb3BlLCAkd2luZG93KSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgYWxlcnRzID0gW107XG5cdHZhciBkZWZhdWx0VGltZW91dCA9IDMwMDA7IC8vaW4gbWlsbGlzZWNvbmRzXG5cblx0dGhpcy5pbmZvID0gaW5mbztcblx0dGhpcy5zdWNjZXNzID0gc3VjY2Vzcztcblx0dGhpcy53YXJuaW5nID0gd2FybmluZztcblx0dGhpcy5kYW5nZXIgPSBkYW5nZXI7XG5cdHRoaXMuYWxlcnQgPSBhbGVydDtcblxuXHR0aGlzLmdldCA9IGdldDtcblx0dGhpcy5jbGVhciA9IGNsZWFyO1xuXG5cdC8qKlxuXHRcdCogQGRlc2MgRGlzcGxheXMgYW4gaW5mbyBtZXNzYWdlXG5cdFx0KiBAbWVtYmVyb2YgQWxlcnRzLlNlcnZpY2Vcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuXHRcdCogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlXG5cdFx0KiBAcGFyYW0ge251bWJlcj19IHRpbWVvdXRcblx0XHQqIEByZXR1cm5zIHtudW1iZXJ9IEFsZXJ0cyBhcnJheSBsZW5ndGhcblx0XHQqL1xuXHRmdW5jdGlvbiBpbmZvKHRpdGxlLCBtZXNzYWdlLCB0aW1lb3V0KSB7XG5cdFx0cmV0dXJuIGFsZXJ0KHRpdGxlLCBtZXNzYWdlLCAnYWxlcnQtaW5mbycsIHRpbWVvdXQpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBEaXNwbGF5cyBhIHdhcm5pbmcgbWVzc2FnZVxuXHRcdCogQG1lbWJlcm9mIEFsZXJ0cy5TZXJ2aWNlXG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcblx0XHQqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZVxuXHRcdCogQHBhcmFtIHtudW1iZXI9fSB0aW1lb3V0XG5cdFx0KiBAcmV0dXJucyB7bnVtYmVyfSBBbGVydHMgYXJyYXkgbGVuZ3RoXG5cdFx0Ki9cblx0ZnVuY3Rpb24gd2FybmluZyh0aXRsZSwgbWVzc2FnZSwgdGltZW91dCkge1xuXHRcdHJldHVybiBhbGVydCh0aXRsZSwgbWVzc2FnZSwgJ2FsZXJ0LXdhcm5pbmcnLCB0aW1lb3V0KTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgRGlzcGxheXMgYSBkYW5nZXIgbWVzc2FnZVxuXHRcdCogQG1lbWJlcm9mIEFsZXJ0cy5TZXJ2aWNlXG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcblx0XHQqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZVxuXHRcdCogQHBhcmFtIHtudW1iZXI9fSB0aW1lb3V0XG5cdFx0KiBAcmV0dXJucyB7bnVtYmVyfSBBbGVydHMgYXJyYXkgbGVuZ3RoXG5cdFx0Ki9cblx0ZnVuY3Rpb24gZGFuZ2VyKHRpdGxlLCBtZXNzYWdlLCB0aW1lb3V0KSB7XG5cdFx0cmV0dXJuIGFsZXJ0KHRpdGxlLCBtZXNzYWdlLCAnYWxlcnQtZGFuZ2VyJywgdGltZW91dCB8fCAwKTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgRGlzcGxheXMgYSBzdWNjZXNzIG1lc3NhZ2Vcblx0XHQqIEBtZW1iZXJvZiBBbGVydHMuU2VydmljZVxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG5cdFx0KiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2Vcblx0XHQqIEBwYXJhbSB7bnVtYmVyPX0gdGltZW91dFxuXHRcdCogQHJldHVybnMge251bWJlcn0gQWxlcnRzIGFycmF5IGxlbmd0aFxuXHRcdCovXG5cdGZ1bmN0aW9uIHN1Y2Nlc3ModGl0bGUsIG1lc3NhZ2UsIHRpbWVvdXQpIHtcblx0XHRyZXR1cm4gYWxlcnQodGl0bGUsIG1lc3NhZ2UsICdhbGVydC1zdWNjZXNzJywgdGltZW91dCk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIERpc3BsYXlzIGFuIGFsZXJ0IG1lc3NhZ2Vcblx0XHQqIEBtZW1iZXJvZiBBbGVydHMuU2VydmljZVxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG5cdFx0KiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2Vcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc1xuXHRcdCogQHBhcmFtIHtudW1iZXI9fSB0aW1lb3V0XG5cdFx0KiBAcmV0dXJucyB7bnVtYmVyfSBBbGVydHMgYXJyYXkgbGVuZ3RoXG5cdFx0Ki9cblx0ZnVuY3Rpb24gYWxlcnQodGl0bGUsIG1lc3NhZ2UsIGFsZXJ0Q2xhc3MsIHRpbWVvdXQgKSB7XG5cdFx0dmFyIGFsZXJ0VGltZW91dCA9IHRpbWVvdXQgfHwgZGVmYXVsdFRpbWVvdXQ7XG5cblx0XHR2YXIgbmV3QWxlcnQgPSB7IFxuXHRcdFx0XCJ0aXRsZVwiIDogdGl0bGUsIFxuXHRcdFx0XCJtZXNzYWdlXCIgOiBtZXNzYWdlLFxuXHRcdFx0XCJhbGVydENsYXNzXCIgOiBhbGVydENsYXNzLCBcblx0XHRcdFwidGltZW91dFwiIDogYWxlcnRUaW1lb3V0LCBcblx0XHRcdFwiaXNEb25lXCIgOiBmYWxzZSxcblx0XHRcdFwidGltZXN0YW1wXCIgOiBuZXcgRGF0ZSgpLnRvU3RyaW5nKClcblx0XHR9XG5cblx0XHR2YXIgbGVuID0gYWxlcnRzLnB1c2gobmV3QWxlcnQpO1xuXHRcdC8vSW5zdGVhZCBvZiBhZGRpbmcgdGhlc2UgdG8gdGhlIHdpbmRvdyBvYmplY3QsIHdlIHNob3VsZCBjcmVhdGUgc29tZSBsb2dnaW5nIG9mIHNvbWUga2luZFxuXHRcdCRyb290U2NvcGUuJGVtaXQoJ2FsZXJ0cy5uZXcnLCBuZXdBbGVydCk7XG5cblx0XHRpZiAodGltZW91dCA8PSAwKSB7XG5cdFx0XHRyZXR1cm4gbGVuO1xuXHRcdH1cblx0XHRcblx0XHQkdGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdG5ld0FsZXJ0LmlzRG9uZSA9IHRydWU7XG5cblx0XHR9LCBhbGVydFRpbWVvdXQpO1xuXG5cdFx0cmV0dXJuIGxlbjtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgUmV0dXJucyB0aGUgY3VycmVudCBhbGVydCBhcnJheVxuXHRcdCogQG1lbWJlcm9mIEFsZXJ0cy5TZXJ2aWNlXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0W119IGFsZXJ0c1xuXHRcdCovXG5cdGZ1bmN0aW9uIGdldCgpIHtcblx0XHRyZXR1cm4gYWxlcnRzO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBDbGVhcnMgdGhlIGN1cnJlbnQgYWxlcnQgYXJyYXlcblx0XHQqIEBtZW1iZXJvZiBBbGVydHMuU2VydmljZVxuXHRcdCogQHJldHVybnMge29iamVjdFtdfSBhbGVydHNcblx0XHQqL1xuXHRmdW5jdGlvbiBjbGVhcigpIHtcblx0XHRhbGVydHMgPSBbXTtcblx0XHRyZXR1cm4gYWxlcnRzO1xuXHR9XG59OyIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIG1vZHVsZU5hbWUgPSAnb2ZmaWNlYm90QWxlcnRzTW9kdWxlJztcblxuLyoqXG5cdCogQG5hbWVzcGFjZSBBbGVydHNcblx0KiBAcmVxdWlyZXMgYW5ndWxhclxuXHQqL1xuYW5ndWxhclxuXHQubW9kdWxlKG1vZHVsZU5hbWUsIFtdKVxuXHQuc2VydmljZSgnb2ZmaWNlYm90QWxlcnRzJywgcmVxdWlyZSgnLi9hbGVydHMuc2VydmljZS5qcycpKVxuXHQuZGlyZWN0aXZlKCdvZmZpY2Vib3RBbGVydHNQYW5lJywgcmVxdWlyZSgnLi9hbGVydHMuZGlyZWN0aXZlLmpzJykpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1vZHVsZU5hbWU7Il19
