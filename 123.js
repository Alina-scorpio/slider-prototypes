SwipeCarousel.prototype._initListeners = function() {
  Carousel.prototype._initListeners.apply(this);
  this.slidesContainer.addEventListener('touchstart', this.swipeStart.bind(this));
  this.slidesContainer.addEventListener('mousedown', this.swipeStart.bind(this));
  this.slidesContainer.addEventListener('touchend', this.swipeEnd.bind(this));
  this.slidesContainer.addEventListener('mouseup', this.swipeEnd.bind(this));
  this.slidesContainer.addEventListener('touchmove', this.swipeMove.bind(this)); // для предотвращения скроллинга при свайпе
  this.slidesContainer.addEventListener('mousemove', this.swipeMove.bind(this)); // для предотвращения выделения текста при свайпе
}

SwipeCarousel.prototype.swipeStart = function(e) {
  this.isSwiping = true;
  this.startPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
}

SwipeCarousel.prototype.swipeMove = function(e) {
  if (this.isSwiping) e.preventDefault(); // предотвращает скроллинг/выделение при свайпе
}

SwipeCarousel.prototype.swipeEnd = function(e) {
  if (!this.isSwiping) return;
  this.isSwiping = false;
  this.endPosX = e instanceof MouseEvent ? e.pageX : e.changedTouches[0].pageX;
  if (this.endPosX - this.startPosX > 100) this.prevHandler();
  if (this.endPosX - this.startPosX < -100) this.nextHandler();
}
