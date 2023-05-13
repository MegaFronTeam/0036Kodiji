"use strict";
const JSCCommon = { 
	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				CLOSE: "Закрыть",
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				MODAL: "Вы можете закрыть это модальное окно с помощью клавиши ESC.",
				ERROR: "Что-то пошло не так. Пожалуйста, повторите попытку позже",
				IMAGE_ERROR: "Изображение не найдено",
				ELEMENT_NOT_FOUND: "HTML-элемент не найден",
				AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: не найдено",
				AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: запрещено",
				IFRAME_ERROR: "Ошибка загрузки iframe",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el=>{
			el.addEventListener("click", ()=>{
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if(!element) return;
			let modal = document.querySelector("#" + element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// /modalCall
	toggleMenu() {
    const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
    const menu = document.querySelector('.menu-mobile--js');
    toggle.forEach((el) => el.classList.toggle('on'));
    menu.classList.toggle('active');
    [document.body, document.querySelector('html')].forEach((el) => el.classList.toggle('fixed'));
  },
  closeMenu() {
    const toggle = document.querySelectorAll('.toggle-menu-mobile--js');
    const menu = document.querySelector('.menu-mobile--js');
    toggle.forEach((element) => element.classList.remove('on'));
    if (menu) {
      menu.classList.remove('active');
      [document.body, document.querySelector('html')].forEach((el) => el.classList.remove('fixed'));
    }
  },
  mobileMenu() {
    document.addEventListener('click', (event) => {
        let container = event.target.closest('.menu-mobile--js'); // (1)
        let toggle = event.target.closest('.toggle-menu-mobile--js'); // (1)
        if (toggle) this.toggleMenu();
        if (!container && !toggle) this.closeMenu();
      },
      { passive: true },
    );

    window.addEventListener('resize', () => {
        if (window.matchMedia('(min-width: 992px)').matches) this.closeMenu();
      },
      { passive: true },
    );
  },

	// tabs  .
	tabscostume(tab) {
		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask({"mask":"+9(999)999-99-99", showMaskOnHover: false}).mask(InputTel);
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active")
			});
		})

		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	},
	makeDDGroup() {
		$('.dd-head-js').on('click', function () {
      let clickedHead = this;
      $(this).parent().toggleClass('active');
      $(this)
        .next()
        .slideToggle(function () {
          $(this).toggleClass('active');
        });
    });
	},
	imgToSVG() {
    const convertImages = (query, callback) => {
			const images = document.querySelectorAll(query);
	
			images.forEach(image => {
				fetch(image.src)
					.then(res => res.text())
					.then(data => {
						const parser = new DOMParser();
						const svg = parser.parseFromString(data, 'image/svg+xml').querySelector('svg');
	
						if (image.id) svg.id = image.id;
						if (image.className) svg.classList = image.classList;
	
						image.parentNode.replaceChild(svg, image);
					})
					.then(callback)
					.catch(error => console.error(error))
			});
		};
	
		convertImages('.img-svg-js');
  },
	disabledBtn(input = '.form-wrap__policy input', btn = ".form-wrap__btn", parent = ".form-wrap"){
		$(document).on("change", input, function () {
			let btnDisabled = $(this).parents(parent).find(btn)
			if (this.checked) {
				btnDisabled.removeAttr('disabled');
			}
			else {
				btnDisabled.attr('disabled', 'disabled');
			}
		})
	}
};
const $ = jQuery;

function eventHandler() { 
	JSCCommon.modalCall();
	// JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	JSCCommon.inputMask();
	JSCCommon.heightwindow();
	JSCCommon.makeDDGroup();
	JSCCommon.disabledBtn();
	// JSCCommon.imgToSVG();
	// JSCCommon.toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	// JSCCommon.animateScroll();
	
	// JSCCommon.CustomInputFile();
	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();
	}

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();
	// modal window
	document.addEventListener('click', function (e) {
		let chooseLangTarget = e.target.closest('.chooseLang--js');
		let chooseLang = document.querySelector('.chooseLang--js');
		let chooseLangBtns = chooseLang.querySelectorAll('.chooseLang__btn span');
		let chooseLangDropdowns = chooseLang.querySelectorAll('.chooseLang__dropdown span');
		if (chooseLangTarget) {
			chooseLang.classList.toggle('active');
			for (let i = 0; i < chooseLangDropdowns.length; i++) {
        chooseLangDropdowns[i].addEventListener('click', function () {
          for (let j = 0; j < chooseLangDropdowns.length; j++) {
						chooseLangDropdowns[j].classList.remove('active');
						chooseLangBtns[j].classList.remove('active');
					}
					chooseLangDropdowns[i].classList.add('active');
					chooseLangBtns[i].classList.add('active');
        })
      }
		} else {
			chooseLang.classList.remove('active');
		}
	})
};
if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }