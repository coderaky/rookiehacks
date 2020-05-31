Init();

$('.pane,.scrzone').mousewheel(function(event) {
	event.preventDefault();
	if($ScrollState==false){$ScrollState=true;if(event.deltaY < 0){UpdateScreen('+');}else if(event.deltaY > 0){UpdateScreen('-');}else{$ScrollState=false;}}
});

//Init
function Init(){
	$ScrollSpeed = 0.3;
	$ScrollState=false;
	$ActualSlide = $CibleSlide = $('.pane').first().attr('data-id');
	$ListSlides = new Array(); $('.pane').each(function(){ $ListSlides.push($(this).attr('data-id')); });
	TweenMax.to(window, 0, {scrollTo:0});
	TweenMax.to('.spane', 0, {scrollTo:{y:0, x:0}});
	$('.visible').removeClass('visible');
	$('#Helper').html("Init()");
}

//ANIMATE
function UpdateScreen(operator){
	$ActualSlide = $CibleSlide;
	if(operator=="+"){ $CibleSlide = $ListSlides[$ListSlides.indexOf($ActualSlide)+1]; }else{ $CibleSlide = $ListSlides[$ListSlides.indexOf($ActualSlide)-1]; }
	$('#Helper').html("From <strong>"+$ActualSlide+"</strong> to <strong>"+$CibleSlide+"</strong>");
	if(!$CibleSlide){ $ScrollState=false; $('#Helper').html("Break");$CibleSlide = $ActualSlide; return; }
	$ActualSlideDOM = $('.pane[data-id='+$ActualSlide+']');
	$CibleSlideDOM = $('.pane[data-id='+$CibleSlide+']');

	if( $ActualSlideDOM.closest('.prt').find('.spane').length && (operator=="+" && $ActualSlideDOM.next('.pane').length  ||  operator=="-" && $ActualSlideDOM.prev('.pane').length ) ){
		TweenMax.to($ActualSlideDOM.closest('.spane'), $ScrollSpeed, {scrollTo:'.pane[data-id='+$CibleSlide+']',ease: Power2.easeOut,onComplete:function(){$ScrollState=false; $CibleSlideDOM.addClass('visible');}});
	}else{
		TweenMax.to(window, $ScrollSpeed, {scrollTo:'.pane[data-id='+$CibleSlide+']',ease: Power2.easeOut,onComplete:function(){$ScrollState=false; $CibleSlideDOM.addClass('visible');}});
	}
}


$(window).resize(function(){
	Init();
});