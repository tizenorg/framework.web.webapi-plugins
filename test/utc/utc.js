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
        var configDir = __dirname + '/config/';
        var testsDir = __dirname + '/tests/';
        var testRegExp = /^Test(.*)\.js$/;
        var configPrefix = 'Config';
        var testPrefix = 'Test';
        var extension = '.js';

        // find available tests
        var availableTests = {};
        var testFiles = fs.readdirSync(testsDir);

        for (var ii = 0; ii < testFiles.length; ++ii) {
            var match = testRegExp.exec(testFiles[ii]);
            if (match) {
                match = match[1];
                if (fs.existsSync(configDir + configPrefix + match + extension)) {
                    availableTests[match.toLowerCase()] = match;
                }
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
        var TestEngine = require('./common/TestEngine.js');

        // configure the clock script
        require('child_process').exec(__dirname + '/changeClockSettingFile.sh');

        // load tests
        for (var test in selectedTests) {
            if (availableTests[test]) {
                console.log('Adding test: ' + availableTests[test]);
                (function () {
                    try {
                        eval(fs.readFileSync(testsDir + testPrefix +
                                availableTests[test] + extension, 'utf-8')+ '');
                        eval(fs.readFileSync(configDir + configPrefix +
                                availableTests[test] + extension, 'utf-8') + '');
                    } catch (e) {
                        console.log('Error while adding ' + availableTests[test] + ': ' + e);
                        console.log(e.stack);
                    }
                })();
            }
        }

        // exit the process when testing is finished
        TestEngine.onFinished = function () {
            process.exit();
        };
        var testFolderName1 = '/opt/usr/media/Documents';
        try {
            if (!fs.existsSync(testFolderName1)) {
               fs.mkdirSync(testFolderName1, 0777);
            }
        } catch (err) {
            console.log('Creating ' + testFolderName1 + ' folder failed');
        }
        var testFileName1 = '/opt/usr/media/Images/image1.jpg';
        try {
            if (!fs.existsSync(testFileName1)) {
               fs.writeFileSync(testFileName1, 'Do I look like an image?');
            }
        } catch (err) {
            console.log('Creating "' + testFileName1 + '" file failed');
        }

        // run tests
        TestEngine.doTests();
    }

    if (!module.parent) {
        // standalone script
        runTests(process.argv.slice(2));
    } else {
        module.exports = runTests;
    }
})();
