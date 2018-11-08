
var myModule = (function() {

	var yOffset;

	function toggleNotExistClass(class1, class2, j = 0) {
		var elem = document.getElementsByClassName(class1)[j];
		if (!elem.classList.contains(class2)) {
			elem.classList.toggle(class2);
		}
	}
	
	function toggleExistClass(class1, class2, j = 0) {
		var elem = document.getElementsByClassName(class1)[j];
		if (elem.classList.contains(class2)) {
			elem.classList.toggle(class2);
		}
	}

	// задаём для body свойства

	function addBodyProperties() {
		var body = document.body;
		yOffset = window.pageYOffset;
		body.style.width = '100%';
		body.style.top = '-' + yOffset + 'px';
		body.style.position = 'fixed';
		body.style.overflowY = 'scroll';
	}

	// удаляем свойства у body

	function removeBodyProperties() {
		var body = document.body;
		body.style.width = null;
		body.style.top = null;
		body.style.position = null;
		body.style.overflowY = null;
		window.scrollTo(0, yOffset);
	}

	function hidePopup() {
		// Скрываем модальное окно
		toggleNotExistClass('js-modal', 'hidden');
		// Возвращаем возможность скроллить body
		removeBodyProperties()
	}

	function hidePopupEscapeEvent(event) {
		if ( event.keyCode == 27 ) {
			hidePopup();
			window.removeEventListener('keydown', hidePopupEscapeEvent);
		}
	}
	
	function hidePopupClickAreaEvent(event) {
		var modal = document.getElementsByClassName('o-modal')[0];
		if (event.target == modal) {
			hidePopup();
			// удаляем обработчик событий
			window.removeEventListener('click', hidePopupClickAreaEvent);
		}
	}

	function showPopupEvent() {
		var button = document.getElementsByClassName('js-app__button')[0];
		button.addEventListener('click', function() {
			// Показываем модальное окно
			toggleExistClass('js-modal', 'hidden');
			// Убираем возможность скроллить body
			// Делаем страничку статичной
			addBodyProperties();
			// ОБработчик события, по клику вне Popup происходит закрытие Popup
			window.addEventListener('click', hidePopupClickAreaEvent);
			// Обработчик событий, при нажатии на Esc происходит закрытие Popup
			window.addEventListener('keydown', hidePopupEscapeEvent);
		})
	}

	return {
		showPopupEvent: showPopupEvent,
	}
})();

myModule.showPopupEvent();
