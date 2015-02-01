/*

Copyright (c) 2013 Samsung Electronics Co., Ltd.

Licensed under the Apache License, Version 2.0 (the License);
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.



Authors:



*/

var TEST_ROOT_LOCATION = "downloads";

var FILE_AND_DIR_NAME_PREFIX = "tizen_WebAPI_test_";
var UNKNOWN_ERR              = "UnknownError";
var TYPE_MISMATCH_ERR        = "TypeMismatchError";
var IO_ERR                   = "IOError";
var INVALID_VALUES_ERR       = "InvalidValuesError";
var SECURITY_ERR             = "SecurityError";
var NOT_FOUND_ERR            = "NotFoundError";

var globalCounter = 1;

function isFileObject(obj) {
    return true;
}

function isFile(obj) {
    return (isFileObject(obj) && !obj.isDirectory);
}

function isDir(obj) {
    return (isFileObject(obj) && obj.isDirectory);
}

function isFilestream(obj) {
    return true;
}

function deleteDirectory(parent, dir) {
    function onError(err) {
        assert_false("deleteDirectory() [" + err.name + "]", "directory wasn't deleted");
    }

    function onSuccess() {
    }
    parent.deleteDirectory(dir.fullPath, true, onSuccess, onError);
}

function deleteFile(parent, file) {
    function onError(err) {
        assert_false("deleteFile [" + err.name + "]", "file wasn't deleted");
    }

    function onSuccess() {
    }
    parent.deleteFile(file.fullPath, onSuccess, onError);
}

function resolve_root_location(handler) {
    function on_resolve_error(err) {
        assert_false("resolve error: [" + err.name + "]", "error during resolving the root location");
    }

    function on_resolve_success(file) {
        assert_true(isFileObject(file), "resolve()");
        handler(file);
    }
    tizen.filesystem.resolve(TEST_ROOT_LOCATION, on_resolve_success, on_resolve_error);
}

function getFileName(fileName) {
    return FILE_AND_DIR_NAME_PREFIX + "_" + fileName;
}

function getDirName(dirName) {
    return FILE_AND_DIR_NAME_PREFIX + "_" + dirName;
}

function createFileForParent(parent) {
    var result = parent.createFile(getFileName());
    assert_true(isFile(result), "createFile");
    return result;
}

function createDirForParent(parent) {
    var result = parent.createDirectory(getDirName());
    assert_true(isDir(result), "createDirectory()");
    return result;
}

function deleteFileAndDone(test, file) {
    if(file === undefined) {
        throw new Error("deleteFileAndDone: file is undefined");
    }
    if(file.parent === null){
        throw new Error("deleteFileAndDone: parent directory is null");
    }
    file.parent.deleteFile(file.fullPath,
        test.step_func(function() {
            test.done();
        }),
        test.step_func(function(err) {
            assert_unreached("deleteFileAndDone: delete onError " + err.message);
        }));
}

function prepareForTesting(test, successCallback) {
    var i, j, toRemoveCounter = 0, dirCounter = 0, deleteSuccess, deleteError,
        resolveSuccess, resolveError, listFilesSuccess, listFilesError,
        filterRegExp = new RegExp("^" + FILE_AND_DIR_NAME_PREFIX),
        rootDirectories = ["documents", "images", "music", "videos", "downloads"];

    deleteError = test.step_func(function (error) {
        assert_unreached("delete() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    deleteSuccess = test.step_func(function () {
        if (--toRemoveCounter === 0) {
            test.step_func(successCallback)();
        }
    });

    listFilesSuccess = test.step_func(function (files) {
        dirCounter++;
        for (j = 0; j < files.length; j++) {
            if (files[j].name.search(filterRegExp) > -1) {
                toRemoveCounter++;
                if (files[j].isDirectory) {
                    files[j].parent.deleteDirectory(files[j].fullPath, true, deleteSuccess, deleteError);
                } else {
                    files[j].parent.deleteFile(files[j].fullPath, deleteSuccess, deleteError);
                }
            }
        }
        if ((dirCounter === rootDirectories.length) && (toRemoveCounter === 0)) {
            test.step_func(successCallback)();
        }
    });

    listFilesError = test.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = test.step_func(function (dir) {
        dir.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = test.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    for (i =0; i < rootDirectories.length; i++) {
        tizen.filesystem.resolve(rootDirectories[i], resolveSuccess, resolveError, "rw");
    }
}

function checkOwnProperties(fileHandle) {
    var i, len, fileProperties = ["parent", "readOnly", "isFile", "isDirectory", "created", "modified", "path",
                                  "name", "fullPath", "fileSize", "length"];
    for (i = 0, len = fileProperties.length; i < len; i++) {
        assert_own_property(fileHandle, fileProperties[i], "object does not have its own " + fileProperties[i] + " property");
    }
}

function FileArraySuccessCallback_notexist() {
//==== TEST: FileArraySuccessCallback_notexist
//==== LABEL Interface FileArraySuccessCallback should not be accessible
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileArraySuccessCallback:FileArraySuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("FileArraySuccessCallback");
}, 'FileArraySuccessCallback_notexist');

}

function FileArraySuccessCallback_onsuccess() {

//==== TEST: FileArraySuccessCallback_onsuccess
//==== LABEL Test whether FileArraySuccessCallback::onsuccess is called with valid argument
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileArraySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBOA CBT

var t = async_test('FileArraySuccessCallback_onsuccess'),
    resolveSuccess, resolveError, listSuccess, i, fsTestFileName, foundValue = false;

t.step(function () {
    fsTestFileName = getFileName("filesystem");

    listSuccess = t.step_func(function (files) {
        assert_type(files, "array", "incorrect received value");
        assert_greater_than(files.length, 0, "incorrect received array");
        for (i = 0; i < files.length; i++) {
            assert_type(files[i], "object", "incorrect received array element");
            checkOwnProperties(files[i]);
            if ((files[i].name === fsTestFileName) && (files[i].isFile === true)) {
                foundValue = true;
            }
        }
        assert_true(foundValue, "new file not found");
        t.done();
    });
    resolveSuccess = t.step_func(function (dir) {
        dir.createFile(fsTestFileName);
        dir.listFiles(listSuccess);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function FileStreamSuccessCallback_notexist() {
//==== TEST: FileStreamSuccessCallback_notexist
//==== LABEL Interface FileStreamSuccessCallback should not be accessible
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileStreamSuccessCallback:FileStreamSuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("FileStreamSuccessCallback");
}, 'FileStreamSuccessCallback_notexist');

}

function FileStreamSuccessCallback_onsuccess() {
//==== TEST: FileStreamSuccessCallback_onsuccess
//==== LABEL Test whether FileStreamSuccessCallback::onsuccess is called with argument of proper type
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileStreamSuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBOA CBT
var t = async_test('FileStreamSuccessCallback_onsuccess'),
    resolveSuccess, resolveError, file, openStreamSuccess,
    fsTestFileName = getFileName("filesystem.txt");

t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        assert_type(fs, "object", "fs isn't an object");
        assert_own_property(fs, "eof", "fs doesn't have eof property");
        assert_own_property(fs, "position", "fs doesn't have eof property");
        assert_own_property(fs, "bytesAvailable", "fs doesn't have eof property");
        fs.close();
        t.done();
    });
    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("r", openStreamSuccess);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_bytesAvailable_attribute() {
//==== TEST: FileStream_bytesAvailable_attribute
//==== PRIORITY P1
//==== LABEL Check if FileStream::bytesAvailable attribute exist, is of proper type
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:bytesAvailable A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE ARO AT
var t = async_test('FileStream_bytesAvailable_attribute'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file,
    testStr = "1234", fsTestFileName = getFileName("existFile01.txt");

t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        fs.write(testStr);
        fs.position = 0;
        assert_true("bytesAvailable" in fs, "bytesAvailable doesn't exist");
        check_readonly(fs, "bytesAvailable", fs.bytesAvailable, "long", fs.bytesAvailable + 2);
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_close() {
//==== TEST: FileStream_close
//==== PRIORITY P2
//==== LABEL Check if FileStream::close() method works
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:close M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MNA MR MNAST
var t = async_test('FileStream_close'),
    fsTestFileName = getFileName("closeFile.txt"), retVal = null,
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file;

t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        fs.write("abcdefg");
        retVal = fs.close();
        assert_equals(retVal, undefined, "incorrect returned value close()");
        assert_throws(IO_EXCEPTION, function () {
                fs.read(2);
            });
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_close_exist() {
//==== TEST: FileStream_close_exist
//==== LABEL Check if FileStream::close() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:close M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME
var t = async_test('FileStream_close_exist'),
    fsTestFileName = getFileName("existFile04.txt"),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file;

t.step(function (){

    openStreamSuccess = t.step_func(function (fs) {
        assert_true("close" in fs, "No close method in FileStream");
        check_method_exists(fs, "close");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_close_extra_argument() {
//==== TEST: FileStream_close_extra_argument
//==== LABEL Check if FileStream::close() method can be called with extra arguments
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:close M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MNAEX

var t = async_test('FileStream_close_extra_argument'),
    fsTestFileName = getFileName("TestFile.txt"),
    resolveSuccess, resolveError, file, openStreamSuccess, openStreamError;
t.step(function () {
    openStreamSuccess = t.step_func(function (stream) {
        checkExtraArgument(stream, "close");
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_eof_attribute() {
//==== TEST: FileStream_eof_attribute
//==== PRIORITY P1
//==== LABEL Check if FileStream::eof attribute exists, is Boolean
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:eof A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE ARO AT
var t = async_test('FileStream_eof_attribute'),
    fsTestFileName = getFileName("existFile02.txt"),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file;
t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        assert_true("eof" in fs, "eof doesn't exist");
        check_readonly(fs, "eof", false, "boolean", true);
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_extend() {
//==== TEST: FileStream_extend
//==== LABEL Test whether instance of FileStream can be extended with new attribute
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:FileStream U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA OBX
var t = async_test('FileStream_extend'),
    fsTestFileName = getFileName("closeFile.txt"),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file;

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        check_extensibility(fs);
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_notexist() {
//==== TEST: FileStream_notexist
//==== LABEL Interface FileStream should not be accessible
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:FileStream U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("FileStream");
}, 'FileStream_notexist');

}

function FileStream_position_attribute() {
//==== TEST: FileStream_position_attribute
//==== PRIORITY P2
//==== LABEL Check if FileStream::position attribute exists, is of proper type, can be changed
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:position A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ASG AN
var t = async_test('FileStream_position_attribute'),
    fsTestFileName = getFileName("existFile0.txt"),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file;
t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        assert_own_property(fs, "position", "this FileStream doesn't have own position property");
        assert_type(fs.position, "long", "incorrect type of position");
        assert_equals(fs.position, 0, "incorrect default position");
        fs.write("abcdefg");
        assert_equals(fs.position, 7, "incorrect default position after write");
        fs.position = 2;
        assert_equals(fs.position, 2, "can't change the position");
        check_not_nullable(fs, "position");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_read() {
//==== TEST: FileStream_read
//==== LABEL Check if FileStream::read() method works properly
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:read M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR
var t = async_test('FileStream_read'),
    fsTestFileName = getFileName("filesystem01.txt"),
    resolveSuccess, resolveError, openStreamError, openStreamSuccess,
    openStreamReadSuccess, file, expected = "abcde", text;

t.step(function (){
    openStreamReadSuccess = t.step_func(function (fs) {
        text = fs.read(5);
        fs.close();
        assert_equals(text, expected, "read fs failed, read '" + text + "', expected '" + expected + "'");
        t.done();
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("abcdefg");
        fs.close();
        file.openStream("r", openStreamReadSuccess, openStreamError);
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_readBase64() {
//==== TEST: FileStream_readBase64
//==== LABEL Check if FileStream::readBase64() method works
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:readBase64 M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR
var t = async_test('FileStream_readBase64'),
    fsTestFileName = getFileName("readBaseFile.txt"),
    resolveSuccess, resolveError, openStreamError, openStreamSuccess,
    openStreamReadSuccess, file, expected = "YWJjZGVmZw==", base64;

t.step(function (){

    openStreamReadSuccess = t.step_func(function (fs) {
        base64 = fs.readBase64(256);
        fs.close();
        assert_equals(base64, expected, "read fs failed, read " + base64 + ", expected " + expected);
        t.done();
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("abcdefg");
        fs.close();
        file.openStream("r", openStreamReadSuccess, openStreamError);
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_readBase64_exist() {
//==== TEST: FileStream_readBase64_exist
//==== LABEL Check if FileStream::readBase64() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:readBase64 M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME
var t = async_test('FileStream_readBase64_exist'),
    fsTestFileName = getFileName("existFile07.txt"),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file;

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        assert_true("readBase64" in fs, "readBase64 exists");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_readBase64_without_r_permission() {

//==== TEST: FileStream_readBase64_without_r_permission
//==== LABEL Check if FileStream::readBase64() throws exception when reading from a file opened in 'w' mode
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:readBase64 M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('FileStream_readBase64_without_r_permission'), testFile,
    fsTestFileName = getFileName("readBase64WithoutR.txt"), resolveSuccess,
    resolveError, openStreamSuccess, openStreamError, expected = "IOError";

t.step(function () {

    openStreamSuccess = t.step_func(function (fs) {
        assert_throws({name: expected}, function () {
            fs.readBase64(256);
        }, expected + "exception should be thrown");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        testFile = dir.createFile(fsTestFileName);
        testFile.openStream("w", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_readBase64_writeFile() {
//==== TEST: FileStream_readBase64_writeFile
//==== LABEL Check if you can create a new file, write content to it, and then read the content of the file as base64
//==== PRIORITY P3
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:FileStream U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('FileStream_readBase64_writeFile'),
    fsTestFileName = getFileName("fileSystem-File03.txt"),
    resolveSuccess, resolveError, openStreamError, openStreamSuccess,
    openStreamReadSuccess, file, expected = "YWJjZGVmZw==", base64;

t.step(function (){
    openStreamReadSuccess = t.step_func(function (fs) {
        base64 = fs.readBase64(256);
        fs.close();
        assert_equals(base64, expected, "read fs failed, read " + base64 + ", expected " + expected);
        t.done();
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("abcdefg");
        fs.close();
        file.openStream("r", openStreamReadSuccess, openStreamError, "UTF-8");
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_readBytes() {
//==== TEST: FileStream_readBytes
//==== LABEL Check if FileStream::readBytes() method works properly
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:readBytes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR
var t = async_test('FileStream_readBytes'), i,
    fsTestFileName = getFileName("readBytesFile.txt"), stringToWrite = "1234567",
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, len,
    openStreamReadSuccess, file, bytes;

t.step(function () {
    openStreamReadSuccess = t.step_func(function (fs) {
        bytes = fs.readBytes(256);
        fs.close();
        assert_type(bytes, "array", "incorrect read type");
        assert_equals(bytes.length, stringToWrite.length, "read fs failed, read " + bytes.length + ", expected " + stringToWrite.length);
        for (i = 0, len = bytes.length; i < len; i++) {
            assert_equals(bytes[i], stringToWrite.charCodeAt(i), "incorrect read value");
        }
        t.done();
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write(stringToWrite);
        fs.close();
        file.openStream("r", openStreamReadSuccess, openStreamError);
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_readBytes_exist() {
//==== TEST: FileStream_readBytes_exist
//==== LABEL Check if FileStream::readBytes() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:readBytes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME
var t = async_test('FileStream_readBytes_exist'),
    fsTestFileName = getFileName("existFile06.txt"),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file;

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        assert_true("readBytes" in fs, "readBytes exists");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_readBytes_without_r_permission() {

//==== TEST: FileStream_readBytes_without_r_permission
//==== LABEL Check if FileStream::readBytes() throws exception when reading from a file opened in 'w' mode
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:readBytes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('FileStream_readBytes_without_r_permission'), testFile,
    fsTestFileName = getFileName("readBytesWithoutR.txt"),
    resolveSuccess, resolveError, openStreamSuccess,
    openStreamError, expected = "IOError";

t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        assert_throws({name: expected}, function () {
            fs.readBytes(2);
        }, expected + "exception should be thrown");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        testFile = dir.createFile(fsTestFileName);
        testFile.openStream("w", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_readBytes_writeFile() {
//==== TEST: FileStream_readBytes_writeFile
//==== LABEL Check if you can create a new file, write content to it, and then read the content of the file as a byte array
//==== PRIORITY P3
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:FileStream U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('FileStream_readBytes_writeFile'),
    fsTestFileName = getFileName("fileSystem-File04.txt"),
    resolveSuccess, resolveError, openStreamError, openStreamSuccess,
    openStreamReadSuccess, file, expected = 7, bytes;

t.step(function (){
    openStreamReadSuccess = t.step_func(function (fs) {
        bytes = fs.readBytes(256);
        fs.close();
        assert_equals(bytes.length, expected, "read fs failed, read " + bytes.length + ", expected " + expected);
        t.done();
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("abcdefg");
        fs.close();
        file.openStream("r", openStreamReadSuccess, openStreamError, "UTF-8");
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_read_exist() {
//==== TEST: FileStream_read_exist
//==== LABEL Check if FileStream::read() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:read M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME
var t = async_test('FileStream_read_exist'),
    fsTestFileName = getFileName("existFile05.txt"),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file;

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        assert_true("read" in fs, "read exists");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_read_without_r_permission() {

//==== TEST: FileStream_read_without_r_permission
//==== LABEL Check if FileStream::read() throws exception when reading from a file opened in 'w' mode
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:read M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('FileStream_read_without_r_permission'),
    fsTestFileName = getFileName("write03.txt"), expected = "IOError", testFile,
    resolveSuccess, resolveError, openStreamSuccess, openStreamError;
t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        assert_throws({name: expected}, function () {
            fs.read(fs.bytesAvailable);
        }, expected + " exception should be thrown");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        testFile = dir.createFile(fsTestFileName);
        testFile.openStream("w", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_read_writeFile() {
//==== TEST: FileStream_read_writeFile
//==== LABEL Check if you can create a new file, write content to it, and then read the content of the file
//==== PRIORITY P3
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:FileStream U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('FileStream_read_writeFile'),
    resolveSuccess, resolveError, openStreamError, openStreamSuccess,
    openStreamRSuccess, file, expected = "test write method", text,
    fsTestFileName = getFileName("fileSystem-File05.txt");

t.step(function (){
    openStreamRSuccess = t.step_func(function (fs) {
        text = fs.read(expected.length);
        fs.close();
        assert_equals(text, expected, "read fs failed, read '" + text + "', expected '" + expected + "'");
        t.done();
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write(expected);
        fs.close();
        file.openStream("r", openStreamRSuccess, openStreamError, "UTF-8");
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_write() {
//==== TEST: FileStream_write
//==== LABEL Check if FileStream::write() method works properly
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:write M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MMINA MR

var t = async_test('FileStream_write'),
    resolveSuccess, resolveError, openStreamRSuccess, openStreamWSuccess,
    openStreamError, file, text, testString = "abcde", retVal = null,
    fsTestFileName = getFileName("GoodFile.txt");

t.step(function () {
    openStreamRSuccess = t.step_func(function (fs) {
        text = fs.read(testString.length);
        fs.close();
        assert_equals(text, testString, "Invalid characters read");
        t.done();
    });
    openStreamWSuccess = t.step_func(function (fs) {
        retVal = fs.write(testString);
        fs.close();
        assert_equals(retVal, undefined, "incorrect returned value from write()");
        file.openStream("r", openStreamRSuccess, openStreamError, "UTF-8");
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamWSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("images", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_writeBase64() {
//==== TEST: FileStream_writeBase64
//==== LABEL Check if FileStream::writeBase64() method works properly
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:writeBase64 M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MMINA MR
var t = async_test('FileStream_writeBase64'),
    resolveSuccess, resolveError, openStreamWSuccess, openStreamRSuccess, retVal = null,
    openStreamError, file, base64String = "YWJjZGVmZw==", expected = "abcdefg",
    readString, fsTestFileName = getFileName("readBaseFile.txt");

t.step(function () {
    openStreamRSuccess = t.step_func(function (fs) {
        readString = fs.read(expected.length);
        fs.close();
        assert_equals(readString, expected, "Incorrect bytes.");
        t.done();
    });
    openStreamWSuccess = t.step_func(function (fs) {
        retVal = fs.writeBase64(base64String);
        assert_equals(retVal, undefined, "incorrect returned value from writeBase64()");
        fs.close();
        file.openStream("r", openStreamRSuccess, openStreamError);
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamWSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_writeBase64_exist() {
//==== TEST: FileStream_writeBase64_exist
//==== LABEL Check if FileStream::writeBase64() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:writeBase64 M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME
var t = async_test('FileStream_writeBase64_exist'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file,
    fsTestFileName = getFileName("readBaseFile.txt");

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        assert_true("writeBase64" in fs, "writeBase64 exists");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_writeBase64_without_w_permission() {
//==== TEST: FileStream_writeBase64_without_w_permission
//==== LABEL Check if FileStream::writeBase64() throws exception when writing to a file opened in 'r' mode
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:writeBase64 M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var resolveSuccess, resolveError, openStreamSuccess, openStreamError, file,
    expected = "IOError",  base = "YWJjZGVmZw==",
    t = async_test('FileStream_writeBase64_without_w_permission'),
    fsTestFileName = getFileName("write11.txt");

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        assert_throws({name: expected}, function () {
            fs.writeBase64(base);
        }, expected + " exception should be thrown");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("r", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_writeBytes() {
//==== TEST: FileStream_writeBytes
//==== LABEL Check if FileStream::writeBytes() method works properly
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:writeBytes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MMINA MR

var t = async_test('FileStream_writeBytes'),
    resolveSuccess, resolveError, openStreamWithWSuccess, openStreamWithRSuccess,
    openStreamError, file, bytes, testString = [1, 2, 3, 4, 5, 6, 7], retVal = null,
    fsTestFileName = getFileName("writeBytes.txt");

t.step(function () {
    openStreamWithRSuccess = t.step_func(function (fs) {
        bytes = fs.readBytes(file.fileSize);
        fs.close();
        assert_array_equals(bytes, testString, "Invalid bytes read");
        t.done();
    });

    openStreamWithWSuccess = t.step_func(function (fs) {
        retVal = fs.writeBytes(testString);
        assert_equals(retVal, undefined, "incorrect returned value from writeBytes()");
        fs.close();
        file.openStream("r", openStreamWithRSuccess, openStreamError);
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamWithWSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_writeBytes_byteData_TypeMismatch() {
//==== TEST: FileStream_writeBytes_byteData_TypeMismatch
//==== LABEL Check if FileStream::writeBytes() throws exception for wrong type of byteData
//==== PRIORITY: P2
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:writeBytes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileStream_writeBytes_byteData_TypeMismatch'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError,
    file, conversionTable, bytes, i, exceptionName = "TypeMismatchError",
    fsTestFileName = getFileName("readBytesFiletest3.txt");

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        conversionTable = getTypeConversionExceptions("array", false);
        for (i = 0; i < conversionTable.length; i++) {
            bytes = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName}, function () {
                fs.writeBytes(bytes);
            }, exceptionName + " should be thrown - given incorrect byteData.");
        }
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_writeBytes_exist() {
//==== TEST: FileStream_writeBytes_exist
//==== LABEL Check if FileStream::writeBytes() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:writeBytes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('FileStream_writeBytes_exist'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file,
    fsTestFileName = getFileName("existFile09.txt");

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        assert_true("writeBytes" in fs, "writeBytes exists");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_writeBytes_missarg() {
//==== TEST: FileStream_writeBytes_missarg
//==== LABEL Check if FileStream::writeBytes() method throws exception for missing mandatory argument
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:writeBytes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

var t = async_test('FileStream_writeBytes_missarg'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file,
    expected = "TypeMismatchError",
    fsTestFileName = getFileName("readBytesFiletest2.txt");

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        assert_throws({name: expected}, function () {
            fs.writeBytes();
        }, expected + " exception should be thrown");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_writeBytes_with_additional_null_parameter() {

//==== TEST: FileStream_writeBytes_with_additional_null_parameter
//==== LABEL Check if FileStream::writeBytes() method properly writes the specified bytes to file
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:writeBytes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST
var t = async_test('FileStream_writeBytes_with_additional_null_parameter'),
    file, resolveSuccess, resolveError, openStreamWriteSuccess,
    openStreamError, openStreamReadSuccess, testString = [1, 2, 3, 4, 5, 6, 7],
    readString, fsTestFileName = getFileName("readBytesFileTestNull.txt");

t.step(function () {
    openStreamReadSuccess = t.step_func(function (stream) {
        readString = stream.readBytes(testString.length, null);
        stream.close();
        assert_type(readString, "array", "type read from file");
        assert_equals(readString.toString(), testString.toString(), "string read from file");
        t.done();
    });

    openStreamWriteSuccess = t.step_func(function (stream) {
        stream.writeBytes(testString, null);
        stream.close();
        file.openStream("r", openStreamReadSuccess, openStreamError, "UTF-8");
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamWriteSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve(TEST_ROOT_LOCATION, resolveSuccess, resolveError);
        }
    );
});

}

function FileStream_writeBytes_without_w_permission() {
//==== TEST: FileStream_writeBytes_without_w_permission
//==== LABEL Check if FileStream::writeBytes() throws exception when writing to a file opened in 'r' mode
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:writeBytes M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('FileStream_writeBytes_without_w_permission'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file,
    bytes = new Array(104, 101, 108), expected = "IOError",
    fsTestFileName = getFileName("writeBytesWOPerm.txt");

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        assert_throws({name: expected}, function () {
            fs.writeBytes(bytes);
        }, expected + " exception should be thrown");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("r", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_write_exist() {
//==== TEST: FileStream_write_exist
//==== LABEL Check if FileStream::write() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:write M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('FileStream_write_exist'),
    fsTestFileName = getFileName("existFile08.txt"),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file;

t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        assert_true("write" in fs, "write exists");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("rw", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStream_write_without_w_permission() {

//==== TEST: FileStream_write_without_w_permission
//==== LABEL Check if FileStream::write() throws exception when writing to a file opened in 'r' mode
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileStream:write M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('FileStream_write_without_w_permission'),
    fsTestFileName = getFileName("write09.txt"),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file,
    expected = "IOError";

t.step(function (){
    openStreamSuccess = t.step_func(function (fs) {
        assert_throws({name: expected}, function () {
            fs.write("test");
        }, expected + " exception should be thrown");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("r", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileStringSuccessCallback_notexist() {
//==== TEST: FileStringSuccessCallback_notexist
//==== LABEL Interface FileStringSuccessCallback should not be accessible
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileStringSuccessCallback:FileStringSuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("FileStringSuccessCallback");
}, 'FileStringSuccessCallback_notexist');

}

function FileStringSuccessCallback_onsuccess() {
//==== TEST: FileStringSuccessCallback_onsuccess
//==== LABEL Test whether FileStringSuccessCallback::onsuccess is called with valid argument
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileStringSuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBOA CBT
var t = async_test('FileStringSuccessCallback_onsuccess'), stringToWrite = "HelloWorld",
    resolveSuccess, resolveError, readAsTextSuccess, openStreamSuccess, file,
    fsTestFileName = getFileName("filesystem.txt");

t.step(function () {
    readAsTextSuccess = t.step_func(function (fileStr) {
        assert_type(fileStr, "string", "incorrect type of passed argument");
        assert_equals(fileStr, stringToWrite, "incorrect value of passed argument");
        t.done();
    });
    openStreamSuccess = t.step_func(function (fs) {
        fs.write(stringToWrite);
        fs.close();
        file.readAsText(readAsTextSuccess);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamSuccess);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function FileSuccessCallback_notexist() {
//==== TEST: FileSuccessCallback_notexist
//==== LABEL Interface FileSuccessCallback should not be accessible
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileSuccessCallback:FileSuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("FileSuccessCallback");
}, 'FileSuccessCallback_notexist');

}

function FileSuccessCallback_onsuccess() {

//==== TEST: FileSuccessCallback_onsuccess
//==== LABEL Test whether FileSuccessCallback::onsuccess is called with valid argument
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileSuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBOA CBT

var t = async_test('FileSuccessCallback_onsuccess'),
    resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_type(dir, "object", "incorrect received argument");
        checkOwnProperties(dir);
        assert_equals(dir.path, "images", "incorrect received File object");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("images", resolveSuccess, resolveError, "rw");
});

}

function FileSystemManagerObject_notexist() {

//==== TEST: FileSystemManagerObject_notexist
//==== LABEL Interface FileSystemManagerObject should not be accessible
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManagerObject:FileSystemManagerObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== PRIORITY P3
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("FileSystemManagerObject");
}, 'FileSystemManagerObject_notexist');

}

function FileSystemManager_addStorageStateChangeListener() {
//==== TEST: FileSystemManager_addStorageStateChangeListener
//==== LABEL Check if FileSystemManager::addStorageStateChangeListener() method can be called
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:addStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('FileSystemManager_addStorageStateChangeListener'),
    successCallback, retValue = null;
t.step(function () {
    successCallback = t.step_func(function (storages) {
        assert_type(retValue, "long", "addStorageStateChangeListener returns wrong value");

        t.done();
    });

    retValue = tizen.filesystem.addStorageStateChangeListener(successCallback);
});

}

function FileSystemManager_addStorageStateChangeListener_exist() {
//==== TEST: FileSystemManager_addStorageStateChangeListener_exist
//==== LABEL Check if FileSystemManager::addStorageStateChangeListener() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:addStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

test(function () {
    assert_true("addStorageStateChangeListener" in tizen.filesystem,
        "No addStorageStateChangeListener method in tizen.filesystem");
    check_method_exists(tizen.filesystem, "addStorageStateChangeListener");
}, 'FileSystemManager_addStorageStateChangeListener_exist');

}

function FileSystemManager_addStorageStateChangeListener_missarg() {
//==== TEST: FileSystemManager_addStorageStateChangeListener_missarg
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::addStorageStateChangeListener() method throws exception for missing mandatory argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:addStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.filesystem.addStorageStateChangeListener();
        }, "Method should throw an exception");
}, 'FileSystemManager_addStorageStateChangeListener_missarg');

}

function FileSystemManager_addStorageStateChangeListener_onerror_TypeMismatch() {
//==== TEST: FileSystemManager_addStorageStateChangeListener_onerror_TypeMismatch
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::addStorageStateChangeListener() throws exception for wrong type of onerror
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:addStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileSystemManager_addStorageStateChangeListener_onerror_TypeMismatch'), i,
    onSuccess, onError, exceptionName, conversionTable;
t.step(function () {
    onSuccess = t.step_func(function (storage) {
        assert_unreached("Shouldn't be invoked");
    });
    conversionTable = getTypeConversionExceptions("functionObject", true);
    for(i = 0; i < conversionTable.length; i++) {
        onError = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
        function () {
            tizen.filesystem.addStorageStateChangeListener(onSuccess, onError);
        }, exceptionName + " should be thrown - given incorrect errorCallback #"+ onError +"#");
    }
    t.done();
});

}

function FileSystemManager_addStorageStateChangeListener_onerror_invalid_cb() {
//==== TEST: FileSystemManager_addStorageStateChangeListener_onerror_invalid_cb
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::addStorageStateChangeListener() throws exception for wrong onerror
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:addStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('FileSystemManager_addStorageStateChangeListener_onerror_invalid_cb'),
    incorrectCallback, onSuccess;
t.step(function () {
    onSuccess = t.step_func(function (storage) {
        assert_unreached("onSuccess callback invoked");
    });
    incorrectCallback = {
        onerror: t.step_func(function (){
            assert_unreached("invalid callback invoked");
        })
    };
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.filesystem.addStorageStateChangeListener(onSuccess, incorrectCallback);
        }, "given incorrect errorCallback");
    t.done();
});

}

function FileSystemManager_addStorageStateChangeListener_onsuccess_TypeMismatch() {
//==== TEST: FileSystemManager_addStorageStateChangeListener_onsuccess_TypeMismatch
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::addStorageStateChangeListener() throws exception for wrong type of onsuccess
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:addStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileSystemManager_addStorageStateChangeListener_onsuccess_TypeMismatch'),
    i, onSuccess, exceptionName, conversionTable;
t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", false);
    for(i = 0; i < conversionTable.length; i++) {
        onSuccess = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.filesystem.addStorageStateChangeListener(onSuccess);
            }, exceptionName + " should be thrown - given incorrect onSuccess.");
    }
    t.done();
});

}

function FileSystemManager_addStorageStateChangeListener_onsuccess_invalid_cb() {
//==== TEST: FileSystemManager_addStorageStateChangeListener_onsuccess_invalid_cb
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::addStorageStateChangeListener() throws exception for wrong onsuccess
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:addStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('FileSystemManager_addStorageStateChangeListener_onsuccess_invalid_cb'),
    incorrectCallback;

t.step(function () {
    incorrectCallback = {
        onsuccess: t.step_func(function (){
            assert_unreached("Invalid callback invoked: ");
        })
    };
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.filesystem.addStorageStateChangeListener(incorrectCallback);
        }, "given incorrect error callback");
    t.done();
});

}

function FileSystemManager_addStorageStateChangeListener_with_onerror() {
//==== TEST: FileSystemManager_addStorageStateChangeListener_with_onerror
//==== PRIORITY P1
//==== LABEL Check if FileSystemManager::addStorageStateChangeListener() can be called with onerror
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:addStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('FileSystemManager_addStorageStateChangeListener_with_onerror'),
    onError, successCallback;
t.step(function (){
    onError = t.step_func(function (error) {
        assert_unreached("Error: " + error.message);
    });
    successCallback = t.step_func(function (storages) {
        t.done();
    });

    tizen.filesystem.addStorageStateChangeListener(successCallback, onError);
});

}

function FileSystemManager_addStorageStateChangeListener_without_arguments() {
//==== TEST: FileSystemManager_addStorageStateChangeListener_without_arguments
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::addStorageStateChangeListener() throws exception for missing mandatory argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:addStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.filesystem.addStorageStateChangeListener();
    });
}, 'FileSystemManager_addStorageStateChangeListener_without_arguments');

}

function FileSystemManager_extend() {
//==== TEST: FileSystemManager_extend
//==== PRIORITY P3
//==== LABEL Check if instance of FileSystemManager can be extended with new property
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:FileSystemManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA OBX

test(function () {
    check_extensibility(tizen.filesystem);
}, 'FileSystemManager_extend');

}

function FileSystemManager_getStorage() {
//==== TEST: FileSystemManager_getStorage
//==== PRIORITY P1
//==== LABEL Check if FileSystemManager::getStorage() calls onsuccess callback
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:getStorage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('FileSystemManager_getStorage'),
    onSuccess, onError, successCallback, retValue = null;
t.step(function () {
    onSuccess = t.step_func(function (storage) {
        assert_equals(retValue, undefined, "getStorage returns wrong value");
        t.done();
    });
    successCallback = t.step_func(function (storages) {
        assert_true(storages.length > 0, "list the available storages");
        retValue = tizen.filesystem.getStorage(storages[0].label, onSuccess);
    });
    onError = t.step_func(function (error) {
        assert_unreached("Error: " + error.message);
    });
    tizen.filesystem.listStorages(successCallback, onError);
});

}

function FileSystemManager_getStorage_exist() {
//==== TEST: FileSystemManager_getStorage_exist
//==== LABEL Check if FileSystemManager::getStorage() method exists
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:getStorage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

test(function () {
    assert_true("getStorage" in tizen.filesystem, "No getStorage method in tizen.filesystem");
    check_method_exists(tizen.filesystem, "getStorage");
}, 'FileSystemManager_getStorage_exist');

}

function FileSystemManager_getStorage_missarg() {
//==== TEST: FileSystemManager_getStorage_missarg
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::getStorage() throws exception for missing mandatory argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:getStorage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.filesystem.getStorage();
        }, "Method should throw an exception");
}, 'FileSystemManager_getStorage_missarg');

}

function FileSystemManager_getStorage_onerror_TypeMismatch() {
//==== TEST: FileSystemManager_getStorage_onerror_TypeMismatch
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::getStorage() throws exception for wrong type of onerror
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:getStorage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileSystemManager_getStorage_onerror_TypeMismatch'), i,
    getStorageSuccess, getStorageError, exceptionName,
    listStoragesSuccess, listStoragesError, conversionTable;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);
    getStorageSuccess = t.step_func(function (storage) {
        assert_unreached("getStorage success callback invoked.");
    });
    listStoragesSuccess = t.step_func(function (storages) {
        for(i = 0; i < conversionTable.length; i++) {
            getStorageError = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    tizen.filesystem.getStorage(storages[0].label, getStorageSuccess, getStorageError);
                }, exceptionName + " should be thrown - given incorrect errorCallback.");
        }
        t.done();
    });
    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
});

}

function FileSystemManager_getStorage_onerror_invalid_cb() {
//==== TEST: FileSystemManager_getStorage_onerror_invalid_cb
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::getStorage() throws exception for wrong onerror
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:getStorage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('FileSystemManager_getStorage_onerror_invalid_cb'),
    getStorageIncorrect, getStorageSuccess,
    listStoragesSuccess, listStoragesError;

t.step(function () {
    getStorageSuccess = t.step_func(function (storage) {
        assert_unreached("getStorage success callback invoked.");
    });
    getStorageIncorrect = {
        onerror: t.step_func(function (){
            assert_unreached("Invalid callback invoked: ");
        })
    };
    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });
    listStoragesSuccess = t.step_func(function (storages) {
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                tizen.filesystem.getStorage(storages[0].label, getStorageSuccess, getStorageIncorrect);
            }, "given incorrect errorCallback");
        t.done();
    });

    tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
});

}

function FileSystemManager_getStorage_onsuccess_TypeMismatch() {
//==== TEST: FileSystemManager_getStorage_onsuccess_TypeMismatch
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::getStorage() throws exception for wrong type of onsuccess
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:getStorage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileSystemManager_getStorage_onsuccess_TypeMismatch'), i,
    listStoragesSuccess, listStoragesError, exceptionName,
    getStorageSuccess, conversionTable;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", false);
    listStoragesSuccess = t.step_func(function (storages) {
        for(i = 0; i < conversionTable.length; i++) {
            getStorageSuccess = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    tizen.filesystem.getStorage(storages[0].label, getStorageSuccess);
                }, exceptionName + " should be thrown - given incorrect onSuccess.");
        }
        t.done();
    });
    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
});

}

function FileSystemManager_getStorage_onsuccess_invalid_cb() {
//==== TEST: FileSystemManager_getStorage_onsuccess_invalid_cb
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::getStorage() throws exception for wrong onsuccess
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:getStorage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('FileSystemManager_getStorage_onsuccess_invalid_cb'),
    getStorageIncorrect, listStoragesError,
    listStoragesSuccess;

t.step(function () {
    getStorageIncorrect = {
        onsuccess: t.step_func(function (){
            assert_unreached("Invalid callback invoked: ");
        })
    };

    listStoragesSuccess = t.step_func(function (storages) {
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                tizen.filesystem.getStorage(storages[0].label, getStorageIncorrect);
            }, "given incorrect error callback");
        t.done();
    });
    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
});

}

function FileSystemManager_getStorage_with_nonexist_label() {
//==== TEST: FileSystemManager_getStorage_with_nonexist_label
//==== LABEL Check if FileSystemManager::getStorage() throws an exception when storage with given label does not exist
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:getStorage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var t = async_test('FileSystemManager_getStorage_with_nonexist_label'),
    onSuccess, onError, expected = "NotFoundError";

t.step(function (){
    onSuccess = t.step_func(function (storages) {
        assert_unreached("should throw an exception");
    });

    onError = t.step_func(function (error) {
        assert_equals(error.name, expected, "should throw an exception");
        t.done();
    });

    tizen.filesystem.getStorage("MMC", onSuccess, onError);
});

}

function FileSystemManager_getStorage_with_onerror() {
//==== TEST: FileSystemManager_getStorage_with_onerror
//==== PRIORITY P1
//==== LABEL Check if FileSystemManager::getStorage() can be called with onerror callback
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:getStorage M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('FileSystemManager_getStorage_with_onerror'),
    getStorageSuccess, getStorageError, listStoragesSuccess, listStoragesError;
t.step(function (){
    getStorageSuccess = t.step_func(function (storage) {
        t.done();
    });
    getStorageError = t.step_func(function (error) {
        assert_unreached("getStorage() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    listStoragesSuccess = t.step_func(function (storages) {
        assert_true(storages.length > 0, "list the available storages");
        tizen.filesystem.getStorage(storages[0].label, getStorageSuccess, getStorageError);
    });
    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
});

}

function FileSystemManager_in_tizen() {

//==== TEST: FileSystemManager_in_tizen
//==== LABEL Check if tizen namespace contains filesystem
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:FileSystemManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA OBME

test(function () {
    assert_true("filesystem" in tizen, "No FileSystemManager in tizen.");
    check_readonly(tizen, "filesystem", tizen.filesystem, "object", "dummyValue");
}, 'FileSystemManager_in_tizen');

}

function FileSystemManager_listStorages() {
//==== TEST: FileSystemManager_listStorages
//==== PRIORITY P1
//==== LABEL Check if FileSystemManager::listStorages() method works
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('FileSystemManager_listStorages'),
    onSuccess, retValue = null;
t.step(function () {
    onSuccess = t.step_func(function (storages) {
        assert_true(storages.length > 0, "list the available storages");
        assert_equals(retValue, undefined, "listStorages returns wrong value");

        t.done();
    });

    retValue = tizen.filesystem.listStorages(onSuccess);
});

}

function FileSystemManager_listStorages_exist() {
//==== TEST: FileSystemManager_listStorages_exist
//==== LABEL Check if FileSystemManager::listStorages() method exists
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

test(function () {
    assert_true("listStorages" in tizen.filesystem, "No listStorages method in tizen.filesystem");
    check_method_exists(tizen.filesystem, "listStorages");
}, 'FileSystemManager_listStorages_exist');

}

function FileSystemManager_listStorages_missarg() {
//==== TEST: FileSystemManager_listStorages_missarg
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::listStorages() throws exception for missing mandatory argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.filesystem.listStorages();
        }, "Method should throw an exception");
}, 'FileSystemManager_listStorages_missarg');

}

function FileSystemManager_listStorages_onerror_TypeMismatch() {
//==== TEST: FileSystemManager_listStorages_onerror_TypeMismatch
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::listStorages() method throws exception for wrong type of onerror
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileSystemManager_listStorages_onerror_TypeMismatch'), i,
    listStoragesSuccess, exceptionName, listStoragesSuccess, listStoragesError,
    conversionTable;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    listStoragesSuccess = t.step_func(function (storages) {
        assert_unreached("listStorages() success callback should not be invoked");
    });
    for(i = 0; i < conversionTable.length; i++) {
        listStoragesError = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
            }, exceptionName + " should be thrown - given incorrect errorCallback.");
    }
    t.done();
});

}

function FileSystemManager_listStorages_onerror_invalid_cb() {
//==== TEST: FileSystemManager_listStorages_onerror_invalid_cb
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::listStorages() method throws exception for wrong onerror
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('FileSystemManager_listStorages_onerror_invalid_cb'),
    listStoragesIncorrect, listStoragesSuccess;

t.step(function () {

    listStoragesSuccess = t.step_func(function (storages) {
        assert_unreached("this function should not be invoked");
    });

    listStoragesIncorrect = {
        onerror: t.step_func(function (){
            assert_unreached("Invalid callback invoked: ");
        })
    };
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.filesystem.listStorages(listStoragesSuccess, listStoragesIncorrect);
        }, "given incorrect errorCallback");
    t.done();
});

}

function FileSystemManager_listStorages_onsuccess_TypeMismatch() {
//==== TEST: FileSystemManager_listStorages_onsuccess_TypeMismatch
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::listStorages() method throws exception for wrong type of onsuccess
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileSystemManager_listStorages_onsuccess_TypeMismatch'), i,
    exceptionName, listStoragesSuccess, listStoragesError, conversionTable;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", false);

    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    for(i = 0; i < conversionTable.length; i++) {
        listStoragesSuccess = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
            }, exceptionName + " should be thrown - given incorrect onSuccess callback.");
    }
    t.done();
});

}

function FileSystemManager_listStorages_onsuccess_invalid_cb() {
//==== TEST: FileSystemManager_listStorages_onsuccess_invalid_cb
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::listStorages() method throws exception for wrong onsuccess
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('FileSystemManager_listStorages_onsuccess_invalid_cb'),
    listStoragesIncorrect;

t.step(function () {

    listStoragesIncorrect = {
        onsuccess: t.step_func(function (){
            assert_unreached("Invalid callback invoked: ");
        })
    };
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.filesystem.listStorages(listStoragesIncorrect);
        }, "given incorrect error callback");
    t.done();
});

}

function FileSystemManager_listStorages_storages_retrieve() {

//==== TEST: FileSystemManager_listStorages_storages_retrieve
//==== LABEL Check if FileSystemManager::listStorages() method properly retrieves the available storages on the device
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA
var t = async_test('FileSystemManager_listStorages_storages_retrieve'),
    onSuccess, onError, labels;

t.step(function () {
    onSuccess = t.step_func(function (storages) {
        labels = storages.map(function (item) {
            return item.label;
        });
        assert_true(labels.indexOf("documents") > -1, "includes 'documents'");
        assert_true(labels.indexOf("images") > -1, "includes 'images'");
        assert_true(labels.indexOf("music") > -1, "includes 'music'");
        assert_true(labels.indexOf("videos") > -1, "includes 'videos'");
        assert_true(labels.indexOf("downloads") > -1, "includes 'downloads'");
        assert_true(labels.indexOf("wgt-package") > -1, "includes 'wgt-package'");
        assert_true(labels.indexOf("wgt-private") > -1, "includes 'wgt-private'");
        assert_true(labels.indexOf("wgt-private-tmp") > -1, "includes 'wgt-private-tmp'");

        t.done();
    });
    onError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });
    tizen.filesystem.listStorages(onSuccess, onError);
});

}

function FileSystemManager_listStorages_with_invalid_error_callbacks() {

//==== TEST: FileSystemManager_listStorages_with_invalid_error_callbacks
//==== LABEL Check if FileSystemManager::listStorages() method throws exception for wrong type of onerror (literals)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC
var t = async_test('FileSystemManager_listStorages_with_invalid_error_callbacks'),
    invalidTypeParams = [123, "abc", true, {}], getStorageSuccess, i;
t.step(function () {
    getStorageSuccess = t.step_func(function (storages) {
        assert_unreached("Unexpected getStorageSuccess");
    });

    for (i = 0; i < invalidTypeParams.length; i++) {
        assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
            tizen.filesystem.listStorages(
                getStorageSuccess,
                invalidTypeParams[i]
            );
        });
    }
    t.done();
});

}

function FileSystemManager_listStorages_with_onerror() {

//==== TEST: FileSystemManager_listStorages_with_onerror
//==== PRIORITY P1
//==== LABEL Check if FileSystemManager::listStorages() can be called with onerror argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA MR

var t = async_test('FileSystemManager_listStorages_with_onerror'),
    listStoragesSuccess, listStoragesError, retValue = null;

t.step(function () {

    listStoragesSuccess = t.step_func(function (storages) {
        assert_type(storages, "array", "incorrect type of the received argument");
        assert_true(storages.length > 0, "incorrect received argument");
        assert_equals(retValue, undefined, "listStorages returns wrong value");
        t.done();
    });

    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    retValue = tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
});

}

function FileSystemManager_listStorages_without_arguments() {
//==== TEST: FileSystemManager_listStorages_without_arguments
//==== LABEL Check if FileSystemManager::listStorages() method throws exception for missing mandatory argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.filesystem.listStorages();
    });
}, 'FileSystemManager_listStorages_without_arguments');

}

function FileSystemManager_listStorages_works_correctly() {

//==== TEST: FileSystemManager_listStorages_works_correctly
//==== LABEL Check if FileSystemManager::listStorages() method invokes onsuccess callback
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:listStorages M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA
var t = async_test('FileSystemManager_listStorages_works_correctly'),
    listStoragesSuccess, listStoragesError;

t.step(function () {
    listStoragesSuccess = t.step_func(function (storages) {
        assert_type(storages, "array", "storages");
        assert_true(storages.length > 0, "storages.length > 0");
        t.done();
    });
    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
});

}

function FileSystemManager_maxPathLength_attribute() {

//==== TEST: FileSystemManager_maxPathLength_attribute
//==== PRIORITY P1
//==== LABEL Check if FileSystemManager::maxPathLength attribute exists
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:maxPathLength A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

test(function () {
    var maxLength = tizen.filesystem.maxPathLength;
    assert_true("maxPathLength" in tizen.filesystem, "attribute doesn't exist");
    check_readonly(tizen.filesystem, "maxPathLength", maxLength, "long", maxLength - 5);
}, 'FileSystemManager_maxPathLength_attribute');

}

function FileSystemManager_notexist() {
//==== TEST: FileSystemManager_notexist
//==== PRIORITY P3
//==== LABEL Interface FileSystemManager should not be accessible
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:FileSystemManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA NIO

test(function () {
    check_no_interface_object("FileSystemManager");
}, 'FileSystemManager_notexist');

}

function FileSystemManager_removeStorageStateChangeListener() {
//==== TEST: FileSystemManager_removeStorageStateChangeListener
//==== LABEL Check if FileSystemManager::removeStorageStateChangeListener() method works with only mandatory arguments
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:removeStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('FileSystemManager_removeStorageStateChangeListener'),
    successCallback, watch, retValue = null;

t.step(function () {
    successCallback = t.step_func(function (storages) {
        retValue = tizen.filesystem.removeStorageStateChangeListener(watch);
        assert_equals(retValue, undefined, "removeStorageStateChangeListener returns wrong value");

        t.done();
    });

    watch = tizen.filesystem.addStorageStateChangeListener(successCallback);
});

}

function FileSystemManager_removeStorageStateChangeListener_exist() {
//==== TEST: FileSystemManager_removeStorageStateChangeListener_exist
//==== LABEL Check if FileSystemManager::removeStorageStateChangeListener() method exists
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:removeStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

test(function () {
    assert_true("removeStorageStateChangeListener" in tizen.filesystem,
        "No removeStorageStateChangeListener method in tizen.filesystem");
    check_method_exists(tizen.filesystem,
        "removeStorageStateChangeListener");
}, 'FileSystemManager_removeStorageStateChangeListener_exist');

}

function FileSystemManager_removeStorageStateChangeListener_with_para_invalid() {
//==== TEST: FileSystemManager_removeStorageStateChangeListener_with_para_invalid
//==== LABEL Check if FileSystemManager::removeStorageStateChangeListener() method throws NotFoundError when given invalid watchId
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:removeStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

test(function () {
    var watchID;
    assert_throws(NOT_FOUND_EXCEPTION, function () {
        tizen.filesystem.removeStorageStateChangeListener(watchID);
    });
}, 'FileSystemManager_removeStorageStateChangeListener_with_para_invalid');

}

function FileSystemManager_removeStorageStateChangeListener_works_correctly() {

//==== TEST: FileSystemManager_removeStorageStateChangeListener_works_correctly
//==== LABEL Check if FileSystemManager::removeStorageStateChangeListener() method can be called with valid watchId
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:removeStorageStateChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA
test(function () {
    var watchId;

    watchId = tizen.filesystem.addStorageStateChangeListener(function (storage) {});
    tizen.filesystem.removeStorageStateChangeListener(watchId);

}, 'FileSystemManager_removeStorageStateChangeListener_works_correctly');

}

function FileSystemManager_resolve() {

//==== TEST: FileSystemManager_resolve
//==== PRIORITY P1
//==== LABEL Check if FileSystemManager::resolve() method can be called with only mandatory argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('FileSystemManager_resolve'),
    resolveSuccess, retValue = null;
t.step(function () {
    resolveSuccess = t.step_func(function (storage) {
        assert_not_equals(storage, null, "Null check");
        assert_equals(retValue, undefined, "resolve returns wrong value");

        t.done();
    });

    retValue = tizen.filesystem.resolve("documents", resolveSuccess);
});

}

function FileSystemManager_resolve_documents() {
//==== TEST: FileSystemManager_resolve_documents
//==== LABEL Check if FileSystemManager::resolve() method works for Documents virtual root
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, expected = "documents",
    t = async_test('FileSystemManager_resolve_documents');

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path, expected, "resolve documents to a file handle");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function FileSystemManager_resolve_downloads() {
//==== TEST: FileSystemManager_resolve_downloads
//==== LABEL Check if FileSystemManager::resolve() method works for Downloads virtual root
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, expected = "downloads",
    t = async_test('FileSystemManager_resolve_downloads');

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path , expected, "resolve downloads to a file handle");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("downloads", resolveSuccess, resolveError, "rw");
});

}

function FileSystemManager_resolve_error_invoked() {

//==== TEST: FileSystemManager_resolve_error_invoked
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::resolve() method reports NotFoundError by onerror for wrong value of location argument (absolute)
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA MERRCB

var t = async_test('FileSystemManager_resolve_error_invoked'),
    resolveSuccess, resolveError;
t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_unreached("this function shouldn't be invoked");
    });
    resolveError = t.step_func(function (error) {
        assert_equals(error.name, "NotFoundError", "incorrect error was thrown");
        t.done();
    });

    tizen.filesystem.resolve("/opt", resolveSuccess, resolveError);
});

}

function FileSystemManager_resolve_exist() {

//==== TEST: FileSystemManager_resolve_exist
//==== PRIORITY P0
//==== LABEL Check if FileSystemManager::resolve() method exists
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

test(function () {
    assert_true("resolve" in tizen.filesystem, "FileSystemManager has resolve method");
    check_method_exists(tizen.filesystem, "resolve");
}, 'FileSystemManager_resolve_exist');

}

function FileSystemManager_resolve_images() {

//==== TEST: FileSystemManager_resolve_images
//==== LABEL Check if FileSystemManager::resolve() method works for Images virtual root
//==== SPEC: Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var resolveSuccess, resolveError, expected = "images",
    t = async_test('FileSystemManager_resolve_images');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path, expected, "resolve images to a file handle");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("images", resolveSuccess, resolveError, "rw");
});

}

function FileSystemManager_resolve_missarg() {

//==== TEST: FileSystemManager_resolve_missarg
//==== LABEL Check if FileSystemManager::resolve() throws exception for missing mandatory argument
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.filesystem.resolve();
    }, "Method should throw an exception");
}, 'FileSystemManager_resolve_missarg');

}

function FileSystemManager_resolve_mode_TypeMismatch() {

//==== TEST: FileSystemManager_resolve_mode_TypeMismatch
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::resolve() method throws exception for wrong value of mode argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileSystemManager_resolve_mode_TypeMismatch'),
    conversionTable, resolveSuccess, resolveError, mode, exceptionName, i;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_unreached("resolveSuccess was invoked");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    conversionTable = getTypeConversionExceptions("enum", true);
    for (i = 0; i < conversionTable.length; i++) {
        mode = conversionTable[i][0];
        //mode is nullable parameter so null should not throw (skip this case
        if (mode === null){
            continue;
        }
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.filesystem.resolve("images", resolveSuccess, resolveError, mode);
            }, exceptionName + " should be thrown - given incorrect errorCallback.");
    }
    t.done();
});

}

function FileSystemManager_resolve_mode_a() {
//==== TEST: FileSystemManager_resolve_mode_a
//==== LABEL Check if FileSystemManager::resolve() method works for Documents virtual root and mode 'a'
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, expected = "documents",
    t = async_test('FileSystemManager_resolve_mode_a');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path, expected, "resolve a location with 'a' mode");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "a");
});

}

function FileSystemManager_resolve_mode_r() {
//==== TEST: FileSystemManager_resolve_mode_r
//==== LABEL Check if FileSystemManager::resolve() method works for Documents virtual root and mode 'r'
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, expected = "documents",
    t = async_test('FileSystemManager_resolve_mode_r');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path , expected, "resolve a location with an mode r");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "r");
});

}

function FileSystemManager_resolve_mode_w() {
//==== TEST: FileSystemManager_resolve_mode_w
//==== LABEL Check if FileSystemManager::resolve() method works for Documents virtual root and mode 'w'
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, expected = "documents",
    t = async_test('FileSystemManager_resolve_mode_w');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path , expected, "resolve a location with an mode w");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "w");
});

}

function FileSystemManager_resolve_music() {
//==== TEST: FileSystemManager_resolve_music
//==== LABEL Check if FileSystemManager::resolve() method works for Music virtual root
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, expected = "music",
    t = async_test('FileSystemManager_resolve_music');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path , expected, "resolve music to a file handle");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("music", resolveSuccess, resolveError, "rw");
});

}

function FileSystemManager_resolve_onerror_TypeMismatch() {

//==== TEST: FileSystemManager_resolve_onerror_TypeMismatch
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::resolve() method throws exception for wrong type of onerror
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileSystemManager_resolve_onerror_TypeMismatch'), i,
    resolveSuccess, resolveError, exceptionName, conversionTable;
t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    resolveSuccess = t.step_func(function (dir) {
        assert_unreached("this function shouldn't be invoked");
    });

    for(i = 0; i < conversionTable.length; i++) {
        resolveError = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.filesystem.resolve("images", resolveSuccess, resolveError);
            }, exceptionName + " should be thrown - given incorrect errorCallback.");
    }
    t.done();
});

}

function FileSystemManager_resolve_onerror_invalid_cb() {

//==== TEST: FileSystemManager_resolve_onerror_invalid_cb
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::resolve() method throws exception for wrong onerror
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('FileSystemManager_resolve_onerror_invalid_cb'),
    resolveError, resolveSuccess, conversionTable;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);
    resolveSuccess = t.step_func(function (storage) {
    });
    resolveError = {
        onerror: t.step_func(function (){
            assert_unreached("Invalid callback invoked: ");
        })
    };
    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.filesystem.resolve("images", resolveSuccess, resolveError, "rw");
        }, "given incorrect errorCallback");
    t.done();
});

}

function FileSystemManager_resolve_onsuccess_TypeMismatch() {

//==== TEST: FileSystemManager_resolve_onsuccess_TypeMismatch
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::resolve() method throws exception for wrong type of onsuccess
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('FileSystemManager_resolve_onsuccess_TypeMismatch'), i,
    resolveSuccess, resolveError, exceptionName, conversionTable;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", false);

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    for (i = 0; i < conversionTable.length; i++) {
        resolveSuccess = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.filesystem.resolve("documents", resolveSuccess, resolveError);
            }, exceptionName + " should be thrown - given incorrect onSuccess.");
    }
    t.done();
});

}

function FileSystemManager_resolve_onsuccess_invalid_cb() {

//==== TEST: FileSystemManager_resolve_onsuccess_invalid_cb
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::resolve() method throws exception for wrong onsuccess
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('FileSystemManager_resolve_onsuccess_invalid_cb'),
    resolveSuccess, resolveError;

t.step(function () {

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = {
        onsuccess: t.step_func(function (){
            assert_unreached("Invalid callback invoked: ");
        })
    };

    assert_throws(TYPE_MISMATCH_EXCEPTION,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError);
        }, "given incorrect error callback");
    t.done();
});

}

function FileSystemManager_resolve_ringtones() {

//==== TEST: FileSystemManager_resolve_ringtones
//==== LABEL Check if FileSystemManager::resolve() method works for Ringtones virtual root
//==== SPEC: Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var resolveSuccess, resolveError, expected = "ringtones",
    t = async_test('FileSystemManager_resolve_ringtones');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path, expected, "resolve ringtones to a file handle");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("ringtones", resolveSuccess, resolveError, "r");
});

}

function FileSystemManager_resolve_ringtones_invalid_mode_a() {
//==== TEST: FileSystemManager_resolve_ringtones_invalid_mode_a
//==== LABEL Check if FileSystemManager::resolve() method reports InvalidValuesError when resolving Ringtones directory with mode 'a'
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var resolveSuccess, resolveError,
    t = async_test('FileSystemManager_resolve_ringtones_invalid_mode_a');

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_unreached("this function shouldn't be invoked");
    });

    resolveError = t.step_func(function (error) {
        assert_equals(error.name, "InvalidValuesError", "error.name");
        t.done();
    });

    tizen.filesystem.resolve("ringtones", resolveSuccess, resolveError, "a");

});

}

function FileSystemManager_resolve_ringtones_invalid_mode_rw() {
//==== TEST: FileSystemManager_resolve_ringtones_invalid_mode_rw
//==== LABEL Check if FileSystemManager::resolve() method reports InvalidValuesError when resolving Ringtones directory with mode 'rw'
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var resolveSuccess, resolveError,
    t = async_test('FileSystemManager_resolve_ringtones_invalid_mode_rw');

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_unreached("this function shouldn't be invoked");
    });

    resolveError = t.step_func(function (error) {
        assert_equals(error.name, "InvalidValuesError", "error.name");
        t.done();
    });

    tizen.filesystem.resolve("ringtones", resolveSuccess, resolveError, "rw");

});

}

function FileSystemManager_resolve_ringtones_invalid_mode_w() {
//==== TEST: FileSystemManager_resolve_ringtones_invalid_mode_w
//==== LABEL Check if FileSystemManager::resolve() method reports InvalidValuesError when resolving Ringtones directory with mode 'w'
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var resolveSuccess, resolveError,
    t = async_test('FileSystemManager_resolve_ringtones_invalid_mode_w');

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_unreached("this function shouldn't be invoked");
    });

    resolveError = t.step_func(function (error) {
        assert_equals(error.name, "InvalidValuesError", "error.name");
        t.done();
    });

    tizen.filesystem.resolve("ringtones", resolveSuccess, resolveError, "w");

});

}

function FileSystemManager_resolve_videos() {
//==== TEST: FileSystemManager_resolve_videos
//==== LABEL Check if FileSystemManager::resolve() method works for Videos virtual root
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var expected = "videos", resolveSuccess, resolveError,
    t = async_test('FileSystemManager_resolve_videos');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path , expected, "resolve videos to a file handle");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("videos", resolveSuccess, resolveError, "rw");
});

}

function FileSystemManager_resolve_wgt_package_invalid_mode_a() {
//==== TEST: FileSystemManager_resolve_wgt-package_invalid_mode_a
//==== LABEL Check if FileSystemManager::resolve() method reports InvalidValuesError when resolving 'wgt-package' directory with mode 'a'
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var resolveSuccess, resolveError,
    t = async_test('FileSystemManager_resolve_wgt_package_invalid_mode_a');

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_unreached("this function shouldn't be invoked");
    });

    resolveError = t.step_func(function (error) {
        assert_equals(error.name, "InvalidValuesError", "error.name");
        t.done();
    });

    tizen.filesystem.resolve("wgt-package", resolveSuccess, resolveError, "a");

});

}

function FileSystemManager_resolve_wgt_package_invalid_mode_rw() {
//==== TEST: FileSystemManager_resolve_wgt-package_invalid_mode_rw
//==== LABEL Check if FileSystemManager::resolve() method reports InvalidValuesError when resolving 'wgt-package' directory with mode 'rw'
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var resolveSuccess, resolveError,
    t = async_test('FileSystemManager_resolve_wgt_package_invalid_mode_rw');

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_unreached("this function shouldn't be invoked");
    });

    resolveError = t.step_func(function (error) {
        assert_equals(error.name, "InvalidValuesError", "error.name");
        t.done();
    });

    tizen.filesystem.resolve("wgt-package", resolveSuccess, resolveError, "rw");

});

}

function FileSystemManager_resolve_wgt_package_invalid_mode_w() {
//==== TEST: FileSystemManager_resolve_wgt-package_invalid_mode_w
//==== LABEL Check if FileSystemManager::resolve() method reports InvalidValuesError when resolving 'wgt-package' directory with mode 'w'
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var resolveSuccess, resolveError,
    t = async_test('FileSystemManager_resolve_wgt_package_invalid_mode_w');

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_unreached("this function shouldn't be invoked");
    });

    resolveError = t.step_func(function (error) {
        assert_equals(error.name, "InvalidValuesError", "error.name");
        t.done();
    });

    tizen.filesystem.resolve("wgt-package", resolveSuccess, resolveError, "w");

});

}

function FileSystemManager_resolve_wgt_package() {

//==== TEST: FileSystemManager_resolve_wgt_package
//==== LABEL Check if FileSystemManager::resolve() method works for 'wgt-package' virtual root
//==== SPEC: Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var resolveSuccess, resolveError, expected = "wgt-package",
    t = async_test('FileSystemManager_resolve_wgt_package');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path, expected, "resolve wgt-package to a file handle");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("wgt-package", resolveSuccess, resolveError, "r");
});

}

function FileSystemManager_resolve_wgt_private() {

//==== TEST: FileSystemManager_resolve_wgt_private
//==== LABEL Check if FileSystemManager::resolve() method works for 'wgt-private' virtual root
//==== SPEC: Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var resolveSuccess, resolveError, expected = "wgt-private",
    t = async_test('FileSystemManager_resolve_wgt_private');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path, expected, "resolve wgt-private to a file handle");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("wgt-private", resolveSuccess, resolveError, "rw");
});

}

function FileSystemManager_resolve_wgt_private_tmp() {

//==== TEST: FileSystemManager_resolve_wgt_private_tmp
//==== LABEL Check if FileSystemManager::resolve() method works for 'wgt-private-tmp' virtual root
//==== SPEC: Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var resolveSuccess, resolveError, expected = "wgt-private-tmp",
    t = async_test('FileSystemManager_resolve_wgt_private_tmp');

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_equals(dir.path, expected, "resolve wgt-private-tmp to a file handle");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("wgt-private-tmp", resolveSuccess, resolveError, "rw");
});

}

function FileSystemManager_resolve_with_mode() {

//==== TEST: FileSystemManager_resolve_with_mode
//==== PRIORITY P1
//==== LABEL Check if FileSystemManager::resolve() method works for Images virtual root with mode 'rw'
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('FileSystemManager_resolve_with_mode'),
    resolveSuccess, resolveError, expected;
t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        expected="images";
        assert_equals(dir.path, expected, "resolve a location to a file handle");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("images", resolveSuccess, resolveError, "rw");
});

}

function FileSystemManager_resolve_with_onerror() {

//==== TEST: FileSystemManager_resolve_with_onerror
//==== PRIORITY P2
//==== LABEL Check if FileSystemManager::resolve() method can be called with onerror argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('FileSystemManager_resolve_with_onerror'),
    resolveSuccess, resolveError;
t.step(function (){
    resolveSuccess = t.step_func(function (storage) {
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("images", resolveSuccess, resolveError);
});

}

function FileSystemManager_resolve_works_correctly() {

//==== TEST: FileSystemManager_resolve_works_correctly
//==== LABEL Check if FileSystemManager::resolve() method works for Documents and onsuccess is invoked with proper argument
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemManager:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('FileSystemManager_resolve_works_correctly'),
    resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_true("parent" in dir, "parent don't exist in object");
        assert_type(dir.parent, "null", "parent should be null");
        assert_true("readOnly" in dir, "readOnly don't exist in object");
        assert_false(dir.readOnly, "value of readOnly should be equal to false");
        assert_true("isDirectory" in dir, "isDirectory don't exist in object");
        assert_true(dir.isDirectory, "value of isDirectory should be equal to true");
        assert_true("isFile" in dir, "isFile don't exist in object");
        assert_false(dir.isFile, "value of isFile should be equal to true");
        assert_true("created" in dir, "created don't exist in object");
        assert_true("modified" in dir, "modified don't exist in object");
        assert_true("name" in dir, "name don't exist in object");
        assert_equals(dir.name, "", "value of name should be equal to empty string");
        assert_true("path" in dir, "path don't exist in object");
        assert_equals(dir.path, "documents", "value of path should be equal to string 'documents'");
        assert_true("fullPath" in dir, "fullPath don't exist in object");
        assert_equals(dir.fullPath, "documents", "value of fullPath should be equal to string 'documents'");
        assert_true("fileSize" in dir, "fileSize don't exist in object");
        assert_type(dir.fileSize, "undefined", "fileSize should be undefined");
        assert_true("length" in dir, "length don't exist in object");
        assert_type(dir.length, "long", "type of length should be number");
        assert_true(dir.length >= 0, "value of length should be >= 0");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError);
});

}

function FileSystemStorageArraySuccessCallback_notexist() {
//==== TEST: FileSystemStorageArraySuccessCallback_notexist
//==== LABEL Interface FileSystemStorageArraySuccessCallback should not be accessible
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemStorageArraySuccessCallback:FileSystemStorageArraySuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("FileSystemStorageArraySuccessCallback");
}, 'FileSystemStorageArraySuccessCallback_notexist');

}

function FileSystemStorageArraySuccessCallback_onsuccess() {

//==== TEST: FileSystemStorageArraySuccessCallback_onsuccess
//==== LABEL Test whether FileSystemStorageArraySuccessCallback::onsuccess is called with valid argument
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemStorageArraySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBOA CBT

var t = async_test('FileSystemStorageArraySuccessCallback_onsuccess'),
    listStoragesSuccess, listStoragesError, i;
t.step(function () {
    listStoragesSuccess = t.step_func(function (storages) {
        assert_type(storages, "Array", "wrong argument");
        assert_true(storages.length > 0, "no available storage");
        for (i = 0; i < storages.length; i++) {
            assert_type(storages[i], "object", "wrong element of the argument");
            assert_true("label" in storages[i], "label don't exist in object");
            assert_true("type" in storages[i], "type don't exist in object");
            assert_true("state" in storages[i], "state don't exist in object");
        }
        t.done();
    });
    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
});

}

function FileSystemStorageSuccessCallback_notexist() {
//==== TEST: FileSystemStorageSuccessCallback_notexist
//==== LABEL Interface FileSystemStorageSuccessCallback should not be accessible
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemStorageSuccessCallback:FileSystemStorageSuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("FileSystemStorageSuccessCallback");
}, 'FileSystemStorageSuccessCallback_notexist');

}

function FileSystemStorageSuccessCallback_onsuccess() {

//==== TEST: FileSystemStorageSuccessCallback_onsuccess
//==== LABEL Test whether FileSystemStorageSuccessCallback::onsuccess is called with valid argument
//==== PRIORITY: P1
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemStorageSuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBOA CBT

var t = async_test('FileSystemStorageSuccessCallback_onsuccess'),
    listStoragesSuccess, listStoragesError, getStorageSuccess;

t.step(function () {
    getStorageSuccess = t.step_func(function (storage) {
        assert_type(storage, "object", "wrong argument");
        assert_true("label" in storage, "label don't exist in object");
        assert_true("type" in storage, "type don't exist in object");
        assert_true("state" in storage, "state don't exist in object");
        t.done();
    });

    listStoragesSuccess = t.step_func(function (storages) {
        tizen.filesystem.getStorage(storages[0].label, getStorageSuccess);
    });

    listStoragesError = t.step_func(function (error) {
        assert_unreached("listStorages() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.listStorages(listStoragesSuccess, listStoragesError);
});

}

function FileSystemStorage_extend() {

//==== TEST: FileSystemStorage_extend
//==== LABEL Check if instance of FileSystemStorage object can be extended with new attribute
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemStorage:FileSystemStorage U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA OBX

var t = async_test('FileSystemStorage_extend'), listStoragesSuccess;

t.step(function () {
    listStoragesSuccess = t.step_func(function (storages) {
        assert_true(storages.length > 0, "No available storage");
        check_extensibility(storages[0]);
        t.done();
    });

    tizen.filesystem.listStorages(listStoragesSuccess);
});

}

function FileSystemStorage_label_attribute() {

//==== TEST: FileSystemStorage_label_attribute
//==== LABEL Check if FileSystemStorage::label attribute exists, has type DOMString and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:FileSystemStorage:label A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('FileSystemStorage_label_attribute'), listStoragesSuccess;
t.step(function () {
    listStoragesSuccess = t.step_func(function (storages) {
        assert_true(storages.length > 0, "No available storage");
        assert_true("label" in storages[0], "label not in FileSystemStorage");
        check_readonly(storages[0], "label", storages[0].label, "string", storages[0].label + "dummyValue");
        t.done();
    });

    tizen.filesystem.listStorages(listStoragesSuccess);
});

}

function FileSystemStorage_notexist() {
//==== TEST: FileSystemStorage_notexist
//==== LABEL Interface FileSystemStorage should not be accessible
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:FileSystemStorage:FileSystemStorage U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("FileSystemStorage");
}, 'FileSystemStorage_notexist');

}

function FileSystemStorage_state_attribute() {

//==== TEST: FileSystemStorage_state_attribute
//==== LABEL Check if FileSystemStorage::state attribute exists, has type FileSystemStorageState and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:FileSystemStorage:state A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('FileSystemStorage_state_attribute'), listStoragesSuccess, valueToAssign;

t.step(function () {
    listStoragesSuccess = t.step_func(function (storages) {
        assert_true(storages.length > 0, "No available storage");
        assert_true("state" in storages[0], "state not in FileSystemStorage");
        assert_in_array(storages[0].state, ["MOUNTED", "REMOVED", "UNMOUNTABLE"], "incorrect value of state");
        if (storages[0].state === "MOUNTED") {
            valueToAssign = "REMOVED";
        } else if (storages[0].state === "REMOVED") {
            valueToAssign = "UNMOUNTABLE";
        } else {
            valueToAssign = "MOUNTED";
        }
        check_readonly(storages[0], "state", storages[0].state, "string", valueToAssign);
        t.done();
    });

    tizen.filesystem.listStorages(listStoragesSuccess);
});

}

function FileSystemStorage_type_attribute() {

//==== TEST: FileSystemStorage_type_attribute
//==== LABEL Check if FileSystemStorage::type attribute exists, has type FileSystemStorageType and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:FileSystemStorage:type A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('FileSystemStorage_type_attribute'), listStoragesSuccess, valueToAssign;

t.step(function () {
    listStoragesSuccess = t.step_func(function (storages) {
        assert_true(storages.length > 0, "No available storage");
        assert_true("type" in storages[0], "type not in FileSystemStorage");
        assert_in_array(storages[0].type, ["INTERNAL", "EXTERNAL"], "incorrect value of type");
        if (storages[0].type === "INTERNAL") {
            valueToAssign = "EXTERNAL";
        } else {
            valueToAssign = "INTERNAL";
        }
        check_readonly(storages[0], "type", storages[0].type, "string", valueToAssign);
        t.done();
    });

    tizen.filesystem.listStorages(listStoragesSuccess);
});

}

function File_copyTo() {
//==== TEST: File_copyTo
//==== LABEL Check if File::copyTo() method ends successfully (copy file from documents/ to images/)
//==== SPEC: Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA

var t = async_test('File_copyTo'), resolveSuccess, resolveError, fsTestFile, fsTestFileName;

t.step(function (){
    fsTestFileName =  getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        dir.copyTo(fsTestFile.fullPath, "images/" + fsTestFile.name, true);
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_copyTo_dir_overwrite_false() {
//==== TEST: File_copyTo_dir_overwrite_false
//==== LABEL Check if error callback is invoked when copy a directory to another location where directory of that name already exists (overwrite is false)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var resolveSuccess, resolveError, copySuccess, copyError, fsTestDir1, fsTestDirName1, fsTestSubDir1, fsTestSubDirName1,
    fsTestDir2, fsTestDirName2, fsTestSubDir2, expected = "IOError",
    t = async_test('File_copyTo_dir_overwrite_false');

t.step(function () {
    fsTestDirName1 = getDirName("filesystem1");
    fsTestSubDirName1 = getDirName("filesystem1sub");
    fsTestDirName2 = getDirName("filesystem2");

    copySuccess = t.step_func(function () {
        assert_unreached("copySuccess callback shouldn't be invoked");
    });

    copyError = t.step_func(function (error) {
        assert_equals(error.name, expected, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestSubDir1 = fsTestDir1.createDirectory(fsTestSubDirName1);
        fsTestDir2 = dir.createDirectory(fsTestDirName2);
        fsTestSubDir2 = fsTestDir2.createDirectory(fsTestSubDirName1);
        fsTestDir1.copyTo(fsTestSubDir1.fullPath, fsTestSubDir2.path, false, copySuccess, copyError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_dir_overwrite_true() {
//==== TEST: File_copyTo_dir_overwrite_true
//==== LABEL Check if you can copy a directory to another location where directory of that name already exists (overwrite is true)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, copySuccess, fsTestDir1, fsTestDirName1, fsTestSubDir1, fsTestSubDirName1,
    fsTestDir2, fsTestDirName2, fsTestSubDir2, copyError,
    t = async_test('File_copyTo_dir_overwrite_true');

t.step(function () {
    fsTestDirName1 = getDirName("filesystem1");
    fsTestSubDirName1 = getDirName("filesystem1sub");
    fsTestDirName2 = getDirName("filesystem2");

    copySuccess = t.step_func(function () {
        t.done();
    });

    copyError = t.step_func(function (error) {
        assert_unreached("copyTo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestSubDir1 = fsTestDir1.createDirectory(fsTestSubDirName1);
        fsTestDir2 = dir.createDirectory(fsTestDirName2);
        fsTestSubDir2 = fsTestDir2.createDirectory(fsTestSubDirName1);
        fsTestDir1.copyTo(fsTestSubDir1.fullPath, fsTestSubDir2.path, true, copySuccess, copyError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_dir_samedir_samename_overwrite_false() {
//==== TEST: File_copyTo_dir_samedir_samename_overwrite_false
//==== LABEL Check if error callback is invoked when copy directory dir1/subdir1 into dir1/ (overwrite is false)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var resolveSuccess, resolveError, copySuccess, copyError, fsTestDir1, fsTestDirName1, fsTestSubDir1,
    fsTestSubDirName1, expected = "IOError",
    t = async_test('File_copyTo_dir_samedir_samename_overwrite_false');

t.step(function () {
    fsTestDirName1 = getDirName("filesystem1");
    fsTestSubDirName1 = getDirName("filesystem1sub");

    copySuccess = t.step_func(function () {
        assert_unreached("copySuccess callback shouldn't be invoked");
    });

    copyError = t.step_func(function (error) {
        assert_equals(error.name, expected, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestSubDir1 = fsTestDir1.createDirectory(fsTestSubDirName1);
        fsTestDir1.copyTo(fsTestSubDir1.fullPath, fsTestSubDir1.path, false, copySuccess, copyError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_dir_samedir_samename_overwrite_true() {
//==== TEST: File_copyTo_dir_samedir_samename_overwrite_true
//==== LABEL Check if error callback is invoked when copy directory dir1/subdir1 into dir1/ (overwrite is true)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var resolveSuccess, resolveError, copySuccess, fsTestDir1, fsTestDirName1, fsTestSubDir1, fsTestSubDirName1,
    t = async_test('File_copyTo_dir_samedir_samename_overwrite_true'), copyError, expectedError = "IOError";

t.step(function () {
    fsTestDirName1 = getDirName("filesystem1");
    fsTestSubDirName1 = getDirName("filesystem1sub");

    copySuccess = t.step_func(function () {
        assert_unreached("copySuccess callback shouldn't be invoked");
    });

    copyError = t.step_func(function (error) {
        assert_equals(error.name, expectedError, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestSubDir1 = fsTestDir1.createDirectory(fsTestSubDirName1);
        fsTestDir1.copyTo(fsTestSubDir1.fullPath, fsTestSubDir1.path, true, copySuccess, copyError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_exist() {

//==== TEST: File_copyTo_exist
//==== LABEL Check if File::copyTo() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('File_copyTo_exist'), resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_true("copyTo" in dir, "method copyTo exists");
        check_method_exists(dir, "copyTo");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");

});

}

function File_copyTo_file_overwrite_false() {
//==== TEST: File_copyTo_file_overwrite_false
//==== LABEL Check if error callback is invoked when copy a file to another directory where a file of that name already exists (overwrite is false)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var t = async_test('File_copyTo_file_overwrite_false'), expected = "IOError",
    resolveSuccess, resolveError, copySuccess, copyError, fsTestFile, fsTestFileName, fsTestDir,
    fsTestDirName, fsTestSubDir1, fsTestSubDirName1, fsTestSubDir2, fsTestSubDirName2;

t.step(function () {
    fsTestDirName = getFileName("filesystem");
    fsTestSubDirName1 = getFileName("filesystem1sub");
    fsTestSubDirName2 = getFileName("filesystem2sub");
    fsTestFileName =  getFileName("filesystem.txt");

    copySuccess = t.step_func(function () {
        assert_unreached("copySuccess callback shouldn't be invoked");
    });

    copyError = t.step_func(function (error) {
        assert_equals(error.name, expected, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestSubDir1 = fsTestDir.createDirectory(fsTestSubDirName1);
        fsTestSubDir2 = fsTestDir.createDirectory(fsTestSubDirName2);
        fsTestFile = fsTestSubDir1.createFile(fsTestFileName);
        fsTestSubDir2.createFile(fsTestFileName);
        fsTestSubDir1.copyTo(fsTestFile.fullPath, fsTestSubDir2.fullPath, false, copySuccess, copyError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_file_overwrite_true() {
//==== TEST: File_copyTo_file_overwrite_true
//==== LABEL Check if you can copy a file to another directory where a file of that name already exists (overwrite is true)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('File_copyTo_file_overwrite_true'),
    resolveSuccess, resolveError, copySuccess, fsTestFile, fsTestFileName, fsTestDir, copyError,
    fsTestDirName, fsTestSubDir1, fsTestSubDirName1, fsTestSubDir2, fsTestSubDirName2;

t.step(function () {
    fsTestDirName = getFileName("filesystem");
    fsTestSubDirName1 = getFileName("filesystem1sub");
    fsTestSubDirName2 = getFileName("filesystem2sub");
    fsTestFileName =  getFileName("filesystem.txt");

    copySuccess = t.step_func(function () {
        t.done();
    });

    copyError = t.step_func(function (error) {
        assert_unreached("copyTo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestSubDir1 = fsTestDir.createDirectory(fsTestSubDirName1);
        fsTestSubDir2 = fsTestDir.createDirectory(fsTestSubDirName2);
        fsTestFile = fsTestSubDir1.createFile(fsTestFileName);
        fsTestSubDir2.createFile(fsTestFileName);
        fsTestSubDir1.copyTo(fsTestFile.fullPath, fsTestSubDir2.fullPath, true, copySuccess, copyError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_file_samedir_samename_overwrite_false() {
//==== TEST: File_copyTo_file_samedir_samename_overwrite_false
//==== LABEL Check if error callback is invoked when copy a file to the same location (overwrite is false)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var t = async_test('File_copyTo_file_samedir_samename_overwrite_false'), expectedError = "IOError",
    resolveSuccess, resolveError, copySuccess, copyError, fsTestFile, fsTestFileName, fsTestDir, fsTestDirName;

t.step(function () {
    fsTestDirName = getFileName("filesystem");
    fsTestFileName =  getFileName("filesystem.txt");

    copySuccess = t.step_func(function () {
        assert_unreached("copySuccess callback shouldn't be invoked");
    });

    copyError = t.step_func(function (error) {
        assert_equals(error.name, expectedError, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestFile = fsTestDir.createFile(fsTestFileName);
        fsTestDir.copyTo(fsTestFile.fullPath, fsTestFile.fullPath, false, copySuccess, copyError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_file_samedir_samename_overwrite_true() {
//==== TEST: File_copyTo_file_samedir_samename_overwrite_true
//==== LABEL Check if error callback is invoked when copy a file to the same location (overwrite is true)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var t = async_test('File_copyTo_file_samedir_samename_overwrite_true'), resolveSuccess, copyError,
    resolveError, copySuccess, fsTestFile, fsTestFileName, fsTestDir, fsTestDirName, expectedError = "IOError";

t.step(function () {
    fsTestDirName = getFileName("filesystem");
    fsTestFileName =  getFileName("filesystem.txt");

    copySuccess = t.step_func(function () {
        assert_unreached("copySuccess callback shouldn't be invoked");
    });

    copyError = t.step_func(function (error) {
        assert_equals(error.name, expectedError, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestFile = fsTestDir.createFile(fsTestFileName);
        fsTestDir.copyTo(fsTestFile.fullPath, fsTestFile.path, true, copySuccess, copyError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_onerror_TypeMismatch() {

//==== TEST: File_copyTo_onerror_TypeMismatch
//==== LABEL Check if File::copyTo() throws exception when type of errorCallback is wrong
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_copyTo_onerror_TypeMismatch'),
    resolveSuccess, resolveError, conversionTable, copyError, i, copySuccess, fsTestFileName,
    exceptionName = "TypeMismatchError";

t.step(function () {
    fsTestFileName =  getFileName("filesystem.txt");

    copySuccess = t.step_func(function () {
        assert_unreached("successCalback should not be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            copyError = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.copyTo(fsTestFileName, "images", true, copySuccess, copyError);
                }, exceptionName + " should be thrown - given incorrect errorCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_onerror_invalid_cb() {

//==== TEST: File_copyTo_onerror_invalid_cb
//==== LABEL Check if File::copyTo() throws exception for wrong errorCallback
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_copyTo_onerror_invalid_cb'), resolveSuccess, resolveError,
    copySuccess, copyError, fsTestFileName;

t.step(function () {
    fsTestFileName =  getFileName("filesystem.txt");

    copyError = {
        onerror: t.step_func(function () {
            assert_unreached("Invalid callback invoked: ");
        })
    };

    copySuccess = t.step_func(function () {
        assert_unreached("successCallback should not be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.copyTo(fsTestFileName, "images", true, copySuccess, copyError);
            }, "given incorrect errorCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_onsuccess_TypeMismatch() {

//==== TEST: File_copyTo_onsuccess_TypeMismatch
//==== LABEL Check if File::copyTo() throws exception when type of successCallback is wrong
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_copyTo_onsuccess_TypeMismatch'), copySuccess,
    resolveSuccess, resolveError, conversionTable, i, exceptionName = "TypeMismatchError", fsTestFile, fsTestFileName;

t.step(function (){
    fsTestFileName =  getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            copySuccess = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.copyTo(fsTestFile.fullPath, "images", true, copySuccess);
                }, exceptionName + " should be thrown - given incorrect successCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_copyTo_onsuccess_invalid_cb() {

//==== TEST: File_copyTo_onsuccess_invalid_cb
//==== LABEL Check if File::copyTo() throws exception for wrong successCallback
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_copyTo_onsuccess_invalid_cb'),
    resolveSuccess, resolveError, copySuccess, fsTestFile, fsTestFileName;

t.step(function (){
    fsTestFileName =  getFileName("filesystem.txt");

    copySuccess = {
        onsuccess: t.step_func(function () {
            assert_unreached("Invalid callback invoked");
        })
    };

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.copyTo(fsTestFile.fullPath, "images", true, copySuccess);
            }, "given incorrect successCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_with_file_handle() {
//==== TEST: File_copyTo_with_file_handle
//==== LABEL Check if File::copyTo() calls errorCallback when called for object representing file, not a directory
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var resolveSuccess, resolveError, copySuccess, copyError, fsTestFile, fsTestFileName, fsTestDir, fsTestDirName,
    expectedError ="IOError", t = async_test('File_copyTo_with_file_handle');

t.step(function () {
    fsTestDirName = getFileName("filesystem");
    fsTestFileName = getFileName("filesystem.txt");

    copySuccess = t.step_func(function () {
        assert_unreached("copySuccess callback shouldn't be invoked");
    });

    copyError = t.step_func(function (error) {
        assert_equals(error.name, expectedError, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestFile.copyTo(fsTestFile.fullPath, fsTestDir.fullPath, true, copySuccess, copyError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_copyTo_with_null_success_and_error_callbacks() {

//==== TEST: File_copyTo_with_null_success_and_error_callbacks
//==== LABEL Check if File::copyTo() can be invoked with null successCallback and errorCallback
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA

var t = async_test('File_copyTo_with_null_success_and_error_callbacks'), resolveSuccess, resolveError, fsTestFile, fsTestFileName1, fsTestFileName2,
    copyPath;

t.step(function () {

    fsTestFileName1 =  getFileName("filesystem1.txt");
    fsTestFileName2 =  getFileName("filesystem2.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName1);
        copyPath = dir.fullPath + "/" + fsTestFileName2;
        dir.copyTo(fsTestFile.fullPath, copyPath, false, null, null);
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve(TEST_ROOT_LOCATION, resolveSuccess, resolveError, "rw");
    });
});

}

function File_copyTo_with_onerror() {

//==== TEST: File_copyTo_with_onerror
//==== LABEL Check if File::copyTo() calls errorCallback (nonexisting originFilePath)
//==== SPEC: Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('File_copyTo_with_onerror'),
    resolveSuccess, resolveError, copyToSuccess, copyToError, fsTestFileName;

t.step(function (){
    fsTestFileName =  getFileName("notexistingfile.txt");

    copyToError = t.step_func(function () {
        t.done();
    });

    copyToSuccess = t.step_func(function () {
        assert_unreached("copyToError callback should be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        dir.copyTo(fsTestFileName, "images/" + fsTestFileName, true, copyToSuccess, copyToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_copyTo_with_onsuccess() {

//==== TEST: File_copyTo_with_onsuccess
//==== LABEL Check if File::copyTo() with onSuccess creates a file copy
//==== SPEC: Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MR

var t = async_test('File_copyTo_with_onsuccess'), resolveSuccess, resolveError, resolveSuccess2, resolveError2,
    fsTestFileName, fsTestFile, copyToSuccess, retVal = null;

t.step(function () {
    fsTestFileName =  getFileName("filesystem.txt");

    resolveSuccess2 = t.step_func(function (dir) {
        fsTestFile = dir.resolve(fsTestFileName);
        assert_equals(fsTestFile.name, fsTestFileName, "file wasn't copied properly");
        assert_true(fsTestFile.isFile, "file wasn't copied properly");
        t.done();
    });

    resolveError2 = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    copyToSuccess = t.step_func(function () {
        assert_equals(retVal, undefined, "incorrect returned value");
        tizen.filesystem.resolve("images", resolveSuccess2, resolveError2, "rw");
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        retVal = dir.copyTo(fsTestFile.fullPath, "images/" + fsTestFile.name, true, copyToSuccess);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_copyTo_writeFile_newName() {
//==== TEST: File_copyTo_writeFile_newName
//==== LABEL Check if you can create a new empty file, write content into it, then request a copy of it (different name, same directory)
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, copySuccess, copyError, openStreamSuccess, openStreamError,
    fsTestFileName, fsTestFileName2, fsTestFile, fsTestDirName, fsTestDir,
    t = async_test('File_copyTo_writeFile_newName');

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");
    fsTestFileName2 = getFileName("filesystem2.txt");
    fsTestDirName = getDirName("filesystem");

    copyError = t.step_func(function (error) {
        assert_unreached("copyTo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    copySuccess = t.step_func(function () {
        t.done();
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("test");
        fs.close();
        fsTestDir.copyTo(fsTestFile.fullPath, fsTestDir.fullPath + "/" + fsTestFileName2, true, copySuccess, copyError);
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestFile = fsTestDir.createFile(fsTestFileName);
        fsTestFile.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_copyTo_writeFile_overwrite_false() {
//==== TEST: File_copyTo_writeFile_overwrite_false
//==== LABEL Check if when create a new empty file, write content into it, then request a copy of it over existing file invokes errorCallback (overwrite=false)
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var t = async_test('File_copyTo_writeFile_overwrite_false'), resolveSuccess, resolveError,
    openStreamSuccess, openStreamError, copyToSuccess, copyToError, fsTestFileName,
    fsTestFile, fsTestDirName, fsTestDir, expectedError = "IOError", mainDir;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");
    fsTestDirName = getDirName("filesystem");

    copyToSuccess = t.step_func(function () {
        assert_unreached("copyToSuccess callback shouldn't be invoked");
    });

    copyToError = t.step_func(function (error) {
        assert_equals(error.name, expectedError, "wrong error type");
        t.done();
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("test");
        fs.close();
        mainDir.copyTo(fsTestFile.fullPath, fsTestDir.fullPath + "/" + fsTestFile.name, false, copyToSuccess, copyToError);
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        mainDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestDir.createFile(fsTestFileName);
        fsTestFile.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_copyTo_writeFile_subdir() {
//==== TEST: File_copyTo_writeFile_subdir
//==== LABEL Check if you can create a new empty file, write content into it, then request a copy of it (different name, different directory)
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, openStreamSuccess, openStreamError, copySuccess, copyError, fsTestFileName, fsTestFile,
    fsTestDir, fsTestDirName, fsTestSubDir, fsTestSubDirName, t = async_test('File_copyTo_writeFile_subdir');

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");
    fsTestDirName = getDirName("filesystem");
    fsTestSubDirName = getDirName("filesystemSub");

    copySuccess = t.step_func(function () {
        t.done();
    });

    copyError = t.step_func(function (error) {
        assert_unreached("copyTo() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("test");
        fs.close();
        fsTestDir.copyTo(fsTestFile.fullPath, fsTestSubDir.fullPath + "/" + fsTestFile.name, true, copySuccess, copyError);
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestSubDir = fsTestDir.createDirectory(fsTestSubDirName);
        fsTestFile = fsTestDir.createFile(fsTestFileName);
        fsTestFile.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_createDirectory() {

//==== TEST: File_createDirectory
//==== LABEL Check if File::createDirectory() method
//==== SPEC: Tizen Web API:IO:Filesystem:File:createDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MMINA MR

var t = async_test('File_createDirectory'),
    resolveSuccess, resolveError, fsTestDir, fsTestDirName;

t.step(function () {
    fsTestDirName = getDirName("filesystem");

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        assert_type(fsTestDir, "object", "directory wasn't created properly");
        checkOwnProperties(fsTestDir);
        assert_equals(fsTestDir.name, fsTestDirName, "directory wasn't created properly");
        assert_true(fsTestDir.isDirectory, "directory wasn't created properly");
        fsTestDir = dir.resolve(fsTestDirName);
        assert_equals(fsTestDir.name, fsTestDirName, "directory wasn't created properly");
        assert_true(fsTestDir.isDirectory, "directory wasn't created properly");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_createDirectory_exist() {

//==== TEST: File_createDirectory_exist
//==== LABEL Check if File::createDirectory() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:createDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('File_createDirectory_exist'),
    resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_true("createDirectory" in dir, "method createDirectory exists");
        check_method_exists(dir, "createDirectory");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("Error: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_createDirectory_level2() {
//==== TEST: File_createDirectory_level2
//==== LABEL Check if File::createDirectory() works for non-existing intermediate directory (creates 2 levels of directories)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:createDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST

var t = async_test('File_createDirectory_level2'), resolveSuccess, resolveError, listFilesSuccess, listFilesError, documentsDir,
    fsTestDir, fsTestDirName, fsTestSubDir, fsTestSubDirName;

t.step(function (){

    fsTestDirName = getDirName("filesystem");
    fsTestSubDirName = getDirName("filesystemSub");

    listFilesSuccess = t.step_func(function (files) {
        assert_true(files.length === 1, "Subdirectory not found.");
        assert_equals(files[0].name, fsTestSubDirName, "Unexpected subdirectory name: " + files[0].name);
        t.done();
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestSubDir = dir.createDirectory(fsTestDirName + "/" + fsTestSubDirName);
        fsTestDir = dir.resolve(fsTestDirName);
        fsTestDir.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_createFile() {

//==== TEST: File_createFile
//==== LABEL Check if File::createFile() method works properly
//==== SPEC: Tizen Web API:IO:Filesystem:File:createFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MMINA MR

var t = async_test('File_createFile'),
    resolveSuccess, resolveError, fsTestFileName, fsTestFile;

t.step(function () {
    fsTestFileName =  getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_type(fsTestFile, "object", "file wasn't created properly");
        checkOwnProperties(fsTestFile);
        assert_equals(fsTestFile.name, fsTestFileName, "file wasn't created properly");
        assert_true(fsTestFile.isFile, "file wasn't created properly");
        fsTestFile = dir.resolve(fsTestFileName);
        assert_equals(fsTestFile.name, fsTestFileName, "file wasn't created properly");
        assert_true(fsTestFile.isFile, "file wasn't created properly");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_createFile_exist() {

//==== TEST: File_createFile_exist
//==== LABEL Check if File::createFile() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:createFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('File_createFile_exist'),
    resolveSuccess, resolveError;

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_true("createFile" in dir, "method createFile exists");
        check_method_exists(dir, "createFile");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_createFile_existing_file() {

//==== TEST: File_createFile_existing_file
//==== LABEL Check if File::createFile() throws exception when the file already exists
//==== SPEC Tizen Web API:IO:Filesystem:File:createFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== PRIORITY P2
//==== TEST_CRITERIA MMINA MAST

var t = async_test('File_createFile_existing_file'), expected = "IOError",
    resolveSuccess, resolveError, fsTestFileName;

t.step(function () {
    fsTestFileName = getFileName("filesystem");

    resolveSuccess = t.step_func(function (dir) {
        dir.createFile(fsTestFileName);
        assert_throws({name: expected}, function () {
                dir.createFile(fsTestFileName);
            }, expected + " should be thrown");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_created_attribute() {

//==== TEST: File_created_attribute
//==== LABEL Check if File::created attribute exists, has type Date and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:created A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('File_created_attribute'),
    resolveSuccess, resolveError, fsTestFileName, fsTestFile, date, tmp;

t.step(function (){
    fsTestFileName =  getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        date = new Date();
        fsTestFile = dir.createFile(fsTestFileName);
        assert_own_property(fsTestFile, "created", "File does not own created property.");
        assert_true("created" in fsTestFile, "attribute created doesn't exist in provided object.");
        assert_type(fsTestFile.created, "Date", "Type of created is different.");
        tmp = fsTestFile.created;
        fsTestFile.created = new Date();
        assert_equals(tmp.getTime(), fsTestFile.created.getTime(), "created can be modified.");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteDirectory() {

//==== TEST: File_deleteDirectory
//==== LABEL Check if File::deleteDirectory() method can be called
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA

var t = async_test('File_deleteDirectory'), resolveSuccess, resolveError, fsTestDirName, fsTestDir;

t.step(function (){

    fsTestDirName =  getDirName("filesystem");

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        dir.deleteDirectory(fsTestDir.fullPath, true);
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteDirectory_createDir_documents() {
//==== TEST: File_deleteDirectory_createDir_documents
//==== LABEL Check if File::createDirectory() creates a new directory in Documents and File::deleteDirectory() removes it
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var fsTestDirName, fsTestDir, resolveSuccess, resolveError, deleteSuccess, deleteError, documentsDir,
    t = async_test('File_deleteDirectory_createDir_documents');

t.step(function (){
    fsTestDirName =  getDirName("filesystem");

    deleteSuccess = t.step_func(function () {
        assert_throws(NOT_FOUND_EXCEPTION, function () {
            documentsDir.resolve(fsTestDirName);
        }, "directory wasn't deleted properly");
        t.done();
    });

    deleteError = t.step_func(function (error) {
        assert_unreached("deleteDirectory() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir = dir.createDirectory(fsTestDirName);
        dir.deleteDirectory(fsTestDir.fullPath, true, deleteSuccess, deleteError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteDirectory_createDir_downloads() {
//==== TEST: File_deleteDirectory_createDir_downloads
//==== LABEL Check if File::createDirectory() creates a new directory in Downloads and File::deleteDirectory() removes it
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var fsTestDirName, fsTestDir, resolveSuccess, resolveError, deleteSuccess, deleteError, downloadsDir,
    t = async_test('File_deleteDirectory_createDir_downloads');

t.step(function (){
    fsTestDirName =  getDirName("filesystem");

    deleteSuccess = t.step_func(function () {
        assert_throws(NOT_FOUND_EXCEPTION, function () {
            downloadsDir.resolve(fsTestDirName);
        }, "directory wasn't deleted properly");
        t.done();
    });

    deleteError = t.step_func(function (error) {
        assert_unreached("deleteDirectory() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        downloadsDir = dir;
        fsTestDir = dir.createDirectory(fsTestDirName);
        dir.deleteDirectory(fsTestDir.fullPath, true, deleteSuccess, deleteError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("downloads", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteDirectory_createDir_images() {
//==== TEST: File_deleteDirectory_createDir_images
//==== LABEL Check if File::createDirectory() creates a new directory in Images and File::deleteDirectory() removes it
//==== PRIORITY P1
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var fsTestDirName, fsTestDir, resolveSuccess, resolveError, deleteSuccess, deleteError, imagesDir,
    t = async_test('File_deleteDirectory_createDir_images');

t.step(function (){
    fsTestDirName =  getDirName("filesystem");

    deleteSuccess = t.step_func(function () {
        assert_throws(NOT_FOUND_EXCEPTION, function () {
            imagesDir.resolve(fsTestDirName);
        }, "directory wasn't deleted properly");
        t.done();
    });

    deleteError = t.step_func(function (error) {
        assert_unreached("deleteDirectory() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        imagesDir = dir;
        fsTestDir = dir.createDirectory(fsTestDirName);
        dir.deleteDirectory(fsTestDir.fullPath, true, deleteSuccess, deleteError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("images", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteDirectory_createDir_music() {
//==== TEST: File_deleteDirectory_createDir_music
//==== LABEL Check if File::createDirectory() creates a new directory in Music and File::deleteDirectory() removes it
//==== PRIORITY P1
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var fsTestDirName, fsTestDir, resolveSuccess, resolveError, deleteSuccess, deleteError, musicDir,
    t = async_test('File_deleteDirectory_createDir_music');

t.step(function (){
    fsTestDirName =  getDirName("filesystem");

    deleteSuccess = t.step_func(function () {
        assert_throws(NOT_FOUND_EXCEPTION, function () {
            musicDir.resolve(fsTestDirName);
        }, "directory wasn't deleted properly");
        t.done();
    });

    deleteError = t.step_func(function (error) {
        assert_unreached("deleteDirectory() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        musicDir = dir;
        fsTestDir = dir.createDirectory(fsTestDirName);
        dir.deleteDirectory(fsTestDir.fullPath, true, deleteSuccess, deleteError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("music", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteDirectory_createDir_videos() {
//==== TEST: File_deleteDirectory_createDir_videos
//==== LABEL Check if File::createDirectory() creates a new directory in Videos and File::deleteDirectory() removes it
//==== PRIORITY P1
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var fsTestDirName, fsTestDir, resolveSuccess, resolveError, deleteSuccess, deleteError, videosDir,
    t = async_test('File_deleteDirectory_createDir_videos');

t.step(function (){
    fsTestDirName =  getDirName("filesystem");

    deleteSuccess = t.step_func(function () {
        assert_throws(NOT_FOUND_EXCEPTION, function () {
            videosDir.resolve(fsTestDirName);
        }, "directory wasn't deleted properly");
        t.done();
    });

    deleteError = t.step_func(function (error) {
        assert_unreached("deleteDirectory() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        videosDir = dir;
        fsTestDir = dir.createDirectory(fsTestDirName);
        dir.deleteDirectory(fsTestDir.fullPath, true, deleteSuccess, deleteError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("videos", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteDirectory_exist() {

//==== TEST: File_deleteDirectory_exist
//==== LABEL Check if File::deleteDirectory() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('File_deleteDirectory_exist'),
    resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_true("deleteDirectory" in dir, "method deleteDirectory exists");
        check_method_exists(dir, "deleteDirectory");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_deleteDirectory_onerror_TypeMismatch() {

//==== TEST: File_deleteDirectory_onerror_TypeMismatch
//==== LABEL Check if File::deleteDirectory() throws exception for wrong type of onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_deleteDirectory_onerror_TypeMismatch'),
    resolveSuccess, resolveError, conversionTable, deleteError, i, deleteSuccess, fsTestDirName, fsTestDir,
    exceptionName = "TypeMismatchError";

t.step(function () {
    fsTestDirName =  getDirName("filesystem");

    deleteSuccess = t.step_func(function () {
        assert_unreached("successCalback should not be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            deleteError = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.deleteDirectory(fsTestDir.fullPath, deleteSuccess, deleteError);
                }, exceptionName + " should be thrown - given incorrect errorCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteDirectory_onerror_invalid_cb() {

//==== TEST: File_deleteDirectory_onerror_invalid_cb
//==== LABEL Check if File::deleteDirectory() throws exception for wrong onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_deleteDirectory_onerror_invalid_cb'),
    resolveSuccess, resolveError, deleteDirectorySuccess, deleteDirectoryError, fsTestDirName, fsTestDir;

t.step(function () {
    fsTestDirName =  getDirName("filesystem");

    deleteDirectoryError = {
        onerror: t.step_func(function () {
            assert_unreached("Invalid callback invoked: ");
        })
    };

    deleteDirectorySuccess = t.step_func(function () {
        assert_unreached("deleteDirectorySuccess should not be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.deleteDirectory(fsTestDir.fullPath, deleteDirectorySuccess, deleteDirectoryError);
            }, "given incorrect errorCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteDirectory_onsuccess_TypeMismatch() {

//==== TEST: File_deleteDirectory_onsuccess_TypeMismatch
//==== LABEL Check if File::deleteDirectory() throws exception for wrong type of onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_deleteDirectory_onsuccess_TypeMismatch'), deleteSuccess,
    resolveSuccess, resolveError, conversionTable, i, exceptionName = "TypeMismatchError", fsTestDirName, fsTestDir;

t.step(function (){
    fsTestDirName =  getDirName("filesystem");

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            deleteSuccess = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.deleteDirectory(fsTestDir.fullPath, false, deleteSuccess);
                }, exceptionName + " should be thrown - given incorrect successCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteDirectory_onsuccess_invalid_cb() {

//==== TEST: File_deleteDirectory_onsuccess_invalid_cb
//==== LABEL Check if File::deleteDirectory() throws exception for wrong onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_deleteDirectory_onsuccess_invalid_cb'),
    resolveSuccess, resolveError, deleteSuccess, fsTestDirName, fsTestDir;

t.step(function (){
    fsTestDirName =  getDirName("filesystem");

    deleteSuccess = {
        onsuccess: t.step_func(function () {
            assert_unreached("Invalid callback invoked: ");
        })
    };

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.deleteDirectory(fsTestDir.fullPath, false, deleteSuccess);
            }, "given incorrect successCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteDirectory_with_empty_path() {

//==== TEST: File_deleteDirectory_with_empty_path
//==== LABEL Check if File::deleteDirectory() calls errorCallback when given directoryPath is empty
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var t = async_test('File_deleteDirectory_with_empty_path'), resolveError, resolveSuccess, deleteDirectoryError, deleteDirectorySuccess,
    expected = "NotFoundError";

t.step(function () {

    deleteDirectorySuccess = t.step_func(function () {
        assert_unreached("deleteDirectorySuccess: deleteDirectory() should invoke error callback");
    });

    deleteDirectoryError = t.step_func(function (error) {
        assert_equals(error.name, expected, "expect throw an exception");
        t.done();
    });

    resolveSuccess = t.step_func(function (root) {
        root.deleteDirectory("", false, deleteDirectorySuccess, deleteDirectoryError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve_root_location() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve(TEST_ROOT_LOCATION, resolveSuccess, resolveError);
});

}

function File_deleteDirectory_with_file_handle() {
//==== TEST: File_deleteDirectory_with_file_handle
//==== LABEL Check if File::deleteDirectory() calls errorCallback when called on File object representing file, not a directory
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var resolveSuccess, resolveError, deleteSuccess, deleteError, fsTestFileName, fsTestFile, documentsDir,
    expected = "InvalidValuesError", t = async_test('File_deleteDirectory_with_file_handle');

t.step(function (){
    fsTestFileName =  getFileName("filesystem.txt");

    deleteSuccess = t.step_func(function () {
        assert_unreached("delete a dir with file handle should throw an exception");
    });

    deleteError = t.step_func(function (error) {
        fsTestFile = documentsDir.resolve(fsTestFileName);
        assert_equals(fsTestFile.name, fsTestFileName, "file was deleted");
        assert_true(fsTestFile.isFile, "file was deleted");
        assert_equals(error.name, expected, "expect throw an exception");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        dir.deleteDirectory(fsTestFile.fullPath, true, deleteSuccess, deleteError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteDirectory_with_null_callbacks() {

//==== TEST: File_deleteDirectory_with_null_callbacks
//==== LABEL Check if File::deleteDirectory() method can be called with null onsuccess and onerror
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA

var t = async_test('File_deleteDirectory_with_null_callbacks'), resolveSuccess, resolveError, fsTestDirName, fsTestDir;
t.step(function () {

    fsTestDirName =  getDirName("filesystem");

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        dir.deleteDirectory(fsTestDir.fullPath, true, null, null);
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve(TEST_ROOT_LOCATION, resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteDirectory_with_onerror() {

//==== TEST: File_deleteDirectory_with_onerror
//==== LABEL Check if File::deleteDirectory() method calls onerror properly (when removing non-existing directory)
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var resolveSuccess, resolveError, deleteDirectorySuccess, deleteDirectoryError, fsTestDirName,
    expected = "NotFoundError", t = async_test('File_deleteDirectory_with_onerror');

t.step(function () {
    fsTestDirName =  getDirName("filesystemNoExist");

    deleteDirectorySuccess = t.step_func(function () {
        assert_unreached("deleteDirectorySuccess: deleteDirectoryError should be invoked");
    });

    deleteDirectoryError = t.step_func(function (error) {
        assert_equals(error.name, expected, "expect throw an exception");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        dir.deleteDirectory(fsTestDirName, true, deleteDirectorySuccess, deleteDirectoryError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteDirectory_with_onsuccess() {

//==== TEST: File_deleteDirectory_with_onsuccess
//==== LABEL Check if File::deleteDirectory() method with onsuccess optional argument works properly
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteDirectory M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MR

var t = async_test('File_deleteDirectory_with_onsuccess'), retVal = null,
    resolveSuccess, resolveError, deleteSuccess, deleteError, fsTestDirName, fsTestDir, documentsDir;

t.step(function () {
    fsTestDirName =  getDirName("filesystem");

    deleteSuccess = t.step_func(function () {
        assert_equals(retVal, undefined, "incorrect returned value");
        assert_throws(NOT_FOUND_EXCEPTION, function () {
            documentsDir.resolve(fsTestDirName);
        }, "directory wasn't deleted properly");
        t.done();
    });

    deleteError = t.step_func(function (error) {
        assert_unreached("deleteDirectory() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir = dir.createDirectory(fsTestDirName);
        retVal = dir.deleteDirectory(fsTestDir.fullPath, true, deleteSuccess, deleteError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteFile() {

//==== TEST: File_deleteFile
//==== LABEL Check if File::deleteFile() method works properly
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MR

var t = async_test('File_deleteFile'), fsTestFileName, fsTestFile, i, retVal = null,
    resolveSuccess, resolveError, listFilesSuccess, listFilesError, documentsDir, deleteSuccess;
t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    listFilesSuccess = t.step_func(function (files) {
        for (i = 0; i < files.length; i++) {
            if (files[i].name === fsTestFileName) {
                assert_unreached("File deletion failed");
            }
        }
        t.done();
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    deleteSuccess = t.step_func(function () {
        assert_equals(retVal, undefined, "incorrect returned value");
        documentsDir.listFiles(listFilesSuccess, listFilesError);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        retVal = dir.deleteFile(fsTestFile.fullPath, deleteSuccess);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_copyFile_downloads() {
//==== TEST: File_deleteFile_copyFile_downloads
//==== LABEL Check if you can create a new file in Document, copy it into Downloads, then request removing it
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_copyFile_downloads'), fsTestFileName, fsTestFile,
    documentsDir, resolveSuccess, resolveError, copyToSuccess, copyToError,
    deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestFileName = getFileName("fileSystem-File01.txt");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    copyToSuccess = t.step_func(function () {
        documentsDir.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    copyToError = t.step_func(function (error) {
        assert_unreached("copyTo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        dir.copyTo(fsTestFile.fullPath, "downloads/", true, copyToSuccess, copyToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_copyFile_images() {
//==== TEST: File_deleteFile_copyFile_images
//==== LABEL Check if you can create a new file in Images, copy it into Downloads, then request removing it
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_copyFile_images'), fsTestFileName, fsTestFile,
    documentsDir, resolveSuccess, resolveError, copyToSuccess, copyToError,
    deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestFileName = getFileName("fileSystem-File01.png");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    copyToSuccess = t.step_func(function () {
        documentsDir.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    copyToError = t.step_func(function (error) {
        assert_unreached("copyTo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        dir.copyTo(fsTestFile.fullPath, "downloads/", true, copyToSuccess, copyToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("images", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_copyFile_music() {
//==== TEST: File_deleteFile_copyFile_music
//==== LABEL Check if you can create a new file in Music, copy it into Downloads, then request removing it
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_copyFile_music'), fsTestFileName, fsTestFile,
    documentsDir, resolveSuccess, resolveError, copyToSuccess, copyToError,
    deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestFileName = getFileName("fileSystem-File01.mp3");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    copyToSuccess = t.step_func(function () {
        documentsDir.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    copyToError = t.step_func(function (error) {
        assert_unreached("copyTo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        dir.copyTo(fsTestFile.fullPath, "downloads/", true, copyToSuccess, copyToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("music", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_copyFile_videos() {
//==== TEST: File_deleteFile_copyFile_videos
//==== LABEL Check if you can create a new file in Video, copy it into Downloads, then request removing it
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_copyFile_videos'), fsTestFileName, fsTestFile,
    documentsDir, resolveSuccess, resolveError, copyToSuccess, copyToError,
    deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestFileName = getFileName("fileSystem-File01.mp3");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    copyToSuccess = t.step_func(function () {
        documentsDir.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    copyToError = t.step_func(function (error) {
        assert_unreached("copyTo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        dir.copyTo(fsTestFile.fullPath, "downloads/", true, copyToSuccess, copyToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("videos", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_createFile() {
//==== TEST: File_deleteFile_createFile
//==== LABEL Check if you can create a new file in Documents, copy it into Downloads, then request removing it
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_createFile'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError, deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        dir.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_exist() {

//==== TEST: File_deleteFile_exist
//==== LABEL Check if File::deleteFile() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('File_deleteFile_exist'),
    resolveSuccess, resolveError;

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_true("deleteFile" in dir, "method deleteFile exists");
        check_method_exists(dir, "deleteFile");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_deleteFile_listDocumentsFiles() {
//==== TEST: File_deleteFile_listDocumentsFiles
//==== LABEL Check if you can create directories and file in Documents, list them, then request deleting the directory and the file
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_listDocumentsFiles'), fsTestDirName1, documentsDir,
    fsTestDirName2, fsTestFileName, fsTestDir1, fsTestDir2, deleteDirError, deleteDirSuccess,
    fsTestFile, resolveSuccess, resolveError, listFilesSuccess, listFilesError,
    deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestDirName1 = getFileName("filesystem");
    fsTestDirName2 = getFileName("inside");
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    deleteDirSuccess = t.step_func(function () {
        fsTestDir1.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    deleteDirError = t.step_func(function (error) {
        assert_unreached("deleteDir() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        assert_true(files.length > 0, "Files not found");
        fsTestDir1.deleteDirectory(fsTestDir2.fullPath, true, deleteDirSuccess, deleteDirError);
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestFile = fsTestDir1.createFile(fsTestFileName);
        fsTestDir2 = fsTestDir1.createDirectory(fsTestDirName2);
        fsTestDir1.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_listDownloadsFiles() {
//==== TEST: File_deleteFile_listDownloadsFiles
//==== LABEL Check if you can create directories and file in Downloads, list them, then request deleting the directory and the file
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_listDownloadsFiles'), fsTestDirName1, documentsDir,
    fsTestDirName2, fsTestFileName, fsTestDir1, fsTestDir2, deleteDirError, deleteDirSuccess,
    fsTestFile, resolveSuccess, resolveError, listFilesSuccess, listFilesError,
    deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestDirName1 = getFileName("filesystem");
    fsTestDirName2 = getFileName("inside");
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    deleteDirSuccess = t.step_func(function () {
        fsTestDir1.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    deleteDirError = t.step_func(function (error) {
        assert_unreached("deleteDir() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        assert_true(files.length > 0, "Files not found");
        fsTestDir1.deleteDirectory(fsTestDir2.fullPath, true, deleteDirSuccess, deleteDirError);
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestFile = fsTestDir1.createFile(fsTestFileName);
        fsTestDir2 = fsTestDir1.createDirectory(fsTestDirName2);
        fsTestDir1.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("downloads", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_listImagsFiles() {

//==== TEST: File_deleteFile_listImagsFiles
//==== LABEL Check if you can create directories and file in Images, list them, then request deleting the directory and the file
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_listImagsFiles'), fsTestDirName1, documentsDir,
    fsTestDirName2, fsTestFileName, fsTestDir1, fsTestDir2, deleteDirError, deleteDirSuccess,
    fsTestFile, resolveSuccess, resolveError, listFilesSuccess, listFilesError,
    deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestDirName1 = getDirName("filesystem");
    fsTestDirName2 = getDirName("inside");
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    deleteDirSuccess = t.step_func(function () {
        fsTestDir1.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    deleteDirError = t.step_func(function (error) {
        assert_unreached("deleteDir() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        assert_true(files.length > 0, "Files not found");
        fsTestDir1.deleteDirectory(fsTestDir2.fullPath, true, deleteDirSuccess, deleteDirError);
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestFile = fsTestDir1.createFile(fsTestFileName);
        fsTestDir2 = fsTestDir1.createDirectory(fsTestDirName2);
        fsTestDir1.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("images", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_listMusicFiles() {
//==== TEST: File_deleteFile_listMusicFiles
//==== LABEL Check if you can create directories and file in Music, list them, then request deleting the directory and the file
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_listMusicFiles'), fsTestDirName1, documentsDir,
    fsTestDirName2, fsTestFileName, fsTestDir1, fsTestDir2, deleteDirError, deleteDirSuccess,
    fsTestFile, resolveSuccess, resolveError, listFilesSuccess, listFilesError,
    deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestDirName1 = getFileName("filesystem");
    fsTestDirName2 = getFileName("inside");
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    deleteDirSuccess = t.step_func(function () {
        fsTestDir1.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    deleteDirError = t.step_func(function (error) {
        assert_unreached("deleteDir() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        assert_true(files.length > 0, "Files not found");
        fsTestDir1.deleteDirectory(fsTestDir2.fullPath, true, deleteDirSuccess, deleteDirError);
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestFile = fsTestDir1.createFile(fsTestFileName);
        fsTestDir2 = fsTestDir1.createDirectory(fsTestDirName2);
        fsTestDir1.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("music", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_listVideosfiles() {
//==== TEST: File_deleteFile_listVideosfiles
//==== LABEL Check if you can create directories and file in Videos, list them, then request deleting the directory and the file
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_deleteFile_listVideosfiles'), fsTestDirName1, documentsDir,
    fsTestDirName2, fsTestFileName, fsTestDir1, fsTestDir2, deleteDirError, deleteDirSuccess,
    fsTestFile, resolveSuccess, resolveError, listFilesSuccess, listFilesError,
    deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestDirName1 = getFileName("filesystem");
    fsTestDirName2 = getFileName("inside");
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    deleteDirSuccess = t.step_func(function () {
        fsTestDir1.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    deleteDirError = t.step_func(function (error) {
        assert_unreached("deleteDir() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        assert_true(files.length > 0, "Files not found");
        fsTestDir1.deleteDirectory(fsTestDir2.fullPath, true, deleteDirSuccess, deleteDirError);
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestFile = fsTestDir1.createFile(fsTestFileName);
        fsTestDir2 = fsTestDir1.createDirectory(fsTestDirName2);
        fsTestDir1.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("videos", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_onerror_TypeMismatch() {

//==== TEST: File_deleteFile_onerror_TypeMismatch
//==== LABEL Check if File::deleteFile() throws exception for wrong type of onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_deleteFile_onerror_TypeMismatch'),
    resolveSuccess, resolveError, conversionTable, deleteFileError, i, deleteFileSuccess,
    exceptionName = "TypeMismatchError";

t.step(function () {
    deleteFileSuccess = t.step_func(function () {
        assert_unreached("successCalback should not be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            deleteFileError = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.deleteFile("verybadfile.txt", deleteFileSuccess, deleteFileError);
                }, exceptionName + " should be thrown - given incorrect errorCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_deleteFile_onerror_invalid_cb() {

//==== TEST: File_deleteFile_onerror_invalid_cb
//==== LABEL Check if File::deleteFile() throws exception for wrong onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_deleteFile_onerror_invalid_cb'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError, deleteFileSuccess, deleteFileError;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileError = {
        onerror: t.step_func(function () {
            assert_unreached("Invalid callback invoked: ");
        })
    };
    deleteFileSuccess = t.step_func(function () {
        assert_unreached("successCallback should not be called");
    });
    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createDirectory(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
            }, "given incorrect errorCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_onsuccess_TypeMismatch() {

//==== TEST: File_deleteFile_onsuccess_TypeMismatch
//==== LABEL Check if File::deleteFile() throws exception for wrong type of onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_deleteFile_onsuccess_TypeMismatch'), deleteFileSuccess, fsTestFileName,
    resolveSuccess, resolveError, conversionTable, i, exceptionName = "TypeMismatchError", fsTestFile;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            deleteFileSuccess = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.deleteFile(fsTestFile.fullPath, deleteFileSuccess);
                }, exceptionName + " should be thrown - given incorrect successCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_onsuccess_invalid_cb() {

//==== TEST: File_deleteFile_onsuccess_invalid_cb
//==== LABEL Check if File::deleteFile() throws exception for wrong onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_deleteFile_onsuccess_invalid_cb'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError, deleteFileSuccess;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileSuccess = {
        onsuccess: t.step_func(function () {
            assert_unreached("Invalid callback invoked: ");
        })
    };

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.deleteFile(fsTestFile.fullPath, deleteFileSuccess);
            }, "given incorrect successCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_with_dir_handle() {

//==== TEST: File_deleteFile_with_dir_handle
//==== LABEL Check if File::deleteFile() calls errorCallback when called on File object representing file, not a directory
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var t = async_test('File_deleteFile_with_dir_handle'), fsTestDirName, fsTestDir,
    resolveSuccess, resolveError, deleteFileSuccess, deleteFileError, expected = "InvalidValuesError",
    documentsDir;

t.step(function () {
    fsTestDirName = getFileName("filesystem");

    deleteFileSuccess = t.step_func(function () {
        assert_unreached("There is no exception thrown when delete a file with file handle");
    });

    deleteFileError = t.step_func(function (error) {
        assert_equals(error.name, expected, "expect throw an exception");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir= dir.createDirectory(fsTestDirName);
        dir.deleteFile(fsTestDir.fullPath, deleteFileSuccess, deleteFileError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_with_nonexist() {

//==== TEST: File_deleteFile_with_nonexist
//==== LABEL Check if File::deleteFile() calls errorCallback when given filePath does not exist
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var expected = "NotFoundError", t = async_test('File_deleteFile_with_nonexist'),
    resolveSuccess, resolveError, deleteFileSuccess, deleteFileError, fsTestFileName;

t.step(function () {
    fsTestFileName = getFileName("noExistFile.txt");

    deleteFileSuccess = t.step_func(function () {
        assert_unreached("This function should not be invoked");
    });

    deleteFileError = t.step_func(function (error) {
        assert_equals(error.name, expected, "should throw an exception");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        dir.deleteFile("documents/" + fsTestFileName, deleteFileSuccess, deleteFileError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteFile_with_onerror() {

//==== TEST: File_deleteFile_with_onerror
//==== LABEL Check if File::deleteFile() method calls errorCallback properly (when removing non-existing file)
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var t = async_test('File_deleteFile_with_onerror'),
    resolveSuccess, resolveError, deleteFileError, deleteFileSuccess, fsTestFileName;

t.step(function () {
    fsTestFileName = getFileName("noExistFile.txt");

    deleteFileError = t.step_func(function () {
        t.done();
    });
    deleteFileSuccess = t.step_func(function () {
        assert_unreached("onerroroptional callback should be called");
    });
    resolveSuccess = t.step_func(function (dir) {
        dir.deleteFile("documents/" + fsTestFileName, deleteFileSuccess, deleteFileError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_deleteFile_with_onsuccess() {

//==== TEST: File_deleteFile_with_onsuccess
//==== LABEL Check if File::deleteFile() method calls given onsuccess callback
//==== SPEC: Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('File_deleteFile_with_onsuccess'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError, deleteFileSuccess;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        try {
            dir.deleteFile(fsTestFile.fullPath, deleteFileSuccess);
        } catch (e) {
            assert_unreached("deleteFile() exeption: name: " + e.name + ", msg: " + e.message);
        }
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_with_vaild_callbacks() {

//==== TEST: File_deleteFile_with_vaild_callbacks
//==== LABEL Check if File::deleteFile() can be called with onsuccess and onerror
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('File_deleteFile_with_vaild_callbacks'),
    deleteFileSuccess, deleteFileError, documentsDir,
    resolveSuccess, resolveError, fsTestFileName, fsTestFile;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    deleteFileSuccess = t.step_func(function () {
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("delete() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        dir.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_deleteFile_with_valid_filePath() {

//==== TEST: File_deleteFile_with_valid_filePath
//==== LABEL Check if File::deleteFile() method can be called without onsuccess
//==== SPEC Tizen Web API:IO:Filesystem:File:deleteFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA

var t = async_test('File_deleteFile_with_valid_filePath'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        dir.deleteFile(fsTestFile.fullPath);
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_extend() {

//==== TEST: File_extend
//==== LABEL Check if instance of File can be extended with new property
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:File:File U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA OBX

var t = async_test('File_extend'),
    resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        check_extensibility(dir);
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_fileSize_attribute() {

//==== TEST: File_fileSize_attribute
//==== LABEL Check if File::fileSize attribute exists, has type Number and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:fileSize A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('File_fileSize_attribute'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_own_property(fsTestFile, "fileSize", "File does not own fileSize property.");
        check_readonly(fsTestFile, "fileSize", 0, "unsigned long long", fsTestFile.fileSize + 512);
        assert_equals(dir.fileSize, undefined, "fileSize of directory should be undefined");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_fullPath_attribute() {

//==== TEST: File_fullPath_attribute
//==== LABEL Check if File::fullPath attribute exists, has type DOMString and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:fullPath A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('File_fullPath_attribute'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_own_property(fsTestFile, "fullPath", "File does not own fullPath property.");
        check_readonly(fsTestFile, "fullPath", fsTestFile.fullPath, "string", "images");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_isDirectory_attribute() {

//==== TEST: File_isDirectory_attribute
//==== LABEL Check if File::isDirectory attribute exists, has type Boolean and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:isDirectory A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('File_isDirectory_attribute'),
    resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_own_property(dir, "isDirectory", "File does not own isDirectory property.");
        check_readonly(dir, "isDirectory", true, "boolean", false);
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_isFile_attribute() {

//==== TEST: File_isFile_attribute
//==== LABEL Check if File::isFile attribute exists, has type Boolean and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:isFile A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('File_isFile_attribute'),
    resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_own_property(dir, "isFile", "File does not own isFile property.");
        check_readonly(dir, "isFile", false, "boolean", true);
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_length_attribute() {

//==== TEST: File_length_attribute
//==== LABEL Check if File::length attribute exists, has type Number and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:length A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('File_length_attribute'), fsTestFileName =  getFileName("filesystem.txt"),
    resolveSuccess, resolveError, fsTestFile;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_own_property(dir, "length", "File does not own length property.");
        check_readonly(dir, "length", dir.length, "long", dir.length + 10);
        fsTestFile = dir.createFile(fsTestFileName);
        assert_equals(fsTestFile.length, undefined, "length of file should be undefined");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_listFiles() {

//==== TEST: File_listFiles
//==== LABEL Check if File::listFiles() method works properly
//==== SPEC: Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('File_listFiles'),
    resolveSuccess, resolveError, listFilesSuccess, retVal=null;
t.step(function () {
    listFilesSuccess = t.step_func(function (files) {
        assert_type(files, "array", "files should be array");
        assert_equals(retVal, undefined, "incorrect returned value");
        t.done();
    });
    resolveSuccess = t.step_func(function (dir) {
        retVal = dir.listFiles(listFilesSuccess);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_listFiles_createFiles() {

//==== TEST: File_listFiles_createFiles
//==== LABEL Check if you can create a new directory and then list files in this directory
//==== SPEC Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var t = async_test('File_listFiles_createFiles'),
    resolveSuccess, resolveError, listFilesSuccess, listFilesError,
    fsTestDirName, fsTestDir, documentsDir, fsTestFileName1, fsTestFileName2;

t.step(function () {
    fsTestDirName = getDirName("filesystem");
    fsTestFileName1 = getFileName("filesystem1.txt");
    fsTestFileName2 = getFileName("filesystem2.txt");

    listFilesSuccess = t.step_func(function (files) {
        assert_equals(files.length, 2, "list files");
        t.done();
    });
    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestDir.createFile(fsTestFileName1);
        fsTestDir.createFile(fsTestFileName2);
        fsTestDir.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_listFiles_exist() {

//==== TEST: File_listFiles_exist
//==== LABEL Check if File::listFiles() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('File_listFiles_exist'), resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_true("listFiles" in dir, "method listFiles exists");
        check_method_exists(dir, "listFiles");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_listFiles_filter_TypeMismatch() {

//==== TEST: File_listFiles_filter_TypeMismatch
//==== LABEL Check if File::listFiles() method throws exception for wrong type of filter
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_listFiles_filter_TypeMismatch'), listFilesSuccess,
    resolveSuccess, resolveError, conversionTable, i, exceptionName = "TypeMismatchError",
    filter;

t.step(function () {
    listFilesSuccess = t.step_func(function () {});
    resolveSuccess = t.step_func(function (dir) {
        conversionTable = getTypeConversionExceptions("object", true);
        for (i = 0; i < conversionTable.length; i++) {
            filter = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({
                    name: exceptionName
                }, function () {
                    dir.listFiles(listFilesSuccess, null, filter);
                }, exceptionName + " should be thrown - given incorrect filter.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_listFiles_filter_empty() {

//==== TEST: File_listFiles_filter_empty
//==== LABEL Check if File::listFiles() can be called with empty object as filter argument
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTD

var t = async_test('File_listFiles_filter_empty'), resolveSuccess, resolveError,
    listFilesSuccess, listFilesError;

t.step(function () {

    listFilesSuccess = t.step_func(function (files) {
        t.done();
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        dir.listFiles(listFilesSuccess, listFilesError, {});
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_listFiles_missarg() {

//==== TEST: File_listFiles_missarg
//==== PRIORITY: P2
//==== LABEL Check if File::listFiles() with missing mandatory argument throws exception
//==== SPEC: Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

var t = async_test('File_listFiles_missarg'), resolveSuccess, resolveError;
t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
                dir.listFiles();
            });
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_listFiles_onerror_TypeMismatch() {

//==== TEST: File_listFiles_onerror_TypeMismatch
//==== LABEL Check if File::listFiles() throws exception for wrong type of onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_listFiles_onerror_TypeMismatch'),
    resolveSuccess, resolveError, conversionTable, listFilesError, i, fsTestFileName,
    fsTestFile, listFilesSuccess, exceptionName = "TypeMismatchError";

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    listFilesSuccess = t.step_func(function () {
        assert_unreached("successCalback should not be called");
    });
    resolveSuccess = t.step_func(function (dir) {
        conversionTable = getTypeConversionExceptions("functionObject", true);
        fsTestFile = dir.createFile(fsTestFileName);
        for (i = 0; i < conversionTable.length; i++) {
            listFilesError = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    fsTestFile.listFiles(listFilesSuccess, listFilesError);
                }, exceptionName + " should be thrown - given incorrect errorCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_listFiles_onerror_invalid_cb() {

//==== TEST: File_listFiles_onerror_invalid_cb
//==== LABEL Check if File::listFiles() throws exception for wrong onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_listFiles_onerror_invalid_cb'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError, listFilesSuccess, listFilesError;
t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    listFilesError = {
        onerror: t.step_func(function () {
            assert_unreached("invalid errorCallback should not be called");
        })
    };
    listFilesSuccess = t.step_func(function () {
        assert_unreached("successCallback should not be called");
    });
    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                fsTestFile.listFiles(listFilesSuccess, listFilesError);
            }, "given incorrect errorCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_listFiles_onsuccess_TypeMismatch() {

//==== TEST: File_listFiles_onsuccess_TypeMismatch
//==== LABEL Check if File::listFiles() throws exception for wrong type of onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_listFiles_onsuccess_TypeMismatch'), listFilesSuccess,
    resolveSuccess, resolveError, conversionTable, i, exceptionName = "TypeMismatchError";

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        conversionTable = getTypeConversionExceptions("functionObject", false);
        for (i = 0; i < conversionTable.length; i++) {
            listFilesSuccess = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({
                    name: exceptionName
                }, function () {
                    dir.listFiles(listFilesSuccess);
                }, exceptionName + " should be thrown - given incorrect successCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_listFiles_onsuccess_invalid_cb() {

//==== TEST: File_listFiles_onsuccess_invalid_cb
//==== LABEL Check if File::listFiles() throws exception for wrong onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_listFiles_onsuccess_invalid_cb'),
    resolveSuccess, resolveError, listFilesSuccess;

t.step(function () {
    listFilesSuccess = {
        onsuccess: t.step_func(function () {
            assert_unreached("Invalid callback invoked: ");
        })
    };

    resolveSuccess = t.step_func(function (dir) {
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.listFiles(listFilesSuccess);
            }, "given incorrect successCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_listFiles_with_file_handle() {

//==== TEST: File_listFiles_with_file_handle
//==== LABEL Check if File::listFiles() calls errorCallback when called on File object representing file, not a directory
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var resolveSuccess, resolveError, listFilesSuccess, listFilesError, fsTestFileName, fsTestFile,
    documentsDir, t = async_test('File_listFiles_with_file_handle'), expected = "IOError";

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    listFilesSuccess = t.step_func(function () {
        assert_unreached("There is no exception thrown when listFiles with a file handle");
    });

    listFilesError = t.step_func(function (error) {
        assert_equals(error.name, expected, "expect thrown an exception");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestFile.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_listFiles_with_filter() {

//==== TEST: File_listFiles_with_filter
//==== LABEL Check if File::listFiles() works with filter argument
//==== PRIORITY P1
//==== SPEC Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var filesFilter, listFilesError, resolveSuccess, resolveError, listFilesSuccess, documentsDir,
    fsTestFileName, fsTestFile, filesRegExp = new RegExp("^" + FILE_AND_DIR_NAME_PREFIX),
    t = async_test('File_listFiles_with_filter');

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");
    filesFilter = {name: FILE_AND_DIR_NAME_PREFIX + "%"};

    listFilesSuccess = t.step_func(function (files) {
        assert_true(files.length > 0 , "file wasn't found");
        assert_regexp_match(files[0].name, filesRegExp, "bad file was found");
        t.done();
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        dir.listFiles(listFilesSuccess, listFilesError, filesFilter);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_listFiles_with_onerror() {

//==== TEST: File_listFiles_with_onerror
//==== LABEL Check if File::listFiles() calls errorCallback (listing files of a file)
//==== SPEC: Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var t = async_test('File_listFiles_with_onerror'),
    resolveSuccess, resolveError, listFilesSuccess, listFilesError, fsTestFileName, fsTestFile;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    listFilesError = t.step_func(function () {
        t.done();
    });

    listFilesSuccess = t.step_func(function (files) {
        assert_unreached("listFilesSuccess:  listFilesError should be invoked");
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestFile.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_listFiles_with_valid_successCallback() {

//==== TEST: File_listFiles_with_valid_successCallback
//==== LABEL Check if File::listFiles() call onsuccess callback
//==== SPEC Tizen Web API:IO:Filesystem:File:listFiles M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA

var t = async_test('File_listFiles_with_valid_successCallback'), resolveSuccess, resolveError,
    listFilesSuccess;
t.step(function () {

    listFilesSuccess = t.step_func(function (files) {
        assert_type(files, "array", "files");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        dir.listFiles(listFilesSuccess);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_modified_attribute() {

//==== TEST: File_modified_attribute
//==== LABEL Check if File::modified attribute exists, has type Date and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:modified A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE ARO AT

var t = async_test('File_modified_attribute'),
    resolveSuccess, resolveError, fsTestFileName, fsTestFile, date, tmp;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        date = new Date();
        fsTestFile = dir.createFile(fsTestFileName);
        assert_own_property(fsTestFile, "modified", "File does not own modified property.");
        assert_true("modified" in fsTestFile, "attribute modified doesn't exist in provided object.");
        assert_type(fsTestFile.modified, "Date", "Type of modified is different.");
        tmp = fsTestFile.modified;
        fsTestFile.modified = new Date();
        assert_equals(tmp.getTime(), fsTestFile.modified.getTime(), "created can be modified.");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo() {

//==== TEST: File_moveTo
//==== LABEL Check if File::moveTo() can be called successfully
//==== SPEC: Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('File_moveTo'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError, retVal;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        retVal = dir.moveTo(fsTestFile.fullPath,
            "images/"+fsTestFile.name, true);
        assert_equals(retVal, undefined, "incorrect returned value");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_dir_samedir_samename_overwrite_false() {
//==== TEST: File_moveTo_dir_samedir_samename_overwrite_false
//==== LABEL Check if File::moveTo() invokes error callback when moving a directory to the same location with the same name (overwrite is false)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var resolveSuccess, resolveError, moveToSuccess, moveToError, fsTestDir1, fsTestDirName1, fsTestSubDir1,
    fsTestSubDirName1, expected = "IOError",
    t = async_test('File_moveTo_dir_samedir_samename_overwrite_false');

t.step(function () {
    fsTestDirName1 = getDirName("filesystem1");
    fsTestSubDirName1 = getDirName("filesystem1sub");

    moveToSuccess = t.step_func(function () {
        assert_unreached("copySuccess callback shouldn't be invoked");
    });

    moveToError = t.step_func(function (error) {
        assert_equals(error.name, expected, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestSubDir1 = fsTestDir1.createDirectory(fsTestSubDirName1);
        fsTestDir1.moveTo(fsTestSubDir1.fullPath, fsTestSubDir1.path, false, moveToSuccess, moveToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_dir_samedir_samename_overwrite_true() {
//==== TEST: File_moveTo_dir_samedir_samename_overwrite_true
//==== LABEL Check if File::moveTo() invokes error callback when moving a directory to the same location with the same name (overwrite is true)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var resolveSuccess, resolveError, moveToSuccess, moveToError, fsTestDir1, fsTestDirName1, fsTestSubDir1,
    fsTestSubDirName1, expected = "IOError",
    t = async_test('File_moveTo_dir_samedir_samename_overwrite_true');

t.step(function () {
    fsTestDirName1 = getDirName("filesystem1");
    fsTestSubDirName1 = getDirName("filesystem1sub");

    moveToSuccess = t.step_func(function () {
        assert_unreached("copySuccess callback shouldn't be invoked");
    });

    moveToError = t.step_func(function (error) {
        assert_equals(error.name, expected, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestSubDir1 = fsTestDir1.createDirectory(fsTestSubDirName1);
        fsTestDir1.moveTo(fsTestSubDir1.fullPath, fsTestSubDir1.path, true, moveToSuccess, moveToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_empty_destination_source_and_destination_paths() {

//==== TEST: File_moveTo_empty_destination_source_and_destination_paths
//==== LABEL Check if File::moveTo() invokes error callback when originFilePath and destinationFilePath are empty
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var t = async_test('File_moveTo_empty_destination_source_and_destination_paths'),
    moveToSuccess, moveToError, resolveSuccess, resolveError;

t.step(function () {
    moveToSuccess = t.step_func(function () {
        assert_unreached("moveToSuccess: moveToError should be invoked");
    });

    moveToError = t.step_func(function (error) {
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        dir.moveTo("", "", false, moveToSuccess, moveToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_moveTo_exist() {

//==== TEST: File_moveTo_exist
//==== LABEL Check if File::moveTo() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('File_moveTo_exist'), resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_true("moveTo" in dir, "method moveTo exists");
        check_method_exists(dir, "moveTo");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_moveTo_file_samedir_samename_overwrite_false() {
//==== TEST: File_moveTo_file_samedir_samename_overwrite_false
//==== LABEL Check if File::moveTo() invokes error callback when moving a file to the same location with the same name (overwrite is false)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var t = async_test('File_moveTo_file_samedir_samename_overwrite_false'), resolveSuccess,
    resolveError, moveToSuccess, moveToError, expectedError = "IOError",
    fsTestDirName1, fsTestDirName2, fsTestFileName, fsTestDir1, fsTestDir2, fsTestFile;

t.step(function () {
    fsTestDirName1 = getDirName("filesystem");
    fsTestDirName2 = getDirName("destination");
    fsTestFileName = getFileName("filesystem.txt");

    moveToSuccess = t.step_func(function () {
        assert_unreached("moveToSuccess callback should not be invoked");
    });

    moveToError = t.step_func(function (error) {
        assert_equals(error.name, expectedError, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestDir2 = fsTestDir1.createDirectory(fsTestDirName2);
        fsTestFile = fsTestDir2.createFile(fsTestFileName);
        fsTestDir2.moveTo(fsTestFile.fullPath, "documents/"+fsTestDir1.name+"/"+fsTestDir2.name+"/",
            false, moveToSuccess, moveToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_file_samedir_samename_overwrite_true() {
//==== TEST: File_moveTo_file_samedir_samename_overwrite_true
//==== LABEL Check if File::moveTo() error callback when moving a file to the same location with the same name (overwrite is true)
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var t = async_test('File_moveTo_file_samedir_samename_overwrite_true'), resolveSuccess,
    resolveError, moveToSuccess, moveToError, expectedError = "IOError",
    fsTestDirName1, fsTestDirName2, fsTestFileName, fsTestDir1,
    fsTestDir2, fsTestFile;

t.step(function () {
    fsTestDirName1 = getDirName("filesystem");
    fsTestDirName2 = getDirName("destination");
    fsTestFileName = getFileName("filesystem.txt");

    moveToSuccess = t.step_func(function () {
        assert_unreached("moveToSuccess callback should not be invoked");
    });

    moveToError = t.step_func(function (error) {
        assert_equals(error.name, expectedError, "wrong error type");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestDir2 = fsTestDir1.createDirectory(fsTestDirName2);
        fsTestFile = fsTestDir2.createFile(fsTestFileName);
        fsTestDir2.moveTo(fsTestFile.fullPath, "documents/" + fsTestDir1.name + "/" + fsTestDir2.name + "/",
            true, moveToSuccess, moveToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_onerror_TypeMismatch() {

//==== TEST: File_moveTo_onerror_TypeMismatch
//==== LABEL Check if File::moveTo() throws exception for wrong type of onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_moveTo_onerror_TypeMismatch'),
    resolveSuccess, resolveError, conversionTable, moveToError, i, moveToSuccess,
    exceptionName = "TypeMismatchError";

t.step(function () {
    moveToSuccess = t.step_func(function () {
        assert_unreached("successCalback should not be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            moveToError = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({
                    name: exceptionName
                }, function () {
                    dir.moveTo("verybadfile.txt", "images", true, moveToSuccess, moveToError);
                }, exceptionName + " should be thrown - given incorrect error callback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_moveTo_onerror_invalid_cb() {

//==== TEST: File_moveTo_onerror_invalid_cb
//==== LABEL Check if File::moveTo() throws exception for wrong onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_moveTo_onerror_invalid_cb'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError, moveToSuccess, moveToError;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    moveToError = {
        onerror: t.step_func(function () {
            assert_unreached("moveTo() error callback invoked");
        })
    };
    moveToSuccess = t.step_func(function () {
        assert_unreached("moveTo() success callback invoked");
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.moveTo(fsTestFile.fullPath, "images", true, moveToSuccess, moveToError);
            }, "given incorrect errorCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_onsuccess_TypeMismatch() {

//==== TEST: File_moveTo_onsuccess_TypeMismatch
//==== LABEL Check if File::moveTo() throws exception for wrong type of onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_moveTo_onsuccess_TypeMismatch'), moveToSuccess, fsTestFileName, fsTestFile,
    resolveSuccess, resolveError, conversionTable, i, exceptionName = "TypeMismatchError";

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            moveToSuccess = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.moveTo(fsTestFile.fullPath, "images", true, moveToSuccess);
                }, exceptionName + " should be thrown - given incorrect success callback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_onsuccess_invalid_cb() {

//==== TEST: File_moveTo_onsuccess_invalid_cb
//==== LABEL Check if File::moveTo() throws exception for wrong onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_moveTo_onsuccess_invalid_cb'), resolveSuccess, resolveError,
    moveToSuccess, fsTestFileName, fsTestFile;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    moveToSuccess = {
        onsuccess: t.step_func(function () {
            assert_unreached("Invalid callback invoked: ");
        })
    };

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.moveTo(fsTestFile.fullPath, "images", true, moveToSuccess);
            }, "given incorrect successCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_with_additional_null_parameter() {

//==== TEST: File_moveTo_with_additional_null_parameter
//==== LABEL Check if File::moveTo() method can be invoked with extra null parameter
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('File_moveTo_with_additional_null_parameter'), fsTestFileName2,
    resolveSuccess, resolveError, file, movedPath, fsTestFileName, moveToSuccess;
t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");
    fsTestFileName2 = getFileName("filesystem2.txt");

    moveToSuccess = t.step_func(function () {
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        assert_true(isFileObject(file), "isFileObject(createdFile)");
        movedPath = dir.fullPath + "/" + fsTestFileName2;
        dir.moveTo(file.fullPath, movedPath, true, moveToSuccess, null, null);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve(TEST_ROOT_LOCATION, resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_with_file_handle() {

//==== TEST: File_moveTo_with_file_handle
//==== LABEL Check if File::moveTo() calls errorCallback when called on File object representing file, not a directory
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var resolveSuccess, resolveError, moveToSuccess, moveToError, fsTestDirName1,
    fsTestDirName2, fsTestDir1, fsTestDir2, fsTestFileName, fsTestFile,
    expectedError = "IOError", t = async_test('File_moveTo_with_file_handle');

t.step(function () {
    fsTestDirName1 = getFileName("filesystem");
    fsTestDirName2 = getFileName("filesystem2");
    fsTestFileName = getFileName("filesystem.txt");

    moveToSuccess = t.step_func(function () {
        assert_unreached("There is no exception thrown when when copyTo with file handle");
    });

    moveToError = t.step_func(function (error) {
        assert_equals(error.name, expectedError, expectedError + " should be thrown");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestDir2 = fsTestDir1.createDirectory(fsTestDirName2);
        fsTestFile = fsTestDir2.createFile(fsTestFileName);
        fsTestFile.moveTo(fsTestFile.fullPath, fsTestDir1.path, true, moveToSuccess, moveToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_with_onerror() {

//==== TEST: File_moveTo_with_onerror
//==== LABEL Check if File::moveTo() calls errorCallback (source file does not exist)
//==== SPEC: Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var t = async_test('File_moveTo_with_onerror'),
    resolveSuccess, resolveError, moveToSuccess, moveToError, fsTestFileName;

t.step(function () {
    fsTestFileName = getFileName("noExistFile.txt");

    moveToError = t.step_func(function () {
        t.done();
    });
    moveToSuccess = t.step_func(function (files) {
        assert_unreached("moveTo() error callback invoked: moveTo() error callback should be called");
    });
    resolveSuccess = t.step_func(function (dir) {
        dir.moveTo("documents/" + fsTestFileName,
            "images/" + fsTestFileName, true, moveToSuccess, moveToError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_moveTo_with_onsuccess() {

//==== TEST: File_moveTo_with_onsuccess
//==== LABEL Check if File::moveTo() calls successCallback
//==== SPEC: Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MOA

var t = async_test('File_moveTo_with_onsuccess'), listFilesError, resolveError,
    resolveSuccess, documentsDir, listFilesSuccess, moveToSuccess, i, fsTestFileName;
t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    moveToSuccess = t.step_func(function () {
        t.done();
    });

    listFilesSuccess = t.step_func(function (files) {
        for (i = 0; i < files.length; i++) {
            if (files[i].name === fsTestFileName) {
                try {
                    documentsDir.moveTo(files[i].fullPath,
                        "images/" + files[i].name, true, moveToSuccess);
                } catch (error) {
                    assert_unreached("listFiles() success callback invoked: name:" + error.name + "msg:" + error.message);
                }
            }
        }
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        dir.createFile(fsTestFileName);
        dir.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function File_moveTo_with_path_invalid() {

//==== TEST: File_moveTo_with_path_invalid
//==== LABEL Check if File::moveTo() calls errorCallback (NotFound) when destinationFilePath is in non-existing directory
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var t = async_test('File_moveTo_with_path_invalid'), fsTestDirName, fsTestDir,
    expected = "NotFoundError", documentsDir, resolveSuccess, resolveError,
    moveToSuccess, moveToError;

t.step(function () {
    fsTestDirName = getFileName("filesystem");

    moveToSuccess = t.step_func(function () {
        assert_unreached("moveTo() success callback invoked: No exception be thrown when move file to an invalid path");
    });

    moveToError = t.step_func(function (error) {
        assert_equals(error.name, expected, "exception is not our expected value");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestDir = dir.createDirectory(fsTestDirName);
        dir.moveTo(fsTestDir.fullPath, "hello/" + fsTestDirName, true, moveToSuccess, moveToError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_writeFile_newName() {

//==== TEST: File_moveTo_writeFile_newName
//==== LABEL Check if you can create a new file, write content to it, and then move the file to the same directory with different file name
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, fsTestDirName, fsTestFileName, fsTestDir,
    fsTestFile, fsTestFileName2, moveToSuccess, moveToError, t = async_test('File_moveTo_writeFile_newName'),
    openStreamSuccess, openStreamError;

t.step(function () {
    fsTestDirName = getFileName("filesystem");
    fsTestFileName = getFileName("filesystem.txt");
    fsTestFileName2 = getFileName("filesystem2.txt");

    moveToSuccess = t.step_func(function () {
        t.done();
    });

    moveToError = t.step_func(function (error) {
        assert_unreached("moveTo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("test");
        fs.close();
        fsTestDir.moveTo(fsTestFile.fullPath, fsTestDir.fullPath + "/" + fsTestFileName2,
            true, moveToSuccess, moveToError);
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestFile = fsTestDir.createFile(fsTestFileName);
        fsTestFile.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_writeFile_overwrite_false() {

//==== TEST: File_moveTo_writeFile_overwrite_false
//==== LABEL Check if File::moveTo() calls errorCallback when originFilePath and destinationFilePath is the same path (overwrite false)
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var t = async_test('File_moveTo_writeFile_overwrite_false'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, moveToSuccess, mainDir,
    moveToError, fsTestFileName, fsTestFile, fsTestDirName, fsTestDir, expectedError = "IOError";

t.step(function () {
    fsTestDirName = getFileName("filesystem");
    fsTestFileName = getFileName("filesystem.txt");

    moveToSuccess = t.step_func(function () {
        assert_unreached("moveToSuccess callback shouldn't be invoked");
    });

    moveToError = t.step_func(function (error) {
        assert_equals(error.name, expectedError, "wrong error type");
        t.done();
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("test");
        fs.close();
        mainDir.moveTo(fsTestFile.fullPath, fsTestDir.fullPath + "/" + fsTestFile.name,
            false, moveToSuccess, moveToError);
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        mainDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestDir.createFile(fsTestFileName);
        fsTestFile.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_moveTo_writeFile_subdir() {

//==== TEST: File_moveTo_writeFile_subdir
//==== LABEL Check if you can create a new file, write content to it, and then move the file to a subdirectory keeping the name of the file
//==== SPEC Tizen Web API:IO:Filesystem:File:moveTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, openStreamSuccess, openStreamError, moveToSuccess,
    moveToError, fsTestDirName1, fsTestDirName2, fsTestFileName,
    fsTestFile, fsTestDir1, fsTestDir2, t = async_test('File_moveTo_writeFile_subdir');

t.step(function () {
    fsTestDirName1 = getFileName("filesystem");
    fsTestDirName2 = getFileName("destination");
    fsTestFileName = getFileName("filesystem.txt");

    moveToSuccess = t.step_func(function () {
        t.done();
    });

    moveToError = t.step_func(function (error) {
        assert_unreached("moveTo() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write("test");
        fs.close();
        fsTestDir1.moveTo(fsTestFile.fullPath, fsTestDir2.fullPath + "/" + fsTestFile.name, true, moveToSuccess, moveToError);
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestDir1 = dir.createDirectory(fsTestDirName1);
        fsTestDir2 = fsTestDir1.createDirectory(fsTestDirName2);
        fsTestFile = fsTestDir1.createFile(fsTestFileName);
        fsTestFile.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_name_attribute() {

//==== TEST: File_name_attribute
//==== LABEL Check if File::name attribute exists, has type DOMString and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:name A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE ARO AT

var t = async_test('File_name_attribute'), fsTestFileName,
    fsTestFile, resolveSuccess, resolveError;
t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_own_property(fsTestFile, "name", "File does not own name property.");
        check_readonly(fsTestFile, "name", fsTestFile.name, "string", fsTestFile.name + "dummyValue");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_notexist() {

//==== TEST: File_notexist
//==== LABEL Interface File should not be accessible
//==== PRIORITY: P3
//==== SPEC Tizen Web API:IO:Filesystem:File:File U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("File");
}, 'File_notexist');

}

function File_openStream() {

//==== TEST: File_openStream
//==== LABEL Check if File::openStream() method works properly
//==== SPEC: Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('File_openStream'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError, retVal = null;
t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        retVal = fsTestFile.openStream("w",
            t.step_func(function (fs) {
                assert_equals(retVal, undefined, "incorrect returned value");
                fs.write("HelloWorld");
                fs.close();
                t.done();
            }));
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_encoding_invalid() {

//==== TEST: File_openStream_encoding_invalid
//==== LABEL Check if File::openStream() throws an exception for invalid encoding value
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC


var t = async_test('File_openStream_encoding_invalid'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError,
    fsTestFileName, fsTestFile, documentsDir;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        assert_unreached("There in no exception thrown when open the file in invalid encoding");
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
            fsTestFile.openStream("r", openStreamSuccess, openStreamError, "coding");
        });
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_exist() {

//==== TEST: File_openStream_exist
//==== LABEL Check if File::openStream() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME
var t = async_test('File_openStream_exist'), resolveSuccess, resolveError;

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_true("openStream" in dir, "method openStream exists");
        check_method_exists(dir, "listFiles");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_openStream_missarg() {

//==== TEST: File_openStream_missarg
//==== PRIORITY: P2
//==== LABEL Check if File::openStream() method throws exception for missing mandatory argument
//==== SPEC: Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

var t = async_test('File_openStream_missarg'), fsTestFileName, fsTestFile,
    resolveSuccess, resolveError;
t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
                fsTestFile.openStream();
            });
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_mode_TypeMismatch() {

//==== TEST: File_openStream_mode_TypeMismatch
//==== LABEL Check if File::openStream() throws exception for wrong type of mode argument
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_openStream_mode_TypeMismatch'),
    resolveSuccess, resolveError, conversionTable, i, exceptionName = "TypeMismatchError",
    openStreamSuccess, mode;

t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        assert_unreached("openStream() success callback invoked: should not be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        conversionTable = getTypeConversionExceptions("enum", false);
        for (i = 0; i < conversionTable.length; i++) {
            mode = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.openStream(mode, openStreamSuccess);
                }, exceptionName + " should be thrown - given incorrect mode.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_openStream_mode_a() {

//==== TEST: File_openStream_mode_a
//==== LABEL Check if File::openStream() works for mode a
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA


var resolveSuccess, resolveError, openStreamSuccess, openStreamError, fsTestFileName,
    fsTestFile, documentsDir, t = async_test('File_openStream_mode_a');

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        t.done();
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestFile.openStream("a", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_mode_r() {

//==== TEST: File_openStream_mode_r
//==== LABEL Check if File::openStream() works for mode r
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MOA


var resolveSuccess, resolveError, openStreamSuccess, openStreamError, fsTestFileName,
    fsTestFile, documentsDir, t = async_test('File_openStream_mode_r');

t.step(function (){
    fsTestFileName = getFileName("filesystem.txt");

    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        t.done();
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestFile.openStream("r", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_mode_rw() {

//==== TEST: File_openStream_mode_rw
//==== LABEL Check if File::openStream() works for mode rw
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MOA


var resolveSuccess, resolveError, openStreamSuccess, openStreamError, fsTestFileName,
    fsTestFile, documentsDir, t = async_test('File_openStream_mode_rw');

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        t.done();
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestFile.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_mode_w() {

//==== TEST: File_openStream_mode_w
//==== LABEL Check if File::openStream() works for mode w
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MOA


var resolveSuccess, resolveError, openStreamSuccess, openStreamError, fsTestFileName,
    fsTestFile, documentsDir, t = async_test('File_openStream_mode_w');

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        t.done();
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestFile.openStream("w", openStreamSuccess, openStreamError, "UTF-8");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_onerror_TypeMismatch() {
//==== TEST: File_openStream_onerror_TypeMismatch
//==== LABEL Check if File::openStream() method throws exception for wrong type of onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_openStream_onerror_TypeMismatch'),
    resolveSuccess, resolveError, conversionTable, openStreamError, i, openStreamSuccess,
    exceptionName = "TypeMismatchError";
t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        assert_unreached("openStream() success callback invoked: should not be called");
    });
    resolveSuccess = t.step_func(function (dir) {
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            openStreamError = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.openStream("r", openStreamSuccess, openStreamError);
                }, exceptionName + " should be thrown - given incorrect errorCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_openStream_onerror_invalid_cb() {
//==== TEST: File_openStream_onerror_invalid_cb
//==== LABEL Check if File::openStream() method throws exception for wrong onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_openStream_onerror_invalid_cb'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError;
t.step(function () {
    openStreamError = {
        onerror: t.step_func(function (error) {
            assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
        })
    };

    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        assert_unreached("successCallback should not be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.openStream("r", openStreamSuccess, openStreamError);
            }, "given incorrect errorCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_openStream_onsuccess_TypeMismatch() {

//==== TEST: File_openStream_onsuccess_TypeMismatch
//==== LABEL Check if File::openStream() method throws exception for wrong type of onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_openStream_onsuccess_TypeMismatch'), openStreamSuccess,
    resolveSuccess, resolveError, conversionTable, i, exceptionName = "TypeMismatchError",
    fsTestFileName, fsTestFile;
t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        conversionTable = getTypeConversionExceptions("functionObject", false);
        for (i = 0; i < conversionTable.length; i++) {
            openStreamSuccess = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    fsTestFile.openStream("r", openStreamSuccess);
                }, exceptionName + " should be thrown - given incorrect successCallback.");
        }
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_onsuccess_invalid_cb() {

//==== TEST: File_openStream_onsuccess_invalid_cb
//==== LABEL Check if File::openStream() method throws exception for wrong onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_openStream_onsuccess_invalid_cb'),
    resolveSuccess, resolveError, openStreamSuccess, fsTestFileName, fsTestFile;
t.step(function (){
    fsTestFileName = getFileName("filesystem.txt");

    openStreamSuccess = {
        onsuccess: t.step_func(function () {
            assert_unreached("openStream() success callback invoked: Invalid callback invoked.");
        })
    };

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                fsTestFile.openStream("r", openStreamSuccess);
            }, "given incorrect successCallback");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_with_encoding() {

//==== TEST: File_openStream_with_encoding
//==== LABEL Check if File::openStream() method can be called with valid encoding argument
//==== SPEC: Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MOA

var t = async_test('File_openStream_with_encoding'), resolveSuccess, resolveError,
    openStreamSuccess, openStreamError, fsTestFileName, fsTestFile;

t.step(function (){
    fsTestFileName = getFileName("filesystem.txt");

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        fsTestFile.openStream("r", openStreamSuccess, openStreamError, "ISO-8859-1");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_with_nonexist_file() {
//==== TEST: File_openStream_with_nonexist_file
//==== LABEL Check if File::openStream() method calls errorCallback when invoked for file which was already removed
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB


var fsTestFileName, fsTestFile, resolveSuccess, resolveError, deleteFileSuccess,
    deleteFileError, openStreamSuccess, openStreamError,
    t = async_test('File_openStream_with_nonexist_file');

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        assert_unreached("openStream() success callback invoked: expect throw an exception when open the file which not exist");
    });

    openStreamError = t.step_func(function (error) {
        assert_equals(error.name, "IOError", "expect throw an exception");
        t.done();
    });

    deleteFileSuccess = t.step_func(function () {
        fsTestFile.openStream("r", openStreamSuccess, openStreamError, "UTF-8");
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        dir.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_openStream_with_onerror() {

//==== TEST: File_openStream_with_onerror
//==== LABEL Check if File::openStream() method calls errorCallback properly (openStream used on directory)
//==== SPEC: Tizen Web API:IO:Filesystem:File:openStream M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MAST MOA

var t = async_test('File_openStream_with_onerror'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError;
t.step(function (){
    openStreamError = t.step_func(function () {
        t.done();
    });
    openStreamSuccess = t.step_func(function (fs) {
        fs.close();
        assert_unreached("this function should not be executed");
    });
    resolveSuccess = t.step_func(function (dir) {
        dir.openStream("r", openStreamSuccess, openStreamError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_parent_attribute() {

//==== TEST: File_parent_attribute
//==== LABEL Check if File::parent attribute exists, has type File and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:parent A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE ARO AT

var t = async_test('File_parent_attribute'), resolveSuccess, resolveError, fsTestFileName,
    fsTestFile, fsTestDir, fsTestDirName;

t.step(function () {
    fsTestFileName = getFileName("filesystem");
    fsTestDirName = getDirName("filesystemDir");

    resolveSuccess = t.step_func(function (dir) {
        assert_true("parent" in dir, "parent attribute doesn't exist");
        assert_equals(dir.parent, null, "incorrect parent value for root directory");
        fsTestDir = dir.createDirectory(fsTestDirName);
        fsTestFile = fsTestDir.createFile(fsTestFileName);
        assert_type(fsTestFile.parent, "object", "parent isn't an object");
        checkOwnProperties(fsTestFile.parent);
        assert_equals(fsTestFile.parent.name, fsTestDir.name, "incorrect parent");
        fsTestFile.parent = dir;
        assert_equals(fsTestFile.parent.name, fsTestDir.name, "parent can be modified");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_parent_attribute_notnull_using_resolve() {

//==== TEST: File_parent_attribute_notnull_using_resolve
//==== LABEL Check if File::parent attribute is set by resolve() for subdirectory of Documents
//==== SPEC: Tizen Web API:IO:Filesystem:File:parent A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('File_parent_attribute_notnull_using_resolve'),
    resolveSuccess, resolveError, resolveFileSuccess, fsTestFileName;

t.step(function (){
    fsTestFileName = getFileName("filesystem.txt");

    resolveFileSuccess = t.step_func(function (file) {
        assert_not_equals(file.parent, null, "File.parent should not be null.");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        try {
            dir.createFile(fsTestFileName);
        } catch (e) {
            if (e.name !== "IOError") {
                assert_unreached("createFile() error throw: name: " + e.name + ", msg: " + e.message);
            }
        }
        tizen.filesystem.resolve("documents/" + fsTestFileName, resolveFileSuccess, resolveError, "rw");
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_path_attribute() {

//==== TEST: File_path_attribute
//==== LABEL Check if File::path attribute exists, has type DOMString and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:path A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE ARO AT

var t = async_test('File_path_attribute'), resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        assert_own_property(dir, "path", "file does not have own path property");
        check_readonly(dir, "path", dir.path, "string", "images");
        assert_equals(dir.path, "documents", "incorrect path");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_readAsText() {

//==== TEST: File_readAsText
//==== LABEL Check if File::readAsText() method works properly without errorCallback
//==== SPEC: Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('File_readAsText'), resolveSuccess, resolveError, stringInFile = "HelloWorld",
    readAsTextSuccess, file, fsTestFileName = getFileName("testReadAsTextAgain.txt"), retVal = null;

t.step(function () {
    readAsTextSuccess = t.step_func(function (str) {
        assert_equals(retVal, undefined, "incorrect returned value");
        assert_equals(str, stringInFile, "incorrect read value");
        t.done();
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w",
            t.step_func(function (fs) {
                fs.write(stringInFile);
                fs.close();
                retVal = file.readAsText(readAsTextSuccess);
            }));
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );

});

}

function File_readAsText_encoding_invalid() {

//==== TEST: File_readAsText_encoding_invalid
//==== LABEL Check if File::readAsText() method throws exception for invalid encoding value
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('File_readAsText_encoding_invalid'), resolveSuccess, resolveError,
    readAsTextSuccess, documentsDir, expected = "TypeMismatchError", fsTestFileName,
    fsTestFile, readAsTextError;

t.step(function () {
    fsTestFileName = getFileName("filesystem.txt");

    readAsTextSuccess = t.step_func(function (str) {
        assert_unreached("readAsText() success callback invoked: There is no exception thrown when readAsText() in invalid encoding");
    });

    readAsTextError = t.step_func(function (error) {
        assert_unreached("readAsText() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        documentsDir = dir;
        fsTestFile = dir.createFile(fsTestFileName);
        assert_throws({"name": expected}, function () {
                fsTestFile.readAsText(readAsTextSuccess, readAsTextError, true);
            });
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_readAsText_exist() {

//==== TEST: File_readAsText_exist
//==== LABEL Check if File::readAsText() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME
var t = async_test('File_readAsText_exist'), resolveSuccess, resolveError;

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        assert_true("readAsText" in dir, "method readAsText exists");
        check_method_exists(dir, "readAsText");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name:" + error.name + "msg:" + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_readAsText_listDocumentsFiles() {
//==== TEST: File_readAsText_listDocumentsFiles
//==== LABEL Check if File::readAsText() method works for a file created in Documents
//==== SPEC Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var testFile, resolveSuccess, resolveError, readAsTextSuccess,
    readAsTextError, openStreamSuccess, openStreamError,
    listFilesSuccess, listFilesError, text = "test write method",
    t = async_test('File_readAsText_listDocumentsFiles'),
    fsTestFileName = getFileName("write01.txt");

t.step(function (){
    readAsTextSuccess = t.step_func(function (str) {
        assert_equals(str, text, "text read from file is wrong");
        t.done();
    });

    readAsTextError = t.step_func(function (error) {
        assert_unreached("readAsText() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write(text);
        fs.close();
        testFile.readAsText(readAsTextSuccess, readAsTextError, "UTF-8");
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        testFile.openStream("rw", openStreamSuccess, openStreamError);
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        testFile = dir.createFile(fsTestFileName);
        dir.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function File_readAsText_listDownloadsFiles() {
//==== TEST: File_readAsText_listDownloadsFiles
//==== LABEL Check if File::readAsText() method works for a file created in Downloads
//==== SPEC Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('File_readAsText_listDownloadsFiles'),
    text = "test write method", testFile, resolveSuccess, resolveError,
    listFilesSuccess, listFilesError, openStreamSuccess,
    openStreamError, readAsTextSuccess, readAsTextError,
    fsTestFileName = getFileName("write01.txt");

t.step(function (){
    readAsTextSuccess = t.step_func(function (str) {
        assert_equals(str, text, "text read from file is wrong");
        t.done();
    });

    readAsTextError = t.step_func(function (error) {
        assert_unreached("readAsText() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write(text);
        fs.close();
        testFile.readAsText(readAsTextSuccess, readAsTextError, "UTF-8");
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        testFile.openStream("rw", openStreamSuccess, openStreamError);
    });
    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        testFile = dir.createFile(fsTestFileName);
        dir.listFiles(listFilesSuccess, listFilesError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("downloads", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function File_readAsText_listImagesFiles() {
//==== TEST: File_readAsText_listImagesFiles
//==== LABEL Check if File::readAsText() method works for a file created in Images
//==== SPEC Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var text = "test write method", t = async_test('File_readAsText_listImagesFiles'),
    testFile, resolveSuccess, resolveError, listFilesSuccess,
    listFilesError, openStreamSuccess, openStreamError,
    readAsTextSuccess, readAsTextError,
    fsTestFileName = getFileName("write01.txt");

t.step(function (){
    readAsTextSuccess = t.step_func(function (str) {
        assert_equals(str, text, "text read from file is wrong");
        t.done();
    });

    readAsTextError = t.step_func(function (error) {
        assert_unreached("readAsText() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write(text);
        fs.close();
        testFile.readAsText(readAsTextSuccess, readAsTextError, "UTF-8");
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        testFile.openStream("rw", openStreamSuccess, openStreamError);
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        testFile = dir.createFile(fsTestFileName);
        dir.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("images", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function File_readAsText_listMusicFiles() {
//==== TEST: File_readAsText_listMusicFiles
//==== LABEL Check if File::readAsText() method works for a file created in Music
//==== SPEC Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var testFile, resolveSuccess, resolveError, listFilesSuccess,
    listFilesError, openStreamSuccess, openStreamError, readAsTextSuccess,
    readAsTextError, text = "test write method",
    t = async_test('File_readAsText_listMusicFiles'),
    fsTestFileName = getFileName("write01.txt");

t.step(function (){
    readAsTextSuccess = t.step_func(function (str) {
        assert_equals(str, text, "text read from file is wrong");
        t.done();
    });

    readAsTextError = t.step_func(function (error) {
        assert_unreached("readAsText() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write(text);
        fs.close();
        testFile.readAsText(readAsTextSuccess, readAsTextError, "UTF-8");
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        testFile.openStream("rw", openStreamSuccess, openStreamError);
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        testFile = dir.createFile(fsTestFileName);
        dir.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("music", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function File_readAsText_listVideosFiles() {
//==== TEST: File_readAsText_listVideosFiles
//==== LABEL Check if File::readAsText() method works for a file created in Videos
//==== SPEC Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var text = "test write method", t = async_test('File_readAsText_listVideosFiles'),
    testFile, resolveSuccess, resolveError, listFilesSuccess,
    listFilesError, openStreamSuccess, openStreamError,
    readAsTextSuccess, readAsTextError,
    fsTestFileName = getFileName("write01.txt");

t.step(function (){
    readAsTextSuccess = t.step_func(function (str) {
        assert_equals(str, text, "text read from file is wrong");
        t.done();
    });

    readAsTextError = t.step_func(function (error) {
        assert_unreached("readAsText() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write(text);
        fs.close();
        testFile.readAsText(readAsTextSuccess, readAsTextError, "UTF-8");
    });

    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        testFile.openStream("rw", openStreamSuccess, openStreamError);
    });

    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        testFile = dir.createFile(fsTestFileName);
        dir.listFiles(listFilesSuccess, listFilesError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("videos", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function File_readAsText_missarg() {

//==== TEST: File_readAsText_missarg
//==== PRIORITY: P2
//==== LABEL Check if File::readAsText() throws exception for missing mandatory parameter
//==== SPEC: Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMA

var t = async_test('File_readAsText_missarg'),
    resolveSuccess, resolveError, file,
    fsTestFileName = getFileName("testMissArg.txt");

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w",
            t.step_func(function (fs) {
                fs.write("HelloWorld");
                fs.close();
                assert_throws(TYPE_MISMATCH_EXCEPTION,
                    function () {
                        file.readAsText();
                    });
                t.done();
            }));
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );

});

}

function File_readAsText_onerror_TypeMismatch() {
//==== TEST: File_readAsText_onerror_TypeMismatch
//==== LABEL Check if File::readAsText() method throws exception for wrong type of onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_readAsText_onerror_TypeMismatch'),
    resolveSuccess, resolveError, conversionTable, readAsTextError, i,
    readAsTextSuccess, exceptionName = "TypeMismatchError";

t.step(function () {
    readAsTextSuccess = t.step_func(function () {
        assert_unreached("successCalback should not be called");
    });
    resolveSuccess = t.step_func(function (dir) {
        conversionTable = getTypeConversionExceptions("functionObject", true);
        for (i = 0; i < conversionTable.length; i++) {
            readAsTextError = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    dir.readAsText(readAsTextSuccess, readAsTextError);
                }, exceptionName + " should be thrown - given incorrect errorCallback.");
        }
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_readAsText_onerror_invalid_cb() {
//==== TEST: File_readAsText_onerror_invalid_cb
//==== LABEL Check if File::readAsText() method throws exception for wrong onerror
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_readAsText_onerror_invalid_cb'),
    resolveSuccess, resolveError, readAsTextSuccess, readAsTextError;

t.step(function () {
    readAsTextError = {
        onerror: t.step_func(function () {
            assert_unreached("Invalid callback invoked: ");
        })
    };
    readAsTextSuccess = t.step_func(function () {
        assert_unreached("successCallback should not be called");
    });

    resolveSuccess = t.step_func(function (dir) {
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                dir.readAsText(readAsTextSuccess, readAsTextError);
            }, "given incorrect errorCallback");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_readAsText_onsuccess_TypeMismatch() {
//==== TEST: File_readAsText_onsuccess_TypeMismatch
//==== LABEL Check if File::readAsText() method throws exception for wrong type of onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MC

var t = async_test('File_readAsText_onsuccess_TypeMismatch'), readAsTextSuccess,
    resolveSuccess, resolveError, conversionTable, i, file,
    exceptionName = "TypeMismatchError",
    fsTestFileName = getFileName("goodFile2.txt");

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        conversionTable = getTypeConversionExceptions("functionObject", false);

        for (i = 0; i < conversionTable.length; i++) {
            readAsTextSuccess = conversionTable[i][0];
            exceptionName = conversionTable[i][1];

            assert_throws({name: exceptionName},
                function () {
                    file.readAsText(readAsTextSuccess);
                }, exceptionName + " should be thrown - given incorrect successCallback.");
        }
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );

});

}

function File_readAsText_onsuccess_invalid_cb() {
//==== TEST: File_readAsText_onsuccess_invalid_cb
//==== LABEL Check if File::readAsText() method throws exception for wrong onsuccess
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MTCB

var t = async_test('File_readAsText_onsuccess_invalid_cb'),
    resolveSuccess, resolveError, readAsTextSuccess,
    fsTestFileName = getFileName("goodFile.txt"), file;

t.step(function (){
    readAsTextSuccess = {
        onsuccess: t.step_func(function () {
            assert_unreached("Invalid callback invoked: ");
        })
    };
    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        assert_throws(TYPE_MISMATCH_EXCEPTION,
            function () {
                file.readAsText(readAsTextSuccess);
            }, "given incorrect successCallback");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );

});

}

function File_readAsText_with_encoding() {
//==== TEST: File_readAsText_with_encoding
//==== LABEL Check if File::readAsText() method works with encoding argument
//==== PRIORITY: P2
//==== SPEC: Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('File_readAsText_with_encoding'),
    resolveSuccess, resolveError, listFilesSuccess, listFilesError,
    readAsTextSuccess, readAsTextError, i;

t.step(function (){
    readAsTextSuccess = t.step_func(function (text) {
        t.done();
    });
    readAsTextError = t.step_func(function (error) {
        assert_unreached("readAsText() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    listFilesSuccess = t.step_func(function (files) {
        for (i = 0; i < files.length; i++) {
            if (files[i].isDirectory === false){
                files[i].readAsText(readAsTextSuccess,
                    readAsTextError, "ISO-8859-1");
            }
        }
    });
    listFilesError = t.step_func(function (error) {
        assert_unreached("listFiles() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        dir.listFiles(listFilesSuccess, listFilesError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_readAsText_with_onerror() {
//==== TEST: File_readAsText_with_onerror
//==== LABEL Check if File::readAsText() properly calls errorCallback (called on a directory instead of file)
//==== SPEC: Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MERRCB

var t = async_test('File_readAsText_with_onerror'),
    resolveSuccess, resolveError, readAsTextSuccess, readAsTextError;

t.step(function () {
    readAsTextError = t.step_func(function (error) {
        assert_equals(error.name, "IOError", "incorrect error name");
        assert_type(error.message, "string", "incorrect error message type");
        assert_not_equals(error.message, "", "incorrect error message");
        t.done();
    });
    readAsTextSuccess = t.step_func(function (text) {
        assert_unreached("readAsTextSuccess: readAsTextError should be invoked");
    });

    resolveSuccess = t.step_func(function (dir) {
        dir.readAsText(readAsTextSuccess, readAsTextError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
});

}

function File_readOnly_attribute() {
//==== TEST: File_readOnly_attribute
//==== LABEL Check if File::readOnly attribute exists, has type Boolean and is readonly
//==== SPEC: Tizen Web API:IO:Filesystem:File:readOnly A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA AE AT ARO

var t = async_test('File_readOnly_attribute'),
    onSuccess, onError;
t.step(function () {
    onSuccess = t.step_func(function (dir) {
        assert_own_property(dir, "readOnly", "File does not own readOnly property.");
        check_readonly(dir, "readOnly", false, "boolean", true);
        t.done();
    });
    onError = t.step_func(function (error) {
        assert_unreached("Error: " + error.message);
    });

    tizen.filesystem.resolve("documents", onSuccess, onError, "rw");
});

}

function File_resolve() {
//==== TEST: File_resolve
//==== LABEL Check if File::resolve() method works properly
//==== SPEC: Tizen Web API:IO:Filesystem:File:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA MR

var t = async_test('File_resolve'),
    resolveSuccess, resolveError, listFilesSuccess, i, ds, file,
    fsTestFileName = getFileName("goodFile2.txt");
t.step(function () {
    listFilesSuccess = t.step_func(function (files) {
        for (i = 0; i < files.length; i++) {
            if (files[i].name === fsTestFileName) {
                file = ds.resolve(fsTestFileName);
                assert_equals(file.name, fsTestFileName, "Attribute check");
                t.done();
            }
        }
    });
    resolveSuccess = t.step_func(function (dir) {
        ds = dir;
        dir.createFile(fsTestFileName);
        dir.listFiles(listFilesSuccess);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );

});

}

function File_resolve_exist() {
//==== TEST: File_resolve_exist
//==== LABEL Check if File::resolve() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('File_resolve_exist'),
    onSuccess, onError;
t.step(function (){
    onSuccess = t.step_func(function (dir) {
        assert_true("resolve" in dir, "method resolve exists");
        check_method_exists(dir, "resolve");
        t.done();
    });
    onError = t.step_func(function (error) {
        assert_unreached("Error: " + error.message);
    });

    tizen.filesystem.resolve("documents", onSuccess, onError, "rw");
});

}

function File_resolve_with_nonexist() {

//==== TEST: File_resolve_with_nonexist
//==== LABEL Check if File::resolve() throws exception when resolving a file which not exist
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA

var t = async_test('File_resolve_with_nonexist'), resolveSuccess, resolveError, fsTestFileName, expected = "NotFoundError";

t.step(function () {
    fsTestFileName = getFileName("noExistFile.txt");

    resolveSuccess = t.step_func(function (dir) {
        try{
            dir.resolve(fsTestFileName);
        }catch(error) {
            assert_equals(error.name, expected, "expect throw an exception");
            t.done();
        }
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );

});

}

function File_toURI() {

//==== TEST: File_toURI
//==== LABEL Check if File::toURI() method works properly
//==== SPEC: Tizen Web API:IO:Filesystem:File:toURI M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MNA MR

var t = async_test('File_toURI'), resolveSuccess, resolveError, returnedValue, fsTestFileName, fsTestFile;

t.step(function () {
    fsTestFileName =  getFileName("filesystem.txt");

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        returnedValue = fsTestFile.toURI();
        assert_type(returnedValue, "string", "incorrect returned type");
        assert_not_equals(returnedValue, "", "incorrect returned value");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });
});

}

function File_toURI_exist() {

//==== TEST: File_toURI_exist
//==== LABEL Check if File::toURI() method exists
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:toURI M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA ME

var t = async_test('File_toURI_exist'), resolveSuccess, resolveError;

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        check_method_exists(dir, "toURI");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError);
});

}

function File_toURI_extra_argument() {

//==== TEST: File_toURI_extra_argument
//==== LABEL Check if File::toURI() method accepts extra argument
//==== SPEC: Tizen Web API:IO:Filesystem:File:toURI M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MNAEX

var t = async_test('File_toURI_extra_argument'), resolveSuccess, resolveError;

t.step(function (){
    resolveSuccess = t.step_func(function (dir) {
        checkExtraArgument(dir, "toURI");
        t.done();
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    tizen.filesystem.resolve("documents", resolveSuccess, resolveError);
});

}

function File_toURI_with_nonexist_file() {
//==== TEST: File_toURI_with_nonexist_file
//==== LABEL Check if File::toURI() method throws exception when get a URI of non-existing file
//==== PRIORITY P2
//==== SPEC Tizen Web API:IO:Filesystem:File:toURI M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MNA


var t = async_test('File_toURI_with_nonexist_file'),
    resolveSuccess, resolveError, deleteFileSuccess, deleteFileError , fsTestFileName, fsTestFile, returnedValue;

t.step(function () {
    fsTestFileName =  getFileName("filesystem.txt");

    deleteFileSuccess = t.step_func(function () {
        returnedValue = fsTestFile.toURI();
        assert_type(returnedValue, "string", "wrong type");
        t.done();
    });

    deleteFileError = t.step_func(function (error) {
        assert_unreached("deleteFile() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        fsTestFile = dir.createFile(fsTestFileName);
        dir.deleteFile(fsTestFile.fullPath, deleteFileSuccess, deleteFileError);
    });

    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t, function () {
        tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
    });

});

}

function filesystem_FileStreamSuccessCallback_onsuccess() {
//==== TEST: filesystem_FileStreamSuccessCallback_onsuccess
//==== LABEL Test whether FileStreamSuccessCallback::onsuccess is called with valid argument
//==== SPEC Tizen Web API:IO:Filesystem:FileStreamSuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA CBOA

var t = async_test('filesystem_FileStreamSuccessCallback_onsuccess'),
    resolveSuccess, resolveError, openStreamSuccess, openStreamError, file,
    fsTestFileName = getFileName("successFile.txt");

t.step(function () {
    openStreamSuccess = t.step_func(function (fs) {
        assert_not_equals(fs, null, "fs should not be null");
        fs.close();
        t.done();
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        file = dir.createFile(fsTestFileName);
        file.openStream("w", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function filesystem_File_copyTo() {
//==== TEST: filesystem_File_copyTo
//==== LABEL Check if File::copyTo() can be called
//==== PRIORITY P0
//==== SPEC Tizen Web API:IO:Filesystem:File:copyTo M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('filesystem_File_copyTo'),
    createFile, resolveSuccess, resolveError, copyToSuccess, copyToError,
    fsTestFileName = getFileName("copyFile.txt");

t.step(function (){
    copyToSuccess = t.step_func(function () {
        t.done();
    });
    copyToError = t.step_func(function (error) {
        assert_unreached("copyTo() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        createFile = dir.createFile(fsTestFileName);
        dir.copyTo(createFile.fullPath, "downloads/" + createFile.name, true, copyToSuccess, copyToError);
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function filesystem_File_readAsText() {
//==== TEST: filesystem_File_readAsText
//==== LABEL Check if File::readAsText() method reads the content of a file as a DOMString
//==== SPEC Tizen Web API:IO:Filesystem:File:readAsText M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MOA

var t = async_test('filesystem_File_readAsText'), text = "test write method",
    testFile, resolveSuccess, resolveError, openStreamSuccess, openStreamError,
    readAsTextSuccess, readAsTextError,
    fsTestFileName = getFileName("write01.txt");

t.step(function (){
    readAsTextSuccess = t.step_func(function (str) {
        assert_equals(str, text, "text read from file is wrong");
        t.done();
    });
    readAsTextError = t.step_func(function (error) {
        assert_unreached("readAsText() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    openStreamSuccess = t.step_func(function (fs) {
        fs.write(text);
        fs.close();
        testFile.readAsText(readAsTextSuccess, readAsTextError, "UTF-8");
    });
    openStreamError = t.step_func(function (error) {
        assert_unreached("openStream() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    resolveSuccess = t.step_func(function (dir) {
        testFile = dir.createFile(fsTestFileName);
        testFile.openStream("rw", openStreamSuccess, openStreamError, "UTF-8");
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

function filesystem_File_resolve() {
//==== TEST: filesystem_File_resolve
//==== LABEL Check if File::resolve() method called for a file returns a file handle
//==== SPEC Tizen Web API:IO:Filesystem:File:resolve M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/filesystem.html
//==== TEST_CRITERIA MMINA

var t = async_test('filesystem_File_resolve'),
    resolveSuccess, resolveError, expected = "object", handle,
    fsTestFileName = getFileName("resolve.doc");

t.step(function () {
    resolveSuccess = t.step_func(function (dir) {
        dir.createFile(fsTestFileName);
        handle = dir.resolve(fsTestFileName);
        assert_equals(typeof(handle), expected, "resolve a file and return a file handle");
        t.done();
    });
    resolveError = t.step_func(function (error) {
        assert_unreached("resolve() error callback invoked: name: " + error.name + ", msg: " + error.message);
    });

    prepareForTesting(t,
        function () {
            tizen.filesystem.resolve("documents", resolveSuccess, resolveError, "rw");
        }
    );
});

}

var moduleName = "tct-filesystem-tizen-tests";
add_test_case(moduleName, FileArraySuccessCallback_notexist);
add_test_case(moduleName, FileArraySuccessCallback_onsuccess);
add_test_case(moduleName, FileStreamSuccessCallback_notexist);
add_test_case(moduleName, FileStreamSuccessCallback_onsuccess);
add_test_case(moduleName, FileStream_bytesAvailable_attribute);
add_test_case(moduleName, FileStream_close);
add_test_case(moduleName, FileStream_close_exist);
add_test_case(moduleName, FileStream_close_extra_argument);
add_test_case(moduleName, FileStream_eof_attribute);
add_test_case(moduleName, FileStream_extend);
add_test_case(moduleName, FileStream_notexist);
add_test_case(moduleName, FileStream_position_attribute);
add_test_case(moduleName, FileStream_read);
add_test_case(moduleName, FileStream_readBase64);
add_test_case(moduleName, FileStream_readBase64_exist);
add_test_case(moduleName, FileStream_readBase64_without_r_permission);
add_test_case(moduleName, FileStream_readBase64_writeFile);
add_test_case(moduleName, FileStream_readBytes);
add_test_case(moduleName, FileStream_readBytes_exist);
add_test_case(moduleName, FileStream_readBytes_without_r_permission);
add_test_case(moduleName, FileStream_readBytes_writeFile);
add_test_case(moduleName, FileStream_read_exist);
add_test_case(moduleName, FileStream_read_without_r_permission);
add_test_case(moduleName, FileStream_read_writeFile);
add_test_case(moduleName, FileStream_write);
add_test_case(moduleName, FileStream_writeBase64);
add_test_case(moduleName, FileStream_writeBase64_exist);
add_test_case(moduleName, FileStream_writeBase64_without_w_permission);
add_test_case(moduleName, FileStream_writeBytes);
add_test_case(moduleName, FileStream_writeBytes_byteData_TypeMismatch);
add_test_case(moduleName, FileStream_writeBytes_exist);
add_test_case(moduleName, FileStream_writeBytes_missarg);
add_test_case(moduleName, FileStream_writeBytes_with_additional_null_parameter);
add_test_case(moduleName, FileStream_writeBytes_without_w_permission);
add_test_case(moduleName, FileStream_write_exist);
add_test_case(moduleName, FileStream_write_without_w_permission);
add_test_case(moduleName, FileStringSuccessCallback_notexist);
add_test_case(moduleName, FileStringSuccessCallback_onsuccess);
add_test_case(moduleName, FileSuccessCallback_notexist);
add_test_case(moduleName, FileSuccessCallback_onsuccess);
add_test_case(moduleName, FileSystemManagerObject_notexist);
add_test_case(moduleName, FileSystemManager_addStorageStateChangeListener);
add_test_case(moduleName, FileSystemManager_addStorageStateChangeListener_exist);
add_test_case(moduleName, FileSystemManager_addStorageStateChangeListener_missarg);
add_test_case(moduleName, FileSystemManager_addStorageStateChangeListener_onerror_TypeMismatch);
add_test_case(moduleName, FileSystemManager_addStorageStateChangeListener_onerror_invalid_cb);
add_test_case(moduleName, FileSystemManager_addStorageStateChangeListener_onsuccess_TypeMismatch);
add_test_case(moduleName, FileSystemManager_addStorageStateChangeListener_onsuccess_invalid_cb);
add_test_case(moduleName, FileSystemManager_addStorageStateChangeListener_with_onerror);
add_test_case(moduleName, FileSystemManager_addStorageStateChangeListener_without_arguments);
add_test_case(moduleName, FileSystemManager_extend);
add_test_case(moduleName, FileSystemManager_getStorage);
add_test_case(moduleName, FileSystemManager_getStorage_exist);
add_test_case(moduleName, FileSystemManager_getStorage_missarg);
add_test_case(moduleName, FileSystemManager_getStorage_onerror_TypeMismatch);
add_test_case(moduleName, FileSystemManager_getStorage_onerror_invalid_cb);
add_test_case(moduleName, FileSystemManager_getStorage_onsuccess_TypeMismatch);
add_test_case(moduleName, FileSystemManager_getStorage_onsuccess_invalid_cb);
add_test_case(moduleName, FileSystemManager_getStorage_with_nonexist_label);
add_test_case(moduleName, FileSystemManager_getStorage_with_onerror);
add_test_case(moduleName, FileSystemManager_in_tizen);
add_test_case(moduleName, FileSystemManager_listStorages);
add_test_case(moduleName, FileSystemManager_listStorages_exist);
add_test_case(moduleName, FileSystemManager_listStorages_missarg);
add_test_case(moduleName, FileSystemManager_listStorages_onerror_TypeMismatch);
add_test_case(moduleName, FileSystemManager_listStorages_onerror_invalid_cb);
add_test_case(moduleName, FileSystemManager_listStorages_onsuccess_TypeMismatch);
add_test_case(moduleName, FileSystemManager_listStorages_onsuccess_invalid_cb);
add_test_case(moduleName, FileSystemManager_listStorages_storages_retrieve);
add_test_case(moduleName, FileSystemManager_listStorages_with_invalid_error_callbacks);
add_test_case(moduleName, FileSystemManager_listStorages_with_onerror);
add_test_case(moduleName, FileSystemManager_listStorages_without_arguments);
add_test_case(moduleName, FileSystemManager_listStorages_works_correctly);
add_test_case(moduleName, FileSystemManager_maxPathLength_attribute);
add_test_case(moduleName, FileSystemManager_notexist);
add_test_case(moduleName, FileSystemManager_removeStorageStateChangeListener);
add_test_case(moduleName, FileSystemManager_removeStorageStateChangeListener_exist);
add_test_case(moduleName, FileSystemManager_removeStorageStateChangeListener_with_para_invalid);
add_test_case(moduleName, FileSystemManager_removeStorageStateChangeListener_works_correctly);
add_test_case(moduleName, FileSystemManager_resolve);
add_test_case(moduleName, FileSystemManager_resolve_documents);
add_test_case(moduleName, FileSystemManager_resolve_downloads);
add_test_case(moduleName, FileSystemManager_resolve_error_invoked);
add_test_case(moduleName, FileSystemManager_resolve_exist);
add_test_case(moduleName, FileSystemManager_resolve_images);
add_test_case(moduleName, FileSystemManager_resolve_missarg);
add_test_case(moduleName, FileSystemManager_resolve_mode_TypeMismatch);
add_test_case(moduleName, FileSystemManager_resolve_mode_a);
add_test_case(moduleName, FileSystemManager_resolve_mode_r);
add_test_case(moduleName, FileSystemManager_resolve_mode_w);
add_test_case(moduleName, FileSystemManager_resolve_music);
add_test_case(moduleName, FileSystemManager_resolve_onerror_TypeMismatch);
add_test_case(moduleName, FileSystemManager_resolve_onerror_invalid_cb);
add_test_case(moduleName, FileSystemManager_resolve_onsuccess_TypeMismatch);
add_test_case(moduleName, FileSystemManager_resolve_onsuccess_invalid_cb);
add_test_case(moduleName, FileSystemManager_resolve_ringtones);
add_test_case(moduleName, FileSystemManager_resolve_ringtones_invalid_mode_a);
add_test_case(moduleName, FileSystemManager_resolve_ringtones_invalid_mode_rw);
add_test_case(moduleName, FileSystemManager_resolve_ringtones_invalid_mode_w);
add_test_case(moduleName, FileSystemManager_resolve_videos);
add_test_case(moduleName, FileSystemManager_resolve_wgt_package_invalid_mode_a);
add_test_case(moduleName, FileSystemManager_resolve_wgt_package_invalid_mode_rw);
add_test_case(moduleName, FileSystemManager_resolve_wgt_package_invalid_mode_w);
add_test_case(moduleName, FileSystemManager_resolve_wgt_package);
add_test_case(moduleName, FileSystemManager_resolve_wgt_private);
add_test_case(moduleName, FileSystemManager_resolve_wgt_private_tmp);
add_test_case(moduleName, FileSystemManager_resolve_with_mode);
add_test_case(moduleName, FileSystemManager_resolve_with_onerror);
add_test_case(moduleName, FileSystemManager_resolve_works_correctly);
add_test_case(moduleName, FileSystemStorageArraySuccessCallback_notexist);
add_test_case(moduleName, FileSystemStorageArraySuccessCallback_onsuccess);
add_test_case(moduleName, FileSystemStorageSuccessCallback_notexist);
add_test_case(moduleName, FileSystemStorageSuccessCallback_onsuccess);
add_test_case(moduleName, FileSystemStorage_extend);
add_test_case(moduleName, FileSystemStorage_label_attribute);
add_test_case(moduleName, FileSystemStorage_notexist);
add_test_case(moduleName, FileSystemStorage_state_attribute);
add_test_case(moduleName, FileSystemStorage_type_attribute);
add_test_case(moduleName, File_copyTo);
add_test_case(moduleName, File_copyTo_dir_overwrite_false);
add_test_case(moduleName, File_copyTo_dir_overwrite_true);
add_test_case(moduleName, File_copyTo_dir_samedir_samename_overwrite_false);
add_test_case(moduleName, File_copyTo_dir_samedir_samename_overwrite_true);
add_test_case(moduleName, File_copyTo_exist);
add_test_case(moduleName, File_copyTo_file_overwrite_false);
add_test_case(moduleName, File_copyTo_file_overwrite_true);
add_test_case(moduleName, File_copyTo_file_samedir_samename_overwrite_false);
add_test_case(moduleName, File_copyTo_file_samedir_samename_overwrite_true);
add_test_case(moduleName, File_copyTo_onerror_TypeMismatch);
add_test_case(moduleName, File_copyTo_onerror_invalid_cb);
add_test_case(moduleName, File_copyTo_onsuccess_TypeMismatch);
add_test_case(moduleName, File_copyTo_onsuccess_invalid_cb);
add_test_case(moduleName, File_copyTo_with_file_handle);
add_test_case(moduleName, File_copyTo_with_null_success_and_error_callbacks);
add_test_case(moduleName, File_copyTo_with_onerror);
add_test_case(moduleName, File_copyTo_with_onsuccess);
add_test_case(moduleName, File_copyTo_writeFile_newName);
add_test_case(moduleName, File_copyTo_writeFile_overwrite_false);
add_test_case(moduleName, File_copyTo_writeFile_subdir);
add_test_case(moduleName, File_createDirectory);
add_test_case(moduleName, File_createDirectory_exist);
add_test_case(moduleName, File_createDirectory_level2);
add_test_case(moduleName, File_createFile);
add_test_case(moduleName, File_createFile_exist);
add_test_case(moduleName, File_createFile_existing_file);
add_test_case(moduleName, File_created_attribute);
add_test_case(moduleName, File_deleteDirectory);
add_test_case(moduleName, File_deleteDirectory_createDir_documents);
add_test_case(moduleName, File_deleteDirectory_createDir_downloads);
add_test_case(moduleName, File_deleteDirectory_createDir_images);
add_test_case(moduleName, File_deleteDirectory_createDir_music);
add_test_case(moduleName, File_deleteDirectory_createDir_videos);
add_test_case(moduleName, File_deleteDirectory_exist);
add_test_case(moduleName, File_deleteDirectory_onerror_TypeMismatch);
add_test_case(moduleName, File_deleteDirectory_onerror_invalid_cb);
add_test_case(moduleName, File_deleteDirectory_onsuccess_TypeMismatch);
add_test_case(moduleName, File_deleteDirectory_onsuccess_invalid_cb);
add_test_case(moduleName, File_deleteDirectory_with_empty_path);
add_test_case(moduleName, File_deleteDirectory_with_file_handle);
add_test_case(moduleName, File_deleteDirectory_with_null_callbacks);
add_test_case(moduleName, File_deleteDirectory_with_onerror);
add_test_case(moduleName, File_deleteDirectory_with_onsuccess);
add_test_case(moduleName, File_deleteFile);
add_test_case(moduleName, File_deleteFile_copyFile_downloads);
add_test_case(moduleName, File_deleteFile_copyFile_images);
add_test_case(moduleName, File_deleteFile_copyFile_music);
add_test_case(moduleName, File_deleteFile_copyFile_videos);
add_test_case(moduleName, File_deleteFile_createFile);
add_test_case(moduleName, File_deleteFile_exist);
add_test_case(moduleName, File_deleteFile_listDocumentsFiles);
add_test_case(moduleName, File_deleteFile_listDownloadsFiles);
add_test_case(moduleName, File_deleteFile_listImagsFiles);
add_test_case(moduleName, File_deleteFile_listMusicFiles);
add_test_case(moduleName, File_deleteFile_listVideosfiles);
add_test_case(moduleName, File_deleteFile_onerror_TypeMismatch);
add_test_case(moduleName, File_deleteFile_onerror_invalid_cb);
add_test_case(moduleName, File_deleteFile_onsuccess_TypeMismatch);
add_test_case(moduleName, File_deleteFile_onsuccess_invalid_cb);
add_test_case(moduleName, File_deleteFile_with_dir_handle);
add_test_case(moduleName, File_deleteFile_with_nonexist);
add_test_case(moduleName, File_deleteFile_with_onerror);
add_test_case(moduleName, File_deleteFile_with_onsuccess);
add_test_case(moduleName, File_deleteFile_with_vaild_callbacks);
add_test_case(moduleName, File_deleteFile_with_valid_filePath);
add_test_case(moduleName, File_extend);
add_test_case(moduleName, File_fileSize_attribute);
add_test_case(moduleName, File_fullPath_attribute);
add_test_case(moduleName, File_isDirectory_attribute);
add_test_case(moduleName, File_isFile_attribute);
add_test_case(moduleName, File_length_attribute);
add_test_case(moduleName, File_listFiles);
add_test_case(moduleName, File_listFiles_createFiles);
add_test_case(moduleName, File_listFiles_exist);
add_test_case(moduleName, File_listFiles_filter_TypeMismatch);
add_test_case(moduleName, File_listFiles_filter_empty);
add_test_case(moduleName, File_listFiles_missarg);
add_test_case(moduleName, File_listFiles_onerror_TypeMismatch);
add_test_case(moduleName, File_listFiles_onerror_invalid_cb);
add_test_case(moduleName, File_listFiles_onsuccess_TypeMismatch);
add_test_case(moduleName, File_listFiles_onsuccess_invalid_cb);
add_test_case(moduleName, File_listFiles_with_file_handle);
add_test_case(moduleName, File_listFiles_with_filter);
add_test_case(moduleName, File_listFiles_with_onerror);
add_test_case(moduleName, File_listFiles_with_valid_successCallback);
add_test_case(moduleName, File_modified_attribute);
add_test_case(moduleName, File_moveTo);
add_test_case(moduleName, File_moveTo_dir_samedir_samename_overwrite_false);
add_test_case(moduleName, File_moveTo_dir_samedir_samename_overwrite_true);
add_test_case(moduleName, File_moveTo_empty_destination_source_and_destination_paths);
add_test_case(moduleName, File_moveTo_exist);
add_test_case(moduleName, File_moveTo_file_samedir_samename_overwrite_false);
add_test_case(moduleName, File_moveTo_file_samedir_samename_overwrite_true);
add_test_case(moduleName, File_moveTo_onerror_TypeMismatch);
add_test_case(moduleName, File_moveTo_onerror_invalid_cb);
add_test_case(moduleName, File_moveTo_onsuccess_TypeMismatch);
add_test_case(moduleName, File_moveTo_onsuccess_invalid_cb);
add_test_case(moduleName, File_moveTo_with_additional_null_parameter);
add_test_case(moduleName, File_moveTo_with_file_handle);
add_test_case(moduleName, File_moveTo_with_onerror);
add_test_case(moduleName, File_moveTo_with_onsuccess);
add_test_case(moduleName, File_moveTo_with_path_invalid);
add_test_case(moduleName, File_moveTo_writeFile_newName);
add_test_case(moduleName, File_moveTo_writeFile_overwrite_false);
add_test_case(moduleName, File_moveTo_writeFile_subdir);
add_test_case(moduleName, File_name_attribute);
add_test_case(moduleName, File_notexist);
add_test_case(moduleName, File_openStream);
add_test_case(moduleName, File_openStream_encoding_invalid);
add_test_case(moduleName, File_openStream_exist);
add_test_case(moduleName, File_openStream_missarg);
add_test_case(moduleName, File_openStream_mode_TypeMismatch);
add_test_case(moduleName, File_openStream_mode_a);
add_test_case(moduleName, File_openStream_mode_r);
add_test_case(moduleName, File_openStream_mode_rw);
add_test_case(moduleName, File_openStream_mode_w);
add_test_case(moduleName, File_openStream_onerror_TypeMismatch);
add_test_case(moduleName, File_openStream_onerror_invalid_cb);
add_test_case(moduleName, File_openStream_onsuccess_TypeMismatch);
add_test_case(moduleName, File_openStream_onsuccess_invalid_cb);
add_test_case(moduleName, File_openStream_with_encoding);
add_test_case(moduleName, File_openStream_with_nonexist_file);
add_test_case(moduleName, File_openStream_with_onerror);
add_test_case(moduleName, File_parent_attribute);
add_test_case(moduleName, File_parent_attribute_notnull_using_resolve);
add_test_case(moduleName, File_path_attribute);
add_test_case(moduleName, File_readAsText);
add_test_case(moduleName, File_readAsText_encoding_invalid);
add_test_case(moduleName, File_readAsText_exist);
add_test_case(moduleName, File_readAsText_listDocumentsFiles);
add_test_case(moduleName, File_readAsText_listDownloadsFiles);
add_test_case(moduleName, File_readAsText_listImagesFiles);
add_test_case(moduleName, File_readAsText_listMusicFiles);
add_test_case(moduleName, File_readAsText_listVideosFiles);
add_test_case(moduleName, File_readAsText_missarg);
add_test_case(moduleName, File_readAsText_onerror_TypeMismatch);
add_test_case(moduleName, File_readAsText_onerror_invalid_cb);
add_test_case(moduleName, File_readAsText_onsuccess_TypeMismatch);
add_test_case(moduleName, File_readAsText_onsuccess_invalid_cb);
add_test_case(moduleName, File_readAsText_with_encoding);
add_test_case(moduleName, File_readAsText_with_onerror);
add_test_case(moduleName, File_readOnly_attribute);
add_test_case(moduleName, File_resolve);
add_test_case(moduleName, File_resolve_exist);
add_test_case(moduleName, File_resolve_with_nonexist);
add_test_case(moduleName, File_toURI);
add_test_case(moduleName, File_toURI_exist);
add_test_case(moduleName, File_toURI_extra_argument);
add_test_case(moduleName, File_toURI_with_nonexist_file);
add_test_case(moduleName, filesystem_FileStreamSuccessCallback_onsuccess);
add_test_case(moduleName, filesystem_File_copyTo);
add_test_case(moduleName, filesystem_File_readAsText);
add_test_case(moduleName, filesystem_File_resolve);
