var slider = $(".slides"), // cache the slider object for later use
    item_width = slider.parent().outerWidth(), // get the width of the container for later use
    timer = null; // will reference our autoplay() timer

// Adjust the slider when/if the window gets resized
$(window).on("resize", adjust);
adjust();
var currentR = 0
// We have more than one slide,
// let's add the pagination buttons
if (slider.children("li").length > 1) {
    for (var i = 0; i < slider.children("li").length; i++) {
        $("#sliderControlContainer").append("<input style=\"margin:10px 10px\"type=\"radio\" class=\"sliderController\" name=\"sliderControl\" value=\"" + i + "\">")
    }
    $("input[name=sliderControl][value=" + currentR + "]").prop('checked', true);

    // Add previous/next buttons
    slider.parent().append("<a href=\"#\" id=\"btn-prev\"><img src=\"./images/previous.png\" width=\"64\" class=\"fa fa-angle-left\"></img><span>Previous</span></a><a href=\"#\" id=\"btn-next\"><img src=\"./images/next-button.png\" width=\"64\" class=\"fa fa-angle-right\"></img><span>Next</span></a>");

    // Handle clicks on the next button
    $("#btn-prev").on("click", function (e) {
        e.preventDefault();
        currentR--;
        if (currentR == -1) currentR = slider.children("li").length - 1
        $("input[name=sliderControl][value=" + currentR + "]").prop('checked', true);

        slider.children("li:last").prependTo(slider);
        slider.css("left", -item_width);

        slider.animate({
            left: 0
        }, 300, "swing");
    });

    // Handle clicks on the previous button
    $("#btn-next").on("click", function (e) {
        e.preventDefault();
        (currentR < slider.children("li").length - 1) ? currentR++ : currentR = 0;
        $("input[name=sliderControl][value=" + currentR + "]").prop('checked', true);

        slider.animate({
            left: -item_width
        }, 300, "swing", function () {
            slider.children("li:first").appendTo(slider);
            slider.css("left", 0);
        });
    });
}

// Autoplay
autoplay();

// Pause/resume autoplay on hover in/out
$("#btn-next").hover(function () {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}, function () {
    autoplay();
});

$("#btn-prev").hover(function () {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}, function () {
    autoplay();
});

// Helpers
function autoplay() {
    if ($("#btn-next").length) {
        timer = setInterval(function () {
            $("#btn-next").trigger("click");

        }, 3500);
    }
}

function adjust() {
    item_width = slider.parent().outerWidth();
    slider.children("li").width(item_width).parent().width(item_width * slider.children("li").length);
}

