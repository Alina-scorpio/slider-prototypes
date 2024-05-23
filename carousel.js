function Carousel() {
  this.container = document.querySelector('#carousel');
  this.slidesContainer = this.container.querySelector('#slides-container');
  this.slides = this.slidesContainer.querySelectorAll('.slide');

  this.indicatorsContainer = this.container.querySelector('#indicators-container');
  this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');

  this.controlsContainer = this.container.querySelector('#controls-container');
  this.pausePlayBtn = this.controlsContainer.querySelector('#pausePlay-btn img');
  this.nextBtn = this.controlsContainer.querySelector('#next-btn');
  this.prevBtn = this.controlsContainer.querySelector('#prev-btn');

}

Carousel.prototype = {
  _initProps(){
    this.currentSlide = 0;
    this.isPlaying = true;
    this.interval = 2000;
    this.timerId = null;
    this.startPosX = null;
    this.startPosX = null;
    this.endPosX = null;
  },
  _initListeners() {
    this.pausePlayBtn.addEventListener('click', this.pausePlayHandler.bind(this));
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this));
    this.nextBtn.addEventListener('click', this.nextHandler.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicatorHandler.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  },

  _goToSlide(n) {
    this.slides[this.currentSlide].classList.toggle('slide-current');
    this.indicators[this.currentSlide].classList.toggle('indicator-current');
    this.currentSlide = (n + this.slides.length) % this.slides.length;
    this.slides[this.currentSlide].classList.toggle('slide-current');
    this.indicators[this.currentSlide].classList.toggle('indicator-current');
  },

  _gotoPrev() {
    this._goToSlide(this.currentSlide - 1);
  },

  _goToNext() {
    this._goToSlide(this.currentSlide + 1);
  },

  _indicatorHandler(e) {
    const { target } = e;
    if (target && target.classList.contains('indicator')) {
      this.pauseHandler();
      this._goToSlide(+target.dataset.slideTo);
    }
  },

  _pressKey(e) {
    const { code } = e;
    e.preventDefault();
    if (code === 'Space') this.pausePlayHandler();
    if (code === 'ArrowLeft') this.prevHandler();
    if (code === 'ArrowRight') this.nextHandler();
  },

  _tick() {
    this.timerId = setInterval(() => this._goToNext(), this.interval);
  },

  pauseHandler() {
    if (!this.isPlaying) return
    this.isPlaying = false;
    clearInterval(this.timerId);
    this.pausePlayBtn.src = './assets/play.svg';
  },

  playHandler() {
    if (this.isPlaying) return
    this.isPlaying = true;
    this.pausePlayBtn.src = './assets/pause.svg';
    this._tick();
  },

  pausePlayHandler() {
    this.isPlaying ? this.pauseHandler() : this.playHandler();
  },

  prevHandler() {
    this.pauseHandler();
    this._gotoPrev();
  },

  nextHandler() {
    this.pauseHandler();
    this._goToNext();
  },

  init() {
    this._initProps();
    this._initListeners();
    this._tick();
  }
};

Carousel.prototype.constructor = Carousel










