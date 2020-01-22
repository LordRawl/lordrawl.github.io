var request = new XMLHttpRequest();

request.open('GET', 'img/svg.html', true);

request.onload = function() {

	if (request.status >= 200 && request.status < 400) {
		var node = document.createElement('div');

		node.classList.add('svg');

		node.innerHTML = request.responseText;

		document.body.insertBefore(node, document.body.lastChild);

		localStorage.setItem('inlineSVGdata', request.responseText);
	}
};

request.send();