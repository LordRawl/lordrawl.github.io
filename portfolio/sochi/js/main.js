$(document).ready(function () {

	anim();

	// Модальные окна

	// Открываем модальное окно

	function modalOpen() {
		$('body').css('overflow', 'hidden');
		container.addClass('active');
	}

	function modalClose() {
		container.removeClass('active');
		modal.fadeOut(300);
		$('body').css('overflow', 'auto');
	}

	var modal = $('.modal'),
			modalForm = $('.modal_form'),
			modalPict = $('.modal_pict'),
			container = $('.modal__container');

	// Закрываем модальное окно при клике вне контейнера

	modal.on('click', function (e) {
		if (!container.is(e.target) && container.has(e.target).length === 0) {
			modalClose();
		}
	});

	// ... и по крестику

	$('.modal__close').on('click', function () {
		modalClose();
	});

	$('.photo__item').on('click', function () {
		var img = $(this).find('.photo__pict'),
			clone = img.clone();
		$('.modal__body').html(clone);
		modalOpen();
		modalPict.fadeIn(300);
	});

	$('.video__item').on('click', function () {
		if ($(this)[0].paused) {
			$(this)[0].play();
			$(this).parent('.video').removeClass('pause').addClass('play');
		} else {
			$(this)[0].pause();
			$(this).parent('.video').removeClass('play').addClass('pause');
			setTimeout(function () {
				$('.video').removeClass('pause');
			}, 1000);
		}
	});

	$('.navbar__link, .main__btn').not('.navbar__link_tel').on('click', function () {
		var link = $(this).attr('href');

		$('html, body').animate({
			scrollTop: $(link).offset().top
		}, {
			duration: 1000
		});
		return false;
	});

	$('.packet__btn').on('click', function () {

		$('html, body').animate({
			scrollTop: $('#lead').offset().top
		}, {
			duration: 700
		});
		return false;
	});

	setTimeout(function(){
		modalOpen();
		modalForm.fadeIn(300);
	}, 8000);

	$('.speakers__list').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		fade: true,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slider-button_prev slider-button"><svg class="slider-button__icon slider-button__icon_prev"><use xlink:href="#arrow"></svg></button>',
		nextArrow: '<button type="button" class="slider-button_next slider-button"><svg class="slider-button__icon slider-button__icon_next"><use xlink:href="#arrow"></svg></button>',
	});
	
	$('.hotel__list').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		fade: true,
		dots: true,
		dotsClass: 'slider-dots',
	});

});

$(window).on('load', function () {

	$(".loader").delay(400).fadeOut("slow");

});

$(window).scroll(function () {
	anim();
});

function anim() {
	var fade = $('.fade, .fade-left, .fade-bottom, .fade-right, .roll');
	var section = $('section, header');

	section.each(function () {
		var $this = $(this);
		if ($(window).scrollTop() >= $this.offset().top - 700) {
			$this.closest(fade).addClass('animate')
			$this.find(fade).addClass('animate');
		}
	});

	if ($(window).width() <= 768) {
		$(fade).removeClass('fade fade-bottom fade-left fade-right roll animate')
	}

}