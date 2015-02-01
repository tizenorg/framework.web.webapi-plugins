
var TEST_ROOT_LOCATION = 'downloads';

var UNKNOWN_ERR         = "UnknownError";
var TYPE_MISMATCH_ERR   = "TypeMismatchError";
var IO_ERR              = "IOError";
var INVALID_VALUES_ERR  = "InvalidValuesError";
var SECURITY_ERR        = "SecurityError";
var NOT_FOUND_ERR       = "NotFoundError";

TestEngine.setErrorType(Object);
TestEngine.setErrorField('name');


function isFileObject(obj) {
	return ((obj instanceof Object) && (obj.isDirectory !== undefined));
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
  function on_error(err) {
    TestEngine.test("deleteDirectory() [" + err.name + "]", false);
  }
  function on_success() {
    TestEngine.test("deleteDirectory()", true);
  }
  var cb = TestEngine.registerCallback("deleteDirectory", on_success, on_error);
  try {
    parent.deleteDirectory(dir.fullPath, true, cb.successCallback, cb.errorCallback);
  } catch (e) {
    TestEngine.test("deleteDirectory() [" + e + "]", false);
  }
}

function deleteFile(parent, file) {
  function on_error(err) {
    TestEngine.test("deleteFile() [" + err.name + "]", false);
  }
  function on_success() {
    TestEngine.test("deleteFile()", true);
  }
  var cb = TestEngine.registerCallback("deleteFile", on_success, on_error);
  try {
    parent.deleteFile( file.fullPath, cb.successCallback, cb.errorCallback);
  } catch (e) {
    TestEngine.test("deleteFile() [" + e + "]", false);
  }
}

// For common behaviour use resolve_root_location
function resolve_root(on_success_callback, on_error_callback) {
  var cb = TestEngine.registerCallback("resolve", on_success_callback, on_error_callback);
tizen.filesystem.resolve(TEST_ROOT_LOCATION, cb.successCallback, cb.errorCallback);
}

function resolve_root_location(handler) {
  function on_resolve_error(err) {
    TestEngine.test("resolve() [" + err.name + "]", false);
  }
  function on_resolve_success(file) {
    TestEngine.test("resolve()", isFileObject(file));
    handler(file);
  }
  var cb = TestEngine.registerCallback("resolve", on_resolve_success, on_resolve_error);
  tizen.filesystem.resolve(TEST_ROOT_LOCATION, cb.successCallback, cb.errorCallback);
}

var counter = 1;

function getFileName() {
  var nr = Math.floor(Math.random() * 1000);
  var date = new Date();
  return "test_tizen_filesystem_file_" + nr + "_" + (counter++) + "_"
         + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
}

function getDirName() {
  var nr = Math.floor(Math.random() * 1000);
  var date = new Date();
  return "test_tizen_filesystem_dir_" + nr + "_" + (counter++) + "_"
         + date.getMinutes() + date.getSeconds() + date.getMilliseconds();
}

function createFileForParent(parent) {
  var result = parent.createFile(getFileName());
  TestEngine.test("createFile()", isFile(result));
  return result;
}

function createDirForParent(parent) {
  var result = parent.createDirectory(getDirName());
  TestEngine.test("createDirectory()", isDir(result));
  return result;
}

function testNoExceptionWithMessage(message, fun) {
  var testResult = true;
  try {
    fun();
  }
  catch (e) {
    testResult = false;
  }
  TestEngine.test(message, testResult);
}

function UTC_filesystem_resolve_invalid_pram_success_callback_N_001(){
	var testName = "UTC_filesystem_resolve_invalid_pram_success_callback";

	function onerror(e) {
		TestEngine.test("unexpected onerror() <<< e.name:" + e.name, false);
	}

	var invalid_params = [123, "aaa", true, null, undefined, new Object()];

	for(var i=0; i<invalid_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_params[i] ,
			function() {
				tizen.filesystem.resolve(
						TEST_ROOT_LOCATION,
						invalid_params[i],
						function(e) {
							TestEngine.test("unexpected onerror() <<< e.name:" + e.name, false);
						} 	//errorcallback
					);	// resolve
			},
			TYPE_MISMATCH_ERR
		);		//testPresetError
	}
}

function UTC_filesystem_resolve_invalid_pram_error_callback_N_002(){
	var testName = "UTC_filesystem_resolve_invalid_pram_error_callback";

	var invalid_params = [123, "aaa", true, new Object()];

	for(var i=0; i<invalid_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_params[i] ,
			function() {
				TEST_ROOT_LOCATION,
				tizen.filesystem.resolve(function(){
					TestEngine.test("unexpected onsuccess() <<< ", false);
				}, 		//success callback
				invalid_params[i]	//error callback
				);
			},
			TYPE_MISMATCH_ERR
		);	//	testPresetError
	}
}

function UTC_filesystem_resolve_invalid_pram_location_N_003(){
	var testName = "UTC_filesystem_resolve_invalid_pram_location";

	var invalid_params = [123, true, null, undefined, function(){}, new Object()];

	function onresolveSuccess(){
		TestEngine.test(testName + " unexpected onresolveSuccess() <<< ", false);
	}

	function onresolveError(e){
		TestEngine.assertEqual(testName + " expected onresolveError() <<<", NOT_FOUND_ERR, e.name);
	}

	for(var i=0; i<invalid_params.length; i++){
		var cb = TestEngine.registerCallback("openStream", onresolveSuccess, onresolveError);
		tizen.filesystem.resolve(invalid_params[i], cb.successCallback,cb.errorCallback);
	}
}

function UTC_filesystem_resolve_invalid_pram_mode_N_004(){
	var testName = "UTC_filesystem_resolve_invalid_pram_mode";

	var invalid_type_params = [123, true, function(){}, new Object()];
	for(var i=0; i<invalid_type_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_type_params[i] ,
			function() {
				tizen.filesystem.resolve(
						TEST_ROOT_LOCATION,
						function(){
							TestEngine.test("unexpected onsuccess() <<< " + invalid_value_params[i], false);
						}, 		//success callback
						function(e) {
							TestEngine.test("unexpected onerror() <<< e.name:" + e.name, false);
						}, 	//errorcallback
						invalid_type_params[i]);
			},
			TYPE_MISMATCH_ERR
		);	//testPresetError
	}	//for

	var invalid_value_params = ["k", "abcd"];
	for(var i=0; i<invalid_value_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_value_params[i] ,
			function() {
				tizen.filesystem.resolve(
						TEST_ROOT_LOCATION,
						function(){
							TestEngine.test("unexpected onsuccess() <<< " + invalid_value_params[i], false);
						}, 		//success callback
						function(e) {
							TestEngine.test("unexpected onerror() <<< e.name:" + e.name, false);
						}, 	//errorcallback
						invalid_value_params[i]);
			},
			TYPE_MISMATCH_ERR
		);	//testPresetError
	}//for
}

function UTC_filesystem_listStorage_resolve_all_P_001() {
	tizen.filesystem.listStorages(
		function(storages) {
    			console.log(storages.length);
    			
    			for (var i = 0; i < storages.length; i++) {
    				
    				console.log(storages[i].label);
    				
    				tizen.filesystem.resolve(storages[i].label,
    					function(f) {
    						console.log("resolve ok : " + f.name);
						TestEngine.test("resolve :" + f.name, true);
    					},
    					function(e) {
    						console.log("resolve errror : " + e.name);
						TestEngine.test("resolve :" + e.name, false);
    					});	
    			}
    		},
    		function(e) {
    			console.log(e.name);
			TestEngine.test("resolve :" + e.name, false);
    		});
}

function UTC_filesystem_getstorage_invalid_pram_onsuccess_N_001() {
	var testName = "UTC_filesystem_getstorage_invalid_pram_onsuccess";

	var invalid_type_params = [123, "abc", true, null, undefined, new Object()];
	for(var i=0; i<invalid_type_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_type_params[i] ,
			function() {
				tizen.filesystem.getStorage(
						"MMC",
						invalid_type_params[i], 		//success callback
						function(e) {
							TestEngine.test("unexpected onerror() <<< e.name:" + e.name, false);
						} 	//errorcallback
						);
			},
			TYPE_MISMATCH_ERR
		);
	}//for
}

function UTC_filesystem_getstorage_invalid_pram_onerror_N_002() {
	var testName = "UTC_filesystem_getstorage_invalid_pram_onerror";

	var invalid_type_params = [123, "abc", true, new Object()];
	for(var i=0; i<invalid_type_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_type_params[i] ,
			function() {
				tizen.filesystem.getStorage(
						"MMC",
						function(){
							TestEngine.test("unexpected onsuccess() <<< ", false);
						}, 		//success callback
						invalid_type_params[i] 	//errorcallback
						);
			},
			TYPE_MISMATCH_ERR
		);
	}//for
}

function UTC_filesystem_getstorage_invalid_pram_label_N_003(){
	var testName = "UTC_filesystem_getstorage_invalid_pram_label";

	var invalid_params = [123, true, null, undefined, function(){}, new Object()];

	function onresolveSuccess(){
		TestEngine.test(testName + " unexpected onresolveSuccess() <<< ", false);
	}

	function onresolveError(e){
		TestEngine.assertEqual(testName + " expected onresolveError() <<<", NOT_FOUND_ERR, e.name);
	}

	for(var i=0; i<invalid_params.length; i++){
		var cb = TestEngine.registerCallback("openStream", onresolveSuccess, onresolveError);
		tizen.filesystem.getStorage(invalid_params[i], cb.successCallback,cb.errorCallback);
	}
}

function UTC_filesystem_liststorages_invalid_pram_onsuccess_N_001() {
	var testName = "UTC_filesystem_liststorages_invalid_pram_onsuccess";

	var invalid_type_params = [123, "abc", true, null, undefined, new Object()];
	for(var i=0; i<invalid_type_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_type_params[i] ,
			function() {
				tizen.filesystem.listStorages(
						invalid_type_params[i], 		//success callback
						function(e) {
							TestEngine.test("unexpected onerror() <<< e.name:" + e.name, false);
						} 	//errorcallback
						);
			},
			TYPE_MISMATCH_ERR
		);
	}//for
}

function UTC_filesystem_liststorages_invalid_pram_onerror_N_002() {
	var testName = "UTC_filesystem_liststorages_invalid_pram_onerror";

	var invalid_type_params = [123, "abc", true, new Object()];
	for(var i=0; i<invalid_type_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_type_params[i] ,
			function() {
				tizen.filesystem.listStorages(
						function(){
							TestEngine.test("unexpected onsuccess() <<< ", false);
						}, 		//success callback
						invalid_type_params[i] 	//errorcallback
						);
			},
			TYPE_MISMATCH_ERR
		);
	}//for
}

function UTC_filesystem_addstoragestatechangelistener_invalid_pram_onsuccess_N_001() {
	var testName = "UTC_filesystem_addstoragestatechangelistener_invalid_pram_onsuccess";

	var invalid_type_params = [123, "abc", true, null, undefined, new Object()];
	for(var i=0; i<invalid_type_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_type_params[i] ,
			function() {
				tizen.filesystem.addStorageStateChangeListener(
						invalid_type_params[i], 		//success callback
						function(e) {
							TestEngine.test("unexpected onerror() <<< e.name:" + e.name, false);
						} 	//errorcallback
						);
			},
			TYPE_MISMATCH_ERR
		);
	}//for
}

function UTC_filesystem_addstoragestatechangelistener_invalid_pram_onerror_N_002() {
	var testName = "UTC_filesystem_addstoragestatechangelistener_invalid_pram_onerror";

	var invalid_type_params = [123, "abc", true, new Object()];
	for(var i=0; i<invalid_type_params.length; i++){
		TestEngine.testPresetError(testName + ":" + invalid_type_params[i] ,
			function() {
				tizen.filesystem.addStorageStateChangeListener(
						function(){
							TestEngine.test("unexpected onsuccess() <<< ", false);
						}, 		//success callback
						invalid_type_params[i] 	//errorcallback
						);
			},
			TYPE_MISMATCH_ERR
		);
	}//for
}

function UTC_filesystem_listfiles_invalid_pram_onsuccess_N_001() {
	var testName = "UTC_filesystem_listfiles_invalid_pram_onsuccess";

	var invalid_type_params = [123, "abc", true, null, undefined, new Object()];
	 tizen.filesystem.resolve(
		     "documents",
		     function(dir){
		    	 function onerror(error) {
					 TestEngine.test("unexpected onerror() <<< ", false);
				 }

				for(var i=0; i<invalid_type_params.length; i++){
					TestEngine.testPresetError(testName + ":" + invalid_type_params[i] ,
						function() { dir.listFiles(invalid_type_params, onerror);}, TYPE_MISMATCH_ERR);
				}

			},function(e){
			    	 TestEngine.test("unexpected resolve onerror() <<< ", false);
			}, "r");		//resolve
}

function UTC_filesystem_listfiles_invalid_pram_onerror_N_002() {
	var testName = "UTC_filesystem_listfiles_invalid_pram_onerror";

	var invalid_type_params = [123, "abc", true, new Object()];

	 tizen.filesystem.resolve(
		     "documents",
		     function(dir){
		    	 function onsuccess(error) {
					 TestEngine.test("unexpected onsuccess() <<< ", false);
				 }

				for(var i=0; i<invalid_type_params.length; i++){
					TestEngine.testPresetError(testName + ":" + invalid_type_params[i] ,
						function() { dir.listFiles(onsuccess, invalid_type_params);}, TYPE_MISMATCH_ERR);
				}

			},function(e){
			    	 TestEngine.test("unexpected resolve onerror() <<< ", false);
			}, "r");		//resolve

}

function UTC_filesystem_file_openStream_error_successcb_invalid_param_N_001() {
	var param = new Array(1,   {}, [], true);

	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var file2 = file.createFile(getFileName());

		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.close();
			deleteFile(file, file2);
		}

		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}

		for (var i = 0; i < param.length; i++) {
			TestEngine.testPresetError(
		            "openStream() [TYPE_MISMATCH_ERR]",
		            function() { stream = file2.openStream("rw", param[i], on_openStream_error); },
		            TYPE_MISMATCH_ERR
	          );
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_openStream_error_mode_invalid_param_N_002() {
	var param = new Array(1, [], {}, "x", true, function(){});

	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var file2 = file.createFile(getFileName());

		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.close();
			deleteFile(file, file2);
		}

		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}

		for (var i = 0; i < param.length; i++) {
			TestEngine.testPresetError(
		            "openStream() [TYPE_MISMATCH_ERR]",
		            function() { stream = file2.openStream(param[i], on_openStream_success, on_openStream_error); },
		            TYPE_MISMATCH_ERR
	          );
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_openStream_error_encoding_invalid_param_N_003() {
	var param = new Array(1, [], {}, "333", true, function(){});

	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var file2 = file.createFile(getFileName());

		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.close();
			deleteFile(file, file2);
		}

		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}

		for (var i = 0; i < param.length; i++) {
			TestEngine.testPresetError(
		            "openStream() [INVALID_VALUES_ERR]",
		            function() { stream = file2.openStream("rw", on_openStream_success, on_openStream_error, param[i]); },
		            TYPE_MISMATCH_ERR
	          );
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_readAsText_error_successcb_invalid_param_N_001() {
	var param = new Array(1, null, undefined, {}, [], true);

	var test_content = "Ala ma kota";
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));

		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.write(test_content);
			stream.close();
			function on_readAsText_error(err) {
				TestEngine.test("readAsText() [" + err.name + "]", false);
				deleteFile(file, f);
			}
			function on_readAsText_success(str) {
				TestEngine.test("readAsText()", (str === test_content));
				deleteFile(file, f);
			}

			var cb = {};
			for (var i = 0; i < param.legnth; i++) {
				cb[i] = TestEngine.registerCallback("readAsText", on_readAsText_success, on_readAsText_error);
				f.readAsText(cb[i].successCallback, cb[i].errorCallback, param[i], null);
			}

			for (var i = 0; i < param.length; i++) {
				TestEngine.testPresetError(
			            "readAsText() [TYPE_MISMATCH_ERR]",
			            function() { f.readAsText(param[i], on_readAsText_error); },
			            TYPE_MISMATCH_ERR
		          );
			}
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
			deleteFile(file, f);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_readAsText_error_errorcb_invalid_param_N_002() {
	var param = new Array(1, [], {}, "aa", true);

	var test_content = "Ala ma kota";
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));

		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.write(test_content);
			stream.close();
			function on_readAsText_error(err) {
				TestEngine.test("readAsText() [" + err.name + "]", false);
				deleteFile(file, f);
			}
			function on_readAsText_success(str) {
				TestEngine.test("readAsText()", (str === test_content));
				deleteFile(file, f);
			}

			for (var i = 0; i < param.length; i++) {
				TestEngine.testPresetError(
			            "readAsText() [TYPE_MISMATCH_ERR]",
			            function() { f.readAsText(on_readAsText_success, param[i]); },
			            TYPE_MISMATCH_ERR
		          );
			}
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
			deleteFile(file, f);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_readAsText_error_encoding_invalid_param_N_003() {
	var param = new Array(1, [], {}, true, function(){});

	var test_content = "Ala ma kota";
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));

		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.write(test_content);
			stream.close();
			function on_readAsText_error(err) {
				TestEngine.test("readAsText() [" + err.name + "]", false);
				deleteFile(file, f);
			}
			function on_readAsText_success(str) {
				TestEngine.test("readAsText()", (str === test_content));
				deleteFile(file, f);
			}

			for (var i = 0; i < param.length; i++) {
				TestEngine.testPresetError(
			            "readAsText() [TYPE_MISMATCH_ERR]",
			            function() { f.readAsText(on_readAsText_success, on_readAsText_error, param[i]); },
			            TYPE_MISMATCH_ERR
		          );
			}
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
			deleteFile(file, f);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_copyTo_error_successcb_invalid_param_N_001() {
	var param = new Array(1, [], {}, "aaa", true);

	var g_file = null;
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		g_file = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(g_file));
		function on_copyTo_error(err) {
			TestEngine.test("copyTo() [" + err.name + "]", false);
			deleteFile(file, g_file);
		}
		function on_copyTo_success(file2) {
			TestEngine.test("copyTo()", isFile(file2));
			deleteFile(file, file2);
			deleteFile(file, g_file);
		}

		for (var i = 0; i < param.length; i++) {
			TestEngine.testPresetError(
		            "copyTo() [INVALID_VALUES_ERR]",
		            function() {
		            	file.copyTo(g_file.fullPath, file.fullPath + "/" + getFileName(), true
		            			, param[i], on_copyTo_error);
		            },
		            TYPE_MISMATCH_ERR
	          );
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_copyTo_error_errorcb_invalid_param_N_002() {
	var param = new Array(1, [], {}, "aaa", true);

	var g_file = null;
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		g_file = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(g_file));
		function on_copyTo_error(err) {
			TestEngine.test("copyTo() [" + err.name + "]", false);
			deleteFile(file, g_file);
		}
		function on_copyTo_success(file2) {
			TestEngine.test("copyTo()", isFile(file2));
			deleteFile(file, file2);
			deleteFile(file, g_file);
		}

		for (var i = 0; i < param.length; i++) {
			TestEngine.testPresetError(
		            "copyTo() [TYPE_MISMATCH_ERR]",
		            function() {
		            	file.copyTo(g_file.fullPath, file.fullPath + "/" + getFileName(), true,
		            			on_copyTo_success, param[i]);
		            },
		            TYPE_MISMATCH_ERR
	          );
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_copyTo_error_filepath_invalid_param_N_003() {
	var param = new Array( 1, 0, null, undefined, {}, "aa");
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(root) {
		var dir = createDirForParent(root);
		var file = createFileForParent(dir);
		var i = 0;
		function on_copyTo_error(err) {
			TestEngine.test("copyTo() [" + err.name + "]", err.name == NOT_FOUND_ERR);
			if (i == param.length - 1)
				deleteDirectory(root, dir);
		}
		function on_copyTo_success(copy) {
			TestEngine.test("copyTo()", false);
			TestEngine.test("copyTo()", isDir(copy));
			var child = copy.resolve(file.name);
			TestEngine.test("copyTo()", isFile(child));

			if (i == param.length - 1) {
				deleteDirectory(root, copy);
				deleteDirectory(root, dir);
			}
		}
		var cb = {};
		for (i = 0; i < param.length; i++) {
			cb[i] = TestEngine.registerCallback("copyTo", on_copyTo_success, on_copyTo_error);
			root.copyTo(param[i], root.fullPath + "/" + getDirName(), true,
					cb[i].successCallback, cb[i].errorCallback /*dir.fullPath,*/);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


/* * does not need tc*/
function UTC_filesystem_file_copyTo_error_destination_invalid_param_N_004() {
	TestEngine.test("doesn't need anymore", true);
	return;
	
	var param = new Array( 1, 0, null, undefined, {}, "aa");
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(root) {
		var dir = createDirForParent(root);
		var file = createFileForParent(dir);
		var i = 0;
		function on_copyTo_error(err) {
			TestEngine.test("copyTo() [" + err.name + "]", err.name == NOT_FOUND_ERR);
			if (i == param.length - 1)
				deleteDirectory(root, dir);
		}
		function on_copyTo_success(copy) {
			TestEngine.test("copyTo()", false);
			TestEngine.test("copyTo()", isDir(copy));
			var child = copy.resolve(file.name);
			TestEngine.test("copyTo()", isFile(child));

			if (i == param.length - 1) {
				deleteDirectory(root, copy);
				deleteDirectory(root, dir);
			}
		}
		var cb = {};
		for (i = 0; i < param.length; i++) {
			cb[i] = TestEngine.registerCallback("copyTo", on_copyTo_success, on_copyTo_error);
			root.copyTo(dir.fullPath, param[i], true,
					cb[i].successCallback, cb[i].errorCallback);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_moveTo_error_successcb_invalid_param_N_001() {
	var param = new Array(1, [], {}, false, "aa");

	var g_file = null;
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		g_file = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(g_file));
		function on_moveTo_error(err) {
			TestEngine.test("moveTo() [" + err.name + "]", false);
			deleteFile(file, g_file);
		}
		function on_moveTo_success(file1) {
			TestEngine.test("moveTo()", true);
			deleteFile(file, file1);
		}

		for (var i = 0; i < param.length; i++) {
			TestEngine.testPresetError(
		            "mopyTo() [TYPE_MISMATCH_ERR]",
		            function() {
		            	file.moveTo(g_file.fullPath, file.fullPath + "/" + getFileName(), true,
		            			param[i], on_moveTo_error);
		            },
		            TYPE_MISMATCH_ERR
	          );
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_moveTo_error_errorcb_invalid_param_N_002() {
	var param = new Array(1, {}, [], false, "aa");

	var g_file = null;
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		g_file = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(g_file));
		function on_moveTo_error(err) {
			TestEngine.test("moveTo() [" + err.name + "]", false);
			deleteFile(file, g_file);
		}
		function on_moveTo_success(file1) {
			TestEngine.test("moveTo()", true);
			deleteFile(file, file1);
		}

		for (var i = 0; i < param.length; i++) {
			TestEngine.testPresetError(
		            "mopyTo() [TYPE_MISMATCH_ERR]",
		            function() {
		            	file.moveTo(g_file.fullPath, file.fullPath + "/" + getFileName(), true,
		            			on_moveTo_success, param[i]);
		            },
		            TYPE_MISMATCH_ERR
	          );
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_moveTo_error_originfile_invalid_param_N_003() {
	var param = new Array(1, 0,  {}, "aa");

	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var i = 0;

		function on_moveTo_error(err) {
			TestEngine.test("moveTo()", NOT_FOUND_ERR == err.name);
		}
		function on_moveTo_success(file1) {
			TestEngine.test("moveTo()", false);
			deleteFile(file, file1);
		}
		try {
			var cb = {};

			for (i = 0; i < param.length; i++) {
				try {
					cb[i] = TestEngine.registerCallback("moveTo", on_moveTo_success, on_moveTo_error);
					file.moveTo(param[i], file.fullPath + "/" + getFileName(), true,
							cb[i].successCallback, cb[i].errorCallback);
				}
				catch (e) {
					TestEngine.test("exception " + e.message, false);
				}
			}

		}
		catch (exception) {
			TestEngine.test("exception " + exception.message, false);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_resolve_error_dir_invalid_param_N_001() {
	var param = new Array(1, "aaa", {}, [], false);
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		TestEngine.log("Calling createFile() with invalid characters in path. [NULL OBJECT]");

		for (var i = 0; i < param.length; i++) {
			try {
				var fo = file.resolve(param[i]);
			} catch (e) {
				// TODO: handle exception
				TestEngine.test("coce << " + e.name, true);
			}
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_deleteDirectory_error_successcb_invalid_param_N_001() {
	var param = new Array(1, "aaa", {}, [], false);
	function on_resolve_success(root) {
		var dir = createDirForParent(root);

		function on_deleteDirectory_error(err) {
			TestEngine.test("deleteDirectory()", false);
			deleteDirectory(root, dir);
		}
		function on_deleteDirectory_success() {
			TestEngine.test("deleteDirectory()", true);
		}

		for (var i = 0; i < param.length; i++) {
			TestEngine.testPresetError(
				"deleteDirecotry [TYPE_MISMATCH_ERR]",
				function() {
					root.deleteDirectory( dir.fullPath, true, param[i], on_deleteDirectory_error);
				},
				TYPE_MISMATCH_ERR
			);
		}
	}
	resolve_root_location(on_resolve_success);
}


function UTC_filesystem_file_deleteDirectory_error_errorcb_invalid_param_N_002() {
	var param = new Array(1, "aaa", {}, [], false);
	function on_resolve_success(root) {
		var dir = createDirForParent(root);

		function on_deleteDirectory_error(err) {
			TestEngine.test("deleteDirectory()", false);
			if (dir == length - 1)
				deleteDirectory(root, dir);
		}
		function on_deleteDirectory_success() {
			TestEngine.test("deleteDirectory()", true);
		}

		for (var i = 0; i < param.length; i++) {
			TestEngine.testPresetError(
				"deleteDirecotry [TYPE_MISMATCH_ERR]",
				function() {
					root.deleteDirectory(dir.fullPath, true, on_deleteDirectory_success, param[i]);
				},
				TYPE_MISMATCH_ERR
			);
		}
	}
	resolve_root_location(on_resolve_success);
}

function UTC_filesystem_file_deleteDirectory_error_dir_invalid_param_N_003() {
	var param = new Array(null, undefined, 1, true, false, "aa");
	function on_resolve_success(root) {
		function on_deleteDirectory_success() {
				TestEngine.test("deleteDirectory()", false);
		}
		function on_deleteDirectory_error(err) {
				TestEngine.test("deleteDirectory()", NOT_FOUND_ERR == err.name);
		}

		var i = 0;

		for (i = 0; i < param.length; i++) {
			root.deleteDirectory(param[i], true,on_deleteDirectory_success, on_deleteDirectory_error);
		}
	}

	resolve_root_location(on_resolve_success);
}

function UTC_filesystem_file_deleteFile_error_successcb_invalid_param_N_001() {
	var param = new Array(1, "aaa", {}, [], false);
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var dir = file.createDirectory(getDirName());
		TestEngine.test("createDirectory()", isDir(dir));
		function on_deleteFile_error(err) {
			deleteDirectory(file, dir);
		}
		function on_deleteFile_success() {
			TestEngine.test("deleteFile()", false);
		}

		for (var i = 0; i < param.legnth; i++) {
			TestEngine.testPresetError(
				"Call deleteFile() on a directory.",
				function(){
					file.deleteFile(dir.fullPath, param[i], on_deleteFile_error);
				},
				TYPE_MISMATCH_ERR
			);
		}
		deleteDirectory(file, dir);
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_deleteFile_error_errorcb_invalid_param_N_002() {
	var param = new Array(1, "aaa", {}, [], false);
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var dir = file.createDirectory(getDirName());
		TestEngine.test("createDirectory()", isDir(dir));
		function on_deleteFile_error(err) {
			deleteDirectory(file, dir);
		}
		function on_deleteFile_success() {
			TestEngine.test("deleteFile()", false);
		}

		for (var i = 0; i < param.legnth; i++) {
			TestEngine.testPresetError(
				"Call deleteFile() on a directory.",
				function(){
					file.deleteFile(dir.fullPath, on_deleteFile_success, param[i]);
				},
				TYPE_MISMATCH_ERR
			);
		}
		deleteDirectory(file, dir);
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_deleteFile_error_dir_invalid_param_N_003() {
	var param = new Array(1, null, undefined, "aaa", {}, false);
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {

		
		function on_deleteFile_error(err) {
			TestEngine.test("deleteFile()", NOT_FOUND_ERR == err.name);

		}
		function on_deleteFile_success() {
			TestEngine.test("deleteFile()", false);
		}

		var cb = {};
		for (var i = 0; i < param.length; i++) {

				cb[i] = TestEngine.registerCallback("deleteFile", on_deleteFile_success,  on_deleteFile_error);
				file.deleteFile(param[i], cb[i].successCallback, cb[i].errorCallback);
			}
		
		}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_read_error_count_invalid_param_N_001() {
	var test_string = "It's alive! Alive!";
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));
		function on_openStream_success(stream1) {
			TestEngine.test("openStream()", isFilestream(stream1));
			stream1.write(test_string, null);
			stream1.close(1);
			function on_openStream1_success(r_stream) {
				TestEngine.test("openStream()", isFilestream(r_stream));
				//var read_string = r_stream.read(test_string.length, null);
				var param = new Array(0, "aaa", null, undefined);

				for (var i = 0; i < param.length; i++) {
					TestEngine.testPresetError(
						"stream read.",
						function(){
							r_stream.read(param[i]);
						},
						INVALID_VALUES_ERR
					);
				}

				r_stream.close();
				//TestEngine.test("write()/read()", (read_string === test_string));
				deleteFile(file, f);
			}
			function on_openStream1_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
			}
			var cb = TestEngine.registerCallback("openStream", on_openStream1_success, on_openStream1_error);
			f.openStream("r", cb.successCallback, cb.errorCallback, "UTF-8");
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_readBytes_error_invalid_param_N_001() {
	var test_string = "It's alive! Alive!";
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));
		function on_openStream_success(stream1) {
			TestEngine.test("openStream()", isFilestream(stream1));
			stream1.write(test_string, null);
			stream1.close(1);
			function on_openStream1_success(r_stream) {
				TestEngine.test("openStream()", isFilestream(r_stream));
				//var read_string = r_stream.read(test_string.length, null);
				var param = new Array(0, "aaa", null, undefined);

				for (var i = 0; i < param.length; i++) {
					TestEngine.testPresetError(
						"stream readBytes.",
						function(){
							r_stream.readBytes(param[i]);
						},
						INVALID_VALUES_ERR
					);
				}

				r_stream.close();
				//TestEngine.test("write()/read()", (read_string === test_string));
				deleteFile(file, f);
			}
			function on_openStream1_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
			}
			var cb = TestEngine.registerCallback("openStream", on_openStream1_success, on_openStream1_error);
			f.openStream("r", cb.successCallback, cb.errorCallback, "UTF-8");
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_writeBytes_error_octect_invalid_param_N_001() {
	var test_string = "It's alive! Alive!";
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));
		function on_openStream_success(stream1) {
			TestEngine.test("openStream()", isFilestream(stream1));

			var param = new Array(-1, null, undefined);

			for (var i = 0; i < param.length; i++) {
				TestEngine.testPresetError(
					"stream writeBytes.",
					function(){
						stream1.writeBytes(param[i], null);
					},
					TYPE_MISMATCH_ERR
				);
			}

			stream1.close(1);
			deleteFile(file, f);
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_remove_listener_invalid_param_N_001() {
	var invalid_type_params = new Array(09090909090909, null, undefined, "aaa", {}, [], false);

	for(var i=0; i<invalid_type_params.length; i++){
		TestEngine.testPresetError("UTC_filesystem_remove_listener_invalid_par" + ":" + invalid_type_params[i] ,
			function() {
				tizen.filesystem.removeStorageStateChangeListener(
						function(){
							TestEngine.test("unexpected onsuccess() <<< ", false);
						}, 		//success callback
						invalid_type_params[i] 	//errorcallback
						);
			},
			NOT_FOUND_ERR
		);
	}//for

}

function UTC_filesystem_resolve_location_P_001(){
	function on_resolve_error(err) {
		TestEngine.test("on_resolve_error() [" + err.name + "]", false);
	}
	function on_resolve_success(file) {
		TestEngine.test("on_resolve_success()", isFileObject(file));
	}

	var validResolveLocation = [TEST_ROOT_LOCATION];
	
	for ( var i = 0; i < validResolveLocation.length; i++) {
		var cb = TestEngine.registerCallback("resolve", on_resolve_success, on_resolve_error);
		tizen.filesystem.resolve(validResolveLocation[i], cb.successCallback, cb.errorCallback);
	}
}

function UTC_filesystem_resolve_mode_P_002(){
	function on_resolve_error(err) {
		TestEngine.test("on_resolve_error() [" + err.name + "]", false);
	}
	function on_resolve_success(file) {
		TestEngine.test("on_resolve_success()", isFileObject(file));
	}

	var validResolveMode = ["r", "rw", "w", "a"];
	
	for ( var i = 0; i < validResolveMode.length; i++) {
		var cb = TestEngine.registerCallback("resolve", on_resolve_success, on_resolve_error);
		tizen.filesystem.resolve(TEST_ROOT_LOCATION, cb.successCallback, cb.errorCallback, validResolveMode[i]);
	}
}

var validInput = ["images", "videos", "music"];

function UTC_filesystem_getstorage_label_P_001(){
	var testName = "test_filesystem_getstorage_label_P_003";
	
	function getStorageSuccess(storage) {
		TestEngine.assertEqual(testName + " check type", "INTERNAL", storage.type);
	}
	
	function getStorageError(e){
		TestEngine.test(testName + " unexpected getStorageError() <<< ", false);
	}
	
	for(var i=0; i<validInput.length; i++){
		var cb = TestEngine.registerCallback("openStream", 
				getStorageSuccess, getStorageError);
		tizen.filesystem.getStorage(validInput[i], cb.successCallback,cb.errorCallback);
	}
}

function UTC_filesystem_iststorage_P_001(){
	var testName = "test_filesystem_liststorage_P_004";
	
	function listStorageSuccess(storages) {
		TestEngine.test("listStorageSuccess check storages", storages.length>0);
	}
	
	function listStorageError(e){
		TestEngine.test(testName + " unexpected listStorages() <<< ", false);
	}
	
	for(var i=0; i<validInput.length; i++){
		var cb = TestEngine.registerCallback("openStream", listStorageSuccess, listStorageError);
		tizen.filesystem.listStorages(cb.successCallback,cb.errorCallback);
	}
}

function test_addstoragestaechangelistener_P_005(){
	
	tizen.filesystem.addStorageStateChangeListener(function(storage){});
	
	TestEngine.test("pass addStorageStateChangeListener", true);
}

function UTC_filesystem_removestoragestaechangelistener_P_001(){
	
	var watchId = tizen.filesystem.addStorageStateChangeListener(function(storage){});
	tizen.filesystem.removeStorageStateChangeListener(watchId);
	
	TestEngine.test("pass removeStorageStateChangeListener", true);
}

function UTC_filesystem_listfiles_P_001(){
	var testName = "[test_listfiles]";
	
	function listFilesOnsuccess(files){
		TestEngine.assertEqual(testName + " files.length", 1, files.length);
		for(var i=0; i<files.length; i++){
			TestEngine.log("files.name:" + files[i].name);
		}
	}
	
	function listFilesOnerror(){
		TestEngine.test(testName + " unexpected listFilesOnerror", false);
	}

		var cb = TestEngine.registerCallback("resolve", 
			function(dir) {
				var listFilesCB = TestEngine.registerCallback("listFiles", listFilesOnsuccess, listFilesOnerror);
				dir.listFiles(listFilesCB.successCallback, listFilesCB.errorCallback, {name:"image1.jpg"});
			}, function(e) {
				TestEngine.test("unexpected resolve onerror() <<< ", false);
			}
		);
	
	 tizen.filesystem.resolve("images", cb.successCallback,cb.errorCallback, "r");		//resolve
}

function UTC_filesystem_file_to_uri_P_001() {
  function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
  function on_resolve_success(file) {
    var f = file.createFile(getFileName());
    TestEngine.test("createFile()", isFile(f));
    var uri = f.toURI(1);
    TestEngine.test("Call toUri() returns non empty string", isString(uri) && uri.length > 0);
    TestEngine.log("created uri: " + uri);
    deleteFile(file, f);
  }
  resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_listFiles_P_001() {
	var param = new Array(null);
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		TestEngine.test("resolve()", isFileObject(file));
		function on_listFiles_error(err) {
			TestEngine.test("listFiles() [" + err.name + "]", false);
		}
		function on_listFiles_success(files) {
			TestEngine.test("listFiles()", isArray(files));
		}
		var cb = {};
		for (var i = 0; i < param.length; i++) {
			cb[i] = TestEngine.registerCallback("listFiles", on_listFiles_success, on_listFiles_error);
			file.listFiles(cb[i].successCallback, param[i], param[i], null);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_listFiles_P_002() {
	var param = new Array(1, null, undefined);
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		TestEngine.test("resolve()", isFileObject(file));
		function on_listFiles_error(err) {
			TestEngine.test("listFiles() [" + err.name + "]", false);
		}
		function on_listFiles_success(files) {
			TestEngine.test("listFiles()", isArray(files));
		}

		var cb = {};
		for (var i = 0; i < param.length; i++) {
			cb[i] = TestEngine.registerCallback("listFiles", on_listFiles_success, on_listFiles_error);
			file.listFiles(cb[i].successCallback);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_openStream_P_001() {
	var param = new Array(null, undefined);
	
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var file2 = file.createFile(getFileName());
		
		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.close();
			deleteFile(file, file2);
		}
	
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}
		
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		var stream = file2.openStream("rw", cb.successCallback, cb.errorCallback);

	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_openStream_P_002() {
	var param = new Array(null, undefined);
	
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var file2 = file.createFile(getFileName());
		var cb = {};
		var stream = {};
		var i = 0;
		
		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.close();
			if (i == param.legnth - 1) {
				deleteFile(file, file2);
			}
		}
	
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}
	
		for (i = 0; i < param.length; i++) {
			cb[i] = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
			stream[i] = file2.openStream("rw", cb[i].successCallback, cb[i].errorCallback, param[i], null);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_readAsText_P_001() {
	var test_content = "Ala ma kota";
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));
		
		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.write(test_content);
			stream.close();
			function on_readAsText_error(err) {
				TestEngine.test("readAsText() [" + err.name + "]", false);
				deleteFile(file, f);
			}
			function on_readAsText_success(str) {
				TestEngine.test("readAsText()", (str === test_content));
				deleteFile(file, f);
			}
			
			var cb = TestEngine.registerCallback("readAsText", on_readAsText_success, on_readAsText_error);
			f.readAsText(cb.successCallback);
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
			deleteFile(file, f);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_readAsText_P_002() {
	var param = new Array(null, undefined);
	
	var test_content = "Ala ma kota";
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));
		
		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.write(test_content);
			stream.close();
			function on_readAsText_error(err) {
				TestEngine.test("readAsText() [" + err.name + "]", false);
				deleteFile(file, f);
			}
			function on_readAsText_success(str) {
				TestEngine.test("readAsText()", (str === test_content));
				deleteFile(file, f);
			}
			
			var cb = {};
			for (var i = 0; i < param.legnth; i++) {
				cb[i] = TestEngine.registerCallback("readAsText", on_readAsText_success, on_readAsText_error);
				f.readAsText(cb[i].successCallback, cb[i].errorCallback, param[i], null);
			}
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
			deleteFile(file, f);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_copyTo_P_001() {
	var g_file = null;
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		g_file = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(g_file));
		function on_copyTo_error(err) {
			TestEngine.test("copyTo() [" + err.name + "]", false);
			deleteFile(file, g_file);
		}
		function on_copyTo_success(file2) {
			TestEngine.test("copyTo()", isFile(file2));
			deleteFile(file, file2);
			deleteFile(file, g_file);
		}
		
		try {
			file.copyTo(g_file.fullPath, file.fullPath + "/" + getFileName(), false, null, null, null);
			TestEngine.test("copy to, no exception", true);
		}
		catch (exception) {
			TestEngine.test("exception is occured", false);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_copyTo_P_003() {
	var param = new Array(1, 0, null, undefined,  "aa", function(){}, [], {});
	function on_resolve_success(root) {
		var dir = createDirForParent(root);
		var file = createFileForParent(dir);
		var i = 0;
		function on_copyTo_error(err) {
			//TestEngine.test("copyTo() [" + err.name + "]", false);
			//deleteDirectory(root, dir);
		}
		function on_copyTo_success(copy) {
			TestEngine.test("copyTo()", isFile(copy));
		}
		
		for (i = 0; i < param.length; i++) {
			try {
				root.copyTo(file.fullPath, root.fullPath + "/" + getFileName(), param[i], on_copyTo_success, null);
				TestEngine.test("ok, no exception", true);
			}
			catch (exception) {
				TestEngine.test("exception", false);
			}
		}
	}
	resolve_root_location(on_resolve_success);
}

function UTC_filesystem_file_moveTo_P_001() {
	var g_file = null;
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		g_file = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(g_file));
		function on_moveTo_error(err) {
			TestEngine.test("moveTo() [" + err.name + "]", false);
			deleteFile(file, g_file);
		}
		function on_moveTo_success(file1) {
			TestEngine.test("moveTo()", true);
			deleteFile(file, file1);
		}
		
		try {
			file.moveTo(g_file.fullPath, file.fullPath + "/" + getFileName(), true, null, null, null);
			TestEngine.test("ok, no exception", true);
		}
		catch (exception) {
			TestEngine.test("exception", false);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_moveTo_P_003() {
	var param = new Array([], 1, 0, null, undefined, {}, "aa");
	
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var i = 0;
		
		function on_moveTo_error(err) {
			TestEngine.test("moveTo() [" + err.name + "]", false);
			deleteFile(file, g_file[i]);
		}
		function on_moveTo_success(file1) {
			TestEngine.test("moveTo()", true);
			deleteFile(file, file1);
		}
		
		try {
			var cb = {};
			
			for (i = 0; i < param.length; i++) {
				var createdFile = file.createFile(getFileName());
				TestEngine.test("createFile()", isFile(createdFile));
				try {
					file.moveTo(createdFile.fullPath, file.fullPath + "/" + getFileName(), param[i], on_moveTo_success, null);
					TestEngine.test("no exception", true);
				}
				catch (e) {
					TestEngine.test("exception " + exception.message, false);		
				}
			}
			
		}
		catch (exception) {
			TestEngine.test("exception " + exception.message, false);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_createFile_P_001() {
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var file1 = file.createFile(getFileName(), null);
		TestEngine.test("createFile()", isFile(file1));
		deleteFile(file, file1);
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_createDirectory_P_001() {
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var dir = file.createDirectory(getDirName(), null);
		TestEngine.test("createDirectory()", isDir(dir));
		deleteDirectory(file, dir);
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_resolve_P_001() {
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var file1 = file.createFile(getFileName(), null);
		TestEngine.test("createFile()", isFile(file1));
		var file2 = file.resolve(file1.name, null);
		TestEngine.test("resolve()", isFile(file2));
		deleteFile(file, file1);
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_deleteDirectory_P_001() {
	function on_resolve_success(root) {
		var dir = createDirForParent(root);
		function on_deleteDirectory_success() {
			TestEngine.test("deleteDirectory()", true);
		}

		try {
			root.deleteDirectory( dir.fullPath, true, null, null);
			TestEngine.test("no exception", true);
		}
		catch (e){
			TestEngine.test("exception", false);
		}
	}
	resolve_root_location(on_resolve_success);
}

function UTC_filesystem_file_deleteFile_P_001() {
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));

		function on_error(err) {
			  TestEngine.test("deleteFile() [" + err.name + "]", false);
		}
		function on_success() {
			TestEngine.test("deleteFile()", true);
		}

		try {
			file.deleteFile(f.fullPath, null, null, null);
			TestEngine.test("no exception", true);
		}
		catch (ex) {
			TestEngine.test("exception", false);
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_deleteDirectory_P_002() {
	var param = new Array(1, null, undefined, true, false, "aa");
	function on_resolve_success(root) {
		function on_deleteDirectory_success() {
			TestEngine.test("deleteDirectory()", true);
		}
		function on_deleteDirectory_error() {
			TestEngine.test("deleteDirectory()", false);
		}
		
		var dir = {};
		var i = 0;
		var cb = {};
	
	
		for (i = 0; i < param.length; i++) {
		dir[i] = root.createDirectory(param[i]);
		cb[i] = TestEngine.registerCallback("deleteDirectory", on_deleteDirectory_success, on_deleteDirectory_error);		

		try {
			root.deleteDirectory(dir[i].fullPath, true, cb[i].successCallback, cb[i].errorCallback);
		}
		catch (e){
			TestEngine.test("exception", false);
		}
		}
	}
	resolve_root_location(on_resolve_success);
}

function UTC_filesystem_file_deleteFile_P_002() {
	var param = new Array(1, null, undefined, true, false, "aa");
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var i = 0;
		var cb = {};

		function on_error(err) {
			  TestEngine.test("deleteFile() [" + err.name + "]", false);
		}
		function on_success() {
			TestEngine.test("deleteFile()", true);
		}

		for (i = 0; i < param.length; i++) {
			try {
				var f = file.createFile(param[i]);
				TestEngine.test("createFile()", isFile(f));
				cb[i] = TestEngine.registerCallback("deleteDirectory", on_success, on_error);
				file.deleteFile(f.fullPath, cb[i].successCallback, cb[i].errorCallback, null);
			}
			catch (ex) {
				TestEngine.test("exception", false);
			}
		}
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_write_read_close_P_001() {
	var test_string = "It's alive! Alive!";
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));
		function on_openStream_success(stream1) {
			TestEngine.test("openStream()", isFilestream(stream1));
			stream1.write(test_string, null);
			stream1.close(1);
			function on_openStream1_success(r_stream) {
				TestEngine.test("openStream()", isFilestream(r_stream));
				var read_string = r_stream.read(test_string.length, null);
				r_stream.close();
				TestEngine.test("write()/read()", (read_string === test_string));
				deleteFile(file, f);
			}
			function on_openStream1_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
			}
			var cb = TestEngine.registerCallback("openStream", on_openStream1_success, on_openStream1_error);
			f.openStream("r", cb.successCallback, cb.errorCallback, "UTF-8");
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}


function UTC_filesystem_file_write_readBytes_P_001() {
	var test_string = new Array(1,2,3,4,5,6,7);
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));
		function on_openStream_success(stream1) {
			TestEngine.test("openStream()", isFilestream(stream1));
			
			stream1.writeBytes(test_string, null);
			stream1.close(1);
			function on_openStream1_success(r_stream) {
				TestEngine.test("openStream()", isFilestream(r_stream));
				var read_string = r_stream.readBytes(test_string.length, null);
				r_stream.close();
				TestEngine.test("readBytes", isArray(read_string));
				//TestEngine.test("write()/read()", (read_string === test_string));
				deleteFile(file, f);
			}
			function on_openStream1_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
			}
			var cb = TestEngine.registerCallback("openStream", on_openStream1_success, on_openStream1_error);
			f.openStream("r", cb.successCallback, cb.errorCallback, "UTF-8");
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_write_readBase64_P_001() {
		// TIZEN-FILESYSTEM-060: Call write()/readBase64() on a stream.
	var test_base64 = 'dGVzdA==';
	var test_string = 'test';
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));
		function on_openStream_success(stream) {
			TestEngine.test("openStream()", isFilestream(stream));
			stream.writeBase64(test_base64, null);
			stream.close();
			function on_openStream1_success(stream1) {
				TestEngine.test("openStream()", isFilestream(stream1));
				var read_base64 = stream1.readBase64(100, null);
				stream1.close();
				TestEngine.test("readBase64()", isString(read_base64));
				deleteFile(file, f);
			}
			function on_openStream1_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
				deleteFile(file, f);
			}
			var cb = TestEngine.registerCallback("openStream", on_openStream1_success, on_openStream1_error);
			f.openStream("r", cb.successCallback, cb.errorCallback, "UTF-8");
		}
		function on_openStream_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
				deleteFile(file, f);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

// unit tc addition for smack, filesystem.read
// using downloads/aaaa.txt
function UTC_filesystem_file_to_uri_smack_P_001() {
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.resolve("aaaa.txt");
		var uri = f.toURI();
		TestEngine.test("to_uri", isString(uri));
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_openStream_read_close_smack_P_001() {
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.resolve("aaaa.txt");
		function on_openStream_success(stream) {
			var read_string = stream.read(100, null);
			stream.close();
			TestEngine.test("read()", isString(read_string));
		}

		function on_openStream_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("r", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_openStream_readbytes_close_smack_P_001() {
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.resolve("aaaa.txt");
		function on_openStream_success(stream) {
			var read_bytes = stream.readBytes(100, null);
			stream.close();
			TestEngine.test("readbytes()", isArray(read_bytes));
		}

		function on_openStream_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("r", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_openStream_readbase64_close_smack_P_001() {
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.resolve("aaaa.txt");
		function on_openStream_success(stream) {
			var read_base64 = stream.readBase64(100, null);
			stream.close();
			TestEngine.test("readBase64()", isString(read_base64));
		}

		function on_openStream_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("r", cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_file_readAsText_smack_P_001() {
	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.resolve("aaaa.txt");
		function on_readastext_success(contents) {
			console.log(contents);
			TestEngine.test("readAsText()", isString(contents));
		}

		function on_readastext_error(err) {
				TestEngine.test("readAsText() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("readAsText", on_readastext_success, on_readastext_error);
		f.readAsText(cb.successCallback, cb.errorCallback, "UTF-8");
	}
	resolve_root(on_resolve_success, on_resolve_error);	
}


function UTC_filesystem_change_test_root_location() {
	// dcm-992 issue
	TEST_ROOT_LOCATION = "file:///opt/usr/media/Documents";
	TestEngine.test("ok location change", true);
}
function UTC_filesystem_shift_jis() {
	var test_string = "It's alive! Alive!";

	function on_resolve_error(err) { TestEngine.test("resolve() [" + err.name + "]", false); }
	function on_resolve_success(file) {
		var f = file.createFile(getFileName());
		TestEngine.test("createFile()", isFile(f));
		function on_openStream_success(stream1) {
			TestEngine.test("openStream()", isFilestream(stream1));
			stream1.write(test_string, null);
			stream1.close(1);
			function on_openStream1_success(r_stream) {
				TestEngine.test("openStream()", isFilestream(r_stream));
				var read_string = r_stream.read(test_string.length, null);
				r_stream.close();
				TestEngine.test("write()/read()", (read_string === test_string));
				deleteFile(file, f);
			}
			function on_openStream1_error(err) {
				TestEngine.test("openStream() [" + err.name + "]", false);
			}
			var cb = TestEngine.registerCallback("openStream", on_openStream1_success, on_openStream1_error);
			f.openStream("r", cb.successCallback, cb.errorCallback, "SJIS");
		}
		function on_openStream_error(err) {
			TestEngine.test("openStream() [" + err.name + "]", false);
		}
		var cb = TestEngine.registerCallback("openStream", on_openStream_success, on_openStream_error);
		f.openStream("w", cb.successCallback, cb.errorCallback, "SJIS");
	}
	resolve_root(on_resolve_success, on_resolve_error);
}

function UTC_filesystem_check_invalid_mode() {
	var resolveArea = ["ringtones", "wgt-package"];

	function on_resolve_error(err) {
		TestEngine.test("resolve [" + err.name + "]", err.name == INVALID_VALUES_ERR);
	}

	function on_resolve_success(file) {
		TestEngine.test("resolve ok, but can not be here", false);
	}

	var cb = [];
	var index = 0;

	for (index = 0; index < resolveArea.length; index++) {
		cb[index] = TestEngine.registerCallback("resolve with invalid mode", 
				on_resolve_success, on_resolve_error);
		tizen.filesystem.resolve(resolveArea[index], 
				cb[index].successCallback, cb[index].errorCallback);
	}
}

function UTC_filesystem_copyTo_moveTo_error() {
	function on_resolve_error(err) {
		TestEngine.test("[" + err.name + "]", err.name == INVALID_VALUES_ERR);
	}

	function on_resolve_success(file) {
		TestEngine.test("but can not be here", false);
	}


	tizen.filesystem.resolve("images",
		function(file) {
			var copyToObj = TestEngine.registerCallback("copyTo with r FileOjbect", 
					on_resolve_success, on_resolve_error);
			
				
			file.copyTo("images/image1.jpg", "ringtones/image111.jpg", true, copyToObj.successCallback, copyToObj.errorCallback);

			var moveToObj = TestEngine.registerCallback("moveTo with r FileOjbect", 
					on_resolve_success, on_resolve_error);

			file.moveTo("images/image1.jpg", "ringtones/image111.jpg", true, moveToObj.successCallback, moveToObj.errorCallback);
		},

		function(e) {
			TestEngine.test("resolve error", false);
		}, "rw");
}


function UTC_filesystem_invoke_write_permission_api_with_FileOjbect_resolved_as_r() {
	function on_resolve_error(err) {
		TestEngine.test("[" + err.name + "]", err.name == INVALID_VALUES_ERR);
	}

	function on_resolve_success(file) {
		TestEngine.test("but can not be here", false);
	}


	tizen.filesystem.resolve("images",
		function(file) {
			var modes = ["rw", "a", "w"];
			var openstreamcb = [];
			var index = 0;
			
			try {
				file.createFile("aaa.txt");
				TestEngine.test("no exception thrown", false);

			}	
			catch (e) {
				if (e.name == INVALID_VALUES_ERR)
					TestEngine.test("exception ok : " + INVALID_VALUES_ERR + ":" + e.message,  true);
				else
					TestEngine.test("exception name error", false);
			}
	
			try {
				file.createDirectory("aaaaaaa");
				TestEngine.test("no exception thrown", false);

			}	
			catch (e) {
				if (e.name == INVALID_VALUES_ERR)
					TestEngine.test("exception ok : " + INVALID_VALUES_ERR, true);
				else
					TestEngine.test("exception name error", false);
			}
	
			for (index = 0; index < modes.length; index++) {
				openstreamcb[index] = TestEngine.registerCallback("open stream with rw", 
					on_resolve_success, on_resolve_error);
				try {
					file.openStream(modes[index], openstreamcb[index].successCallback, openstreamcb[index].errorCallback);
				} catch (e) {
					TestEngine.test("file.openStream exception: " + e, false);
				}
			}

/*			var copyToObj = TestEngine.registerCallback("copyTo with r FileOjbect", 
					on_resolve_success, on_resolve_error);
			
				
			file.copyTo("images/image1.jpg", "images/image111.jpg", true, copyToObj.successCallback, copyToObj.errorCallback);*/

			var moveToObj = TestEngine.registerCallback("moveTo with r FileOjbect", 
					on_resolve_success, on_resolve_error);

			file.moveTo("images/image1.jpg", "images/image111.jpg", true, moveToObj.successCallback, moveToObj.errorCallback);
			
			var deleteFileObj = TestEngine.registerCallback("deleteFile with r FileOjbect", 
					on_resolve_success, on_resolve_error);

			file.deleteFile("images/image1.jpg", deleteFileObj.successCallback, deleteFileObj.errorCallback);

			var deleteDirectoryObj = TestEngine.registerCallback("deleteDirecotry with r FileOjbect", 
					on_resolve_success, on_resolve_error);

			file.deleteDirectory("images", true, deleteDirectoryObj.successCallback, deleteDirectoryObj.errorCallback);
			TestEngine.test("ok", true);
		},

		function(e) {
			TestEngine.test("resolve error", false);
		}, "r");
}

function UTC_filesystem_check_sdcard_resolve() {
	var resolveObj;

	//platform returns 'removable0' label on gear. 'removable1' causes NOT_FOUND_ERR
	var label = "removable0";
	tizen.filesystem.getStorage(label,
			function(storage) {
				console.log(storage.state);
				if (storage.state == "MOUNTED") {
					resolveObj = TestEngine.registerCallback("resolve sdcard", function(f) {
							TestEngine.test("resolve sdcard ok", true);
						},
						function(e) {
							TestEngine.test("resolve sdcard error", false);
						});
					tizen.filesystem.resolve(label, resolveObj.successCallback, resolveObj.errorCallback, "r");
				}
				else {
					resolveObj = TestEngine.registerCallback("resolve sdcard", function(f) {
							TestEngine.test("resolve sdcard ok, but error", false);
						},
						function(e) {
							TestEngine.test("resolve sdcard error" + e.message, e.name == NOT_FOUND_ERR);
						});
					tizen.filesystem.resolve(label, resolveObj.successCallback, resolveObj.errorCallback);
					tizen.filesystem.resolve(label+"/a.txt", resolveObj.successCallback, resolveObj.errorCallback);
				


				}
			},
			function(e) {
				TestEngine.test("getStroage Error", false);
			});
}

function UTC_filesystem_stupid_resolve_delete()
{
	function on_resolve_error(err) {
		TestEngine.test("[" + err.name + "]", err.name == NOT_FOUND_ERR);
	}

	function on_resolve_success(file) {
		TestEngine.test("but can not be here", false);
	}

	tizen.filesystem.resolve("images",
		function(file) {
	
			var deleteFileObj = TestEngine.registerCallback("deleteFile with r FileOjbect", 
				on_resolve_success, on_resolve_error);

			file.deleteFile("documents/a.txt", deleteFileObj.successCallback, deleteFileObj.errorCallback);

			var deleteDirectoryObj = TestEngine.registerCallback("deleteDirecotry with r FileOjbect", 
				on_resolve_success, on_resolve_error);

			file.deleteDirectory("documents/b", true, deleteDirectoryObj.successCallback, deleteDirectoryObj.errorCallback);
		},
		function (e) {
			TestEngine.test("getStroage Error", false);
		}, "rw");
		
}
// manual test function 
function UTC_filesystem_permission_denied_error()
{
	function on_resolve_error(err) {
		TestEngine.test("[" + err.name + ":" + err.msg + "]", err.name == INVALID_VALUES_ERR);
	}

	function on_resolve_success(file) {
		TestEngine.test("but can not be here", false);
	}

	tizen.filesystem.resolve("documents",
		function(file) {
	
			var deleteFileObj = TestEngine.registerCallback("deleteFile with r FileOjbect", 
				on_resolve_success, on_resolve_error);

			file.deleteFile("documents/a.txt", deleteFileObj.successCallback, deleteFileObj.errorCallback);

			var deleteDirectoryObj = TestEngine.registerCallback("deleteDirecotry with r FileOjbect", 
				on_resolve_success, on_resolve_error);

			file.deleteDirectory("documents/b", true, deleteDirectoryObj.successCallback, deleteDirectoryObj.errorCallback);
		},
		function (e) {
			TestEngine.test("getStroage Error", false);
		}, "rw");
		
}
