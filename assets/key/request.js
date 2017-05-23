function makeInternalCall(url, callback, type){
    $.ajax({
        url: window.location.origin + url,
        type: type,
        contentType: 'application/json',
        success    : function (data) {
            callback(void 0, data)
        },
        error      : function (jqXHR, textStatus, errorThrown) {
            callback(errorThrown, [jqXHR, textStatus, errorThrown]);
        }
    });
}

function generateKeyFast(callback) {
    makeInternalCall('/key/gen/fast', callback);
}