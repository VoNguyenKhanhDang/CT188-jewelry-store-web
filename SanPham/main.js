 $(".options__list li, .sort__list li").click(function() {
     $(this).parent().prev().find("span").text($(this).text());
    });