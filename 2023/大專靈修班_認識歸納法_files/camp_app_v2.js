/** js call app code function --start **/
function callAppTest(  ){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		AndroidJSInterface.showToastMsg("js call app code test");
	}
}

function callAppLogout(  ){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		AndroidJSInterface.logout();
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				webkit.messageHandlers.CefCamp.postMessage("logout");
			}
		}
	}
	
}

function callAppLogin( redirect_url ){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		AndroidJSInterface.login( redirect_url );
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				webkit.messageHandlers.CefCamp.postMessage({action: "login", redirect: redirect_url});
			}
		}
	}
}


//(2021/06/17, new added)
function callAppCloseApp(){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		AndroidJSInterface.closeApp();
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				webkit.messageHandlers.CefCamp.postMessage({action: "close_app"});
			}
		}
	}
}

function callAppShowImageZoomDialog( image_url, image_brief ){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		AndroidJSInterface.showImageZoomDialog( image_url, image_brief );
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				//webkit.messageHandlers.CefCamp.postMessage({action: "showimage", url: image_url});
				webkit.messageHandlers.CefCamp.postMessage({action: "showimage", url: image_url, brief: image_brief});
			}
		}
	}
}	

//function callCampAppLogin( redirect_url ){
//	// Android
//	if( typeof AndroidJSInterface != "undefined" ){
//		AndroidJSInterface.appLogin( redirect_url );
//	}
//	// iOS
//	
//}

function callAppVerifyUpdateAndroidApp( app_version_name ){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		if( typeof AndroidJSInterface.verifyUpdateApp != "undefined" ){
			AndroidJSInterface.verifyUpdateApp( app_version_name ); 
		}
	}
}

function callAppGotoMainPage(){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		if( typeof AndroidJSInterface.gotoAppMainPage != "undefined" ){
			AndroidJSInterface.gotoAppMainPage( );
		}
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				webkit.messageHandlers.CefCamp.postMessage({action: "goto_main_page"});
			}
		}
	}
}


/* menu vs notice new version --start */
function callAppSwitchNoticeReadedIcon( is_readed ){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		if( typeof AndroidJSInterface.switchNoticeReadedIcon != "undefined" ){
			AndroidJSInterface.switchNoticeReadedIcon( is_readed );
		}
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				webkit.messageHandlers.CefCamp.postMessage({action: "switchNoticeReadedIcon", is_readed: is_readed});
			}
		}
	}
}

function callAppSwitchUserNickName( user_nickname ){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		if( typeof AndroidJSInterface.switchUserNickName != "undefined" ){
			AndroidJSInterface.switchUserNickName( user_nickname );
		}
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				webkit.messageHandlers.CefCamp.postMessage({action: "switchUserNickName", user_nickname: user_nickname});
			}
		}
	}
}

function callAppSwitchUserIcons(){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		if( typeof AndroidJSInterface.switchUserIcons != "undefined" ){
			AndroidJSInterface.switchUserIcons();
		}
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				webkit.messageHandlers.CefCamp.postMessage({action: "switchUserIcons"});
			}
		}
	}
}

function callAppSwitchHeaderLoginIcon( ){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		if( typeof AndroidJSInterface.switchHeaderLoginIcon != "undefined" ){
			AndroidJSInterface.switchHeaderLoginIcon();
		}
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				webkit.messageHandlers.CefCamp.postMessage({action: "switchHeaderLoginIcon"});
			}
		}
	}
}

function callAppHideUserNLoginIcons(){
	// Android
	if( typeof AndroidJSInterface != "undefined" ){
		if( typeof AndroidJSInterface.hideUserNLoginIcons != "undefined" ){
			AndroidJSInterface.hideUserNLoginIcons();
		}
	}
	// iOS
	if( typeof webkit != "undefined" ){
		if( typeof webkit.messageHandlers != "undefined" ){
			if( typeof webkit.messageHandlers.CefCamp != "undefined" ){
				webkit.messageHandlers.CefCamp.postMessage({action: "hideUserNLoginIcons"});
			}
		}
	}
}
/* menu vs notice new version --end */

function triggerCallAppShowImageZoomDialog(this_obj){
	var app_show_image_zoom = 0;
	if ( (typeof $(this_obj).data("app_show_image_zoom")) != "undefined" ){
		app_show_image_zoom = $(this_obj).data("app_show_image_zoom");
	}
	if( app_show_image_zoom == 1 ){
		var image_url = "";
		if( (typeof $(this_obj).data("app_image_zoom_url")) != "undefined" ){
			if( $.trim($(this_obj).data("app_image_zoom_url")) != "" && $(this_obj).data("app_image_zoom_url") != null ){
				image_url = $.trim($(this_obj).data("app_image_zoom_url")) ;
			}
		}
		var image_brief = "";
		if ( (typeof $(this_obj).data("app_image_brief")) != "undefined" ){
			if( $.trim($(this_obj).data("app_image_brief")) != "" && $(this_obj).data("app_image_brief") != null ){
				image_brief = $(this_obj).data("app_image_brief");
			}
		}
		if( image_url.length > 0 ){
			callAppShowImageZoomDialog( image_url, image_brief );
		}
	}
}

$(document).ready(function() {
	/*$(document).on( "click", ".app_image_view", function( event ) {
		var image_url = $(this).data("imgurl");
		if( image_url.length > 0 ){
			callAppShowImageZoomDialog( image_url );
		}
	});*/
	//$(document).on( "click", ".app_image_view", function( event ) {
	$(document).on( "click", "img.app_image_view", function( event ) {
		var app_show_image_zoom = 0;
		if ( (typeof $(this).data("app_show_image_zoom")) != "undefined" ){
			app_show_image_zoom = $(this).data("app_show_image_zoom");
		}
		if( app_show_image_zoom == 1 ){
			var image_url = $(this).get(0).attributes.src.value; //$(this).attr("src");
			if( (typeof $(this).data("app_image_zoom_url")) != "undefined" ){
				if( $.trim($(this).data("app_image_zoom_url")) != "" && $(this).data("app_image_zoom_url") != null ){
					image_url = $.trim($(this).data("app_image_zoom_url")) ;
				}
			}
			var image_brief = "";
			if ( (typeof $(this).data("app_image_brief")) != "undefined" ){
				if( $.trim($(this).data("app_image_brief")) != "" && $(this).data("app_image_brief") != null ){
					image_brief = $(this).data("app_image_brief");
				}
			}
			if( image_url.length > 0 ){
				callAppShowImageZoomDialog( image_url, image_brief );
			}
		}
	});
	// (new added)
	$(document).on( "click", "div.app_image_view", function( event ) {
		var app_show_image_zoom = 0;
		if ( (typeof $(this).data("app_show_image_zoom")) != "undefined" ){
			app_show_image_zoom = $(this).data("app_show_image_zoom");
		}
		if( app_show_image_zoom == 1 ){
			var image_url = "";
			if( (typeof $(this).data("app_image_zoom_url")) != "undefined" ){
				if( $.trim($(this).data("app_image_zoom_url")) != "" && $(this).data("app_image_zoom_url") != null ){
					image_url = $.trim($(this).data("app_image_zoom_url")) ;
				}
			}
			var image_brief = "";
			if ( (typeof $(this).data("app_image_brief")) != "undefined" ){
				if( $.trim($(this).data("app_image_brief")) != "" && $(this).data("app_image_brief") != null ){
					image_brief = $(this).data("app_image_brief");
				}
			}
			if( image_url.length > 0 ){
				callAppShowImageZoomDialog( image_url, image_brief );
			}
		}
	});
});

/** js call app code function --end **/


/** app call js function --start **/
//(2021/06/17, new added)
function appCallBack(app_name){
	switch(app_name){
		case "biblecamp":
		default:	
		var confirm_exiting = false;	
		var current_url = location.href;
		//var main_page_url = "https://www.cef.tw/cefcamp/camp_main.php?camp=biblecamp"; 
		var main_page_url = "https://www.cef.tw/cefcamp/camp_main.php";
		//var check_exit_filter = false;
	    var exit_filter_array = ["/cefcamp/camp_list.php", "/cefcamp/post_action_main.php", "&camp_home=1"];
	    var pager_url_filter = ["/cefcamp/notice_main.php","/cefcamp/group_notice.php","/cefcamp/notice_main_search.php"];
	
	    if( current_url.search(main_page_url) > -1 ){
	    	confirm_exiting = true;	
	    }
	    if( !confirm_exiting ){
	    	if( exit_filter_array.length > 0 ){
	            var i;
	            for (i = 0; i < exit_filter_array.length ; i++) {
	                if( current_url.search(exit_filter_array[i]) > -1 ){
	                	confirm_exiting = true;
	                    break;
	                }
	            }
	        }
	    }
	    //test
	    //window.alert(document.referrer);
	    
	    if(confirm_exiting){
	    	callAppCloseApp();
	    }
	    else{
	    	if( window.history.length > 1 ) {
	    		var goback_num = 1;
	    		if( window.history.length > 2 ){
	    			if( pager_url_filter.length > 0 ){
	    	            var i;
	    	            for (i = 0; i < pager_url_filter.length ; i++) {
	    	                if( current_url.search(pager_url_filter[i]) > -1 && current_url.search("#") > -1 ){
	    	                	goback_num = 2;
	    	                    break;
	    	                }
	    	            }
	    	        }
	    		}
	    		if( goback_num > 1 ){
	    			window.history.go(-goback_num);
	    		}
	    		else{
	    			window.history.back();
	    		}
	    		//window.history.back();
	    		/*if( !(document.referrer === '') ){
    				var backurl = document.referrer;
    				if( backurl.search("app_login=1") < 0 ){
    	                if( backurl.search(/\?/) > -1 )
    	                    backurl += "&app_login=1";
    	                else
    	                    backurl += "?app_login=1";
    	            }
    				location.href = backurl;
    			}
    			else{
    				callAppCloseApp();
    			}*/
	    	}
	    	else{
	    		callAppCloseApp();
	    	}
	    }
	    break;
	}
}

/* menu vs notice new version --start */
function appCallGotoCampPersonalPage(  ){
	if( typeof gotoCampPersonalPage != "undefined" )
		gotoCampPersonalPage(  );
}

function appCallSlideCampNotice(){
	if( typeof slideCampNotice != "undefined" )
		slideCampNotice();
}
/* menu vs notice new version --end */

/** app call js function --end **/
