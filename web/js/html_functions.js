function setConverterName(newName) {
    converter_name = newName;
}


var jet = new JetDocument();
jet(document).ready(function () {
    var $text = jet("#doc-textarea"),
        $tmpText = jet("#tmp-text"),
        text;
    jet("#covert").click(function () {
        $tmpText.val($text.val());
        $text.val(ConvertToo(converter_name, $tmpText.val()));
    });
    jet("#source-text").keyup(function () {
        text = jet(this).val();
        jet("#target-text").val(ConvertToo(converter_name, text));
    });
    var navHandle = false;
    jet("#menu-toggle").click(function (e) {
        if (!navHandle) {
            jet("#main-menu ul .item").css({
                display: 'block'
            });
            navHandle = true;
        } else {
            jet("#main-menu ul .item").css({
                display: 'none'
            });
            navHandle = false;
        }
        e.preventDefault();
    });
    var tt = null;
    jet(".action-bar .copy-btn").click(function (e) {
        var text = jet("#doc-textarea").val();
        if (text) {
            var $btn = this;
            CopyTextToClipboard(text, "doc-textarea").then(function () {
                jet($btn).html('Copied');
                clearTimeout(tt);
                tt = setTimeout(function () {
                    jet($btn).html('Copy Text');
                    clearTimeout(tt);
                }, 1500)
            });
        }
        e.preventDefault();
    });
});

function CopyTextToClipboard(text, textareaID) {
    var Error = null,
        Success = false,
        fallback = false;
    var textArea = document.getElementById(textareaID);
    var _fallback = function () {
        fallback = true;
        if (textArea != null) {
            textArea.focus();
            textArea.select();
            try {
                if (document.execCommand('copy')) {
                    Success = true;
                } else {
                    Error = 'Fallback: Copying text command was unsuccessful';
                }
            } catch (err) {
                Error = 'Fallback: Oops, unable to copy' + err;
            }
        } else Error = 'Fallback: Oops, unable to copy';
    };
    var ToClipboard = function (text) {
        if (!navigator.clipboard) _fallback();
    };
    var callbacks = function (completeCallback, errorCallback) {
        if (typeof (completeCallback) == 'function' && Success) completeCallback.call(this);
        else if (typeof (errorCallback) == 'function' && Error) errorCallback.call(this, Error);
    }
    ToClipboard(text);
    return {
        then: function (completeCallback, errorCallback) {
            if (fallback) callbacks(completeCallback, errorCallback);
            else {
                navigator.clipboard.writeText(text).then(function () {
                    if (textArea) {
                        textArea.focus();
                        textArea.select();
                    }
                    Success = true;
                    callbacks(completeCallback, null);
                }, function (err) {
                    Error = 'Async: Could not copy text: ' + err;
                    callbacks(null, errorCallback);
                });
            }
        }
    };
}


//# sourceMappingURL = ../js/html_functions.js.map
