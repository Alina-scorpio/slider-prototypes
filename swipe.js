function SwipeCarousel() {
  Carousel.apply(this, arguments)
}

SwipeCarousel.prototype = Object.create(Carousel.prototype)
SwipeCarousel.prototype.constructor = SwipeCarousel

SwipeCarousel.prototype._initListeners = function() {
  Carousel.prototype._initListeners.apply(this)
  this.slidesContainer.addEventListener('touchstart', this.swipeStart.bind(this))
  this.slidesContainer.addEventListener('mousedown', this.swipeStart.bind(this))
  this.slidesContainer.addEventListener('touchend', this.swipeEnd.bind(this))
  this.slidesContainer.addEventListener('mouseup', this.swipeEnd.bind(this))
}

SwipeCarousel.prototype.swipeStart = function(e) {
  e.preventDefault()
  this.startPosX = e instanceof MouseEvent
    ? e.pageX // MouseEvent
    : e.changedTouches[0].pageX  // TouchEvent
}

SwipeCarousel.prototype.swipeEnd = function(e) {
  this.endPosX = e instanceof MouseEvent
    ? e.pageX // MouseEvent
    : e.changedTouches[0].pageX; // TouchEvent
  if (this.endPosX - this.startPosX > 100) this.prevHandler()
  if (this.endPosX - this.startPosX < -100) this.nextHandler()
}