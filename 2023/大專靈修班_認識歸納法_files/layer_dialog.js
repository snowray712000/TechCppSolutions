function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

function layerAlert(alert_text) {
    var html = `<div id="p_layer_alert" class="browser_overlay">
    <div class="overlay_content">
        <div class="confirm_p" id="p_layer_alert_text_div">${nl2br(alert_text)}</div>
        <div class="browser_button_block">
            <span class="window_button button_confirm" id="p_layer_alert_btn_ok">確定</span>
        </div>
    </div>
</div>`;
    if($("#p_layer_alert").length > 0) {
        $("#p_layer_alert").remove();
    }
    $("body").append(html);
    $("#p_layer_alert_btn_ok").click(function(event){
        $("#p_layer_alert").remove();
    });
}

function layerAlertExecute(alert_text, cmd) {
    var html = `<div id="p_layer_alerte" class="browser_overlay">
    <div class="overlay_content">
        <div class="confirm_p" id="p_layer_alert_text_div">${nl2br(alert_text)}</div>
        <div class="browser_button_block">
            <span class="window_button button_confirm" id="p_layer_alerte_btn_ok">確定</span>
        </div>
    </div>
</div>`;
    if($("#p_layer_alerte").length > 0) {
        $("#p_layer_alerte").remove();
    }
    $("body").append(html);
    $("#p_layer_alerte_btn_ok").click(function(event){
        $("#p_layer_alerte").remove();
        eval(cmd);
    });
}

function layerFlash(alert_text, delay_seconds) {
    var html = `<div id="p_layer_alertf" class="browser_overlay">
    <div class="overlay_content">
        <div class="confirm_p" id="p_layer_alert_text_div" style="text-align: center;">${nl2br(alert_text)}</div>
    </div>
</div>`;
    if($("#p_layer_alertf").length > 0) {
        $("#p_layer_alertf").remove();
    }
    $("body").append(html);
    setTimeout('$("#p_layer_alertf").fadeOut();', delay_seconds);
}

function layerConfirm(confirm_text, ok_callback_cmd, cancel_callback_cmd, ok_button_text="確定", cancel_button_text="取消") {
    var html = `<div id="p_layer_confirm" class="browser_overlay">
    <div class="overlay_content">
        <div class="confirm_p" id="p_layer_alert_text_div">${nl2br(confirm_text)}</div>
        <div class="browser_button_block">
            <span class="window_button button_cancel" id="p_layer_confirm_cancel">${cancel_button_text}</span>
            <span class="window_button button_confirm" id="p_layer_confirm_ok">${ok_button_text}</span>
        </div>
    </div>
</div>`;
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

function layerPrompt(prompt_text, prompt_var_name, ok_callback_cmd, cancel_callback_cmd, ok_button_text="確定", cancel_button_text="取消") {
    var html = `<div id="p_layer_prompt" class="browser_overlay">
    <div class="overlay_content">
        <div class="overlay_top">
            <div class="overlay_title">${prompt_text}</div>
        </div>
        <textarea id="p_prompt_input" class="prompt_p"></textarea>
        <div class="browser_button_block">
            <span id="p_prompt_alert"></span>
            <span class="window_button button_cancel" id="p_layer_prompt_cancel">${cancel_button_text}</span>
            <span class="window_button button_confirm" id="p_layer_prompt_ok">${ok_button_text}</span>
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
