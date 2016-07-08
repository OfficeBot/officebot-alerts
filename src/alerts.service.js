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
	this.error = danger;
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
