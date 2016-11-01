$(function () {

    if (Modernizr.history) {

        var newHash = "",
            $mainContent = $("#main_content"),
            $pageWrap = $("#page_wrap"),
            baseHeight = 0,
            $el;

        $pageWrap.height($pageWrap.height());
        baseHeight = $pageWrap.height() - $mainContent.height();

        function loadContent(href) {
            $mainContent
                .find("#page_content")
                .fadeOut(200, function () {
                    $mainContent.hide().load(href + " #page_content", function () {
                        $mainContent.fadeIn(200);
                        $("nav a").removeClass("current");
                        console.log(href);
                        $("a[href$=" + href + "]").addClass("current");
                    });
                });
        }

        $("nav").delegate("a", "click", function () {
            _link = $(this).attr("href");
            history.pushState(null, null, _link);
            loadContent(_link);
            return false;
        });


        $(window).bind('popstate', function () {
            _link = location.pathname.replace(/^.*[\\\/]/, ''); //get filename only
            loadContent(_link);
        });

    } // otherwise, history is not supported, so nothing fancy here.


});

