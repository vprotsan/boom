
var width = $('.white-bubble').width();
var height = $('.white-bubble').height();

var halfWidth = width / 2;
var halfHeight = height / 2;

        if ( width <= 450 ) {
          $('.white-bubble, .black-bubble').css("margin-left", - halfWidth);
        } else if ( width <= 150) {
          $('.white-bubble, .black-bubble').css("margin-left", "-75px");
        } else {
          $('.white-bubble, .black-bubble').css("margin-left","-225px");
        }

        if ( height <= 250 ) {
          $('.white-bubble, .black-bubble').css("margin-top", - halfHeight);
        } else {
          $('.white-bubble, .black-bubble').css("margin-top","-125px");
        }

  //positions text
  var widthText = $('.boom').width();
  var heightText = $('.boom').height();

  var halfHeightText = heightText / 2;
  var halfWidthText = widthText / 2;

  //HINT (parseInt("40px".replace(/px/,""))+60)+"px"
  var adjustedLeft = parseInt(halfWidthText + 40) + "px";
  var adjustedHeight = parseInt(halfHeightText - 20) + "px";

  $('.boom, .boom-shadow').css('left', adjustedLeft);
  $('.boom, .boom-shadow').css('top', adjustedHeight);

  //positions bubblewrap in center
  // var innerBubbleWidth = $('.bubble-wrap').innerWidth();
  // var innerBubbleHeight = $('.bubble-wrap').innerHeight();

  // var winHeight = $(window).height();
  // var winWidth = $(window).width();

  // var left = (winWidth - innerBubbleWidth) / 2;
  // var top =  (winHeight - innerBubbleHeight) / 2;

  // $('.bubble-wrap').css('top', top);
  // $('.bubble-wrap').css('left', left);


$(".boom, .boom-shadow").lettering();


