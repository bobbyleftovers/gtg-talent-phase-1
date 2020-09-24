(function ($) {
    $(document).ready(function () {
        var slider = $('.fl-node-<?php echo $id; ?> .slider__slides').bxSlider({
            autoStart: true,
            slideMargin: 30,
            slideWidth: 3200,
            minSlides: $(window).width() > 992 ? 3 : 1,
            maxSlides: $(window).width() > 992 ? 3 : 1,
            moveSlides: $(window).width() > 992 ? 3 : 1,
            pager: true, // dots
            controls: false, //arrows
            autoHover: true
        });

        $(window).resize(function(){
            slider.reloadSlider({
                autoStart: true,
                slideMargin: 30,
                slideWidth: 3200,
                minSlides: $(window).width() > 992 ? 3 : 1,
                maxSlides: $(window).width() > 992 ? 3 : 1,
                moveSlides: $(window).width() > 992 ? 3 : 1,
                pager: true, // dots
                controls: false, //arrows
                autoHover: true
            })
        })

    });
})(jQuery);
