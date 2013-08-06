// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/*
* PopupWindow Class for fancybox 2 extension helper
*   _data object may contain:
*   source
*   author
*   content
*   datetime
*   avatar
*   photo_url
*   share_url (actual url of original post)
*/
var popupWindow = function(){
    var u, d;   
    this.open = function(v){                    
        d = setData(v.data);
        switch(v.type){
            case 'about':
                u = "popup/about/";
                break;
            case 'video':
                u = "popup/video/";
                break;
            case 'photo':
                u = "popup/photo/";
            break;
            case 'twitter':
                u = "popup/twitter/";
                break;
        }
        $.fancybox({href:u, type : 'ajax', padding:0, ajax : {type:'POST', data : d } });
    }

    this.share = function(v){
        alert('popupWindow Class\n\nshare type: ' + v.type + '\n\nurl: ' + v.url);
    }

    setData = function(v){
        var d;
        if (v != undefined){                        
            d = {
                 source:    null,
                 author:    null,
                 content:   null,
                 datetime:  null,
                 avatar:    null,
                 photo_url: null,
                 share_url: null
                };

            for (var key in v)
                d[key] = v[key];
        }
        return d;
    }
}
var $popup = new popupWindow();