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
        Krzysztof Lachacz <k.lachacz@samsung.com>
        Junghyuk Park <junghyuk.park@samsung.com>
*/

var TIMEOUT_ASYNC_TEST = 30000;
setup({timeout: TIMEOUT_ASYNC_TEST});

var SHARED_STORAGE_PATH = "/opt/usr/media";
var TEST_CONTENT_DIR_PATH = "/opt/usr/media/tct-content-tizen-tests/";

var TEST_CONTENT_IMAGES = [
    "tct-content-tizen-tests_image_default.jpg",
    "tct-content-tizen-tests_image_geolocation.jpg",
    "tct-content-tizen-tests_image_orientation_1.jpg",
    "tct-content-tizen-tests_image_orientation_2.jpg",
    "tct-content-tizen-tests_image_orientation_3.jpg",
    "tct-content-tizen-tests_image_orientation_4.jpg",
    "tct-content-tizen-tests_image_orientation_5.jpg",
    "tct-content-tizen-tests_image_orientation_6.jpg",
    "tct-content-tizen-tests_image_orientation_7.jpg",
    "tct-content-tizen-tests_image_orientation_8.jpg"
]

var TEST_CONTENT_AUDIOS = [
    "tct-content-tizen-tests_audio_default.mp3",
    "tct-content-tizen-tests_audio_lyrics.mp3",
    "tct-content-tizen-tests_audio_no_tag.mp3"
]

var TEST_CONTENT_VIDEOS = [
    "tct-content-tizen-tests_video.mp4",
    "tct-content-tizen-tests_video_tagged.mp4"
]

function setup_contents(async_test, onscaned) {
    var contents = [];
    contents = contents.concat(TEST_CONTENT_IMAGES);
    contents = contents.concat(TEST_CONTENT_AUDIOS);
    contents = contents.concat(TEST_CONTENT_VIDEOS);

    function scanFiles(files, oncompleted) {
        var file = files.shift();

        tizen.content.scanFile(
            "file://"+TEST_CONTENT_DIR_PATH+file,
            async_test.step_func(function (content) {
                if (files.length) {
                    scanFiles(files, oncompleted);
                } else {
                    oncompleted();
                }
            }),
            async_test.step_func(function (error) {
                assert_unreached("setup_contents fails: " + error.name + " with message: " + error.message);
            })
        );
    }

    scanFiles(contents, onscaned);
}

function check_content_object(content) {
    assert_type(content.editableAttributes, "array", "editableAttributes should be an array");
    assert_type(content.id, "string", "id should be a string");
    assert_type(content.name, "string", "name shoud be a string");
    assert_type(content.type, "string", "type should be a string");
    assert_type(content.mimeType, "string", "mimeType should be a string");
    assert_type(content.title, "string", "title should be a string");
    assert_type(content.contentURI, "string", "contentURI should be a string");
    assert_type(content.size, "number", "size should be a number");
    assert_type(content.rating, "number", "rating should be a number");
    if(content.thumbnailURIs !== null) {
        assert_type(content.thumbnailURIs, "array", "thumbnailURIs should be an array");
    }
    if(content.releaseDate !== null) {
        assert_type(content.releaseDate, "date", "releaseDate should be a date");
    }
    if(content.modifiedDate !== null) {
        assert_type(content.modifiedDate, "date", "modifiedDate should be a date");
    }
    if(content.description !== null) {
        assert_type(content.description, "string", "description should be a string");
    }
}

function prepare_file_for_scan(addedImagePath, onCopySuccess, t) {
    var onCopyError = t.step_func(function (error) {
        assert_unreached("Failed to copy a file to " + addedImagePath + " with message: " + error.message);
    });

    var copyContentFile = t.step_func(function () {
        tizen.filesystem.resolve(
            "file://" + TEST_CONTENT_DIR_PATH,
            function (contentDirectory){
                contentDirectory.copyTo(TEST_CONTENT_DIR_PATH + TEST_CONTENT_IMAGES[0], addedImagePath, true, onCopySuccess, onCopyError);
            },
            function (error) {
                assert_unreached("Failed to resolve a directory: " + error.message);
            },
            "r"
        );
    });

    var onDeleteSuccess = t.step_func(function () {
        tizen.content.scanFile("file://" + addedImagePath, function (){
            copyContentFile();
        });
    });

    var onDeleteError = t.step_func(function () {
        copyContentFile();
    });

    tizen.filesystem.resolve(
        "file://" + SHARED_STORAGE_PATH,
        function (directory){
            var sharedDirectory = directory;
            sharedDirectory.deleteFile(addedImagePath, onDeleteSuccess, onDeleteError);
        },
        function (error) {
            assert_unreached("Failed to resolve a directory: " + error.message);
        },
        "rw"
    );
}

function ContentManagerObject_content_exist() {
//==== TEST: ContentManagerObject_content_exist
//==== LABEL Check if content attribute exists
//==== SPEC Tizen Web API:Content:Content:ContentManager:ContentManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== PRIORITY P3
//==== TEST_CRITERIA OBME
test(function () {
    assert_true("content" in tizen, "ContentManagerObject should have content attribute");
}, 'ContentManagerObject_content_exist');

}

function ContentManager_updateBatch_exist() {
//==== TEST: ContentManager_updateBatch_exist
//==== LABEL Check if updateBatch exists
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("updateBatch" in tizen.content, "ContentManager should have updateBatch method");
    check_method_exists(tizen.content, "updateBatch");
}, 'ContentManager_updateBatch_exist');

}

function ContentManager_update_exist() {
//==== TEST: ContentManager_update_exist
//==== LABEL Check if update exists
//==== SPEC Tizen Web API:Content:Content:ContentManager:update M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("update" in tizen.content, "ContentManager should have update method");
    check_method_exists(tizen.content, "update");
}, 'ContentManager_update_exist');

}

function ContentManager_getDirectories_exist() {
//==== TEST: ContentManager_getDirectories_exist
//==== LABEL Check if getDirectories method exists
//==== SPEC Tizen Web API:Content:Content:ContentManager:getDirectories M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("getDirectories" in tizen.content, "ContentManager has getDirectories method");
    check_method_exists(tizen.content, "getDirectories");
}, 'ContentManager_getDirectories_exist');

}

function ContentManager_find_exist() {
//==== TEST: ContentManager_find_exist
//==== LABEL Check if find exists
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("find" in tizen.content, "ContentManager should have find method");
    check_method_exists(tizen.content, "find");
}, 'ContentManager_find_exist');

}

function ContentManager_find() {
//==== TEST: ContentManager_find
//==== LABEL Check if ContentManager find method with optional error callback is invoked properly
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA MR
setup({timeout: 30000});

var t = async_test('ContentManager_find', {timeout: 30000}),
    successCallback, errorCallback, retVal = null;

t.step(function () {
    successCallback = t.step_func(function (contents) {
        assert_equals(retVal, undefined, "find should return undefined");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    retVal = tizen.content.find(successCallback, errorCallback);
});

}

function ContentManager_getDirectories() {
//==== TEST: ContentManager_getDirectories
//==== LABEL Check if ContentManager getDirectories method with only non-optional arguments is invoked properly
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:getDirectories M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMINA MR
setup({timeout: 30000});

var t = async_test('ContentManager_getDirectories', {timeout: 30000}),
    successCallback, returnedValue = null;

t.step(function () {
    successCallback = t.step_func(function (directories) {
        assert_type(directories, "array", "directories should be an array");
        assert_greater_than(directories.length, 0, "directories item is not found");
        assert_equals(returnedValue, undefined,
            "getDirectories should return undefined.");
        t.done();
    });

    returnedValue = tizen.content.getDirectories(successCallback);
});

}

function ContentManager_update() {
//==== TEST: ContentManager_update
//==== LABEL Check if update() method works properly
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:update M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MMINA MR
setup({timeout: 30000});

var t = async_test('ContentManager_update', {timeout: 30000}),
    expected, updated = null, returnedValue = null,
    successCallback, errorCallback, onSuccess, onError, i;

setup_contents(t, t.step_func(function () {
    onSuccess = t.step_func(function (contents) {
        assert_equals(contents.length, 1, "updated media item should be found.");
        assert_equals(contents[0].rating, expected, "rating should be updated.");
        assert_equals(returnedValue, undefined,
            "update should return undefined.");
        t.done();
    });

    onError = t.step_func(function (error) {
        assert_unreached("find has an error: " + error.name + " with message: " + error.message);
    });

    successCallback = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0 , "Media item should be found.");
        for (i = 0; i < contents.length; i++) {
            if (contents[i].editableAttributes.indexOf("rating") >= 0) {
                updated = contents[i];
                break;
            }
        }
        assert_not_equals(updated, null, "File with editable 'rating' attribute not found");

        expected = (updated.rating + 1) % 10;
        updated.rating = expected;
        returnedValue = tizen.content.update(updated);
        tizen.content.find(onSuccess, onError, null, new tizen.AttributeFilter("id", "EXACTLY", updated.id));
    });
    errorCallback = t.step_func(function (error) {
        assert_unreached("find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(successCallback, errorCallback, null);
}));

}

function ContentManager_updateBatch() {
//==== TEST: ContentManager_updateBatch
//==== LABEL Check if updateBatch() method works properly
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MOA MR
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch', {timeout: 30000}), updated = [], expected = {}, i, returnedValue = null,
    findAfterEditSuccess, findAfterEditError, updateError, findSuccess, findError,
    filter;

setup_contents(t, t.step_func(function () {
    findAfterEditSuccess = t.step_func(function (contents) {
        assert_equals(returnedValue, undefined,
            "updateBatch should return undefined.");
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 2, "Media items after edit not found");
        assert_equals(contents[0].rating, expected[contents[0].id], "rating should be changed");
        assert_equals(contents[1].rating, expected[contents[1].id], "rating should be changed");
        t.done();
    });

    findAfterEditError = t.step_func(function (error) {
        assert_unreached("find() (after updateBatch()) error callback was invoked: " +
            error.name + " msg: " + error.message);
    });

    updateError = t.step_func(function (error) {
        assert_unreached("updateBatch() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 1, "Media item should be found.");
        for (i = 0; i < contents.length; i++) {
            if (contents[i].editableAttributes.indexOf("rating") >= 0) {
                updated.push(contents[i]);
            }
        }
        assert_greater_than(contents.length, 1,
            "At least two media items with editable 'rating' attribute are needed");

        updated[0].rating = (updated[0].rating + 1) % 10;
        expected[updated[0].id] =  updated[0].rating;

        updated[1].rating = (updated[1].rating + 1) % 10;
        expected[updated[1].id] =  updated[1].rating;

        returnedValue = tizen.content.updateBatch(updated, function () {
            filter = new tizen.CompositeFilter("UNION", [
                new tizen.AttributeFilter("id", "EXACTLY", updated[0].id),
                new tizen.AttributeFilter("id", "EXACTLY", updated[1].id)
            ]);

            tizen.content.find(findAfterEditSuccess, findAfterEditError, null, filter);
        }, updateError);
    });

    findError = t.step_func(function (error) {
        assert_unreached("find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(findSuccess, findError);
}));

}

function Content_type_AUDIO() {
//==== TEST: Content_type_AUDIO
//==== LABEL Check if Content type value is AUDIO for find method with filter AUDIO
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:Content:Content U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA

setup({timeout: 30000});

var t = async_test('Content_type_AUDIO', {timeout: 30000}),
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO"),
    onSuccess, onError, expected = "AUDIO";

setup_contents(t, t.step_func(function () {
    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        assert_equals(contents[0].type, expected, "type value shpuld be AUDIO");
        t.done();
    });

    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function ContentManager_update_description() {
//==== TEST: ContentManager_update_description
//==== LABEL Check if update() properly updates description attribute of first found item
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:update M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MMINA

setup({timeout: 30000});

var t = async_test('ContentManager_update_description', {timeout: 30000}),
    successCallback, errorCallback, onSuccess,
    expected = Math.random().toFixed(10),
    filter = new tizen.AttributeFilter("description", "EXACTLY", expected),
    typeFilter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE"),
    updated = null, i;

setup_contents(t, t.step_func(function () {
    successCallback = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Media item should be found.");

        for(i = 0; i < contents.length; i ++) {
            if (contents[i].editableAttributes.indexOf("description") >= 0) {
                contents[i].description = expected;
                updated = contents[i];
            }
        }

        if (updated === null) {
            assert_unreached("Files do not contain editable 'description' attribute");
        }

        updated.description = expected;
        tizen.content.update(updated);
        tizen.content.find(onSuccess, errorCallback, null, filter);
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Media item should be found.");
        assert_equals(contents[0].description, expected, "update content description");
        t.done();
    });

    tizen.content.find(successCallback, errorCallback, null, typeFilter);
}));

}

function ContentManager_updateBatch_description() {
//==== TEST: ContentManager_updateBatch_description
//==== LABEL Check if updateBatch() method updates properly description of found content
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MOA

setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_description', {timeout: 30000}),
    successCallback, errorCallback, onSuccess, onError, successCB,
    expected = Math.random().toFixed(10),
    desFilter = new tizen.AttributeFilter("description", "EXACTLY", expected),
    findFilter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE"),
    compFilter = new tizen.CompositeFilter("INTERSECTION", [findFilter, desFilter]),
    updated = [], i;

setup_contents(t, t.step_func(function () {

    successCB = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 1, "Media item should be found.");
        assert_equals(contents[0].description, expected, "update contents description");
        t.done();
    });

    onSuccess = t.step_func(function () {
        tizen.content.find(successCB, errorCallback, null, compFilter);
    });
    onError = t.step_func(function (error) {
        assert_unreached("updateBatch() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    successCallback = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Media item should be found.");

        for(i = 0; i < contents.length; i++) {
            if (contents[i].editableAttributes.indexOf("description") >= 0) {
                contents[i].description = expected;
                updated.push(contents[i]);
                break;
            }
        }

        if (updated.length === 0) {
            assert_unreached("File does not contain editable 'description' attribute");
        }

        tizen.content.updateBatch(updated, onSuccess, onError);
    });
    errorCallback = t.step_func(function (error) {
        assert_unreached("find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(successCallback, errorCallback, null, findFilter);
}));

}

function Content_type_IMAGE() {
//==== TEST: Content_type_IMAGE
//==== LABEL Check if Content type value is IMAGE for find method with filter IMAGE
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:Content:Content U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA

setup({timeout: 30000});

var t = async_test('Content_type_IMAGE', {timeout: 30000}),
    filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE"),
    onSuccess, onError, expected = "IMAGE";

setup_contents(t, t.step_func(function () {
    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        assert_equals(contents[0].type, expected, "type value should be IMAGE");
        t.done();
    });

    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function Content_type_VIDEO() {
//==== TEST: Content_type_VIDEO
//==== LABEL Check if Content type value is VIDEO for find method with filter VIDEO
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:Content:Content U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA

setup({timeout: 30000});

var t = async_test('Content_type_VIDEO', {timeout: 30000}),
    filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO"),
    onSuccess, onError, expected = "VIDEO";

setup_contents(t, t.step_func(function () {
    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        assert_equals(contents[0].type, expected, "type value should be VIDEO");
        t.done();
    });

    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function ContentManager_find_nullableArgs() {
//==== TEST: ContentManager_find_nullableArgs
//==== LABEL Check if Content find method performs successCallback when all optional arguments are null
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMINA
setup({timeout: 30000});

var t = async_test('ContentManager_find_nullableArgs', {timeout: 30000}),
    successCallback;

t.step(function () {
    successCallback = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        t.done();
    });

    tizen.content.find(successCallback, null, null, null, null, null, null);
});

}

function VideoContent_notexist() {
//==== TEST: VideoContent_notexist
//==== LABEL Check if VideoContent cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:VideoContent:VideoContent U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("VideoContent");
}, 'VideoContent_notexist');

}

function Content_notexist() {
//==== TEST: Content_notexist
//==== LABEL Check if Content cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:Content:Content U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("Content");
}, 'Content_notexist');

}

function ImageContent_notexist() {
//==== TEST: ImageContent_notexist
//==== LABEL Check if ImageContent cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:ImageContent:ImageContent U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("ImageContent");
}, 'ImageContent_notexist');

}

function ContentDirectoryArraySuccessCallback_notexist() {
//==== TEST: ContentDirectoryArraySuccessCallback_notexist
//==== LABEL Check if ContentDirectoryArraySuccessCallback cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:ContentDirectoryArraySuccessCallback:ContentDirectoryArraySuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("ContentDirectoryArraySuccessCallback");
}, 'ContentDirectoryArraySuccessCallback_notexist');

}

function ContentScanSuccessCallback_notexist() {
//==== TEST: ContentScanSuccessCallback_notexist
//==== LABEL Check if ContentScanSuccessCallback cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:ContentScanSuccessCallback:ContentScanSuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("ContentScanSuccessCallback");
}, 'ContentScanSuccessCallback_notexist');

}

function ContentManager_notexist() {
//==== TEST: ContentManager_notexist
//==== LABEL Check if ContentManager cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:ContentManager:ContentManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("ContentManager");
}, 'ContentManager_notexist');

}

function ContentManager_extend() {
//==== TEST: ContentManager_extend
//==== LABEL Check if content object can have new properties added
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:ContentManager:ContentManager U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA OBX
test(function () {
    check_extensibility(tizen.content);
}, 'ContentManager_extend');

}

function ContentManager_update_missarg() {
//==== TEST: ContentManager_update_missarg
//==== LABEL Check if update method called with missing non-optional argument throws an exception
//==== SPEC Tizen Web API:Content:Content:ContentManager:update M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.content.update();
    }, "update() invoked without non-optional arguments.");
}, 'ContentManager_update_missarg');

}

function ContentManager_update_content_TypeMismatch() {
//==== TEST: ContentManager_update_content_TypeMismatch
//==== LABEL Check if update throws exception when content is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:update M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_update_content_TypeMismatch', {timeout: 30000}),
    exceptionName = "TypeMismatchError", conversionTable, i, content;

t.step(function () {
    conversionTable = getTypeConversionExceptions("object", false);

    for(i = 0; i < conversionTable.length; i++) {
        content = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.update(content);
            }, "update() invoked with incorrect content.");
    }

    t.done();
});

}

function ContentManager_updateBatch_missarg() {
//==== TEST: ContentManager_updateBatch_missarg
//==== LABEL Check if updateBatch method called with missing non-optional argument throws an exception
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.content.updateBatch();
    }, "UpdateBatch was invoked without non-optional argumenents");
}, 'ContentManager_updateBatch_missarg');

}

function ContentManager_updateBatch_contents_TypeMismatch() {
//==== TEST: ContentManager_updateBatch_contents_TypeMismatch
//==== LABEL Check if updateBatch throws exception when contents is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_contents_TypeMismatch', {timeout: 30000}),
    exceptionName = "TypeMismatchError", conversionTable, i, contents;

t.step(function () {
    conversionTable = getTypeConversionExceptions("array", false);

    for(i = 0; i < conversionTable.length; i++) {
        contents = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.update(contents);
            }, "Given incorrect contents.");
    }

    t.done();
});

}

function ContentManager_updateBatch_successCallback_TypeMismatch() {
//==== TEST: ContentManager_updateBatch_successCallback_TypeMismatch
//==== LABEL Check if updateBatch throws exception when successCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_successCallback_TypeMismatch', {timeout: 30000}),
    conversionTable, successCallback, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    for(i = 0; i < conversionTable.length; i++) {
        successCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.updateBatch([], successCallback);
            }, "Given incorrect successCallback.");
    }

    t.done();
});

}

function ContentManager_updateBatch_successCallback_invalid_cb() {
//==== TEST: ContentManager_updateBatch_successCallback_invalid_cb
//==== LABEL Check if updateBatch throws exception when success callback is invalid
//==== PRIORITY: P2
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTCB
test(function () {
    var exceptionName = "TypeMismatchError", incorrectCallback;

    incorrectCallback = {
        onsuccess: function (items) {
            assert_unreached("Invalid successCallback invoked.");
        }
    };

    assert_throws({name: exceptionName},
        function () {
            tizen.content.updateBatch([], incorrectCallback);
        }, "Given invalid successCallback.");

}, 'ContentManager_updateBatch_successCallback_invalid_cb');

}

function ContentManager_updateBatch_errorCallback_TypeMismatch() {
//==== TEST: ContentManager_updateBatch_errorCallback_TypeMismatch
//==== LABEL Check if updateBatch throws exception when errorCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_errorCallback_TypeMismatch', {timeout: 30000}),
    conversionTable, successCallback, errorCallback, exceptionName, i;

t.step(function () {
    successCallback = t.step_func(function () {
        assert_unreached("updateBatch() success callback should not be invoked.");
    });

    conversionTable = getTypeConversionExceptions("functionObject", true);
    for(i = 0; i < conversionTable.length; i++) {
        errorCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.updateBatch([], successCallback, errorCallback);
            }, "Given incorrect errorCallback.");
    }

    t.done();
});

}

function ContentManager_updateBatch_errorCallback_invalid_cb() {
//==== TEST: ContentManager_updateBatch_errorCallback_invalid_cb
//==== LABEL Check if updateBatch throws exception when errorCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTCB
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_errorCallback_invalid_cb', {timeout: 30000}),
    exceptionName = "TypeMismatchError", successCallback, incorrectCallback;

t.step(function () {

    incorrectCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid errorCallback invoked:" + error.name + " msg: " + error.message);
        })
    };

    successCallback = t.step_func(function () {
        assert_unreached("updateBatch() success callback should not be invoked.");
    });

    assert_throws({name: exceptionName},
        function () {
            tizen.content.updateBatch([], successCallback, incorrectCallback);
        }, "Given incorrect errorCallback.");

    t.done();
});

}

function ContentManager_getDirectories_missarg() {
//==== TEST: ContentManager_getDirectories_missarg
//==== LABEL Check if getDirectories method called with missing non-optional argument throws an exception
//==== SPEC Tizen Web API:Content:Content:ContentManager:getDirectories M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.content.getDirectories();
    }, "Invoked without non-optional arguments.");
}, 'ContentManager_getDirectories_missarg');

}

function ContentManager_getDirectories_successCallback_invalid_cb() {
//==== TEST: ContentManager_getDirectories_successCallback_invalid_cb
//==== LABEL Check if getDirectories throws exception when success callback is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:Content:Content:ContentManager:getDirectories M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTCB
test(function () {
    var exceptionName = "TypeMismatchError", incorrectCallback;

    incorrectCallback = {
        onsuccess: function (items) {
            assert_unreached("Invalid getDirectories() success callback invoked.");
        }
    };

    assert_throws({name: exceptionName},
        function () {
            tizen.content.getDirectories(incorrectCallback);
        }, "Given incorrect successCallback.");

}, 'ContentManager_getDirectories_successCallback_invalid_cb');

}

function ContentManager_getDirectories_successCallback_TypeMismatch() {
//==== TEST: ContentManager_getDirectories_successCallback_TypeMismatch
//==== LABEL Check if getDirectories throws exception when successCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:getDirectories M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_getDirectories_successCallback_TypeMismatch', {timeout: 30000}),
    conversionTable, successCallback, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    for(i = 0; i < conversionTable.length; i++) {
        successCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.getDirectories(successCallback);
            }, "Given incorrect successCallback.");
    }

    t.done();
});

}

function ContentManager_getDirectories_errorCallback_TypeMismatch() {
//==== TEST: ContentManager_getDirectories_errorCallback_TypeMismatch
//==== LABEL Check if getDirectories throws exception when errorCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:getDirectories M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_getDirectories_errorCallback_TypeMismatch', {timeout: 30000}),
    conversionTable, successCallback, errorCallback, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    successCallback = t.step_func(function () {
        assert_unreached("getDirectories() success callback should not be invoked.");
    });

    for(i = 0; i < conversionTable.length; i++) {
        errorCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.getDirectories(successCallback, errorCallback);
            }, "Given incorrect errorCallback.");
    }

    t.done();
});

}

function ContentManager_getDirectories_errorCallback_invalid_cb() {
//==== TEST: ContentManager_getDirectories_errorCallback_invalid_cb
//==== LABEL Check if getDirectories throws exception when errorCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:getDirectories M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTCB
setup({timeout: 30000});

var t = async_test('ContentManager_getDirectories_errorCallback_invalid_cb', {timeout: 30000}),
    exceptionName = "TypeMismatchError", successCallback, incorrectCallback;

t.step(function () {

    incorrectCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid getDirectories() error callback invoked:" + error.name + ": " + error.message);
        })
    };

    successCallback = t.step_func(function () {
        assert_unreached("getDirectories() success callback should not be invoked.");
    });

    assert_throws({name: exceptionName},
        function () {
            tizen.content.getDirectories(successCallback, incorrectCallback);
        }, "Given invalid errorCallback.");

    t.done();
});

}

function ContentManager_find_missarg() {
//==== TEST: ContentManager_find_missarg
//==== LABEL Check if find method called with missing non-optional argument throws an exception
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.content.find();
    }, "Invoked with non-optional arguments.");
}, 'ContentManager_find_missarg');

}

function ContentManager_find_successCallback_TypeMismatch() {
//==== TEST: ContentManager_find_successCallback_TypeMismatch
//==== LABEL Check if find throws exception when successCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_find_successCallback_TypeMismatch', {timeout: 30000}),
    conversionTable, successCallback, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    for(i = 0; i < conversionTable.length; i++) {
        successCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.find(successCallback);
            }, "Given incorrect success callback.");
    }

    t.done();
});

}

function ContentManager_find_successCallback_invalid_cb() {
//==== TEST: ContentManager_find_successCallback_invalid_cb
//==== LABEL Check if find throws exception when success callback is invalid
//==== PRIORITY: P2
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTCB
test(function () {
    var exceptionName = "TypeMismatchError", incorrectCallback;

    incorrectCallback = {
        onsuccess: function (items) {
            assert_unreached("Invalid success callback invoked.");
        }
    };

    assert_throws({name: exceptionName},
        function () {
            tizen.content.find(incorrectCallback);
        }, "Given invalid successCallback.");

}, 'ContentManager_find_successCallback_invalid_cb');

}

function ContentManager_find_errorCallback_TypeMismatch() {
//==== TEST: ContentManager_find_errorCallback_TypeMismatch
//==== LABEL Check if find throws exception when errorCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_find_errorCallback_TypeMismatch', {timeout: 30000}),
    conversionTable, successCallback, errorCallback, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    successCallback = t.step_func(function () {
        assert_unreached("find() success callback should not be invoked.");
    });

    for(i = 0; i < conversionTable.length; i++) {
        errorCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.find(successCallback, errorCallback);
            }, "Given incorrect error callback.");
    }

    t.done();
});

}

function ContentManager_find_errorCallback_invalid_cb() {
//==== TEST: ContentManager_find_errorCallback_invalid_cb
//==== LABEL Check if find throws exception when errorCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTCB
setup({timeout: 30000});

var t = async_test('ContentManager_find_errorCallback_invalid_cb', {timeout: 30000}),
    exceptionName = "TypeMismatchError", successCallback, incorrectCallback;

t.step(function () {

    incorrectCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid error callback invoked:" + error.name + ": " + error.message);
        })
    };

    successCallback = t.step_func(function () {
        assert_unreached("find() success callback should not be invoked.");
    });

    assert_throws({name: exceptionName},
        function () {
            tizen.content.find(successCallback, incorrectCallback);
        }, "Given incorrect errorCallback.");

    t.done();
});

}

function ContentManager_scanFile_exist() {
//==== TEST: ContentManager_scanFile_exist
//==== LABEL Check if scanFile method exists
//==== SPEC Tizen Web API:Content:Content:ContentManager:scanFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("scanFile" in tizen.content, "ContentManager should have scanFile method");
    check_method_exists(tizen.content, "scanFile");
}, 'ContentManager_scanFile_exist');

}

function ContentManager_scanFile_successCallback_TypeMismatch() {
//==== TEST: ContentManager_scanFile_successCallback_TypeMismatch
//==== LABEL Check if scanFile throws exception when successCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:scanFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_scanFile_successCallback_TypeMismatch', {timeout: 30000}),
    conversionTable, successCallback, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    for(i = 0; i < conversionTable.length; i++) {
        successCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.scanFile("", successCallback);
            }, "Given invalid successCallback.");
    }

    t.done();
});

}

function ContentManager_scanFile_successCallback_invalid_cb() {
//==== TEST: ContentManager_scanFile_successCallback_invalid_cb
//==== LABEL Check if scanFile throws exception when success callback is incorrect
//==== PRIORITY: P2
//==== SPEC Tizen Web API:Content:Content:ContentManager:scanFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTCB
test(function () {
    var exceptionName = "TypeMismatchError", incorrectCallback;

    incorrectCallback = {
        onsuccess: function (items) {
            assert_unreached("Invalid scanFile() success callback invoked.");
        }
    };

    assert_throws({name: exceptionName},
        function () {
            tizen.content.scanFile("", incorrectCallback);
        }, "Given incorrect successCallback.");

}, 'ContentManager_scanFile_successCallback_invalid_cb');

}

function ContentManager_scanFile_errorCallback_TypeMismatch() {
//==== TEST: ContentManager_scanFile_errorCallback_TypeMismatch
//==== LABEL Check if scanFile throws exception when errorCallback is invalid
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:scanFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_scanFile_errorCallback_TypeMismatch', {timeout: 30000}),
    conversionTable, successCallback, errorCallback, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("functionObject", true);

    successCallback = t.step_func(function () {
        assert_unreached("scanFile() success callback should not be invoked.");
    });

    for(i = 0; i < conversionTable.length; i++) {
        errorCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.scanFile(successCallback, errorCallback);
            }, "Given invalid errorCallback.");
    }

    t.done();
});

}

function ContentManager_scanFile_errorCallback_invalid_cb() {
//==== TEST: ContentManager_scanFile_errorCallback_invalid_cb
//==== LABEL Check if scanFile throws exception when errorCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:scanFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTCB
setup({timeout: 30000});

var t = async_test('ContentManager_scanFile_errorCallback_invalid_cb', {timeout: 30000}),
    exceptionName = "TypeMismatchError", successCallback, incorrectCallback;

t.step(function () {

    incorrectCallback = {
        onerror: t.step_func(function (error) {
            assert_unreached("Invalid scanFile() errorCallback invoked:" + error.name + ": " + error.message);
        })
    };

    successCallback = t.step_func(function () {
        assert_unreached("scanFile() success callback should not be invoked.");
    });

    assert_throws({name: exceptionName},
        function () {
            tizen.content.scanFile(successCallback, incorrectCallback);
        }, "Given incorrect errorCallback.");

    t.done();
});

}

function ContentManager_setChangeListener_exist() {
//==== TEST: ContentManager_setChangeListener_exist
//==== LABEL Check if setChangeListener exists
//==== SPEC Tizen Web API:Content:Content:ContentManager:setChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("setChangeListener" in tizen.content,
        "ContentManager should have setChangeListener method");
    check_method_exists(tizen.content, "setChangeListener");
}, 'ContentManager_setChangeListener_exist');

}

function ContentArraySuccessCallback_notexist() {
//==== TEST: ContentArraySuccessCallback_notexist
//==== LABEL Check if ContentArraySuccessCallback cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:ContentArraySuccessCallback:ContentArraySuccessCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("ContentArraySuccessCallback");
}, 'ContentArraySuccessCallback_notexist');

}

function ContentDirectory_notexist() {
//==== TEST: ContentDirectory_notexist
//==== LABEL Check if ContentDirectory cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:ContentDirectory:ContentDirectory U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("ContentDirectory");
}, 'ContentDirectory_notexist');

}

function ContentChangeCallback_notexist() {
//==== TEST: ContentChangeCallback_notexist
//==== LABEL Check if ContentChangeCallback cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:ContentChangeCallback:ContentChangeCallback U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBNIO
test(function () {
    check_no_interface_object("ContentChangeCallback");
}, 'ContentChangeCallback_notexist');

}

function AudioContentLyrics_notexist() {
//==== TEST: AudioContentLyrics_notexist
//==== LABEL Check if AudioContentLyrics cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:AudioContentLyrics:AudioContentLyrics U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("AudioContentLyrics");
}, 'AudioContentLyrics_notexist');

}

function AudioContent_notexist() {
//==== TEST: AudioContent_notexist
//==== LABEL Check if AudioContent cannot be called in new expression and as a function or in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:AudioContent:AudioContent U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("AudioContent");
}, 'AudioContent_notexist');

}

function ContentManager_setChangeListener_missarg() {
//==== TEST: ContentManager_setChangeListener_missarg
//==== LABEL Check if setChangeListener method called with missing non-optional argument throws an exception
//==== SPEC Tizen Web API:Content:Content:ContentManager:setChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMA
test(function () {
    assert_throws(TYPE_MISMATCH_EXCEPTION, function () {
        tizen.content.setChangeListener();
    }, "Invoked without non-optional arguments.");
}, 'ContentManager_setChangeListener_missarg');

}

function ContentManager_setChangeListener_changeCallback_TypeMismatch() {
//==== TEST: ContentManager_setChangeListener_changeCallback_TypeMismatch
//==== LABEL Check if setChangeListener throws exception when changeCallback is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:setChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_setChangeListener_changeCallback_TypeMismatch', {timeout: 30000}),
    conversionTable, changeCallback, exceptionName, i;

t.step(function () {
    conversionTable = getTypeConversionExceptions("object", false);

    for(i = 0; i < conversionTable.length; i++) {
        changeCallback = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.setChangeListener(changeCallback);
            }, "Given incorrect changeCallback.");
    }
    t.done();
});

}

function ContentManager_setChangeListener_changeCallback_invalid_cb() {
//==== TEST: ContentManager_setChangeListener_changeCallback_invalid_cb
//==== LABEL Check if setChangeListener throws exception when changeCallback is invalid listener
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:setChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTL
setup({timeout: 30000});

var t = async_test('ContentManager_setChangeListener_changeCallback_invalid_cb', {timeout: 30000}),
    exceptionName, incorrectListeners, i, changeCallback;

t.step(function () {
    incorrectListeners = getListenerConversionExceptions(["oncontentadded",
        "oncontentupdated", "oncontentremoved"]);
    for(i = 0; i < incorrectListeners.length; i++) {
        changeCallback  = incorrectListeners[i][0];
        exceptionName = incorrectListeners[i][1];
        assert_throws({name: exceptionName},
            function () {
                tizen.content.setChangeListener(changeCallback);
            }, "Given invalid changeCallback.");
    }
    t.done();
});

}

function ContentManager_unsetChangeListener_exist() {
//==== TEST: ContentManager_unsetChangeListener_exist
//==== LABEL Check if unsetChangeListener exists
//==== SPEC Tizen Web API:Content:Content:ContentManager:unsetChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA ME
test(function () {
    assert_true("unsetChangeListener" in tizen.content,
        "ContentManager should have unsetChangeListener method");
    check_method_exists(tizen.content, "unsetChangeListener");
}, 'ContentManager_unsetChangeListener_exist');

}

function ImageContent_extend() {
//==== TEST: ImageContent_extend
//==== LABEL Check if ImageContent can have new properties added
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ImageContent:ImageContent U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA OBX
setup({timeout: 30000});

var t = async_test('ImageContent_extend', {timeout: 30000}),
    filter, onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_extensibility(content);
        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function ImageContent_geolocation_attribute() {
//==== TEST: ImageContent_geolocation_attribute
//==== LABEL Check if ImageContent have geolocation attribute with proper type and is writeable
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ImageContent:geolocation A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ASG
setup({timeout: 30000});

var t = async_test('ImageContent_geolocation_attribute', {timeout: 30000}),
    onSuccess, onError, filter, geolocation, i, geolocationExist = false;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "geolocation",
                "Content does not own modifiedDate property.");

            geolocation = new tizen.SimpleCoordinates(5, 5);
            if (contents[i].geolocation !== null) {
                assert_true(contents[i].geolocation instanceof tizen.SimpleCoordinates,
                    "SoundContent.geolocation should be an instance of SimpleCoordinates");
                if (contents[i].geolocation.latitude === 5) {
                    geolocation.latitude = 6;
                }
                if (contents[i].geolocation.longitude === 5) {
                    geolocation.longitude = 6;
                }
                geolocationExist = true;
            }
            contents[i].geolocation = geolocation;

            assert_equals(contents[i].geolocation.latitude, geolocation.latitude,
                "Value of SoundContent.geolocation.latitude should be updated.");
            assert_equals(contents[i].geolocation.longitude, geolocation.longitude,
                "Value of SoundContent.geolocation.latitude should be updated.");
        }
        assert_true(geolocationExist, "Image with geolocation doesn't exist.");

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function ImageContent_width_attribute() {
//==== TEST: ImageContent_width_attribute
//==== LABEL Check if ImageContent have width attribute with proper type, and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ImageContent:width A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('ImageContent_width_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "width", content.width, "number", 100);

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function ImageContent_height_attribute() {
//==== TEST: ImageContent_height_attribute
//==== LABEL Check if ImageContent have height attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ImageContent:height A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('ImageContent_height_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "height", content.height, "number", 100);

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function ImageContent_orientation_attribute() {
//==== TEST: ImageContent_orientation_attribute
//==== LABEL Check if ImageContent have orientation attribute with proper type is writeable and not nullable
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ImageContent:orientation A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ASG AN
setup({timeout: 30000});

var t = async_test('ImageContent_orientation_attribute', {timeout: 30000}),
    onSuccess, onError, filter, i, newValue,
    imageContentOrientation = [
        "NORMAL", "FLIP_HORIZONTAL", "ROTATE_180", "FLIP_VERTICAL", "TRANSPOSE", "ROTATE_90", "TRANSVERSE", "ROTATE_270"
    ];

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            newValue = imageContentOrientation[(imageContentOrientation.indexOf(contents[i].orientation) + 1) % imageContentOrientation.length];
            check_attribute(contents[i], "orientation", contents[i].orientation, "string", newValue);
            assert_in_array(contents[i].orientation, imageContentOrientation, "invalid enum value");
            contents[i].orientation = null;
            assert_equals(contents[i].orientation, newValue,
                "ImageContent.orientation should not accept null as value.");
        }

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function ContentDirectoryArraySuccessCallback_onsuccess() {
//==== TEST: ContentDirectoryArraySuccessCallback_onsuccess
//==== LABEL Check if ContentDirectoryArraySuccessCallback onsuccess is called and if its arguments have proper type
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentDirectoryArraySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 30000});

var t = async_test('ContentDirectoryArraySuccessCallback_onsuccess', {timeout: 30000}),
    onSuccess, onError, directory;

t.step(function () {
    onSuccess = t.step_func(function (directories) {
        assert_type(directories, "array", "directories should be an array");
        assert_greater_than(directories.length, 0, "directories were not found");

        directory = directories[0];
        assert_type(directory.id, "string", "id should be a string");
        assert_type(directory.directoryURI, "string", "directoryURI should be a string");
        assert_type(directory.title, "string", "title should be a string");
        assert_type(directory.storageType, "string", "storageType should be a string");

        if(directories.modifiedDate !== null) {
            assert_type(directory.modifiedDate, "date", "modifiedDate should be a date");
        }

        t.done();
    });
    onError = t.step_func(function (error) {
        assert_unreached("getDirectories() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.getDirectories(onSuccess, onError);
});

}

function ContentScanSuccessCallback_onsuccess() {
//==== TEST: ContentScanSuccessCallback_onsuccess
//==== LABEL Check if ContentScanSuccessCallback onsuccess is called and if its arguments have proper type
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentScanSuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBOA CBT
setup({timeout: 30000});

var t = async_test('ContentScanSuccessCallback_onsuccess', {timeout: 30000}),
    onSuccess, onError, onSuccessCB, onErrorCB;

t.step(function () {
    onErrorCB = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccessCB = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        onSuccess = t.step_func(function (directoryURI) {
            assert_type(directoryURI, "string", "directoryURI should be a string");
            t.done();
        });

        onError = t.step_func(function (error) {
            assert_unreached("scanFile error callback was invoked: " + error.name + " msg: " + error.message);
        });

        tizen.content.scanFile(contents[0].contentURI, onSuccess, onError);
    });

    tizen.content.find(onSuccessCB, onErrorCB);
});

}

function Content_extend() {
//==== TEST: Content_extend
//==== LABEL Check if Content can have new properties added
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:Content U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA OBX
setup({timeout: 30000});

var t = async_test('Content_extend', {timeout: 30000}),
    onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_extensibility(content);
        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_editableAttributes_attribute() {
//==== TEST: Content_editableAttributes_attribute
//==== LABEL Check if Content have editableAttributes attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:editableAttributes A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_editableAttributes_attribute', {timeout: 30000}),
    onSuccess, onError, beforeValues, i, editableExist = false;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "editableAttributes",
                "Content does not own editableAttributes property.");

            if (contents[i].editableAttributes) {
                assert_type(contents[i].editableAttributes, "array",
                    "Content.editableAttributes should be an array");
                assert_type(contents[i].editableAttributes[0], "string",
                    "Content.editableAttributes should be a string.");

                beforeValues = contents[i].editableAttributes;
                contents[i].editableAttributes = ["anotherNeweditableAttributes"];
                assert_equals(contents[i].editableAttributes.length, beforeValues.length,
                    "Content.editableAttributes should be readonly");
                assert_array_equals(contents[i].editableAttributes, beforeValues,
                    "Content.editableAttributes should be readonly");
                editableExist = true;
            }
        }
        assert_true(editableExist, "There is no content having editable attributes.");

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_id_attribute() {
//==== TEST: Content_id_attribute
//==== LABEL Check if Content have id attribute with proper type, and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:id A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_id_attribute', {timeout: 30000}),
    onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "id", content.id, "string", "dummy");

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_name_attribute() {
//==== TEST: Content_name_attribute
//==== LABEL Check if Content have name attribute with proper type is writeable and not nullable
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:name A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ASG AN
setup({timeout: 30000});

var t = async_test('Content_name_attribute', {timeout: 30000}),
    onSuccess, onError, i, nameAtt;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            nameAtt = contents[i].name;
            check_attribute(contents[i], "name", contents[i].name, "string", "dummy");

            check_not_nullable(contents[i], "name");

            contents[i].name = nameAtt;
        }
        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_type_attribute() {
//==== TEST: Content_type_attribute
//==== LABEL Check if Content have type attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:type A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_type_attribute', {timeout: 30000}),
    onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "type", content.type, "string", "dummy");

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_mimeType_attribute() {
//==== TEST: Content_mimeType_attribute
//==== LABEL Check if Content have mimeType attribute with proper mimeType, and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:mimeType A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_mimeType_attribute', {timeout: 30000}),
    onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "mimeType", content.mimeType, "string", "dummy");

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_title_attribute() {
//==== TEST: Content_title_attribute
//==== LABEL Check if Content have title attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:title A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_title_attribute', {timeout: 30000}),
    onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "title", content.title, "string", "dummy");

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_contentURI_attribute() {
//==== TEST: Content_contentURI_attribute
//==== LABEL Check if Content have contentURI attribute with proper contentURI and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:contentURI A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_contentURI_attribute', {timeout: 30000}),
    onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "contentURI", content.contentURI, "string", "dummy");

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_thumbnailURIs_attribute() {
//==== TEST: Content_thumbnailURIs_attribute
//==== LABEL Check if Content have thumbnailURIs attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:thumbnailURIs A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_thumbnailURIs_attribute', {timeout: 30000}),
    onSuccess, onError, beforeValues, filter, i;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "thumbnailURIs",
                "Content does not own thumbnailURIs property.");
            assert_type(contents[i].thumbnailURIs, "array",
                "content.thumbnailURIs should be an array");

            assert_type(contents[i].thumbnailURIs[0], "string",
                "Content.thumbnailURIs should be a string.");

            beforeValues = contents[i].thumbnailURIs;
            if (contents[i].thumbnailURIs[0] === "newThumbnailURIs") {
                contents[i].thumbnailURIs = ["anotherNewThumbnailURIs"];
            } else {
                contents[i].thumbnailURIs = ["newThumbnailURIs"];
            }
            assert_equals(contents[i].thumbnailURIs.length, beforeValues.length,
                "Content.thumbnailURIs should be readonly");
            assert_array_equals(contents[i].thumbnailURIs, beforeValues,
                "Content.thumbnailURIs should be readonly");
        }
        t.done();
    });

    filter = new tizen.AttributeFilter("thumbnailURIs", "EXISTS");
    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function Content_releaseDate_attribute() {
//==== TEST: Content_releaseDate_attribute
//==== LABEL Check if Content have releaseDate attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:releaseDate A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_releaseDate_attribute', {timeout: 30000}),
    onSuccess, onError, i, beforeValue, releaseDateExist = false;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "releaseDate",
                "Content does not own releaseDate property.");

            if(contents[i].releaseDate !== null) {
                assert_type(contents[i].releaseDate, "date", "releaseDate should be a date");
                beforeValue = contents[i].releaseDate;
                contents[i].releaseDate = new Date();
                assert_equals(contents[i].releaseDate.getTime(), beforeValue.getTime(),
                    "Content.releaseDate should be readonly.");
                releaseDateExist = true;
            } else {
                assert_type(contents[i].releaseDate, null,
                    "Attribute releaseDate in Content should be null.");
            }
        }
        assert_true(releaseDateExist, "Did not found attribute releaseDate of AudioContent set to Date.");

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_modifiedDate_attribute() {
//==== TEST: Content_modifiedDate_attribute
//==== LABEL Check if Content have modifiedDate attribute with proper type and is readolny
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:modifiedDate A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_modifiedDate_attribute', {timeout: 30000}),
    onSuccess, onError, beforeValue, i, modifiedDateExist = false;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "modifiedDate",
                "Content does not own modifiedDate property.");

            if(contents[i].modifiedDate !== null) {
                assert_type(contents[i].modifiedDate, "date", "modifiedDate should be a date");
                beforeValue = contents[i].modifiedDate;
                contents[i].modifiedDate = new Date();
                assert_equals(contents[i].modifiedDate.getTime(), beforeValue.getTime(),
                    "Content.modifiedDate should be readonly");
                modifiedDateExist = true;
            }
        }
        assert_true(modifiedDateExist, "There is no not null modifiedDate in Content.");

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_size_attribute() {
//==== TEST: Content_size_attribute
//==== LABEL Check if Content have size attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:size A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//  Check if Content have size attribute with proper type, nullable
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('Content_size_attribute', {timeout: 30000}),
    onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "size", content.size, "number", 0);

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_description_attribute() {
//==== TEST: Content_description_attribute
//==== LABEL Check if Content have description attribute with proper type and is writeable
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:description A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ASG
setup({timeout: 30000});

var t = async_test('Content_description_attribute', {timeout: 30000}),
    onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        if(content.description !== null) {
            check_attribute(content, "description", content.description, "string", "dummy");
        }

        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function Content_rating_attribute() {
//==== TEST: Content_rating_attribute
//==== LABEL Check if Content have rating attribute with proper type, range, is writeable and not nullable
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:Content:rating A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ASG AN AVL
setup({timeout: 30000});

var t = async_test('Content_rating_attribute', {timeout: 30000}),
    onSuccess, onError, i, newValue = 3;

setup_contents(t, t.step_func(function () {
    onError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            if(contents[i].rating === newValue ) {
                newValue++;
            }
            check_attribute(contents[i], "rating", contents[i].rating, "unsigned long",
                newValue);

            contents[i].rating = 11;
            assert_equals(contents[i].rating, newValue,
                "Content.rating should not have value greater than 10.");

            contents[i].rating = -1;
            assert_equals(contents[i].rating, newValue,
                "Content.rating should not have value less than 0.");

            contents[i].rating = null;
            assert_not_equals(contents[i].rating, null,
                "Content.rating should not accept null as value.");
        }
        t.done();
    });

    tizen.content.find(onSuccess, onError);
}));

}

function ContentManager_find_with_errorCallback() {
//==== TEST: ContentManager_find_with_errorCallback
//==== LABEL Check if find called with optional errorCallback is properly invoked
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA
setup({timeout: 30000});

var t = async_test('ContentManager_find_with_errorCallback', {timeout: 30000}),
    successCallback, errorCallback;

t.step(function () {
    successCallback = t.step_func(function (contents) {
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(successCallback, errorCallback);
});

}

function ContentManager_find_with_directoryId() {
//==== TEST: ContentManager_find_with_directoryId
//==== LABEL Check if find called with optional directoryId is properly invoked
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA
setup({timeout: 30000});

var t = async_test('ContentManager_find_with_directoryId', {timeout: 30000}),
    getDirectoriesSuccess, getDirectoriesError, findSuccess, findError, directoryId;

setup_contents(t, t.step_func(function () {

    findSuccess = t.step_func(function (contents) {
        t.done();
    });

    findError = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });
    getDirectoriesSuccess = t.step_func(function (directories) {
        assert_type(directories, "array", "directories should be an array");
        assert_greater_than(directories.length, 0, "directories item is not found");

        directoryId = directories[0].id;
        tizen.content.find(findSuccess, findError, directoryId);
    });

    getDirectoriesError = t.step_func(function (error) {
        assert_unreached("getDirectories() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.getDirectories(getDirectoriesSuccess, getDirectoriesError);
}));

}

function ContentManager_find_with_filter() {
//==== TEST: ContentManager_find_with_filter
//==== LABEL Check if find called with optional filter is properly invoked
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA
setup({timeout: 30000});

var t = async_test('ContentManager_find_with_filter', {timeout: 30000}),
    successCallback, errorCallback, filter;

t.step(function () {
    successCallback = t.step_func(function (contents) {
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");
    tizen.content.find(successCallback, errorCallback, null, filter);
});

}

function ContentManager_find_with_sortMode() {
//==== TEST: ContentManager_find_with_sortMode
//==== LABEL Check if find called with optional sortMode is properly invoked
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA
setup({timeout: 30000});

var t = async_test('ContentManager_find_with_sortMode', {timeout: 30000}),
    successCallback, errorCallback, sortMode;

t.step(function () {
    successCallback = t.step_func(function (contents) {
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    sortMode = new tizen.SortMode("name", "ASC");
    tizen.content.find(successCallback, errorCallback, null, null, sortMode);
});

}

function ContentManager_find_with_count() {
//==== TEST: ContentManager_find_with_count
//==== LABEL Check if find called with optional count is properly invoked
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA
setup({timeout: 30000});

var t = async_test('ContentManager_find_with_count', {timeout: 30000}),
    successCallback, errorCallback, count = 1;

t.step(function () {
    successCallback = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, count, "unexpected result");

        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(successCallback, errorCallback, null, null, null, count);
});

}

function ContentManager_find_with_offset() {
//==== TEST: ContentManager_find_with_offset
//==== LABEL Check if find called with optional offset is properly invoked
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA
setup({timeout: 30000});

var t = async_test('ContentManager_find_with_offset', {timeout: 30000}),
    successCallback, errorCallback, offset;

t.step(function () {
    successCallback = t.step_func(function (contents) {
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(successCallback, errorCallback, null, null, null, 1, offset);
});

}

function ContentManager_getDirectories_with_errorCallback() {
//==== TEST: ContentManager_getDirectories_with_errorCallback
//==== LABEL Check if getDirectories called with optional errorCallback is invoked properly
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:getDirectories M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA MR
setup({timeout: 30000});

var t = async_test('ContentManager_getDirectories_with_errorCallback', {timeout: 30000}),
    successCallback, errorCallback, returnedValue = null;

t.step(function () {
    errorCallback = t.step_func(function (error) {
        assert_unreached("getDirectories() error callback was invoked:" + error.name + ": " + error.message);
    });

    successCallback = t.step_func(function (directories) {
        assert_equals(returnedValue, undefined,
            "getDirectories should return undefined.");
        t.done();
    });

    returnedValue = tizen.content.getDirectories(successCallback, errorCallback);
});

}

function ContentManager_find_filter_TypeMismatch() {
//==== TEST: ContentManager_find_filter_TypeMismatch
//==== LABEL Check if find throws exception when filter is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_find_filter_TypeMismatch', {timeout: 30000}),
    successCallback, errorCallback, filter, i, conversionTable, exceptionName;

t.step(function () {
    successCallback = t.step_func(function (contents) {
        assert_unreached("find() success callback should not be invoked.");
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("find() error callback should not be invoked: " + error.name + ": " + error.message);
    });

    conversionTable = getTypeConversionExceptions("object", true);

    for(i = 0; i < conversionTable.length; i++) {
        filter = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.find(successCallback, errorCallback, null, filter);
            }, "Given invalid filter");
    }

    t.done();
});

}

function ContentManager_find_sortMode_TypeMismatch() {
//==== TEST: ContentManager_find_sortMode_TypeMismatch
//==== LABEL Check if find throws exception when sortMode is incorrect
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MC
setup({timeout: 30000});

var t = async_test('ContentManager_find_sortMode_TypeMismatch', {timeout: 30000}),
    successCallback, errorCallback, sortMode, i, conversionTable, exceptionName;

t.step(function () {
    successCallback = t.step_func(function (contents) {
        assert_unreached("find() success callback should not be invoked.");
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("find() error callback should not be invoked: " + error.name + ": " + error.message);
    });

    conversionTable = getTypeConversionExceptions("object", true);

    for(i = 0; i < conversionTable.length; i++) {
        sortMode = conversionTable[i][0];
        exceptionName = conversionTable[i][1];

        assert_throws({name: exceptionName},
            function () {
                tizen.content.find(successCallback, errorCallback, null, null, sortMode);
            }, "Given incorrect sortMode");
    }

    t.done();
});

}

function ContentManager_find_sortMode_invalid_obj() {
//==== TEST: ContentManager_find_sortMode_invalid_obj
//==== LABEL Check if find throws exception when sortMode is a simple object
//==== PRIORITY: P2
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:find M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MTO
setup({timeout: 30000});

var t = async_test('ContentManager_find_sortMode_invalid_obj', {timeout: 30000}),
    exceptionName = "TypeMismatchError", successCallback, errorCallback, sortMode;

t.step(function () {
    successCallback = t.step_func(function () {
        assert_unreached("find() success callback should not be invoked.");
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("find() error callback should not be invoked: " + error.name + ": " + error.message);
    });

    sortMode = {
        attributeName: "name",
        order: "ASC"
    };

    assert_throws({name: exceptionName},
        function () {
            tizen.content.find(successCallback, errorCallback, null, null, sortMode);
        }, "Given incorrect sortMode.");

    t.done();
});

}

function ContentManager_unsetChangeListener_extra_argument() {
//==== TEST: ContentManager_unsetChangeListener_extra_argument
//==== LABEL Check if unsetChangeListener method can be invoked with extra argument
//==== SPEC Tizen Web API:Content:Content:ContentManager:unsetChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MNAEX
test(function () {
    checkExtraArgument(tizen.content, "unsetChangeListener");
}, 'ContentManager_unsetChangeListener_extra_argument');

}

function ContentArraySuccessCallback_onsuccess() {
//==== TEST: ContentArraySuccessCallback_onsuccess
//==== LABEL Check if ContentArraySuccessCallback onsuccess is called and if its arguments have proper type
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentArraySuccessCallback:onsuccess M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 30000});

var t = async_test('ContentArraySuccessCallback_onsuccess', {timeout: 30000}),
    onSuccess, onError, content;

setup_contents(t, t.step_func(function () {
    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_true(contents.length > 0, "media item is not found");

        content = contents[0];
        check_content_object(content);
        t.done();
    });

    onError = t.step_func(function (error) {
        assert_unreached("Find() errorCallback called: " + error.name + " with message: " + error.message);
    });

    tizen.content.find(onSuccess, onError);
}));

}

function ContentManager_scanFile() {
//==== TEST: ContentManager_scanFile
//==== LABEL Check if scanFile methods works properly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentManager:scanFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMINA MAST MR
setup({timeout: 30000});

var t = async_test('ContentManager_scanFile', {timeout: 30000}), returnedValue = null,
    addedImagePath=SHARED_STORAGE_PATH + "/ContentChangeCallback_oncontentadded.png", changeCallback, onCopySuccess;

setup_contents(t, t.step_func(function () {
    //cleanup after TC
    add_result_callback(function () {
        try {
            tizen.content.unsetChangeListener();
        } catch (err) {}
    });

    changeCallback = {
        oncontentadded: t.step_func(function (content) {
            assert_equals(content.contentURI, "file://" + addedImagePath, "Invalid content passed");
            assert_equals(returnedValue, undefined, "scanFile should return undefined.");

            t.done();
        })
    };

    onCopySuccess = t.step_func(function () {
        tizen.content.setChangeListener(changeCallback);
        returnedValue = tizen.content.scanFile("file://" + addedImagePath, null,
            function (error) {
                assert_unreached("Failed to scan a file: " + addedImagePath + " with message: " + error.message);
            }
        );
    });

    prepare_file_for_scan(addedImagePath, onCopySuccess, t);
}));

}

function ContentManager_scanFile_with_errorCallback() {
//==== TEST: ContentManager_scanFile_with_errorCallback
//==== LABEL Check if scanFile called with optional errorCallback is invoked properly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentManager:scanFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA MR
setup({timeout: 30000});

var t = async_test('ContentManager_scanFile_with_errorCallback', {timeout: 30000}),
    findSuccess, findError, scanSuccess, scanError, returnedValue = null;

setup_contents(t, t.step_func(function () {

    scanError = t.step_func(function (error) {
        assert_unreached("scanFile() error callback ivoked: " + error.name + " msg: " + error.message);
    });
    scanSuccess = t.step_func(function (directoryURI) {
        assert_equals(returnedValue, undefined,
            "update should return undefined.");
        t.done();
    });

    findError = t.step_func(function (error) {
        assert_unreached("find() error callback invoked: " + error.name + " msg: " + error.message);
    });
    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        returnedValue = tizen.content.scanFile(contents[0].contentURI, scanSuccess, scanError);
    });

    tizen.content.find(findSuccess, findError);
}));

}

function ContentManager_scanFile_with_successCallback() {
//==== TEST: ContentManager_scanFile_with_successCallback
//==== LABEL Check if scanFile called with optional successCallback is invoked properly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentManager:scanFile M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA MR
setup({timeout: 30000});

var t = async_test('ContentManager_scanFile_with_successCallback', {timeout: 30000}),
    findSuccess, findError, scanSuccess, returnedValue = null;

setup_contents(t, t.step_func(function () {

    scanSuccess = t.step_func(function (directoryURI) {
        assert_equals(returnedValue, undefined,
            "update should return undefined.");
        t.done();
    });

    findError = t.step_func(function (error) {
        assert_unreached("find() error callback invoked: " + error.name + " msg: " + error.message);
    });
    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        returnedValue = tizen.content.scanFile(contents[0].contentURI, scanSuccess);
    });

    tizen.content.find(findSuccess, findError);
}));

}

function ContentManager_unsetChangeListener() {
//==== TEST: ContentManager_unsetChangeListener
//==== LABEL Check if unsetChangeListener method called with non-optional arguments does what it should
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:unsetChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MNA MNAST MR

setup({timeout: 30000});

var t = async_test('ContentManager_unsetChangeListener', {timeout: 30000}), onSuccess, onError, retVal = null,
    changeCallback, filter, description = "changeCallback";
t.step(function () {
    changeCallback= {
        oncontentadded: t.step_func(function (content) {
            assert_unreached("Listener oncontentadded invoked.");
        }),
        oncontentupdated: t.step_func(function (content) {
            assert_unreached("Listener oncontentupdated invoked.");
        }),
        oncontentremoved: t.step_func(function (id) {
            assert_unreached("Listener oncontentremoved invoked.");
        })
    };
    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        contents[0].description = description;
        tizen.content.update(contents[0]);
    });
    onError = t.step_func(function (error) {
        assert_unreached("find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.setChangeListener(changeCallback);
    retVal = tizen.content.unsetChangeListener();
    assert_equals(retVal, undefined, "unsetChangeListener should not return anything");

    filter = new tizen.AttributeFilter("description", "EXISTS");
    tizen.content.find(onSuccess, onError, null, filter);

    setTimeout(t.step_func(function () {
        t.done();
    }), 500);
});

}

function VideoContent_extend() {
//==== TEST: VideoContent_extend
//==== LABEL Check if VideoContent can have new properties added
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:VideoContent:VideoContent U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA OBX
setup({timeout: 30000});

var t = async_test('VideoContent_extend', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_extensibility(content);
        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function VideoContent_geolocation_attribute() {
//==== TEST: VideoContent_geolocation_attribute
//==== LABEL Check if VideoContent have geolocation attribute with proper type and is writeable
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:VideoContent:geolocation A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ASG
setup({timeout: 30000});

var t = async_test('VideoContent_geolocation_attribute', {timeout: 30000}),
    onSuccess, onError, filter, geolocation, i;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "geolocation",
                "Content does not own modifiedDate property.");

            geolocation = new tizen.SimpleCoordinates(5, 5);
            if (contents[i].geolocation !== null) {
                assert_true(contents[i].geolocation instanceof tizen.SimpleCoordinates,
                    "VideoContent.geolocation should be an instance of SimpleCoordinates");
                if (contents[i].geolocation.latitude === 5) {
                    geolocation.latitude = 6;
                }
                if (contents[i].geolocation.longitude === 5) {
                    geolocation.longitude = 6;
                }
            }
            contents[i].geolocation = geolocation;

            assert_equals(contents[i].geolocation.latitude, geolocation.latitude,
                "Value of VideoContent.geolocation.latitude should be updated.");
            assert_equals(contents[i].geolocation.longitude, geolocation.longitude,
                "Value of VideoContent.geolocation.latitude should be updated.");
        }
        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function VideoContent_height_attribute() {
//==== TEST: VideoContent_height_attribute
//==== LABEL Check if VideoContent have height attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:VideoContent:height A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('VideoContent_height_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "height", content.height, "number", 100);

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function VideoContent_width_attribute() {
//==== TEST: VideoContent_width_attribute
//==== LABEL Check if VideoContent have width attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:VideoContent:width A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('VideoContent_width_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "width", content.width, "number", 100);

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function VideoContent_duration_attribute() {
//==== TEST: VideoContent_duration_attribute
//==== LABEL Check if VideoContent have duration attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:VideoContent:duration A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('VideoContent_duration_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "duration", content.duration, "number", 100);

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function VideoContent_album_attribute() {
//==== TEST: VideoContent_album_attribute
//==== LABEL Check if VideoContent have album attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:VideoContent:album A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('VideoContent_album_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        if(content.album !== null) {
            check_readonly(content, "album", content.album, "string", "MyAlbum");
        }

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function VideoContent_artists_attribute() {
//==== TEST: VideoContent_artists_attribute
//==== LABEL Check if VideoContent have artists attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:VideoContent:artists A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('VideoContent_artists_attribute', {timeout: 30000}), onSuccess, onError, beforeValues, i, artistExist = false,
    filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");

setup_contents(t, t.step_func(function () {

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "artists",
                "VideoContent does not own artists property.");
            if (contents[i].artists) {
                assert_type(contents[i].artists, "array", "artists should be an array");
                assert_type(contents[i].artists[0], "string", "artists item should be a string");

                beforeValues = contents[i].artists;
                if (contents[i].artists[0] === "newArtist") {
                    contents[i].artists = ["anotherNewArtist"];
                } else {
                    contents[i].artists = ["newArtist"];
                }
                assert_equals(contents[i].artists.length, beforeValues.length, "artists is not readonly");
                assert_array_equals(contents[i].artists, beforeValues, "artists is not readonly");
                artistExist = true;

            } else {
                assert_type(contents[i].artists, null,
                    "VideoContent.artists should be null.");
            }
        }
        assert_true(artistExist, "Did not found attribute artists of VideoContent set to array.");

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function ContentChangeCallback_oncontentadded() {
//==== TEST: ContentChangeCallback_oncontentadded
//==== LABEL Check if ContentChangeCallback oncontentadded is called and if its arguments have proper type
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentChangeCallback:oncontentadded M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 30000});

var t = async_test('ContentChangeCallback_oncontentadded', {timeout: 30000}), changeCallback, onCopySuccess,
        addedImagePath=SHARED_STORAGE_PATH + "/ContentChangeCallback_oncontentadded.png";

t.step(function () {
    //cleanup after TC
    add_result_callback(function () {
        try {
            tizen.content.unsetChangeListener();
        } catch (err) {}
    });

    changeCallback = {
        oncontentadded: t.step_func(function (content) {
            assert_equals(content.contentURI, "file://" + addedImagePath, "Invalid content passed");
            check_content_object(content);

            t.done();
        })
    };

    onCopySuccess = t.step_func(function () {
        tizen.content.setChangeListener(changeCallback);
        tizen.content.scanFile("file://" + addedImagePath, null,
            function (error) {
                assert_unreached("Failed to scan a file: " + addedImagePath + " with message: " + error.message);
            }
        );
    });

    prepare_file_for_scan(addedImagePath, onCopySuccess, t);
});

}

function ContentChangeCallback_oncontentremoved() {
//==== TEST: ContentChangeCallback_oncontentremoved
//==== LABEL Check if ContentChangeCallback oncontentremoved is called and if its arguments have proper type
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentChangeCallback:oncontentremoved M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 30000});

var t = async_test('ContentChangeCallback_oncontentremoved', {timeout: 30000}),
    contentDirectory, sharedDirectory, addedImagePath=SHARED_STORAGE_PATH + "/ContentChangeCallback_oncontentremoved.png",
    addedContent, changeCallback, onCopySuccess, onCopyError, onDeleteSuccess, onDeleteError,
    onScanSuccess, onScanError;

add_result_callback(function (result) {
    sharedDirectory.deleteFile(addedImagePath);
});

t.step(function () {
    //cleanup after TC
    add_result_callback(function () {
        try {
            tizen.content.unsetChangeListener();
        } catch (err) {}
    });

    changeCallback = {
        oncontentadded: t.step_func(function (content) {
            addedContent = content;
        }),
        oncontentremoved: t.step_func(function (id) {
            assert_equals(id, addedContent.id, "Invalid content ID passed");

            t.done();
        })
    };

    onDeleteSuccess = t.step_func(function () {
        tizen.content.scanFile("file://" + addedImagePath);
    });

    onDeleteError = t.step_func(function () {
        assert_unreached("Failed to delete a file: " + addedImagePath);
    });

    onScanSuccess = t.step_func(function () {
        tizen.filesystem.resolve(
            "file://" + SHARED_STORAGE_PATH,
            function (directory) {
                sharedDirectory = directory;
                sharedDirectory.deleteFile(addedImagePath, onDeleteSuccess, onDeleteError);
            },
            function (error) {
                assert_unreached("Failed to resolve a directory with message" + error.message);
            },
            "rw"
        );
    });

    onScanError = t.step_func(function () {
        assert_unreached("Failed to scan a file: " + addedImagePath);
    });

    onCopySuccess = t.step_func(function () {
        tizen.content.scanFile("file://"+addedImagePath, onScanSuccess, onScanError);
    });

    onCopyError = t.step_func(function () {
        assert_unreached("Failed to copy a file to " + addedImagePath);
    });

    tizen.content.setChangeListener(changeCallback);

    tizen.filesystem.resolve(
        "file://" + TEST_CONTENT_DIR_PATH,
        function (directory) {
            contentDirectory = directory;
            contentDirectory.copyTo(TEST_CONTENT_DIR_PATH + TEST_CONTENT_IMAGES[0], addedImagePath, true, onCopySuccess, onCopyError);
        },
        function (error) {
            assert_unreached("Failed to resolve a directory with message" + error.message);
        },
        "r"
    );
});

}

function ContentChangeCallback_oncontentupdated() {
//==== TEST: ContentChangeCallback_oncontentupdated
//==== LABEL Check if ContentChangeCallback oncontentupdated is called and if its arguments have proper type
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentChangeCallback:oncontentupdated M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA CBT CBOA
setup({timeout: 30000});

var t = async_test('ContentChangeCallback_oncontentupdated', {timeout: 30000}),
    changeCallback, testDescription = "TEST DESCRIPTION", onSuccess, onError;

t.step(function () {
    //cleanup after TC
    add_result_callback(function () {
        try {
            tizen.content.unsetChangeListener();
        } catch (err) {}
    });

    changeCallback = {
        oncontentupdated: t.step_func(function (content) {
            assert_type(content, "object", "content should be an object");
            assert_equals(content.description, testDescription, "description should be updated");
            check_content_object(content);

            t.done();
        })
    };

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");
        contents[0].description = testDescription;
        tizen.content.update(contents[0]);
    });
    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.setChangeListener(changeCallback);
    tizen.content.find(onSuccess, onError);
});

}

function ContentManager_updateBatch_with_errorCallback() {
//==== TEST: ContentManager_updateBatch_with_errorCallback
//==== LABEL Check if updateBatch called with optional errorCallback is invoked properly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA MR
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_with_errorCallback', {timeout: 30000}),
    findSuccess, findError, updateBatchSuccess, updateBatchError, content,
    returnedValue = null;

setup_contents(t, t.step_func(function () {

    updateBatchSuccess = t.step_func(function (directoryURI) {
        assert_equals(returnedValue, undefined,
            "updateBatch should return undefined.");
        t.done();
    });
    updateBatchError = t.step_func(function (error) {
        assert_unreached("updateBatch errorCallback called: " + error.name + " with message: " + error.message);
    });

    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Media item should be found.");

        content = contents[0];
        if (content.editableAttributes.indexOf("rating") === 5) {
            content.rating = 6;
        } else {
            content.rating = 5;
        }

        returnedValue = tizen.content.updateBatch([content], updateBatchSuccess, updateBatchError);
    });
    findError = t.step_func(function (error) {
        assert_unreached("find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(findSuccess, findError);
}));

}

function ContentManager_updateBatch_with_successCallback() {
//==== TEST: ContentManager_updateBatch_with_successCallback
//==== LABEL Check if updateBatch called with optional successCallback is invoked properly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MOA MR
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_with_successCallback', {timeout: 30000}),
    findSuccess, findError, updateBatchSuccess, content, returnedValue = null, i;

setup_contents(t, t.step_func(function () {

    updateBatchSuccess = t.step_func(function (directoryURI) {
        assert_equals(returnedValue, undefined,
            "updateBatch should return undefined.");
        t.done();
    });

    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Media item should be found.");

        for (i = 0; i < contents.length; i++) {
            content = contents[i];
            if (content.editableAttributes.indexOf("rating") >= 0) {
                if (content.rating === 5) {
                    content.rating = 6;
                } else {
                    content.rating = 5;
                }
            }
        }

        returnedValue = tizen.content.updateBatch([content], updateBatchSuccess);
    });
    findError = t.step_func(function (error) {
        assert_unreached("find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    tizen.content.find(findSuccess, findError);
}));

}

function AudioContent_album_attribute() {
//==== TEST: AudioContent_album_attribute
//==== LABEL Check if AudioContent have album attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:album A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContent_album_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        if(content.album !== null) {
            check_readonly(content, "album", content.album, "string", "MyAlbum");
            t.done();
        }

        assert_unreached("There are no media items with album property.");
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContent_artists_attribute() {
//==== TEST: AudioContent_artists_attribute
//==== LABEL Check if AudioContent have artists attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:artists A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContent_artists_attribute', {timeout: 30000}), onSuccess, onError, i, beforeValues, artistExist = false,
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

setup_contents(t, t.step_func(function () {

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "artists",
                "AudioContent does not own artists property.");

            if (contents[i].artists) {
                assert_type(contents[i].artists, "array", "artists should be an array");
                assert_type(contents[i].artists[0], "string", "artists items should be a string");

                beforeValues = contents[i].artists;
                if (contents[i].artists[0] === "newArtist") {
                    contents[i].artists = ["anotherNewArtist"];
                } else {
                    contents[i].artists = ["newArtist"];
                }
                assert_equals(contents[i].artists.length, beforeValues.length, "artists is not readonly");
                assert_array_equals(contents[i].artists, beforeValues, "artists is not readonly");
                artistExist = true;
            } else {
                assert_type(contents[i].artists, null,
                    "AudioContent.artists should be null.");
            }
        }
        assert_true(artistExist, "Did not found attribute artists of AudioContent set to array.");

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContent_bitrate_attribute() {
//==== TEST: AudioContent_bitrate_attribute
//==== LABEL Check if AudioContent have bitrate attribute with proper type, readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:bitrate A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContent_bitrate_attribute', {timeout: 30000}),
    onSuccess, onError, filter, i;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            check_readonly(contents[i], "bitrate", contents[i].bitrate, "unsigned long",
                contents[i].bitrate + 1);
        }
        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContent_duration_attribute() {
//==== TEST: AudioContent_duration_attribute
//==== LABEL Check if AudioContent have duration attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:duration A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContent_duration_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_readonly(content, "duration", content.duration, "number", 100);

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContent_extend() {
//==== TEST: AudioContent_extend
//==== LABEL Check if AudioContent can have new properties added
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:AudioContent U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA OBX
setup({timeout: 30000});

var t = async_test('AudioContent_extend', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        check_extensibility(content);
        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContent_trackNumber_attribute() {
//==== TEST: AudioContent_trackNumber_attribute
//==== LABEL Check if AudioContent have trackNumber attribute with proper type, readonly, nullable
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:trackNumber A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContent_trackNumber_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        if(content.trackNumber !== null) {
            check_readonly(content, "trackNumber", content.trackNumber, "number", 100);
            t.done();
        }

        assert_unreached("There are no media items with track number property.");
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContent_genres_attribute() {
//==== TEST: AudioContent_genres_attribute
//==== LABEL Check if AudioContent have genres attribute with proper type, readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:genres A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContent_genres_attribute', {timeout: 30000}), onSuccess, onError, i, beforeValues, genreExist = false,
    filter, filter1, filter2;

setup_contents(t, t.step_func(function () {

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "genres",
                "AudioContent does not own genres property. i =" + i + " TYPE= " + contents[i].type);

            if (contents[i].genres) {
                assert_type(contents[i].genres, "array", "genres should be an array");
                assert_type(contents[i].genres[0], "string",
                    "genres items should be a string");

                beforeValues = contents[i].genres;
                if (contents[i].genres[0] === "newGenre") {
                    contents[i].genres = ["anotherNewGenre"];
                } else {
                    contents[i].genres = ["newGenre"];
                }
                assert_equals(contents[i].genres.length, beforeValues.length, "genres is not readonly");
                assert_array_equals(contents[i].genres, beforeValues, "genres is not readonly");
                genreExist = true;
            } else {
                assert_type(contents[i].genres, null,
                    "AudioContent.genres should be null.");
            }
        }
        assert_true(genreExist, "Did not found attribute genres of AudioContent set to array.");

        t.done();
    });

    filter1 = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO"),
    filter2 = new tizen.AttributeFilter("genres", "EXISTS"),
    filter = new tizen.CompositeFilter("INTERSECTION", [filter1, filter2]);

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContent_composers_attribute() {
//==== TEST: AudioContent_composers_attribute
//==== LABEL Check if AudioContent have composers attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:composers A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContent_composers_attribute', {timeout: 30000}),
    onSuccess, onError, filter, i, beforeValues, composerExist = false;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            assert_own_property(contents[i], "composers",
                "AudioContent does not own composers property.");

            if (contents[i].composers) {
                assert_type(contents[i].composers, "array", "composers should be an array");
                assert_type(contents[i].composers[0], "string",
                    "composers items should be a string");

                beforeValues = contents[i].composers;
                if (contents[i].composers[0] === "newComposer") {
                    contents[i].composers = ["anotherNewComposer"];
                } else {
                    contents[i].composers = ["newComposer"];
                }
                assert_equals(contents[i].composers.length, beforeValues.length, "composers is not readonly");
                assert_array_equals(contents[i].composers, beforeValues, "composers is not readonly");
                composerExist = true;
            } else {
                assert_type(contents[i].composers, null,
                    "AudioContent.composers should be null.");
            }
        }
        assert_true(composerExist, "Did not found attribute composers of AudioContent set to array.");

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContent_copyright_attribute() {
//==== TEST: AudioContent_copyright_attribute
//==== LABEL Check if AudioContent have copyright attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:copyright A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContent_copyright_attribute', {timeout: 30000}),
    onSuccess, onError, filter, content;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        content = contents[0];
        if(content.copyright !== null) {
            check_readonly(content, "copyright", content.copyright, "string", "MyRights");
        }

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContent_lyrics_attribute() {
//==== TEST: AudioContent_lyrics_attribute
//==== LABEL Check if AudioContent have lyrics attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContent:lyrics A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContent_lyrics_attribute', {timeout: 30000}),
    onSuccess, onError, filter, tmp, i;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            if (contents[i].lyrics) {
                assert_own_property(contents[i], "lyrics",
                    "AudioContent does not own composers property.");
                assert_own_property(contents[i].lyrics, "type",
                    "AudioContent.lyrics does not own type property.");
                assert_type(contents[i].lyrics.type, "string",
                    "AudioContent.lyrics.type should be a string.");
                assert_own_property(contents[i].lyrics, "timestamps",
                    "AudioContent.lyrics does not own timestamps property.");
                assert_own_property(contents[i].lyrics, "texts",
                    "AudioContent does not own texts property.");
                assert_type(contents[i].lyrics.texts, "array",
                    "AudioContent.lyrics.texts should be an array.");

                tmp = contents[i].lyrics;
                contents[i].lyrics = undefined;
                assert_not_equals(contents[i].lyrics, undefined, "lyrics should be readonly");
                assert_equals(contents[i].lyrics.type, tmp.type, "lyrics should be readonly");

                if (contents[i].lyrics.timestamps) {
                    assert_equals(contents[i].lyrics.timestamps.length, tmp.timestamps.length, "lyrics should be readonly");
                }

                assert_equals(contents[i].lyrics.texts.length, tmp.texts.length, "lyrics should be readonly");
                t.done();
            }
        }

        assert_unreached("There are no media items with lyrics");
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContentLyrics_extend() {
//==== TEST: AudioContentLyrics_extend
//==== LABEL Check if AudioContentLyrics can have new properties added
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContentLyrics:AudioContentLyrics U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA OBX
setup({timeout: 30000});

var t = async_test('AudioContentLyrics_extend', {timeout: 30000}),
    onSuccess, onError, filter, lyrics, haveLyrics = false, i;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            if(contents[i].lyrics) {
                haveLyrics = true;
                lyrics = contents[i].lyrics;
                check_extensibility(lyrics);
            }
        }

        assert_true(haveLyrics, "there are no media items with lyrics");

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContentLyrics_type_attribute() {
//==== TEST: AudioContentLyrics_type_attribute
//==== LABEL Check if AudioContentLyrics have type attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContentLyrics:type A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContentLyrics_type_attribute', {timeout: 30000}),
    onSuccess, onError, filter, haveLyrics = false, i;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            if(contents[i].lyrics) {
                haveLyrics = true;
                check_readonly(contents[i].lyrics, "type", contents[i].lyrics.type, "string", "dummy");
                assert_in_array(contents[i].lyrics.type, ["SYNCHRONIZED", "UNSYNCHRONIZED"], "invalid enum value");
            }
        }

        assert_true(haveLyrics, "there are no media items with lyrics");

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContentLyrics_timestamps_attribute() {
//==== TEST: AudioContentLyrics_timestamps_attribute
//==== LABEL Check if AudioContentLyrics have timestamps attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContentLyrics:timestamps A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContentLyrics_timestamps_attribute', {timeout: 30000}),
    onSuccess, onError, filter, beforeValues, i;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            if(contents[i].lyrics) {
                assert_own_property(contents[i].lyrics, "timestamps",
                    "AudioContent.lyrics does not own timestamps property.");

                if(contents[i].lyrics.type === "UNSYNCHRONIZED") {
                    assert_equals(contents[i].lyrics.timestamps, undefined,
                        "lyrics.timestamps should be undefined when lyrics are unsynchronized");
                } else {
                    assert_type(contents[i].lyrics.timestamps, "array",
                        "AudioContent.lyrics.timestamps should be an array");
                    assert_greater_than(contents[i].lyrics.timestamps.length, 0,
                        "AudioContent.lyrics.timestamps should not be empty.");
                    assert_type(contents[i].lyrics.timestamps[0], "unsigned long",
                        "AudioContent.lyrics.timestamps should be a string.");

                    beforeValues = contents[i].lyrics.timestamps;
                    contents[i].lyrics.timestamps = [100, -20];
                    assert_equals(contents[i].lyrics.timestamps.length, beforeValues.length,
                        "AudioContent.lyrics.timestamps should be readonly");
                    assert_array_equals(contents[i].lyrics.timestamps, beforeValues,
                        "AudioContent.lyrics.timestamps should be readonly");
                }
                t.done();
            }
        }
        assert_unreached("There are no media items with lyrics");
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function AudioContentLyrics_texts_attribute() {
//==== TEST: AudioContentLyrics_texts_attribute
//==== LABEL Check if AudioContentLyrics have texts attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:AudioContentLyrics:texts A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('AudioContentLyrics_texts_attribute', {timeout: 30000}),
    onSuccess, onError, filter, beforeValues, i, lyricsExist = false;

setup_contents(t, t.step_func(function () {
    filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");

    onError = t.step_func(function (error) {
        assert_unreached("Find() Error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        for(i = 0; i < contents.length; i++) {
            if(contents[i].lyrics) {
                assert_own_property(contents[i].lyrics, "texts",
                    "AudioContent does not own texts property.");
                assert_type(contents[i].lyrics.texts, "array",
                    "AudioContent.lyrics.texts should be an array.");
                assert_greater_than(contents[i].lyrics.texts.length, 0,
                    "AudioContent.lyrics.texts should not be empty.");

                if(contents[i].lyrics.type === "UNSYNCHRONIZED") {
                    assert_equals(contents[i].lyrics.texts.length, 1,
                        "lyrics.texts should have 1 item when lyrics are unsynchronized");
                }
                assert_type(contents[i].lyrics.texts[0], "string",
                    "lyrics.texts should be a string.");

                beforeValues = contents[i].lyrics.texts;
                contents[i].lyrics.texts = ["text1", "text2"];
                assert_array_equals(contents[i].lyrics.texts, beforeValues,
                    "lyrics.texts is not readonly");
                lyricsExist = true;
            } else {
                assert_type(contents[i].lyrics, null,
                    "Attribute lyrics in AudioContent should be null.");
            }
        }
        assert_true(lyricsExist, "Did not found attribute lyrics of AudioContent set to AudioContentLyrics.");

        t.done();
    });

    tizen.content.find(onSuccess, onError, null, filter);
}));

}

function ContentDirectory_extend() {
//==== TEST: ContentDirectory_extend
//==== LABEL Check if ContentDirectory can have new properties added
//==== PRIORITY P3
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentDirectory:ContentDirectory U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA OBX
setup({timeout: 30000});

var t = async_test('ContentDirectory_extend', {timeout: 30000}),
    onSuccess, onError, directory;

t.step(function () {
    onError = t.step_func(function (error) {
        assert_unreached("getDirectories() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (directories) {
        assert_type(directories, "array", "directories should be an array");
        assert_greater_than(directories.length, 0, "directories were not found");

        directory = directories[0];
        check_extensibility(directory);
        t.done();
    });

    tizen.content.getDirectories(onSuccess, onError);
});

}

function ContentDirectory_id_attribute() {
//==== TEST: ContentDirectory_id_attribute
//==== LABEL Check if ContentDirectory have id attribute with proper type, and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentDirectory:id A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('ContentDirectory_id_attribute', {timeout: 30000}),
    onSuccess, onError, directory;

t.step(function () {
    onError = t.step_func(function (error) {
        assert_unreached("getDirectories() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (directories) {
        assert_type(directories, "array", "directories should be an array");
        assert_greater_than(directories.length, 0, "directories were not found");

        directory = directories[0];
        check_readonly(directory, "id", directory.id, "string", "dummy");

        t.done();
    });

    tizen.content.getDirectories(onSuccess, onError);
});

}

function ContentDirectory_directoryURI_attribute() {
//==== TEST: ContentDirectory_directoryURI_attribute
//==== LABEL Check if ContentDirectory have directoryURI attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentDirectory:directoryURI A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('ContentDirectory_directoryURI_attribute', {timeout: 30000}),
    onSuccess, onError, directory;

t.step(function () {
    onError = t.step_func(function (error) {
        assert_unreached("getDirectories() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (directories) {
        assert_type(directories, "array", "directories should be an array");
        assert_greater_than(directories.length, 0, "directories were not found");

        directory = directories[0];
        check_readonly(directory, "directoryURI", directory.directoryURI, "string", "dummy");

        t.done();
    });

    tizen.content.getDirectories(onSuccess, onError);
});

}

function ContentDirectory_title_attribute() {
//==== TEST: ContentDirectory_title_attribute
//==== LABEL Check if ContentDirectory have title attribute with proper type, readonly, not null
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentDirectory:title A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('ContentDirectory_title_attribute', {timeout: 30000}),
    onSuccess, onError, directory;

t.step(function () {
    onError = t.step_func(function (error) {
        assert_unreached("getDirectories() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (directories) {
        assert_type(directories, "array", "directories should be an array");
        assert_greater_than(directories.length, 0, "directories were not found");

        directory = directories[0];
        check_readonly(directory, "title", directory.title, "string", "dummy");
        t.done();
    });

    tizen.content.getDirectories(onSuccess, onError);
});

}

function ContentDirectory_modifiedDate_attribute() {
//==== TEST: ContentDirectory_modifiedDate_attribute
//==== LABEL Check if ContentDirectory have modifiedDate attribute with proper type and is readonly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentDirectory:modifiedDate A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('ContentDirectory_modifiedDate_attribute', {timeout: 30000}),
    onSuccess, onError, beforeValues, i, modifiedDateExist = false;

t.step(function () {
    onError = t.step_func(function (error) {
        assert_unreached("getDirectories() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (directories) {
        assert_type(directories, "array", "directories should be an array");
        assert_greater_than(directories.length, 0, "directories were not found");

        for(i = 0; i < directories.length; i++) {
            assert_own_property(directories[i], "modifiedDate",
                "Content does not own modifiedDate property.");

            if(directories[i].modifiedDate !== null) {
                assert_type(directories[i].modifiedDate, "date",
                    "ContentDirectory.modifiedDate should be a date");
                beforeValues = directories[i].modifiedDate;
                directories[i].modifiedDate = new Date();
                assert_equals(directories[i].modifiedDate.getTime(),
                    beforeValues.getTime(), "modified date should be readonly");
                modifiedDateExist = true;
            }
        }
        assert_true(modifiedDateExist, "There is no folder having modification date.");

        t.done();
    });

    tizen.content.getDirectories(onSuccess, onError);
});

}

function ContentDirectory_storageType_attribute() {
//==== TEST: ContentDirectory_storageType_attribute
//==== LABEL Check if ContentDirectory have storageType attribute with proper type, readonly, not null
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentDirectory:storageType A
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA AE AT ARO
setup({timeout: 30000});

var t = async_test('ContentDirectory_storageType_attribute', {timeout: 30000}),
    onSuccess, onError, directory;

t.step(function () {
    onError = t.step_func(function (error) {
        assert_unreached("getDirectories() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    onSuccess = t.step_func(function (directories) {
        assert_type(directories, "array", "directories should be an array");
        assert_greater_than(directories.length, 0, "directories were not found");

        directory = directories[0];
        check_readonly(directory, "storageType", directory.storageType, "string", "dummy");
        assert_in_array(directory.storageType, ["INTERNAL", "EXTERNAL"], "invalid enum value");
        t.done();
    });

    tizen.content.getDirectories(onSuccess, onError);
});

}

function ContentManager_update_name() {
//==== TEST: ContentManager_update_name
//==== LABEL Check if update() properly updates name attribute of first found item
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:update M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MMINA

setup({timeout: 30000});

var t = async_test('ContentManager_update_name', {timeout: 30000}),
    successCallback, errorCallback, onSuccess, expected, updated = null, i,
    filter, typeFilter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");


setup_contents(t, t.step_func(function () {

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 1, "Updated image item should be found");
        assert_equals(contents[0].name, expected, "name attribute should be updated");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback invoked: " + error.name + " with message: " + error.message);
    });
    successCallback = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Image item should be found");

        for(i = 0; i < contents.length; i ++) {
            if (contents[i].editableAttributes.indexOf("name") >= 0) {
                updated = contents[i];
                break;
            }
        }
        assert_not_equals(updated, null, "Image should contain editable 'name' attribute.");

        updated.name += "updated";
        expected = updated.name;
        tizen.content.update(updated);

        filter = new tizen.AttributeFilter("id", "EXACTLY", updated.id);
        tizen.content.find(onSuccess, errorCallback, null, filter);
    });
    tizen.content.find(successCallback, errorCallback, null, typeFilter);
}));

}

function ContentManager_update_video_geolocation() {
//==== TEST: ContentManager_update_video_geolocation
//==== LABEL Check if update() properly updates geolocation attribute of first found video item
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:update M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MMINA

setup({timeout: 30000});

var t = async_test('ContentManager_update_video_geolocation', {timeout: 30000}),
    successCallback, errorCallback, onSuccess, expected, updated = null, i,
    filter, typeFilter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");

setup_contents(t, t.step_func(function () {

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 1, "Updated video item should be found");

        assert_equals(contents[0].geolocation.latitude, expected.latitude,
            "geolocation latitude attribute should be updated");
        assert_equals(contents[0].geolocation.longitude, expected.longitude,
            "geolocation longitude attribute should be updated");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback invoked: " + error.name + " with message: " + error.message);
    });
    successCallback = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Video item should be found");

        for(i = 0; i < contents.length; i ++) {
            if (contents[i].editableAttributes.indexOf("geolocation") >= 0) {
                updated = contents[i];
                break;
            }
        }
        assert_not_equals(updated, null, "Video should contain editable 'geolocation' attribute.");

        if (updated.geolocation !== null) {
            if (updated.geolocation.latitude === 5) {
                updated.geolocation.latitude = 6;
            } else {
                updated.geolocation.latitude = 5;
            }
            if (updated.geolocation.longitude === 5) {
                updated.geolocation.longitude = 6;
            } else {
                updated.geolocation.longitude = 5;
            }
        } else {
            updated.geolocation = new tizen.SimpleCoordinates(5.555, 5.555);
        }
        expected = updated.geolocation;
        tizen.content.update(updated);

        filter = new tizen.AttributeFilter("id", "EXACTLY", updated.id);
        tizen.content.find(onSuccess, errorCallback, null, filter);
    });
    tizen.content.find(successCallback, errorCallback, null, typeFilter);
}));

}

function ContentManager_update_image_geolocation() {
//==== TEST: ContentManager_update_image_geolocation
//==== LABEL Check if update() properly updates geolocation attribute of first found image item
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:update M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MMINA

setup({timeout: 30000});

var t = async_test('ContentManager_update_image_geolocation', {timeout: 30000}),
    successCallback, errorCallback, onSuccess, expected, updated = null, i,
    filter, typeFilter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");

setup_contents(t, t.step_func(function () {

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 1, "Updated image item should be found");
        assert_equals(contents[0].geolocation.latitude, expected.latitude,
            "geolocation latitude attribute should be updated");
        assert_equals(contents[0].geolocation.longitude, expected.longitude,
            "geolocation longitude attribute should be updated");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback invoked: " + error.name + " with message: " + error.message);
    });
    successCallback = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Image item should be found");

        for(i = 0; i < contents.length; i++) {
            if (contents[i].editableAttributes.indexOf("geolocation") >= 0) {
                updated = contents[i];
                break;
            }
        }
        assert_not_equals(updated, null, "Image should contain editable 'geolocation' attribute.");

        if (updated.geolocation !== null) {
            if (updated.geolocation.latitude === 5) {
                updated.geolocation.latitude = 6;
            } else {
                updated.geolocation.latitude = 5;
            }
            if (updated.geolocation.longitude === 5) {
                updated.geolocation.longitude = 6;
            } else {
                updated.geolocation.longitude = 5;
            }
        } else {
            updated.geolocation = new tizen.SimpleCoordinates(5.555, 5.555);
        }
        expected = updated.geolocation;
        tizen.content.update(updated);

        filter = new tizen.AttributeFilter("id", "EXACTLY", updated.id);
        tizen.content.find(onSuccess, errorCallback, null, filter);
    });
    tizen.content.find(successCallback, errorCallback, null, typeFilter);
}));

}

function ContentManager_update_image_orientation() {
//==== TEST: ContentManager_update_image_orientation
//==== LABEL Check if update() properly updates orientation attribute of first found image item
//==== PRIORITY P1
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:update M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MMINA

setup({timeout: 30000});

var t = async_test('ContentManager_update_image_orientation', {timeout: 30000}),
    successCallback, errorCallback, onSuccess, updated = null, i,
    expected, filter, typeFilter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");

setup_contents(t, t.step_func(function () {

    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 1, "Updated image item should be found");
        assert_equals(contents[0].orientation, expected, "orientation attribute should be updated");
        t.done();
    });

    errorCallback = t.step_func(function (error) {
        assert_unreached("Find() error callback invoked: " + error.name + " with message: " + error.message);
    });
    successCallback = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Image item should be found");

        for(i = 0; i < contents.length; i++) {
            if (contents[i].editableAttributes.indexOf("orientation") >= 0) {
                updated = contents[i];
                break;
            }
        }

        assert_not_equals(updated, null, "Image should contain editable 'orientation' attribute.");

        if (updated.orientation === "NORMAL") {
            updated.orientation = "FLIP_HORIZONTAL";
        } else {
            updated.orientation = "NORMAL";
        }
        expected = updated.orientation;
        tizen.content.update(updated);

        filter = new tizen.AttributeFilter("id", "EXACTLY", updated.id);
        tizen.content.find(onSuccess, errorCallback, null, filter);
    });
    tizen.content.find(successCallback, errorCallback, null, typeFilter);
}));

}

function ContentManager_updateBatch_name() {
//==== TEST: ContentManager_updateBatch_name
//==== LABEL Check if updateBatch() properly updates name attributes of multiple image items
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MOA
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_name', {timeout: 30000}), updated = [], expected = {}, i, findAfterEditSuccess,
    findAfterEditError, updateError, findSuccess, findError, filter;

setup_contents(t, t.step_func(function () {
    findAfterEditSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 2, "Media items after edit not found");
        assert_equals(contents[0].name, expected[contents[0].id], "name should be changed");
        assert_equals(contents[1].name, expected[contents[1].id ], "name should be changed");
        t.done();
    });

    findAfterEditError = t.step_func(function (error) {
        assert_unreached("find() (after updateBatch()) error callback invoked: " + error.name + ", message: " + error.message);
    });

    updateError = t.step_func(function (error) {
        assert_unreached("updateBatch() error callback invoked: " + error.name + ", message: " + error.message);
    });

    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 1, "At least two media items are needed");

        for (i = 0; i < contents.length; i++) {
            if (contents[i].editableAttributes.indexOf("name") >= 0) {
                updated.push(contents[i]);
            }
        }

        assert_greater_than(contents.length, 1,
            "At least two media items with editable 'name' attribute are needed");

        updated[0].name += "update";
        expected[updated[0].id] =  updated[0].name;

        updated[1].name += "update";
        expected[updated[1].id] =  updated[1].name;

        tizen.content.updateBatch(updated, function () {
            filter = new tizen.CompositeFilter("UNION", [
                new tizen.AttributeFilter("id", "EXACTLY", updated[0].id),
                new tizen.AttributeFilter("id", "EXACTLY", updated[1].id)
            ]);

            tizen.content.find(findAfterEditSuccess, findAfterEditError, null, filter);
        }, updateError);
    });

    findError = t.step_func(function (error) {
        assert_unreached("find() error callback invoked: " + error.name + ", message: " + error.message);
    });

    tizen.content.find(findSuccess, findError);
}));

}

function ContentManager_updateBatch_video_geolocation() {
//==== TEST: ContentManager_updateBatch_video_geolocation
//==== LABEL Check if updateBatch() properly updates name attributes of multiple video items
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MOA
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_video_geolocation', {timeout: 30000}), updated = [], expected = {}, i, findAfterEditSuccess,
    findAfterEditError, updateError, findSuccess, findError, typeFilter, filter;

setup_contents(t, t.step_func(function () {
    findAfterEditSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 1, "Media item after edit should be found");

        assert_equals(contents[0].geolocation.latitude, expected[contents[0].id].latitude, "latitude should be changed");
        assert_equals(contents[0].geolocation.longitude, expected[contents[0].id].longitude, "longitude should be changed");

        t.done();
    });

    findAfterEditError = t.step_func(function (error) {
        assert_unreached("find() (after updateBatch()) error callback invoked: " + error.name + ", message: " + error.message);
    });

    updateError = t.step_func(function (error) {
        assert_unreached("updateBatch() error callback invoked: " + error.name + ", message: " + error.message);
    });

    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "At least one media items is needed");

        for (i = 0; i < contents.length; i++) {
            if (contents[i].editableAttributes.indexOf("geolocation") >= 0) {
                updated.push(contents[i]);
                break;
            }
        }
        assert_greater_than(contents.length, 0, "At least one media item with editable 'geolocation' attribute is needed");

        if (updated[0].geolocation !== null) {
            if (updated[0].geolocation.latitude === 5) {
                updated[0].geolocation.latitude = 6;
            } else {
                updated[0].geolocation.latitude = 5;
            }
            if (updated[0].geolocation.longitude === 5) {
                updated[0].geolocation.longitude = 6;
            } else {
                updated[0].geolocation.longitude = 5;
            }
        } else {
            updated[0].geolocation = new tizen.SimpleCoordinates(5.555, 5.555);
        }
        expected[updated[0].id] = updated[0].geolocation;

        tizen.content.updateBatch(updated, function () {
            filter = new tizen.AttributeFilter("id", "EXACTLY", updated[0].id);
            tizen.content.find(findAfterEditSuccess, findAfterEditError, null, filter);
        }, updateError);
    });

    findError = t.step_func(function (error) {
        assert_unreached("find() error callback invoked: " + error.name + ", message: " + error.message);
    });

    typeFilter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");
    tizen.content.find(findSuccess, findError, null, typeFilter);
}));

}

function ContentManager_updateBatch_image_geolocation() {
//==== TEST: ContentManager_updateBatch_image_geolocation
//==== LABEL Check if updateBatch() properly updates geolocation attributes of multiple image items
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MOA
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_image_geolocation', {timeout: 30000}), updated = [], expected = {}, i, findAfterEditSuccess,
    findAfterEditError, updateError, findSuccess, findError, typeFilter, filter;

setup_contents(t, t.step_func(function () {
    findAfterEditSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 2, "Media items after edit should be found.");

        assert_equals(contents[0].geolocation.latitude, expected[contents[0].id].latitude, "latitude should be changed");
        assert_equals(contents[0].geolocation.longitude, expected[contents[0].id].longitude, "longitude should be changed");
        assert_equals(contents[1].geolocation.latitude, expected[contents[1].id].latitude, "latitude should be changed");
        assert_equals(contents[1].geolocation.longitude, expected[contents[1].id].longitude, "longitude should be changed");
        t.done();
    });

    findAfterEditError = t.step_func(function (error) {
        assert_unreached("find() (after updateBatch()) error callback invoked: " + error.name + ", message: " + error.message);
    });

    updateError = t.step_func(function (error) {
        assert_unreached("updateBatch() error callback invoked: " + error.name + ", message: " + error.message);
    });

    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 1, "At least two images should be found.");

        for (i = 0; i < contents.length; i++) {
            if (contents[i].editableAttributes.indexOf("geolocation") >= 0) {
                updated.push(contents[i]);
            }
        }
        assert_greater_than(contents.length, 1, "At least two images with editable 'geolocation' attribute are needed");

        if (updated[0].geolocation !== null) {
            if (updated[0].geolocation.latitude === 5) {
                updated[0].geolocation.latitude = 6;
            } else {
                updated[0].geolocation.latitude = 5;
            }
            if (updated[0].geolocation.longitude === 5) {
                updated[0].geolocation.longitude = 6;
            } else {
                updated[0].geolocation.longitude = 5;
            }
        } else {
            updated[0].geolocation = new tizen.SimpleCoordinates(5.555, 5.55555);
        }
        expected[updated[0].id] =  updated[0].geolocation;

        if (updated[1].geolocation !== null) {
            if (contents[1].geolocation.latitude === 5) {
                contents[1].geolocation.latitude = 6;
            } else {
                contents[1].geolocation.latitude = 5;
            }
            if (contents[1].geolocation.longitude === 5) {
                contents[1].geolocation.longitude = 6;
            } else {
                contents[1].geolocation.longitude = 5;
            }
        } else {
            updated[1].geolocation = new tizen.SimpleCoordinates(5.555, 5.555);
        }
        expected[updated[1].id] =  updated[1].geolocation;

        tizen.content.updateBatch(updated, function () {
            filter = new tizen.CompositeFilter("UNION", [
                new tizen.AttributeFilter("id", "EXACTLY", updated[0].id),
                new tizen.AttributeFilter("id", "EXACTLY", updated[1].id)
            ]);

            tizen.content.find(findAfterEditSuccess, findAfterEditError, null, filter);
        }, updateError);
    });
    findError = t.step_func(function (error) {
        assert_unreached("find() error callback invoked: " + error.name + ", message: " + error.message);
    });

    typeFilter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");
    tizen.content.find(findSuccess, findError, null, typeFilter);
}));

}

function ContentManager_updateBatch_image_orientation() {
//==== TEST: ContentManager_updateBatch_image_orientation
//==== LABEL Check if updateBatch() properly updates orientation attributes of multiple image items
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MAST MOA
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_image_orientation', {timeout: 30000}), updated = [], expected = {}, i, findAfterEditSuccess,
    findAfterEditError, updateError, findSuccess, findError, filter;

setup_contents(t, t.step_func(function () {

    findAfterEditSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_equals(contents.length, 2, "Media items after edit should br found");
        assert_equals(contents[0].orientation, expected[contents[0].id], "orientation should be changed");
        assert_equals(contents[1].orientation, expected[contents[1].id ], "orientation should be changed");
        t.done();
    });

    findAfterEditError = t.step_func(function (error) {
        assert_unreached("find() (after updateBatch()) error callback invoked: " + error.name + ", message: " + error.message);
    });

    updateError = t.step_func(function (error) {
        assert_unreached("updateBatch() error callback invoked: " + error.name + ", message: " + error.message);
    });

    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 1, "At least two images should be found.");
        for (i = 0; i < contents.length; i++) {
            if (contents[i].editableAttributes.indexOf("orientation") >= 0) {
                updated.push(contents[i]);
            }
        }

        assert_greater_than(contents.length, 1,
            "At least two media items with editable 'orientation' attribute are needed");

        if (updated[0].orientation === "NORMAL") {
            updated[0].orientation = "FLIP_HORIZONTAL";
        } else {
            updated[0].orientation = "NORMAL";
        }
        expected[updated[0].id] =  updated[0].orientation;

        if (updated[1].orientation === "NORMAL") {
            updated[1].orientation = "FLIP_HORIZONTAL";
        } else {
            updated[1].orientation = "NORMAL";
        }
        expected[updated[1].id] =  updated[1].orientation;

        tizen.content.updateBatch(updated, function () {
            filter = new tizen.CompositeFilter("UNION", [
                new tizen.AttributeFilter("id", "EXACTLY", updated[0].id),
                new tizen.AttributeFilter("id", "EXACTLY", updated[1].id)
            ]);

            tizen.content.find(findAfterEditSuccess, findAfterEditError, null, filter);
        }, updateError);
    });

    findError = t.step_func(function (error) {
        assert_unreached("find() error callback invoked: " + error.name + ", message: " + error.message);
    });

    tizen.content.find(findSuccess, findError);
}));

}

function ContentManager_setChangeListener() {
//==== TEST: ContentManager_setChangeListener
//==== LABEL Check if setChangeListener method works properly
//==== ONLOAD_DELAY 30
//==== SPEC Tizen Web API:Content:Content:ContentManager:setChangeListener M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMINA MAST MR

setup({timeout: 30000});

var t = async_test('ContentManager_setChangeListener', {timeout: 30000}), onSuccess, onError,
    changeCallback, returnedValue = null, filter, description = "changeCallback_"+ new Date().getTime();
t.step(function () {
    //cleanup after TC
    add_result_callback(function () {
        try {
            tizen.content.unsetChangeListener();
        } catch (err) {}
    });

    changeCallback = {
        oncontentadded: t.step_func(function (content) {

        }),
        oncontentupdated: t.step_func(function (content) {
            assert_equals(content.description, description,
                "updated content has wrong value.");
            assert_equals(returnedValue, undefined,
                "setChangeListener should return undefined.");

            t.done();
        }),
        oncontentremoved: t.step_func(function (id) {

        })
    };
    onSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "media item is not found");

        contents[0].description = description;
        tizen.content.update(contents[0]);
    });
    onError = t.step_func(function (error) {
        assert_unreached("find() error callback was invoked: " + error.name + " msg: " + error.message);
    });
    returnedValue = tizen.content.setChangeListener(changeCallback);
    filter = new tizen.AttributeFilter("description", "EXISTS");
    tizen.content.find(onSuccess, onError, null, filter);
});

}

function ContentManager_updateBatch_without_callback() {
//==== TEST: ContentManager_updateBatch_without_callback
//==== LABEL Check if updateBatch called without callback is invoked properly
//==== ONLOAD_DELAY 30
//==== SPEC: Tizen Web API:Content:Content:ContentManager:updateBatch M
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA MMINA MR
setup({timeout: 30000});

var t = async_test('ContentManager_updateBatch_without_callback', {timeout: 30000}),
    findSuccess, findError, content, returnedValue = null;

setup_contents(t, t.step_func(function () {
    findError = t.step_func(function (error) {
        assert_unreached("find() error callback was invoked: " + error.name + " msg: " + error.message);
    });

    findSuccess = t.step_func(function (contents) {
        assert_type(contents, "array", "contents should be an array");
        assert_greater_than(contents.length, 0, "Media item should be found.");

        content = contents[0];
        if (content.editableAttributes.indexOf("rating") === 5) {
            content.rating = 6;
        } else {
            content.rating = 5;
        }

        returnedValue = tizen.content.updateBatch([content]);
        assert_equals(returnedValue, undefined,
            "updateBatch should return undefined.");
        t.done();
    });

    tizen.content.find(findSuccess, findError);
}));

}

function ContentManagerObject_notexist() {
//==== TEST: ContentManagerObject_notexist
//==== LABEL Check if ContentManagerObject cannot be called in new expression
//==== PRIORITY P3
//==== SPEC Tizen Web API:Content:Content:ContentManagerObject:ContentManagerObject U
//==== SPEC_URL https://developer.tizen.org/help/topic/org.tizen.web.device.apireference/tizen/content.html
//==== TEST_CRITERIA NIO
test(function () {
    check_no_interface_object("ContentManagerObject");
}, 'ContentManagerObject_notexist');

}

var moduleName = "tct-content-tizen-tests";
add_test_case(moduleName, ContentManagerObject_content_exist);
add_test_case(moduleName, ContentManager_updateBatch_exist);
add_test_case(moduleName, ContentManager_update_exist);
add_test_case(moduleName, ContentManager_getDirectories_exist);
add_test_case(moduleName, ContentManager_find_exist);
add_test_case(moduleName, ContentManager_find);
add_test_case(moduleName, ContentManager_getDirectories);
add_test_case(moduleName, ContentManager_update);
add_test_case(moduleName, ContentManager_updateBatch);
add_test_case(moduleName, Content_type_AUDIO);
add_test_case(moduleName, ContentManager_update_description);
add_test_case(moduleName, ContentManager_updateBatch_description);
add_test_case(moduleName, Content_type_IMAGE);
add_test_case(moduleName, Content_type_VIDEO);
add_test_case(moduleName, ContentManager_find_nullableArgs);
add_test_case(moduleName, VideoContent_notexist);
add_test_case(moduleName, Content_notexist);
add_test_case(moduleName, ImageContent_notexist);
add_test_case(moduleName, ContentDirectoryArraySuccessCallback_notexist);
add_test_case(moduleName, ContentScanSuccessCallback_notexist);
add_test_case(moduleName, ContentManager_notexist);
add_test_case(moduleName, ContentManager_extend);
add_test_case(moduleName, ContentManager_update_missarg);
add_test_case(moduleName, ContentManager_update_content_TypeMismatch);
add_test_case(moduleName, ContentManager_updateBatch_missarg);
add_test_case(moduleName, ContentManager_updateBatch_contents_TypeMismatch);
add_test_case(moduleName, ContentManager_updateBatch_successCallback_TypeMismatch);
add_test_case(moduleName, ContentManager_updateBatch_successCallback_invalid_cb);
add_test_case(moduleName, ContentManager_updateBatch_errorCallback_TypeMismatch);
add_test_case(moduleName, ContentManager_updateBatch_errorCallback_invalid_cb);
add_test_case(moduleName, ContentManager_getDirectories_missarg);
add_test_case(moduleName, ContentManager_getDirectories_successCallback_invalid_cb);
add_test_case(moduleName, ContentManager_getDirectories_successCallback_TypeMismatch);
add_test_case(moduleName, ContentManager_getDirectories_errorCallback_TypeMismatch);
add_test_case(moduleName, ContentManager_getDirectories_errorCallback_invalid_cb);
add_test_case(moduleName, ContentManager_find_missarg);
add_test_case(moduleName, ContentManager_find_successCallback_TypeMismatch);
add_test_case(moduleName, ContentManager_find_successCallback_invalid_cb);
add_test_case(moduleName, ContentManager_find_errorCallback_TypeMismatch);
add_test_case(moduleName, ContentManager_find_errorCallback_invalid_cb);
add_test_case(moduleName, ContentManager_scanFile_exist);
add_test_case(moduleName, ContentManager_scanFile_successCallback_TypeMismatch);
add_test_case(moduleName, ContentManager_scanFile_successCallback_invalid_cb);
add_test_case(moduleName, ContentManager_scanFile_errorCallback_TypeMismatch);
add_test_case(moduleName, ContentManager_scanFile_errorCallback_invalid_cb);
add_test_case(moduleName, ContentManager_setChangeListener_exist);
add_test_case(moduleName, ContentArraySuccessCallback_notexist);
add_test_case(moduleName, ContentDirectory_notexist);
add_test_case(moduleName, ContentChangeCallback_notexist);
add_test_case(moduleName, AudioContentLyrics_notexist);
add_test_case(moduleName, AudioContent_notexist);
add_test_case(moduleName, ContentManager_setChangeListener_missarg);
add_test_case(moduleName, ContentManager_setChangeListener_changeCallback_TypeMismatch);
add_test_case(moduleName, ContentManager_setChangeListener_changeCallback_invalid_cb);
add_test_case(moduleName, ContentManager_unsetChangeListener_exist);
add_test_case(moduleName, ImageContent_extend);
add_test_case(moduleName, ImageContent_geolocation_attribute);
add_test_case(moduleName, ImageContent_width_attribute);
add_test_case(moduleName, ImageContent_height_attribute);
add_test_case(moduleName, ImageContent_orientation_attribute);
add_test_case(moduleName, ContentDirectoryArraySuccessCallback_onsuccess);
add_test_case(moduleName, ContentScanSuccessCallback_onsuccess);
add_test_case(moduleName, Content_extend);
add_test_case(moduleName, Content_editableAttributes_attribute);
add_test_case(moduleName, Content_id_attribute);
add_test_case(moduleName, Content_name_attribute);
add_test_case(moduleName, Content_type_attribute);
add_test_case(moduleName, Content_mimeType_attribute);
add_test_case(moduleName, Content_title_attribute);
add_test_case(moduleName, Content_contentURI_attribute);
add_test_case(moduleName, Content_thumbnailURIs_attribute);
add_test_case(moduleName, Content_releaseDate_attribute);
add_test_case(moduleName, Content_modifiedDate_attribute);
add_test_case(moduleName, Content_size_attribute);
add_test_case(moduleName, Content_description_attribute);
add_test_case(moduleName, Content_rating_attribute);
add_test_case(moduleName, ContentManager_find_with_errorCallback);
add_test_case(moduleName, ContentManager_find_with_directoryId);
add_test_case(moduleName, ContentManager_find_with_filter);
add_test_case(moduleName, ContentManager_find_with_sortMode);
add_test_case(moduleName, ContentManager_find_with_count);
add_test_case(moduleName, ContentManager_find_with_offset);
add_test_case(moduleName, ContentManager_getDirectories_with_errorCallback);
add_test_case(moduleName, ContentManager_find_filter_TypeMismatch);
add_test_case(moduleName, ContentManager_find_sortMode_TypeMismatch);
add_test_case(moduleName, ContentManager_find_sortMode_invalid_obj);
add_test_case(moduleName, ContentManager_unsetChangeListener_extra_argument);
add_test_case(moduleName, ContentArraySuccessCallback_onsuccess);
add_test_case(moduleName, ContentManager_scanFile);
add_test_case(moduleName, ContentManager_scanFile_with_errorCallback);
add_test_case(moduleName, ContentManager_scanFile_with_successCallback);
add_test_case(moduleName, ContentManager_unsetChangeListener);
add_test_case(moduleName, VideoContent_extend);
add_test_case(moduleName, VideoContent_geolocation_attribute);
add_test_case(moduleName, VideoContent_height_attribute);
add_test_case(moduleName, VideoContent_width_attribute);
add_test_case(moduleName, VideoContent_duration_attribute);
add_test_case(moduleName, VideoContent_album_attribute);
add_test_case(moduleName, VideoContent_artists_attribute);
add_test_case(moduleName, ContentChangeCallback_oncontentadded);
add_test_case(moduleName, ContentChangeCallback_oncontentremoved);
add_test_case(moduleName, ContentChangeCallback_oncontentupdated);
add_test_case(moduleName, ContentManager_updateBatch_with_errorCallback);
add_test_case(moduleName, ContentManager_updateBatch_with_successCallback);
add_test_case(moduleName, AudioContent_album_attribute);
add_test_case(moduleName, AudioContent_artists_attribute);
add_test_case(moduleName, AudioContent_bitrate_attribute);
add_test_case(moduleName, AudioContent_duration_attribute);
add_test_case(moduleName, AudioContent_extend);
add_test_case(moduleName, AudioContent_trackNumber_attribute);
add_test_case(moduleName, AudioContent_genres_attribute);
add_test_case(moduleName, AudioContent_composers_attribute);
add_test_case(moduleName, AudioContent_copyright_attribute);
add_test_case(moduleName, AudioContent_lyrics_attribute);
add_test_case(moduleName, AudioContentLyrics_extend);
add_test_case(moduleName, AudioContentLyrics_type_attribute);
add_test_case(moduleName, AudioContentLyrics_timestamps_attribute);
add_test_case(moduleName, AudioContentLyrics_texts_attribute);
add_test_case(moduleName, ContentDirectory_extend);
add_test_case(moduleName, ContentDirectory_id_attribute);
add_test_case(moduleName, ContentDirectory_directoryURI_attribute);
add_test_case(moduleName, ContentDirectory_title_attribute);
add_test_case(moduleName, ContentDirectory_modifiedDate_attribute);
add_test_case(moduleName, ContentDirectory_storageType_attribute);
add_test_case(moduleName, ContentManager_update_name);
add_test_case(moduleName, ContentManager_update_video_geolocation);
add_test_case(moduleName, ContentManager_update_image_geolocation);
add_test_case(moduleName, ContentManager_update_image_orientation);
add_test_case(moduleName, ContentManager_updateBatch_name);
add_test_case(moduleName, ContentManager_updateBatch_video_geolocation);
add_test_case(moduleName, ContentManager_updateBatch_image_geolocation);
add_test_case(moduleName, ContentManager_updateBatch_image_orientation);
add_test_case(moduleName, ContentManager_setChangeListener);
add_test_case(moduleName, ContentManager_updateBatch_without_callback);
add_test_case(moduleName, ContentManagerObject_notexist);
