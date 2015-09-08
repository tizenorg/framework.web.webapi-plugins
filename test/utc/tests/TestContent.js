

var TYPE_MISMATCH_ERR = 'TypeMismatchError';
var INVALID_VALUES_ERR = 'InvalidValuesError';
var NOT_SUPPORTED_ERR = 'NotSupportedError';

var manager;

function onError(){
    TestEngine.test("onError", false);
}

function onSucess(){
    TestEngine.test("onSucess", false);
}

function emptyFunction () {}

function removeAllPlayLists(onSuccess) {
    var removeCounter, i, objCbGet, objCbRemove;

    function removePlaylistSuccess() {
        removeCounter--;
        if (removeCounter === 0) {
            onSuccess();
        }
    }

    function removePlaylistError() {
        TestEngine.test("removePlaylist", false);
    }

    function getPlaylistsSuccess(playlists) {
        removeCounter = playlists.length;
        if (removeCounter === 0) {
            onSuccess();
            return;
        }
        objCbRemove = TestEngine.registerCallback("removePlaylist", removePlaylistSuccess, removePlaylistError, playlists.length);
        for (i = 0; i < playlists.length; i++) {
            tizen.content.removePlaylist(playlists[i].id, objCbRemove.successCallback, objCbRemove.errorCallback);
        }
    }

    function getPlaylistsError() {
        TestEngine.test("getPlaylists", false);
    }

    objCbGet = TestEngine.registerCallback("getPlaylists", getPlaylistsSuccess, getPlaylistsError);
    tizen.content.getPlaylists(objCbGet.successCallback, objCbGet.errorCallback);
}

function UTC_content_getLocalMediaSource_P_001()
{
	try{
		var testName = "[test_getLocalMediaSourceP]";
	    TestEngine.log(testName);

	    manager = tizen.content;
	    TestEngine.test("Get a Local Media Source", manager);
	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : test_getLocalMediaSourceP", false);
	}
}

function UTC_content_getDirectories_P_001(){
	var testName = "[test_getDirectoriesP]";
	TestEngine.log(testName);

	function OnSucessGetFoldersP(folders){	
		if(folders.length > 0){
			TestEngine.test("getFolderPositiveCB", true);
		}	
		else{
			TestEngine.test("getFolderPositiveCB", false);
		}
	}

    function onErrorGetFoldersP(){
        TestEngine.test("Find all events", false);
    }

	try{
		var objCb = TestEngine.registerCallback("getDirectories", OnSucessGetFoldersP, onError,3);
		tizen.content.getDirectories(objCb.successCallback);
		tizen.content.getDirectories(objCb.successCallback, null);
		
		tizen.content.getDirectories(objCb.successCallback, objCb.errorCallback);

	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : test_getDirectoriesP", false);
	}

}


function UTC_content_getDirectories_N_001(){
	var testName = "[test_getDirectoriesN]";
	TestEngine.log(testName);
	
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getDirectories");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getDirectories", null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getDirectories", undefined);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getDirectories", onSucess, 1 );
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getDirectories", 1, onError );
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getDirectories", 1, 1 );
}

function UTC_content_find_P_001(){
	var testName = "[UTC_content_find_P_001]";
	TestEngine.log(testName);

	function OnSucessFindItemsP(items){
		if(items.length > 0){
			TestEngine.test("OnSucessFindItemsP", true);
		}	
		else{
			TestEngine.test("OnSucessFindItemsP", false);
		}
	}

	function OnErrorFindItemsP(error){
		TestEngine.test("expected Error ", true);
	}
	
	try{
		var objCb = TestEngine.registerCallback("find", OnSucessFindItemsP, OnErrorFindItemsP,3);

		tizen.content.find(objCb.successCallback);
		tizen.content.find(objCb.successCallback, null);
		
		tizen.content.find(objCb.successCallback, objCb.errorCallback);
	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : test_getLocalMediaSourceP", false);
	}
}



var folderId;
function UTC_content_find_P_002(){
	var testName = "[UTC_content_find_P_002]";
	TestEngine.log(testName);

	function OnSucessFindItemsP(items){
		if(items.length > 0){
			TestEngine.test("OnSucessFindItemsP", true);
		}	
		else{
			TestEngine.test("OnSucessFindItemsP", false);
		}
	}

	function OnErrorFindItemsP(error){
		TestEngine.test("expected Error ", true);
	}

	function OnSucessGetFoldersP(folders){	
        	if(folders.length > 0){
            	for(j =0 ; j < folders.length ; j++)
        	{
        	    if(folders[j].directoryURI.indexOf("Image")!=-1)
                    {
            	        folderId = folders[j].id;
            	    }
            	}
                TestEngine.log(folderId);
                var objCb = TestEngine.registerCallback("find", OnSucessFindItemsP, OnErrorFindItemsP,2);            
                tizen.content.find(objCb.successCallback, null, folderId);
                tizen.content.find(objCb.successCallback, objCb.errorCallback, folderId);            
        	}	
        	else{
                TestEngine.test("getFolderPositiveCB", false);
        	}
	}	
	
	try{

		var objCb = TestEngine.registerCallback("find", OnSucessFindItemsP, OnErrorFindItemsP,3);

		tizen.content.find(objCb.successCallback);
		tizen.content.find(objCb.successCallback, null, null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback, null);

		var objFolderCb = TestEngine.registerCallback("getDirectories", OnSucessGetFoldersP, onError);
		tizen.content.getDirectories(objFolderCb.successCallback);

	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : OnSucessGetFoldersP", false);
	}
}

function UTC_content_find_P_003(){
	var testName = "[UTC_content_find_P_003]";
	TestEngine.log(testName);

	function OnSucessFindItemsP(items){
		if(items.length > 0){
			TestEngine.test("OnSucessFindItemsP", true);
		}	
		else{
			TestEngine.test("OnSucessFindItemsP", false);
		}
	}

	function OnErrorFindItemsP(error){
		TestEngine.test("expected Error ", true);
	}

	try{
		
		var objCb = TestEngine.registerCallback("find", OnSucessFindItemsP, onError,7);
		var filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");

		tizen.content.find(objCb.successCallback, null, null, null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback, null, filter);
		tizen.content.find(objCb.successCallback, null, folderId, null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback, folderId, null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback, folderId, filter);
		tizen.content.find(objCb.successCallback, objCb.errorCallback, null, filter);
		tizen.content.find(objCb.successCallback, null, null, filter);

	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : UTC_content_find_P_003", false);
	}
}

function UTC_content_find_P_004(){
	var testName = "[UTC_content_find_P_004]";
	TestEngine.log(testName);

	function OnSucessFindItemsP(items){
		if(items.length >= 0){
			TestEngine.test("OnSucessFindItemsP", true);
		}	
		else{
			TestEngine.test("OnSucessFindItemsP", false);
		}
	}

	function OnErrorFindItemsP(error){
		TestEngine.test("expected Error ", true);
	}

	try{

		var objCb = TestEngine.registerCallback("find", OnSucessFindItemsP, onError,19);
		var filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");
		var sortMode = new tizen.SortMode("name", "ASC");

		tizen.content.find(objCb.successCallback, objCb.errorCallback,null,null,null,null,null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,null,null,null,null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,filter,null,null,null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,filter,sortMode,null,null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,filter,sortMode,2,null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,filter,sortMode,2,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,filter,sortMode,null,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,null,filter,sortMode,null,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,filter,null,null,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,filter,null,null,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,null,null,null,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,null,null,2,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,null,sortMode,2,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,null,null,2,null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,null,sortMode,2,null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,null,sortMode,null,null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,null,sortMode,null,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,filter,sortMode,null,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback,folderId,filter,null,2,null);

	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : test_getLocalMediaSourceP", false);
	}
}


function UTC_content_find_P_005(){
	var testName = "[UTC_content_find_P_005]";
	TestEngine.log(testName);

	function OnSucessFindItemsP(items){
		if(items.length >= 0){
			TestEngine.test("OnSucessFindItemsP", true);
		}
		else{
			TestEngine.test("OnSucessFindItemsP", false);
		}
	}

	function OnErrorFindItemsP(error){
		TestEngine.test("expected Error ", true);
	}

	try{

		var objCb = TestEngine.registerCallback("find", OnSucessFindItemsP, onError,9);
		var filter;
		filter = new tizen.AttributeFilter("type", "EXACTLY", "VIDEO");

		tizen.content.find(objCb.successCallback, null, null, null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback, null, filter);
		tizen.content.find(objCb.successCallback, null, folderId, null);

		filter = new tizen.AttributeFilter("type", "EXACTLY", "AUDIO");
		tizen.content.find(objCb.successCallback, null, null, null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback, null, filter);
		tizen.content.find(objCb.successCallback, null, folderId, null);

		filter = new tizen.AttributeFilter("type", "EXACTLY", "OTHER");
		tizen.content.find(objCb.successCallback, null, null, null);
		tizen.content.find(objCb.successCallback, objCb.errorCallback, null, filter);
		tizen.content.find(objCb.successCallback, null, folderId, null);

	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : test_getLocalMediaSourceP", false);
	}
}

function UTC_content_find_P_006(){
	var testName = "[UTC_content_find_P_006]";
	TestEngine.log(testName);

	function OnSucessFindItemsP(items){
		if(items.length >= 0){
			for(var i = 0; i < items.length; i++){
				var path = items[i].contentURI;
				var name = items[i].name;
				if( path.indexOf(name) < 0){
					TestEngine.log(" path : " + path + "   name : " + name);
					TestEngine.test("UTC_content_find_P_006", false);
					break;
				}
			}
			TestEngine.test("UTC_content_find_P_006", true);
		}
		else{
			TestEngine.test("OnSucessFindItemsP", false);
		}
	}

	function OnErrorFindItemsP(error){
		TestEngine.test("OnErrorFindItemsP", false);
	}

	try{
		var objCb = TestEngine.registerCallback("find", OnSucessFindItemsP, OnErrorFindItemsP,1);
		tizen.content.find(objCb.successCallback, objCb.errorCallback);
	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : test_getLocalMediaSourceP", false);
	}
}

function UTC_content_find_P_007(){
	var testName = "[UTC_content_find_P_007]";
	TestEngine.log(testName);

	function OnSucessFindItemsP(items){
		if(items.length >= 0){
			TestEngine.test("OnSucessFindItemsP", true);

                   for(var i = 0; i < items.length; i++){
                        if( items[i].releaseDate === undefined || items[i].releaseDate == "Invalid Date"){
                            TestEngine.test("[UTC_content_find_P_007] releaseDate is not valid. ", false);
                        }
                    }
                   TestEngine.test("[UTC_content_find_P_007] releaseDate is valid. ", true);
		}
		else{
			TestEngine.test("OnSucessFindItemsP", false);
		}
	}

	function OnErrorFindItemsP(error){
		TestEngine.test("[UTC_content_find_P_007] finding a content is failed. ", false);
	}

	try{

		var objCb = TestEngine.registerCallback("find", OnSucessFindItemsP, OnErrorFindItemsP,1);
		var filter;
             var sortMode = new tizen.SortMode("releaseDate", "ASC");
             tizen.content.find(objCb.successCallback, objCb.errorCallback, null, null,sortMode);

             TestEngine.test("UTC_content_find_P_007 ", true);
	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : UTC_content_find_P_007", false);
	}
}


function UTC_content_find_P_008(){
	var testName = "[UTC_content_find_P_008]";
	TestEngine.log(testName);

	function OnSucessFindItemsP(items){
		if(items.length >= 0){
			TestEngine.test("OnSucessFindItemsP", true);

                   for(var i = 0; i < items.length; i++){
                        if( items[i].contentURI == null || items[i].contentURI == undefined ){
                            TestEngine.test("[UTC_content_find_P_008] ContentURI is not valid. ", false);
                        }
                    }
                    TestEngine.test("[UTC_content_find_P_008] ConentURI is a valid data. ", true);
		}
		else{
			TestEngine.test("OnSucessFindItemsP", false);
		}
	}

	function OnErrorFindItemsP(error){
		TestEngine.test("[UTC_content_find_P_008] finding a content is failed. ", false);
	}

	try{

		var objCb = TestEngine.registerCallback("find", OnSucessFindItemsP, OnErrorFindItemsP,1);
		var filter;
             tizen.content.find(objCb.successCallback, objCb.errorCallback);

             TestEngine.test("UTC_content_find_P_008 ", true);
	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : UTC_content_find_P_008", false);
	}
}


var name1_a;
var name1_b;
function UTC_content_find_sort_by_name_001(){
	var testName = "[UTC_content_sort_by_name_001]";
	TestEngine.log(testName);
	var rating;
	function OnSucessFindItems(items){
		if(items.length > 0){
			name1_a = items[0].name;
			name1_b = items[items.length-1].name;
			var sortMode = new tizen.SortMode("name", "DESC");
			var objResultCb = TestEngine.registerCallback("find", OnSucessFindItemsToCheck, onError);
			tizen.content.find(objResultCb.successCallback,objResultCb.errorCallback,null,null,sortMode);
		}
		else{
			TestEngine.test("test_updateP", false);
		}
	}
	function OnSucessFindItemsToCheck(items){
		if(items.length > 0){
			TestEngine.log("name1_a:"+ name1_a + " name1_b:"+name1_b);
			TestEngine.log("name2_a:"+ items[items.length-1].name + " name2_b:"+items[0].name);
			if(name1_a == items[items.length-1].name || name1_b == items[0].name){
				TestEngine.test("UTC_content_find_sort_by_name_001", true);
			}
			else{
				TestEngine.test("UTC_content_find_sort_by_name_001", true);
			}
		}
		else{
			TestEngine.test("UTC_content_sort_by_name_001", false);
		}
	}


	try{
		var objCb = TestEngine.registerCallback("find", OnSucessFindItems, onError);
		var sortMode = new tizen.SortMode("name", "ASC");
		tizen.content.find(objCb.successCallback,objCb.errorCallback,null,null,sortMode);


	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : UTC_content_sort_by_name_001", false);
	}

}


function UTC_content_find_N_001(){
	var testName = "[test_findN]";
	TestEngine.log(testName);

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",1);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,0);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",null,null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",null,onSucess);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",0,onSucess);

	var filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");
	var sortMode = new tizen.SortMode("name", "ASC");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError,null,1);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError, null,"aaa");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError, null,filter,1);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError, null,filter,"aaa");

	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError, folderId,null,1);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError, folderId,1);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError, folderId,"aaa");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError, folderId,filter,1);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError, folderId,filter,"aaa");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "find",onSucess,onError, folderId,null,1);
}



function UTC_content_update_P_001(){
	var rating;
	function OnSucessFindItems(items){	
		if(items.length > 0){
			rating = items[0].rating;
			if (rating >= 10) {
				items[0].rating = 0;
			} else {
				items[0].rating = rating + 1;
			}
			TestEngine.log("name:"+items[0].name + "  rating:" + items[0].rating);
			TestEngine.test("set operation is success", items[0].rating != rating);
			rating = items[0].rating;
			tizen.content.update(items[0]);
			var objResultCb = TestEngine.registerCallback("find", OnSucessFindItemsToCheck, onError);
			tizen.content.find(objResultCb.successCallback, objResultCb.errorCallback);
		}
		else{
			TestEngine.test("test_updateP", false);
		}
	}
	function OnSucessFindItemsToCheck(items){
		if(items.length > 0){
			TestEngine.log("name:"+items[0].name + "  rating:" + items[0].rating);
			TestEngine.test("test_updateP", items[0].rating == rating);
		}
		else{
			TestEngine.test("test_updateP", false);
		}
	}

		
	try{
		var testName = "[test_updateP]";
	    TestEngine.log(testName);
		var objCb = TestEngine.registerCallback("find", OnSucessFindItems, onError);

		tizen.content.find(objCb.successCallback, objCb.errorCallback);


	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : test_updateP", false);
	}

}

var orgName;
function UTC_content_update_P_002(){
	var testName = "[UTC_content_update_P_002]";
	TestEngine.log(testName);
	var rating;
	function OnSucessFindItems(items){
		if(items.length > 0){
			orgName = items[0].name;
			items[0].name = "TestContentName";
			TestEngine.log("orgName:"+orgName);

			tizen.content.update(items[0]);
			var filter = new tizen.AttributeFilter("name", "EXACTLY", "TestContentName");
			var objResultCb = TestEngine.registerCallback("find", OnSucessFindItemsToCheck, onError);
			tizen.content.find(objResultCb.successCallback,objResultCb.errorCallback,null,filter);
		}
		else{
			TestEngine.test("test_updateP", false);
		}
	}
	function OnSucessFindItemsToCheck(items){
		if(items.length > 0){
			var expectedName = "TestContentName";
			TestEngine.log("name:"+items[0].name);
			TestEngine.test("UTC_content_update_P_002", items[0].name == expectedName);
			items[0].name = orgName;
			tizen.content.update(items[0]);
		}
		else{
			TestEngine.test("UTC_content_update_P_002", false);
		}
	}


	try{
		var objCb = TestEngine.registerCallback("find", OnSucessFindItems, onError);

		tizen.content.find(objCb.successCallback,objCb.errorCallback);


	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : UTC_content_update_P_002", false);
	}

}


function UTC_content_update_N_001(){

	function OnSucessGetFolders(folders){	
		if(folders.length > 0){
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "update");
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "update",folders[0]);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "update",null);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "update",undefined);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "update",1);
		}	
		else{
			TestEngine.test("test_updateN", false);
		}
	}
	
	var testName = "[test_updateN]";
    TestEngine.log(testName);
	var objCb = TestEngine.registerCallback("getDirectories", OnSucessGetFolders, onError);

	tizen.content.getDirectories(objCb.successCallback);

}


function UTC_content_updateBatch_P_001(){
	var arrayItems;

	function OnSucessUpdateItemsBatchCB(){
		TestEngine.test("test_updateBatchP", true);
	}
	
	function OnSucessFindItems(items){	
		try{
			TestEngine.log("###OnSucessFindItems###1");
			if(items.length > 0){
			    for(var i=0; i < items.length; i++) {
					arrayItems[i] = items[i].rating;
					TestEngine.log("name:"+items[i].name + "  rating:" + arrayItems[i]);
					items[i].rating = items[i].rating + 1;

			    }
				var objUpdateItemCb = TestEngine.registerCallback("updateBatch", OnSucessUpdateItemsBatchCB, onError);
				tizen.content.updateBatch(items, objUpdateItemCb.successCallback);
			}
			else{
				TestEngine.test("test_updateBatchP2_1", false);
			}
		}catch (e) {
			TestEngine.log("e.code:" + e.code);
			TestEngine.test("Exception : test_updateBatchP2", false);
		}
	}
	
	try{
		var testName = "[test_updateBatchP]";
	    TestEngine.log(testName);
		arrayItems = new Array();
		var objCb = TestEngine.registerCallback("find", OnSucessFindItems, onError);

		var filter = new tizen.AttributeFilter("type", "EXACTLY", "IMAGE");
		tizen.content.find(objCb.successCallback,null,null,filter);

	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : test_updateBatchP1", false);
	}
}


function UTC_content_updateBatch_N_001(){
	var arrayItems;

	function OnSucessUpdateItemsBatchCB(){

		TestEngine.test("test_updateBatchP", true);

	}
	
	function OnSucessFindItems(items){	

		if(items.length > 0){
		    for(var i=0; i < items.length; i++) {
				arrayItems[i] = items[i].rating;
				items[i].rating = items[i].rating + 1;
				
		    }
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "updateBatch");
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "updateBatch",1);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "updateBatch",onSucess,1);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "updateBatch",1, onSucess,null);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "updateBatch","aa",onSucess,null);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "updateBatch",null,onSucess,null);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "updateBatch",null,onSucess,null);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "updateBatch",null,null,null);
			TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "updateBatch",null,onSucess,"aa");
		}	
		else{
			TestEngine.test("test_updateBatchN", false);
		}
	}
	
	try{
		var testName = "[test_updateBatchN]";
	    TestEngine.log(testName);
		arrayItems = new Array();
		var objCb = TestEngine.registerCallback("find", OnSucessFindItems, onError);

		tizen.content.find(objCb.successCallback);

	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : test_updateBatchN", false);
	}
}

function UTC_content_scanFile_P_001(){
	var testName = "[UTC_content_scanFile_P_001]";
	TestEngine.log(testName);

	try{
		var path = "/opt/usr/media/Images/image1.jpg";
		tizen.content.scanFile(path);
		TestEngine.test("Exception : UTC_content_scanFile_P_001", true);
	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : UTC_content_scanFile_P_001", false);
	}
}

function UTC_content_scanFile_P_002(){
	var testName = "[UTC_content_scanFile_P_002]";
	TestEngine.log(testName);

	function onScanErrorCallback(err){
		TestEngine.test("onScanError", false);
	}

	function onScanSuccessCallback(path){
		TestEngine.test("onScanSuccess:"+ path, true);
	}


	try{
		var objCb = TestEngine.registerCallback("scanFile", onScanSuccessCallback, onScanErrorCallback,5);

	var path = "/opt/usr/media/Images/imagefile1.jpg";
		tizen.content.scanFile(path,objCb.successCallback);
		tizen.content.scanFile(path,null);
		tizen.content.scanFile(path,objCb.successCallback);
		tizen.content.scanFile(path,objCb.successCallback);
		tizen.content.scanFile(path,objCb.successCallback, objCb.errorCallback);
		tizen.content.scanFile(path,objCb.successCallback, null);
	}catch (e) {
		TestEngine.log("e.code:" + e.code);
		TestEngine.test("Exception : UTC_content_scanFile_P_002", false);
	}
}

function UTC_content_scanFile_N_001(){
	var testName = "[UTC_content_scanFile_N_001]";
	TestEngine.log(testName);
	var path = "/opt/usr/media/Images/image1.jpg";
	TestEngine.catchErrorType("name", INVALID_VALUES_ERR, tizen.content, "scanFile",undefined);
	TestEngine.catchErrorType("name", INVALID_VALUES_ERR, tizen.content, "scanFile",null);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "scanFile",path,1234);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "scanFile",path,"abcdef");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "scanFile",path,false);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "scanFile",path, undefined, 1234);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "scanFile",path, undefined, "abcdef");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "scanFile",path, undefined, false);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "scanFile",path, null, 1234);
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "scanFile",path, null, "abcdef");
	TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "scanFile",path, null, false);

}

function testNoExceptionWithMessage(message, fun) {
    var testResult = true;
    try
    {
        fun();
    }
    catch (e)
    {
        testResult = false;
    }
    TestEngine.test(message, testResult);
}

function UTC_content_setChangeListener_P_001(){
    var update_contnet;
    var testName = "[UTC_content_setChangeListener_P_001]";
    TestEngine.log(testName);
    var listener = {
        oncontentadded: function(content) {
            TestEngine.log("URI:" + content.contentURI);
        },
        oncontentupdated: function(content) {
            TestEngine.log("URI:" + content.contentURI);
            if(content.name == update_contnet.name){
                TestEngine.test("UTC_content_setChangeListener_P_001", true);
            }
            else{
                console.log("content:" + content.name + "/" + "update_content:" + update_contnet.name);
                TestEngine.test("UTC_content_setChangeListener_P_001(listener)", false);
            }
        },
        oncontentremoved: function(id) {
            TestEngine.log("id:" + id);
        }
    };
    testNoExceptionWithMessage("setChangeListener()",
		function(){
			tizen.content.setChangeListener(listener);
		}
    );

    function onFindSuccessCallback(c){
        if(c.length < 0){
            TestEngine.test("UTC_content_setChangeListener_P_001(find)", false);
        }
        update_contnet = c[0];
        c[0].description = "test_description";
        tizen.content.update(c[0]);
        TestEngine.test("UTC_content_setChangeListener_P_001", true);
    };

    function onFindErrorCallback(err){
        TestEngine.test("UTC_content_setChangeListener_P_001(find)", false);
    };

    var objCb = TestEngine.registerCallback("find", onFindSuccessCallback, onFindErrorCallback,1);
    tizen.content.find(objCb.successCallback,objCb.errorCallback);

}

function UTC_content_setChangeListener_N_001(){
	var testName = "[UTC_content_setChangeListener_N_001]";
	TestEngine.log(testName);
    var listener = {
        oncontentadded: function(content) {
            TestEngine.log("URI:" + content.contentURI);
        },
        oncontentupdated: function(content) {
            TestEngine.log("URI:" + content.contentURI);
        },
        oncontentremoved: function(id) {
            TestEngine.log("id:" + id);
        }
    };
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "setChangeListener", 1);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "setChangeListener", null);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "setChangeListener", undefined);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "setChangeListener");
}

function UTC_content_setChangeListener_N_002()
{
    TestEngine.log("UTC_content_setChangeListener_N_002");

    var listener = {
        oncontentadded: function(content) {
            TestEngine.log("URI:" + content.contentURI);
        },
        oncontentupdated: function(content) {
            TestEngine.log("URI:" + content.contentURI);
        },
        oncontentremoved: new Array(1,2,3)
    };
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "setChangeListener", listener);
}

function UTC_content_unsetChangeListener_P_001(){
	var testName = "[UTC_content_unsetChangeListener_P_001]";
	TestEngine.log(testName);

    testNoExceptionWithMessage("setChangeListener()",
		function(){
			tizen.content.unsetChangeListener();
		}
    );
}

function UTC_content_createPlaylist_P_001() {
    var testName = "[UTC_content_createPlaylist_P_001]", objCbCreate;
    TestEngine.log(testName);

    function onSuccess() {
        function createSuccess(playlist) {
            TestEngine.assertEqual("Incorrect playList name", testName, playlist.name);
            TestEngine.assertEqual("Incorrect numberOfTracks", 0, playlist.numberOfTracks);
            TestEngine.test("createSuccess invoked", true);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }
        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_createPlaylist_N_001() {
    var testName = "[UTC_content_createPlaylist_N_001]", objCbCreateFirst, objCbCreateTheSame;
    TestEngine.log(testName);

    function onSuccess () {
        function createTheSameSuccess() {
            TestEngine.test("playlist created with the same name", false);
        }

        function createTheSameFail(err) {
            TestEngine.assertEqual("Incorrect error", INVALID_VALUES_ERR, err.name);
            TestEngine.test("createTheSameFail invoked", true);
        }

        function createFirstSuccess() {
            objCbCreateTheSame = TestEngine.registerCallback("createPlaylist", createTheSameSuccess, createTheSameFail);
            tizen.content.createPlaylist(testName, objCbCreateTheSame.successCallback, objCbCreateTheSame.errorCallback);
        }

        function createFirstFail() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreateFirst = TestEngine.registerCallback("createPlaylist", createFirstSuccess, createFirstFail);
        tizen.content.createPlaylist(testName, objCbCreateFirst.successCallback, objCbCreateFirst.errorCallback);
    }

    removeAllPlayLists(onSuccess);
}

function UTC_content_createPlaylist_N_002() {
    var testName = "[UTC_content_createPlaylist_N_002]";
    TestEngine.log(testName);

    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "1", true);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "2", false);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "3", NaN);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "4", "");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "5", "TIZEN");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "6", []);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "7", { });
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "8", undefined);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "9", null);

    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "11", emptyFunction, true);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "22", emptyFunction, false);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "33", emptyFunction, NaN);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "44", emptyFunction, "");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "55", emptyFunction, "TIZEN");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "66", emptyFunction, []);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "77", emptyFunction, { });
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "88", emptyFunction, undefined);

    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "111",
        emptyFunction, emptyFunction, true);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "222",
        emptyFunction, emptyFunction, false);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "333",
        emptyFunction, emptyFunction, NaN);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "444",
        emptyFunction, emptyFunction, "");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "555",
        emptyFunction, emptyFunction, "TIZEN");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "666",
        emptyFunction, emptyFunction, []);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "777",
        emptyFunction, emptyFunction, { });
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "createPlaylist", testName + "888",
        emptyFunction, emptyFunction, undefined);

    TestEngine.test("TypeMismatchError OK", true);
}

function UTC_content_getPlaylists_P_001() {
    var testName = "[UTC_content_getPlaylists_P_001]", i, foundCounter = 0, objCbCreate, objCbGet;
    TestEngine.log(testName);

    function onSuccess () {
        function getSuccess(playlists) {
            for(i = 0; i < playlists.length; i++) {
                if (playlists[i].name === testName) {
                    foundCounter++;
                }
            }
            TestEngine.assertEqual("Incorrect number of found playlists", 1, foundCounter);
            TestEngine.test("getPlaylists", true);
        }

        function getError() {
            TestEngine.test("getPlaylists", false);
        }

        function createSuccess() {
            objCbGet = TestEngine.registerCallback("getPlaylists", getSuccess, getError);
            tizen.content.getPlaylists(objCbGet.successCallback, objCbGet.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_getPlaylists_N_001() {
    var testName = "[UTC_content_getPlaylists_N_001]";
    TestEngine.log(testName);

    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", true);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", false);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", NaN);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", "");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", "TIZEN");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", []);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", { });
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", undefined);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", null);

    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", emptyFunction, true);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", emptyFunction, false);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", emptyFunction, NaN);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", emptyFunction, "");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", emptyFunction, "TIZEN");
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", emptyFunction, []);
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", emptyFunction, { });
    TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "getPlaylists", emptyFunction, undefined);

    TestEngine.test("TypeMismatchError OK", true);
}

function UTC_content_removePlaylist_P_001() {
    var testName = "[UTC_content_removePlaylist_P_001]", i, foundCounter = 0, objCbCreate, objCbGet,
        objCbRemove;
    TestEngine.log(testName);

    function onSuccess () {
        function getSuccess(playlists) {
            for(i = 0; i < playlists.length; i++) {
                if (playlists[i].name === testName) {
                    foundCounter++;
                }
            }
            TestEngine.assertEqual("Incorrect number of found playlists", 0, foundCounter);
            TestEngine.test("getPlaylists", true);
        }

        function getError() {
            TestEngine.test("getPlaylists", false);
        }

        function removeSuccess() {
            objCbGet = TestEngine.registerCallback("getPlaylists", getSuccess, getError);
            tizen.content.getPlaylists(objCbGet.successCallback, objCbGet.errorCallback);
        }

        function removeError() {
            TestEngine.test("removePlaylist", false);
        }

        function createSuccess(playlist) {
            objCbRemove = TestEngine.registerCallback("removePlaylist", removeSuccess, removeError);
            tizen.content.removePlaylist(playlist.id, objCbRemove.successCallback, objCbRemove.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_removePlaylist_N_001() {
    var testName = "[UTC_content_removePlaylist_N_001]", objCbCreate;
    TestEngine.log(testName);

    function onSuccess() {
        function createSuccess(playlist) {
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, []);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, undefined);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, emptyFunction, true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, emptyFunction, false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, emptyFunction, NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, emptyFunction, "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, emptyFunction, "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, emptyFunction, []);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, emptyFunction, { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, tizen.content, "removePlaylist", playlist.id, emptyFunction, undefined);

            TestEngine.test("TypeMismatchError OK", true);
        }

        function createError() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createError);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_removePlaylist_N_002() {
    var testName = "[UTC_content_removePlaylist_N_002]", playlistIdToRemove, found = false, i,
        objCbRemove, objCbGet;
    TestEngine.log(testName);

    function removeSuccess() {
        TestEngine.test("removed not existing playlist id without exception", true);
    }

    function removeError(err) {
        TestEngine.test("removeError invoked", false);
    }

    function getSuccess(playlists) {
        if (playlists.length === 0) {
            playlistIdToRemove = -2147483648;
        } else {
            for (playlistIdToRemove = -2147483648; playlistIdToRemove < 2147483647; playlistIdToRemove++) {
                found = false;
                for(i = 0; i < playlists.length; i++) {
                    if (playlists[i].id === "a" + playlistIdToRemove.toString()) {
                        found = true;
                        break;
                    }
                }
                if (found) {
                    continue;
                } else {
                    break;
                }
            }
        }
        objCbRemove = TestEngine.registerCallback("removePlaylist", removeSuccess, removeError);
        tizen.content.removePlaylist("a" + playlistIdToRemove, objCbRemove.successCallback, objCbRemove.errorCallback);
    }

    function getError() {
        TestEngine.test("getPlaylists", false);
    }

    objCbGet = TestEngine.registerCallback("getPlaylists", getSuccess, getError);
    tizen.content.getPlaylists(objCbGet.successCallback, objCbGet.errorCallback);
}

function UTC_content_playlist_name_P_001() {
    var testName = "[UTC_content_playlist_name_P_001]", objCbCreate, objCbGet;
    TestEngine.log(testName);

    function onSuccess() {
        function getSuccess(playlists) {
            TestEngine.assertEqual("Incorrect length of playlists", 1, playlists.length);
            TestEngine.assertEqual("Incorrect playList name", testName + "102", playlists[0].name);

            TestEngine.test("update", true);
        }

        function getError() {
            TestEngine.test("getPlaylists", false);
        }

        function createSuccess(playlist) {
            TestEngine.assertEqual("Incorrect playList name", testName, playlist.name);

            playlist.name = testName + "102";
            TestEngine.assertEqual("Incorrect playList name after assignment", testName + "102", playlist.name);

            objCbGet = TestEngine.registerCallback("getPlaylists", getSuccess, getError);
            tizen.content.getPlaylists(objCbGet.successCallback, objCbGet.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_playlist_name_N_001() {
    var testName = "[UTC_content_playlist_name_N_001]", objCbCreateFirst, objCbCreateSecond, objCbUpdate;
    TestEngine.log(testName);

    function onSuccess() {

        function createSecondSuccess(playlist) {
            TestEngine.assertEqual("Incorrect playList name", testName + "303", playlist.name);
            try {
                playlist.name = testName;
                TestEngine.test("Duplicated playlist name written", false);
            } catch (e) {
                TestEngine.assertEqual("Incorrect exception after creating playlist with duplicated name", INVALID_VALUES_ERR, e.name);
            }
        }

        function createSecondFail() {
            TestEngine.test("createPlaylist", false);
        }

        function createFirstSuccess() {
            objCbCreateSecond = TestEngine.registerCallback("createPlaylist", createSecondSuccess, createSecondFail);
            tizen.content.createPlaylist(testName + "303", objCbCreateSecond.successCallback, objCbCreateSecond.errorCallback);
        }

        function createFirstFail() {
            TestEngine.test("createPlaylist first", false);
        }

        objCbCreateFirst = TestEngine.registerCallback("createPlaylist", createFirstSuccess, createFirstFail);
        tizen.content.createPlaylist(testName, objCbCreateFirst.successCallback, objCbCreateFirst.errorCallback);
    }

    removeAllPlayLists(onSuccess);
}

function UTC_content_playlist_thumbnailURI_P_002() {
    var testName = "[UTC_content_playlist_thumbnailURI_P_002]", objCbCreate, objCbGet;
    TestEngine.log(testName);

    function onSuccess() {
        function getSuccess(playlists) {
            TestEngine.assertEqual("Incorrect length of playlists", 1, playlists.length);
            TestEngine.assertEqual("Incorrect playList thumbnailURI",
                "file:///opt/usr/media/Images/imagefile1.jpg", playlists[0].thumbnailURI);

            TestEngine.test("update", true);
        }

        function getError() {
            TestEngine.test("getPlaylists", false);
        }

        function createSuccess(playlist) {
            TestEngine.assertEqual("Incorrect playList name", testName, playlist.name);

            playlist.thumbnailURI = "file:///opt/usr/media/Images/imagefile1.jpg";
            TestEngine.assertEqual("Incorrect playList thumbnailURI after assignment",
                "file:///opt/usr/media/Images/imagefile1.jpg", playlist.thumbnailURI);

            objCbGet = TestEngine.registerCallback("getPlaylists", getSuccess, getError);
            tizen.content.getPlaylists(objCbGet.successCallback, objCbGet.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_playlist_thumbnailURI_N_002() {
    var testName = "[UTC_content_playlist_thumbnailURI_N_002]", objCbCreate, objCbUpdate;
    TestEngine.log(testName);

    function onSuccess() {
        function createSuccess(playlist) {
            try {
                playlist.thumbnailURI = "not valid URI";
                TestEngine.test("Incorrect thumbnailURI written", false);
            } catch (e) {
                TestEngine.assertEqual("Incorrect exception after incorrect thumbnailURI was written", INVALID_VALUES_ERR, e.name);
            }
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_add_P_001() {
    var testName = "[UTC_content_add_P_001]", contentURI, contentToAdd, filter, contents,
        objCbScan, objCbFind, objCbCreate;
    TestEngine.log(testName);

    function onSuccess() {
        function createSuccess(playlist) {
            TestEngine.assertEqual("Incorrect number of tracks (before add)", 0, playlist.numberOfTracks);
            playlist.add(contentToAdd);
            TestEngine.assertEqual("Incorrect number of tracks (after add)", 1, playlist.numberOfTracks);

            TestEngine.test("add", true);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(contents) {
            TestEngine.assertEqual("Incorrect number of found contents", 1, contents.length);
            contentToAdd = contents[0];
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess(receivedContentURI) {
            contentURI = receivedContentURI;
            filter = new tizen.AttributeFilter("contentURI", "EXACTLY", contentURI);

            objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
            tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_add_N_001() {
    var testName = "[UTC_content_add_N_001]", objCbCreate;
    TestEngine.log(testName);

    function onSuccess() {
        function createSuccess(playlist) {
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "add", true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "add", false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "add", NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "add", 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "add", "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "add", "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "add", undefined);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "add", null);

            TestEngine.test("add", true);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_addBatch_P_001() {
    var testName = "[UTC_content_addBatch_P_001]", scanCounter = 0, filter, filter1, filter2, filter3, contents,
        createdPlaylist, objCbScan, objCbFind, objCbCreate, objCbAddBatch;
    TestEngine.log(testName);

    function onSuccess() {

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks (after addBatch)", 3, createdPlaylist.numberOfTracks);

            TestEngine.test("addBatch", true);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            TestEngine.assertEqual("Incorrect number of tracks (before addBatch)", 0, createdPlaylist.numberOfTracks);
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError, 3);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_addBatch_N_001() {
    var testName = "[UTC_content_addBatch_N_001]", contentURI, contentToAdd, filter,
        objCbScan, objCbFind, objCbCreate;
    TestEngine.log(testName);

    function onSuccess() {
        function createSuccess(playlist) {
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", function () { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", undefined);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", null);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], undefined);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], emptyFunction, true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], emptyFunction, false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], emptyFunction, NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], emptyFunction, 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], emptyFunction, "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], emptyFunction, "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "addBatch", [contentToAdd], emptyFunction, undefined);

            TestEngine.test("addBatch", true);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(contents) {
            TestEngine.assertEqual("Incorrect number of found contents", 1, contents.length);
            contentToAdd = contents[0];
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess(receivedContentURI) {
            contentURI = receivedContentURI;
            filter = new tizen.AttributeFilter("contentURI", "EXACTLY", contentURI);
            objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
            tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_remove_P_001() {
    var testName = "[UTC_content_remove_P_001]", contentURI, contentToAdd, filter,
        objCbScan, objCbFind, objCbCreate, createdPlaylist, objCbGet;
    TestEngine.log(testName);

    function onSuccess() {

        function getSuccess(items) {
            TestEngine.assertEqual("items incorrect length", 1, items.length);

            createdPlaylist.remove(items[0]);
            TestEngine.assertEqual("Incorrect number of tracks after remove", 0, createdPlaylist.numberOfTracks);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            TestEngine.assertEqual("Incorrect number of tracks before add", 0, createdPlaylist.numberOfTracks);
            createdPlaylist.add(contentToAdd);
            TestEngine.assertEqual("Incorrect number of tracks after add", 1, createdPlaylist.numberOfTracks);

            objCbGet = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGet.successCallback, objCbGet.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(contents) {
            TestEngine.assertEqual("Incorrect number of found contents", 1, contents.length);
            contentToAdd = contents[0];
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess(receivedContentURI) {
            contentURI = receivedContentURI;
            filter = new tizen.AttributeFilter("contentURI", "EXACTLY", contentURI);
            objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
            tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_remove_N_001() {
    var testName = "[UTC_content_remove_N_001]", objCbCreate;
    TestEngine.log(testName);

    function onSuccess() {
        function createSuccess(playlist) {
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "remove", true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "remove", false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "remove", NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "remove", 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "remove", "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "remove", "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "remove", undefined);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "remove", null);

            TestEngine.test("remove", true);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_removeBatch_P_001() {
    var testName = "[UTC_content_removeBatch_P_001]", scanCounter = 0, filter, filter1, filter2, filter3, contents,
        createdPlaylist, objCbScan, objCbFind, objCbCreate, objCbAddBatch, objCbRemoveBatch, objCbGet;
    TestEngine.log(testName);

    function onSuccess() {

        function removeBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after removeBatch", 0, createdPlaylist.numberOfTracks);
        }

        function removeBatchError() {
            TestEngine.test("removeBatch", false);
        }

        function getSuccess(items) {
            TestEngine.assertEqual("items incorrect length", 3, items.length);

            objCbRemoveBatch = TestEngine.registerCallback("removeBatch", removeBatchSuccess, removeBatchError);
            createdPlaylist.removeBatch(items, objCbRemoveBatch.successCallback, objCbRemoveBatch.errorCallback);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after addBatch", 3, createdPlaylist.numberOfTracks);
            objCbGet = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGet.successCallback, objCbGet.errorCallback);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError,3 );
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_removeBatch_N_001() {
    var testName = "[UTC_content_removeBatch_N_001]", contentURI, contentToAdd, filter,
        objCbScan, objCbFind, objCbCreate;
    TestEngine.log(testName);

    function onSuccess() {
        function createSuccess(playlist) {
            playlist.add(contentToAdd);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", function () { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", undefined);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", null);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], undefined);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], emptyFunction, true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], emptyFunction, false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], emptyFunction, NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], emptyFunction, 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], emptyFunction, "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], emptyFunction, "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "removeBatch", [contentToAdd], emptyFunction, undefined);

            TestEngine.test("removeBatch", true);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(contents) {
            TestEngine.assertEqual("Incorrect number of found contents", 1, contents.length);
            contentToAdd = contents[0];
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess(receivedContentURI) {
            contentURI = receivedContentURI;
            filter = new tizen.AttributeFilter("contentURI", "EXACTLY", contentURI);
            objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
            tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_get_P_001() {
    var testName = "[UTC_content_get_P_001]", scanCounter = 0, filter, filter1, filter2, filter3, contents,
        createdPlaylist, objCbScan, objCbFind, objCbCreate, objCbAddBatch, objCbGetItems;
    TestEngine.log(testName);

    function onSuccess() {

        function getSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get", 2, items.length);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after addBatch", 3, createdPlaylist.numberOfTracks);
            objCbGetItems = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGetItems.successCallback, objCbGetItems.errorCallback, 100, 1);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError, 3);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_get_N_001() {
    var testName = "[UTC_content_get_N_001]", objCbCreate;
    TestEngine.log(testName);

    function onSuccess() {
        function createSuccess(playlist) {
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", []);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", undefined);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", null);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", emptyFunction, true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", emptyFunction, false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", emptyFunction, NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", emptyFunction, 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", emptyFunction, "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", emptyFunction, "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", emptyFunction, []);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", emptyFunction, { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, playlist, "get", emptyFunction, undefined);

            TestEngine.test("get", true);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
        tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_setOrder_P_001() {
    var testName = "[UTC_content_setOrder_P_001]", scanCounter = 0, filter, filter1, filter2, filter3, contents, i,
        reversedItems, createdPlaylist, objCbScan, objCbFind, objCbCreate, objCbAddBatch, objCbGetItems, objCbSetOrder,
        objCbGetItemsAfterSet;
    TestEngine.log(testName);

    function onSuccess() {

        function getAfterSetSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get (invoked after setOrder)", 3, items.length);
            for(i = 0; i < items.length; i++) {
                TestEngine.assertEqual("Incorrect contentURI", reversedItems[i].content.contentURI, items[i].content.contentURI);
            }
        }

        function getAfterSetError() {
            TestEngine.test("get after setOrder", false);
        }

        function setSuccess() {
            objCbGetItemsAfterSet = TestEngine.registerCallback("get", getAfterSetSuccess, getAfterSetError);
            createdPlaylist.get(objCbGetItemsAfterSet.successCallback, objCbGetItemsAfterSet.errorCallback);
        }

        function setError() {
            TestEngine.test("setOrder", false);
        }

        function getSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get", 3, items.length);
            items.reverse();
            reversedItems = items;
            objCbSetOrder = TestEngine.registerCallback("setOrder", setSuccess, setError);
            createdPlaylist.setOrder(reversedItems, objCbSetOrder.successCallback, objCbSetOrder.errorCallback);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after addBatch", 3, createdPlaylist.numberOfTracks);
            objCbGetItems = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGetItems.successCallback, objCbGetItems.errorCallback);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError, 3);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_setOrder_N_001() {
    var testName = "[UTC_content_setOrder_N_001]", createdPlaylist,
        contents, scanCounter = 0, filter1, filter2, filter3, filter,
        objCbScan, objCbFind, objCbCreate, objCbAddBatch, objCbGetItems;
    TestEngine.log(testName);

    function onSuccess() {
        function getSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get", 3, items.length);
            items.reverse();
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", function () { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", undefined);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", null);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, []);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, undefined);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, emptyFunction, true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, emptyFunction, false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, emptyFunction, NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, emptyFunction, 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, emptyFunction, "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, emptyFunction, "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, emptyFunction, []);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, emptyFunction, { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "setOrder", items, emptyFunction, undefined);

            TestEngine.test("setOrder", true);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after addBatch", 3, createdPlaylist.numberOfTracks);
            objCbGetItems = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGetItems.successCallback, objCbGetItems.errorCallback);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError, 3);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_move_P_001() {
    var testName = "[UTC_content_move_P_001]", scanCounter = 0, filter, filter1, filter2, filter3, contents,
        itemsBeforeMove, createdPlaylist, objCbScan, objCbFind, objCbCreate, objCbAddBatch, objCbGetItems,
        objCbMove, objCbGetItemsAfterMove;
    TestEngine.log(testName);

    function onSuccess() {

        function getAfterMoveSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get (invoked after move)", 3, items.length);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[1].content.contentURI, items[0].content.contentURI);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[0].content.contentURI, items[1].content.contentURI);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[2].content.contentURI, items[2].content.contentURI);

            TestEngine.test("move", true);
        }

        function getAfterMoveError() {
            TestEngine.test("get after setOrder", false);
        }

        function moveSuccess() {
            objCbGetItemsAfterMove = TestEngine.registerCallback("get", getAfterMoveSuccess, getAfterMoveError);
            createdPlaylist.get(objCbGetItemsAfterMove.successCallback, objCbGetItemsAfterMove.errorCallback);
        }

        function moveError() {
            TestEngine.test("move", false);
        }

        function getSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get", 3, items.length);
            itemsBeforeMove = items;
            objCbMove = TestEngine.registerCallback("move", moveSuccess, moveError);
            createdPlaylist.move(itemsBeforeMove[1], -1000, objCbMove.successCallback, objCbMove.errorCallback);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after addBatch", 3, createdPlaylist.numberOfTracks);
            objCbGetItems = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGetItems.successCallback, objCbGetItems.errorCallback);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError, 3);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_move_P_002() {
    var testName = "[UTC_content_move_P_002]", scanCounter = 0, filter, filter1, filter2, filter3, contents,
        itemsBeforeMove, createdPlaylist, objCbScan, objCbFind, objCbCreate, objCbAddBatch, objCbGetItems,
        objCbMove, objCbGetItemsAfterMove;
    TestEngine.log(testName);

    function onSuccess() {

        function getAfterMoveSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get (invoked after move)", 3, items.length);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[1].content.contentURI, items[0].content.contentURI);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[0].content.contentURI, items[1].content.contentURI);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[2].content.contentURI, items[2].content.contentURI);

            TestEngine.test("move", true);
        }

        function getAfterMoveError() {
            TestEngine.test("get after setOrder", false);
        }

        function moveSuccess() {
            objCbGetItemsAfterMove = TestEngine.registerCallback("get", getAfterMoveSuccess, getAfterMoveError);
            createdPlaylist.get(objCbGetItemsAfterMove.successCallback, objCbGetItemsAfterMove.errorCallback);
        }

        function moveError() {
            TestEngine.test("move", false);
        }

        function getSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get", 3, items.length);
            itemsBeforeMove = items;
            objCbMove = TestEngine.registerCallback("move", moveSuccess, moveError);
            createdPlaylist.move(itemsBeforeMove[1], -1, objCbMove.successCallback, objCbMove.errorCallback);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after addBatch", 3, createdPlaylist.numberOfTracks);
            objCbGetItems = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGetItems.successCallback, objCbGetItems.errorCallback);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError, 3);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_move_P_003() {
    var testName = "[UTC_content_move_P_003]", scanCounter = 0, filter, filter1, filter2, filter3, contents,
        itemsBeforeMove, createdPlaylist, objCbScan, objCbFind, objCbCreate, objCbAddBatch, objCbGetItems,
        objCbMove, objCbGetItemsAfterMove;
    TestEngine.log(testName);

    function onSuccess() {

        function getAfterMoveSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get (invoked after move)", 3, items.length);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[0].content.contentURI, items[0].content.contentURI);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[2].content.contentURI, items[1].content.contentURI);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[1].content.contentURI, items[2].content.contentURI);

            TestEngine.test("move", true);
        }

        function getAfterMoveError() {
            TestEngine.test("get after setOrder", false);
        }

        function moveSuccess() {
            objCbGetItemsAfterMove = TestEngine.registerCallback("get", getAfterMoveSuccess, getAfterMoveError);
            createdPlaylist.get(objCbGetItemsAfterMove.successCallback, objCbGetItemsAfterMove.errorCallback);
        }

        function moveError() {
            TestEngine.test("move", false);
        }

        function getSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get", 3, items.length);
            itemsBeforeMove = items;
            objCbMove = TestEngine.registerCallback("move", moveSuccess, moveError);
            createdPlaylist.move(itemsBeforeMove[1], 1000, objCbMove.successCallback, objCbMove.errorCallback);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after addBatch", 3, createdPlaylist.numberOfTracks);
            objCbGetItems = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGetItems.successCallback, objCbGetItems.errorCallback);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError, 3);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_move_P_004() {
    var testName = "[UTC_content_move_P_004]", scanCounter = 0, filter, filter1, filter2, filter3, contents,
        itemsBeforeMove, createdPlaylist, objCbScan, objCbFind, objCbCreate, objCbAddBatch, objCbGetItems,
        objCbMove, objCbGetItemsAfterMove;
    TestEngine.log(testName);

    function onSuccess() {

        function getAfterMoveSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get (invoked after move)", 3, items.length);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[0].content.contentURI, items[0].content.contentURI);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[2].content.contentURI, items[1].content.contentURI);
            TestEngine.assertEqual("Incorrect contentURI", itemsBeforeMove[1].content.contentURI, items[2].content.contentURI);

            TestEngine.test("move", true);
        }

        function getAfterMoveError() {
            TestEngine.test("get after setOrder", false);
        }

        function moveSuccess() {
            objCbGetItemsAfterMove = TestEngine.registerCallback("get", getAfterMoveSuccess, getAfterMoveError);
            createdPlaylist.get(objCbGetItemsAfterMove.successCallback, objCbGetItemsAfterMove.errorCallback);
        }

        function moveError() {
            TestEngine.test("move", false);
        }

        function getSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get", 3, items.length);
            itemsBeforeMove = items;
            objCbMove = TestEngine.registerCallback("move", moveSuccess, moveError);
            createdPlaylist.move(itemsBeforeMove[1], 1, objCbMove.successCallback, objCbMove.errorCallback);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after addBatch", 3, createdPlaylist.numberOfTracks);
            objCbGetItems = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGetItems.successCallback, objCbGetItems.errorCallback);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError, 3);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_move_N_001() {
    var testName = "[UTC_content_move_N_001]", scanCounter = 0, filter, filter1, filter2, filter3, contents,
        createdPlaylist, objCbScan, objCbFind, objCbCreate, objCbAddBatch, objCbGetItems;
    TestEngine.log(testName);

    function onSuccess() {
        function getSuccess(items) {
            TestEngine.assertEqual("Incorrect number of items after get", 3, items.length);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", true, 1);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", false, 1);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", NaN, 1);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", 0, 1);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", "", 1);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", "TIZEN", 1);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", undefined, 1);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", null, 1);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, []);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, undefined);

            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, emptyFunction, true);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, emptyFunction, false);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, emptyFunction, NaN);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, emptyFunction, 0);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, emptyFunction, "");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, emptyFunction, "TIZEN");
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, emptyFunction, []);
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, emptyFunction, { });
            TestEngine.catchErrorType("name", TYPE_MISMATCH_ERR, createdPlaylist, "move", items[0], 1, emptyFunction, undefined);

            TestEngine.test("move", true);
        }

        function getError() {
            TestEngine.test("get", false);
        }

        function addBatchSuccess() {
            TestEngine.assertEqual("Incorrect number of tracks after addBatch", 3, createdPlaylist.numberOfTracks);
            objCbGetItems = TestEngine.registerCallback("get", getSuccess, getError);
            createdPlaylist.get(objCbGetItems.successCallback, objCbGetItems.errorCallback);
        }

        function addBatchError() {
            TestEngine.test("addBatch", false);
        }

        function createSuccess(playlist) {
            createdPlaylist = playlist;
            objCbAddBatch = TestEngine.registerCallback("addBatch", addBatchSuccess, addBatchError);
            createdPlaylist.addBatch(contents, objCbAddBatch.successCallback, objCbAddBatch.errorCallback);
        }

        function createFail() {
            TestEngine.test("createPlaylist", false);
        }

        function findSuccess(foundContents) {
            TestEngine.assertEqual("Incorrect number of found contents", 3, foundContents.length);
            contents = foundContents;
            objCbCreate = TestEngine.registerCallback("createPlaylist", createSuccess, createFail);
            tizen.content.createPlaylist(testName, objCbCreate.successCallback, objCbCreate.errorCallback);
        }

        function findError() {
            TestEngine.test("find", false);
        }

        function scanSuccess() {
            scanCounter++;
            if (scanCounter === 3) {
                filter1 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile1.mp3");
                filter2 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile2.mp3");
                filter3 = new tizen.AttributeFilter("contentURI", "EXACTLY", "file:///opt/usr/media/Music/musicfile3.mp3");
                filter = new tizen.CompositeFilter("UNION", [filter1, filter2, filter3]);
                objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
                tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
            }
        }

        function scanError() {
            TestEngine.test("scanFile", false);
        }

        objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError, 3);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile2.mp3", objCbScan.successCallback, objCbScan.errorCallback);
        tizen.content.scanFile("file:///opt/usr/media/Music/musicfile3.mp3", objCbScan.successCallback, objCbScan.errorCallback);
    }
    removeAllPlayLists(onSuccess);
}

function UTC_content_Content_isFavorite() {
    var filter, contentToChange, valueToSet, objCbScan, objCbFind, objCbFind2;

    function findSuccessAfterChange(contents) {
        TestEngine.assertEqual("Incorrect number of found contents", 1, contents.length);
        TestEngine.assertEqual("Incorrect content.isFavorite", valueToSet, contents[0].isFavorite);
    }

    function findErrorAfterChange() {
        TestEngine.test("findErrorAfterChange", false);
    }

    function findSuccess(contents) {
        TestEngine.assertEqual("Incorrect number of found contents", 1, contents.length);
        contentToChange = contents[0];

        TestEngine.test("content.isFavorite not exist", "isFavorite" in contentToChange);

        valueToSet = !contentToChange.isFavorite;
        contentToChange.isFavorite = valueToSet;
        tizen.content.update(contentToChange);

        objCbFind2 = TestEngine.registerCallback("find", findSuccessAfterChange, findErrorAfterChange);
        tizen.content.find(objCbFind2.successCallback, objCbFind2.errorCallback, null, filter);
    }

    function findError() {
        TestEngine.test("find", false);
    }

    function scanSuccess(receivedContentURI) {
        filter = new tizen.AttributeFilter("contentURI", "EXACTLY", receivedContentURI);

        objCbFind = TestEngine.registerCallback("find", findSuccess, findError);
        tizen.content.find(objCbFind.successCallback, objCbFind.errorCallback, null, filter);
    }

    function scanError() {
        TestEngine.test("scanFile", false);
    }

    objCbScan = TestEngine.registerCallback("scanFile", scanSuccess, scanError);
    tizen.content.scanFile("file:///opt/usr/media/Music/musicfile1.mp3", objCbScan.successCallback, objCbScan.errorCallback);
}