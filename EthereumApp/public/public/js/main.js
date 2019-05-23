(function ($) {
    "use strict";
    /*---------------------------------*/
    /*----------Site Preloader---------*/
    /*---------------------------------*/
    $(window).on('load', function () {
        $('.site-preloader').fadeOut(1000);
    });

    /*---------------------------------*/
    /*----------Dropdown Menu----------*/
    /*---------------------------------*/
    $(".mainmenu .nav.navbar-nav .dropdown").on({
        mouseenter: function () {
            $(this).children('ul.dropdown-menu').stop(true, false, true).fadeToggle(300);
        },
        mouseleave: function () {
            $(this).children('ul.dropdown-menu').stop(true, false, true).fadeToggle(300);
        }
    });

    /*---------------------------------*/
    /*----------Scroll To Top----------*/
    /*---------------------------------*/
    $('a[href=#top]').on('click', function () {
        $('body,html').animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 250) {
            $('.totop').fadeIn();
        } else {
            $('.totop').fadeOut();
        }
    });

    /*---------------------------------*/
    /*--------Blog Post Load More------*/
    /*---------------------------------*/
    $('.blog-post-grid.home-default.loadmore').slice(0, 0).show();
    $('#loadmore').on('click', function (e) {
        e.preventDefault();
        $('.blog-post-grid.home-default.loadmore:hidden').slice(0, 3).fadeIn('slow');

        if ($('.blog-post-grid.home-default.loadmore:hidden').length === 0) {
            $('#loadmore').fadeOut('slow');
        }
    });

    /*---------------------------------*/
    /*-----Country Select DropDown-----*/
    /*---------------------------------*/
    $('#country-select').flagStrap();

    /*---------------------------------*/
    /*--------------Counter------------*/
    /*---------------------------------*/
    $('span.count').counterUp({
        delay: 10, // the delay time in ms
        time: 1000 // the speed time in ms
    });

    /*---------------------------------*/
    /*----Site Color Switcher Panel----*/
    /*---------------------------------*/
    $(".site-color-panel-box .color-panel-spinner").on('click', function (event) {
        event.preventDefault();
        if ($(this).hasClass("color-panel-icon")) {
            $(".site-color-panel").stop().animate({
                left: "-200px"
            }, 500);
        } else {
            $(".site-color-panel").stop().animate({
                left: "0px"
            }, 500);
        }
        $(this).toggleClass("color-panel-icon");
        return false;
    });

    /*---------------------------------*/
    /*---------Switcher Colors---------*/
    /*---------------------------------*/
    function baseSwitcher() {
        $('body').attr('class', 'base-color-switcher');
    }

    function greenSwitcher() {
        $('body').attr('class', 'green-color-switcher');
    }

    function brownSwitcher() {
        $('body').attr('class', 'brown-color-switcher');
    }

    function lightSeaGreenSwitcher() {
        $('body').attr('class', 'lightSeaGreen-color-switcher');
    }

    function redSwitcher() {
        $('body').attr('class', 'red-color-switcher');
    }

    function cyanSwitcher() {
        $('body').attr('class', 'cyan-color-switcher');
    }

    function violetSwitcher() {
        $('body').attr('class', 'violet-color-switcher');
    }

    function limeSwitcher() {
        $('body').attr('class', 'lime-color-switcher');
    }

    function pinkSwitcher() {
        $('body').attr('class', 'pink-color-switcher');
    }

    function SaddleBrownSwitcher() {
        $('body').attr('class', 'SaddleBrown-color-switcher');
    }

    function NewOneSwitcher() {
        $('body').attr('class', 'new-one-color-switcher');
    }

    function NewTwoSwitcher() {
        $('body').attr('class', 'new-two-color-switcher');
    }

    $('.switcher-colors span.color-base').on('click', baseSwitcher);
    $('.switcher-colors span.color-one').on('click', greenSwitcher);
    $('.switcher-colors span.color-two').on('click', brownSwitcher);
    $('.switcher-colors span.color-three').on('click', lightSeaGreenSwitcher);
    $('.switcher-colors span.color-four').on('click', redSwitcher);
    $('.switcher-colors span.color-five').on('click', cyanSwitcher);
    $('.switcher-colors span.color-six').on('click', violetSwitcher);
    $('.switcher-colors span.color-seven').on('click', limeSwitcher);
    $('.switcher-colors span.color-eight').on('click', pinkSwitcher);
    $('.switcher-colors span.color-nine').on('click', SaddleBrownSwitcher);
    $('.switcher-colors span.color-ten').on('click', NewOneSwitcher);
    $('.switcher-colors span.color-eleven').on('click', NewTwoSwitcher);

    /*---------------------------------*/
    /*---------Blog Post PopUp---------*/
    /*---------------------------------*/
    $('.blog-overlay-content').magnificPopup({
        delegate: '.post-image-popup',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [1, 0] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        }
    });


})(jQuery);
