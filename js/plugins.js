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
* Popup jQuery extend for fancybox 2 
*   _data object may contain:
*   source
*   author
*   content
*   datetime
*   avatar
*   photo_url
*   share_url (actual url of original post)
*/
$.extend({
    popup: function(v){
        var u, d, $closeBtn, $modal;  
            d = setData(v.data);
            $closeBtn = true;
            $modal = false;
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
                case 'photo_upload':
                    u = "popup/photo_upload/";
                    $closeBtn = false;
                    $modal = true;
                    break;
            }
            $.fancybox({href:u, type : 'ajax', padding:0, closeBtn: $closeBtn, modal: $modal, ajax : {type:'POST', data : d } });        

        function setData(v){
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
});

/*
Private function for popup upload window
*/
(function($){
    var $c, $agr, $desc_active;
    $.fn.init_upload = function() {
        $c     = '.' + $(this).attr('class');
        $agr = false;
        //Start bind
        $($c +' .btn_next').click(loadNext);
        $($c +' .btn_cancel').click(closeWindow);
        $($c +' .btn_browse').click(browseFile);
        // $($c +' .btn_submit').click(uploadFile);
        $($c +' #popup_checkbox').click(toggleCheckbox);
        $($c +' #popup_photo_desc_holder textarea').focus(descFocus);
        $($c +' input[type=file]').change(fileChangeListener);
        $($c +' #loading').bind('load_start', loadStart);
        $($c +' #loading').bind('load_end', loadEnd);
    }

    function toggleCheckbox(e){
        $agr = ($agr) ? false:true;
       $(e.target).css('background-position-x', ( ($agr)? $(e.target).width()*-1 : 0) );

       if($agr)
            $($c +' .btn_next').removeClass('dim');
        else
            $($c +' .btn_next').addClass('dim');
    }

    function loadNext(){
        if($agr){
            $($c +' #popup_photo_upload_agreement_window').fadeOut();
        }
    }

    function descFocus(e){
        $desc_active = true;
        $(e.target).val('');
        $(e.target).removeClass('greyfont');
    }

    function browseFile(){
        $($c + ' #uploadFile').click();
    }

    function fileChangeListener(e){
        console.log('file input changed. Start upload ' + $(e.target).val());        
        uploadFile();
    }

    function uploadFile(){
        $($c +' #loading').trigger('load_start');
        $.ajaxFileUpload(
            {
                url: '/photo/upload',
                secureuri:false,
                fileElementId:'uploadFile',
                dataType: 'json',
                success: function (data, status)
                {
                    if(typeof(data.error) != 'undefined')
                    {
                        if(data.error != '')
                            alert(data.error);
                        else       
                        {
                            uploadSuccess(data);                            
                        }
                    }
                },
                error: function (data, status, e){
                    console.log(data);
                    console.log(status);
                    console.log(e);
                    alert('Please use an image in JPG, GIF and PNG format under 2mb.');
                    $($c +' #loading').trigger('load_end');
                }
            }
        )
    }

    function uploadSuccess(v){
        console.log('Success');

        //create image control
        $parent   = $($c +' #popup_photo_img_holder #holder');
        $length   = $parent.parent().width();
        $img      = $('<img src="' + v.file_location + '"/>');
        $bound    = $('<div style="position:absolute; margin:0; padding:0; background:#00FF00"/>');
        $ratio    = 1;
        $top      = 0;
        $left     = 0;

        $parent.empty();


        //remove old input element and create a new one
        $($c +' input[type=file]').unbind('fileChangeListener').remove();
        $('<input name="uploadFile" type="file" class="hidden" id="uploadFile"/>').appendTo( $($c +' #file_form') );
        $($c +' input[type=file]').change(fileChangeListener);

        //Load image
        $img.load(function(e){
            if (this.width > this.height) { // landscape
                $ratio = $length / this.height;
                $left = (-50 * $ratio);
                $(this).draggable({  containment: $bound, axis: "x" });
            }
            else if (this.width < this.height) { // portrait
                $ratio = $length / this.width;
                $top =  (-50 * $ratio);
                $(this).draggable({  containment: $bound, axis: "y" });
            }
            else{ //square
                $ratio = $length / this.width;
            }

            $w = this.width * $ratio;
            $h = this.height * $ratio;

            //set bound div
            if($left !=0){
                $bw = ($w - $length) *2 + $length;
                $bound.css({'width': $bw, 'height': $h, 'left' : ($bw/2 - $length/2)*-1 + 'px'}).appendTo($parent);
            }
            else if ($top !=0){
                $bh = ($h - $length) *2 + $length;
                $bound.css({'width': $w, 'height': $bh, 'top' : ($bh/2 - $length/2)*-1 + 'px'}).appendTo($parent);
            }

            $img.css({'min-width': $w + 'px', 'min-height': $h + 'px', 'left' : $left + '%', 'top' : $top + '%' }).appendTo($parent);


            $($c +' .btn_submit').css('opacity',1);
            $($c +' #loading').trigger('load_end');
        });
    }

    function loadStart(){
        console.log('start');
        $(this).show();
    }

    function loadEnd(){
        console.log('end');
        $(this).hide();
    }

    function closeWindow(){
        console.log('unbind all');
        $($c +' .btn_cancel').unbind('click');
        $.fancybox.close();
    }


})(jQuery)

