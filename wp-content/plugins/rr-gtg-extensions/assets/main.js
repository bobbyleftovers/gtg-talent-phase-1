/******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/es6-promise/dist/es6-promise.js":
/*!******************************************************!*\
  !*** ./node_modules/es6-promise/dist/es6-promise.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * @overview es6-promise - a tiny implementation of Promises/A+.
 * @copyright Copyright (c) 2014 Yehuda Katz, Tom Dale, Stefan Penner and contributors (Conversion to ES6 API by Jake Archibald)
 * @license   Licensed under MIT license
 *            See https://raw.githubusercontent.com/stefanpenner/es6-promise/master/LICENSE
 * @version   v4.2.8+1e68dce6
 */

(function (global, factory) {
	 true ? module.exports = factory() :
	undefined;
}(this, (function () { 'use strict';

function objectOrFunction(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

function isFunction(x) {
  return typeof x === 'function';
}



var _isArray = void 0;
if (Array.isArray) {
  _isArray = Array.isArray;
} else {
  _isArray = function (x) {
    return Object.prototype.toString.call(x) === '[object Array]';
  };
}

var isArray = _isArray;

var len = 0;
var vertxNext = void 0;
var customSchedulerFn = void 0;

var asap = function asap(callback, arg) {
  queue[len] = callback;
  queue[len + 1] = arg;
  len += 2;
  if (len === 2) {
    // If len is 2, that means that we need to schedule an async flush.
    // If additional callbacks are queued before the queue is flushed, they
    // will be processed by this flush that we are scheduling.
    if (customSchedulerFn) {
      customSchedulerFn(flush);
    } else {
      scheduleFlush();
    }
  }
};

function setScheduler(scheduleFn) {
  customSchedulerFn = scheduleFn;
}

function setAsap(asapFn) {
  asap = asapFn;
}

var browserWindow = typeof window !== 'undefined' ? window : undefined;
var browserGlobal = browserWindow || {};
var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
var isNode = typeof self === 'undefined' && typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

// test for web worker but not in IE10
var isWorker = typeof Uint8ClampedArray !== 'undefined' && typeof importScripts !== 'undefined' && typeof MessageChannel !== 'undefined';

// node
function useNextTick() {
  // node version 0.10.x displays a deprecation warning when nextTick is used recursively
  // see https://github.com/cujojs/when/issues/410 for details
  return function () {
    return process.nextTick(flush);
  };
}

// vertx
function useVertxTimer() {
  if (typeof vertxNext !== 'undefined') {
    return function () {
      vertxNext(flush);
    };
  }

  return useSetTimeout();
}

function useMutationObserver() {
  var iterations = 0;
  var observer = new BrowserMutationObserver(flush);
  var node = document.createTextNode('');
  observer.observe(node, { characterData: true });

  return function () {
    node.data = iterations = ++iterations % 2;
  };
}

// web worker
function useMessageChannel() {
  var channel = new MessageChannel();
  channel.port1.onmessage = flush;
  return function () {
    return channel.port2.postMessage(0);
  };
}

function useSetTimeout() {
  // Store setTimeout reference so es6-promise will be unaffected by
  // other code modifying setTimeout (like sinon.useFakeTimers())
  var globalSetTimeout = setTimeout;
  return function () {
    return globalSetTimeout(flush, 1);
  };
}

var queue = new Array(1000);
function flush() {
  for (var i = 0; i < len; i += 2) {
    var callback = queue[i];
    var arg = queue[i + 1];

    callback(arg);

    queue[i] = undefined;
    queue[i + 1] = undefined;
  }

  len = 0;
}

function attemptVertx() {
  try {
    var vertx = Function('return this')().require('vertx');
    vertxNext = vertx.runOnLoop || vertx.runOnContext;
    return useVertxTimer();
  } catch (e) {
    return useSetTimeout();
  }
}

var scheduleFlush = void 0;
// Decide what async method to use to triggering processing of queued callbacks:
if (isNode) {
  scheduleFlush = useNextTick();
} else if (BrowserMutationObserver) {
  scheduleFlush = useMutationObserver();
} else if (isWorker) {
  scheduleFlush = useMessageChannel();
} else if (browserWindow === undefined && "function" === 'function') {
  scheduleFlush = attemptVertx();
} else {
  scheduleFlush = useSetTimeout();
}

function then(onFulfillment, onRejection) {
  var parent = this;

  var child = new this.constructor(noop);

  if (child[PROMISE_ID] === undefined) {
    makePromise(child);
  }

  var _state = parent._state;


  if (_state) {
    var callback = arguments[_state - 1];
    asap(function () {
      return invokeCallback(_state, child, callback, parent._result);
    });
  } else {
    subscribe(parent, child, onFulfillment, onRejection);
  }

  return child;
}

/**
  `Promise.resolve` returns a promise that will become resolved with the
  passed `value`. It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    resolve(1);
  });

  promise.then(function(value){
    // value === 1
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.resolve(1);

  promise.then(function(value){
    // value === 1
  });
  ```

  @method resolve
  @static
  @param {Any} value value that the returned promise will be resolved with
  Useful for tooling.
  @return {Promise} a promise that will become fulfilled with the given
  `value`
*/
function resolve$1(object) {
  /*jshint validthis:true */
  var Constructor = this;

  if (object && typeof object === 'object' && object.constructor === Constructor) {
    return object;
  }

  var promise = new Constructor(noop);
  resolve(promise, object);
  return promise;
}

var PROMISE_ID = Math.random().toString(36).substring(2);

function noop() {}

var PENDING = void 0;
var FULFILLED = 1;
var REJECTED = 2;

function selfFulfillment() {
  return new TypeError("You cannot resolve a promise with itself");
}

function cannotReturnOwn() {
  return new TypeError('A promises callback cannot return that same promise.');
}

function tryThen(then$$1, value, fulfillmentHandler, rejectionHandler) {
  try {
    then$$1.call(value, fulfillmentHandler, rejectionHandler);
  } catch (e) {
    return e;
  }
}

function handleForeignThenable(promise, thenable, then$$1) {
  asap(function (promise) {
    var sealed = false;
    var error = tryThen(then$$1, thenable, function (value) {
      if (sealed) {
        return;
      }
      sealed = true;
      if (thenable !== value) {
        resolve(promise, value);
      } else {
        fulfill(promise, value);
      }
    }, function (reason) {
      if (sealed) {
        return;
      }
      sealed = true;

      reject(promise, reason);
    }, 'Settle: ' + (promise._label || ' unknown promise'));

    if (!sealed && error) {
      sealed = true;
      reject(promise, error);
    }
  }, promise);
}

function handleOwnThenable(promise, thenable) {
  if (thenable._state === FULFILLED) {
    fulfill(promise, thenable._result);
  } else if (thenable._state === REJECTED) {
    reject(promise, thenable._result);
  } else {
    subscribe(thenable, undefined, function (value) {
      return resolve(promise, value);
    }, function (reason) {
      return reject(promise, reason);
    });
  }
}

function handleMaybeThenable(promise, maybeThenable, then$$1) {
  if (maybeThenable.constructor === promise.constructor && then$$1 === then && maybeThenable.constructor.resolve === resolve$1) {
    handleOwnThenable(promise, maybeThenable);
  } else {
    if (then$$1 === undefined) {
      fulfill(promise, maybeThenable);
    } else if (isFunction(then$$1)) {
      handleForeignThenable(promise, maybeThenable, then$$1);
    } else {
      fulfill(promise, maybeThenable);
    }
  }
}

function resolve(promise, value) {
  if (promise === value) {
    reject(promise, selfFulfillment());
  } else if (objectOrFunction(value)) {
    var then$$1 = void 0;
    try {
      then$$1 = value.then;
    } catch (error) {
      reject(promise, error);
      return;
    }
    handleMaybeThenable(promise, value, then$$1);
  } else {
    fulfill(promise, value);
  }
}

function publishRejection(promise) {
  if (promise._onerror) {
    promise._onerror(promise._result);
  }

  publish(promise);
}

function fulfill(promise, value) {
  if (promise._state !== PENDING) {
    return;
  }

  promise._result = value;
  promise._state = FULFILLED;

  if (promise._subscribers.length !== 0) {
    asap(publish, promise);
  }
}

function reject(promise, reason) {
  if (promise._state !== PENDING) {
    return;
  }
  promise._state = REJECTED;
  promise._result = reason;

  asap(publishRejection, promise);
}

function subscribe(parent, child, onFulfillment, onRejection) {
  var _subscribers = parent._subscribers;
  var length = _subscribers.length;


  parent._onerror = null;

  _subscribers[length] = child;
  _subscribers[length + FULFILLED] = onFulfillment;
  _subscribers[length + REJECTED] = onRejection;

  if (length === 0 && parent._state) {
    asap(publish, parent);
  }
}

function publish(promise) {
  var subscribers = promise._subscribers;
  var settled = promise._state;

  if (subscribers.length === 0) {
    return;
  }

  var child = void 0,
      callback = void 0,
      detail = promise._result;

  for (var i = 0; i < subscribers.length; i += 3) {
    child = subscribers[i];
    callback = subscribers[i + settled];

    if (child) {
      invokeCallback(settled, child, callback, detail);
    } else {
      callback(detail);
    }
  }

  promise._subscribers.length = 0;
}

function invokeCallback(settled, promise, callback, detail) {
  var hasCallback = isFunction(callback),
      value = void 0,
      error = void 0,
      succeeded = true;

  if (hasCallback) {
    try {
      value = callback(detail);
    } catch (e) {
      succeeded = false;
      error = e;
    }

    if (promise === value) {
      reject(promise, cannotReturnOwn());
      return;
    }
  } else {
    value = detail;
  }

  if (promise._state !== PENDING) {
    // noop
  } else if (hasCallback && succeeded) {
    resolve(promise, value);
  } else if (succeeded === false) {
    reject(promise, error);
  } else if (settled === FULFILLED) {
    fulfill(promise, value);
  } else if (settled === REJECTED) {
    reject(promise, value);
  }
}

function initializePromise(promise, resolver) {
  try {
    resolver(function resolvePromise(value) {
      resolve(promise, value);
    }, function rejectPromise(reason) {
      reject(promise, reason);
    });
  } catch (e) {
    reject(promise, e);
  }
}

var id = 0;
function nextId() {
  return id++;
}

function makePromise(promise) {
  promise[PROMISE_ID] = id++;
  promise._state = undefined;
  promise._result = undefined;
  promise._subscribers = [];
}

function validationError() {
  return new Error('Array Methods must be provided an Array');
}

var Enumerator = function () {
  function Enumerator(Constructor, input) {
    this._instanceConstructor = Constructor;
    this.promise = new Constructor(noop);

    if (!this.promise[PROMISE_ID]) {
      makePromise(this.promise);
    }

    if (isArray(input)) {
      this.length = input.length;
      this._remaining = input.length;

      this._result = new Array(this.length);

      if (this.length === 0) {
        fulfill(this.promise, this._result);
      } else {
        this.length = this.length || 0;
        this._enumerate(input);
        if (this._remaining === 0) {
          fulfill(this.promise, this._result);
        }
      }
    } else {
      reject(this.promise, validationError());
    }
  }

  Enumerator.prototype._enumerate = function _enumerate(input) {
    for (var i = 0; this._state === PENDING && i < input.length; i++) {
      this._eachEntry(input[i], i);
    }
  };

  Enumerator.prototype._eachEntry = function _eachEntry(entry, i) {
    var c = this._instanceConstructor;
    var resolve$$1 = c.resolve;


    if (resolve$$1 === resolve$1) {
      var _then = void 0;
      var error = void 0;
      var didError = false;
      try {
        _then = entry.then;
      } catch (e) {
        didError = true;
        error = e;
      }

      if (_then === then && entry._state !== PENDING) {
        this._settledAt(entry._state, i, entry._result);
      } else if (typeof _then !== 'function') {
        this._remaining--;
        this._result[i] = entry;
      } else if (c === Promise$1) {
        var promise = new c(noop);
        if (didError) {
          reject(promise, error);
        } else {
          handleMaybeThenable(promise, entry, _then);
        }
        this._willSettleAt(promise, i);
      } else {
        this._willSettleAt(new c(function (resolve$$1) {
          return resolve$$1(entry);
        }), i);
      }
    } else {
      this._willSettleAt(resolve$$1(entry), i);
    }
  };

  Enumerator.prototype._settledAt = function _settledAt(state, i, value) {
    var promise = this.promise;


    if (promise._state === PENDING) {
      this._remaining--;

      if (state === REJECTED) {
        reject(promise, value);
      } else {
        this._result[i] = value;
      }
    }

    if (this._remaining === 0) {
      fulfill(promise, this._result);
    }
  };

  Enumerator.prototype._willSettleAt = function _willSettleAt(promise, i) {
    var enumerator = this;

    subscribe(promise, undefined, function (value) {
      return enumerator._settledAt(FULFILLED, i, value);
    }, function (reason) {
      return enumerator._settledAt(REJECTED, i, reason);
    });
  };

  return Enumerator;
}();

/**
  `Promise.all` accepts an array of promises, and returns a new promise which
  is fulfilled with an array of fulfillment values for the passed promises, or
  rejected with the reason of the first passed promise to be rejected. It casts all
  elements of the passed iterable to promises as it runs this algorithm.

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = resolve(2);
  let promise3 = resolve(3);
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // The array here would be [ 1, 2, 3 ];
  });
  ```

  If any of the `promises` given to `all` are rejected, the first promise
  that is rejected will be given as an argument to the returned promises's
  rejection handler. For example:

  Example:

  ```javascript
  let promise1 = resolve(1);
  let promise2 = reject(new Error("2"));
  let promise3 = reject(new Error("3"));
  let promises = [ promise1, promise2, promise3 ];

  Promise.all(promises).then(function(array){
    // Code here never runs because there are rejected promises!
  }, function(error) {
    // error.message === "2"
  });
  ```

  @method all
  @static
  @param {Array} entries array of promises
  @param {String} label optional string for labeling the promise.
  Useful for tooling.
  @return {Promise} promise that is fulfilled when all `promises` have been
  fulfilled, or rejected if any of them become rejected.
  @static
*/
function all(entries) {
  return new Enumerator(this, entries).promise;
}

/**
  `Promise.race` returns a new promise which is settled in the same way as the
  first passed promise to settle.

  Example:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 2');
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // result === 'promise 2' because it was resolved before promise1
    // was resolved.
  });
  ```

  `Promise.race` is deterministic in that only the state of the first
  settled promise matters. For example, even if other promises given to the
  `promises` array argument are resolved, but the first settled promise has
  become rejected before the other promises became fulfilled, the returned
  promise will become rejected:

  ```javascript
  let promise1 = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('promise 1');
    }, 200);
  });

  let promise2 = new Promise(function(resolve, reject){
    setTimeout(function(){
      reject(new Error('promise 2'));
    }, 100);
  });

  Promise.race([promise1, promise2]).then(function(result){
    // Code here never runs
  }, function(reason){
    // reason.message === 'promise 2' because promise 2 became rejected before
    // promise 1 became fulfilled
  });
  ```

  An example real-world use case is implementing timeouts:

  ```javascript
  Promise.race([ajax('foo.json'), timeout(5000)])
  ```

  @method race
  @static
  @param {Array} promises array of promises to observe
  Useful for tooling.
  @return {Promise} a promise which settles in the same way as the first passed
  promise to settle.
*/
function race(entries) {
  /*jshint validthis:true */
  var Constructor = this;

  if (!isArray(entries)) {
    return new Constructor(function (_, reject) {
      return reject(new TypeError('You must pass an array to race.'));
    });
  } else {
    return new Constructor(function (resolve, reject) {
      var length = entries.length;
      for (var i = 0; i < length; i++) {
        Constructor.resolve(entries[i]).then(resolve, reject);
      }
    });
  }
}

/**
  `Promise.reject` returns a promise rejected with the passed `reason`.
  It is shorthand for the following:

  ```javascript
  let promise = new Promise(function(resolve, reject){
    reject(new Error('WHOOPS'));
  });

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  Instead of writing the above, your code now simply becomes the following:

  ```javascript
  let promise = Promise.reject(new Error('WHOOPS'));

  promise.then(function(value){
    // Code here doesn't run because the promise is rejected!
  }, function(reason){
    // reason.message === 'WHOOPS'
  });
  ```

  @method reject
  @static
  @param {Any} reason value that the returned promise will be rejected with.
  Useful for tooling.
  @return {Promise} a promise rejected with the given `reason`.
*/
function reject$1(reason) {
  /*jshint validthis:true */
  var Constructor = this;
  var promise = new Constructor(noop);
  reject(promise, reason);
  return promise;
}

function needsResolver() {
  throw new TypeError('You must pass a resolver function as the first argument to the promise constructor');
}

function needsNew() {
  throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
}

/**
  Promise objects represent the eventual result of an asynchronous operation. The
  primary way of interacting with a promise is through its `then` method, which
  registers callbacks to receive either a promise's eventual value or the reason
  why the promise cannot be fulfilled.

  Terminology
  -----------

  - `promise` is an object or function with a `then` method whose behavior conforms to this specification.
  - `thenable` is an object or function that defines a `then` method.
  - `value` is any legal JavaScript value (including undefined, a thenable, or a promise).
  - `exception` is a value that is thrown using the throw statement.
  - `reason` is a value that indicates why a promise was rejected.
  - `settled` the final resting state of a promise, fulfilled or rejected.

  A promise can be in one of three states: pending, fulfilled, or rejected.

  Promises that are fulfilled have a fulfillment value and are in the fulfilled
  state.  Promises that are rejected have a rejection reason and are in the
  rejected state.  A fulfillment value is never a thenable.

  Promises can also be said to *resolve* a value.  If this value is also a
  promise, then the original promise's settled state will match the value's
  settled state.  So a promise that *resolves* a promise that rejects will
  itself reject, and a promise that *resolves* a promise that fulfills will
  itself fulfill.


  Basic Usage:
  ------------

  ```js
  let promise = new Promise(function(resolve, reject) {
    // on success
    resolve(value);

    // on failure
    reject(reason);
  });

  promise.then(function(value) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Advanced Usage:
  ---------------

  Promises shine when abstracting away asynchronous interactions such as
  `XMLHttpRequest`s.

  ```js
  function getJSON(url) {
    return new Promise(function(resolve, reject){
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url);
      xhr.onreadystatechange = handler;
      xhr.responseType = 'json';
      xhr.setRequestHeader('Accept', 'application/json');
      xhr.send();

      function handler() {
        if (this.readyState === this.DONE) {
          if (this.status === 200) {
            resolve(this.response);
          } else {
            reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
          }
        }
      };
    });
  }

  getJSON('/posts.json').then(function(json) {
    // on fulfillment
  }, function(reason) {
    // on rejection
  });
  ```

  Unlike callbacks, promises are great composable primitives.

  ```js
  Promise.all([
    getJSON('/posts'),
    getJSON('/comments')
  ]).then(function(values){
    values[0] // => postsJSON
    values[1] // => commentsJSON

    return values;
  });
  ```

  @class Promise
  @param {Function} resolver
  Useful for tooling.
  @constructor
*/

var Promise$1 = function () {
  function Promise(resolver) {
    this[PROMISE_ID] = nextId();
    this._result = this._state = undefined;
    this._subscribers = [];

    if (noop !== resolver) {
      typeof resolver !== 'function' && needsResolver();
      this instanceof Promise ? initializePromise(this, resolver) : needsNew();
    }
  }

  /**
  The primary way of interacting with a promise is through its `then` method,
  which registers callbacks to receive either a promise's eventual value or the
  reason why the promise cannot be fulfilled.
   ```js
  findUser().then(function(user){
    // user is available
  }, function(reason){
    // user is unavailable, and you are given the reason why
  });
  ```
   Chaining
  --------
   The return value of `then` is itself a promise.  This second, 'downstream'
  promise is resolved with the return value of the first promise's fulfillment
  or rejection handler, or rejected if the handler throws an exception.
   ```js
  findUser().then(function (user) {
    return user.name;
  }, function (reason) {
    return 'default name';
  }).then(function (userName) {
    // If `findUser` fulfilled, `userName` will be the user's name, otherwise it
    // will be `'default name'`
  });
   findUser().then(function (user) {
    throw new Error('Found user, but still unhappy');
  }, function (reason) {
    throw new Error('`findUser` rejected and we're unhappy');
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // if `findUser` fulfilled, `reason` will be 'Found user, but still unhappy'.
    // If `findUser` rejected, `reason` will be '`findUser` rejected and we're unhappy'.
  });
  ```
  If the downstream promise does not specify a rejection handler, rejection reasons will be propagated further downstream.
   ```js
  findUser().then(function (user) {
    throw new PedagogicalException('Upstream error');
  }).then(function (value) {
    // never reached
  }).then(function (value) {
    // never reached
  }, function (reason) {
    // The `PedgagocialException` is propagated all the way down to here
  });
  ```
   Assimilation
  ------------
   Sometimes the value you want to propagate to a downstream promise can only be
  retrieved asynchronously. This can be achieved by returning a promise in the
  fulfillment or rejection handler. The downstream promise will then be pending
  until the returned promise is settled. This is called *assimilation*.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // The user's comments are now available
  });
  ```
   If the assimliated promise rejects, then the downstream promise will also reject.
   ```js
  findUser().then(function (user) {
    return findCommentsByAuthor(user);
  }).then(function (comments) {
    // If `findCommentsByAuthor` fulfills, we'll have the value here
  }, function (reason) {
    // If `findCommentsByAuthor` rejects, we'll have the reason here
  });
  ```
   Simple Example
  --------------
   Synchronous Example
   ```javascript
  let result;
   try {
    result = findResult();
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
  findResult(function(result, err){
    if (err) {
      // failure
    } else {
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findResult().then(function(result){
    // success
  }, function(reason){
    // failure
  });
  ```
   Advanced Example
  --------------
   Synchronous Example
   ```javascript
  let author, books;
   try {
    author = findAuthor();
    books  = findBooksByAuthor(author);
    // success
  } catch(reason) {
    // failure
  }
  ```
   Errback Example
   ```js
   function foundBooks(books) {
   }
   function failure(reason) {
   }
   findAuthor(function(author, err){
    if (err) {
      failure(err);
      // failure
    } else {
      try {
        findBoooksByAuthor(author, function(books, err) {
          if (err) {
            failure(err);
          } else {
            try {
              foundBooks(books);
            } catch(reason) {
              failure(reason);
            }
          }
        });
      } catch(error) {
        failure(err);
      }
      // success
    }
  });
  ```
   Promise Example;
   ```javascript
  findAuthor().
    then(findBooksByAuthor).
    then(function(books){
      // found books
  }).catch(function(reason){
    // something went wrong
  });
  ```
   @method then
  @param {Function} onFulfilled
  @param {Function} onRejected
  Useful for tooling.
  @return {Promise}
  */

  /**
  `catch` is simply sugar for `then(undefined, onRejection)` which makes it the same
  as the catch block of a try/catch statement.
  ```js
  function findAuthor(){
  throw new Error('couldn't find that author');
  }
  // synchronous
  try {
  findAuthor();
  } catch(reason) {
  // something went wrong
  }
  // async with promises
  findAuthor().catch(function(reason){
  // something went wrong
  });
  ```
  @method catch
  @param {Function} onRejection
  Useful for tooling.
  @return {Promise}
  */


  Promise.prototype.catch = function _catch(onRejection) {
    return this.then(null, onRejection);
  };

  /**
    `finally` will be invoked regardless of the promise's fate just as native
    try/catch/finally behaves
  
    Synchronous example:
  
    ```js
    findAuthor() {
      if (Math.random() > 0.5) {
        throw new Error();
      }
      return new Author();
    }
  
    try {
      return findAuthor(); // succeed or fail
    } catch(error) {
      return findOtherAuther();
    } finally {
      // always runs
      // doesn't affect the return value
    }
    ```
  
    Asynchronous example:
  
    ```js
    findAuthor().catch(function(reason){
      return findOtherAuther();
    }).finally(function(){
      // author was either found, or not
    });
    ```
  
    @method finally
    @param {Function} callback
    @return {Promise}
  */


  Promise.prototype.finally = function _finally(callback) {
    var promise = this;
    var constructor = promise.constructor;

    if (isFunction(callback)) {
      return promise.then(function (value) {
        return constructor.resolve(callback()).then(function () {
          return value;
        });
      }, function (reason) {
        return constructor.resolve(callback()).then(function () {
          throw reason;
        });
      });
    }

    return promise.then(callback, callback);
  };

  return Promise;
}();

Promise$1.prototype.then = then;
Promise$1.all = all;
Promise$1.race = race;
Promise$1.resolve = resolve$1;
Promise$1.reject = reject$1;
Promise$1._setScheduler = setScheduler;
Promise$1._setAsap = setAsap;
Promise$1._asap = asap;

/*global self*/
function polyfill() {
  var local = void 0;

  if (typeof global !== 'undefined') {
    local = global;
  } else if (typeof self !== 'undefined') {
    local = self;
  } else {
    try {
      local = Function('return this')();
    } catch (e) {
      throw new Error('polyfill failed because global object is unavailable in this environment');
    }
  }

  var P = local.Promise;

  if (P) {
    var promiseToString = null;
    try {
      promiseToString = Object.prototype.toString.call(P.resolve());
    } catch (e) {
      // silently ignored
    }

    if (promiseToString === '[object Promise]' && !P.cast) {
      return;
    }
  }

  local.Promise = Promise$1;
}

// Strange compat..
Promise$1.polyfill = polyfill;
Promise$1.Promise = Promise$1;

return Promise$1;

})));



//# sourceMappingURL=es6-promise.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/tweezer.js/dist/tweezer.module.js":
/*!********************************************************!*\
  !*** ./node_modules/tweezer.js/dist/tweezer.module.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SingleTweener = function () {
  function SingleTweener() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, SingleTweener);

    this.start = opts.start;
    this.end = opts.end;
    this.decimal = opts.decimal;
  }

  _createClass(SingleTweener, [{
    key: "getIntermediateValue",
    value: function getIntermediateValue(tick) {
      if (this.decimal) {
        return tick;
      } else {
        return Math.round(tick);
      }
    }
  }, {
    key: "getFinalValue",
    value: function getFinalValue() {
      return this.end;
    }
  }]);

  return SingleTweener;
}();

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tweezer = function () {
  function Tweezer() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck$1(this, Tweezer);

    this.duration = opts.duration || 1000;
    this.ease = opts.easing || this._defaultEase;
    this.tweener = opts.tweener || new SingleTweener(opts);
    this.start = this.tweener.start;
    this.end = this.tweener.end;

    this.frame = null;
    this.next = null;
    this.isRunning = false;
    this.events = {};
    this.direction = this.start < this.end ? 'up' : 'down';
  }

  _createClass$1(Tweezer, [{
    key: 'begin',
    value: function begin() {
      if (!this.isRunning && this.next !== this.end) {
        this.frame = window.requestAnimationFrame(this._tick.bind(this));
      }
      return this;
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.cancelAnimationFrame(this.frame);
      this.isRunning = false;
      this.frame = null;
      this.timeStart = null;
      this.next = null;
      return this;
    }
  }, {
    key: 'on',
    value: function on(name, handler) {
      this.events[name] = this.events[name] || [];
      this.events[name].push(handler);
      return this;
    }
  }, {
    key: '_emit',
    value: function _emit(name, val) {
      var _this = this;

      var e = this.events[name];
      e && e.forEach(function (handler) {
        return handler.call(_this, val);
      });
    }
  }, {
    key: '_tick',
    value: function _tick(currentTime) {
      this.isRunning = true;

      var lastTick = this.next || this.start;

      if (!this.timeStart) this.timeStart = currentTime;
      this.timeElapsed = currentTime - this.timeStart;
      this.next = this.ease(this.timeElapsed, this.start, this.end - this.start, this.duration);

      if (this._shouldTick(lastTick)) {
        this._emit('tick', this.tweener.getIntermediateValue(this.next));
        this.frame = window.requestAnimationFrame(this._tick.bind(this));
      } else {
        this._emit('tick', this.tweener.getFinalValue());
        this._emit('done', null);
      }
    }
  }, {
    key: '_shouldTick',
    value: function _shouldTick(lastTick) {
      return {
        up: this.next < this.end && lastTick <= this.next,
        down: this.next > this.end && lastTick >= this.next
      }[this.direction];
    }
  }, {
    key: '_defaultEase',
    value: function _defaultEase(t, b, c, d) {
      if ((t /= d / 2) < 1) return c / 2 * t * t + b;
      return -c / 2 * (--t * (t - 2) - 1) + b;
    }
  }]);

  return Tweezer;
}();

/* harmony default export */ __webpack_exports__["default"] = (Tweezer);


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/js/components/header.js":
/*!*************************************!*\
  !*** ./src/js/components/header.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_scroll_to__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/scroll-to */ "./src/js/lib/scroll-to.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var Header = /*#__PURE__*/function () {
  function Header() {
    _classCallCheck(this, Header);

    this.navItems = document.querySelectorAll('.scroll-nav');
    this.init();
  }

  _createClass(Header, [{
    key: "init",
    value: function init() {
      var self = this;
      this.navItems.forEach(function (item) {
        var link = item.querySelector('a');
        var toHash = null;
        item.classList.forEach(function (cls) {
          if (cls.includes('scroll-nav--')) {
            toHash = cls.split('--')[1];
          }
        });

        if (toHash && document.querySelector('#' + toHash)) {
          link.addEventListener('click', function (e) {
            e.preventDefault();
            var section = document.querySelector('#' + toHash);
            window.scrollTo({
              top: section.scrollTop + 70,
              left: 0,
              behavior: 'smooth'
            });
          });
        }
      });
    }
  }]);

  return Header;
}();

/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./src/js/lib/dom.js":
/*!***************************!*\
  !*** ./src/js/lib/dom.js ***!
  \***************************/
/*! exports provided: addClass, append, appendHtml, appendNode, createElement, createNodes, closest, delegate, doesSupportObjectFit, getAttribute, getChildren, getHeight, getTopOffset, getTopPosition, getData, getModuleOptions, getParent, getScrollTop, getStyle, hasClass, hide, on, onEscape, onEnter, onPassive, onFocus, onBlur, loadScript, matches, prepend, preventDefault, ready, remove, removeClass, scrollTop, select, selectAll, setAttribute, setData, setHeight, setStyle, toggleClass, toggleLabel, triggerReflow, trigger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClass", function() { return addClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "append", function() { return append; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendHtml", function() { return appendHtml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendNode", function() { return appendNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNodes", function() { return createNodes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closest", function() { return closest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "delegate", function() { return delegate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doesSupportObjectFit", function() { return doesSupportObjectFit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttribute", function() { return getAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChildren", function() { return getChildren; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHeight", function() { return getHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopOffset", function() { return getTopOffset; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTopPosition", function() { return getTopPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getData", function() { return getData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getModuleOptions", function() { return getModuleOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getParent", function() { return getParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollTop", function() { return getScrollTop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyle", function() { return getStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasClass", function() { return hasClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hide", function() { return hide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "on", function() { return on; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onEscape", function() { return onEscape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onEnter", function() { return onEnter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onPassive", function() { return onPassive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onFocus", function() { return onFocus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "onBlur", function() { return onBlur; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadScript", function() { return loadScript; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "matches", function() { return matches; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "prepend", function() { return prepend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "preventDefault", function() { return preventDefault; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ready", function() { return ready; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeClass", function() { return removeClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollTop", function() { return scrollTop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "select", function() { return select; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "selectAll", function() { return selectAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAttribute", function() { return setAttribute; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setData", function() { return setData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHeight", function() { return setHeight; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setStyle", function() { return setStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleClass", function() { return toggleClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleLabel", function() { return toggleLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "triggerReflow", function() { return triggerReflow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "trigger", function() { return trigger; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/js/lib/utils.js");
/* harmony import */ var tweezer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tweezer.js */ "./node_modules/tweezer.js/dist/tweezer.module.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(es6_promise__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* global Element, getComputedStyle, CustomEvent */




var _getElementRect = function _getElementRect(el) {
  return el.getBoundingClientRect();
};
/**
 * Add class to a list of elements. This is a curried function.
 *
 * @param {string} className
 * @param {Array<HTMLElement>} els
 * @return {Array<HTMLElement>} Same elements for chaining
 */


var addClass = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (className, els) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(function (el) {
    el.classList.add(className);
    return el;
  }, els);
});
var append = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (parent, els) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(function (el) {
    return parent.appendChild(el);
  }, els);
});
var prepend = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (parent, els) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(function (el) {
    return parent.insertBefore(el, parent.firstChild);
  }, Array.isArray(els) ? els.reverse() : els);
});

var appendHtml = function appendHtml(el, html) {
  el.insertAdjacentHTML('beforeend', html);
  return el;
};

var appendNode = function appendNode(el, node) {
  el.parentNode.insertBefore(node, el.nextSibling);
  return el;
};

var createNodes = function createNodes(html) {
  var wrapper = document.createElement('div');
  appendHtml(wrapper, html);
  return getChildren(wrapper);
};

var preventDefault = function preventDefault(e) {
  e.preventDefault();
  return e;
};
/**
 * Set style for an element.
 *
 * This is a curried function.
 *
 * @param {string} k Style name
 * @param {string} v Style value
 * @param {HTMLElement} el Element
 * @return {HTMLElement}
 */


var setStyle = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (k, v, el) {
  el.style[k] = v;
  return el;
});
var setHeight = setStyle('height');
var hide = setStyle('display', 'none');
/**
 * Get a style for an element.
 *
 * This is a curried function.
 *
 * @param {string} k Style name
 * @param {HTMLElement} el
 * @return {string}
 */

var getStyle = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (k, el) {
  return getComputedStyle(el)[k];
});
/**
 * Get actual height of an element, including padding
 *
 * @param {HTMLElement} el
 * @return {number}
 */

var getHeight = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getProp"])('clientHeight');
/**
 * Get scroll top position of an element.
 *
 * Default to getting scrolling position of the viewport
 *
 * @param {HTMLElement} el
 * @return {number}
 */

var getScrollTop = function getScrollTop() {
  var el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.documentElement;
  return el === document.documentElement ? window.pageYOffset || el.scrollTop : el.scrollTop;
};
/**
 * Check to see if an element has a specified class.
 *
 * @param {string} className
 * @param {HTMLElement} el
 */


var hasClass = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (className, el) {
  return el.classList.contains(className);
});
/**
 * Get attribute value for an element.
 *
 * @param {string} name
 * @param {HTMLElement} el
 * @return {string}
 * @private
 */

var _getAttribute = function _getAttribute(name, el) {
  return el.getAttribute(name);
};
/**
 * Get attribute value for an element.
 *
 * This is a curried function
 *
 * @param {string} name
 * @param {HTMLElement} el
 * @return {string}
 */


var getAttribute = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(_getAttribute);
var setAttribute = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (name, value, el) {
  el.setAttribute(name, value);
  return el;
});
/**
 * Get data attribute.
 *
 * @param {string} name
 * @param {HTMLElement} el
 * @return {string} Parsed JSON value or object
 * @private
 */

var _getData = function _getData(name, el) {
  return _getAttribute('data-' + name, el);
};
/**
 * Get data attribute.
 *
 * This is a curried function
 *
 * @param {string} name
 * @param {HTMLElement} el
 * @return {string}
 */


var getData = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(_getData);
var setData = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (name, value, el) {
  return setAttribute('data-' + name, value, el);
});
/**
 * Attach event handler for a single event
 *
 * @param {string} event
 * @param {Function} handler
 * @param {Object} capture
 * @param {HTMLElement} el
 * @returns {HTMLElement}
 * @private
 */

var _on = function _on(event, handler, capture, el) {
  el.addEventListener(event, handler, capture, el);
  return el;
};

var matches = function matches(selector, el) {
  return (Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector).apply(el, [selector]);
};
/**
 * Attach event handler for a list of events.
 *
 * This is a curried function
 *
 * @param {Array|Object} els Array or array-like object
 * @param {string} event
 * @param {Function} handler
 * @return {Array<HTMLElement>}
 */


var on = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (event, handler, els) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["partial"])(_on, event, handler, {}), els);
});
var onPassive = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (event, handler, els) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["partial"])(_on, event, handler, {
    passive: true
  }), els);
});
/**
 * Check to see if document has loaded
 *
 * @return {boolean}
 * @private
 */

var _domLoaded = function _domLoaded() {
  return document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading';
};
/**
 * Call function when document is ready
 *
 * @param {Function} f
 */


var ready = function ready(f) {
  return _domLoaded() ? f() : on('DOMContentLoaded', f, document);
};

var closest = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (selector, el) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["whileDo"])(function (target) {
    return target && !matches(selector, target) && target.parentNode;
  }, function (target) {
    return target.parentNode === document ? null : target.parentNode;
  }, el.parentNode);
});

var _delegate = function _delegate(event, handler, selector, el) {
  return _on(event, function (e) {
    var matchedElement = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["whileDo"])(function (target) {
      return target && target !== document && !matches(selector, target) && target.parentNode;
    }, function (target) {
      return target.parentNode;
    }, e.target);

    if (matchedElement !== document && matches(selector, matchedElement)) {
      handler.apply(el, [e]);
    }
  }, {}, el);
};

var delegate = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (event, handler, selector, els) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["partial"])(_delegate, event, handler, selector), els);
});

var remove = function remove(el) {
  return el.parentNode.removeChild(el);
};
/**
 * Remove class from a list of elements. This is a curried function.
 *
 * @param {string} className
 * @param {Array<HTMLElement>} els
 * @return {Array<HTMLElement>} Same elements for chaining
 */


var removeClass = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (className, els) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(function (el) {
    el.classList.remove(className);
    return el;
  }, els);
});
var toggleClass = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["curry"])(function (className, els) {
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(function (el) {
    el.classList.toggle(className);
    return el;
  }, els);
});
/**
 * Select one element matching a selector, which is also decendant of a parent element (defaults to document)
 * @param {string} selector
 * @param {HTMLElement|HTMLDocument=} parent
 * @return {HTMLElement}
 */

var select = function select(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return parent.querySelector(selector);
};
/**
 * Select all elements matching a selector, which are also decendant of a parent element (defaults to document)
 * @param {string} selector
 * @param {HTMLElement|HTMLDocument=} parent
 * @return {Array<HTMLElement>}
 */


var selectAll = function selectAll(selector) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["makeArray"])(parent.querySelectorAll(selector));
};

var getChildren = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getProp"])('children'), _utils__WEBPACK_IMPORTED_MODULE_0__["makeArray"]);
var getParent = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getProp"])('parentNode');

var getTopOffset = function getTopOffset(el) {
  return _getElementRect(el).top + getScrollTop();
};

var getTopPosition = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getProp"])('offsetTop');

var scrollTop = function scrollTop(offset, callback, el) {
  new tweezer_js__WEBPACK_IMPORTED_MODULE_1__["default"]({
    start: getScrollTop(el),
    end: offset
  }).on('tick', function (v) {
    typeof el === 'undefined' ? window.scrollTo(0, v) : Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setProp"])('scrollTop', v, el);
  }).on('done', function () {
    if (typeof callback !== 'undefined') {
      callback();
    }
  }).begin();
};
/**
 * Trigger reflows so that transition happens after DOM insertion
 */


var triggerReflow = function triggerReflow(els) {
  Object(_utils__WEBPACK_IMPORTED_MODULE_0__["map"])(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getProp"])('offsetHeight'), els);
  return els;
};

var doesSupportObjectFit = function doesSupportObjectFit() {
  return Object.keys(document.documentElement.style).reduce(function (support, prop) {
    return support || /object(?:-f|F)it$/.test(prop);
  }, false);
};

var trigger = function trigger(eventName, el) {
  var event;
  var data = {};

  if (_typeof(eventName) === 'object') {
    data = eventName.data;
    eventName = eventName.event;
  }

  if (typeof window.CustomEvent === 'function') {
    event = new CustomEvent(eventName, {
      detail: {
        some: 'data'
      }
    });
  } else {
    event = document.createEvent('CustomEvent');
    event.initCustomEvent(eventName, true, true, data);
  }

  el.dispatchEvent(event);
  return el;
};

var createElement = function createElement(tag) {
  return document.createElement(tag);
};

var createScriptTag = function createScriptTag(src) {
  var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var defer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["pipe"])(createElement, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setProp"])('src', src), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setProp"])('async', async), Object(_utils__WEBPACK_IMPORTED_MODULE_0__["setProp"])('defer', defer))('script');
};

var loadScript = function loadScript(src) {
  var async = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var defer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  return new es6_promise__WEBPACK_IMPORTED_MODULE_2__["Promise"](function (resolve, reject) {
    var tag = createScriptTag(src, async, defer);
    tag.onload = resolve;
    tag.onerror = reject;
    append(document.body, tag);
  });
};

var getModuleOptions = function getModuleOptions(moduleName, el) {
  var def = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["parseOptions"])(getData(moduleName, el), def);
};
/**
 * Run method when element focused
 *
 * @param {element}
 * @param {function}
 * @return null
 */


var onFocus = function onFocus(el, callback) {
  el && el.addEventListener('focusin', function (e) {
    try {
      callback(el);
    } catch (e) {
      console.warn(e);
    }
  });
};
/**
 * Run method when element unfocused
 *
 * @param {element}
 * @param {function}
 * @return null
 */


var onBlur = function onBlur(el, callback) {
  el && el.addEventListener('focusout', function (e) {
    try {
      callback(el);
    } catch (e) {
      console.warn(e);
    }
  });
};
/**
 * Run method when escape key pressed
 *
 * @param {element}
 * @param {function}
 * @return null
 */


var onEscape = function onEscape(el, callback) {
  el.addEventListener('keyup', function (e) {
    var eventkey = false;

    if (e.key !== undefined) {
      eventkey = e.key;
    } else if (e.keyIdentifier !== undefined) {
      eventkey = e.keyIdentifier;
    } else if (e.keyCode !== undefined) {
      eventkey = e.keyCode;
    }

    if (eventkey === 'Escape' || eventkey === 'Esc' || eventkey === 27) {
      try {
        callback(el);
      } catch (e) {
        console.warn(e);
      }
    }
  });
};
/**
 * Run method when escape key pressed
 *
 * @param {element}
 * @param {function}
 * @return null
 */


var onEnter = function onEnter(el, callback) {
  el.addEventListener('keyup', function (e) {
    var eventkey = false;

    if (e.key !== undefined) {
      eventkey = e.key;
    } else if (e.keyIdentifier !== undefined) {
      eventkey = e.keyIdentifier;
    } else if (e.keyCode !== undefined) {
      eventkey = e.keyCode;
    }

    if (eventkey === '13') {
      try {
        callback(el);
      } catch (e) {
        console.warn(e);
      }
    }
  });
};
/**
 * We use <label> tags instead of input placeholders to better align with ADA standards
 * This function is used to toggle a class on label tags to control their visibilty
 *
 * @param {HTMLElement} e - The element fo which the label is being controlled
 * @param {String} parentSelector - The classname of the inputs parent conteiner to scope the event
 */


var toggleLabel = function toggleLabel(e, parentSelector) {
  var inputContainer = closest(parentSelector, e.target);

  if (document.activeElement !== e.target && !e.target.value || e.target.localName === 'select' && e.target.value === 'all') {
    removeClass('hide-label', inputContainer);
  } else {
    addClass('hide-label', inputContainer);
  }
};



/***/ }),

/***/ "./src/js/lib/get-hash-target.js":
/*!***************************************!*\
  !*** ./src/js/lib/get-hash-target.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * @param {HTMLElement} anchor Target element to bind <a> clicks to
 * @return {HTMLElement}
 */
function getTarget(anchor) {
  var hash = anchor.hash || false;
  var query = hash && hash.length ? document.querySelectorAll(hash) : null;
  var target = query && query.length ? query[0] : null;
  return target || null;
}

/* harmony default export */ __webpack_exports__["default"] = (getTarget);

/***/ }),

/***/ "./src/js/lib/scroll-to.js":
/*!*********************************!*\
  !*** ./src/js/lib/scroll-to.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return scrollTo; });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/js/lib/dom.js");
/* harmony import */ var _get_hash_target_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-hash-target.js */ "./src/js/lib/get-hash-target.js");


/**
 * @param {HTMLElement} el Container element to bind <a> clicks to
 */

function scrollTo(el) {
  var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
  Object(_dom__WEBPACK_IMPORTED_MODULE_0__["delegate"])('click', function (e) {
    var anchor = e.target;
    var target = Object(_get_hash_target_js__WEBPACK_IMPORTED_MODULE_1__["default"])(anchor);

    if (target) {
      e.preventDefault();
      Object(_dom__WEBPACK_IMPORTED_MODULE_0__["scrollTop"])(Object(_dom__WEBPACK_IMPORTED_MODULE_0__["getTopOffset"])(target) - 70);
      cb();
    }
  }, 'a', el);
}

/***/ }),

/***/ "./src/js/lib/utils.js":
/*!*****************************!*\
  !*** ./src/js/lib/utils.js ***!
  \*****************************/
/*! exports provided: add, allPass, always, anyPass, cond, count, debounce, doesSupportObjectFit, doesSupportObjectPosition, log, logArgs, logWrap, makeArray, curry, divide, filter, first, flipArgs, getProp, identity, ifElse, inArray, parseOptions, last, lt, map, multiply, not, nth, partial, pipe, range, returnTrue, returnFalse, setProp, staggerCallback, then, throttle, reject, tryCatch, when, whileDo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "allPass", function() { return allPass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "always", function() { return always; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "anyPass", function() { return anyPass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cond", function() { return cond; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "count", function() { return count; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "debounce", function() { return debounce; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doesSupportObjectFit", function() { return doesSupportObjectFit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "doesSupportObjectPosition", function() { return doesSupportObjectPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "log", function() { return log; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logArgs", function() { return logArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "logWrap", function() { return logWrap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeArray", function() { return makeArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "curry", function() { return curry; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "divide", function() { return divide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "first", function() { return first; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flipArgs", function() { return flipArgs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getProp", function() { return getProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "identity", function() { return identity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ifElse", function() { return ifElse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "inArray", function() { return inArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseOptions", function() { return parseOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "last", function() { return last; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "lt", function() { return lt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "map", function() { return map; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multiply", function() { return multiply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "not", function() { return not; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nth", function() { return nth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "partial", function() { return partial; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "range", function() { return range; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnTrue", function() { return returnTrue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "returnFalse", function() { return returnFalse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setProp", function() { return setProp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staggerCallback", function() { return staggerCallback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "then", function() { return then; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throttle", function() { return throttle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reject", function() { return reject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tryCatch", function() { return tryCatch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "when", function() { return when; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "whileDo", function() { return whileDo; });
var _this = undefined;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Function that always returns True
 */
var returnTrue = function returnTrue() {
  return true;
};
/**
 * Function that always returns false
 */


var returnFalse = function returnFalse() {
  return false;
};
/**
 * Identity function
 * @param {*} val
 * @return {*}
 */


var identity = function identity(val) {
  return val;
};

var not = function not(val) {
  return !val;
};
/**
 * Returns a curried function of the provided function, so that:
 *
 * f(a, b, c) = f(a, b)(c) = f(a)(b)(c) = f(a)(b, c)
 *
 * @param {Function} f
 * @param {..*} Initial parameters
 * @return {Function} The curried function
 */


var curry = function curry(f) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return args.length >= f.length ? f.apply(void 0, args) : curry.bind.apply(curry, [_this, f].concat(args));
};

var allPass = function allPass(fs) {
  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    for (var i = 0; i < fs.length; i++) {
      if (!fs[i].apply(_this, args)) {
        return false;
      }
    }

    return true;
  };
};
/**
 * Takes in a list of predicates and return a function that will
 * pass its arguments through each of the predicates, returning
 * true if any predicate is satisfied.
 *
 * @param {Array<Function>}
 * @return {Function}
 */


var anyPass = function anyPass(fs) {
  return function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    for (var i = 0; i < fs.length; i++) {
      if (fs[i].apply(_this, args)) {
        return true;
      }
    }

    return false;
  };
};
/**
 * Encapsulates switch/case or if/else logic.
 *
 * Takes a list of [predicate, transformer] pairs.
 *
 * The returned function passes its arguments to predicates, evaluates them, and execute the matched transformer (passing the
 * same arguments). If there's no matched predicate, return undefined.
 *
 * @param pairs Pairs of [predicate, transformer]
 * @return {Function} Encapsulated function
 */


var cond = function cond(pairs) {
  return function () {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    for (var i = 0; i < pairs.length; i++) {
      if (pairs[i][0].apply(_this, args)) {
        return pairs[i][1].apply(_this, args);
      }
    }

    return undefined;
  };
};
/**
 * Encapsulate if/else logic. Basically a wrapper of `cond`.
 *
 * @param p Predicate
 * @param {Function} fT Function to call when predicate is true
 * @param {Function} fF Function to call when predicate is false
 * @return {Function} Encapsulated function
 */


var ifElse = function ifElse(p, fT, fF) {
  return cond([[p, fT], [returnTrue, fF]]);
};

var when = function when(p, f) {
  return cond([[p, f], [returnTrue, identity]]);
};
/**
 * Functional wrapper for array map function.
 *
 * @param {Function} f
 * @param {*} arr
 */


var map = curry(function (f, arr) {
  return Array.isArray(arr) ? arr.map(f) : f(arr);
});
var filter = curry(function (f, arr) {
  return Array.isArray(arr) ? arr.filter(f) : f(arr) ? arr : undefined;
});
/**
 * Partial application
 * @param {Function} f
 * @param {..*} args Initial parameters
 */

var partial = function partial(f) {
  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return f.bind.apply(f, [_this].concat(args));
};
/**
 * Transform a value by chaining a list of function from left to right
 *
 * @param val
 * @param {..Function} funcs
 * @return {*}
 */


var pipe = function pipe() {
  for (var _len6 = arguments.length, funcs = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
    funcs[_key6] = arguments[_key6];
  }

  return function (val) {
    var _this2 = this;

    return funcs.reduce(function (acc, f) {
      return f.apply(_this2, [acc]);
    }, val);
  };
};

var always = function always(val) {
  return partial(val);
};
/**
 * Get property of an object.
 *
 * This is a curried function.
 *
 * @param {string} prop
 * @param {Object} obj
 * @return {*}
 */


var getProp = curry(function (prop, obj) {
  return obj[prop];
});
var lt = curry(function (b, a) {
  return a < b;
});
var setProp = curry(function (prop, value, obj) {
  obj[prop] = value;
  return obj;
});
/**
 * Delay execution of callback used on individual items of a list.
 *
 * This function is curried.
 *
 * @param {number} initial Initial timeout
 * @param {number} step Delay per execution
 * @param {Function} callback Callback
 * @param {Array} items
 * @private
 */

var _staggerCallback = function _staggerCallback(initial, step, callback, items) {
  return items.reduce(function (delay, item) {
    setTimeout(function () {
      return callback(item);
    }, delay);
    return delay + step;
  }, initial);
};
/**
 * Delay execution of callback used on individual items of a list.
 *
 * This function is curried.
 *
 * @param {number} initial Initial timeout
 * @param {number} step Delay per execution
 * @param {Function} callback Callback
 * @param {Array} items
 */


var staggerCallback = curry(_staggerCallback);
/**
 * Encapsulate try/catch logic.
 *
 * Takes a pair of tryer and catcher functions. User must ensure tryer and catcher return the same
 * type so that chaining / composing works.
 *
 * Returns a function that can take arguments, which will be passed to both tryer and catcher.
 *
 * @param {Function} tryer
 * @param {Function} catcher
 * @return {Function} Encapsulated function
 */

var tryCatch = function tryCatch(tryer, catcher) {
  return function () {
    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    try {
      return tryer.apply(void 0, args);
    } catch (e) {
      return catcher.apply(void 0, [e].concat(args));
    }
  };
};

var whileDo = function whileDo(pred, fn, initial) {
  return pred(initial) ? whileDo(pred, fn, fn(initial)) : initial;
};

var divide = curry(function (b, a) {
  return a / b;
});
var multiply = curry(function (b, a) {
  return a * b;
});
/**
 * Check if an array contains an item.
 *
 * This is a curried wrapper for Array.prototype.indexOf
 *
 * @param {Array}
 * @param {*}
 * @return {boolean}
 */

var inArray = curry(function (array, item) {
  return array.indexOf(item) !== -1;
});
/**
 * Get the nth element of an array
 *
 * @param {number}
 * @param {Array}
 * @return {*}
 */

var nth = curry(function (index, array) {
  return index < 0 ? array[array.length + index] : array[index];
});
/**
 * Get the nth element of an array
 *
 * @param {Array}
 * @return {*}
 */

var first = nth(1);
var last = nth(-1);
var add = curry(function (b, a) {
  return a + b;
});

var _add1ToLast = pipe(last, add(1));

var range = function range(from, to) {
  return whileDo(pipe(_add1ToLast, lt(to)), function (array) {
    return [].concat(_toConsumableArray(array), [_add1ToLast(array)]);
  }, [from]);
};

var flipArgs = function flipArgs(f) {
  return curry(function (arg1, arg2) {
    return f.apply(_this, [arg2, arg1]);
  });
};

var count = function count(arr) {
  return arr.length;
};
/**
 * Create an array out of an array-like object
 *
 * @param {Object} Array-like object
 * @return {Array} Array
 */


var makeArray = function makeArray(arrayLike) {
  return Array.prototype.slice.call(arrayLike);
};
/**
 * Log a value to console
 *
 * @param {*} val
 * @returns {*}
 */


var log = function log(val) {
  console.log(val);
  return val;
};

var logWrap = function logWrap(fn) {
  return function () {
    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    return log(fn.apply(_this, args));
  };
};

var logArgs = function logArgs(fn) {
  return function () {
    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    log(args);
    return fn.apply(_this, args);
  };
};

var debounce = function debounce(callback, wait) {
  var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _this;
  var timeout = null;
  var callbackArgs = null;

  var later = function later() {
    return callback.apply(context, callbackArgs);
  };

  return function () {
    callbackArgs = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

var then = curry(function (f, promise) {
  return promise.then(f);
});
var reject = curry(function (f, promise) {
  return promise["catch"](f);
});

var parseOptions = function parseOptions(string) {
  var def = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = {};

  try {
    options = JSON.parse(string);
  } catch (e) {
    console.warn('Invalid option JSON string.');
    console.trace();
    return def;
  }

  return Object.assign({}, def, options);
};
/**
 * Throttle a function so that it fires once every { threshold }
 * @param {Function} fn
 * @param {Integer} threshold
 * @param {FunctionContext} scope
 */


var throttle = function throttle(fn, threshold, scope) {
  if (!threshold) {
    threshold = 250;
  }

  var last, deferTimer;
  return function () {
    var context = scope || this;
    var now = +new Date();
    var args = arguments;

    if (last && now < last + threshold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
};

var doesSupportObjectFit = function doesSupportObjectFit() {
  var i = document.createElement('img');
  return 'objectFit' in i.style;
};

var doesSupportObjectPosition = function doesSupportObjectPosition() {
  var i = document.createElement('img');
  return 'objectPosition' in i.style;
};



/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_components_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/components/header.js */ "./src/js/components/header.js");
// import Vue from 'vue'
 // import init from './js/lib/init-modules'
// import { addClass, hasClass } from './js/lib/dom'

document.addEventListener('DOMContentLoaded', function () {
  new _js_components_header_js__WEBPACK_IMPORTED_MODULE_0__["default"](); // Init modules
  // init({
  //   'plugin-module': 'plugin-modules'
  // }).mount()
  // Add touch class if touch device and re-init modules
  // window.addEventListener('touchstart', () => {
  //   if (!hasClass('is-touch', document.body)) {
  //     addClass('is-touch', document.body)
  //     init({
  //       'plugin-module': 'plugin-modules'
  //     }).mount()
  //   }
  // })
}); // LoDash cuz its awesome
// window._ = require('lodash')
// import vue
// window.Vue = require('vue')
// Vue.prototype.$_window = window

/**
 * Startup Vue
 */
// const directory = document.querySelector('#profile-directory')
// if (directory) {
//   // set up vue
//   new Vue({
//     components: {
//       DirectoryMain
//     }
//   }).$mount('#profile-directory')
// }

/***/ }),

/***/ "./src/main.scss":
/*!***********************!*\
  !*** ./src/main.scss ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!*******************************************!*\
  !*** multi ./src/main.js ./src/main.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/robertrae/Sites/GTG-Talent/gtg-talent-phase-1/wp-content/plugins/rr-gtg-extensions/src/main.js */"./src/main.js");
module.exports = __webpack_require__(/*! /Users/robertrae/Sites/GTG-Talent/gtg-talent-phase-1/wp-content/plugins/rr-gtg-extensions/src/main.scss */"./src/main.scss");


/***/ })

/******/ });