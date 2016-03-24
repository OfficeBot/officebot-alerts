# Office Bot Alerts

This module is a simple Growl-like alert system that uses the Office Bot build-system. It doesn't really provide anything you couldn't find in another package, but the code base is clean and easy to use and doesn't do any weird, magical things that make other packages hard to predict and control (like auto-injecting directives into the DOM)

# Getting Started

The first step is to include the library into your Angular application. We use [Browserify](https://github.com/substack/node-browserify) to bundle our application together, so our application usually looks something like this:

```
var angular = require('angular');

angular
	.module('application-root', [
		require('officebot-alerts')
	]);

```

If you are including this code directly from your HTML, be sure to use the files in `/dist`.

```
<script src='/node_modules/officebot-sdk/dist/js/officebot-alerts.js'></script>
```

# Basic Usage

The first step is to add the alerts-pane to your view (ideally in your index.html file):
```
<officebot-alerts-pane></officebot-alerts-pane>
```

After that, using this module is really simple. You just need to bring in the `officebotAlerts` service and then use the following methods inside of your controller:

```
.controller(function YourController(officebotAlerts) {
	//Use officebotAlerts here!
});

```

# Methods

## .info(title, message, timeout)

Creates a notification that uses Bootstrap's info style

```
@param {string} title
@param {string} message
@param {number=} timeout
```

## .warning(title, messag, timeout)

Creates a notification that uses Bootstrap's warning style

```
@param {string} title
@param {string} message
@param {number=} timeout
```

## .danger(title, message, timeout)

Creates a notification that uses Bootstrap's danger style

```
@param {string} title
@param {string} message
@param {number=} timeout
```

## .success(title, message, timeout)

Creates a notification that uses Bootstrap's success style

```
@param {string} title
@param {string} message
@param {number=} timeout
```

## .alert(title, message, alertClass, timeout)

This function is used to create custom alerts, and is the function that all of the other functions call internally. Setting timeout to 0 will prevent the alert from auto-closing. AlertClass is the name of a css class you would like attached to alert when it is injected into the DOM.

```
@param {string} title
@param {string} message
@param {string} alertClass
@param {number=} timeout
```

# Styling

This module uses LESS for styling. You can either bring the less file into your build project (like we do), or you can use the precompiled CSS in the `/dist/css` folder


# Todo

* Write unit tests

# License

MIT