var toad = document.querySelector('.toad');
var toadText = document.querySelector('.toad-text');
var safari = false;
var spaceWidth = document.documentElement.clientWidth;
var spaceHeight = document.documentElement.clientHeight;
if (navigator.userAgent.indexOf('Safari') !== -1 && navigator.userAgent.indexOf('Chrome') === -1 && navigator.userAgent.indexOf('Mobile') === -1) {
	safari = true;
}
var walkingToad = false;
var toadHomeRight = '30px';
var toadHomeBottom = '40px';
var toadLocation = toad.getBoundingClientRect();
var toadWidth = toadLocation.width;
var toadHeight = toadLocation.height;
var ratioX = toadLocation.right / spaceWidth;
var ratioY = toadLocation.bottom / spaceHeight;
var freeJumpsCount;

var dragToad = function (ev) {
	var toadCoords = toad.getBoundingClientRect();
	var shiftX = toadCoords.right - ev.clientX;
	var shiftY = toadCoords.bottom - ev.clientY;
	
	document.onmousemove = function (e) {
		toadMove(e.clientX, e.clientY, shiftX, shiftY);
	};

	document.onmouseup = function () {
		document.onmousemove = null;
		keepNewLocation();
		document.onmouseup = null;
	};
	return false;
};

/*
 var touchToad = function (ev) {
	if (ev.touches.length !== 1) {
		return;
	}
	var toadCoords = toad.getBoundingClientRect();
	var shiftX = toadCoords.right - ev.touches[0].clientX;
	var shiftY = toadCoords.bottom - ev.touches[0].clientY;

	toad.ontouchmove = function (e) {
		toadMove(e.touches[0].clientX, e.touches[0].clientY, shiftX, shiftY);
	};

	toad.ontouchend = function () {
		toad.ontouchmove = null;
		keepNewLocation();
		toad.ontouchend = null;
	};
	return false;
};
*/

function toadMove(X, Y, shiftX, shiftY) {
	var newX = spaceWidth - X - shiftX;
	if (newX < 0) {
		newX = 0;
	} else if (newX > spaceWidth - toadWidth) {
		newX = spaceWidth - toadWidth;
	}
	var newY = spaceHeight - Y - shiftY;
	if (newY < 0) {
		newY = 0;
	} else if (newY > spaceHeight - toadHeight) {
		newY = spaceHeight - toadHeight;
	}
	toad.style.right = newX + 'px';
	toad.style.bottom = newY + 'px';
}

function keepNewLocation() {
	toadLocation = toad.getBoundingClientRect();
	ratioX = toadLocation.right / spaceWidth;
	ratioY = toadLocation.bottom / spaceHeight;
}

function jumpAnywhere() {
	ratioX = Math.random();
	ratioY = Math.random();
	toadLocRecalc();
	freeJumpsCount--;
}

function goHome() {
	toad.style.right = toadHomeRight;
	toad.style.bottom = toadHomeBottom;
	toadLocation = toad.getBoundingClientRect();
	ratioX = toadLocation.right / spaceWidth;
	ratioY = toadLocation.bottom / spaceHeight;
}

toad.addEventListener('dblclick', function (event) {
	event.preventDefault();
	if (walkingToad) {
		if (freeJumpsCount > 0) {
			jumpAnywhere();
		} else {
			walkingToad = false;
			goHome();
			toad.onmousedown = null;
			// - toad.ontouchstart = null;
			toadText.classList.remove('toad-text--hide');
		}
	}
	else {
		walkingToad = true;
		freeJumpsCount = 5;
		toad.onmousedown = dragToad;
		// - toad.ontouchstart = touchToad;
		toadText.classList.add('toad-text--hide');
		jumpAnywhere();
	}
});

function toadLocRecalc() {
	var newX = spaceWidth - ratioX * spaceWidth;
	var newY = spaceHeight - ratioY * spaceHeight;
	if (newX < 0) {
		newX = 0;
	} else if (newX > spaceWidth - toadWidth) {
		newX = spaceWidth - toadWidth;
	}
	if (newY < 0) {
		newY = 0;
	} else if (newY > spaceHeight - toadHeight) {
		newY = spaceHeight - toadHeight;
	}
	toad.style.right = newX + 'px';
	toad.style.bottom = newY + 'px';
	toadLocation = toad.getBoundingClientRect();
}

function relocateToad() {
	spaceWidth = document.documentElement.clientWidth;
	spaceHeight = document.documentElement.clientHeight;
	if (walkingToad) {
		toadLocRecalc();
	} else {
		toadLocation = toad.getBoundingClientRect();
	}
}

if (safari) {
	var resizeTimer;
	window.addEventListener('resize', function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(relocateToad, 2);
	});
} else {
	window.addEventListener('resize', function () {
		relocateToad();
	});
}

toad.ondragstart = function () {
	return false;
};
