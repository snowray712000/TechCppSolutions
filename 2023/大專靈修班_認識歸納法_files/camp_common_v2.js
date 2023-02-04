/*function openNav() {
    document.getElementById("menuSidebar").style.width = "220px";
    document.getElementById("menu_main").style.marginRight = "220px";
    document.getElementById("menu_main").style.visibility = "hidden";
    
    $("#menuSidebar").data("display", 1);
}

function closeNav() {
    document.getElementById("menuSidebar").style.width = "0";
    document.getElementById("menu_main").style.marginRight= "0";
    document.getElementById("menu_main").style.visibility = "visible";
    
    $("#menuSidebar").data("display", 0);
}*/

/** app code call js function or web call js function **/
/*function slideCampMenu(){
	if( $("#menuSidebar").length > 0 ){
		if( typeof $("#menuSidebar").data("display") == "undefined" )
			$("#menuSidebar").data("display", 0);
		
		if( $("#menuSidebar").data("display") == 0 ){
			openNav();
		}
		else{
			closeNav();
		}
	}
}*/

/* menu vs notice new version --start */
function slideCampMenu(){
	if( typeof closeClassCart != "undefined" )
		closeClassCart();
	if( $("#p_slide_notice_block").length > 0 )
		$("#p_slide_notice_block").hide();
	if( $("#p_slide_menu_block").length > 0 )
		$("#p_slide_menu_block").slideToggle(300);
}
function closeCampMenu(){
	if( $("#p_slide_menu_block").length > 0 )
		$("#p_slide_menu_block").hide();
}

function slideCampNotice(){
	if( typeof closeClassCart != "undefined" )
		closeClassCart();
	if( $("#p_slide_menu_block").length > 0 )
		$("#p_slide_menu_block").hide();
	if( $("#p_slide_notice_block").length > 0 && $("#p_header_block").length > 0 ){
		var camp_id = $("#p_header_block").data("campid");
		if( $("#p_slide_notice_block").is(":hidden") ){
			//window.alert("is showing");
			if( $("#p_slide_notice_block .notice_function_block").length > 0 ){
				$("#p_slide_notice_block .notice_function_block").after('<div class="p_notice_loading_block"><img class="p_loading" src="/cefcamp/images/loading.gif" alt="loading..."></div>');
			}
			$.get( "/cefcamp/newest_notice_ajax.php",
					{ "camp_id": camp_id,
	                  "is_notice": 1,
	                  "limit": 5
					},
					function( data ) {
						if( $("#p_slide_notice_block ul.notice_list li:not(.p_notice_data_sample)").length > 0 ){ 
							$("#p_slide_notice_block ul.notice_list li:not(.p_notice_data_sample)").remove();
						}
						if( $("#p_slide_notice_block .p_notice_loading_block").length > 0 ){
							$("#p_slide_notice_block .p_notice_loading_block").remove();
						}
	                    if( data.status == "ok" ){
	                        if( $("#p_slide_notice_block .p_notice_data_sample").length > 0 ){
	                        	if( typeof data.data == "object" ){
		                        	if( data.data.length > 0 ){
		                        		var notice_ids = "";
		                        		for( i=0; i < data.data.length; i++ ){
		                        			if( data.data[i].is_important == 0 )
		                        				notice_ids += (notice_ids.length > 0?",":"")+data.data[i].notice_id;
		                        			$("#p_slide_notice_block .p_notice_data_sample").clone()
		                        				.attr("id", "p_notice_li_"+data.data[i].notice_id)
		                        				.removeAttr("style").removeClass("p_notice_data_sample")
		                        				.insertBefore("#p_slide_notice_block .p_notice_data_sample");
		                        			if( $("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" .notice_title").length > 0 ){
		                        				$("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" .notice_title").html(data.data[i].notice_title);
		                        			}
		                        			if( $("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" .notice_time").length > 0 ){
		                        				$("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" .notice_time").html(data.data[i].created_at.substr(0, 10));
		                        			}
		                        			if( $("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" .notice_brief").length > 0 ){
		                        				$("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" .notice_brief").html(data.data[i].notice_preview);
		                        			}
		                        			if( $("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" a.notice_link").length > 0 ){
		                        				var notice_link = "/cefcamp/notice.php?id="+data.data[i].notice_id+"&camp="+data.camp;
		                        				$("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" a.notice_link").attr("href", notice_link);
		                        			}
		                        			if( data.data[i].read_count > 0 ){
		                        				if( $("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" .notice_dot").length > 0 ){
		                        					if( $("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" .notice_dot").hasClass("unread") ){
		                        						$("#p_slide_notice_block #p_notice_li_"+data.data[i].notice_id+" .notice_dot").removeClass("unread");
		                        					}
		                        				}
		                        			}
		                        			if( data.data[i].is_important != 1 && data.data[i].read_count == 0 ){
		                        				notice_ids = (notice_ids.length > 0?",":"")+data.data[i].notice_id;
		                        			}	
		                        				
		                        			
		                        		}
		                        		setCampNoticeReaded( camp_id, notice_ids );
		                        	}
		                        	else{
		                        		$("<li class=\"notice_item\"><div class=\"notice_row_block\"><div class=\"data_not_found\">無資料！</div></div></li>").insertBefore("#p_slide_notice_block .p_notice_data_sample");
		                        	}
	                        	}
	                        	else{
	                        		$("<li class=\"notice_item\"><div class=\"notice_row_block\"><div class=\"data_not_found\">無資料！</div></div></li>").insertBefore("#p_slide_notice_block .p_notice_data_sample");
	                        	}
	                        }
	                    }
	                    else{
	                    	$("<li class=\"notice_item\"><div class=\"notice_row_block\"><div class=\"data_not_found\">找不到資料！</div></div></li>").insertBefore("#p_slide_notice_block .p_notice_data_sample");
	                    }
	                },
					"json" );
		}
		$("#p_slide_notice_block").slideToggle(300);
	}
}

function closeCampNotice(){
	if( $("#p_slide_notice_block").length > 0 )
		$("#p_slide_notice_block").hide();
}

function setCampNoticeReaded( camp_id, notice_ids ){
	$.get( "/cefcamp/notice_visit_ajax.php",
			{ "camp_id": camp_id,
              "ids": notice_ids
			},
			function( data ) {
                if( data.status == "ok" ){
                    if( typeof data.has_unread_notice != "undefined" ){
                    	var is_readed = 0;
                    	if( data.has_unread_notice == 0 )
                    		is_readed = 1;
                    	switchNoticeReadedIcon( is_readed );
                    }
                }
            },
			"json" );
}

function setCampNoticeAllReaded( camp_id ){
	$.get( "/cefcamp/notice_visit_ajax.php",
			{ "camp_id": camp_id,
              "ids": "all"
			},
			function( data ) {
                if( data.status == "ok" ){
                    if( typeof data.has_unread_notice != "undefined" ){
                    	var is_readed = 0;
                    	if( data.has_unread_notice == 0 )
                    		is_readed = 1;
                    	switchNoticeReadedIcon( is_readed );
                    }
                }
            },
			"json" );
}

function switchNoticeReadedIcon( is_readed ){
	if( $("header.header_block .menu_block #p_menu_notice span.notice_dot").length > 0 ){
		if( is_readed  ){
			$("header.header_block .menu_block #p_menu_notice span.notice_dot").hide();
		}	
		else{
			$("header.header_block .menu_block #p_menu_notice span.notice_dot").show();
		}
	}
	// cal app
	callAppSwitchNoticeReadedIcon( is_readed );
}

function requestCampNoticeHasUnRead(){
	var camp_id = $("#p_header_block").data("campid");
	var camp = $("#p_header_block").data("camp");
	if( typeof camp_id != "undefined" && typeof camp != "undefined" ){
		if( camp_id > 0 ){
			$.get( "/cefcamp/notice_ajax.php",
					{ "act_type": "has_unread_notice",
					  "camp": camp,
					  "camp_id": camp_id
					},
					function( data ) {
		                if( data.status == "ok" ){
		                    if( typeof data.has_unread_notice != "undefined" ){
		                    	var is_readed = 0;
		                    	if( data.has_unread_notice == 0 )
		                    		is_readed = 1;
		                    	switchNoticeReadedIcon( is_readed );
		                    }
		                }
		            },
					"json" );
		}
	}
}	


function toggleSildeSubMenu(sub_menu_p_id){
	if( $("#p_sub_menu_list_"+sub_menu_p_id).length > 0 ){
		$("#p_sub_menu_list_"+sub_menu_p_id).slideToggle(300);
	}
}

function gotoCampPersonalPage(){
	var camp_id = $("#p_header_block").data("campid");
	if( typeof camp_id != "undefined" ){
		if( camp_id > 0 ){
			location.href = "https://www.cef.tw/cefcamp/user_profile.php?camp_id="+camp_id;
			/*switch(app_name){
				case "ymccamp":
				default:	
					location.href = "https://www.cef.tw/cefcamp/user_profile.php?camp_id="+camp_id;
					break;
			}*/
		}
	}
} 

function checkIfCallAppHideUserNLoginIcons(){
	var confirm_hide = false;
	var current_url = location.href;
	//var hide_filter_array = ["/cefcamp/camp_list.php", "/cefcamp/camp_main.php"];
	var hide_filter_array = ["/cefcamp/camp_list.php"];
	if( hide_filter_array.length > 0 ){
        var i;
        for (i = 0; i < hide_filter_array.length ; i++) {
            if( current_url.search(hide_filter_array[i]) > -1 ){
            	if( typeof callAppHideUserNLoginIcons != "undefined" )
            		callAppHideUserNLoginIcons();
            	confirm_hide = true;
                break;
            }
        }
    }
}

function switchHeaderLoginNVisitor(){
	//callAppHideUserNLoginIcons();
	checkIfCallAppHideUserNLoginIcons();
	if( $("#p_header_block").length > 0 ){
		if( $("#p_header_block #p_menu_login_block").length > 0 || $("#p_header_block #p_menu_signin_block").length > 0 ){
			if( $("#p_header_block #p_menu_login_block").length > 0 ){
				var user_nickname = "您好";
				if( $("#p_header_block #p_menu_login_block #p_menu_nick_name").length > 0 ){
					user_nickname = $("#p_header_block #p_menu_login_block #p_menu_nick_name").html();
				}
				if( user_nickname.length > 2 )
					user_nickname = user_nickname.substr(0, 2);
				callAppSwitchUserNickName( user_nickname );
				
				callAppSwitchUserIcons();
			}
			else{
				callAppSwitchHeaderLoginIcon();
			}
			
			requestCampNoticeHasUnRead();
		}
	}
}
/* menu vs notice new version --end */
		

function scrollToTop() {
	$(window).scrollTop(0);
}

$(function() {
	switchHeaderLoginNVisitor();
	
	if( $("header.header_block .menu_block #p_menu_notice span.notice_dot").length > 0 ){
		setInterval(requestCampNoticeHasUnRead, 30000);
	}
	
	if( $("#p_slide_menu_block").length > 0 ){
		$("#p_slide_menu_block ul.slide_menu_area").click(function(event) {
			event.stopPropagation();
		});
		
		$("#p_slide_menu_block").click(function(event) {
			event.stopPropagation();
			slideCampMenu();
		});
	}
	
	if( $("#p_slide_notice_block").length > 0 ){
		$("#p_slide_notice_block div.slide_notice_block").click(function(event) {
			event.stopPropagation();
		});
		$("#p_slide_notice_block").click(function(event) {
			event.stopPropagation();
			slideCampNotice();
		});
	}
});
