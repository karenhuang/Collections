$(function() {

  $(".md-cheerleading .cheerleading").nextPage();
  if($(".anchor-finals").offset().top>$(".anchor-competition").offset().top){
    // 藍色在上面
    $('.nav-competition').addClass('active');
    $(window).scroll(function() {
      if($(this).scrollTop() >= ($(".anchor-competition").offset().top - $('nav').height()-10 )){
        $('.nav-competition').addClass('active').siblings().removeClass('active');
      }      
      if($(this).scrollTop() >= $(".anchor-finals").offset().top - $('nav').height()-10) {
        $('.nav-finals').addClass('active').siblings().removeClass('active');
      }
    });
  }else{
    // 紅色在上面
    $(".nav-finals").addClass('active');
    $(window).scroll(function() {
      if($(this).scrollTop() >= $(".anchor-finals").offset().top - $('nav').height()-10) {
        $('.nav-finals').addClass('active').siblings().removeClass('active');
      }
      if($(this).scrollTop() >= ($(".anchor-competition").offset().top - $('nav').height()-10 )){
        $('.nav-competition').addClass('active').siblings().removeClass('active');
      }
    });
  }
  
  function pageAnchor() {
    $(this).parents('li').addClass('active').siblings().removeClass('active');
    $('html, body').stop().animate({ scrollTop: $('body').find('.' + $(this).attr('data-anchor') + '').offset().top - $('nav').height() }, 500);
    if(window.innerWidth<1024){$("#menuBtn").click(); }
  }

  $('nav ul li').not('.nav-login').find('a').on('click', pageAnchor);
  function switchloginPop() {
    if (!$('.th-loginPop').hasClass('show')) { $('.th-loginPop').addClass('show');} else {$('.th-loginPop').removeClass('show');}
  }
  $('.nav-login').on('click', switchloginPop);
  $('.th-loginPop , .th-loginPop .pt-close').on('click', switchloginPop);
  $('.th-loginPop .md-loginPop').on('click', function(e) { e.stopPropagation(); });

  $('.th-finals .md-mask').on('click', function() { $(this).removeClass().addClass('md-mask'); });

  $('.th-competition .md-forecastList .row-head').on('click', function() {
    var parent = $(this).parents('.row');
    if (!parent.hasClass('preparation')) {
      parent.toggleClass('show').find('.row-cont').stop().slideToggle();
      parent.siblings().find('.row-cont').slideUp();
    }
  });


  $("#menuBtn").on("click",function () { 
    $('html').toggleClass('toggleMenu');
    $('nav ul').stop().slideToggle();
  });

  $(window).on('resize',function(){
    if(window.innerWidth>1024){
      $('nav ul').attr('style','');
      $('html').removeClass('toggleMenu');
    }
  });
});

$(window).load(function() {
  $('.md-cheerleading').cheerleadingSliderShow();
});