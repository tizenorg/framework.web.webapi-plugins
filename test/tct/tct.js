/*
 * Copyright (c) 2014 Samsung Electronics Co., Ltd All Rights Reserved
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 */

(function() {
    function runTests() {
        // gather tests to run
        var selectedTests = {};
        for (var i = 0; i < arguments.length; ++i) {
            var arg = arguments[i];
            if (!(arg instanceof Array)) {
                arg = String(arg).split(' ');
            }
            for (var j = 0; j < arg.length; ++j) {
                selectedTests[arg[j].toLowerCase()] = '';
            }
        }

        // load node.js modules
        var fs = require('fs');

        // checks if object is empty
        function isEmptyObject(object) {
            for (var prop in object) {
                if (object.hasOwnProperty(prop)) {
                    return false;
                }
            }
            return true;
        }

        // constants
        var testsDir = __dirname + '/tests/';
        var testRegExp = /^Test(.*)\.js$/;
        var testPrefix = 'Test';
        var extension = '.js';

        // find available tests
        var availableTests = {};
        var testFiles = fs.readdirSync(testsDir);

        for (var ii = 0; ii < testFiles.length; ++ii) {
            var match = testRegExp.exec(testFiles[ii]);
            if (match) {
                match = match[1];
                availableTests[match.toLowerCase()] = match;
            }
        }

        // if no tests are selected, run all
        if (isEmptyObject(selectedTests)) {
            selectedTests = availableTests;
        }

        // load tizen modules
        if (typeof (tizen) === 'undefined') {
            require('../common/loader.js')();
        }

        // load test engine
        require('./common/testharness.js');
        require('./common/unitcommon.js');

        // stores test cases
        var testCases = [];
        var stats = { modules : {}, tests : {} };

        function add_test_case(m, f) {
            if (!stats.modules[m]) {
                stats.modules[m] = {};
                stats.modules[m].all = 0;
                stats.modules[m].pass = 0;
                stats.modules[m].fail = 0;
                stats.modules[m].timeout = 0;
                stats.modules[m].notrun = 0;
            }
            ++stats.modules[m].all;
            stats.tests[f.name] = m;
            testCases.push(f);
        }
        expose(add_test_case, 'add_test_case');

        // load tests
        for (var test in selectedTests) {
            if (availableTests[test]) {
                console.log('Loading test: ' + availableTests[test]);
                try {
                    require(testsDir + testPrefix + availableTests[test] + extension);
                } catch (e) {
                    console.log('Failed to load: ' + availableTests[test]);
                    console.log(e);
                }
            }
        }

        // handle test case
        var currentTest = 0;

        function onResult(test) {
            if (test) {
                // store statistics
                var m = stats.tests[test.name];
                switch (test.status) {
                case 0:
                    ++stats.modules[m].pass;
                    break;
                case 1:
                    ++stats.modules[m].fail;
                    break;
                case 2:
                    ++stats.modules[m].timeout;
                    break;
                case 3:
                    ++stats.modules[m].notrun;
                    break;
                }
            }

            // launch next test case
            if (currentTest < testCases.length) {
                setTimeout(testCases[currentTest], 0);
                ++currentTest;
            } else {
                done();
            }
        }
        function onFinish() {
            var total = 0;
            var pass = 0;
            var fail = 0;
            var timeout = 0;
            var notrun = 0;
            console.log('============ Test suites:');
            for (var m in stats.modules) {
                if (stats.modules.hasOwnProperty(m)) {
                    var s = stats.modules[m];
                    var nr = s.all - s.pass - s.fail - s.timeout;
                    console.log('[' + m + '] - ' + s.pass + ' passed, ' + s.fail + ' failed, ' + s.timeout + ' timed out, ' + nr + ' not run.');
                    total += s.all;
                    pass += s.pass;
                    fail += s.fail;
                    timeout += s.timeout;
                    notrun += nr;
                }
            }
            console.log('============ Summary:');
            console.log('Test cases all: ' + total);
            console.log('Test cases passed: ' + pass);
            console.log('Test cases failed: ' + fail);
            console.log('Test cases timed out: ' + timeout);
            console.log('Test cases not run: ' + notrun);
            // terminate process
            process.exit();
        }

        // register callbacks
        add_result_callback(onResult);
        add_completion_callback(onFinish);

        // start testing
        console.log('Running tests');
        onResult();
    }

    if (!module.parent) {
        // standalone script
        runTests(process.argv.slice(2));
    } else {
        module.exports = runTests;
    }
})();

