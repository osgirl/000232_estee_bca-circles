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
    var $c, $agr, $desc_active, $preview_img_path;
    $.fn.init_upload = function() {
        $c     = '.' + $(this).attr('class');
        $parent   = $($c +' #popup_photo_img_holder #holder');
        $agr = false;
        //Start bind
        $($c +' .btn_next').click(loadNext);
        $($c +' .btn_cancel').click(closeWindow);
        $($c +' .btn_browse').click(browseFile);
        $($c +' .btn_submit').click(saveFile);
        $($c +' #popup_checkbox').click(toggleCheckbox);
        $($c +' #popup_photo_desc_holder textarea').focus(descFocus);
        $($c +' input[type=file]').change(fileChangeListener);
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
        if(Modernizr.canvas){
            uploadToCanvas(e);
        }
        else{
            //Fallback funtion for non-support canvas browser
            uploadFile();
        }
    }

    function uploadToCanvas(e){        
        $parent.empty();
        $('<canvas id="imageCanvas"></canvas>').appendTo($parent);
        var canvas = document.getElementById('imageCanvas');

        var reader = new FileReader();
        reader.onload = function(event){
            var img = new Image();
            img.onload = function(){
                //Load image to canvas
                createImageBound(img,canvas);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }


    function uploadFile(){
        loadStart();
        $.ajaxFileUpload(
            {
                url: '/photo/uploadPreviewImage',
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
                            uploadFileSuccess(data);                            
                        }
                    }
                },
                error: function (data, status, e){
                    alert('Please use an image in JPG, GIF and PNG format under 2mb.');
                    loadEnd();
                }
            }
        )
    }

    function uploadFileSuccess(data){        
        $preview_img_path = data.file_location;
        console.log($preview_img_path );

        //create image control            
        $img      = $('<img src="' + data.file_location + '"/>');        
        $ratio    = 1;
        $top      = 0;
        $left     = 0;

        $parent.empty();

        //remove old input element and create a new one
        $($c +' input[type=file]').unbind('fileChangeListener').remove();
        $('<input name="uploadFile" type="file" class="hidden" id="uploadFile"/>').appendTo( $($c +' #file_form') );
        $($c +' input[type=file]').change(fileChangeListener);

        //Load image to html
        $img.load(function(e){
            createImageBound(this);
        });
    }

    function createImageBound(img,canvas){            
        var $length   = $parent.parent().width(),
        $bound    = $('<div style="position:absolute; margin:0; padding:0; background:#FFFFFF"/>'),                
        $ratio    = 1,
        $top      = 0,
        $left     = 0;

        if (img.width > img.height) { // landscape
            $ratio = $length / img.height;
            $left = (-50 * $ratio);
            $(img).draggable({  containment: $bound, axis: "x" });
            $parent.addClass('scroll_x').removeClass('scroll_y');
        }
        else if (img.width < img.height) { // portrait
            $ratio = $length / img.width;
            $top =  (-50 * $ratio);
            $(img).draggable({  containment: $bound, axis: "y" });
            $parent.addClass('scroll_y').removeClass('scroll_x');
        }
        else{ //square
            $ratio = $length / img.width;
            $parent.removeClass('scroll_y').removeClass('scroll_x');
        }

        $w = img.width * $ratio;
        $h = img.height * $ratio;

        //Draw image to canvas if available
        if(canvas != null){                
            var ctx = canvas.getContext('2d');
            canvas.width = $length;
            canvas.height = $length;
            ctx.drawImage(img,0,0,$w, $h);
        }
        // //set bound div
        if($left !=0){
            $bw = ($w - $length) *2 + $length;
            $bound.css({'width': $bw, 'height': $h, 'left' : ($bw/2 - $length/2)*-1 + 'px'}).appendTo($parent);
        }
        else if ($top !=0){
            $bh = ($h - $length) *2 + $length;
            $bound.css({'width': $w, 'height': $bh, 'top' : ($bh/2 - $length/2)*-1 + 'px'}).appendTo($parent);
        }
        $(img).css({'min-width': $w + 'px', 'min-height': $h + 'px', 'left' : $left + '%', 'top' : $top + '%' }).appendTo($parent);
        $($c +' .btn_submit').css('opacity',1);
        loadEnd();
    }

    function saveFile(){
        var $img    = $parent.children('img'),
        $length     = 580, // Final output size
        $ratio      = $length / $parent.parent().width(),
        $l          = parseInt($img.css('left').replace('px','')) * $ratio,
        $t          = parseInt($img.css('top').replace('px','')) * $ratio,
        $w          = $img.width() * $ratio,
        $h          = $img.height() * $ratio,
        $desc       =  ($desc_active) ? $($c +' #popup_photo_desc_holder textarea').val() :'';

        if( $(this).css('opacity') == 1 ){
            loadStart();
            if($('#imageCanvas').length){
                console.log('Save using canvas');                
                $('<canvas id="outputCanvas"></canvas>').appendTo($parent);                
                var canvas = document.getElementById('outputCanvas');
                var ctx = canvas.getContext('2d');
                canvas.width = $length;
                canvas.height = $length;
                ctx.drawImage( $($img)[0] ,$l,$t, $w, $h);               
                var canvasData = canvas.toDataURL("image/png");
                canvas.remove();
                $.ajax({
                    type: 'post',
                    url: '/photo/saveRawFile',
                    dataType: 'text',
                    data: {
                            base64data : canvasData,
                            desc : $desc
                    },
                    success: function(data) {            
                        saveFileSuccess(data);                 
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        saveFileFailed(jqXHR, textStatus, errorThrown);
                    }
                });
            }
            else{
                console.log('Save using uploaded image');
                $.ajax({
                    type: 'post',
                    url: '/photo/saveFile',
                    data: {
                            filePath : $preview_img_path,
                            x        : $l,
                            y        : $t,
                            desc     : $desc
                    },
                    success: function(data) {            
                        saveFileSuccess(data);                 
                    },
                    error: function(jqXHR, textStatus, errorThrown){
                        saveFileFailed(jqXHR, textStatus, errorThrown);
                    }
                });                
            }

        }
        else{
            console.log('load image first');
        }
    }

    function saveFileSuccess(data){
        loadEnd();
        alert('Image saved successfully.'); 
        closeWindow();
    }
    function saveFileFailed(jqXHR, textStatus, errorThrown){
        loadEnd();
        alert(jqXHR.responseText);
        console.log(jqXHR.status);
    }

    function loadStart(){
        console.log('loadStart');
        $($c +' #anim_loading').show();
    }

    function loadEnd(){
        console.log('loadEnd');
        $($c +' #anim_loading').hide();
    }

    function closeWindow(){
        // console.log('unbind all');
        // $($c +' .btn_cancel').unbind('click');
        $.fancybox.close();
    }


})(jQuery)

