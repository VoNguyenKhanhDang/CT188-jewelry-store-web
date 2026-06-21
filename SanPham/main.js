 $(".options__list li, .sort__list li").click(function() {
     $(this).parent().prev().find("span").text($(this).text());
    });


   
     $(document).ready(function() {
        const temp = new URLSearchParams(window.location.search);
        const temp1 = temp.get("id");
        const temp2 = list[temp1];

        if(temp2) {
            $(".h2-name").text(temp2.name);
            $(".img-1").attr("src",temp2.img1);
            $(".img-2").attr("src", temp2.img2);
            $(".des-img.img1").attr("src",temp2.img1);
             $(".des-img.img2").attr("src",temp2.img2);
             $(".price").text(temp2.price);
             $("items-name").text(temp2.gt);
        }
     })
   