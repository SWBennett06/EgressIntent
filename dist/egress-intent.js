(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["EgressIntent"] = factory();
	else
		root["EgressIntent"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/egress-intent.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/egress-intent.ts":
/*!******************************!*\
  !*** ./src/egress-intent.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\r\nvar __assign = (this && this.__assign) || Object.assign || function(t) {\r\n    for (var s, i = 1, n = arguments.length; i < n; i++) {\r\n        s = arguments[i];\r\n        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))\r\n            t[p] = s[p];\r\n    }\r\n    return t;\r\n};\r\nObject.defineProperty(exports, \"__esModule\", { value: true });\r\nvar EgressIntent = (function () {\r\n    function EgressIntent(options) {\r\n        var _this = this;\r\n        this.defaultOptions = {\r\n            aggressive: false,\r\n            timer: 1000,\r\n            delay: 0,\r\n            cookieExpire: 1,\r\n            cookieDomain: '',\r\n            cookieName: 'triggeredEI',\r\n            target: document.documentElement,\r\n            sensitivity: 20,\r\n            directions: ['top', 'right', 'bottom', 'left'],\r\n            callback: function () { }\r\n        };\r\n        this.fire = function () {\r\n            if (_this.isDisabled())\r\n                return;\r\n            if (_this.config.callback)\r\n                _this.config.callback();\r\n            _this.disable();\r\n        };\r\n        this.attachListeners = function () {\r\n            if (_this.isDisabled())\r\n                return;\r\n            _this.config.target.addEventListener('mouseleave', _this.handleMouseLeave);\r\n            _this.config.target.addEventListener('mouseenter', _this.handleMouseEnter);\r\n        };\r\n        this.handleMouseLeave = function (event) {\r\n            console.log(_this.config.directions);\r\n            var sensitivityTests = [];\r\n            console.log(event.clientX, event.clientY);\r\n            if (_this.config.directions.indexOf('top') > -1) {\r\n                sensitivityTests.push(event.clientY < _this.config.sensitivity);\r\n            }\r\n            if (_this.config.directions.indexOf('right') > -1) {\r\n                sensitivityTests.push(event.clientX > window.innerWidth - _this.config.sensitivity);\r\n            }\r\n            if (_this.config.directions.indexOf('bottom') > -1) {\r\n                sensitivityTests.push(event.clientY > window.innerHeight - _this.config.sensitivity);\r\n            }\r\n            if (_this.config.directions.indexOf('left') > -1) {\r\n                sensitivityTests.push(event.clientX < _this.config.sensitivity);\r\n            }\r\n            if (!sensitivityTests.reduce(function (acc, curr) { return acc || curr; }))\r\n                return;\r\n            _this.delayTimer = setTimeout(_this.fire, _this.config.delay);\r\n        };\r\n        this.handleMouseEnter = function (event) {\r\n            if (_this.delayTimer) {\r\n                clearTimeout(_this.delayTimer);\r\n                _this.delayTimer = undefined;\r\n            }\r\n        };\r\n        this.config = __assign({}, this.defaultOptions, options);\r\n        setTimeout(this.attachListeners, this.config.timer);\r\n    }\r\n    EgressIntent.prototype.disable = function (options) {\r\n        var disableOptions = __assign({}, this.config, options);\r\n        document.cookie\r\n            = this.buildCookie(disableOptions.cookieName, disableOptions.cookieExpire, disableOptions.cookieDomain, disableOptions.sitewide);\r\n        this.config.target.removeEventListener('mouseleave', this.handleMouseLeave);\r\n        this.config.target.removeEventListener('mouseenter', this.handleMouseEnter);\r\n    };\r\n    EgressIntent.prototype.checkCookieValue = function (cookieName, value) {\r\n        return document.cookie.split('; ').indexOf(cookieName + \"=\" + value) >= 0;\r\n    };\r\n    EgressIntent.prototype.isDisabled = function () {\r\n        return this.checkCookieValue(this.config.cookieName, 'true') && !this.config.aggressive;\r\n    };\r\n    EgressIntent.prototype.buildCookie = function (name, expire, domain, sitewide) {\r\n        if (name === void 0) { name = this.config.cookieName; }\r\n        if (expire === void 0) { expire = this.config.cookieExpire; }\r\n        if (domain === void 0) { domain = this.config.cookieDomain; }\r\n        if (sitewide === void 0) { sitewide = this.config.sitewide; }\r\n        var time = 0;\r\n        if (expire) {\r\n            time = expire * 24 * 60 * 60 * 1000;\r\n        }\r\n        var date = new Date(Date.now() + time);\r\n        var domainString = domain\r\n            ? \";domain=\" + domain\r\n            : '';\r\n        var sitewideString = sitewide\r\n            ? '; path=/'\r\n            : '';\r\n        return name + \"=true; expires=\" + date.toUTCString() + domainString + sitewideString;\r\n    };\r\n    return EgressIntent;\r\n}());\r\nexports.default = EgressIntent;\r\n\n\n//# sourceURL=webpack://EgressIntent/./src/egress-intent.ts?");

/***/ })

/******/ });
});