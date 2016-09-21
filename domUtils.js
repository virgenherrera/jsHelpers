/*General functions for use in styling*/

function getScrollTop() {
	var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	return scrollTop;
}

function docHeight() {
    return Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
}

function docWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
    );
}

function isTouch() {
	return ( ('ontouchstart' in window ) || ( navigator.MaxTouchPoints > 0 ) || (navigator.msMaxTouchPoints > 0));
}

function checkMobile(){
	return ( ( getDocWidth() <= 767 ) || !isTouchDevice ) ? true : false;
}