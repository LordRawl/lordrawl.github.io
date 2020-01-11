$(document).ready(function() {

  // Модальные окна

		// Открываем модальное окно

    var modal = $('.modal'),
        container = $('.modal__container');
        
    function modalOpen() {
      $('body').css('overflow', 'hidden');
      modal.fadeIn(300);
      container.addClass('active');
    }

    function modalClose() {
      container.removeClass('active');
      modal.fadeOut(300);
      $('body').css('overflow', 'auto');
    }

  // setTimeout(function() {
  //   modalOpen()
  // }, 300);

  // Закрываем модальное окно при клике вне контейнера

    modal.on('click',function(e) {
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        modalClose();
      }
    });

  // ... и по крестику

    $('.modal__close').on('click', function() {
      modalClose();
    });



	sliders();

	var endTimer = $(".eTimer-packets").attr('data-end-timer');

	$(".eTimer-packets").eTimer({
    etType: 0,
    etDate: endTimer,
    etTitleText: "",
    etTitleSize: 10,
    etShowSign: 0,
    etSep: " ",
    etFontFamily: "Muller",
    etTextColor: "#adadad",
    etPaddingTB: 0,
    etPaddingLR: 0,
    etBackground: "transparent",
    etBorderSize: 0,
    etBorderRadius: 0,
    etBorderColor: "white",
    etShadow: " 0px 0px 0px 0px #333333",
    etLastUnit: 3,
    etNumberFontFamily: "Muller",
    etNumberSize: 36,
    etNumberColor: "#fc647b",
    etNumberPaddingTB: 4,
    etNumberPaddingLR: 8,
    etNumberBackground: "#fbdcec",
    etNumberBorderSize: 0,
    etNumberBorderRadius: 5,
    etNumberBorderColor: "white",
    etNumberShadow: "inset 0px 0px 0px 0px rgba(0, 0, 0, 0.5)"
  });
  
	var endTimerModal = $(".eTimer-modal").attr('data-end-timer');

	$(".eTimer-modal").eTimer({
    etType: 0,
    etDate: endTimerModal,
    etTitleText: "",
    etTitleSize: 10,
    etShowSign: 1,
    etSep: " ",
    etFontFamily: "Muller",
    etTextColor: "#adadad",
    etPaddingTB: 0,
    etPaddingLR: 0,
    etBackground: "transparent",
    etBorderSize: 0,
    etBorderRadius: 0,
    etBorderColor: "white",
    etShadow: " 0px 0px 0px 0px #333333",
    etLastUnit: 4,
    etNumberFontFamily: "Muller",
    etNumberSize: 36,
    etNumberColor: "#fc647b",
    etNumberPaddingTB: 4,
    etNumberPaddingLR: 8,
    etNumberBackground: "#fbdcec",
    etNumberBorderSize: 0,
    etNumberBorderRadius: 5,
    etNumberBorderColor: "white",
    etNumberShadow: "inset 0px 0px 0px 0px rgba(0, 0, 0, 0.5)"
	});
	
	var fade = $('.fade, .fade-top, .fade-left, .fade-bottom, .fade-right, .fade-scale');
	
	if ($(window).width() <= 1200) {
		$(fade).removeClass('fade fade-top fade-bottom fade-left fade-right fade-scale animate');
	}

	if ($(window).width() <= 1000) {
		$('.who__title').after($('.who__block_com'));
	} else {
		$('.who__block_com').appendTo('.who');
	}

	resizes();

	$('.js-scroll').on('click', function(e) {
		e.preventDefault();
		var link = $('#who');
		$('html, body').animate({
			scrollTop: $(link).offset().top - 50
		}, 1000);
  });

  anim();
  var like = false;

  $('.like__block').on('click', function() {
    var count = $(this).find('.like__counter'),
      countNumb = parseInt(count.text()),
      parent = $(this).closest('.like__item');

    if (like) return;
    like = true;

    if (parent.hasClass('scale')) {
      parent.removeClass('scale');
      countNumb -= 1;
      count.text(countNumb);
    } else {
      soat(event);
      parent.addClass('scale');
      countNumb += 1;
      count.text(countNumb);
    }
    setTimeout(function() {
      like = false;
    }, 500)
  });
});

$(window).on('scroll', function() {
	if ($(window).width() >= 1001) {
		fixed();
	}
  anim();

  scrollImage('.about__img')
});

$(window).on('resize', function() {
	sliders();
	resizes();
});

function anim() {
  var fade = $('.fade, .fade-top, .fade-left, .fade-bottom, .fade-right, .fade-scale');
	
	if ($(window).width() >= 1200) {
		fade.each(function() {
			var $this = $(this);
			if ($(window).scrollTop() + $(window).height() >= $this.offset().top) {
				$this.addClass('animate');
			}
		});
	}
}


$(document).on('mousemove', function() {
	if ($(window).width() >= 1201) {
		parallax(event);
	}
});


function parallax(event) {
  var X = event.clientX,
    Y = event.clientY,
    firstScreenWidth = $('.main-s').width(),
    firstScreenHeight = $('.main-s').height(),
    centerX = firstScreenWidth / 2,
    centerY = firstScreenHeight / 2,
    mouseX = centerX - X,
    mouseY = centerY - Y;

  $('.main__img').each(function(i) {
    var $this = $(this);

    $this.css('transform', 'translate3d(' + (mouseX * 0.008 * (i + 1)).toFixed(1) + 'px, ' + (mouseY * 0.008 * (i + 1)).toFixed(1) + 'px, 0)')
  });

  $('.main__subblock').each(function(i) {
    var $this = $(this);

    $this.css('transform', 'translate3d(' + (mouseX * 0.008 * (i + 1)).toFixed(1) + 'px, ' + (mouseY * 0.008 * (i + 1)).toFixed(1) + 'px, 0)')
  });
}

function fixed() {
  var block = $('.knows-s'),
    sizeBlock = $('.js-knows__block'),
    scroll = $(window).scrollTop() + $(window).height() / 2,
    blockScroll = block.offset().top + block.height() / 2;

  if (scroll >= blockScroll + 250) {
    sizeBlock.addClass('zip');
  } else {
    sizeBlock.removeClass('zip');
  }
}

function soat(event) {
  var soat = $('<div class="soat__list"><svg class="soat__item"><use xlink:href="img/icons.svg#like"></use></svg><svg class="soat__item"><use xlink:href="img/icons.svg#like"></use></svg><svg class="soat__item"><use xlink:href="img/icons.svg#like"></use></svg></div>'),
    mouseX = event.pageX,
    mouseY = event.pageY;

  soat.appendTo('body');
  soat.css({
    'top': mouseY,
    'left': mouseX,
  })

  setTimeout(function() {
    soat.remove();
  }, 2000)
}

function scrollImage(target) {
  $(target).each(function() {
    var image = $(this),
      scroll = $(window).scrollTop(),
      imageScroll = image.offset().top,
      diff = ((imageScroll - scroll - 100) / 8).toFixed(0);

    image.css('transform', 'translate3d(0, ' + diff + 'px, 0)');
  });

}

function sliders() {
	if ($(window).width() <= 1000) {
		$('.users__list').slick({
			arrows: false,
			infinite: false,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true,
			slidesToScroll: 1,
			centerPadding: '20px'
		});
		$('.about__list').slick({
			arrows: false,
			infinite: false,
			slidesToShow: 1,
			variableWidth: true,
			slidesToScroll: 1,
			centerPadding: '20px'
		});
		$('.about__sublist').slick({
			arrows: false,
			infinite: false,
			slidesToShow: 1,
			variableWidth: true,
			slidesToScroll: 1,
			centerPadding: '20px'
		});
	} else {
		$('.users__list').filter('.slick-initialized').slick('unslick');
		$('.about__list').filter('.slick-initialized').slick('unslick');
		$('.about__sublist').filter('.slick-initialized').slick('unslick');
	}
	
}

function resizes() {
	if ($(window).width() <= 1000) {
		$('.who__title').after($('.who__block_com'));
		$('.packets-aside').appendTo('.packets__list');
	} else {
		$('.who__block_com').appendTo('.who');
		$('.packets__form').before($('.packets-aside'));
	}
}
