window.$ = window.jQuery = require("jquery"); // Hace jQuery accesible públicamente
$(function() {
    $('a[href*="#"]').click(function() {
        $(document).off("scroll");
        $('a[href*="#"]').parent().removeClass("active");
  
        var target = $(this.hash);
        target = target.length ? target : $('header');
        if (target.length) {
          $(this).parent().addClass("active");
          return false;
        }
    });
  });



$('.target').click(function() {
    console.log($('.target'))
    $('.result-1').html(function(i, val) { return val*1+1});
    $('.result-2').html(function(i, val) { return val*1+1});
    })


    
        
       
                      
   

  
