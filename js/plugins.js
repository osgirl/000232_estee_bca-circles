// Avoid `console` errors in browsers that lack a console.
(function()
{
    var method;
    var noop = function()
    {};
    var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--)
    {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method])
        {
            console[method] = noop;
        }
    }
}());

//Plugins

/*************************************
 * Popup jQuery extend for fancybox 2 (standalone)
 **************************************
 *   _data object may contain:
 *   source
 *   author
 *   content
 *   datetime
 *   avatar
 *   photo_url
 *   share_url (actual url of original post)
 *   circle_id 
 *   num_friend
 *   users_fb_id
 *   type
 */
$.extend(
{
    popup: function(v)
    {
        var $closeBtn = true, 
            $modal = false, 
            $isCircle = false,
            u, d = setData(v.data);
        switch (v.type)
        {
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
        case 'circle':
            u = "popup/circle/";
            $isCircle = true;
            break;
        }
        if($isCircle){
            $.ajax({
                type: 'POST',
                url: u,
                data: d,
                success: function(data)
                {
                    $('#gallery').append(data);
                    $('#popup_circle').init_circle(d);
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    console.log('Error ' + textStatus);
                }                
            });
        }
        else{
            $.fancybox(
            {
                href: u,
                type: 'ajax',
                padding: 0,
                closeBtn: $closeBtn,
                modal: $modal,
                ajax: {
                    type: 'POST',
                    data: d
                }
            });
        }

        function setData(v)
        {
            var d;
            if (v != undefined)
            {
                d = {
                    source: null,
                    author: null,
                    content: null,
                    datetime: null,
                    avatar: null,
                    photo_url: null,
                    share_url: null,
                    circle_id: null,
                    num_friend: null,
                    users_fb_id: null
                };

                for (var key in v)
                d[key] = v[key];
            }
            return d;
        }
    }
});

/******************************************
 * Private function for popup upload window (jquery extend)
 ******************************************/
(function($)
{
    var $c, $agr, $desc_active, $preview_img_path, $circle_id, $users_fb_id;
    $.fn.init_upload = function()
    {
        $c = '.' + $(this).attr('class');
        $parent = $($c + ' #popup_photo_img_holder #holder');
        $agr = false;
        $desc_active = false;
        $circle_id = $($c + ' #circle_id').val();
        $users_fb_id = $($c + ' #users_fb_id').val();
        
        //Start bind
        $($c + ' .btn_next').click(loadNext);
        $($c + ' .btn_cancel').click(closeWindow);
        $($c + ' .btn_browse').click(browseFile);
        $($c + ' .btn_submit').click(saveFile);
        $($c + ' #popup_checkbox').click(toggleCheckbox);
        $($c + ' #popup_photo_desc_holder textarea').focus(descFocus);
        $($c + ' input[type=file]').change(fileChangeListener);
    }

    function toggleCheckbox(e)
    {
        $agr = ($agr) ? false : true;
        $(e.target).css('background-position', (($agr) ? $(e.target).width() * -1 : 0),0);

        if ($agr) $($c + ' .btn_next').removeClass('dim');
        else $($c + ' .btn_next').addClass('dim');
    }

    function loadNext()
    {
        if ($agr)
        {
            $($c + ' #popup_photo_upload_agreement_window').fadeOut();
        }
    }

    function descFocus(e)
    {
        $desc_active = true;
        $(e.target).val('');
        $(e.target).removeClass('greyfont');
    }

    function browseFile()
    {
        $($c + ' #uploadFile').click();
    }

    function fileChangeListener(e)
    {
        if (Modernizr.canvas)
        {
            uploadToCanvas(e);
        }
        else
        {
            uploadFile();
        }
    }

    function uploadToCanvas(e)
    {
        $parent.empty();
        $('<canvas id="imageCanvas"></canvas>').appendTo($parent);
        var canvas = document.getElementById('imageCanvas');

        var reader = new FileReader();
        reader.onload = function(event)
        {
            var img = new Image();
            img.onload = function()
            {
                //Load image to canvas
                createImageBound(img, canvas);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    }


    function uploadFile()
    {
        loadStart();
        $.ajaxFileUpload(
        {
            url: '/photo/uploadPreviewImage',
            secureuri: false,
            fileElementId: 'uploadFile',
            dataType: 'json',
            success: function(data, status)
            {
                if (typeof(data.error) != 'undefined')
                {
                    if (data.error != '') alert(data.error);
                    else
                    {
                        uploadFileSuccess(data);
                    }
                }
            },
            error: function(data, status, e)
            {
                alert('Please use an image in JPG, GIF and PNG format under 2mb.');
                loadEnd();
            }
        })
    }

    function uploadFileSuccess(data)
    {
        $preview_img_path = data.file_location;
        //create image control            
        $img = $('<img src="' + data.file_location + '"/>');
        $ratio = 1;
        $top = 0;
        $left = 0;
        $parent.empty();

        //remove old input element and create a new one
        $($c + ' input[type=file]').unbind('fileChangeListener').remove();
        $('<input name="uploadFile" type="file" class="hidden" id="uploadFile"/>').appendTo($($c + ' #file_form'));
        $($c + ' input[type=file]').change(fileChangeListener);
        //Load image to html
        $img.load(function(e)
        {
            createImageBound(this);
        });
    }

    function createImageBound(img, canvas)
    {
        var $length = $parent.parent().width(),
            $bound = $('<div style="position:absolute; margin:0; padding:0; background:#FFFFFF"/>'),
            $ratio = 1,
            $top = 0,
            $left = 0;

        if (img.width > img.height)
        { // landscape
            $ratio = $length / img.height;
            $left = (-50 * $ratio);
            $(img).draggable(
            {
                containment: $bound,
                axis: "x"
            });
            $parent.addClass('scroll_x').removeClass('scroll_y');
        }
        else if (img.width < img.height)
        { // portrait
            $ratio = $length / img.width;
            $top = (-50 * $ratio);
            $(img).draggable(
            {
                containment: $bound,
                axis: "y"
            });
            $parent.addClass('scroll_y').removeClass('scroll_x');
        }
        else
        { //square
            $ratio = $length / img.width;
            $parent.removeClass('scroll_y').removeClass('scroll_x');
        }

        $w = img.width * $ratio;
        $h = img.height * $ratio;

        //Draw image to canvas if available
        if (canvas != null)
        {
            var ctx = canvas.getContext('2d');
            canvas.width = $length;
            canvas.height = $length;
            ctx.drawImage(img, 0, 0, $w, $h);
        }
        // //set bound div
        if ($left != 0)
        {
            $bw = ($w - $length) * 2 + $length;
            $bound.css(
            {
                'width': $bw,
                'height': $h,
                'left': ($bw / 2 - $length / 2) * -1 + 'px'
            }).appendTo($parent);
        }
        else if ($top != 0)
        {
            $bh = ($h - $length) * 2 + $length;
            $bound.css(
            {
                'width': $w,
                'height': $bh,
                'top': ($bh / 2 - $length / 2) * -1 + 'px'
            }).appendTo($parent);
        }
        $(img).css(
        {
            'min-width': $w + 'px',
            'min-height': $h + 'px',
            'left': $left + '%',
            'top': $top + '%'
        }).appendTo($parent);
        $($c + ' .btn_submit').css('opacity', 1);
        loadEnd();
    }

    function saveFile()
    {
        var $img = $parent.children('img'),
            $length = 580, // Final output size
            $ratio = $length / $parent.parent().width(),
            $l = parseInt($img.css('left').replace('px', '')) * $ratio,
            $t = parseInt($img.css('top').replace('px', '')) * $ratio,
            $w = $img.width() * $ratio,
            $h = $img.height() * $ratio,
            $desc = ($desc_active) ? $($c + ' #popup_photo_desc_holder textarea').val() : '';

        if ($(this).css('opacity') == 1)
        {
            loadStart();
            if ($('#imageCanvas').length)
            {
                console.log('Save using canvas');
                $('<canvas id="outputCanvas"></canvas>').appendTo($parent);
                var canvas = document.getElementById('outputCanvas');
                var ctx = canvas.getContext('2d');
                canvas.width = $length;
                canvas.height = $length;
                ctx.drawImage($($img)[0], $l, $t, $w, $h);
                var canvasData = canvas.toDataURL("image/png");
                canvas.remove();
                $.ajax(
                {
                    type: 'post',
                    url: '/photo/saveRawFile',
                    dataType: 'text',
                    data: {
                        base64data: canvasData,
                        desc: $desc,
                        circleId: $circle_id,
                        usersFbId: $users_fb_id
                    },
                    success: function(data)
                    {
                        saveFileSuccess(data);
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        saveFileFailed(jqXHR, textStatus, errorThrown);
                    }
                });
            }
            else
            {
                console.log('Save using uploaded image');
                $.ajax(
                {
                    type: 'post',
                    url: '/photo/saveFile',
                    data: {
                        filePath: $preview_img_path,
                        x: $l,
                        y: $t,
                        desc: $desc,
                        circleId: $circle_id,
                        usersFbId: $users_fb_id                
                    },
                    success: function(data)
                    {
                        saveFileSuccess(data);
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        saveFileFailed(jqXHR, textStatus, errorThrown);
                    }
                });
            }

        }
        else
        {
            console.log('load image first');
        }
    }

    function saveFileSuccess(data)
    {
        loadEnd();
        alert('Image saved successfully.');
        closeWindow();
    }

    function saveFileFailed(jqXHR, textStatus, errorThrown)
    {
        loadEnd();
        alert(jqXHR.responseText);
        console.log(jqXHR.status);
    }

    function loadStart()
    {
        $($c + ' #anim_loading').show();
    }

    function loadEnd()
    {
        $($c + ' #anim_loading').hide();
    }

    function closeWindow()
    {
        $.fancybox.close();
    }
})(jQuery);

/******************************************
 * Private function for Circle Detail Window (jquery extend)
 ******************************************/
(function($)
{
    var $this, $d, $c, $scroll_y, $margin_top, $gap, $new_modal, $bound = {};
    $.fn.init_circle = function(v)
    {
        $this        = $(this);
        $d           = v;
        $new_modal   = true;
        $padding_top = 0;

        var $win_abs_y = $(window).scrollTop();


        //initalize scroll detection
         $(window).bind('resize scroll', function()
        {
                
            $scroll_y = $(this).scrollTop() - $win_abs_y;
            $margin_top = $('.navbar').height();
                        
            $bound.w = $this.parent().outerWidth();
            $bound.l = $this.parent().offset().left;
                                
            //Add padding
            if( ($win_abs_y +$margin_top) < $this.parent().offset().top ) {
                console.log('Add padding');
                $padding_top = $this.parent().offset().top - $win_abs_y;
                $bound.y = $margin_top + $padding_top;
            }
            
            $bound.y =  $('.navbar').height()  - $(this).scrollTop() +$win_abs_y + $padding_top;
                if ($bound.y > $margin_top  && $padding_top == 0) $bound.y = $margin_top;
            
            
            $gap    = ($(window).height() < $this.height()) ? $this.height() - $(window).height() : 0;            
            $bound.top = $margin_top + $gap;


            if($scroll_y  < ($bound.top + $padding_top) ){
                // console.log( $bound.y  );
                $this.css({'position': 'fixed','top': $bound.y , 'left': $bound.l, 'width': $bound.w });
            }

            else {               
                console.log('dead zone');
                $this.css({'position': 'fixed','top': -$gap, 'left': $bound.l, 'width': $bound.w});

            }
             $new_modal = false;
        });

        $c = '.' + $(this).attr('class');
        
        //Start bind
        $($c + ' .btn_close').click(closeWindow);
        $($c + ' .btn_add_photo').click(addPhoto);
        $($c + ' .btn_nav_photo').click(navPhoto);


        //Startup some function
        $(window).trigger('scroll');
        
        $('#magnet_feed').animate({opacity:0}, 250);
        $this.animate({opacity:1}, 250);

        createDots();
    }

    function createDots(){
        var $steps          = $d.num_friends,
        $radius         = 100,
        $cx             = 0,
        $cy             = 0,
        $count          = 1;

        $parent         = $($c + ' #dot_container');

        for ( $i =0; $i < $steps; $i++ ) {
            $angle = (  Math.PI * ( $i / $steps -.25 ) ) *2;
            $x = ($cx + $radius * Math.cos( $angle ) +100)/2;
            $y = ($cy + $radius * Math.sin( $angle ) +100)/2;

            if ($i != 0){
                $('<div class="dot"><img src="img/popups/circle/dot.png"/></div>')
                .css({'left' : $x + '%','top': $y + '%'})
                .appendTo($parent)
                .hide()
                .delay($i*100)
                .show(500, function(){
                    $count ++;                    
                    if($count == $steps)
                        circleAnimComplete();
                });
            }
        }
    }

    function circleAnimComplete(){
        loadCirclePhotos();
        loadCommentBox();
    }

    function loadCirclePhotos(){
        $.ajax({
            type: 'POST',
            url: 'circle_photo/getlist',
            dataType: 'json',
            data: { circleId: $d.circle_id },
            success: function(data)
            {
                if(data.length > 0)
                    showCirclePHotos(data);
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                console.log('Error ' + textStatus);
            }                
        });

        function showCirclePHotos(v){

            var $tmb, $img, tmbs_width = 0,
            $tmbs = $('<ul/>').appendTo($($c + ' #popup_circle_photo_carousel_wrapper #container'));
            $(v).each(function(i){
                $img = $('<img src="uploads/'+ v[i].filename +'"/>');
                $tmb = $('<li/>')
                    .append($img)
                    .appendTo($tmbs)
                    .click(function(){

                            $.popup({type:'photo', 
                                data:{
                                    source: 'local',
                                    content: v[i].description,
                                    photo_url: '/uploads/' + v[i].filename
                                } 
                            })
                        });

                tmbs_width += 220;
            });

            // console.log( $tmbs.children('li').length )
            //Add
            if ($tmbs.children('li').length % 2 != 0)
            {
                console.log('odd')
                $tmbs.append( $('<li/>') );
                tmbs_width += 220;
            }

            $tmbs.width(tmbs_width);
        }
    }

    function loadCommentBox(){
        var $holder = $($c + ' #popup_circle_comment_holder');
        $('<iframe src="popup/facebook_comment_iframe/' + $d.circle_id +'"></iframe>').appendTo($holder);
    }

    function addPhoto()
    {
        $.popup({type:'photo_upload', data: $d});
    }

    function navPhoto()
    {
        var $tmb, multiplier, dx,
        $container = $($c + ' #popup_circle_photo_carousel_wrapper #container ul');
        $tmb = $container.children('li:nth-child(1)');
        multiplier = (parseInt($tmb.css('margin-right').replace('px','')) + $tmb.width())*2;

        
        if($(this).hasClass('left')){
            dx = $container.position().left - multiplier;            

            console.log( dx);
            console.log( $container.width() - $container.parent().width() );

            if(Math.abs(dx) > ($container.width()- multiplier) ){
                dx = 0;
            }
            
        }
        else{
            dx = $container.position().left + multiplier;
            if($container.position().left >= 0){
                dx = 0 - $container.width() + multiplier;
            }
        }
        
        $container.stop().animate({left: dx}, 500);
        
    }

    function closeWindow()
    {
        $('#magnet_feed').animate({opacity:1}, 250);
        $this.animate({opacity:0}, 250, function(){ 
            $(window).unbind('resize scroll');
            $this.remove();
        });
    }

})(jQuery);
