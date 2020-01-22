//Оптимизация загрузки изображений

	if ("loading" in HTMLImageElement.prototype) {
		var lazyImages = document.querySelectorAll("img.lazy, source.lazy");
		console.log(1);
		
		lazyImages.forEach(function(img) {
			if (img.tagName === 'IMG') {
				img.src = img.dataset.src;
				img.removeAttribute('data-src');
			}	else if (img.tagName === 'SOURCE') {
				img.srcset = img.dataset.srcset;
				img.removeAttribute('data-srcset');
			}
		});
	} else if ('IntersectionObserver' in window) {
		console.log(2);
		
		var observer = new IntersectionObserver(lazyLoad, {
			rootMargin: "200px",
			threshold: 0.0
		});

		var lazyImages = document.querySelectorAll('img.lazy, source.lazy');
		
		lazyImages.forEach(function(img) {
			observer.observe(img);
		});

		function lazyLoad(elements) {
			elements.forEach(function(image) {
				if (image.isIntersecting) {
					if (image.tagName === 'IMG') {
						image.target.src = image.target.dataset.src;
						image.target.removeAttribute('data-src');
					}	else if (image.tagName === 'SOURCE') {
						image.target.src = image.target.dataset.srcset;						
						image.target.removeAttribute('data-srcset');
					}
					observer.unobserve(image.target);
				};
			});
		};
	} else {
		console.log(3);
		
		var lazyImages = document.querySelectorAll('img.lazy, source.lazy');
		var img_array = Array.prototype.slice.call(lazyImages)
		
		img_array.forEach(function(image) {
			if (image.tagName === 'IMG') {
				image.src = image.dataset.src;
			}	else if (image.tagName === 'SOURCE') {
				image.srcset = image.dataset.srcset;
			}
		})
	}


$(document).ready(function(){
	
	// Модальные окна

		// Открываем модальное окно

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

			var modal = $('.modal'),
					container = $('.modal__container');

			$('.btn_open').on('click', function() {
				modalOpen();
			});

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

	// Табы в программе
	
		if ($(window).width() > 993) {

			$('.programm__item-nav').on('click', function() {
				var $this = $(this),
						target = $this.attr('data-target'),
						targetBlock = $('.programm__item-block'),
						targetItem = $('.programm__item-block[data-target-object='+target+']');

				$('.programm__item-nav').not($this).removeClass('active');
				$this.addClass('active');

				targetBlock.not(targetItem).removeClass('active').fadeOut(0);
				targetItem.fadeIn(0).addClass('active');
			});
		}



	// Оживляем слайдер программы 

		if ($(window).width() <= 992) {
			$('.programm__list-nav').slick({
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				focusOnSelect: true,
				asNavFor: '.programm__list-block',
				dots: true,
				dotsClass: 'slider__dots',
				appendDots: $('.programm__dots'),
				appendArrows: $('.programm__arrow'),
				prevArrow: '<button type="button" class="slider__button slider__button_prev"><svg><use xlink:href="#arrow"><line x1="1.25" y1="8.45" x2="25.63" y2="8.45"/></svg></button>',
				nextArrow: '<button type="button" class="slider__button slider__button_next"><svg><use xlink:href="#arrow"></svg></button>',
				customPaging : function(slider, i) {
					return '<button type="button">0'+(i+1)+'</button>';
				}
			});

			$('.programm__slider .slider__button').on('click', function() {
				$('.programm__item-block').removeClass('active');
			});

			$('.programm__list-block').slick({
				infinite: false,
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				adaptiveHeight: false,
				asNavFor: '.programm__list-nav',
				responsive: [
					{
						breakpoint: 480,
						settings: {
							adaptiveHeight: true
						}
					},
				]
			});
		}

	// Слайдер на главном экране
	
		if ($(window).width() <= 768) {

			$('.main__list').slick({
				infinite: true,
				slidesToShow: 1,
				centerPadding: '0px',
				slidesToScroll: 1,
				arrows: false,
				autoplay: true,
  			autoplaySpeed: 2000
			});
			

			$('.suit__list').slick({
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: true,
				dotsClass: 'slider__dots',
				appendDots: $('.suit__dots'),
				appendArrows: $('.suit__arrows'),
				prevArrow: '<button type="button" class="slider__button slider__button_prev"><svg><use xlink:href="#arrow"><line x1="1.25" y1="8.45" x2="25.63" y2="8.45"/></svg></button>',
				nextArrow: '<button type="button" class="slider__button slider__button_next"><svg><use xlink:href="#arrow"></svg></button>',
				customPaging : function(slider, i) {
					return '<button type="button">0'+(i+1)+'</button>';
				}
			});
			
			var item = $('.target__item'),
					list = $('.target__list'),
					buttons = $('<div class="target__buttons"><div class="target__dots"></div><div class="target__arrows slider__arrows"></div></div>');
			
			list.after(buttons);
			
			while (!item.length <=0) {
				
				var d = item.splice(0,4);
				var block = $('<div class="target__subblock"></div>');
				
				block.appendTo(list);
				
				for (var i=0; i < d.length; i++) {
					block.append(d[i]);
				}
			}
			
			$('.target__list').slick({
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: true,
				dotsClass: 'slider__dots',
				appendDots: $('.target__dots'),
				appendArrows: $('.target__arrows'),
				prevArrow: '<button type="button" class="slider__button slider__button_prev"><svg><use xlink:href="#arrow"><line x1="1.25" y1="8.45" x2="25.63" y2="8.45"/></svg></button>',
				nextArrow: '<button type="button" class="slider__button slider__button_next"><svg><use xlink:href="#arrow"></svg></button>',
				customPaging : function(slider, i) {
					return '<button type="button">0'+(i+1)+'</button>';
				}
			});

			var packetList = $('.packet__list'),
					packetButtons = $('<div class="packet__buttons"><div class="packet__dots"></div><div class="packet__arrows slider__arrows"></div></div>');
			
			packetList.after(packetButtons);

			$('.packet__list').slick({
				infinite: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: true,
				dots: true,
				dotsClass: 'slider__dots',
				appendDots: $('.packet__dots'),
				appendArrows: $('.packet__arrows'),
				prevArrow: '<button type="button" class="slider__button slider__button_prev"><svg><use xlink:href="#arrow"><line x1="1.25" y1="8.45" x2="25.63" y2="8.45"/></svg></button>',
				nextArrow: '<button type="button" class="slider__button slider__button_next"><svg><use xlink:href="#arrow"></svg></button>',
				customPaging : function(slider, i) {
					return '<button type="button">0'+(i+1)+'</button>';
				}
			});
		}

	// Слайдер с домашними заданиями

		$('.homework__slider').slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			dots: false,
			appendArrows: $('.homework__arrows'),
			prevArrow: '<button type="button" class="slider__button slider__button_prev"><svg><use xlink:href="#arrow"><line x1="1.25" y1="8.45" x2="25.63" y2="8.45"/></svg></button>',
			nextArrow: '<button type="button" class="slider__button slider__button_next"><svg><use xlink:href="#arrow"></svg></button>',
			responsive: [
				{
					breakpoint: 768,
					settings: {
						dots: true,
						dotsClass: 'slider__dots',
						appendDots: $('.homework__dots'),
						customPaging : function(slider, i) {
							if (i<9) {
								return '<button type="button">0'+(i+1)+'</button>';
							} else {
								return '<button type="button">'+(i+1)+'</button>';
							}					
						},
					}
				},
			]
		});

	// Слайдер с результатами участников

		$('.result__slider').slick({
			infinite: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: true,
			swipe: false,
			dots: true,
			adaptiveHeight: false,
			dotsClass: 'slider__dots',
			appendArrows: $('.result__arrows'),
			appendDots: $('.result__dots'),
			prevArrow: '<button type="button" class="slider__button slider__button_prev"><svg><use xlink:href="#arrow"><line x1="1.25" y1="8.45" x2="25.63" y2="8.45"/></svg></button>',
			nextArrow: '<button type="button" class="slider__button slider__button_next"><svg><use xlink:href="#arrow"></svg></button>',
			customPaging : function(slider, i) {
				if (i<9) {
					return '<button type="button">0'+(i+1)+'</button>';
				} else {
					return '<button type="button">'+(i+1)+'</button>';
				}					
			},
			responsive: [
				{
					breakpoint: 768,
					settings: {
						adaptiveHeight: true,
					}
				},
			]
		});

		
	//Ставим многоточие

		$('.slider__dots li, .slider__button').on('click', function(){
			$('.slider__dots li').removeClass('slider_active');
			$('.slider__dots .slick-active').prev().addClass('slider_active');
		});

		$('.slider__dots').on('afterChange', function(slick, currentSlide){			
			$('.slider__dots li').removeClass('slider_active');
			$('.slider__dots .slick-active').prev().addClass('slider_active');
		});

	// Табы в поле лучшая цена

		$('.benefit__nav-item').on('click', function() {
			var $this = $(this),
					nav = $('.benefit__nav-item'),
					target = $this.attr('data-target'),
					targetBlock = $('.benefit__block-total');

			nav.not($this).removeClass('active');
			$this.addClass('active');
			targetBlock.removeClass('active');
			$('.benefit__block-total[data-target="'+target+'"]').addClass('active');

		});

		$('.benefit__item').on('click', function() {
			var $this = $(this),
					discontText = $this.find('.benefit__discont').text().replace('-','').replace('%',''),
					discont = discontText=="бесплатно" ? "100" : discontText;

			if ($this.find('.benefit__label-input').is(':disabled')) {
				return false;
			}
			
			$('.benefit__block-total').each(function() {
				var	priceOld = parseInt($(this).find('.benefit__price-old').text().replace(' ','')),
						priceNew = priceOld - parseInt(priceOld / 100 * discont);

				// Добавляем пробелы после тысячных чисел
					function spacing(n) {
						n += "";
						n = new Array(4 - n.length % 3).join("U") + n;
						return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
					}
						

				$(this).find('.benefit__price-new').text(spacing(priceNew)+" ");

			});
			
			$('.benefit__item').not($this).removeClass('active');
			$this.addClass('active');
		
			
		});

	// Выпадающие списки

		var dropdownField = $('.dropdown__field'),
			dropdownItem = $('.dropdown__text');

		// Показываем/скрываем поля с выпадающим списком

			$('.dropdown').on('click', function (e) {
				var $this = $(this);

				if ($this.find(dropdownField).is(':visible')) {
					$this.find(dropdownField).slideUp(300);
				} else {
					$('.dropdown').find(dropdownField).slideUp(300);
					$this.find(dropdownField).slideDown(300);
				};
				$('.dropdown').not($this).removeClass('open');
				$this.toggleClass('open');
			});

		// Выбираем сортировку и подставляем ее наверх

			$('.dropdown__item').on('click', function () {
				var text = $(this).text();
				$(this).parents('.dropdown').find(dropdownItem).html(text);
			});

		// Если кликаем мышкой вне области выпадающего списка - закрываем их

			$(document).on('click', function (e) {
				var dropdown = $('.dropdown');

				if (!dropdown.is(e.target) && dropdown.has(e.target).length === 0) {
					dropdown.removeClass('open');
					dropdownField.slideUp(300);
				};
			});

		// Выбираем адрес и подставляем в верхнее поле

			$('.address__item').on('click', function () {
				var address = $(this).attr('data-address'),
					city = $(this).html();

				$('.address__place').html('<span class="address__place_city">'+ city+', ' +'</span><span class="address__place_street">' + address+'</span>');
			});

	// Скролл до нужной секции из верхнего меню или при нажатии на кнопку "принять участие"

		$('.toggle__link, .btn_scroll, .address__arrtop').on('click', function (e) {
			e.preventDefault();
			var link = $(this).attr('href') || $('#form');
			$('.toggle__check').prop('checked', false);
			$('html, body').animate({
				scrollTop: $(link).offset().top
			}, 1000);
		});

	// Реализуем прихоти дизайнеров

		resize();

		
	//Реализуем корректную обводку
	if ($(window).width() >= 768) {
		$('.target__text').each(function() {
			var width = $(this).find('span').width();
			$(this).width(width+10);
		});
	};
});

$(window).on('load',function() {

  $(".loader").delay(400).fadeOut("slow");

});

$(window).on('scroll',function(e) {

	var wScroll = $(window).scrollTop();
		
	var city = $('.main__slide_3'),
			mountain = $('.main__slide_2'),
			sun = $('.main__slide_1');

	slideY(city, -wScroll/7);
	slideY(mountain, -wScroll/7);
	slideY(sun, -wScroll/5);

	function slideY(block, strafeAmount) {
		var strafe = -strafeAmount + '%',
				transformString = 'translate3d(0,' + strafe + ',0)';
				
		block.css({
			'transform': transformString
		});
	};		

});

$(window).on('resize',function(e) {	

	resize();

});

function resize() {
	
	if ($(window).width() <= 992) {

		$('.speaker__block-img').after($('.speaker__block-comp'));
		
	} else if ($(window).width() <= 768) {

	} else {

		$('.speaker__list').after($('.speaker__block-comp'));

	}

}
