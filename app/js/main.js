$(function() {

    // open/close nav
    document.querySelector('.top-line__hamburger').addEventListener('click', function() {
        this.classList.toggle('is-active');
        document.querySelector('.nav-mobile').classList.toggle('js-nav-mobile-push');	
        document.querySelector('main').body.classList.toggle('js-body-push');		
    }, false);

    

    // nav size after scroll
    window.addEventListener('scroll', function() {
	    var topLine = document.querySelector('.top-line'),
	    	body = document.body;

	    if (window.pageYOffset >= 120) {
	    	topLine.classList.add('js-top-line-scroll');
	    	body.classList.add('js-body-scroll');	
	    } else {
	    	topLine.classList.remove('js-top-line-scroll');
	    	body.classList.remove('js-body-scroll');	
	    }
    }, false);



    // nav after resize
    window.addEventListener('resize', function() {
	    var body = document.body;
	    if (window.matchMedia("(min-width:991px)").matches && body.classList.contains("js-body-push")) {
	    	document.querySelector('.hamburger').classList.remove('is-active');
	    	document.querySelector('.nav-mobile').classList.remove('js-nav-mobile-push');
		    body.classList.remove('js-body-push'); 
		}
    }, false);



    // button of block 'master' animate
    (function () {
	    var pageYOffset = window.pageYOffset,
	    	masters = document.querySelector('.flexwrap .all-masters__slider'),
	    	masterBtn;
    	
    	if (masters) {
		    window.addEventListener('scroll', function() {
			    masterBtn = masters.querySelector('.master__btn');
			    masterBtn.style.opacity = 0;

			    if ( (pageYOffset + window.innerHeight) > (masters.getBoundingClientRect().bottom + pageYOffset) ) {
			    	masterBtn.classList.add('bounceInLeft');
			    	masterBtn.style.opacity = 1;
			    }
		    }, false);
    	}
    })();


    
    // section background parallax
    $('.parallax').parallax();



    // lightGallery init
	$(".work__gallery").lightGallery({
		mode: 'lg-tube',
	 	hideBarsDelay: 2000
	});

	$(".master__work-gallery").lightGallery({
		mode: 'lg-tube',
	 	hideBarsDelay: 2000
	});

	$(".review__work-gallery").lightGallery({
		mode: 'lg-tube',
	 	hideBarsDelay: 2000
	});

	$(".office-gallery").lightGallery({
		mode: 'lg-scale-up',
	 	hideBarsDelay: 2000
	});

	$(".master__diploms-content").lightGallery({
		mode: 'lg-lollipop-rev',
	 	hideBarsDelay: 2000
	});



	 // slick init
  	$('.all-masters__slider').slick({
	  	// slidesToShow: 4,
	  	draggable: false,
	  	prevArrow: '<span class="slick-prev"></span>',
	  	nextArrow: '<span class="slick-next"></span>',
	  	adaptiveHeight: true,
	  	fade: true,
	  	speed: 500
  	});



  	// modal init
	$('#modal-submit').modal({
		opacity: .8,
		endingTop: '30%'
	});

	$('.modal-submit__close').on('click', function() {
		$('#modal-submit').modal('close');
	}); 	

});
