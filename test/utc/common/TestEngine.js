/*
*  wrt-plugins
*
* Copyright (c) 2000 - 2011 Samsung Electronics Co., Ltd. All rights reserved.
*
* Contact: Seung Mo Cho <seungm.cho@samsung.com>
*
* This library is free software; you can redistribute it and/or modify it under
* the terms of the GNU Lesser General Public License as published by the
* Free Software Foundation; either version 2.1 of the License, or (at your
* option) any later version.
*
* This library is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
* FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public
* License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with this library; if not, write to the Free Software Foundation, Inc.,
* 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
*
*/
/**
 * This file contains the implementation of test engine class.
 *
 * @author      Wojciech Bielawski(w.bielawski@samsung.com)
 * @author      Pawel Misiak (p.misiak@samsung.com)
 * @version     0.1
 */

// This file is a slightly modified version of file: w/UnitTestSE/app/TestEngine.js
// (repository: framework/web/wrt-plugins-tizen, branch: devel/webapi/test)

// This file should not be analysed with JSHint.

function jsPrint(msg) { console.log(msg);};
function logFail(msg) { console.log(msg);};
function logError(msg) { console.log(msg);};

var __startTime = new Date().toISOString().replace(/:/g, '-');
__startTime = __startTime.substr(0, __startTime.indexOf('.'));

var htmlHeader = '<html><head><style type="text/css">.passed{background-color: lime;} .failed{background-color: red;}</style></head><body>';
var htmlFooter = '</body></html>';

var TestEngine = {
	targetUse : false,
	logText : "",
	testCaseTimeout : 10 * 1000, //in miliseconds
	currentCaseTimeout : 10 * 1000,
	timer : null,
	interval : 0,
	countOK : 0,
	countErr : 0,
	countException : 0,
	callbackMutex : 0,
	callbackMethodName : "",
	currentTestCase : 0,
	countAllPassed : 0,
	countAllFailed : 0,
	testCasesFailedCount : 0,
	testCasesPassedCount : 0,
	testCasesFailed : [],
	testList : [],
	finalLog : "\n",
	testSuccessCallback : null,
	testErrorCallback : null,
	testSuiteName : null,
	testSuiteStats : [],
	resultLogger : new HTMLTestResultLogger('/tmp/log-utc-' + __startTime + '.html'),
	summaryRenderer : new HTMLTestSummaryRenderer('/tmp/summary-utc-' + __startTime + '.html'),

	stepsArray : null,
	stepTimeout : null,
	currentStep : null,
	errorType : null,
	errorField : null,

	/*
	 * Values used only as types representations.
	 */
	STRING : '',
	NUMBER : 0,
	OBJECT : {},
	ARRAY : [],
	DATE : new Date(),
	BOOL : false,
	FUNCTION : function() {
	},
	/*
	 * Error test possible results.
	 */
	ERROR_TEST_RESULT : {
		NOT_RUN : -4,
		NOT_THROWN : -3,
		BAD_TYPE : -2,
		BAD_VALUE : -1,
		OK : 0
	},

	/**
	 * Prints specified object in a TreeView like structure.
	 * @param obj Object to print.
	 * @param indent Must be undefined (don't pass anything).
	 */
	dumpObject : function(obj, indent) {
		if(indent === undefined)
			indent = '';
		else
			indent += '   ';
		var prefix = (indent.length == 0 ? indent : indent + '|--');
		for(var i in obj) {
			if( typeof (obj[i]) == "object") {
				TestEngine.log(prefix + i + ":");
				TestEngine.dumpObject(obj[i], indent);
			} else
				TestEngine.log(prefix + i + ": " + obj[i]);
		}
	},
	addTest : function(enabled, testFunc, testName, testPrereq) {
		if(null == testName) {
			testName = "unnamed test"
		}
		jsPrint("Add test: " + testName)
		var data = new Object();
		data.enabled = enabled;
		data.testFunc = testFunc;
		data.testName = testName;
		data.testPrereq = testPrereq;
		data.testSuite = TestEngine.testSuiteName;
		data.failMessage = "";
		// this.testList.push(testFunc)
		this.testList.push(data);
	},
	setTestSuiteName : function(name, timeout) {
		this.testSuiteName = name;
		this.testSuiteStats[name] = new Object();
		this.testSuiteStats[name].passed = 0;
		this.testSuiteStats[name].failed = 0;
		this.testSuiteStats[name].assertsOK = 0;
		this.testSuiteStats[name].assertsErr = 0;
		TestEngine.currentCaseTimeout = (timeout === undefined) ? TestEngine.testCaseTimeout : timeout;
	},
	log : function(text) {
		try {
			jsPrint(text);
			this.logText += text + "<br/>";
			this.finalLog += text + "\n";
			// document.getElementById(TestEngine.currentTestSuite).innerHTML += text + "<br/>";
			//document.getElementById('log').innerHTML += text + "<br/>";
		} catch(err) {
			this.countException++;
			logError("   TestEngine.log failure: " + err.message);
		}
	},
	logException : function(text) {
		try {
			logFail(text);
			TestEngine.countException++;
			TestEngine.log("[EXCEPTION] " + text);
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.logErr failure: " + err.message);
		}
	},
	logErr : function(text) {
		try {
			TestEngine.countErr++;
			TestEngine.log("[FAILED] " + text);
			logFail("[FAILED] " + text);
			
			TestEngine.testList[TestEngine.currentTestCase-1].failMessage = text;
			
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.logErr failure: " + err.message);
		}
	},
	logOK : function(text) {
		try {
			TestEngine.countOK++;
			TestEngine.log("[OK] " + text);
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.logOK failure: " + err.message);
		}
	},
	test : function(text, value) {
		try {
			if( typeof (value) == "undefined") {
				TestEngine.logErr("value not defined for test: '" + text + "'");
			} else if(!value) {
				TestEngine.logErr(text);
			} else {
				TestEngine.logOK(text);
				return true;
			}
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.test failure: " + err.message);
		}
		return false;
	},
	assertEqual : function(text, value1, value2){
		try {
			if( typeof (value1) == "undefined") {
				TestEngine.logErr("value1 not defined for test: '" + text + "'");
			} else if( typeof (value2) == "undefined") {
				TestEngine.logErr("value2 not defined for test: '" + text + "'");
			}else if(value1 == value2) {
				TestEngine.logOK(text +" (value1:[" + value1 + "] value2:[" + value2 + "])");
			} else {
				TestEngine.logErr(text + " (expected value1:[" + value1 + "] but value2:[" + value2 + "])");
				return true;
			}
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.test failure: " + err.message);
		}
		return false;
	},
	
	/**
	 * Sets error type used in every typePresetError check.
	 * @param type Type of an error/exception.
	 */
	setErrorType : function(type) {
		TestEngine.errorType = type;
	},
	/**
	 * Sets error field used in every typePresetError check.
	 * @param field Name of the field in error structure to check its value.
	 */
	setErrorField : function(field) {
		TestEngine.errorField = field;
	},
	/**
	 * Sets interval between the end of this case and the start of next case. 
	 * @param interval Interval between the end of this case and the start of next case in milliseconds.
	 */
	setInterval : function(interval) {
		TestEngine.interval = interval;
	},
	/**
	 * Checks if specified expression throws a specified error.
	 * Expression must be enclosed in a function. Use setErrorType and
	 * setErrorField to set what error to look for.
	 * Error type must be set but if error field is left unset (i.e. null)
	 * then whole exception object is compared to specified value.
	 * @param msg Text to display for this test.
	 * @param fn Function eclosing the expression one wants to verify.
	 * @param value Value of an error/exception one looks for.
	 */
	testPresetError : function(msg, fn, value) {
		if(TestEngine.errorType === null) {
			TestEngine.logException("testPresetError skipped. Set error type first.");
			return;
		}

		return TestEngine.testError(msg, fn, TestEngine.errorType, TestEngine.errorField, value);
	},
	/**
	 * Checks if specified expression throws a specified error.
	 * This is a more general version of testPresetError function.
	 * Expression must be enclosed in a function.
	 * Error type must be set but if error field is left unset (i.e. null)
	 * then whole exception object is compared to specified value.
	 * @param msg Text to display for this test.
	 * @param fn Function eclosing the expression one wants to verify.
	 * @param errType Type of desired error/exception.
	 * @param errField Property from exception structure to look for exception
	 * value.
	 * @param errValue Value of an error/exception one looks for.
	 */
	testError : function(msg, fn, errType, errField, errValue) {
		if(errType === null) {
			TestEngine.logException("testError skipped. Error type can't be null.");
			return TestEngine.ERROR_TEST_RESULT.NOT_RUN;
		}

		try {
			fn();
			TestEngine.logErr(msg + ' Exception has not been thrown.');
			return TestEngine.ERROR_TEST_RESULT.NOT_THROWN;
		} catch (ex) {
			if( ex instanceof errType) {
				var exValue = (errField !== null ? ex[errField] : ex);
				if(exValue === errValue) {
					TestEngine.logOK(msg + ' [' + errValue + ':' + ex.message + ']');
					return TestEngine.ERROR_TEST_RESULT.OK;
				} else {
					TestEngine.logErr(msg + ' Exception is not of value ' + errValue);
					return TestEngine.ERROR_TEST_RESULT.BAD_VALUE;
				}
			} else {
				TestEngine.logErr(msg + ' Exception is of wrong type.');
				return TestEngine.ERROR_TEST_RESULT.BAD_TYPE;
			}
		}
	},
	testPresence : function(text, object) {
		try {
			if(object === undefined) {
				TestEngine.logErr("value not defined. Name: " + text);
			} else {
				TestEngine.logOK("object " + text + " present");
			}
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.testPresence failure: " + err.message);
		}
	},
	/**
	 * Checks whether object implements given property.
	 * In addition it also checks whether any exception (e.g. "Not Supported")
	 * is thrown.
	 * @param object Object to check property for.
	 * @param property Property to look for.
	 * @return True if object implements such property, false otherwise.
	 */
	testPresence2 : function(object, property) {
		var result = property in object;
		if(result) {
			TestEngine.logOK("property " + property + " present");
		} else {
			TestEngine.logErr("property " + property + " absent");
		}
		return result;
	},
	/**
	 * Checks whether mainObj object equals templateObj object, property by
	 * property.
	 * Runs recursively through all the properties of templateObj object and
	 * checks if they exist and are equal to those in mainObj object.
	 * mainObj has to implement no less properties than templateObj.
	 * @param mainObj Object to check for properties implementation.
	 * @param templateObj Object to verify properties against.
	 * @return True if mainObj has at least the same properties as templateObj,
	 *         false otherwise.
	 */
	checkObjectsEqual : function(mainObj, templateObj) {
		try {
			if((!mainObj && templateObj) || ( typeof (mainObj) != typeof (templateObj))) {
				return false;
			} else if(isNumber(templateObj) || isString(templateObj) || isBoolean(templateObj)) {
				return (mainObj === templateObj);
			} else if(isDate(templateObj)) {
				return (mainObj.valueOf() === templateObj.valueOf());
			} else {
				for(var i in templateObj) {
					if(!TestEngine.checkObjectsEqual(mainObj[i], templateObj[i])) {
						return false;
					}
				}
			}
		} catch(err) {
			TestEngine.logException("TestEngine.checkObjectsEqual failure: " + err.message);
			return false;
		}
		return true;
	},
	// test properties of given object. Steps:
	// - check name presence
	// - check default value (if not null value passed)
	// - check if name is writable
	//
	// description of properties array:
	// [0] - property name
	// [1] - default value - check if property equals given value
	//          undefined or null - disable check
	// [2] - value to do writability test - try to write given value
	//          undefined or null - don't check writability
	// [3] - indicates if property should be read-only
	// [4] - assumed type, undefined value skips this check
	testProperties : function(object, props) {
		var result = new Object();
		try {
			for(var i in props) {
				var name = props[i][0];
				var defaultVal = props[i][1];
				var setVal = props[i][2];
				var isReadonly = props[i][3];
				var type = props[i][4];
				var errors = TestEngine.countErr + TestEngine.countException;

				if(( typeof (name) != "string") || (name == "")) {
					TestEngine.logException("Property name not defined, skipping it.");
					continue;
				}

				result[name] = false;
				if(TestEngine.testPresence2(object, name)) {
					if((defaultVal != null) && (defaultVal !== undefined)) {
						var isObjectEqual = TestEngine.checkObjectsEqual(object[name], defaultVal);
						TestEngine.test(name + " default value", isObjectEqual);
					}

					if((setVal != null) && (setVal !== undefined)) {
						// try-catch is needed when SetProperty returns 'false'
						if(setVal === defaultVal) {
							TestEngine.logException("Default value and set value are equal");
							continue;
						}
						try {
							object[name] = setVal;
						} catch (e) {
						}
						if( typeof (isReadonly) == "undefined") {
							TestEngine.test(name + " writability, reason: isReadonly not specified", false);
						}
						if(isReadonly) {
							TestEngine.test(name + " writability", object[name] != setVal);
						} else {
							var isObjectEqual = TestEngine.checkObjectsEqual(object[name], setVal);
							TestEngine.test(name + " writability", isObjectEqual);
						}
					}

					if(type !== undefined) {
						var isType = ( typeof (object[name]) == typeof (type));
						if( typeof (type) == 'object') {
							if(isArray(type)) {
								isType = isArray(object[name]);
							} else if(isDate(type)) {
								isType = isDate(object[name]);
							}
						}
						TestEngine.test(name + " type check.", isType);
					}
				}
				if(errors == TestEngine.countErr + TestEngine.countException) {
					result[name] = true;
				}
			}
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.testProperties failure: " + err.message);
		}
		return result;
	},
	startTestCase : function() {
		try {
			TestEngine.countOK = 0;
			TestEngine.countErr = 0;
			TestEngine.countException = 0;
			TestEngine.timer = setTimeout(TestEngine.timeout, TestEngine.currentCaseTimeout);
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.startTestCase failure: " + err.message);
		}

	},
	endTestCase : function(testCase) {
		try {
			if(this.timer === null) {
				return;
			}

			clearTimeout(this.timer);
			this.log("");
			var failed = this.countErr || ((this.countOK + this.countErr) < 1) || this.countException;
			this.log("Test case " + ( failed ? "FAILED" : "PASSED"));
			this.log("Passed: " + this.countOK);
			this.log("Failed: " + this.countErr);
			if(this.countException) {
				this.log("Exception occured!");
			}

			this.countAllPassed += this.countOK;
			this.countAllFailed += this.countErr;
			this.testSuiteStats[testCase.testSuite].assertsOK += this.countOK;
			this.testSuiteStats[testCase.testSuite].assertsErr += this.countErr;

			if(failed) {
				TestEngine.testCasesFailedCount++;
				this.testSuiteStats[testCase.testSuite].failed++;
				if(isVerbose()) {
					TestEngine.testCasesFailed.push(testCase.testName + ":" + testCase.failMessage);
				}
				TestEngine.resultLogger.logFail(testCase.testName + ":" + testCase.failMessage);
			} else {
				TestEngine.testCasesPassedCount++;
				this.testSuiteStats[testCase.testSuite].passed++;
				TestEngine.resultLogger.logPass(testCase.testName);
			}
			TestEngine.summaryRenderer.render(TestEngine);
		} catch(err) {
			this.countException++;
			logError("   TestEngine.endTestCase failure:" + err.message);
		}
	},
	timeout : function() {
		try {
			TestEngine.callbackMutex = 0;
			TestEngine.logErr("Widget run timeout.", false);
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.timeout failure:" + err.message);
		}
	},
	/**
	 * Registers callbacks for asynchronous function.
	 *
	 * To avoid finish test case before callbacks will execute it's necessary
	 * to register callbacks in the engine.
	 *
	 * @param methodName Testcase name, suggested asynchronous function name.
	 * @param testSuccessCallback Callback that will be executed on success.
	 * @param testErrorCallback Callback that will be executed on failure.
	 * @param callbacksCount number of callbacks to register.
	 * @return An object with defined functions "successCallback" and "errorCallback" you
	 *          need to pass as arguments to asynchronous function  e.g.
	 *
	 * function success() {  }
	 * function failure() {  }
	 *
	 * {
	 *      var obj = TestEngine.registerCallback("myAsyncFunc", success, failure);
	 *      myAsyncFunc(obj.successCallback, obj.errorCallback);
	 * }
	 */
	registerCallback : function(methodName, testSuccessCallback, testErrorCallback, callbacksCount) {
		try {
			if(callbacksCount !== undefined && callbacksCount > 0) {
				TestEngine.callbackMutex += callbacksCount;
			} else {
				TestEngine.callbackMutex++;
			}
			TestEngine.callbackMethodName = methodName;
			TestEngine.testSuccessCallback = testSuccessCallback;
			TestEngine.testErrorCallback = testErrorCallback;

			var retObj = new Object();
			retObj.callbackMethodName = methodName;
			retObj.testSuccessCallback = testSuccessCallback;
			retObj.successCallback = function(param) {
				try {
					if(( typeof retObj.testSuccessCallback != "undefined") && (retObj.testSuccessCallback !== null)) {
						retObj.testSuccessCallback(param);
					} else {
						TestEngine.logOK(retObj.callbackMethodName + " succeed");
					}
				} catch(err) {
					TestEngine.countException++;
					logError("   TestEngine.this.successCallback failure:" + err.message);
					logError("   TestEngine.this.successCallback failure:" + err.stack);
				}
				TestEngine.callbackMutex--;
			};

			retObj.testErrorCallback = testErrorCallback;
			retObj.errorCallback = function(param) {
				try {
					if(( typeof retObj.testErrorCallback != "undefined") && (retObj.testErrorCallback !== null)) {
						retObj.testErrorCallback(param);
					} else {
						TestEngine.logErr(retObj.callbackMethodName + " failed");
					}
				} catch(err) {
					TestEngine.countException++;
					logError("   TestEngine.retObj.errorCallback failure:" + err.message);
					logError("   TestEngine.retObj.errorCallback failure:" + err.stack);
				}
				TestEngine.callbackMutex--;
			};
			return retObj;
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.registerCallback failure:" + err.message);
		}
	},
	successCallback : function(params) {
		TestEngine.log("[Warning] Function TestEngine.successCallback deprecated");
		try {
			TestEngine.callbackMutex--;
			if( typeof TestEngine.testSuccessCallback != "undefined") {
				TestEngine.testSuccessCallback(params);
			} else {
				TestEngine.logOK(TestEngine.callbackMethodName + " succeed");
			}
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.successCallback failure:" + err.message);
		}
	},
	errorCallback : function(params) {
		TestEngine.log("[Warning] Function TestEngine.errorCallback deprecated");
		try {
			TestEngine.callbackMutex--;
			if( typeof TestEngine.testErrorCallback != "undefined") {
				TestEngine.testErrorCallback(params);
			} else {
				TestEngine.logErr(TestEngine.callbackMethodName + " failed");
			}
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.errorCallback failure:" + err.message);
		}
	},
	waitForCallback : function() {
		try {
			//    while( TestEngine.callbackMutex )
			{
			}
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.waitForCallback failure:" + err.message);
		}
	},
	/*
	 * code - error code which is expected
	 * object - object which will be used to call method
	 * functionName - method name to call
	 * restArguments - rest arguments which will be passed to callback (max arguments = 10)
	 *
	 * example:
	 * TestEngine.catchError(10001, bondi.messaging, findSMSs, succCallback, null, filter)
	 */
	catchError : function(code, object, functionName, restArguments /* , ... */ ) {
		try {
			TestEngine.log("TestEngine.catchError is DEPRECATED. Please use TestEngine.catchErrorType.");
			var error;
			try {
				var newArgs = []
				for(var i = 3; i < arguments.length; i++) {
					newArgs.push(arguments[i])
				}
				var retVal = null;
				//no args
				if(arguments.length == 3) {
					retVal = object[functionName]();
				}
				//1 arg
				if(arguments.length == 4) {
					retVal = object[functionName](newArgs[0]);
				}
				//2 args
				if(arguments.length == 5) {
					retVal = object[functionName](newArgs[0], newArgs[1]);
				}
				//3 args
				if(arguments.length == 6) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2]);
				}
				// 4 args
				if(arguments.length == 7) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3]);
				}
				// 5 args
				if(arguments.length == 8) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4]);
				}
				// 6 args
				if(arguments.length == 9) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5]);
				}
				// 7 args
				if(arguments.length == 10) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6]);
				}
				// 8 args
				if(arguments.length == 11) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7]);
				}
				// 9 args
				if(arguments.length == 12) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7], newArgs[8]);
				}
				// 10 args
				if(arguments.length == 13) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7], newArgs[8], newArgs[9]);
				}

				TestEngine.logErr(functionName + " no error thrown");
				return retVal;
			} catch(error) {
				TestEngine.testPresence("<error code from: " + functionName + ">", error.code);
				TestEngine.test("Error number", error.code == code);
				return;
			}
			TestEngine.logErr("Function " + functionName + " desn't throw");
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.testError failure:" + err.message);
		}
	},
	/*
	 * errorTypeName - attribute name of catched exception to compare with code
	 * code - error code which is expected
	 * object - object which will be used to call method
	 * functionName - method name to call
	 * restArguments - rest arguments which will be passed to callback (max arguments = 10)
	 *
	 * example:
	 * TestEngine.catchErrorType("code", 10001, bondi.messaging, findSMSs, succCallback, null, filter)
	 */
	catchErrorType : function(errorTypeName, code, object, functionName, restArguments /* , ... */ ) {
		try {
			var error;
			try {
				var newArgs = []
				for(var i = 4; i < arguments.length; i++) {
					newArgs.push(arguments[i])
				}
				var retVal = null;
				if(arguments.length < 4) {
					TestEngine.logErr("Wrong catchErrorType usage.");
					return retVal;
				}
				//no args
				if(arguments.length == 4) {
					retVal = object[functionName]();
				}
				//1 arg
				if(arguments.length == 5) {
					retVal = object[functionName](newArgs[0]);
				}
				//2 args
				if(arguments.length == 6) {
					retVal = object[functionName](newArgs[0], newArgs[1]);
				}
				//3 args
				if(arguments.length == 7) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2]);
				}
				// 4 args
				if(arguments.length == 8) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3]);
				}
				// 5 args
				if(arguments.length == 9) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4]);
				}
				// 6 args
				if(arguments.length == 10) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5]);
				}
				// 7 args
				if(arguments.length == 11) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6]);
				}
				// 8 args
				if(arguments.length == 12) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7]);
				}
				// 9 args
				if(arguments.length == 13) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7], newArgs[8]);
				}
				// 10 args
				if(arguments.length == 14) {
					retVal = object[functionName](newArgs[0], newArgs[1], newArgs[2], newArgs[3], newArgs[4], newArgs[5], newArgs[6], newArgs[7], newArgs[8], newArgs[9]);
				}

				TestEngine.logErr(functionName + " no error thrown");
				return retVal;
			} catch(error) {
				TestEngine.testPresence("<error code from: " + functionName + ">", error[errorTypeName]);
				TestEngine.assertEqual("Error number", code, error[errorTypeName]);
				return;
			}
			TestEngine.logErr("Function " + functionName + " desn't throw");
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.testError failure:" + err.message);
		}
	},
	/*
	 * code - error type which is expected
	 * object - object which will be used to call method
	 * functionName - method name to call
	 * restArguments - rest arguments which will be passed to callback (max arguments = 10)
	 *
	 * example:
	 * TestEngine.catchErrorJil("INVALID_ARGUMENT", Widget.Telephony, "getCallRecord", null, null)
	 */
	catchErrorJil : function(code, object, functionName, restArguments /* , ... */ ) {
		try {
			TestEngine.logErr("TestEngine.catchErrorJil is DEPRECATED. Please use TestEngine.catchErrorType.");
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.testError failure:" + err.message);
		}
	},
	// Executes step by step functions passed in steps array
	// and waits after every execution time defined in timeInterval
	executeSteps : function(steps, timeInterval) {
		try {
			if( typeof (timeInterval) == "undefined") {
				timeInterval = 100;
				//default value
			}

			TestEngine.stepsArray = steps;
			TestEngine.stepTimeout = timeInterval;
			TestEngine.currentStep = 0;
			TestEngine.executeNextStep();
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.executeSteps failure:" + err.message);
		}
	},
	executeNextStep : function() {
		try {
			if(TestEngine.stepsArray && (TestEngine.currentStep < TestEngine.stepsArray.length)) {
				if(isArray(TestEngine.stepsArray[TestEngine.currentStep])) {
					TestEngine.stepsArray[ TestEngine.currentStep ][0]();
					setTimeout(TestEngine.executeNextStep, TestEngine.stepsArray[ TestEngine.currentStep ][1]);

				} else {
					TestEngine.stepsArray[ TestEngine.currentStep ]();
					setTimeout(TestEngine.executeNextStep, TestEngine.stepTimeout);
				}
				TestEngine.currentStep++;
			} else {
				TestEngine.currentStep = null;
				TestEngine.stepTimeout = null;
				TestEngine.stepsArray = null;
			}
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.executeNextStep failure:" + err.message);
			jsPrint("   Current step:" + TestEngine.currentStep);

			TestEngine.currentStep = null;
			TestEngine.stepTimeout = null;
			TestEngine.stepsArray = null;
		}
	},
	enumerate : function(obj, level) {
		try {
			if( typeof level == "undefined") {
				TestEngine.log(obj + ":");
				level = "";
			}
			for(i in obj) {
				if(!( typeof obj[i] == "object" || typeof obj[i] == "array")) {
					TestEngine.log(level + i + " =  " + obj[i]);
				} else {
					TestEngine.log(level + i + " =  ");
					TestEngine.enumerate(obj[i], level + "----");
				}
			}
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.enumerate failure:" + err.message);
		}
	},
	doTests : function() {
		try {
			TestEngine.testCasesFailed = [];
			TestEngine.test("jsPrint presence", jsPrint);
			//TestEngine.test("Widget presence", window.widget);
			TestEngine.doNextTestCase();
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.doTests failure:" + err.message);
		}
	},
	showSuitesStats : function() {
		try {
			jsPrint("============ Test suites:");
			for(var i in this.testSuiteStats) {
				jsPrint(i + " - " + this.testSuiteStats[i].passed + " passed, " + this.testSuiteStats[i].failed + " failed," + "   asserts: " + this.testSuiteStats[i].assertsOK + " passed, " + this.testSuiteStats[i].assertsErr + " failed");
			}
		} catch(err) {
			logError("   TestEngine.showSuitesStats failure:" + err.message);
		}
	},
	doNextTestCase : function() {
		try {
			if(TestEngine.stepsArray !== null || (TestEngine.callbackMutex > 0)) {
				setTimeout(TestEngine.doNextTestCase, 100);
				return;
			}

			if(TestEngine.interval > 0) {
				setTimeout(TestEngine.doNextTestCase, TestEngine.interval);
				TestEngine.interval = 0;
				return;
			}

			if(TestEngine.currentTestCase) {
				TestEngine.endTestCase(TestEngine.testList[TestEngine.currentTestCase - 1]);
			}

			if(TestEngine.testList.length == TestEngine.currentTestCase) {
				jsPrint("============");
				jsPrint(TestEngine.finalLog);
				TestEngine.showSuitesStats();
				jsPrint("============ Summary:");
				jsPrint("Test cases all: " + TestEngine.testList.length);
				jsPrint("Test cases passed: " + TestEngine.testCasesPassedCount);
				jsPrint("Test cases failed: " + TestEngine.testCasesFailedCount);
				jsPrint("Asserts passed: " + TestEngine.countAllPassed);
				jsPrint("Asserts failed: " + TestEngine.countAllFailed);
				if(isVerbose()) {
					jsPrint("============ Failing test cases:");
					for( i = 0; i < TestEngine.testCasesFailed.length; ++i) {
						logError(TestEngine.testCasesFailed[i]);
					}
				}
				TestEngine.resultLogger.logFinish();
				TestEngine.summaryRenderer.render(TestEngine);
				if (TestEngine.onFinished) {
					TestEngine.onFinished();
				}
				return;
			}

			var i = TestEngine.currentTestCase++;
			try {
				TestEngine.log("");
				TestEngine.log("==== Test case: " + TestEngine.testList[i].testName);
				TestEngine.startTestCase();
				var testPrereq = true;
				if(TestEngine.testList[i].testPrereq !== undefined) {
					testPrereq = TestEngine.testList[i].testPrereq();
				}
				if(testPrereq) {
					if(TestEngine.testList[i].enabled) {
						TestEngine.testList[i].testFunc();
					} else {
						TestEngine.logErr("Test disabled");
					}

				} else {
					TestEngine.logException("Test case prerequisites unfulfilled.  Skipping it.");
				}
			} catch(err) {
				TestEngine.countException++;
				TestEngine.log("   Test case '" + TestEngine.testList[i].testName + "' failed:" + err.message);
			}
			setTimeout(TestEngine.doNextTestCase, 100);
		} catch(err) {
			logError("   TestEngine.doNextTestCase failure:" + err.message);
		}
	},
	removeResultSaveFile : function(filename) {
		try {
			
			//var filename = TestEngine.testSuiteName + ".test";
			
			tizen.filesystem.resolve("documents", 
					function(fs) {
						fs.deleteFile("documents/" + filename);
					},
					function(e) {
						console.log(err.name + ":" + err.message);
					}, "rw");
		} catch (err) {
			console.log(err.name);
		}
	},
	saveTestResult : function(filename, saveString, needExit) {
		try {
			//var filename = TestEngine.testSuiteName + ".test";
			
			tizen.filesystem.resolve("documents", 
					function(fs) {
						var f = fs.createFile(filename);
						f.openStream("rw", 
								function(stream) {
									stream.write(saveString);
									stream.close();
									if (needExit) {
										tizen.application.getCurrentApplication().exit();
									}
								},
								function(e) {
									console.log(err.name + ":" + err.message);
								});
					},
					function(e) {
						console.log(err.name + ":" + err.message);
					}, "rw");
		} catch (err) {
			console.log(err.name);
		}
	},
	doSCMAutoTests : function(SCM) {
		try {
			TestEngine.removeResultSaveFile(TestEngine.testSuiteName + ".test");
			TestEngine.removeResultSaveFile(TestEngine.testSuiteName + ".fail");

			TestEngine.testCasesFailed = [];
			TestEngine.test("jsPrint presence", jsPrint);
			TestEngine.test("Widget presence", window.widget);
			TestEngine.doSCMAutoNextTestCase(SCM);
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.doTests failure:" + err.message);
		}
	},
	doSCMAutoNextTestCase : function(SCM) {
		try {
			if(TestEngine.stepsArray !== null || (TestEngine.callbackMutex > 0)) {
				setTimeout(TestEngine.doSCMAutoNextTestCase, 100, SCM);
				return;
			}

			if(TestEngine.interval > 0) {
				setTimeout(TestEngine.doSCMAutoNextTestCase, TestEngine.interval, SCM);
				TestEngine.interval = 0;
				return;
			}

			if(TestEngine.currentTestCase) {
				TestEngine.endTestCase(TestEngine.testList[TestEngine.currentTestCase - 1]);
			}

			if(TestEngine.testList.length == TestEngine.currentTestCase) {
				jsPrint("============");
				jsPrint(TestEngine.finalLog);
				TestEngine.showSuitesStats();
				jsPrint("============ Summary:");
				jsPrint("Test cases all: " + TestEngine.testList.length);
				jsPrint("Test cases passed: " + TestEngine.testCasesPassedCount);
				jsPrint("Test cases failed: " + TestEngine.testCasesFailedCount);
				jsPrint("Asserts passed: " + TestEngine.countAllPassed);
				jsPrint("Asserts failed: " + TestEngine.countAllFailed);
				
				var failCasesString = "";

				jsPrint("============ Failing test cases:");

				for( i = 0; i < TestEngine.testCasesFailed.length; ++i) {
					logError(TestEngine.testCasesFailed[i]);
					failCasesString = failCasesString + TestEngine.testCasesFailed[i] + "\n";
					
				}

				if (failCasesString.length > 0) {
					TestEngine.saveTestResult(TestEngine.testSuiteName + ".fail", failCasesString, false);
				}

				TestEngine.resultLogger.logFinish();
				TestEngine.summaryRenderer.render(TestEngine);
				
				var saveString =  TestEngine.testSuiteName + " : " + 
				TestEngine.testCasesPassedCount + "/" +   TestEngine.testList.length + " (Passed/Total)\n";
				TestEngine.saveTestResult(TestEngine.testSuiteName + ".test", saveString, SCM);

			
				//tizen.application.getCurrentApplication().exit();
				
				if (TestEngine.onFinished) {
					TestEngine.onFinished();
				}
				return;
			}

			var i = TestEngine.currentTestCase++;
			try {
				TestEngine.log("");
				TestEngine.log("==== Test case: " + TestEngine.testList[i].testName);
				TestEngine.startTestCase();
				var testPrereq = true;
				if(TestEngine.testList[i].testPrereq !== undefined) {
					testPrereq = TestEngine.testList[i].testPrereq();
				}
				if(testPrereq) {
					if(TestEngine.testList[i].enabled) {
						TestEngine.testList[i].testFunc();
					} else {
						TestEngine.logErr("Test disabled");
					}

				} else {
					TestEngine.logException("Test case prerequisites unfulfilled.  Skipping it.");
				}
			} catch(err) {
				TestEngine.countException++;
				TestEngine.log("   Test case '" + TestEngine.testList[i].testName + "' failed:" + err.message);
			}
			setTimeout(TestEngine.doSCMAutoNextTestCase, 100, SCM);
		} catch(err) {
			logError("   TestEngine.doNextTestCase failure:" + err.message);
		}
	},

	doAutoTests : function() {
		try {
			TestEngine.testCasesFailed = [];
			TestEngine.test("jsPrint presence", jsPrint);
			TestEngine.test("Widget presence", window.widget);
			TestEngine.doAutoNextTestCase();
		} catch(err) {
			TestEngine.countException++;
			logError("   TestEngine.doTests failure:" + err.message);
		}
	},
	doAutoNextTestCase : function() {
		try {
			if(TestEngine.stepsArray !== null || (TestEngine.callbackMutex > 0)) {
				setTimeout(TestEngine.doAutoNextTestCase, 100);
				return;
			}

			if(TestEngine.interval > 0) {
				setTimeout(TestEngine.doAutoNextTestCase, TestEngine.interval);
				TestEngine.interval = 0;
				return;
			}

			if(TestEngine.currentTestCase) {
				TestEngine.endTestCase(TestEngine.testList[TestEngine.currentTestCase - 1]);
			}

			if(TestEngine.testList.length == TestEngine.currentTestCase) {
				jsPrint("============");
				jsPrint(TestEngine.finalLog);
				TestEngine.showSuitesStats();
				jsPrint("============ Summary:");
				jsPrint("Test cases all: " + TestEngine.testList.length);
				jsPrint("Test cases passed: " + TestEngine.testCasesPassedCount);
				jsPrint("Test cases failed: " + TestEngine.testCasesFailedCount);
				jsPrint("Asserts passed: " + TestEngine.countAllPassed);
				jsPrint("Asserts failed: " + TestEngine.countAllFailed);
				
				if(isVerbose()) {
					jsPrint("============ Failing test cases:");
					for( i = 0; i < TestEngine.testCasesFailed.length; ++i) {
						logError(TestEngine.testCasesFailed[i]);
					}
				}
				TestEngine.resultLogger.logFinish();
				TestEngine.summaryRenderer.render(TestEngine);
				window.close();
				if (TestEngine.onFinished) {
					TestEngine.onFinished();
				}
				return;
			}

			var i = TestEngine.currentTestCase++;
			try {
				TestEngine.log("");
				TestEngine.log("==== Test case: " + TestEngine.testList[i].testName);
				TestEngine.startTestCase();
				var testPrereq = true;
				if(TestEngine.testList[i].testPrereq !== undefined) {
					testPrereq = TestEngine.testList[i].testPrereq();
				}
				if(testPrereq) {
					if(TestEngine.testList[i].enabled) {
						TestEngine.testList[i].testFunc();
					} else {
						TestEngine.logErr("Test disabled");
					}

				} else {
					TestEngine.logException("Test case prerequisites unfulfilled.  Skipping it.");
				}
			} catch(err) {
				TestEngine.countException++;
				TestEngine.log("   Test case '" + TestEngine.testList[i].testName + "' failed:" + err.message);
			}
			setTimeout(TestEngine.doAutoNextTestCase, 100);
		} catch(err) {
			logError("   TestEngine.doNextTestCase failure:" + err.message);
		}
	}
};

function isUndefined(val) {
	if( typeof val == "undefined") {
		return true;
	}
	return false;
}

function isNull(val) {
	return val === null;
}

function isString(val) {
	if( typeof val == typeof "") {
		return true;
	}
	return false;
}

function isNumber(val) {
	if( typeof val == typeof 0) {
		return true
	}
	return false;
}

function isDate(val) {
	return ( val instanceof Date);
}

function isFunction(val) {
	return ( typeof (val) == 'function');
}

function isBoolean(val) {
	if( typeof val == typeof true) {
		return true
	}
	return false;
}

function isArray(val) {
	return ( val instanceof Array);
}

function isObject(val) {
	return ( val );
}

function isVerbose() {
	return (( typeof (VERBOSE) != "undefined") && (VERBOSE === 1));
}

/**
 * Tests results logger.
 */
function HTMLTestResultLogger(sinkId) {
	jsPrint('Results are saved to: ' + sinkId);

	/**
	 * Logs a message.
	 * @param message Message to log.
	 * @param status Status of the message (PASSED, FAILED, EXCEPTION).
	 *               By default status is set to PASSED.
	 */
	this.log = function(message, status) {
		if(arguments.length < 2)
			throw "Not enough number of arguments.";
		append(createLogEntry(message, status));
	}
	/**
	 * Helper functions.
	 */
	this.logPass = function(message) {
		if(arguments.length < 1)
			throw "Not enough number of arguments.";
		this.log(message, HTMLTestResultLogger.PASSED);
	}

	this.logFail = function(message) {
		if(arguments.length < 1)
			throw "Not enough number of arguments.";
		this.log(message, HTMLTestResultLogger.FAILED);
	}

	this.logFinish = function() {
		append(htmlFooter);
	}

	var createLogEntry = function(message, status) {
		var entry = '<div class="entry ' + status + '">';
		entry += message.toString();
		entry += '</div>';
		return entry;
	}
	
	function append(data) {
		fs.appendFileSync(sink, data + '\n');
	}
	
	var fs = require('fs');
	var id = sinkId;
	var sink = sinkId;

	append(htmlHeader);
}

HTMLTestResultLogger.PASSED = "passed";
HTMLTestResultLogger.FAILED = "failed";
HTMLTestResultLogger.EXCEPTION = "exception";

/**
 * Tests summary renderer.
 */
function HTMLTestSummaryRenderer(summaryId) {
	jsPrint('Summary is saved to: ' + summaryId);

	this.render = function(engine) {
		if(arguments.length < 1)
			throw "Not enough arguments.";

		fs.writeFileSync(summary, '');
		append(htmlHeader);
		renderSummary(engine);
		for(var suiteName in engine.testSuiteStats) {
			if(!isSuiteStarted(engine.testSuiteStats[suiteName]))
				continue;
			renderSuite(suiteName, engine.testSuiteStats[suiteName]);
		}
		append(htmlFooter);
	}
	var isSuiteStarted = function(stats) {
		return (stats.passed + stats.failed != 0);
	}
	var renderSuite = function(name, stats) {
		var elementId = '_summary_suite_' + name;
		var text = stats.passed + ' tests (' + stats.assertsOK + ' asserts)' + ' passed, ' + stats.failed + ' tests (' + stats.assertsErr + ' asserts)' + ' failed';
		var element = '<div id="' + elementId + '">' + name + ': ' + '<span name="stats">' + text + '</span></div>';
		append(element);
	}
	var renderSummary = function(engine) {
		var run = '<div>Run: <span id="_summary_numberOfRunTests">' + engine.currentTestCase + '</span>';
		run += ' of <span id="_summary_numberOfAllTests">' + engine.testList.length + '</span> tests</div>';
		//var current = '<div>Current: <span id="_summary_currentTest">' + 0 + '</span></div>';
		var passed = '<div>Passed: <span id="_summary_numberOfPassedTests" class="passed">' + engine.testCasesPassedCount + '</span> tests ';
		passed += '(<span id="_summary_numberOfPassedAsserts" class="passed">' + engine.countAllPassed + '</span> asserts)</div>';
		var failed = '<div>Failed: <span id="_summary_numberOfFailedTests" class="failed">' + engine.testCasesFailedCount + '</span> tests ';
		failed += '(<span id="_summary_numberOfFailedAsserts" class="failed">' + engine.countAllFailed + '</span> asserts)</div>';
		append(run);
		append(passed);
		append(failed);
	}
	function append(data) {
		fs.appendFileSync(summary, data + '\n');
	}
	var fs = require('fs');
	var id = summaryId;
	var summary = summaryId;
}

GLOBAL.isUndefined = isUndefined;
GLOBAL.isNull = isNull;
GLOBAL.isString = isString;
GLOBAL.isNumber = isNumber;
GLOBAL.isDate = isDate;
GLOBAL.isFunction = isFunction;
GLOBAL.isBoolean = isBoolean;
GLOBAL.isArray = isArray;
GLOBAL.isObject = isObject;
GLOBAL.jsPrint = jsPrint;
GLOBAL.logFail = logFail;
GLOBAL.logError = logError;
module.exports = TestEngine;
