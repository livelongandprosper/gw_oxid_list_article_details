var gw_product_list_item_iterator = 0,
    ajax_content_iterator_row = 0,
    ajax_content_iterator_item = 0
;

// IIFE - Immediately Invoked Function Expression
(function(gw) {
    // The global jQuery object is passed as a parameter
    gw(window.jQuery, window, document);
}(function($, window, document) {
    // The $ is now locally scoped
    // Listen for the jQuery ready event on the document
    $(function() {
        // DOM is ready!
        /////////////////////////////
        // jQuery Code Go

        //********************************************
        // functions
        //

        /**
         * prepare containers in which the content loaded via ajax should be displayed
         */
        function gw_append_ajax_list_elements() {
            var $not_prepared_productData_elements = $(".list-container .productData").not(".ajax-prepared"),
                $list_rows = $(".list-container > .row").not(".ajax-prepared");
            ;

            // append ajax_content_placeholders for rows (desktop)
            gw_product_list_item_iterator = $(".list-container .productData.ajax-prepared").length;
            $list_rows.each(function(){
                $(this).attr('rel','#gw-product-list-row-ajax-content-'+(ajax_content_iterator_row));
                $(this).after('<div id="gw-product-list-row-ajax-content-'+(ajax_content_iterator_row)+'" class="gw-product-list-row-ajax-content gw-product-list-ajax-content"></div>');

                // this row is prepared now
                $(this).addClass('ajax-prepared');
                ajax_content_iterator_row+=1;
            });

            // append ajax_content_placeholders for each list item (mobile)
            $not_prepared_productData_elements.each(function(){
                $(this).attr('rel','#gw-product-list-item-ajax-content-'+(ajax_content_iterator_item));
                $(this).after('<div id="gw-product-list-item-ajax-content-'+(ajax_content_iterator_item)+'" class="gw-product-list-item-ajax-content gw-product-list-ajax-content"></div>');

                // append product list click triggers
                $(this).append('<div class="gw-product-list-item-trigger" />');

                // this list item is prepared now
                $(this).addClass('ajax-prepared');
                ajax_content_iterator_item+=1;
            });

            // debug !TODO: remove this if not needed anymore
            $(document).on('dblclick', ".ajax-prepared .gw-product-list-item-trigger", function(e){
                var $parent_item = $(this).parent(),
                    ajax_load_url = $parent_item.find(".title a").attr("href");
                window.open(ajax_load_url);
            });

            return;
        }

        /**
         * this function executes the javascript that is originally executet via rendering the template /modules/digidesk/dd_article_availability_reminder/Application/views/blocks/base_popups.tpl
         * it also is a little bit different to the original one
         */
        function gw_call_availablilty_reminder_js() {
            var $UserInfoModal = $( '.dd-userinfo-modal' ).not( '.has-modal-events' );

            if( $UserInfoModal.length )
            {
                $UserInfoModal.on( 'shown.bs.modal', function()
                    {
                        var bsModal = $( this ).data( 'bs.modal' );

                        bsModal.$backdrop.css( 'z-index', 1080 );
                        bsModal.$element.css( 'z-index', 1090 );

                        $( '.dd-userinfo-article-id', this ).val( bsModal.options.articleId );
                    }
                ).on( 'hidden.bs.modal', function()
                    {
                        $( '.dd-notify-action', this ).removeAttr( 'disabled' );
                    }
                );

                $( '.dd-notify-action', $UserInfoModal ).on( 'click', function( e )
                    {
                        e.preventDefault();

                        var $btn = $( this );
                        var $form = $( '.dd-userinfo-form' );

                        var validateFields = [ '#userinfo_field_name', '#userinfo_field_lastname', '#userinfo_field_usermail' ];
                        var valid = true;

                        validateFields.forEach( function( sFieldID )
                        {
                            var oInput = $( sFieldID );
                            var sValue = oInput.val();

                            if( !sValue.trim() )
                            {
                                valid = false;
                                oInput.css( 'border-color', 'red' );
                            }
                            else
                            {
                                oInput.css( 'border-color', '');
                            }
                        });

                        if( valid )
                        {
                            $btn.attr( 'disabled', true );
                            $form.find("[name='cl']").val('details'); // manipulate
                            $.post( $form.attr( 'action' ), $form.serialize(), function()
                                {
                                    $UserInfoModal.modal( 'hide' );
                                    $('#clearuserinfo').trigger('reset');
                                }
                            );
                        }

                    }
                );

                $UserInfoModal.addClass( 'has-modal-events' );
            }
        }

        //********************************************
        //********************************************
        //********************************************


        //********************************************
        // Load article details via ajax
        //

        // prepare ajax dom elements initially
        gw_append_ajax_list_elements();

        // here comes the actual click action on the list item trigger
        $(document).on('click', ".ajax-prepared .gw-product-list-item-trigger", function(e){
            var $parent_item = $(this).parent(),
                $ajax_content_box = $($(window).width() < 768 ? $(this).parent().attr("rel") : $(this).parents(".row").attr("rel") ), // div where the ajax details infos will be loaded to
                $all_list_items = $(".list-container .productData"),
                ajax_load_url = $parent_item.find(".title a").attr("href");

            // set classes
            if($parent_item.hasClass("active")) { // is clicked product already active? then deactivate it
                $ajax_content_box.slideUp(function() {
                    $all_list_items.removeClass("active");
                    $ajax_content_box.removeClass('active active-0 active-1 active-2 active-3');
                    $ajax_content_box.html("");
                });
            } else {  // is inactive? then activate it
                // remove active classes from all list items
                $all_list_items.removeClass("active");

                // get the position in list of elements of that line
                var position_in_row = $parent_item.parent().find("[class='"+$parent_item.attr("class")+"']").index($parent_item);

                // slide up all ajax_content boxes that should not be opened
                // console.log($ajax_content_box.attr("id"));
                // this is very important to prevent errors while changing color and choosing size in different ajax content boxes
                $(".gw-product-list-ajax-content").each(function(){
                    if($(this).attr("id") != $ajax_content_box.attr("id")) {
                        $(this).removeClass('active active-0 active-1 active-2 active-3');
                        $(this).slideUp();
                        $(this).html("");
                        console.log('remove class from #'+$(this).attr("id"));
                    }
                });

                // scroll to the right position
                /*
                var parent_position = $parent_item.position();gw-product-list-ajax-content
                console.log(parent_position);
                $("body,html").stop(true,true).animate({
                    scrollTop: (parent_position.top) + 'px'
                });
                */

                // add / remove classes to/from ajax content box
                $ajax_content_box.addClass('active');
                $ajax_content_box.removeClass('active-0 active-1 active-2 active-3');
                $ajax_content_box.addClass('active-'+(position_in_row));

                // load content with ajax
                $.ajax({
                    url: ajax_load_url,
                    type: "GET",
                    data: {gwlistarticledetails:1},
                    timeout: 5000,
                    success: function(data){
                        $ajax_content_box.html($(data).find("#details_container"));
                        $ajax_content_box.append('<div class="gw-ajax-content-closer"><span class="gw-icon-bar"></span><span class="gw-icon-bar"></span></div>')

                        // slide down content
                        $ajax_content_box.stop(true,true).slideDown(function() {
                            // add active class
                            $parent_item.addClass("active");

                            // trigger event article_loaded_and_slide_down
                            var article_loaded_and_slide_down_event = jQuery.Event( "article_loaded_and_slide_down" );
                            article_loaded_and_slide_down_event.content_box = $ajax_content_box;
                            article_loaded_and_slide_down_event.list_element = $parent_item
                            $("body").trigger(article_loaded_and_slide_down_event);

                            // console.log(article_loaded_and_slide_down_event);
                        });

                        // trigger event article_loaded
                        var article_loaded_event = jQuery.Event( "article_loaded" );
                        article_loaded_event.content_box = $ajax_content_box;
                        article_loaded_event.list_element = $parent_item
                        $("body").trigger(article_loaded_event);

                        // console.log(article_loaded_event);

                        gw_call_availablilty_reminder_js();
                    },

                    // Timeout
                    error: function(x, t, m) {
                        if(t==="timeout") {
                            alert("Error - Code: D3");
                            // 		            location.reload();
                        } else {
                            alert("Error - Code: D2");
                            /*
                            console.log(x);
                            console.log(t);
                            console.log(m);
                            */
                            // 		            location.reload();
                        }
                    },
                    complete: function(data) {

                    }
                });
            }
        });

        // close button click
        $(document).on("click", ".gw-ajax-content-closer", function() {
            $(".list-container .productData").removeClass("active");
            $(this).parent().slideUp();
        });

        // color variant chooser
        $(document).on("click", ".gw-article-color-picker li a", function(){
            var $ajax_content_box = $(".gw-product-list-ajax-content.active"),
                ajax_load_url = $(this).attr("href");
            $.ajax({
                url: ajax_load_url,
                type: "GET",
                data: {gwlistarticledetails:1},
                timeout: 5000,
                success: function(data){
                    $ajax_content_box.html($(data).find("#details_container"));

                    gw_call_availablilty_reminder_js();
                },

                // Timeout
                error: function(x, t, m) {
                    if(t==="timeout") {
                        alert("Error - Code: D3");
                        // 		            location.reload();
                    } else {
                        alert("Error - Code: D2");
                        /*
                        console.log(x);
                        console.log(t);
                        console.log(m);
                        */
                        // 		            location.reload();
                    }
                },
                complete: function(data) {

                }
            });
            return false;
        });

        // scroll down to active article
        $("body").on('article_loaded_and_slide_down', function(event){
            var parent_position = event.list_element.offset();
            $("body,html").stop(true,true).animate({
                scrollTop: (parent_position.top) + 'px'
            });
        });
        //********************************************

        // when infinite scrolling was done, ajax elements has to be appended to the loaded objects
        $(document).bind("infiniteScrollingDone", function(){
            gw_append_ajax_list_elements();
        });

        // jQuery Code End
        /////////////////////////////
    });
    // Hier kommt der Rest des Codes hin
}));