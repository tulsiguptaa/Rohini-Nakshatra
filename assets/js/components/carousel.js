// Carousel Component
class Carousel {
    constructor(selector, options = {}) {
        this.container = document.querySelector(selector);
        if (!this.container) return;
        
        this.slides = this.container.querySelectorAll('.carousel-slide');
        this.currentIndex = 0;
        this.autoplay = options.autoplay || false;
        this.interval = options.interval || 5000;
        this.autoPlayInterval = null;
        
        this.init();
    }
    
    init() {
        this.createControls();
        this.setupEventListeners();
        this.updateSlides();
        
        if (this.autoplay) {
            this.startAutoplay();
        }
    }
    
    createControls() {
        // Create navigation buttons
        const prevBtn = document.createElement('button');
        prevBtn.className = 'carousel-btn carousel-prev';
        prevBtn.innerHTML = '‹';
        
        const nextBtn = document.createElement('button');
        nextBtn.className = 'carousel-btn carousel-next';
        nextBtn.innerHTML = '›';
        
        // Create indicators
        const indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';
        
        this.slides.forEach((_, index) => {
            const indicator = document.createElement('button');
            indicator.className = 'carousel-indicator';
            indicator.dataset.index = index;
            indicator.addEventListener('click', () => this.goToSlide(index));
            indicators.appendChild(indicator);
        });
        
        this.container.appendChild(prevBtn);
        this.container.appendChild(nextBtn);
        this.container.appendChild(indicators);
        
        this.indicators = indicators.querySelectorAll('.carousel-indicator');
    }
    
    setupEventListeners() {
        const prevBtn = this.container.querySelector('.carousel-prev');
        const nextBtn = this.container.querySelector('.carousel-next');
        
        prevBtn.addEventListener('click', () => this.prevSlide());
        nextBtn.addEventListener('click', () => this.nextSlide());
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Pause autoplay on hover
        if (this.autoplay) {
            this.container.addEventListener('mouseenter', () => this.stopAutoplay());
            this.container.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        
        if (startX - endX > swipeThreshold) {
            this.nextSlide();
        }
        
        if (endX - startX > swipeThreshold) {
            this.prevSlide();
        }
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlides();
        this.resetAutoplay();
    }
    
    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlides();
        this.resetAutoplay();
    }
    
    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.updateSlides();
        this.resetAutoplay();
    }
    
    updateSlides() {
        // Update slide positions
        this.slides.forEach((slide, index) => {
            slide.classList.remove('active', 'prev', 'next');
            
            if (index === this.currentIndex) {
                slide.classList.add('active');
            } else if (index === (this.currentIndex - 1 + this.slides.length) % this.slides.length) {
                slide.classList.add('prev');
            } else if (index === (this.currentIndex + 1) % this.slides.length) {
                slide.classList.add('next');
            }
        });
        
        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }
    
    startAutoplay() {
        if (this.autoplay && !this.autoPlayInterval) {
            this.autoPlayInterval = setInterval(() => this.nextSlide(), this.interval);
        }
    }
    
    stopAutoplay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    resetAutoplay() {
        if (this.autoplay) {
            this.stopAutoplay();
            this.startAutoplay();
        }
    }
}

// Initialize carousels on page load
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach((carousel, index) => {
        new Carousel(`.carousel:nth-child(${index + 1})`, {
            autoplay: true,
            interval: 5000
        });
    });
});