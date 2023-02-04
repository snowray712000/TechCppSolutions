var class_dialog = {};

class_dialog.nl2br = function(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

class_dialog.nl2div = function(str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = '<div class="br"></div>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

class_dialog.layerAlert = function(alert_text, button_text, alert_icon) {
	let btn_text = "確定";
	if( typeof button_text != "undefined" ){
		if( button_text.length != 0 )
			btn_text = button_text;
	}	
	let msg_icon_row = "";
	if( typeof alert_icon != "undefined" ){
		if( alert_icon.length != 0 ){
			msg_icon_row = "<div class=\"d_overlay_msg_icon_row\">"+alert_icon+"</div>\n";
		}
	}
	//<span class=\"d_window_button d_button_confirm\" id=\"p_layer_alert_btn_ok\">"+btn_text+"</span>\
	//var html = "<div id=\"p_layer_alert\" class=\"browser_overlay\">\
	var html = "<div id=\"p_layer_alert\" class=\"class_dialog_overlay\">\
    <div class=\"d_overlay_content\">\n"
+msg_icon_row+"\
        <div class=\"d_confirm_p\" id=\"p_layer_alert_text_div\">"+class_dialog.nl2br(alert_text)+"</div>\
        <div class=\"dialog_button_block\">\
            <button class=\"d_window_button d_button_close p_close_layer_dialog\" id=\"p_layer_alert_btn_ok\">"+btn_text+"</button>\
        </div>\
    </div>\
</div>";
    if($("#p_layer_alert").length > 0) {
        $("#p_layer_alert").remove();
    }
    $("body").append(html);
    /*$("#p_layer_alert_btn_ok").click(function(event){
        $("#p_layer_alert").remove();
    });*/
    $(".p_close_layer_dialog").click(function(event){
        $("#p_layer_alert").remove();
    });
}

class_dialog.layerAlertNAction = function(alert_text, act_text, act_link, act_onclick, button_text, alert_icon) {
	let btn_text = "確定";
	if( typeof button_text != "undefined" ){
		if( button_text.length != 0 )
			btn_text = button_text;
	}	
	let msg_icon_row = "";
	if( typeof alert_icon != "undefined" ){
		if( alert_icon.length != 0 ){
			msg_icon_row = "<div class=\"d_overlay_msg_icon_row\">"+alert_icon+"</div>\n";
		}
	}
	let action_button = "";
	if( typeof act_text != "undefined" ){
		if( act_text.length != 0 ){
			action_button = "<button class=\"d_window_button d_button_action\" >"+act_text+"</button>\n";
			let ls_act_link = false;
			if( typeof act_link != "undefined" ){  
				if( act_link.length > 0 ){
					action_button = "<a class=\"act_link_p\" href=\""+act_link+"\">"+action_button+"</a>";
					ls_act_link = true;
				}
			}
			if( !ls_act_link ){
				if ( typeof act_onclick != "undefined" ){  
					if( act_onclick.length > 0 ){
						action_button = "<button class=\"d_window_button d_button_action p_close_layer_dialog\" onclick=\""+act_onclick+"\">"+act_text+"</button>\n";
					}
				}
			}
		}
	}
    //var html = "<div id=\"p_layer_alert\" class=\"browser_overlay\">\
    var html = "<div id=\"p_layer_alert\" class=\"class_dialog_overlay\">\
    <div class=\"d_overlay_content\">\n"
		+msg_icon_row
        +"<div class=\"d_confirm_p\" id=\"p_layer_alert_text_div\">"+class_dialog.nl2br(alert_text)+"</div>\
        <div class=\"dialog_button_block\">\n"
		+action_button        
 		+"<button class=\"d_window_button d_button_close p_close_layer_dialog\" id=\"p_layer_alert_btn_ok\">"+btn_text+"</button>\
        </div>\
    </div>\
</div>";
    if($("#p_layer_alert").length > 0) {
        $("#p_layer_alert").remove();
    }
    $("body").append(html);
    /*$("#p_layer_alert_btn_ok").click(function(event){
        $("#p_layer_alert").remove();
    });*/
    $(".p_close_layer_dialog").click(function(event){
        $("#p_layer_alert").remove();
    });
}

class_dialog.layerConfirm = function(confirm_text, ok_callback_cmd, cancel_callback_cmd, confirm_icon, confirm_button_text, cancel_button_text) {
	let confirm_btn_text = "確定";
	if( typeof confirm_button_text != "undefined" ){
		if( confirm_button_text.length != 0 )
			confirm_btn_text = confirm_button_text;
	}	
	let cancel_btn_text = "取消";
	if( typeof cancel_button_text != "undefined" ){
		if( cancel_button_text.length != 0 )
			cancel_btn_text = cancel_button_text;
	}	
	let msg_icon_row = "";
	if( typeof confirm_icon != "undefined" ){
		if( confirm_icon.length != 0 ){
			msg_icon_row = "<div class=\"d_overlay_msg_icon_row\">"+confirm_icon+"</div>\n";
		}
	}
	// <span class=\"d_window_button d_button_confirm\" id=\"p_layer_confirm_ok\">確定</span>\
    //var html = "<div id=\"p_layer_confirm\" class=\"browser_overlay\">\
    var html = "<div id=\"p_layer_confirm\" class=\"class_dialog_overlay\">\
    <div class=\"d_overlay_content\">\n"
    	+msg_icon_row
        +"<div class=\"d_confirm_p\" id=\"p_layer_alert_text_div\">"+class_dialog.nl2br(confirm_text)+"</div>\
        <div class=\"dialog_button_block\">\
        	<span class=\"d_window_button d_button_confirm\" id=\"p_layer_confirm_ok\">"+confirm_btn_text+"</span>\
            <span class=\"d_window_button d_button_cancel\" id=\"p_layer_confirm_cancel\">"+cancel_btn_text+"</span>\
        </div>\
    </div>\
</div>";
    if($("#p_layer_confirm").length > 0) {
        $("#p_layer_confirm").remove();
    }
    $("body").append(html);
    $("#p_layer_confirm_ok").click(function(event){
        $("#p_layer_confirm").remove();
        eval(ok_callback_cmd);
    });
    $("#p_layer_confirm_cancel").click(function(event){
        $("#p_layer_confirm").remove();
        eval(cancel_callback_cmd);
    });
}

class_dialog.closeClassDialog = function(){
	/*if( $(".browser_overlay").length > 0 ){
		$(".browser_overlay").remove();
	}*/
	if( $(".class_dialog_overlay").length > 0 ){
		$(".class_dialog_overlay").remove();
	}
}

//-------------------------------------

class_dialog.layerAlertExecute = function(alert_text, cmd) {
    var html = "<div id=\"p_layer_alerte\" class=\"class_dialog_overlay\">\
    <div class=\"d_overlay_content\">\
        <div class=\"d_confirm_p\" id=\"p_layer_alert_text_div\">"+class_dialog.nl2br(alert_text)+"</div>\
        <div class=\"dialog_button_block\">\
            <span class=\"d_window_button d_button_confirm\" id=\"p_layer_alerte_btn_ok\">確定</span>\
        </div>\
    </div>\
</div>";
    if($("#p_layer_alerte").length > 0) {
        $("#p_layer_alerte").remove();
    }
    $("body").append(html);
    $("#p_layer_alerte_btn_ok").click(function(event){
        $("#p_layer_alerte").remove();
        eval(cmd);
    });
}

class_dialog.layerFlash = function(alert_text, delay_seconds) {
    var html = "<div id=\"p_layer_alertf\" class=\"class_dialog_overlay\">\
    <div class=\"d_overlay_content\">\
        <div class=\"d_confirm_p\" id=\"p_layer_alert_text_div\" style=\"text-align: center;\">"+class_dialog.nl2br(alert_text)+"</div>\
    </div>\
</div>";
    if($("#p_layer_alertf").length > 0) {
        $("#p_layer_alertf").remove();
    }
    $("body").append(html);
    setTimeout('$("#p_layer_alertf").fadeOut();', delay_seconds);
}

class_dialog.layerPrompt = function(prompt_text, prompt_var_name, ok_callback_cmd, cancel_callback_cmd) {
    var html = `<div id="p_layer_prompt" class="class_dialog_overlay">
    <div class="d_overlay_content">
        <div class="d_overlay_top">
            <div class="d_overlay_title">${prompt_text}</div>
        </div>
        <textarea id="p_prompt_input" class="prompt_p"></textarea>
        <div class="dialog_button_block">
            <span id="p_prompt_alert"></span>
            <span class="d_window_button d_button_cancel" id="p_layer_prompt_cancel">取消</span>
            <span class="d_window_button d_button_confirm" id="p_layer_prompt_ok">確定</span>
        </div>
    </div>
</div>`;
    if($("#p_layer_prompt").length > 0) {
        $("#p_layer_prompt").remove();
    }
    $("body").append(html);
    $("#p_layer_prompt_cancel").click(function(event){
        $("#p_layer_prompt").remove();
        eval(`window["${prompt_var_name}"] = "";
${cancel_callback_cmd}`);
    });
    $("#p_layer_prompt_ok").click(function(event){
        var prompt_input_text = $("#p_prompt_input").val();
        eval(`window["${prompt_var_name}"] = $("#p_prompt_input").val();
${ok_callback_cmd}`);
        $("#p_layer_prompt").remove();
    });
}