function Carousel() {
  this.container = document.querySelector('#carousel');
  this.slidesContainer = this.container.querySelector('#slides-container');
  this.indicatorsContainer = this.container.querySelector('#indicators-container');
  this.controlsContainer = this.container.querySelector('#controls-container');
  this.slides = this.slidesContainer.querySelectorAll('.slide');
  this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
  this.pausePlayBtn = this.controlsContainer.querySelector('#pausePlay-btn img');
  this.nextBtn = this.controlsContainer.querySelector('#next-btn');
  this.prevBtn = this.controlsContainer.querySelector('#prev-btn');

  this.currentSlide = 0;
  this.timerId = null;
  this.isPlaying = true;
  this.startPosX = null;
  this.endPosX = null;
  this.interval = 2000;
}

Carousel.prototype = {
  goToSlide(n) {
    this.slides[this.currentSlide].classList.toggle('slide-current');
    this.indicators[this.currentSlide].classList.toggle('indicator-current');
    this.currentSlide = (n + this.slides.length) % this.slides.length;
    this.slides[this.currentSlide].classList.toggle('slide-current');
    this.indicators[this.currentSlide].classList.toggle('indicator-current');
  },
  gotoPrev() {
    this.goToSlide(this.currentSlide - 1);
  },
  goToNext() {
    this.goToSlide(this.currentSlide + 1);
  },
  tick() {
    this.timerId = setInterval(() => this.goToNext(), this.interval);
  },
  pauseHandler() {
    if (!this.isPlaying) return;
    clearInterval(this.timerId);
    this.pausePlayBtn.src = './assets/play.svg';
    this.isPlaying = false;
  },
  playHandler() {
    this.tick();
    this.pausePlayBtn.src = './assets/pause.svg';
    this.isPlaying = true;
  },
  pausePlayHandler() {
    this.isPlaying ? this.pauseHandler() : this.playHandler();
  },
  prevHandler() {
    this.pauseHandler();
    this.gotoPrev();
  },
  nextHandler() {
    this.pauseHandler();
    this.goToNext();
  },
  indicatorHandler(e) {
    const { target } = e;
    if (target && target.classList.contains('indicator')) {
      this.pauseHandler();
      this.goToSlide(+target.dataset.slideTo);
    }
  },
  pressKey(e) {
    const { code } = e;
    e.preventDefault();
    if (code === 'Space') this.pausePlayHandler();
    if (code === 'ArrowLeft') this.prevHandler();
    if (code === 'ArrowRight') this.nextHandler();
  },
  swipeStart(e) {
    this.startPosX = e instanceof MouseEvent
      ? e.pageX // MouseEvent
      : e.changedTouches[0].pageX; // TouchEvent
  },
  swipeEnd(e) {
    this.endPosX = e instanceof MouseEvent
      ? e.pageX // MouseEvent
      : e.changedTouches[0].pageX; // TouchEvent
    if (this.endPosX - this.startPosX > 100) this.prevHandler();
    if (this.endPosX - this.startPosX < -100) this.nextHandler();
  },
  initListeners() {
    this.pausePlayBtn.addEventListener('click', this.pausePlayHandler.bind(this));
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this));
    this.nextBtn.addEventListener('click', this.nextHandler.bind(this));
    this.indicatorsContainer.addEventListener('click', this.indicatorHandler.bind(this));
    this.container.addEventListener('touchstart', this.swipeStart.bind(this));
    this.container.addEventListener('mousedown', this.swipeStart.bind(this));
    this.container.addEventListener('touchend', this.swipeEnd.bind(this));
    this.container.addEventListener('mouseup', this.swipeEnd.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
  },
  init() {
    this.initListeners();
    this.tick();
  }
};

const carousel = new Carousel();
carousel.init();










