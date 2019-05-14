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

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _views_pages_Home_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../views/pages/Home.js */ "./resources/views/pages/Home.js");
/* harmony import */ var _views_pages_About_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../views/pages/About.js */ "./resources/views/pages/About.js");
/* harmony import */ var _views_pages_Error404_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../views/pages/Error404.js */ "./resources/views/pages/Error404.js");
/* harmony import */ var _views_pages_Show_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../views/pages/Show.js */ "./resources/views/pages/Show.js");
/* harmony import */ var _views_pages_Search_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../views/pages/Search.js */ "./resources/views/pages/Search.js");
/* harmony import */ var _views_pages_myLib_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../views/pages/myLib.js */ "./resources/views/pages/myLib.js");
/* harmony import */ var _views_components_Navbar_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../views/components/Navbar.js */ "./resources/views/components/Navbar.js");
/* harmony import */ var _views_components_Footer_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../views/components/Footer.js */ "./resources/views/components/Footer.js");
/* harmony import */ var _services_Utils_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../services/Utils.js */ "./resources/services/Utils.js");




function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }









 // Listing all Supported routes. Any url other than these will throw a 404 error

var routes = {
  "/": _views_pages_Home_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  "/about": _views_pages_About_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  "/my-collection": _views_pages_myLib_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  "/movie/:id": _views_pages_Show_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  "/search": _views_pages_Search_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  "/search/:id": _views_pages_Search_js__WEBPACK_IMPORTED_MODULE_5__["default"]
}; // Below is the router section. It takes a url, checks it agaisnt the route list and then renders the corresponding content page.

var router =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var header, content, footer, request, parsedURL, page;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            document.getElementById("loader-container").style.visibility = "visible"; // lazy loading of view

            header =  false || document.getElementById("header_container");
            content =  false || document.getElementById("page_container");
            footer =  false || document.getElementById("footer_container"); // after loading the view, redner the header and footer of the page

            _context.next = 6;
            return _views_components_Navbar_js__WEBPACK_IMPORTED_MODULE_7__["default"].render();

          case 6:
            header.innerHTML = _context.sent;
            _context.next = 9;
            return _views_components_Navbar_js__WEBPACK_IMPORTED_MODULE_7__["default"].after_render();

          case 9:
            _context.next = 11;
            return _views_components_Footer_js__WEBPACK_IMPORTED_MODULE_8__["default"].render();

          case 11:
            footer.innerHTML = _context.sent;
            _context.next = 14;
            return _views_components_Footer_js__WEBPACK_IMPORTED_MODULE_8__["default"].after_render();

          case 14:
            // get the parsed URL form the address bar or browser
            request = _services_Utils_js__WEBPACK_IMPORTED_MODULE_9__["default"].parseRequestURL(); // Parse the URL and if it has a id part, change it with string ":id"

            parsedURL = (request.resource ? "/" + request.resource : "/") + (request.id ? "/:id" : "") + (request.verb ? "/" + request.verb : ""); // get the page from our hash of supported routes.
            // if the parsed url is not in our url list, select 404 error page instead

            page = routes[parsedURL] ? routes[parsedURL] : _views_pages_Error404_js__WEBPACK_IMPORTED_MODULE_3__["default"];
            _context.next = 19;
            return page.render();

          case 19:
            content.innerHTML = _context.sent;
            _context.next = 22;
            return page.after_render();

          case 22:
            setTimeout(function () {
              document.getElementById("loader-container").style.visibility = "hidden";
            }, 500);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function router() {
    return _ref.apply(this, arguments);
  };
}(); // listen on the hash change


window.addEventListener("hashchange", router); // listen on page load

window.addEventListener("load", router);

/***/ }),

/***/ "./resources/sass/app.scss":
/*!*********************************!*\
  !*** ./resources/sass/app.scss ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "./resources/services/Utils.js":
/*!*************************************!*\
  !*** ./resources/services/Utils.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Utils = {
  // parsing url and breaking it into resources, id and verb
  parseRequestURL: function parseRequestURL() {
    var url = location.hash.slice(1).toLowerCase() || "/";
    var r = url.split("/");
    var request = {
      resource: null,
      id: null,
      verb: null
    };
    request.resource = r[1];
    request.id = r[2];
    request.verb = r[3];
    return request;
  },
  // simple sleep implementation
  sleep: function sleep(ms) {
    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (Utils);

/***/ }),

/***/ "./resources/views/components/Footer.js":
/*!**********************************************!*\
  !*** ./resources/views/components/Footer.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Footer = {
  render: function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var view;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              view =
              /*html*/
              "\n            <footer>\n                <div class=\"container\">\n                    <div class=\"content align-center\">\n                    <p>\n                        This is the footer Section for my spa.\n                    </p>\n                    </div>\n                </div>\n            </footer>\n        ";
              return _context.abrupt("return", view);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }(),
  after_render: function () {
    var _after_render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function after_render() {
      return _after_render.apply(this, arguments);
    }

    return after_render;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./resources/views/components/Navbar.js":
/*!**********************************************!*\
  !*** ./resources/views/components/Navbar.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Navbar = {
  render: function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var view;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              view =
              /*html*/
              "\n    <nav class=\"navbar\">\n        <span class=\"navbar-toggle\" id=\"js-navbar-toggle\">\n            <i class=\"fas fa-bars\"></i>\n        </span>\n        <a href=\"./\" class=\"logo\"><img class=\"img-responsive\" height=\"50\" src=\"data:image/svg+xml;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAYAAAAZUZThAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABqJJREFUeNrsXIF12zgMVe5lAG8Q3gSnThB1gioTRJ4g6gSRJ3AygZIJ7JvA7gR2J5A7gbyBj8wD3yEsKYKi1NgK/nt8jiOJIkF8EgBBJwmDwWAwGAwGg8FgMBgMBoPBYDAYDAaDwfh0uGIRXBZOp1MmPzKWxOA4XF1dvZj/vGa5XBwUOR5ZDINjK8tvBPmL5cJguHHtWMaF/Cjg61ouPfsBzYIXWd9hQubOMVY+I+IIM+NP+MRIZbmFcZkxFQIH/vQ/GllmEXXNZGlRfdlEZFSiPqV/8L3VyQ8l74IybjA+lTFGnxEbm3woJpaItHmXE52hzrVPa1n+Vg6nLEdvlEbeI0ulnoFnGQEE0QIu+8z88Exh1DUVPMnyXZb5GZlYihR3FGI4iHJnMcUuFWpsvsJk0Tta64ti7aGUsBJ8CTGt5EeNlClNJhSeBCV8OqMmKXLMO/zJW+OS8gNf5TNbdG8xoTHa476N5YNswEZt4HsVUMcS+zBQ12R8kA/0fWw+yG9+Ish8SbG9lQ8FPsuUkBny6OWDXFNmSvmwmplUBY/yb29UCxpX6qUO6ohVjBTZ/fs+ZsSZKfoMVtW32TwysrfA8oC6N6j+LmRwL0ey+hAESLKVQn8Cpa8JppY2rRSZ1hFKpAbvXpbcHEB57c1EUGaOjyxqJgVleaa2B5RsBf3/6iDsEsj6PaDOEvokjGtHcJJfA00D2w7wI5EcfQMOuq0/wFTTUO98QH1boGs3yB9NbOYe+q7ls4X/43d8g3psbVZy+IXqfDeJGN9ve5uT2MQylmyvqYVMgBYv+6EmlmEetPB8Bf/fGddST13afNgFyECHcVdUGRFk2hqmzRL6tDKuLQNMrKXpc4xsutS+8LFuo0NeXvMG3lF3TTRIF099thAsctxEEcTSydQ2q6LruXGNTBAQkFb+0nGPAMUi7UUgBUyJMmi62htCECULrNDgOLuIrNtZEwc2J/goQ6EImWAiCOIbS0HxO/44QeDayjUbo5l9ZblGIghSppaizAaZZgSB1AH9b/rIyDLbtVQFM2bHnDCwwiHnwVeOjvGqoGQEeZEdZMKYmyjhPZklaJEZpR6LIHjAK59p1YMgTuXoeGZDMP0EhUjGJFAOQJDaZzZ11L3zEaRDfkOitShc7th9bxzWRRBBQM9qS93UaNsgUaxeg2+YDAJK5yxJIQiqN3RGEb4ZP0DxBXFFohJEy2UW2KedY4XwEWT01cMwpamECiVI7Eo4CEF6ZfNCJGiNIlY1RBW2tpz6AOiZ59/A9qiIhQo9C5d9D3iGz4eOewoUgYsKJcMgabmE1qVlIEI3yEaIdv6wRMl8UbEiQm5ns6kccx5kDp3IUOhvHtmefyIGeQ8EE5YQHw5XH4BImSOc+uAIC8YQ/tBjg/SGEoK19OMQGOIlhZKN7xTzV4Vj+2Ya5MmZoDdB0AaidsgXA6Sxx2xW/SLe9wz7F/eJkXcE5qGe8Q8DyHeGVqVipDEUlpXnbBTs0hF1olCZWmpnXSmC/HuIvKQYk+aGeN8LmAjK2TNJfQ+frwPJ94je2bdO32r6LXl/Em6dTDeD+rIIAiS5G7A9P2H2S5PwrNLMYQ7YVr41mtUr7ZxDHYdIP8qm3GK0xDkpL+UQax/HsrKPgT3BjDtMgSDnduR2S3CiXc6wSOg5TQtjxcCO51CrRwKkUIqbeYIHsSgtQZQQf/AlsZzHtkw+SYB/tmCCDAxQKO1ElwGPLkOUG0i0hffkEJLMkbIMibXRRgrhZ4Fh4Udz7wFWwS9J9yEoJQN1fmQOqfKuvt9bCNhlUs/P4Fi1cIxDPELzjIh1hu6ke3eejc2koKPBaMNpg/6uh5aRsbFK2cUXsAfS2ladjlSSnav/0IYMZKt3m4Xj3pqaZoJ2pDcot0x45EVJNalG2LuZQd8rGO/NaBuFYxLEIqCVOTtCZwu0a0xKS7G8p0HkCs3lCcnFShFJdg5lSw3lpOZimSQREWM069iga0PqNvv4AQTxbfQWF0sQ1IHWcrinsR346dkmPBDNmKssEKCxKPTOMrAVsc3OH2zoIYuckKZCzY97mxA+mCCUVfVyCWIsixtLTs4qJF+rw5wJzlSNkREQf+Ugf0lNJSeggfpST/9LC0kpKe+poz68CuYoObD0KHJXImEM3skBmZvmL7lYx5F/evTCAKtLn1+ZMcPM+ITmEJFHkYSnxZxVBNV2MI5/evTzILuwejnMy2AwGAwGg8FgMBgMBoPBYDAYDAaDwWAwGAwGg8FgMBgTwX8CDABlCyCDJv0R9AAAAABJRU5ErkJggg==\"> </img> </a>\n        <ul class=\"main-nav\" id=\"js-menu\">\n            <li>\n                <a href=\"./\" class=\"nav-links\">Home</a>\n            </li>\n            <li>\n                <a href=\"#/about\" class=\"nav-links\">About Us</a>\n            </li>\n            <li>\n                <a href=\"#/random\" class=\"nav-links\">Link Not Working Demo</a>\n            </li>\n            <li>\n                <a href=\"#/my-collection\" class=\"nav-links\">My Collection</a>\n            </li>\n        </ul>\n</nav>\n             \n        ";
              return _context.abrupt("return", view);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }(),
  after_render: function () {
    var _after_render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var mainNav, navBarToggle;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              mainNav = document.getElementById("js-menu");
              navBarToggle = document.getElementById("js-navbar-toggle");
              navBarToggle.addEventListener("click", function () {
                mainNav.classList.toggle("active");
              });

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function after_render() {
      return _after_render.apply(this, arguments);
    }

    return after_render;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (Navbar);

/***/ }),

/***/ "./resources/views/pages/About.js":
/*!****************************************!*\
  !*** ./resources/views/pages/About.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var About = {
  render: function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var view;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              view =
              /*html*/
              "\n            <section class=\"section\">\n                <h1> About </h1>\n                <br><br>\n                <p>\n                  This is a Developer experiment for learning and creating a spa from vanilla javascript. here i have implemented router, components i.e. pages itself. so let's have fun with the experiment...\n                </p>\n            </section>\n        ";
              return _context.abrupt("return", view);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }(),
  after_render: function () {
    var _after_render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function after_render() {
      return _after_render.apply(this, arguments);
    }

    return after_render;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (About);

/***/ }),

/***/ "./resources/views/pages/Error404.js":
/*!*******************************************!*\
  !*** ./resources/views/pages/Error404.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Error404 = {
  render: function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var view;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              view =
              /*html*/
              "\n            <section class=\"section\">\n                <h1> 404 Error </h1>\n            </section>\n        ";
              return _context.abrupt("return", view);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }(),
  after_render: function () {
    var _after_render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function after_render() {
      return _after_render.apply(this, arguments);
    }

    return after_render;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (Error404);

/***/ }),

/***/ "./resources/views/pages/Home.js":
/*!***************************************!*\
  !*** ./resources/views/pages/Home.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/Utils.js */ "./resources/services/Utils.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// define source data


var getMoviesList =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
    var snackbarToast, response, json;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            snackbarToast = function _ref2(msg) {
              var x = document.getElementById("snackbar");
              x.className = "show";
              x.innerHTML = msg;
              setTimeout(function () {
                x.className = x.className.replace("show", "");
              }, 3000);
            };

            console.log(Object({"NODE_ENV":"development"}).API_URL);
            _context.prev = 2;
            _context.next = 5;
            return fetch("https://api.themoviedb.org/3/discover/movie?api_key=1756017a03786e306fc358d4a4186de0");

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();

          case 8:
            json = _context.sent;
            console.log(json);
            return _context.abrupt("return", json.results);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);
            console.log("Error getting data: ", _context.t0);
            snackbarToast("Error getting data: " + _context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 13]]);
  }));

  return function getMoviesList() {
    return _ref.apply(this, arguments);
  };
}();

var Home = {
  render: function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var movies, view;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return getMoviesList();

            case 2:
              movies = _context2.sent;
              view =
              /*html*/
              "\n                \n                <div class=\"row\">\n                  <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-4\">\n                    <h2> Movies List </h2>\n                  </div>\n                  <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-8\">\n                    <input name=\"search\" id=\"sparam\" placeholder=\"Name of the Movie to Search\" />\n                    <button class=\"btn btn-primary\" type=\"submit\" id=\"search\" ><i class=\"fas fa-search\"></i> </button>\n\n                  </div>\n                </div>\n                \n\n                <div class=\"row\">\n                  \n                    ".concat(movies.map(function (movie) {
                return (
                  /*html*/
                  "<div class=\"col-xs-12 col-sm-12 col-md-6 col-lg-3\" style=\"margin-top: 2em\" >\n        <div class=\"card\">\n          <div class=\"card-media\">\n            <figure>\n            <img\n              class=\"img-responsive\"\n              src=\"https://image.tmdb.org/t/p/original/".concat(movie.poster_path, "\"\n              alt=\"").concat(movie.original_title, " banner\"\n            />\n            </figure>\n          </div>\n            <div class=\"card-content\">\n             ").concat(movie.overview.substr(0, 160), "...\n             <br><br> \n             <button class=\"btn btn-primary addToLib\" data-id=\"").concat(movie.id, "\" data-title=\"").concat(movie.original_title, "\" data-overview=\"").concat(movie.overview, "\" data-banner=\"https://image.tmdb.org/t/p/w185_and_h278_bestv2/").concat(movie.poster_path, "\" id=\"addToLib\" > ADD TO COLLECTION </button>\n             <br><br>\n             <a class=\"btn btn-white\" href=\"#/movie/").concat(movie.id, "\"> READ MORE </a>\n            </div>\n        </div>\n      </div>")
                );
              }).join("\n "), "\n                    \n                    \n                </div>\n        ");
              return _context2.abrupt("return", view);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }(),
  after_render: function () {
    var _after_render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      var request;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              request = _services_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].parseRequestURL();
              document.addEventListener("click", function (e) {
                if (e.target && e.target.id == "addToLib") {
                  var findInArray = function findInArray(cart, val) {
                    for (var i = 0, len = cart.length; i < len; i++) {
                      if (cart[i]["id"] === val) {
                        // strict equality test
                        return true;
                      }
                    }

                    return false;
                  };

                  var removeInArray = function removeInArray(cart, val) {
                    for (var i = 0, len = cart.length; i < len; i++) {
                      if (cart[i]["id"] === val) {
                        console.log(i + cart[i]["title"]);
                        var old_cart = JSON.parse(localStorage.getItem("movies"));
                        old_cart.splice(i, 1);
                        localStorage.removeItem("movies");
                        localStorage.setItem("movies", JSON.stringify(old_cart));
                        console.log(old_cart);
                        old_cart = [];
                      }
                    }
                  };

                  //do something
                  var x = e.target.dataset;
                  console.log(x.id);
                  var cart = JSON.parse(localStorage.getItem("movies")) || {}; //check if cart if empty and if yes the init it.

                  if (cart.length === 0) {
                    console.log("cart length not zero");
                    cart.push({
                      id: x.id,
                      title: x.title,
                      overview: x.overview,
                      banner: x.banner
                    });
                    localStorage.setItem("movies", JSON.stringify(cart));
                  } else {
                    if (!findInArray(cart, x.id)) {
                      console.log("item not in collection");
                      cart.push({
                        id: x.id,
                        title: x.title,
                        overview: x.overview,
                        banner: x.banner
                      });
                      localStorage.setItem("movies", JSON.stringify(cart));
                    }
                  }
                }

                if (e.target && e.target.id == "search") {
                  var s = document.getElementById("sparam");
                  console.log(s.value);
                  var url = window.location.toString();
                  console.log(url);

                  if (s.value != "") {
                    if (request.id) {
                      window.location = url.replace("#/search/" + request.id, "#/search/" + s.value);
                    } else {
                      window.location = url + "#/search/" + s.value;
                    }
                  } else {
                    alert("Please Enter a valid search !");
                  }
                }
              });

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function after_render() {
      return _after_render.apply(this, arguments);
    }

    return after_render;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (Home);

/***/ }),

/***/ "./resources/views/pages/Search.js":
/*!*****************************************!*\
  !*** ./resources/views/pages/Search.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/Utils.js */ "./resources/services/Utils.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var getMoviesList =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(id) {
    var snackbarToast, response, json;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            snackbarToast = function _ref2(msg) {
              var x = document.getElementById("snackbar");
              x.className = "show";
              x.innerHTML = msg;
              setTimeout(function () {
                x.className = x.className.replace("show", "");
              }, 3000);
            };

            console.log(Object({"NODE_ENV":"development"}).API_URL);
            _context.prev = 2;
            _context.next = 5;
            return fetch("https://api.themoviedb.org/3/search/movie?api_key=1756017a03786e306fc358d4a4186de0&query=".concat(id));

          case 5:
            response = _context.sent;
            _context.next = 8;
            return response.json();

          case 8:
            json = _context.sent;
            console.log(json);
            return _context.abrupt("return", json.results);

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](2);
            console.log("Error getting data: ", _context.t0);
            snackbarToast("Error getting data: " + _context.t0);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 13]]);
  }));

  return function getMoviesList(_x) {
    return _ref.apply(this, arguments);
  };
}();

var Search = {
  render: function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var request, movies, view;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              request = _services_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].parseRequestURL();
              _context2.next = 3;
              return getMoviesList(request.id);

            case 3:
              movies = _context2.sent;
              view =
              /*html*/
              "\n                \n                <div class=\"row\">\n                  <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-4\">\n                    <h1> Home </h1>\n                  </div>\n                  <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-8\">\n                    <input name=\"search\" id=\"sparam\" placeholder=\"Name of the Movie to Search\" />\n                    <button class=\"btn btn-primary\" type=\"submit\" id=\"search\" ><i class=\"fas fa-search\"></i> </button>\n                  </div>\n                </div>\n                \n\n                <div class=\"row\">\n                  \n                    ".concat(movies.map(function (movie) {
                return (
                  /*html*/
                  "<div class=\"col-xs-12 col-sm-12 col-md-6 col-lg-3\">\n        <div class=\"card\">\n          <div class=\"card-media\">\n            <figure>\n            <img\n              class=\"img-responsive\"\n              src=\"https://image.tmdb.org/t/p/w185_and_h278_bestv2/".concat(movie.poster_path, "\"\n              alt=\"").concat(movie.original_title, " banner\"\n            />\n            </figure>\n          </div>\n            <div class=\"card-content\">\n             ").concat(movie.overview.substr(0, 160), "...\n             <br><br> \n             <button class=\"btn btn-primary addToLib\" data-id=\"").concat(movie.id, "\" data-title=\"").concat(movie.original_title, "\" data-overview=\"").concat(movie.overview, "\" data-banner=\"https://image.tmdb.org/t/p/w185_and_h278_bestv2/").concat(movie.poster_path, "\" id=\"addToLib\" > ADD TO COLLECTION </button>\n             <br><br>\n             <a class=\"btn btn-white\" href=\"#/movie/").concat(movie.id, "\"> READ MORE </a>\n            </div>\n        </div>\n      </div>")
                );
              }).join("\n "), "\n                    \n                    \n                </div>\n        ");
              return _context2.abrupt("return", view);

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }(),
  after_render: function () {
    var _after_render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      var request;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              request = _services_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].parseRequestURL();
              document.addEventListener("click", function (e) {
                if (e.target && e.target.id == "addToLib") {
                  var findInArray = function findInArray(cart, val) {
                    for (var i = 0, len = cart.length; i < len; i++) {
                      if (cart[i]["id"] === val) {
                        // strict equality test
                        return true;
                      }
                    }

                    return false;
                  };

                  //do something
                  var x = e.target.dataset;
                  console.log(x.id);
                  var cart = JSON.parse(localStorage.getItem("movies")) || {}; //check if cart if empty and if yes the init it.

                  if (cart.length === 0) {
                    console.log("cart length not zero");
                    cart.push({
                      id: x.id,
                      title: x.title,
                      overview: x.overview,
                      banner: x.banner
                    });
                    localStorage.setItem("movies", JSON.stringify(cart));
                  } else {
                    if (!findInArray(cart, x.id)) {
                      console.log("item not in collection");
                      cart.push({
                        id: x.id,
                        title: x.title,
                        overview: x.overview,
                        banner: x.banner
                      });
                      localStorage.setItem("movies", JSON.stringify(cart));
                    }
                  }
                }

                if (e.target && e.target.id == "search") {
                  var s = document.getElementById("sparam");
                  console.log(s.value);
                  var url = window.location.toString();
                  console.log(url);

                  if (s.value != "") {
                    window.location = url.replace("#/search/" + request.id, "#/search/" + s.value);
                  }
                }
              });

            case 2:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function after_render() {
      return _after_render.apply(this, arguments);
    }

    return after_render;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (Search);

/***/ }),

/***/ "./resources/views/pages/Show.js":
/*!***************************************!*\
  !*** ./resources/views/pages/Show.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/Utils.js */ "./resources/services/Utils.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



var getPost =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee(id) {
    var options, response, json;
    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = {
              method: "GET"
            };
            _context.prev = 1;
            _context.next = 4;
            return fetch("https://api.themoviedb.org/3/movie/".concat(id, "?api_key=1756017a03786e306fc358d4a4186de0&"), options);

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            json = _context.sent;
            console.log(json);
            return _context.abrupt("return", json);

          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](1);
            console.log("Error getting documents", _context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 12]]);
  }));

  return function getPost(_x) {
    return _ref.apply(this, arguments);
  };
}();

var Show = {
  render: function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var request, movie;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              request = _services_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].parseRequestURL();
              _context2.next = 3;
              return getPost(request.id);

            case 3:
              movie = _context2.sent;
              return _context2.abrupt("return",
              /*html*/
              "\n            <section class=\"row\">\n                <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-12\"  style=\"text-align: left\"> \n                <strong> ID : ".concat(movie.id, "</strong>\n                <h1> Movie : ").concat(movie.title, " </h1>\n                <h5>").concat(movie.tagline, " </h5> <br>\n                </div>\n                <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-4\">\n                <img class=\"img-responsive\" src=\"https://image.tmdb.org/t/p/original/").concat(movie.poster_path, "\" ></img>\n                </div>\n                <div class=\"col-xs-12 col-sm-12 col-md-12 col-lg-8\"  style=\"text-align: left\">\n                  <div style=\"padding-left:1em\">\n                    <h2><strong>Overview</strong></h2>  <br>\n                    <p> ").concat(movie.overview, " </p>\n                    <br>\n                    <strong>Original Language: </strong><br> ").concat(movie.original_language, "\n                    <br>\n                    <br>\n\n                    <strong>Status: </strong><br> ").concat(movie.status, "\n                    <br>\n                    <br>\n                    <strong>Release Date: </strong><br> ").concat(movie.release_date, "\n                    <br><br>\n                    <button class=\"btn btn-primary\" onclick=\"window.history.back();\">Go Back</button>\n                  </div>\n                </div>\n            </section>\n        "));

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }(),
  after_render: function () {
    var _after_render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee3() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function after_render() {
      return _after_render.apply(this, arguments);
    }

    return after_render;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (Show);

/***/ }),

/***/ "./resources/views/pages/myLib.js":
/*!****************************************!*\
  !*** ./resources/views/pages/myLib.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services_Utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/Utils.js */ "./resources/services/Utils.js");


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



function getMyLib() {
  return JSON.parse(localStorage.getItem("movies"));
}

var Show = {
  render: function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
      var request, myMovies, view;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              request = _services_Utils_js__WEBPACK_IMPORTED_MODULE_1__["default"].parseRequestURL();
              myMovies = getMyLib();
              console.log(myMovies);
              view =
              /*html*/
              "\n            \n                <h1> My Collection Movies Listing </h1>\n                <div id=\"emptyCollection\"></div>\n                <div class=\"row\">\n                  \n                    ".concat(myMovies.map(function (movie) {
                return (
                  /*html*/
                  "<div class=\"col-xs-12 col-sm-12 col-md-6 col-lg-3\">\n        <div class=\"card\">\n          <div class=\"card-media\">\n            <figure>\n            <img\n              class=\"img-responsive\"\n              src=\"".concat(movie.banner, "\"\n              alt=\"").concat(movie.original_title, " banner\"\n            />\n            </figure>\n          </div>\n            <div class=\"card-content\">\n             ").concat(movie.overview.substr(0, 160), "...\n             <br><br> \n             <button class=\"btn btn-danger rmFromLib\" data-id=\"").concat(movie.id, "\" data-title=\"").concat(movie.original_title, "\" data-desc=\"").concat(movie.overview, "\" data-banner=\"").concat(movie.banner, "\" id=\"rmFromLib\" > REMOVE FROM COLLECTION </button>\n             <br><br>\n             <a class=\"btn btn-white\" href=\"#/movie/").concat(movie.id, "\"> READ MORE </a>\n            </div>\n        </div>\n      </div>")
                );
              }).join("\n "), "\n                    \n                    \n                </div>\n        ");
              return _context.abrupt("return", view);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }(),
  after_render: function () {
    var _after_render = _asyncToGenerator(
    /*#__PURE__*/
    _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee2() {
      var cart;
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              cart = JSON.parse(localStorage.getItem("movies")) || {};

              if (cart.length === 0) {
                document.getElementById("emptyCollection").innerHTML = "<h2 style='margin-top: 2em; border: 1px solid #222; border-radius: 5px; padding: 10vh 1em'>  You have not movies added to your collection. Please add it first and come back later ... </h2>";
              } else {
                document.addEventListener("click", function (e) {
                  if (e.target && e.target.id == "rmFromLib") {
                    var removeInArray = function removeInArray(cart, val) {
                      for (var i = 0, len = cart.length; i < len; i++) {
                        if (cart[i]["id"] === val) {
                          console.log(i + cart[i]["title"]);
                          var old_cart = JSON.parse(localStorage.getItem("movies"));
                          old_cart.splice(i, 1);
                          localStorage.removeItem("movies");
                          localStorage.setItem("movies", JSON.stringify(old_cart));
                          console.log(old_cart);
                          old_cart = [];
                        }
                      }
                    };

                    //do something
                    var x = e.target.dataset;
                    removeInArray(cart, x.id);
                    document.getElementById("loader-container").style.visibility = "hidden";
                    document.location.reload();
                  }
                });
              }

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function after_render() {
      return _after_render.apply(this, arguments);
    }

    return after_render;
  }()
};
/* harmony default export */ __webpack_exports__["default"] = (Show);

/***/ }),

/***/ 0:
/*!*************************************************************!*\
  !*** multi ./resources/js/app.js ./resources/sass/app.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! C:\xampp\htdocs\vanila-spa\resources\js\app.js */"./resources/js/app.js");
module.exports = __webpack_require__(/*! C:\xampp\htdocs\vanila-spa\resources\sass\app.scss */"./resources/sass/app.scss");


/***/ })

/******/ });