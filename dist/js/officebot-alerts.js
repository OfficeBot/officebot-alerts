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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYWxlcnRzLmRpcmVjdGl2ZS5qcyIsInNyYy9hbGVydHMuc2VydmljZS5qcyIsInNyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuXHQqIEBuYW1lIGFsZXJ0c0RpcmVjdGl2ZVxuXHQqIEBkZXNjIFNpbXBsZSBkaXJlY3RpdmUgdG8gYmluZCB0aGUgc2VydmVyIGFuZCBET00gdG9nZXRoZXJcblx0KiBAbWVtYmVyb2YgQWxlcnRzXG5cdCogQG5hbWVzcGFjZSBBbGVydHMuRGlyZWN0aXZlXG5cdCogQHBhcmFtIHtwcm92aWRlcn0gYWxlcnRzXG5cdCogQHJldHVybnMge3RoaXN9XG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFsZXJ0c0RpcmVjdGl2ZShvZmZpY2Vib3RBbGVydHMpIHtcblx0J3VzZSBzdHJpY3QnO1xuXHQnbmdJbmplY3QnO1xuXG5cdHZhciB0bXBsID0gXCI8ZGl2IGNsYXNzPSdvZmZpY2Vib3QtYWxlcnRzLWNvbnRhaW5lciBib3R0b20nPiBcXFxuXHRcdDxkaXYgbmctcmVwZWF0PSdhbGVydCBpbiBfYWxlcnRWTS5hbGVydHMnIGNsYXNzPSdjb2wteHMtMTIgY29sLXNtLTQgY29sLXNtLW9mZnNldC04IHNpbmdsZS1hbGVydCcgbmctY2xhc3M9J3tcXFwiZG9uZVxcXCIgOiBhbGVydC5pc0RvbmV9Jz4gXFxcblx0XHRcdDxkaXYgY2xhc3M9J2FsZXJ0IGFsZXJ0LWRpc21pc3NpYmxlJyBuZy1jbGFzcz0nYWxlcnQuYWxlcnRDbGFzcycgcm9sZT0nYWxlcnQnPiBcXFxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2Nsb3NlJyBuZy1jbGljaz0nX2FsZXJ0Vk0uZGlzbWlzcyhhbGVydCknIGFyaWEtbGFiZWw9J0Nsb3NlJz48c3BhbiBhcmlhLWhpZGRlbj0ndHJ1ZSc+JnRpbWVzOzwvc3Bhbj48L2J1dHRvbj4gXFxcblx0XHRcdFx0PHN0cm9uZyBuZy1zaG93PSdhbGVydC50aXRsZSc+e3thbGVydC50aXRsZX19IDwvc3Ryb25nPnt7YWxlcnQubWVzc2FnZSB8fCAnPz8/J319IFxcXG5cdFx0XHQ8L2Rpdj4gXFxcblx0XHQ8L2Rpdj4gXFxcblx0PC9kaXY+XCI7XG5cblx0cmV0dXJuIHtcblx0XHRyZXN0cmljdCA6ICdBRScsXG5cdFx0dGVtcGxhdGUgOiB0bXBsLFxuXHRcdGNvbnRyb2xsZXIgOiBmdW5jdGlvbigkcm9vdFNjb3BlLCAkaW50ZXJ2YWwpIHtcblx0XHRcdHZhciB2bSA9IHRoaXMgfHwge307XG5cdFx0XHR2bS5hbGVydHMgPSBbXTtcblx0XHRcdHZtLmRpc21pc3MgPSBkaXNtaXNzO1xuXHRcdFx0JHJvb3RTY29wZS4kb24oJ2FsZXJ0cy5uZXcnLCBvbk5ld0FsZXJ0KTtcblx0XHRcdHJldHVybiB2bTtcblxuXHRcdFx0ZnVuY3Rpb24gZGlzbWlzcyhhbGVydCkge1xuXHRcdFx0XHRhbGVydC5pc0RvbmUgPSB0cnVlO1xuXHRcdFx0fVxuXG5cdFx0XHRmdW5jdGlvbiBvbk5ld0FsZXJ0KGV2ZW50LCBuZXdBbGVydCkge1xuXHRcdFx0XHR2bS5hbGVydHMucHVzaChuZXdBbGVydCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjb250cm9sbGVyQXMgOiAnX2FsZXJ0Vk0nXG5cdH1cbn07IiwiLyoqXG5cdCogQG5hbWUgYWxlcnRzU2VydmljZVxuXHQqIEBkZXNjIHNpbXBsZSBzZXJ2aWNlIGxheWVyIHNvIHRoZSByZXN0IG9mIG91ciBjb2RlIGNhbiB0YWxrIHRvIG91ciBkaXJlY3RpdmVcblx0KiBAbWVtYmVyb2YgQWxlcnRzXG5cdCogQG5hbWVzcGFjZSBBbGVydHMuU2VydmljZVxuXHQqIEBwYXJhbSB7cHJvdmlkZXJ9ICR0aW1lb3V0XG5cdCogQHJldHVybnMge251bGx9XG5cdCovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFsZXJ0c1NlcnZpY2UoJHRpbWVvdXQsICRyb290U2NvcGUsICR3aW5kb3cpIHtcblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBhbGVydHMgPSBbXTtcblx0dmFyIGRlZmF1bHRUaW1lb3V0ID0gMzAwMDsgLy9pbiBtaWxsaXNlY29uZHNcblxuXHR0aGlzLmluZm8gPSBpbmZvO1xuXHR0aGlzLnN1Y2Nlc3MgPSBzdWNjZXNzO1xuXHR0aGlzLndhcm5pbmcgPSB3YXJuaW5nO1xuXHR0aGlzLmRhbmdlciA9IGRhbmdlcjtcblx0dGhpcy5hbGVydCA9IGFsZXJ0O1xuXG5cdHRoaXMuZ2V0ID0gZ2V0O1xuXHR0aGlzLmNsZWFyID0gY2xlYXI7XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBEaXNwbGF5cyBhbiBpbmZvIG1lc3NhZ2Vcblx0XHQqIEBtZW1iZXJvZiBBbGVydHMuU2VydmljZVxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IHRpdGxlXG5cdFx0KiBAcGFyYW0ge3N0cmluZz19IG1lc3NhZ2Vcblx0XHQqIEBwYXJhbSB7bnVtYmVyPX0gdGltZW91dFxuXHRcdCogQHJldHVybnMge251bWJlcn0gQWxlcnRzIGFycmF5IGxlbmd0aFxuXHRcdCovXG5cdGZ1bmN0aW9uIGluZm8odGl0bGUsIG1lc3NhZ2UsIHRpbWVvdXQpIHtcblx0XHRyZXR1cm4gYWxlcnQodGl0bGUsIG1lc3NhZ2UsICdhbGVydC1pbmZvJywgdGltZW91dCk7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIERpc3BsYXlzIGEgd2FybmluZyBtZXNzYWdlXG5cdFx0KiBAbWVtYmVyb2YgQWxlcnRzLlNlcnZpY2Vcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuXHRcdCogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlXG5cdFx0KiBAcGFyYW0ge251bWJlcj19IHRpbWVvdXRcblx0XHQqIEByZXR1cm5zIHtudW1iZXJ9IEFsZXJ0cyBhcnJheSBsZW5ndGhcblx0XHQqL1xuXHRmdW5jdGlvbiB3YXJuaW5nKHRpdGxlLCBtZXNzYWdlLCB0aW1lb3V0KSB7XG5cdFx0cmV0dXJuIGFsZXJ0KHRpdGxlLCBtZXNzYWdlLCAnYWxlcnQtd2FybmluZycsIHRpbWVvdXQpO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBEaXNwbGF5cyBhIGRhbmdlciBtZXNzYWdlXG5cdFx0KiBAbWVtYmVyb2YgQWxlcnRzLlNlcnZpY2Vcblx0XHQqIEBwYXJhbSB7c3RyaW5nfSB0aXRsZVxuXHRcdCogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlXG5cdFx0KiBAcGFyYW0ge251bWJlcj19IHRpbWVvdXRcblx0XHQqIEByZXR1cm5zIHtudW1iZXJ9IEFsZXJ0cyBhcnJheSBsZW5ndGhcblx0XHQqL1xuXHRmdW5jdGlvbiBkYW5nZXIodGl0bGUsIG1lc3NhZ2UsIHRpbWVvdXQpIHtcblx0XHRyZXR1cm4gYWxlcnQodGl0bGUsIG1lc3NhZ2UsICdhbGVydC1kYW5nZXInLCB0aW1lb3V0IHx8IDApO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBEaXNwbGF5cyBhIHN1Y2Nlc3MgbWVzc2FnZVxuXHRcdCogQG1lbWJlcm9mIEFsZXJ0cy5TZXJ2aWNlXG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcblx0XHQqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZVxuXHRcdCogQHBhcmFtIHtudW1iZXI9fSB0aW1lb3V0XG5cdFx0KiBAcmV0dXJucyB7bnVtYmVyfSBBbGVydHMgYXJyYXkgbGVuZ3RoXG5cdFx0Ki9cblx0ZnVuY3Rpb24gc3VjY2Vzcyh0aXRsZSwgbWVzc2FnZSwgdGltZW91dCkge1xuXHRcdHJldHVybiBhbGVydCh0aXRsZSwgbWVzc2FnZSwgJ2FsZXJ0LXN1Y2Nlc3MnLCB0aW1lb3V0KTtcblx0fVxuXG5cdC8qKlxuXHRcdCogQGRlc2MgRGlzcGxheXMgYW4gYWxlcnQgbWVzc2FnZVxuXHRcdCogQG1lbWJlcm9mIEFsZXJ0cy5TZXJ2aWNlXG5cdFx0KiBAcGFyYW0ge3N0cmluZ30gdGl0bGVcblx0XHQqIEBwYXJhbSB7c3RyaW5nPX0gbWVzc2FnZVxuXHRcdCogQHBhcmFtIHtzdHJpbmd9IGNsYXNzXG5cdFx0KiBAcGFyYW0ge251bWJlcj19IHRpbWVvdXRcblx0XHQqIEByZXR1cm5zIHtudW1iZXJ9IEFsZXJ0cyBhcnJheSBsZW5ndGhcblx0XHQqL1xuXHRmdW5jdGlvbiBhbGVydCh0aXRsZSwgbWVzc2FnZSwgYWxlcnRDbGFzcywgdGltZW91dCApIHtcblx0XHR2YXIgYWxlcnRUaW1lb3V0ID0gdGltZW91dCB8fCBkZWZhdWx0VGltZW91dDtcblxuXHRcdHZhciBuZXdBbGVydCA9IHsgXG5cdFx0XHRcInRpdGxlXCIgOiB0aXRsZSwgXG5cdFx0XHRcIm1lc3NhZ2VcIiA6IG1lc3NhZ2UsXG5cdFx0XHRcImFsZXJ0Q2xhc3NcIiA6IGFsZXJ0Q2xhc3MsIFxuXHRcdFx0XCJ0aW1lb3V0XCIgOiBhbGVydFRpbWVvdXQsIFxuXHRcdFx0XCJpc0RvbmVcIiA6IGZhbHNlLFxuXHRcdFx0XCJ0aW1lc3RhbXBcIiA6IG5ldyBEYXRlKCkudG9TdHJpbmcoKVxuXHRcdH1cblxuXHRcdHZhciBsZW4gPSBhbGVydHMucHVzaChuZXdBbGVydCk7XG5cdFx0Ly9JbnN0ZWFkIG9mIGFkZGluZyB0aGVzZSB0byB0aGUgd2luZG93IG9iamVjdCwgd2Ugc2hvdWxkIGNyZWF0ZSBzb21lIGxvZ2dpbmcgb2Ygc29tZSBraW5kXG5cdFx0JHJvb3RTY29wZS4kZW1pdCgnYWxlcnRzLm5ldycsIG5ld0FsZXJ0KTtcblxuXHRcdGlmICh0aW1lb3V0IDw9IDApIHtcblx0XHRcdHJldHVybiBsZW47XG5cdFx0fVxuXHRcdFxuXHRcdCR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuXHRcdFx0bmV3QWxlcnQuaXNEb25lID0gdHJ1ZTtcblxuXHRcdH0sIGFsZXJ0VGltZW91dCk7XG5cblx0XHRyZXR1cm4gbGVuO1xuXHR9XG5cblx0LyoqXG5cdFx0KiBAZGVzYyBSZXR1cm5zIHRoZSBjdXJyZW50IGFsZXJ0IGFycmF5XG5cdFx0KiBAbWVtYmVyb2YgQWxlcnRzLlNlcnZpY2Vcblx0XHQqIEByZXR1cm5zIHtvYmplY3RbXX0gYWxlcnRzXG5cdFx0Ki9cblx0ZnVuY3Rpb24gZ2V0KCkge1xuXHRcdHJldHVybiBhbGVydHM7XG5cdH1cblxuXHQvKipcblx0XHQqIEBkZXNjIENsZWFycyB0aGUgY3VycmVudCBhbGVydCBhcnJheVxuXHRcdCogQG1lbWJlcm9mIEFsZXJ0cy5TZXJ2aWNlXG5cdFx0KiBAcmV0dXJucyB7b2JqZWN0W119IGFsZXJ0c1xuXHRcdCovXG5cdGZ1bmN0aW9uIGNsZWFyKCkge1xuXHRcdGFsZXJ0cyA9IFtdO1xuXHRcdHJldHVybiBhbGVydHM7XG5cdH1cbn07IiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgbW9kdWxlTmFtZSA9ICdvZmZpY2Vib3RBbGVydHNNb2R1bGUnO1xuXG4vKipcblx0KiBAbmFtZXNwYWNlIEFsZXJ0c1xuXHQqIEByZXF1aXJlcyBhbmd1bGFyXG5cdCovXG5hbmd1bGFyXG5cdC5tb2R1bGUobW9kdWxlTmFtZSwgW10pXG5cdC5zZXJ2aWNlKCdvZmZpY2Vib3RBbGVydHMnLCByZXF1aXJlKCcuL2FsZXJ0cy5zZXJ2aWNlLmpzJykpXG5cdC5kaXJlY3RpdmUoJ29mZmljZWJvdEFsZXJ0c1BhbmUnLCByZXF1aXJlKCcuL2FsZXJ0cy5kaXJlY3RpdmUuanMnKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbW9kdWxlTmFtZTsiXX0=
