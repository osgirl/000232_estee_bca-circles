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

function tsToDate(ts)
{
    var t = new Date(),
        d = new Date(ts * 1000),
        m, df, ampm, result;

    if (t.getFullYear() + t.getDate() == d.getFullYear() + d.getDate())
    {
        if (t.getHours() == d.getHours())
        {
            result = minsAgoText;
            result = result.replace("#", (t.getMinutes() - d.getMinutes()));

        }
        else
        {
            df = t.getHours() - d.getHours();
            if(selectedLanguage == "en"){ 
                result = df + ' hour' + ((df == 1) ? '' : 's') + ' ago';
            }else{
                result = hoursAgoText;
                result = result.replace("#", df);
            }
        }
    }
    else
    {
        ampm = (d.getHours() < 12) ? 'AM' : 'PM';
        result = d.getHours() + ':' + d.getMinutes() + '' + ampm + ' - ' + d.getDate() + ' ' + month(d.getMonth()) + ' ' + d.getFullYear();
    }
    return result;

    function month(n)
    {
        m = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return m[n];
    };
};

//Plugins

/***************************************************
 * Popup jQuery extend for fancybox 2 (standalone)
 ***************************************************
 *   _data object may contain:
 *   id
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
 *   child
 *   child_id
 *   outlink
 */
$.extend(
{
    popup: function(v)
    {
        var d = setData(v.data),
            $closeBtn = true,
            $child, //true if it's a popup inside of circle
            $isCircle,
            $isUpload,
            $isOutlink,
            adr, u, dl;

        $child = d.child;
        $isOutlink = d.outlink;

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
            $isUpload = true;
            break;
        case 'circle':
            u = "popup/circle/";
            $isCircle = true;
            break;
        case 'privacy_policy':
            u = "popup/privacy_policy/";
            break;
        case 'terms_and_conditions':
            u = "popup/terms_and_conditions/";
            break;
        }
        if ($isCircle)
        {
            if ($('#popup_circle').length == 0)
            {
                $.ajax(
                {
                    type: 'POST',
                    url: baseUrl + indexPage + u,
                    data: d,
                    success: function(data)
                    {
                        if (ismobile) $('body').append(data);
                        else $('#gallery').append(data);
                        $('.popup#popup_circle').init_circle(d);
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        console.debug('Error ' + textStatus);
                    }
                });
            }
            else console.debug('Circle detail is already running');
        }
        else
        {
            //Close Circle detail unless it's a child
            if (!$child && $('#popup_circle').length != 0) $('.popup#popup_circle .btn_close').trigger('click');

            $.fancybox(
            {
                href: baseUrl + indexPage + u,
                type: 'ajax',
                padding: 0,
                margin: 0,
                closeBtn: $closeBtn,
                modal: $isUpload,
                ajax: {
                    type: 'POST',
                    data: d
                },
                afterClose: function()
                {

                    //unbind unnecessary event from window
                    if ($('html').hasClass('_resize_'))
                    {
                        $(window).removeClass('resize').unbind('resize');
                    }

                    //Reset url
                    adr = $.address.value().split('/');
                    if (!$isUpload)
                    {
                        dl = ($child) ? '/circle/' + adr[2] + '/' : '/ ';
                        $.address.path(dl);
                    }
                }
            });
        }

        function setData(v)
        {
            var d = {
                id: null,
                source: null,
                author: null,
                content: null,
                datetime: null,
                avatar: null,
                photo_url: null,
                share_url: null,
                circle_id: null,
                num_friend: null,
                friends_data: null,
                users_fb_id: null,
                child: null,
                child_id: null,
                outlink: null,
                is_user: null
            };
            if (v != undefined)
            {
                for (var key in v)
                d[key] = v[key];
            }
            return d;
        };

        //Update deeplink
        if (!$isUpload && !$isOutlink)
        {
            dl = $.address.path() + v.type + '/' + ((d.source == null) ? '' : d.source + '/') + ((d.id == null) ? '' : d.id + '/')
            $.address.path(dl.replace(/ |%20/gi, ''));
        }
        return false;
    },

    /*******************************
     * Global share function
     * v.post_type
     * v.type (SNS type)
     * v.url
     * v.id
     ******************************/
    popup_share: function(v)
    {
        var u;
        if (v.post_type == 'circle') u = '/circle/' + v.id;
        else if (v.post_type == 'page') u = v.url;
        else u = v.url + '/';

        var goal = v.action != undefined ? v.action : "";

        if (v.type == "facebook")
        {
            if (v.referral != undefined || v.referral != null) u += "/?referral=facebook-" + v.referral;

            var _picture = baseUrl + 'img/assets/fb_share_arial.png';

            if (v.photo_url != undefined) _picture = v.photo_url;

            var _title = shareTitle;
            var _caption = shareCaption;
            var _description = shareDescription;

            if (v.post_type == 'circle')
                _caption = _caption + " " + goal;

            var _link = baseUrl + indexPage + '#' + u;


            if (v.post_type == 'video'){
                _caption = shareFBVideoCaption;
                _description = shareFBVideoDescription;
            }

            if (ismobile)
            {
                window.open("https://www.facebook.com/dialog/feed?" + "app_id=" + fbAppId + "&" + "link=" + encodeURIComponent(_link) + "&" + "picture=" + encodeURIComponent(_picture) + "&" + "name=" + encodeURIComponent(_title) + "&" + "caption=" + encodeURIComponent(_caption) + "&" + "description=" + encodeURIComponent(_description) + "&" + "redirect_uri=" + encodeURIComponent(baseUrl + indexPage), "_blank");
            }
            else
            {
                FB.ui(
                {
                    method: 'feed',
                    link: _link,
                    name: _title,
                    picture: _picture,
                    caption: _caption,
                    description: _description
                },

                function(response)
                {
                    if (response && response.post_id) $.gaEvent((v.post_type).capitalize(), 'Shared', 'by Facebook');
                });
            }
        }

        else if (v.type == "twitter")
        {

            var twitterShare = (v.post_type == 'video') ? shareTwVideoCopy : twitterShareCopy;

            var goal = v.action != undefined ? (weWillText+ ' ' + v.action) : twitterShare;
            var hash = (v.hashtag_before_url != undefined) ? 1 : 0;
            if (v.referral != undefined || v.referral != null) u += "/?referral=twitter-" + v.referral;
            
            //Swap speical characters to entities
            u = u.replace(/\//gi, '_').replace(/\?/gi, '%3F').replace(/\=/gi, '%5E');
            goal = goal.replace(/\'/gi,'%5E');

            var _url = baseUrl + indexPage + 'home/twitter_share/' + u + '/' + hash + '/' + encodeURIComponent(goal);

            openShareWindow(575, 380, _url , 'Twitter');
            $.gaEvent((v.post_type).capitalize(), 'Shared', 'by Twitter');
           
        }
    }
});

/******************************************
 * Private function for popup upload window (jquery extend)
 ******************************************/
(function($)
{
    var $c, $agr, $desc_active, $preview_img_path, $circle_id, $users_fb_id, $parent;
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
        $($c + ' .btn_submit').click(saveFile);
        $($c + ' #popup_checkbox').click(toggleCheckbox);
        $($c + ' #popup_photo_desc_holder textarea').focus(descFocus);
        $($c + ' input[type=file]').change(fileChangeListener);

        //IE9 or lower version fix (using a default file browse)
        if (!$('html').hasClass('lte-ie9'))
        {
            $($c + ' .btn_browse').click(browseFile);
            $parent.click(function()
            {
                if ($parent.children().length == 0) $($c + ' #uploadFile').click();
            });
        }
        else
        {
            $($c + ' .btn_browse').hide();
            $($c + ' #uploadFile').attr('class', 'file');
        }
    };

    function toggleCheckbox(e)
    {
        $agr = ($agr) ? false : true;
        $(e.target).css('background-position', (($agr) ? $(e.target).width() * -1 : 0), 0);

        if ($agr) $($c + ' .btn_next').removeClass('dim');
        else $($c + ' .btn_next').addClass('dim');
    };

    function loadNext()
    {
        if ($agr)
        {
            $($c + ' #popup_photo_upload_agreement_window').fadeOut();
        }
    };

    function descFocus(e)
    {
        $desc_active = true;
        $(e.target).val('');
        $(e.target).removeClass('greyfont');
    };

    function browseFile()
    {
        $($c + ' #uploadFile').click();
    };

    function fileChangeListener(e)
    {
        if (Modernizr.canvas && !ismobile && !$('html').hasClass('lte-ie9'))
        {
            uploadToCanvas(e);
        }
        else
        {
            uploadFile();
        }
    };

    function uploadToCanvas(e)
    {
        $parent.empty();
        loadStart();
        $('<canvas id="imageCanvas"></canvas>').appendTo($parent);
        var canvas = document.getElementById('imageCanvas');

        var reader = new FileReader();
        reader.onload = function(event)
        {
            var img = new Image();
            img.onload = function()
            {
                //Load image to canvas
                loadEnd();
                createImageBound(img, canvas);

                $(".btn_rotate").show();

                var imageRotation = 0;
                
                $(".btn_rotate").unbind('click').click(function(e){
                    imageRotation +=90;
                    if(imageRotation >= 360) imageRotation  = 0;
                    $(img).rotate(imageRotation);
                })

            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(e.target.files[0]);
    };


    function uploadFile()
    {
        loadStart();
        $.ajaxFileUpload(
        {
            url: baseUrl + indexPage + 'photo/uploadPreviewImage',
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
                alert('Please use an image in JPG, GIF and PNG format under 5mb.');
                loadEnd();
            }
        });
    };

    function uploadFileSuccess(data)
    {
        $preview_img_path = data.file_location;
        //create image control            
        $img = $('<img src="' + baseUrl + data.file_location + '" style="visibility:hidden"/>');
        $ratio = 1;
        $top = 0;
        $left = 0;
        $parent.empty();

        //remove old input element and create a new one
        $($c + ' input[type=file]').unbind('fileChangeListener').remove();
        // $('<input name="uploadFile" type="file" class="file" id="uploadFile"/>').prependTo($($c + ' #button_wrapper'));
        $($c + ' input[type=file]').change(fileChangeListener);

        //Load image to html
        $img.load(function()
        {
            //IE9 fix
            var sto = setTimeout(delay, 500);

            function delay()
            {
                clearTimeout(sto);
                var image = new Image();
                image.src = $($img).attr('src');
                createImageBound(image);
            }
        });
    }

    function createImageBound(img, canvas)
    {
        var $length = $parent.parent().width(),
            $bound = $('<div style="position:absolute; margin:0; padding:0; background:#FFFFFF"/>'),
            $ratio = 1,
            $top = 0,
            $left = 0,
            $w,$h,$bw,$bh;

        if (img.width > img.height)
        { // landscape
            // alert('landscape')
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
            // alert('portrait')
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
            'max-width': $bound.css('width'),
            'max-height': $bound.css('height'),
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
                $('<canvas id="outputCanvas"></canvas>').appendTo($parent);
                var canvas = document.getElementById('outputCanvas');
                var ctx = canvas.getContext('2d');
                canvas.width = $length;
                canvas.height = $length;
                ctx.drawImage($($img)[0], $l, $t, $w, $h);

                var canvasData = canvas.toDataURL("image/png");
                // $parent.remove(canvas);
                $.ajax(
                {
                    type: 'post',
                    url: baseUrl + indexPage + 'photo/saveRawFile',
                    dataType: 'json',
                    data: {
                        base64data: canvasData,
                        desc: $desc,
                        circleId: $circle_id,
                        usersFbId: $users_fb_id
                    },
                    success: function(data)
                    {
                        saveFileSuccess(data, $desc);
                    },
                    error: function(jqXHR, textStatus, errorThrown)
                    {
                        saveFileFailed(jqXHR, textStatus, errorThrown);
                    }
                });
            }
            else
            {
                $.ajax(
                {
                    type: 'post',
                    url: baseUrl + indexPage + 'photo/saveFile',
                    dataType: 'json',
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
                        saveFileSuccess(data, $desc);

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
    };

    function saveFileSuccess(data, des)
    {

        loadEnd();
        //alert('Image saved successfully.');
        if ($('#popup_circle').length != 0)
        {
            $('#popup_circle').trigger('photo_upload_complete');
        }
        closeWindow();
        //Add fake photo only circle id is null, and send custom tracking event
        if ($circle_id == '' || $circle_id == null)
        {
            //This is photo feed to gallery
            fakePhotoData = {
                id: data.id,
                file_name: data.file_name,
                description: des
            }
            $('body').trigger('PHOTO_UPLOADED');
            $.gaEvent('Photo', 'Added to feed');
        }
        else
        {
            $.gaEvent('Circle', 'Photo added', 'Circle ID#: ' + $circle_id);
        }
    };

    function saveFileFailed(jqXHR, textStatus, errorThrown)
    {
        loadEnd();
        alert(jqXHR.responseText);
        console.log(jqXHR.status);
    };

    function loadStart()
    {
        $($c + ' #anim_loading').show();
    };

    function loadEnd()
    {
        $($c + ' #anim_loading').hide();
    };

    function closeWindow()
    {
        $.fancybox.close();
    };
})(jQuery);


/*************************************************************
 * Private function for Circle Detail Window (jquery extend)
 *************************************************************/
(function($)
{
    var $this, $d, $c, $win_abs_y, $scroll_y, $margin_top, $margin_bottom, $padding_top, $gap, $bound = {}, $hasPhoto, $pagn, $nav_count;
    $.fn.init_circle = function(v)
    {
        $this = $(this);
        $c = '.' + $(this).attr('class');
        $d = v;
        $pagn = $($c + ' #popup_circle_photo_carousel_pagn');
        $this.attr('cid', $d.id);
        $d.child = true;
        if ($d.circle_id == null) $d.circle_id = $d.id;

        //Disable lazyLoader first
        gallery.disableLazyloader();

        //initalize scroll detection
        windowEventListener();

        //add user data to header area
        $($c + ' #popup_circle_header p').text(nameCircleOfStrength.replace('[name]', $d.author) );
        // $($c + ' #popup_circle_header span').text($d.country );
        $($c + ' #popup_circle_header span').css("background-image", 'url("' + baseUrl + 'img/flags/large/' + $d.country + '.png")');


        //Hide edit user button
        if (!v.is_user) $($c + ' .btn_edit').hide();
        currentCircleViewIsUser = v.is_user;
        currentCircleView = $c;

        //Start bind
        $($c + ' .btn_edit').click(function()
        {
            editFriends(v)
        });
        $($c + ' .btn_close').click(closeWindow);
        $($c + ' .btn_add_photo').click(addPhoto);
        $($c + ' .btn_nav_photo').click(navPhoto);

        $this.bind('photo_upload_complete', loadCirclePhotos)

        //Startup some function
        $(window).trigger('scroll');

        $('#magnet_feed').animate(
        {
            opacity: 0
        }, 250);
        $this.animate(
        {
            opacity: 1
        }, 250);
        createDots();
    };

    function windowEventListener()
    {
        //Add padding when header page has net been scrolled to the top
        $win_abs_y = $(window).scrollTop();
        $margin_top = getMarginTop();

        //Scroll only when the browser is on desktop mode
        if (($win_abs_y + $margin_top) < $this.parent().offset().top && fixedNav())
        {
            $padding_top = $this.parent().offset().top - $win_abs_y - $margin_top;
            $('html,body').animate(
            {
                scrollTop: $this.parent().offset().top - $margin_top
            }, 650)
        }
        else
        {
            $padding_top = 0;
        }


        updateBrowerProperties();

        $(window).bind('resize scroll', function(e)
        {

            if (e.type == 'resize')
            {
                $margin_top = getMarginTop();
                updateBrowerProperties();
            }

            $scroll_y = $(this).scrollTop() - $win_abs_y;
            $bound.w = $this.parent().outerWidth();
            $bound.l = $this.parent().offset().left;
            $bound.y = $('.navbar').height() - $(this).scrollTop() + $win_abs_y + $padding_top;

            if ($bound.y > $margin_top && $padding_top == 0) $bound.y = $margin_top;
            $gap = ($(window).height() < $this.height()) ? $this.height() - $(window).height() : 0;
            $bound.top = $margin_top + $gap;

            if ($scroll_y < ($bound.top + $padding_top))
            {
                $this.css(
                {
                    // 'position': 'fixed',
                    'top': $bound.y,
                    'left': $bound.l,
                    'width': $bound.w
                });
            }
            else
            {
                $this.css(
                {
                    // 'position': 'fixed',
                    'top': -$gap,
                    'left': $bound.l,
                    'width': $bound.w
                });
            }

            if (e.type == 'resize' && $hasPhoto)
            {
                resizeCirclePhotosNav();
            }
        });

        function getMarginTop()
        {
            return (fixedNav()) ? $('.navbar').height() : 0;
        };

        function fixedNav()
        {
            return $('.navbar').css('position') == 'fixed';
        };

        function updateBrowerProperties()
        {
            if (ismobile)
            {
                $this.css(
                {
                    'overflow-x': 'hidden',
                    'overflow-y': 'scroll',
                    'height': '100%',
                    'bottom': '0'
                });
                $('#content_wrap').animate(
                {
                    opacity: 0
                }, 200);
            }
            else
            {
                $this.css(
                {
                    'overflow-x': '',
                    'overflow-y': '',
                    'height': '',
                    'bottom': ''
                });
            }
        };
    };

    function createDots()
    {
        var $steps = parseInt($d.num_friends) + 1,
            $radius = 100,
            $cx = 0,
            $cy = 0,
            $count = 1,
            $parent = $($c + ' #dot_container'),
            $i, $angle, $x, $y;

        for ($i = 0; $i < $steps; $i++)
        {
            $angle = (Math.PI * ($i / $steps - .25)) * 2;
            $x = ($cx + $radius * Math.cos($angle) + 100) / 2;
            $y = ($cy + $radius * Math.sin($angle) + 100) / 2;

            if ($i != 0)
            {
                // $('<div class="dot"><img src="' + baseUrl + 'img/popups/circle/dot.png"/></div>').css(
                $('<div class="dot"/>').css(
                {
                    'left': $x + '%',
                    'top': $y + '%'
                }).appendTo($parent).hide().delay($i * 100).show(500, function()
                {
                    $count++;
                    if ($count == $steps) loadCirclePhotos();
                });
            }
        }
    };

    function loadCirclePhotos()
    {
        $.ajax(
        {
            type: 'POST',
            url: baseUrl + indexPage + 'circle_photo/getlist',
            dataType: 'json',
            data: {
                circleId: $d.id
            },
            success: function(data)
            {
                showCirclePhotos(data);
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                console.log('Error ' + textStatus);
            }
        });

        function showCirclePhotos(v)
        {
            $nav_count = 0;
            var $tmbs, $tmb, $img, $dot, $roll_over, tmbs_width = 0,
                $container = $($c + ' #popup_circle_photo_carousel_wrapper #container');

            $container.empty();
            $pagn.empty();
            $tmbs = $('<ul/>').appendTo($container);

            if (v.length > 0)
            {
                $(v).each(function(i)
                {
                    //Thumbnail
                    $img = $('<img style="display:none" src="' + baseUrl + 'uploads/' + v[i].filename + '"/>').mousedown(function()
                    {
                        return false;
                    }).load(imgLoadComplete);

                    $tmb = $('<li/>').append($img).appendTo($tmbs).click(function()
                    {
                        $.popup(
                        {
                            type: 'photo',
                            data: {
                                id: v[i].id,
                                circle_id: $d.circle_id,
                                source: 'bca',
                                content: v[i].description,
                                photo_url: baseUrl + 'uploads/' + v[i].filename,
                                child: true
                            }
                        })
                    });
                    $rollover = $('<span class="photo_rollover"/>').append('<div class="popup_round_button" id="popup_btn_pink">VIEW</div>').appendTo($tmb).mouseenter(function()
                    {
                        $(this).animate(
                        {
                            opacity: 1
                        }, 180)
                    }).mouseleave(function()
                    {
                        $(this).animate(
                        {
                            opacity: 0
                        }, 180)
                    })

                    //Paginaiton (two photo per pagination, add only if two or more photo available)
                    if ((i % 2) == 0 && v.length > 2)
                    {
                        $dot = $('<li/>').appendTo($pagn);
                        if (i == 0)
                        {
                            $dot.addClass('selected');
                        }
                    }

                    tmbs_width += 220;
                });

                $hasPhoto = true;
                $tmbs.width(tmbs_width);
                $container.parent().animate(
                {
                    height: 200
                }, 500, function()
                {
                    loadCommentBox();
                    resizeGalleryHeight();
                });

                //Add swipe event if photo is more than two
                if (v.length > 2) $container.off('swipeleft swiperight').on('swipeleft swiperight', carouselSwipeHandler);

                //Check if the circle opened with child_id and popup the photo if it's available.
                if ($d.child_id != null) openPhotofromExternalLink($d.child_id);

            }
            else
            {
                $hasPhoto = false;
                loadCommentBox();
                resizeGalleryHeight();
            }
            resizeCirclePhotosNav();

            function imgLoadComplete()
            {
                var $c, $p = $(this).parent();
                $p.css('background', 'none');
                $c = $('<span/>').appendTo($p).css(
                {
                    'opacity': 0,
                    'background-image': 'url(' + $(this).attr('src') + ')',
                    'background-size': 'contain'
                }).animate(
                {
                    opacity: 1
                }, 500);
                $(this).remove();
            };
        };
    };

    function loadCommentBox()
    {
        var $holder = $($c + ' #popup_circle_comment_holder');
        var iframeSrc = baseUrl + indexPage + 'popup/facebook_comment_iframe/' + $d.id;
        $('<iframe src="' + iframeSrc + '"></iframe>').appendTo($holder);
    };

    function resizeCirclePhotosNav()
    {
        var $container = $($c + ' #popup_circle_photo_carousel_wrapper #container'),
            $tmbs = $container.children(),
            $navs = $($c + ' .btn_nav_photo')

            if ($container.width() < $tmbs.width())
            {
                $navs.show();
            }
            else
            {
                $navs.hide();
                $tmbs.css('left', 0);
            }
    };

    function resizeGalleryHeight()
    {
        //--Expand gallery height (Main page) if scrollable area is too short
        $margin_bottom = $this.outerHeight() - ($this.parent().outerHeight() + $this.parent().offset().top - $win_abs_y);
        if ($margin_bottom > 0) $this.parent().outerHeight($this.parent().outerHeight() + $margin_bottom);
        else $margin_bottom = 0;
    };

    function addPhoto()
    {
        $.popup(
        {
            type: 'photo_upload',
            data: $d
        });
    };

    function navPhoto(type)
    {
        var dx,
        $container = $($c + ' #popup_circle_photo_carousel_wrapper #container ul'),
            $tmb = $container.children('li:nth-child(1)'),
            child_width = parseInt($tmb.css('margin-right').replace('px', '')) + +$tmb.width(),
            container_width = $container.children('li').length * child_width,
            multiplier = child_width * 2,
            even = ($container.children().length % 2 == 0);

        if ($(this).hasClass('right') || type == 'swipeleft')
        {
            dx = $container.position().left - (even ? multiplier * 1 : multiplier);
            if ((dx + container_width) < (even) ? multiplier : 0) dx = $nav_count = 0;
            else
            {
                $nav_count++;
            }
        }
        else
        {
            dx = $container.position().left + multiplier;
            if ($container.position().left >= 0)
            {
                dx = 0 - container_width + multiplier - (even ? 0 : multiplier / 2);
                $nav_count = $pagn.children('li').length - 1;
            }
            else $nav_count--;
        }

        $container.stop().animate(
        {
            left: dx
        }, 500);
        $pagn.children('li').removeClass('selected');
        $pagn.children('li:nth-child(' + ($nav_count + 1) + ')').addClass('selected');
    };

    function carouselSwipeHandler(e)
    {
        if ($pagn.css('display') == 'block') navPhoto(e.type);
    };

    function editFriends(v)
    {
        currentCircleViewData = v;
        $('body').trigger('EDIT_FRIEND');
    };

    function openPhotofromExternalLink($id)
    {
        $.ajax(
        {
            type: 'POST',
            url: baseUrl + indexPage + 'circle_photo/get',
            dataType: 'json',
            data: {
                id: $id
            },
            success: function(data)
            {
                console.log(data);
                $.popup(
                {
                    type: 'photo',
                    data: {
                        id: data.id,
                        circle_id: data.ref_circle_id,
                        source: 'bca',
                        content: data.description,
                        photo_url: baseUrl + 'uploads/' + data.filename,
                        child: true
                    }
                })

            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                console.log('Error ' + textStatus);
            }
        });
    };

    function closeWindow()
    {
        if (ismobile) $('#content_wrap').animate(
        {
            opacity: 1
        }, 200);
        $('#magnet_feed').animate(
        {
            opacity: 1
        }, 250);
        $this.animate(
        {
            opacity: 0
        }, 250, function()
        {
            $this.parent().outerHeight($this.parent().outerHeight() - $margin_bottom);
            $(window).unbind('resize scroll');
            gallery.enableLazyloader();

            $this.remove();
            $.address.path('/ ');
        });
    };

})(jQuery);

/************************************************************
 * Private function for Language data loader (jquery extend)
 ************************************************************/
(function(f)
{
    var $language, $output = [],
        b = f.language = function(v)
        {};
    f.extend(b,
    {
        load: function(fn)
        {
            if (fn == null)
            {
                console.debug('$.language Error: event Listener Function is missing');
                return false;
            }

            $language = selectedLanguage;
            //Manual language selector (possible update)
            if ($language == 'en')
            {
                if (selectedCountry == 'uk') $language = 'en-uk';
                else $language = 'en-us';
            }
            else if ($language == 'es' && selectedCountry == 'mx') $language = 'es-mx';

            //add langage abbreviation as class into body
            $('body').addClass($language);

            $.ajax(
            {
                url: baseUrl + indexPage + 'language/fetchLanguageData',
                type: 'post',
                dataType: 'json',
                data: {
                    language: $language
                },
                success: function(data)
                {
                    var arr;
                    for (var i = 0; i < data.length; i++)
                    {
                        arr = [];
                        for (var key in data[i])
                        {
                            arr.push(data[i][key])
                        }
                        $output.push(arr);
                    }
                    fn($output);
                },
                error: function(jqXHR, textStatus, errorThrown)
                {
                    console.debug('Error ' + textStatus);
                }
            });
        },
        selectedLanguageField: function(){
            return $language;
        }
    });
})(jQuery);

/**************************************************
 * Private function for FeedMagnet (jquery extend)
 **************************************************/
(function(f)
{
    /*****************
     * fo  = Feed Object
     * sfo = Selected Feed Object
     * history = Store the last result of Feed Object, use signal name as a key
     ******************/
    var fo = {}, sfo, history = {},
    b = f.feed = function()
    {
        var fm_server = 'estee.feedmagnet.com';
        window.fm_ready = function(fx)
        {
            if (typeof $FM !== 'undefined' && typeof $FM.ready === 'function')
            {
                console.debug('--->FEED: Connected---');
                $FM.ready(fx);                
            }
            else
            {
                console.debug('--->FEED: Connecting...');
                window.setTimeout(function()
                {
                    fm_ready.call(null, fx);
                }, 50);
            }
        };

        var fmjs = document.createElement('script');
        var p = ('https:' === document.location.protocol ? 'https://' : 'http://');
        fmjs.src = p + fm_server + '/embed.js';
        fmjs.setAttribute('async', 'true');
        document.getElementsByTagName('head').item(0).appendChild(fmjs);
    };
    f.extend(b,
    {
        //This will reset all of Feed Magnet Feed
        reset: function()
        {
            console.debug('--->FEED: RESET');
            fo = {};
            history = {};
        },

        get: function(v, f, n)
        {
            sfo = fetch_fo(v);
            sfo.get(
            {
                limit: n,
                success: function(self, data)
                {
                    saveHistory(v, data.response.updates);
                    f(data.response.updates);
                }
            });
        }
    },
    {
        more: function(v, f, n)
        {
            sfo = fetch_fo(v);
            sfo.more(
            {
                limit: n,
                success: function(self, data)
                {
                    if (checkDuplicateData(v, data.response.updates)) f(data.response.updates);
                    else
                    {
                        f([]);
                    }
                }
            });
        }
    },
    {
        featured: function(v, f, n)
        {
            sfo = fetch_fo(v);
            sfo.featured(
            {
                limit: n,
                success: function(self, data)
                {
                    f(data.response.updates);
                }
            });
        }
    });

    //Store the Feed Magnet's connection object to fo{}

    function fetch_fo(v)
    {
        if (!fo[v])
        {
            fo[v] = $FM.Feed(v);
        }
        else
        {}
        return fo[v];
    };

    function saveHistory(v, result)
    {
        var str = '';
        $.each(result, function(i, obj)
        {
            str += obj.data.id + ',';
        });

        history[v] = str;
    };

    function checkDuplicateData(v, result)
    {
        var valid = true;
        $.each(result, function(i, obj)
        {
            if (history[v].indexOf(obj.data.id) != -1)
            {
                // console.debug("MATCH FOUND");
                valid = false;
            }
        })
        return valid;
    };

})(jQuery);


/******************************************************
 * Public function for Load data from deeplink share
 ******************************************************/

function checkAndLoadExternalUrl()
{
    var u, $data,
    adr = $.address.value().split('/');

    if (adr.length != 0)
    {
        switch (adr[1])
        {
            //General
        case 'video':
            $.popup(
            {
                type: 'video',
                data: {
                    outlink: true
                }
            });
            break;

        case 'about':
            $.popup(
            {
                type: 'about',
                data: {
                    outlink: true
                }
            });
            break;

        case 'privacy_policy':
            $.popup(
            {
                type: 'privacy_policy',
                data: {
                    outlink: true
                }
            });
            break;

        case 'terms_and_conditions':
            $.popup(
            {
                type: 'terms_and_conditions',
                data: {
                    outlink: true
                }
            });
            break;

            //Dynamic
        case 'circle':
            u = baseUrl + indexPage + "circle/fetchCircleData/";
            $data = {
                circle_id: adr[2]
            };
            loadLocalData();
            break;
        case 'photo':

            //Load from local
            if (adr[2] == 'bca')
            {
                u = baseUrl + indexPage + "photo/fetchUploadedPhotoData";
                $data = {
                    photo_id: adr[3]
                };
                loadLocalData();
            }
            //Load from instagram
            else
            {
                loadInstagramData();
            }
            break;
        }
    }

    function loadLocalData()
    {
        $.ajax(
        {
            url: u,
            type: 'post',
            dataType: 'json',
            data: $data,
            success: function(data)
            {
                switch (adr[1])
                {
                case 'circle':
                    circle_success(data);
                    break;
                case 'photo':
                    photo_success(data)
                    break;
                }
            }
        });

        function circle_success(data)
        {
            $.popup(
            {
                type: 'circle',
                data: {
                    id: data.circle_id,
                    author: data.user_name,
                    content: data.goal,
                    avatar: data.user_photo_url,
                    users_fb_id: data.user_id,
                    num_friends: data.friends_data.length,
                    country: data.country,
                    outlink: true,
                    child_id: (adr[5] != undefined) ? adr[5] : null
                }
            });
        };

        function photo_success(data)
        {
            $.popup(
            {
                type: 'photo',
                data: {
                    id: data.photo_id,
                    source: 'bca',
                    content: data.description,
                    photo_url: baseUrl + "uploads/" + data.filename,
                    outlink: true
                }
            });
        };
    };

    function loadInstagramData()
    {
        $.ajax(
        {
            type: 'GET',
            dataType: 'jsonp',
            url: 'https://api.instagram.com/v1/media/' + adr[3] + '?client_id=3cff2efc3c714b4ab94a289918992d9c',
            success: function(result)
            {
                var data = result.data;
                $.popup(
                {
                    type: 'photo',
                    data: {
                        id: data.id,
                        source: 'instagram',
                        author: data.caption.from.full_name,
                        content: data.caption.text,
                        photo_url: data.images.standard_resolution.url,
                        outlink: true
                    }
                });

            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                console.debug('Error ' + textStatus);
            }
        });
    };
    //Check referral and send gaEvent if available
    var ref = getURLParameter('referral');
    if (ref != undefined) $.gaEvent('referral', ref.capitalize());
};

/***************************************************
 * Popup jQuery extend for Google analytics event
 ***************************************************/

$.extend(
{
    gaEvent: function(_category, _action, _label)
    {
        if (_label == undefined) _label = '';
        console.log(_category, _action, _label);
        // _gaq.push(['_trackEvent', _category, _action, _label]);
        ga('send', 'event', _category, _action, _label);
    },
    gaPageview: function(_url)
    {
        var title = _url.toString().replace(/\//gi, '');
        console.log('Pageview: ' + _url + ' Title is: ' + title);
        ga('send',
        {
            'hitType': 'pageview',
            'page': _url,
            'title': title
        });
    }
});

/***************************************************
 * Helpers
 ***************************************************/

function openShareWindow(_w, _h, _url, _title)
{
    var width = _w,
        height = _h,
        left = window.screenX + ((window.outerWidth - width) / 2),
        top = window.screenY + ((window.outerHeight - height) / 2),
        opts = 'location=0' + ',toolbar=0' + ',titlebar=0' + ',status=0' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
    window.open(_url, _title, opts);
};

function getURLParameter(param)
{
    var sPageURL = $.address.queryString();
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == param)
        {
            return sParameterName[1];
        }
    }
};

String.prototype.capitalize = function()
{
    return this.charAt(0).toUpperCase() + this.slice(1);
};